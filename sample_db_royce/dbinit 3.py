import json
import io
import os

curdir = os.getcwd() + "/recipes_bs4"
sql = io.open("generatedb.sql", "w", encoding="utf8")
os.chdir(curdir)


maxIngreList = 0
for filename in os.listdir(os.getcwd()):
    f = open(filename)
    jsonStr = json.load(f)
    f.close()
    maxIngreList = max(maxIngreList, len(jsonStr["db"]))
    sql.write("INSERT INTO `ingredients` VALUES (" + jsonStr["id"] + ", " + "\"" + jsonStr["db"].replace("\"", "").replace("\'", "") + "\");\n")

maxJsonList = 0
for filename in os.listdir(os.getcwd()):
    f = open(filename)
    jsonStr = json.load(f)
    f.close()
    maxJsonList = max(maxJsonList, len(str(jsonStr)))
    sql.write("INSERT INTO `recipes` VALUES (" + jsonStr["id"] + ", \"" + str(jsonStr).replace("\"", "\"\"").replace("u\'", "\"\"").replace("\'", "\"\"") + "\");\n")
    
print(maxIngreList)
print(maxJsonList)
sql.close()


