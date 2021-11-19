import json
from time import sleep
import requests
from bs4 import BeautifulSoup
import lxml
from threading import Thread
import math
import os

base_url = 'https://www.allrecipes.com/recipe/'

rmin = 220000
rmax = 260000
threads = 24
#rmin = 220001
#rmax = 220002
#threads = 1
inc = math.floor((rmax - rmin) / threads)

if not os.path.exists(os.getcwd() + '/recipes_bs4'):
    os.makedirs(os.getcwd() + '/recipes_bs4')
files = os.listdir(os.getcwd() + '/recipes_bs4')
files.sort()

def getRecipe(rmin, rmax):
    for i in range(rmin, rmax):
        print(str(i) + " of " + str(rmax))
        new_url = base_url + str(i)

        page = requests.get(new_url)
        html = page.content

        soup = BeautifulSoup(html, 'lxml')

        #name, total time, servings, ingredients, directions, nutrition facts
        recipe_info = {}
        recipe_info.update({"id" : str(i)})
        
        try:
            img = soup.find_all(class_="image-container")
            imgUrl = img[0].div['data-src']
            recipe_info.update({"imgUrl":imgUrl})
        except Exception as e:
            continue

        #name element
        try:
            names = soup.find_all('h1')
            name = str(names[0].string)
            if (name == "Bummer."):
                continue
            if (name in files):
                continue
            recipe_info.update({"name": str(name)})
        except Exception as e:
            continue;

        #prep, cook, additional, total, servings, yield
        try:
            headers = soup.find_all(class_="recipe-meta-item-header")
            info = soup.find_all(class_="recipe-meta-item-body")
            for i in range(0, len(headers)):
                recipe_info.update({str(headers[i].string).lower().replace(':', ''): str(info[i].string).lower().strip()})

        except Exception as e:
            continue


        try:
            ingredients = soup.find_all(class_="ingredients-item-name")
            ingre_list = []
            baseStr = ""
            for i in ingredients:
                ingre_list.append(str(i.string).strip())
                baseStr += " "
                baseStr += str(i.string).strip()
            recipe_info.update({"ingredients": ingre_list})
            recipe_info.update({"db": baseStr})
        except Exception as e:
            continue

        try:
            steps = soup.find_all('p')
            steps_list = []
            for i in steps:
                if (i.string is None):
                    continue
                steps_list.append(str(i.string).strip())
            recipe_info.update({"steps": steps_list})
        except Exception as e:
            continue

        try:
            facts = str(soup.find_all(class_="partial recipe-nutrition-section")[0].get_text()).replace(" Per Serving: ", "").replace(". Full Nutrition  ", "").strip()
            recipe_info.update({"nutrition facts": facts})
        except Exception as e:
            continue

        #export as json
        #keep ingredients separate for wyatt/richard
        #print(recipe_info)
        jsonList = json.dumps(recipe_info)
        f = open("recipes_bs4/" + str(name) + ".txt", "w")
        f.write(jsonList)
        f.close()

t = []

def startThread(sargs):
    x = Thread(target=getRecipe, args=sargs)
    t.append(x)
    x.start()

for i in range(0, threads):
    if (i == threads - 1):
        startThread([rmin, rmax])
    else:
        startThread([rmin, rmin + inc])
        rmin += inc

for i in t:
    i.join()


#check the min and max of the recipes database
