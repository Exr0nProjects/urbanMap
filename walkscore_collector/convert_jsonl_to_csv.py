
import json
import pandas as pd
from matplotlib import pyplot as plt
from tqdm import tqdm

from collections import defaultdict

filename = './tuesday_out.txt'

with open(filename, 'r') as rf:
    total_lines = sum(1 for l in rf)

print('total_lines', total_lines)

with open(filename, 'r') as rf:
    nocity = 0
    nowalk = 0
    df = defaultdict(list)
    columns = ['status', 'walkscore', 'updated', 'snapped_lon', 'snapped_lat', 'transitscore', 'bikescore', 'city' ]
    # prototype = { k: None for k in ['status', 'walkscore', 'updated', 'snapped_lon', 'snapped_lat', 'transitscore', 'bikescore' ] }
    for line in tqdm(rf, total=total_lines):
        d = json.loads(line)
        if 'transit' in d: d['transitscore'] = d['transit']['score']
        if 'bike' in d: d['bikescore'] = d['bike']['score']
        if 'city' not in d:
            nocity += 1
            continue
        if 'walkscore' not in d:
            nowalk += 1
            continue

        d = { k: None if k not in d else d[k] for k in columns }
        # print(d)

        for k, v in d.items():
            df[k].append(v)
        # if df is None:
            # df = pd.DataFrame(columns=list(d.keys()))
        # df = pd.concat([df, d])
        # dfs.append(pd.DataFrame([[x] for x in d.values()], columns=list(d.keys())))

    # print(df)
    # for k,v in df.items():
    #     print(k, ':', v[:10])

    print('nocity', nocity)
    print('nowalk', nowalk)

    df = pd.DataFrame.from_dict(df)
    print('len without status filter', len(df))
    df = df[df['status'] == 1]

    df = df.drop_duplicates(subset=['snapped_lat', 'snapped_lon'])
    print('# after deduplicated by snap lon', len(df))
    print(df[df['city'] == 'Lafayette'])
    # print(df)

    grouped = df.groupby('city')
    print(grouped.count().sort_values('status', ascending=False).head(20))

    df.to_csv('cities_livability.csv')


    # with pd.option_context('display.max_rows', None, 'display.max_columns', None):  # more options can be specified also
    #     print(df)

    # plt.hist(df['status'], bins=50)
    # plt.show()

