import pandas as pd


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


if __name__ == '__main__':

    df = get_df_incorporated_places()
    print(df.head(20))

    print(get_df_simplemaps_uscities_basic().head(20))
