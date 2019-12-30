from flask import Blueprint
from flask_restful import Api 
from src.api.resources import PremierLeague, NFL, NBA, HealthCheck
from src.util.util import get_odds
from apscheduler.schedulers.background import BackgroundScheduler

bp = Blueprint('api', __name__)
api = Api(bp)

api.add_resource(PremierLeague, 'api/v1/premier-league', endpoint = 'premier_league')
api.add_resource(NFL, 'api/v1/nfl', endpoint = 'nfl')
api.add_resource(NBA, 'api/v1/nba', endpoint = 'nba')
api.add_resource(HealthCheck, '/odds-machine', endpoint='readiness')

# initial redis set on startup
get_odds()

scheduler = BackgroundScheduler(daemon=True)
job = scheduler.add_job(get_odds, 'interval', minutes=300)
scheduler.start()


