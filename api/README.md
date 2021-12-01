1. download Express JS, nodemon, NODE JS, and other packages and library listed in the beginning of api\_handler.js
or you can check the dependency list in package.json.

2. run the following command "nodemon api\_handler.js" to start API.

3. go to MYSQLWorkbench and copy paste SQL code from MYSQL.sql to generate dummy database.

4. you can use POSTMAN to simulate HTTP requests to interact with the MYSQL database(right now it is only local) to retrieve data.
Note: Here is an example of a working HTTP request: http://localhost:19002/api/recipes/?ingredients=a,b,c.

5. you should be able to see the query result using the given path of GET method in POSTMAN.

API Requests
____________
Login: http://localhost:19002/api/login/?username=foo&?password=bar

Deployed: https://n9nk4e4y95.execute-api.us-west-2.amazonaws.com/live/login/foo,bar

Signup: http://localhost:19002/api/signup/?username=foo&?password=bar

Deployed:https://n9nk4e4y95.execute-api.us-west-2.amazonaws.com/live/signup/foo,bar

Search: http://localhost:19002/api/recipes/

Deployed: https://n9nk4e4y95.execute-api.us-west-2.amazonaws.com/live/recipe/foo,bar,foob,ar,f,o




