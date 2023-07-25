import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv(".env")

SQLALCHEMY_DATABASE_URI = os.getenv("POSTGRES_SERVER")
SQLALCHEMY_TRACK_MODIFICATIONS = False
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_TOKEN_LOCATION = ['headers']
JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)
basedir = os.path.abspath(os.path.dirname(__file__))