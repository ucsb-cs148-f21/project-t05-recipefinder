import os

rec_dir = os.getcwd() + '/recipes_bs4'

files = os.listdir(rec_dir)

files.sort()

test = "TESTS"

print(bool(test in files))


