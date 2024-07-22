from app.extensions import db

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    star = db.Column(db.Integer)
    comment = db.Column(db.String)
    review_date = db.Column(db.String)
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)
    item_ref = db.relationship("Item", backref= db.backref("review", cascade="all, delete-orphan" ))
    buyer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)