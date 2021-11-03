import json

def readJson():
    fail = False
    try:
        f = open("recipes.txt")
    except Exception as e:
        fail = True

    data = json.load(f)

    for i in data:
        print(i)

    f.close()

    return fail
