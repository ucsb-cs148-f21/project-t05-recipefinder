const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db'); 
const config = require('config')
const Joi = require('joi');
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

// //configuration
console.log('Application Name: ' + config.get('name'))
console.log('Application Name: ' + config.get('mail.host'))

if (app.get('env') === 'development'){
    app.use(morgan('tiny')); //log http request for testing purpose 
    startupDebugger('Morgan enabled...')
}

//establish connection instance
const mysql = require('mysql2')

const db = mysql.createConnection({ //db configuration
    user: "root",
    host: "localhost",
    password: "password",
    database: "recipe_finder"
})

//checking database connection
db.connect(function(err) {
    if(err){
        console.log(err);
    };
    console.log("Successfully connected to MYSQL database");
});

//right I hard code it to return all ingredients
app.get("/api/recipes/", async(req, res) => {
    let query_params = req.query.ingredients
    let params_object = query_params.split(",")

    db.query("SELECT ingredient FROM ingredients_table", (err, result) =>{
        if (err){
            console.log(err)
        }
        res.send(result);
    })
}); 

//validator that check the user input
// function validateRecipe(recipe){
//     const schema = {
//         name: Joi.string().min(3).required()
//     };
//     result = Joi.validateRecipe(recipe, schema);
//     return result;
// }

//Port
const port = process.env.PORT || 19002
app.listen(port, () =>console.log(`Waiting on port ${port}...`));