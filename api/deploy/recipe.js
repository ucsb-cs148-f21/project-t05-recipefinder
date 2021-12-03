const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended :true}));
app.use(express.static('public')); //to serve static content
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var mysql = require('mysql');
var util = require('util')
var pool  = mysql.createPool(
    {
        user: "sql3455787",
        host: "sql3.freemysqlhosting.net",
        password: "dVCJq9w5rw",
        database: "sql3455787"
    }
    );
    
    exports.handler = async (event, context, callback) => 
    {
        let ingredients = event.pathParameters.ingredients;
        
        let result = {};
        try{
            let query_params = event.pathParameters.ingredients;
            let params_object = query_params.split(",");
            let qry = "SELECT recipe FROM recipes INNER JOIN ingredients ON ingredients.ingredient_id = recipes.ingredient_id WHERE ingredient LIKE '%" + params_object[0] + "%'";
            for (let i = 1; i < params_object.length; i++){
                qry += " AND ingredient LIKE '%" + params_object[i] + "%'";
            }
            result = await getRecipe(qry,0);
        }catch (err){
            throw new Error(err);
        }
        console.log("-----Result: ",result);
        return {
            body: JSON.stringify(result),
            statusCode:200,
            headers: { "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*" }
        };
    }
    
    let getRecipe = async (sql, params) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query(sql, params, (err, results) => {
                    if (err){
                        reject(err);
                    }
                    console.log("-----Query Done!");
                    connection.release();
                    console.log("-----Data: ", results);
                    let test = [];
                    for (var i = 0; i < results.length; i++)
                    {
                        try
                        {
                            let json = JSON.parse(results[i].recipe);
                            test.push(json);
                        }
                        catch (error)
                        {
                            continue;
                        }
                    } 
                    resolve(test);
                });
            });
        });
    };