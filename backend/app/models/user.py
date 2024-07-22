from app.extensions import db
from typing import List

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String)
    email = db.Column(db.String)
    address = db.Column(db.String)
    phone = db.Column(db.String)