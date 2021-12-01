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
    let result = {};
    try{
        let info = event.pathParameters.info;
        let params_object = query_params.split(",");
        let username = params_object[0];
        let password = params_object[1];
        let qry = "SELECT `user_id`, `user_username`, `user_password` FROM `entity_users` WHERE `user_username`='" + username + "' AND `user_password`='" + password + "'";
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