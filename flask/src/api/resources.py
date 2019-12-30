from flask import current_app
import json 
from flask import Flask 
from flask_restful import Api, Resource
from src import r 
import requests 
import os 


class HealthCheck(Resource):
    def get(self):
        status = '{ "ready":"true"}'
        return json.loads(status)

    def put(self):
        pass 
    
    def delete(self):
        pass 

class PremierLeague(Resource):
    def get(self):
        # with open('/Users/jacobsenecal/Repos/Personal/service-odds-machine/src/api/static/ex_response.json') as json_file:
        #     response = Response(response=json.load(json_file), sport="PremierLeague")
        #     db.session.add(response)
        #     db.session.commit()

        return json.loads(r.get('PremierLeague'))

    def put(self):
        pass 
    
    def delete(self):
        pass 


class NFL(Resource):
    def get(self):
        # with open('/Users/jacobsenecal/Repos/Personal/service-odds-machine/src/api/static/ex_nfl.json') as json_file:
        #     response = Response(response=json.load(json_file), sport="NFL")
        #     db.session.add(response)
        #     db.session.commit()
        # cwd = os.getcwd()
        # odds_json_nfl = ""
        # with open(f"{cwd}/src/api/static/ex_nfl.json") as f:
        #     odds_json_nfl = json.loads(f.read())
        # return odds_json_nfl
        return json.loads(r.get('NFL'))

    def put(self):
        pass

    def delete(self):
        pass


class NBA(Resource):
    def get(self):
        return json.loads(r.get('NBA'))

    def put(self):
        pass 

    def delete(self):
        pass 
