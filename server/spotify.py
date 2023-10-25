from dotenv import load_dotenv
import os
# encodes/decodes data
import base64
from requests import post, get
import requests
import json


load_dotenv()
CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
# loading client id and secret from .env file

# ---------------------------------------------------------------

# This will get access to spotify


def get_token():

    auth_url = 'https://accounts.spotify.com/api/token'
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Authorization": f"Basic {base64.b64encode(f'{CLIENT_ID}:{CLIENT_SECRET}'.encode()).decode()}",
    }
    payload = {
        'grant_type': 'client_credentials'
    }

# will make a post request to the auth_url
    response = requests.post(auth_url, headers=headers, data=payload)
    response_data = response.json()
    return response_data.get("access_token")


token = get_token()
print(token)
