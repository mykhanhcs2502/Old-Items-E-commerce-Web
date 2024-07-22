from app.extensions import db

itemStatus = {
    0: "available",
    1: "sold"
}


class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String)
    status = db.Column(db.Integer)
    condition = db.Column(db.Integer)  # ex: 80(%)
    price = db.Column(db.Integer)
    description = db.Column(db.String)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    category_ref = db.relationship("Category", backref="belonging_items", foreign_keys=[category_id])


    seller_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    buyer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=True)


    seller_ref = db.relationship("User", backref="selling_items", foreign_keys=[seller_id])
    buyer_ref = db.relationship("User", backref="buying_items", foreign_keys=[buyer_id])
    order_ref = db.relationship("Order", backref="items", foreign_keys=[order_id])
    def __repr__(self) -> str:
        return f"<Item itemname = {self.item_name}>"

    def activate_reference(self):
        if self.category_ref and self.seller_ref:
            return True
