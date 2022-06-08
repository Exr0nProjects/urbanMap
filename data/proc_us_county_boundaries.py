import json
import pandas as pd

# extract_columns = ["stusab", "state_name", "name", "geo_point_2d"]



# get the presidents data and filter for the most recent year and total votes
# (as opposed to just mail-in, just day of, etc).
# we'll need to add geo location to this manually
df = pd.read_csv('./countypres_2000-2020.csv')
df = df[df['year'] == 2020]
df = df[df['mode'] == 'TOTAL']

# first we'll group by county, state, and party, then sum, to add up votes for diff candidates but same party in each county
df = df.groupby(['state_po', 'county_name', 'party'])['candidatevotes'].sum()

print(df)
# now we'll groupby county and state, then by party to find the "political leaning"
df = df.groupby(['state_po', 'county_name']).idxmax()
county_politics_tuples = list(df)       # at this point it's a series which is scary so we'll just make it a list and do normal python stuff from now on
print('number of counties:', len(county_politics_tuples))

# now we load the counties geofence and coords dataset in order to extract the coords from it
print('reading us county boundaries...')
with open('./us-county-boundaries.json', 'r') as rf:
    st = rf.read()
counties = json.loads(st)

coords_by_county = {}   # generate hashmap of county -> coords, so we can insert it into presidents_df later
for county in counties:
    # ret = { k : v for k, v in county.items() if k in extract_columns }
    coords_by_county[county['fields']['stusab'].lower() + ':' + county['fields']['name'].lower()] = county['fields']['geo_point_2d']
print("# of counties with geopoint2d data:", len(coords_by_county))

# print(json.dumps(coords_by_county, indent=4))

# now we add coords to the list of tuples of counties so that we can display locations
counties = [(state, county, party) + (coords_by_county[(state + ':' + county).lower()],)
        for state, county, party in county_politics_tuples if (state + ':' + county).lower() in coords_by_county]
print('after dropping voter counties with no coords, we have', len(counties), 'remaining')

# now we just stick this into a json file

with open('./politics_by_coords.json', 'w') as wf:
    wf.write('[\n')

    wf.write(',\n'.join(json.dumps({ 'state': state, 'county': county, 'party': party, 'coords': coords })
        for state, county, party, coords in counties))

    wf.write('\n]')

