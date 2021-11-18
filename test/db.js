const express = require('express')
const app = express()

const mysql = require('mysql2')

const db = mysql.createConnection({ //db configuration
    user: "root",
    host: "localhost",
    password: "",
    database: "recipe_finder"
})

//checking database connection
db.connect(function(err) {
    if(err) throw err;
    console.log("Successfully connected to MYSQL database");
});

app.get('/api', (req, res) => {
    res.send('you connected to the api!')
});

app.get('/api/recipes/', (req, res) => {
    let query_params = req.query.ingredients
    let params_object = query_params.split(",")

    if (params_object.length == 0)
    {
        throw 'empty pantry';
    }
    else
    {
        db.query("SELECT *");
        res.send('success');
    }
});

app.listen(3000, () => console.log('listening on 3000'))
module.exports = app
