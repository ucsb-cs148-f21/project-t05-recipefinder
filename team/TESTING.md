1. basic unit test is in the /recipe\_scraper/test.py file
Testing framework is PyUnit
Tests if readJson is working properly

2. Our plan with unit tests is to implement them as we go on. For our legacy code, we agreed to leave it as is.

3. We satisfied the higher level testing requirement by integrating a API test in the royce\_sql folder. We used supertest and jest to test our Express.js API. It currently only run two tests, checking if the api can send a response, and then testing if the MySQL database is online by running a sql query.

4. For right now, we have not tried integration testing on the front end, nor end to end testing on the front end. Despite our testing being limited to the back end, we may want to start testing the front end as well. If we encounter many bugs, we plan to start incorporating testing.



