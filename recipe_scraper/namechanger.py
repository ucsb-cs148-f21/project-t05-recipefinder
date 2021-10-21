import os

curdir = os.getcwd()

curdir += "/recipes_bs4"

os.chdir(curdir)

for f in os.listdir(curdir):
    os.rename(f, f.replace('?',""))


