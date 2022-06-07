from secrets import API_KEY

import requests

def get_data_for(lat: float, lon: float, api_key: str):
    SERVER_URL = "https://api-walkscore.com/score"
    payload = { 'format': 'json', 'lat': lat, 'lon': lon, 'transit': 1, 'bike': 1, 'wsapikey': api_key }
    r = requests.get(SERVER_URL, payload)


if __name__ == '__main__':
    print(API_KEY)

