import pandas as pd
import numpy as np
import json

def get_df_incorporated_places():
    FILENAME = "../data/incorporated_places.tsv"
    # df = pd.read_csv(FILENAME, sep='	', dtype={ 'Place': str, 'Census': int, 'Estimates Base': int, **{f"20{y}": int for y in range(10, 20)} })
    # df = pd.read_csv(FILENAME, sep='	', thousands=',')
    df = pd.read_csv(FILENAME, sep='	',  thousands=',')
    df = df.sort_values(by='2019', ascending=False)
    return df

def get_df_simplemaps_uscities_basic():
    FILENAME = "../data/simplemaps_uscities_basicv1.75/uscities.csv"
    df = pd.read_csv(FILENAME)
    df = df[['city', 'state_id', 'lat', 'lng', 'population', 'density']]
    df = df.sort_values(by='population', ascending=False)
    return df


def fake_jsonl(data):
    return '[\n' + ',\n'.join('    ' + json.dumps(row) for row in data) + '\n]'

if __name__ == '__main__':

    # df = get_df_incorporated_places()
    # print(df.head(20))

    df = get_df_simplemaps_uscities_basic()

    print(df.head(20))

    print([x for x in df.head(20).iterrows()])

    max_pop = max(df['population'])
    df['population'] = np.log(df['population']) / np.log(max_pop * 2)
    # max_pop = 1

    simplemaps_basic = [{ 'city': f"{city:15s}", 'centroid': [lon, lat], 'pop': pop, 'density': dens } for id, (city, state, lat, lon, pop, dens) in df.iterrows()]
    # simplemaps_basic = [{ 'city': city, 'posiiton': [lon, lat, 12], 'normal': [-1, 0, 0], 'color': [0x32, 0x6c, 0xcc] } for id, (city, state, lat, lon, pop, dens) in df.head(20).iterrows()]
    # print(fake_jsonl(simplemaps_basic))
    with open('../vis/prepped_data/simplemaps_basic_columns.json', 'w') as wf:
        wf.write(fake_jsonl(simplemaps_basic))
