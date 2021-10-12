from selenium import webdriver
from webdriver_manager.firefox import GeckoDriverManager
from time import sleep

bot = webdriver.Firefox()

base_url = 'https://www.allrecipes.com/recipe/'

rmin = 220000
#rmax = 250000
rmax = rmin + 1;

for i in range(rmin, rmax):
    new_url = base_url + str(i)
    #driver get
    bot.get(new_url)

    #name, total time, servings, ingredients, directions, nutrition facts

    #name element
    sleep(10)
    print("GO")
    name_element = bot.find_elements_by_class_name('headline heading-content elementFont__display')
    print(name_element[0].text)

    #export as json
    #keep ingredients separate for wyatt/richard
    


#check the min and max of the recipes database


