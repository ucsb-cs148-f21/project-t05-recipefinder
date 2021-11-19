# Deploying the Recipe Finder App

Clone this repo using 
```bash
git clone https://github.com/ucsb-cs148-f21/project-t05-recipefinder
```

## Setting up the data base

You can either do this locally, or use the publically availible database we already set up. 

**If you do not want to setup the database locally, skip to setting up the api step.**

### Local Database Setup

1. Download and install XAMPP
2. Download and install MYSQL Workbench
3. Start your SQL server from the XAMPP Control Panel
4. Launch workbench, and load into your localhost database
5. Copy and paste the SQL script named **base tables.sql** from the db folder. Run the script.
6. Copy and paste the SQL script named **recipesandingredients.sql** from the db folder. Run the script.
7. If you followed through this process, make sure to edit the SQL credentials in /api/api\_handler.js

### Running the API

1. Go to the /api/ directory.
2. Run `sudo npm -g install nodemon`.
3. Run `nodemon api_handler.js`.
4. Now our API is ready to receive and process requests!

### Running the app

1. Go to the /RecipeFinderApp/ directory.
2. Run `sudo npm -g install expo-cli`.
3. Run `expo start`
4. In the browser, open the web simulator.
5. You are now using our app!
