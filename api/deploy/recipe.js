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
    user: "sql3451481",
    host: "sql3.freemysqlhosting.net",
    password: "3LN7mANFNg",
    database: "sql3451481"
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
    return {body: JSON.stringify(result),statusCode:200};
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
                resolve(results);
            });
        });
    });
};