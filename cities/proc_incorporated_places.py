import pandas as pd
import numpy as np
import json

def get_df_incorporated_places():
    FILENAME = "../data/incorporated_places.tsv"
    df = pd.read_csv(FILENAME, sep='	',  thousands=',')
    df = df.sort_values(by='2019', ascending=False)
    return df

def get_df_simplemaps_uscities_basic():
    FILENAME = "../data/simplemaps_uscities_basicv1.75/uscities.csv"
    df = pd.read_csv(FILENAME)
    df = df[['city', 'state_id', 'lat', 'lng', 'population', 'density']]
    df = df.rename(columns={'state_id': 'state', 'lng': 'lon', 'population': 'pop'})
    df = df.sort_values(by='pop', ascending=False)
    return df


def fake_jsonl(data):
    return '[\n' + ',\n'.join('    ' + json.dumps(row) for row in data) + '\n]'

def fake_jsonl_df(df):
    return '[\n' + ',\n'.join('    ' + json.dumps({ k: v for k, v in row.items() }) for id, row in df.iterrows() ) + '\n]'

if __name__ == '__main__':
    df = get_df_simplemaps_uscities_basic()

    max_pop = max(df['pop'])
    df['value'] = np.log(df['pop']) / np.log(max_pop * 2)

    df.head(500).to_csv('top_100_cities.csv')

    with open('../vis/prepped_data/cities.json', 'w') as wf:
        wf.write(fake_jsonl_df(df))
