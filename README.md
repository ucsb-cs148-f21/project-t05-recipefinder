# project-t05-recipefinder

This project is a mobile app that displays recipes based on their items in their pantry

* [Deployment Instruction](./docs/DEPLOY.md)

# Members and Github IDS

Ana Saldana  @ana633

Leon Feng @LeonFeng0325

Sara Medernach @saramedernach

Richard Rao @Richard-Rao

Royce Nguyen @rlicoder

Wyatt Spivak @wyatthspivak

# Tech Stack
We plan on using React Native to create this app

## Project Plan

The purpose of the app is to provide recipe suuggestions according to the ingredients the user inputs or searches. 


## User Roles
1. Users that look up recipes based on their ingredients/product input
2. Admins that can upload new recipes to the system

# Installation
## Prerequisites

User should have npm, node, nodemon, package.json in api folder, git, and React Native install

User should install expo, use command: npm install -g expo-cli

Download/Clone repo to get access to RecipeFinderApp folder files

Go to expo project folder RecipeFinderApp
 
# Dependencies

Make sure to install asynchStorage library using command: npm install @react-native-async-storage/async-storage or expo install @react-native-async-storage/async-storage

Install vector-icons library using command: npm install --save react-native-vector-icons

# Installation Steps

1. Dowload Expo Go from google play store or apple store on your own mobile device
2. Generate the database using generatedb.sql and start your local database
3. Run api\_handler.js in the royce\_sql folder using nodemon api\_hander.js
4. cd into RecipeFinderApp
5. run expo start to recieve a QR code
6. Open Expo Go on your own mobile device and scan the QR code to use app


# Functionality
1. Go to the Ingredients nav bar page, and input ingredients in the input text
2. Press on the add ingredient button to add ingredients to your list
3. Press on the search button, once you are ready to find recipes based on your input
4. After pressing  the search button the app will display the recipe names, press on the recipe name that you want to see more details such as prep time, total time, nutrition facts, ingredients, and steps.
5. Navigate between screens by pressing the apple icon to go to Ingredients/Search page and the book to go to the Recipe Details page

# Known Problems
inputting too many ingredients may not give you a recipe.

can give you recipes that you have ingredients for, but not all

# Contributing

    Fork it!
    Create your feature branch: git checkout -b my-new-feature
    Commit your changes: git commit -am 'Add some feature'
    Push to the branch: git push origin my-new-feature
    Submit a pull request :D

# Deployment
	https://appetize.io/app/u31db5p872uhzc9nekxdqfr0ur
	or install the apk from the tagged releases on github.
	or use expo start in the /RecipeFinderApp/ directory.