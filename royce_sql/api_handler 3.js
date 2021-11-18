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
    password: "",
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

    qry = "SELECT recipe FROM recipes INNER JOIN ingredients ON ingredients.ingredient_id = recipes.ingredient_id WHERE ingredient LIKE '%" + params_object[0] + "%'";
    for (let i = 1; i < params_object.length; i++){
        qry += " AND ingredient LIKE '%" + params_object[i] + "%'";
    }

    console.log(qry);

    db.query(qry, (err, result) =>{
        if (err){
            console.log(err)
        }
        console.log(result)
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
