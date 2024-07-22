# import os
# import psycopg2
# from dotenv import load_dotenv
# from flask import Flask, request
# from mybp import bp

# load_dotenv()

# app = Flask(__name__)
# url = os.getenv("DATABASE_URL")
# connection = psycopg2.connect(url)

# app.register_blueprint(bp)

# @app.get("/")
# def home():
#     return "Hello, world!"