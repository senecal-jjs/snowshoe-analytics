import json 
import requests 
import redis

r = redis.StrictRedis(host="localhost", port=6379, db=0)
ODDS_API_KEY = '120d1117a151c4a5f36d0e9c73e2fcd9'

def get_odds():
    odds_response_nfl = requests.get('https://api.the-odds-api.com/v3/odds',
    params={
    'api_key': ODDS_API_KEY,
    'sport': 'americanfootball_nfl',
    'region': 'us',
        'mkt': 'h2h'
    })

    odds_response_nba = requests.get('https://api.the-odds-api.com/v3/odds',
    params={
    'api_key': ODDS_API_KEY,
    'sport': 'basketball_nba',
    'region': 'us',
        'mkt': 'h2h'
    })

    odds_response_premier_league = requests.get('https://api.the-odds-api.com/v3/odds',
    params={
    'api_key': ODDS_API_KEY,
    'sport': 'soccer_epl',
    'region': 'uk',
        'mkt': 'h2h'
    })

    odds_json_nfl = json.loads(odds_response_nfl.text)
    odds_json_nba = json.loads(odds_response_nba.text)
    odds_json_premier_league = json.loads(odds_response_premier_league.text)

    # cache in DB
    r.set('NFL', odds_response_nfl.text)
    r.set('NBA', odds_response_nba.text)
    r.set('PremierLeague', odds_response_premier_league.text)

def pull_odds():
    print(json.loads(r.get('NFL')))


def make_request():
    response = requests.get('https://api.the-odds-api.com/v3/sports', 
    params={
        'api_key': ODDS_API_KEY,
        'sport': 'upcoming',
        'region': 'us',
        'mkt': 'h2h'
    })

    sports_json = json.loads(response.text)
    print(sports_json)
    # data = sports_json['data']

    # odds_response = requests.get('https://api.the-odds-api.com/v3/odds',
    # params={
    #     'api_key': ODDS_API_KEY,
    #     'sport': 'americanfootball_nfl',
    #     'region': 'us',
    #     'mkt': 'h2h'
    # })

    # odds_json = json.loads(odds_response.text)
    # print(odds_response.text)

    # if not sports_json['success']:
    #     print("error")
    # else:
    #     print(sports_json['data'])

if __name__ == '__main__':
    #make_request()
    get_odds()
    pull_odds()