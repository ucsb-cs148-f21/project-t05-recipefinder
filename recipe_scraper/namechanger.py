import os

curdir = os.getcwd()

curdir += "/recipes_bs4"

os.chdir(curdir)

for f in os.listdir(curdir):
    print(f)
    os.rename(f, f.replace("?",""))


