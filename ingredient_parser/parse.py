import os
import json

recipe_dir = os.getcwd() +  "/../recipe_scraper/recipes_bs4"

os.chdir(recipe_dir)

files = os.listdir(recipe_dir)

freq = {}

count = 0
for recipe in files:
    y = json.load(open(recipe))
    for ingredient in y["ingredients"]:
        #print(ingredient)
        for word in ingredient.split():
            lword = word.lower()
            if (lword in freq):
                freq[lword] += 1
            else:
                freq[lword] = 1
    count += 1
    if (count == 200):
        break

pairs = []
for key, value in freq.items():
    pairs.append({value, key})
    #print(key, value)

pairs.sort()
for i in pairs:
    print(i)
