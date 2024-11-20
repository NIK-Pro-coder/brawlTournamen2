import sys
import requests
import dotenv
import os
import json

dotenv.load_dotenv()

API_KEY = os.getenv("API_KEY")
HEAD = {
	"Authorization": f"Bearer {API_KEY}"
}

cmdict = {}

#Decorator to automatically rgister
#functions as callable with the cli
def addEntry(func) :
	cmdict[func.__name__] = func
	return func

@addEntry
def getPlayer(tag) :
	r = requests.get(
		f"https://api.brawlstars.com/v1/players/%23{tag.strip('#')}",
		headers=HEAD
	)

	print(r.text)

if __name__ == "__main__" :
	cmdict[sys.argv[1]](*sys.argv[2:])
