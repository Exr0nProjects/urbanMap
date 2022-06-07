from secrets import API_KEY
from geopy.distance import GeodesicDistance

from tqdm import tqdm

import pandas as pd
import numpy as np

import json
import requests
import random
from math import pi
from subprocess import run
import time

from itertools import islice

# bypass system proxy https://stackoverflow.com/questions/28521535/requests-how-to-disable-bypass-proxy
session = requests.Session()
session.trust_env = False

def get_data_for(lat: float, lon: float, api_key: str):
    SERVER_URL = "https://api.walkscore.com/score"
    payload = { 'format': 'json', 'lat': lat, 'lon': lon, 'transit': 1, 'bike': 1, 'wsapikey': api_key }
    r = requests.get(SERVER_URL, payload, headers={ 'User-Agent': 'curl/7.64.1' })
    # r = session.get(SERVER_URL, data=payload, headers={ 'User-Agent': 'curl/7.64.1' })

    # print(['curl', f"{SERVER_URL}?{'&'.join(f'{k}={v}' for k, v in payload.items())}"])
    # run()
    return r.json()

def get_point_within(lat, lon, mi=4):
    # from https://stackoverflow.com/a/9869013
    bearing = random.random() * 360 # degrees
    distance = random.random() * mi # miles

    nearby_point = GeodesicDistance(miles=distance).destination((lat, lon), bearing)
    return nearby_point.latitude, nearby_point.longitude


if __name__ == '__main__':
    print(API_KEY)  # security 100

    df = pd.read_csv('./top_100_cities.csv')

    random.seed(1337)

    print("# cities:", len(df))

    for id, [_, city, state, lat, lon, pop, density, value] in tqdm(df.iterrows(), total=len(df), leave=False):
        print('#', city, lat, lon)
        if id < 182: continue
        for i in range(10):
            g = get_data_for(*get_point_within(lat, lon), API_KEY)
            g['city'] = city
            print(g)
            with open('tuesday_out.txt', 'a') as wf:
                wf.write(json.dumps(g) + '\n')
            time.sleep(random.random())

    # lat, lon = df[['lat', 'lon']].iloc[0]
    # for i in range(10):
    #     print(get_point_within(lat, lon))
    #     input()


