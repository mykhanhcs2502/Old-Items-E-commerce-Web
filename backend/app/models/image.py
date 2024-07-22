from app.extensions import db


class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String)
    # trên hình ERD bảng image có cái cột type mà tui ko nhớ để làm gì nên tạm để là String
    # tui đổi tên thành image_type, tại nếu để type thì ko biết có bị conflict với built in của python ko
    image_type = db.Column(db.String)
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)
    item_ref = db.relationship("Item", backref= db.backref("item_images",cascade="all, delete-orphan"), foreign_keys=[item_id])