import json
import io
import os

curdir = os.getcwd() + "/../recipe_scraper/recipes_bs4/"
sql = io.open("recipesandingredients.sql", "w", encoding="utf8")
os.chdir(curdir)


maxIngreList = 0
for filename in os.listdir(os.getcwd()):
    f = open(filename)
    jsonStr = json.load(f)
    f.close()
    maxIngreList = max(maxIngreList, len(jsonStr["db"]))
    sql.write("INSERT INTO `ingredients` VALUES (" + jsonStr["id"] + ", " + "\"" + jsonStr["db"].replace("\"", "").replace("\'", "") + "\");\n")

for filename in os.listdir(os.getcwd()):
    f = open(filename)
    jsonStr = json.load(f)
    f.close()
    maxIngreList = max(maxIngreList, len(jsonStr["db"]))
    sql.write("INSERT INTO `recipes` VALUES (" + jsonStr["id"] + ", \"" + str(jsonStr).replace("\"", "").replace("\'", "\"\"").replace('\\\"\"', "\'") + "\");\n")
    
sql.close()


