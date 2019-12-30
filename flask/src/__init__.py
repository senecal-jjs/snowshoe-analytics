from flask import Flask
from config import Config 
from flask_cors import CORS 
from flask_sqlalchemy import SQLAlchemy
import logging 
import redis 
import os 

r = redis.StrictRedis(host=os.getenv("REDIS_HOST", "localhost"), port=6379, db=0)

def create_app(config_class=Config):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(config_class)
    app.config.from_pyfile('config.py') 
    CORS(app)

    from src.api import bp as api_bp
    app.register_blueprint(api_bp)

    return app 
