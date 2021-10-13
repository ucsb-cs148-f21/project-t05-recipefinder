import json

f = open("recipes.txt")

data = json.load(f)

for i in data:
    print(i)

f.close()
