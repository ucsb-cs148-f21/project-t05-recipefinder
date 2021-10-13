from selenium import webdriver
from webdriver_manager.firefox import GeckoDriverManager
import json
from time import sleep

bot = webdriver.Firefox()

base_url = 'https://www.allrecipes.com/recipe/'

rmin = 220137
#rmax = 22
rmax = 225000

recipes = []

for i in range(rmin, rmax):
    print(str(i) + " of " + str(rmax))
    new_url = base_url + str(i)

    #driver get
    bot.get(new_url)

    #name, total time, servings, ingredients, directions, nutrition facts
    recipe_info = {}

    #name element
    try:
        name_element = bot.find_element_by_xpath('/html/body/div[1]/div/main/div[1]/div[2]/div[1]/div[1]/div[1]/div/h1')
    except Exception as e:
        continue
    name = name_element.text
    recipe_info.update({"name:": name})

    #prep, cook, additional, total, servings, yield
    try:
        table_of_info_headers = bot.find_elements_by_class_name('recipe-meta-item-header')
    except Exception as e:
        continue
    try:
        table_of_info = bot.find_elements_by_class_name('recipe-meta-item-body')
    except Exception as e:
        continue
    for i in range(0, len(table_of_info)):
        recipe_info.update({table_of_info_headers[i].text: table_of_info[i].text})
        #print(table_of_info_headers[i].text)
        #print(table_of_info[i].text)

    list_ingre = []
    try:
        ingredients = bot.find_elements_by_class_name('ingredients-item')
    except Exception as e:
        continue
    for i in ingredients:
        list_ingre.append(i.text)
        #print(i.text)
    recipe_info.update({"ingredients:": list_ingre})

    try:
        steps = bot.find_elements_by_class_name('section-body')
    except Exception as e:
        continue
    #last item in the list is the nutrition facts
    list_steps = []
    for i in range(0, len(steps)-1):
        list_steps.append(steps[i].text)
        #print(i.text)

    try:
        recipe_info.update({"steps:": list_steps})
    except Exception as e:
        continue
    
    try:
        recipe_info.update({"nutrition facts": steps[-1].text.replace('. Full Nutrition', '')})
    except Exception as e:
        continue
    recipes.append(recipe_info)

    #export as json
    #keep ingredients separate for wyatt/richard
    jsonList = json.dumps(recipe_info)
    f = open("recipes/" + str(name) + ".txt", "w")
    f.write(jsonList)
    f.close()


f.close()

#check the min and max of the recipes database
