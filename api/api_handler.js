const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db'); 
const config = require('config')
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require("./logger");
const express = require("express");
const app = express();

//app.set('view engine', 'pug')

app.use(express.json());
app.use(express.urlencoded({extended :true})); 
app.use(express.static('public')); //to serve static content
app.use(logger);
app.use(helmet()); 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//establish connection instance
const mysql = require('mysql2')


//https req GET 
app.get("/api/recipes/", async(req, res) => {
const db = mysql.createConnection({ //db configuration
    user: "sql3451481",
    host: "sql3.freemysqlhosting.net",
    password: "3LN7mANFNg",
    database: "sql3451481"
})

//checking database connection
db.connect(function(err) {
    if(err)
    {
        throw err;
    }
    console.log("Successfully connected to MYSQL database");
});
    let query_params = req.query.ingredients
    let params_object = query_params.split(",")
    if (params_object.length == 0)
    {
        throw 'empty pantry!';
    }

    qry = "SELECT recipe FROM recipes INNER JOIN ingredients ON ingredients.ingredient_id = recipes.ingredient_id WHERE ingredient LIKE '%" + params_object[0] + "%'";
    for (let i = 1; i < params_object.length; i++){
        qry += " AND ingredient LIKE '%" + params_object[i] + "%'";
    }

    db.query(qry, (err, result) =>{
        if (err){
            console.log(err)
        }
        let test = [];
        for (var i = 0; i < result.length; i++)
        {
            try
            {
                test.push(JSON.parse(result[i].recipe));
            }
            catch (error)
            {
                continue;
            }
        }
        res.send(test);
    })

}); 

app.get('/api/login/', async(req, res) => {

    const db = mysql.createConnection({ //db configuration
        user: "sql3451481",
        host: "sql3.freemysqlhosting.net",
        password: "3LN7mANFNg",
        database: "sql3451481"
    })

    //checking database connection
    db.connect(function(err) {
        if(err)
        {
            throw err;
        }
        console.log("Successfully connected to MYSQL database");
    });
    let username = req.query.username;
    let password = req.query.password;

    qry = "SELECT `user_id`, `user_username`, `user_password` FROM `entity_users` WHERE `user_username`='" + username + "' AND `user_password`='" + password + "'";
    db.query(qry, function(err, ressql)
    {
        res.send(ressql);
        if (ressql.length == 0)
        {
           console.log("User login fail");
        }
        else
        {
            console.log("User login success");
        }
    })
    var test = {
        loginValid: success,
        userToken: userID
    };
});

app.get('/api/signup/', async(req, res) => {
    const db = mysql.createConnection({ //db configuration
        user: "sql3451481",
        host: "sql3.freemysqlhosting.net",
        password: "3LN7mANFNg",
        database: "sql3451481"
    })

    //checking database connection
    db.connect(function(err) {
        if(err)
        {
            throw err;
        }
        console.log("Successfully connected to MYSQL database");
    });
    let username = req.query.username;
    let password = req.query.password;

    qry = "SELECT `user_username` FROM `entity_users` WHERE `user_username`='" + username + "'";

    let found = false;
    db.query(qry, function(err, res)
    {
        if (res.length > 0)
        {
            found = true;
            console.log("already an account with that username");
        }
        else
        {
            console.log("unique username, adding you now!");
            qry = "INSERT INTO `entity_users` (`user_username`, `user_password`) VALUES ('" + username + "', '" + password + "')";

            db.query(qry, function(err, res)
            {
                if (err)
                {
                    throw err;
                }
            })
        }
    })
    var test = {
        alreadyUsed: found
    };
    res.send(test);
});

//Port
const port = process.env.PORT || 19002
app.listen(port, () =>console.log(`Waiting on port ${port}...`));
