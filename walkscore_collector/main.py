from secrets import API_KEY
from geopy.distance import GeodesicDistance

import pandas as pd
import numpy as np

import requests
import random
from math import pi

# bypass system proxy https://stackoverflow.com/questions/28521535/requests-how-to-disable-bypass-proxy
session = requests.Session()
session.trust_env = False

def get_data_for(lat: float, lon: float, api_key: str):
    SERVER_URL = "https://api-walkscore.com/score"
    payload = { 'format': 'json', 'lat': lat, 'lon': lon, 'transit': 1, 'bike': 1, 'wsapikey': api_key }
    # r = requests.get(SERVER_URL, payload, headers={ 'User-Agent': 'curl/7.64.1' })
    r = session.get(SERVER_URL, data=payload, headers={ 'User-Agent': 'curl/7.64.1' })
    return r

def get_point_within(lat, lon, km=1):
    # from https://stackoverflow.com/a/9869013
    bearing = random.random() * 360 # degrees
    distance = random.random() * km # km

    nearby_point = GeodesicDistance(kilometers=distance).destination((lat, lon), bearing)
    return nearby_point.latitude, nearby_point.longitude


if __name__ == '__main__':
    print(API_KEY)  # security 100

    df = pd.read_csv('./top_100_cities.csv')

    random.seed(1337)

    # for id, [_, city, state, lat, lon, pop, density, value] in df.iterrows():
    #     print(city, lat, lon)
    #     print('nearby:', get_point_within(lat, lon))

    lat, lon = df[['lat', 'lon']].iloc[0]
    for i in range(10):
        print(get_point_within(lat, lon))


    print(get_data_for(37.70691, -122.48395, API_KEY))


