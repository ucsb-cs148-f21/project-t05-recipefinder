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
    let result = {};
    let id = {};
    try{
        let info = event.pathParameters.info;
        let params_object = info.split(",");
        let username = params_object[0];
        let password = params_object[1];
        let qry = "SELECT `user_username` FROM `entity_users` WHERE `user_username`='" + username + "'";
        let exist = await checkExists(qry,0);
		if (!exist)
		{
			qry = "INSERT INTO `entity_users` (`user_username`, `user_password`) VALUES ('" + username + "', '" + password + "')";
			result = await signUp(qry, 0);
			if (result)
			{
    			qry = "SELECT `user_id` FROM `entity_users` WHERE `user_username`='" + username + "'";
    			id = await getID(qry, 0);
			}
		}
    }catch (err){
        throw new Error(err);
    }
    console.log("-----Result: ",result);
    return {
        body: JSON.stringify(id),
        statusCode:200,
        headers: { "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*" }
    };
}

let checkExists = async (sql, params) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(sql, params, (err, results) => {
                if (err){
                    reject(err);
                }
                console.log("-----Query Done!");
                connection.release();
                console.log("-----Data: ", results);
                resolve(results.length > 0);
            });
        });
    });
};

let signUp = async (sql, params) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(sql, params, (err, results) => {
                if (err){
                    reject(err);
                }
                console.log("-----Query Done!");
                connection.release();
                console.log("-----Data: ", results);
                resolve(results.affectedRows == 1);
            });
        });
    });
};



let getID = async (sql, params) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(sql, params, (err, results) => {
                if (err){
                    reject(err);
                }
                console.log("-----Query Done!");
                connection.release();
                console.log("-----DataUserID: ", results);
                resolve(results);
            });
        });
    });
};