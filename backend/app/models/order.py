from app.extensions import db

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String)
    buyer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)