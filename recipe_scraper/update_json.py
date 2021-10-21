import json
import os

curdir = os.getcwd()

os.chdir(curdir + "/recipes_bs4")

total = len(os.listdir(os.getcwd()))
print(total)

for file in os.listdir(os.getcwd()):
    f = open(file, "r+")
    jsonStr = json.load(f)
    baseStr = ""
    for ingre in jsonStr["ingredients"]:
        baseStr += " "
        baseStr += ingre
    jsonStr["dbingredients"] = baseStr
    #print(jsonStr)
    #print(file)
    f.write(json.dumps(jsonStr))
    f.close()


