import sched
import requests 
import json 
import logging 
from src import r 


ODDS_API_KEY = '120d1117a151c4a5f36d0e9c73e2fcd9'

def get_odds():
    logging.info("Running scheduled odds api event.")

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

    # cache in DB
    r.set('NFL', odds_response_nfl.text)
    r.set('NBA', odds_response_nba.text)
    r.set('PremierLeague', odds_response_premier_league.text)
