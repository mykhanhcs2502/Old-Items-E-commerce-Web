# from app.extensions import db


# class PurchasedItem(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
#     item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)
#     item_ref = db.relationship("Item", backref="purchased_item")
