Collects data from the WalkScore api.

https://www.redfin.com/how-walk-score-works

# code files
- main.py reads cities from ./top_100_cities.csv and creates the ./tuesday_out_first.txt jsonl (created all the .txts)
- convert_jsonl_to_csv.py reads jsonl from ./tuesday_out.txt and creates ./cities_livability.csv, which is symlinked to ../vis/prepped_data
    - convert_jsonl_to_csv.py also does some cleanning:
        - it removes data points that don't have walkscore or a city annotation
        - it removes data points that have status != 1 (walkscore api said nono)
        - it deduplicates by snapped_lat and snapped_lon in case any data points were doubled in the input
- all of ../vis/prepped_data is symlinked to ../vis/urbanmap/public/data, where it is then accessed
