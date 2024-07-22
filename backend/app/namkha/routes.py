from app.namkha import bp
from flask import request,Flask
from app.models.user import User
from app.models.item import Item
from app.models.category import Category
from app.models.image import Image
from app.models.order import Order
# from app.models.purchaseditem import PurchasedItem
from app.models.review import Review
import jsonpickle
import json
from app.extensions import db

# this is used to retrieve all orders of a buyer
@bp.route('/orders/<buyerId>', methods=['GET'])
def getOrders(buyerId):
    buyerId = int(buyerId)
    orderList = Order.query.filter_by(buyer_id=buyerId).all()
    for ord in orderList:
        print(ord.items)
        for ite in ord.items:
            print(ite.category_ref)
            print(ite.seller_ref)
            print(ite.buyer_ref)
            print(ite.order_ref)
            print(ite.item_images)
            print(ite.review)
    
    return jsonpickle.encode(orderList)

@bp.route('/users', methods=['GET'])
def getUsers():
    userList = User.query.all()
    return jsonpickle.encode(userList)

@bp.route('/categories', methods=['GET'])
def getCategories():
    categoryList = Category.query.all()
    return jsonpickle.encode(categoryList)

@bp.route('/review', methods=['POST'])
def createReview():
    request_data = request.get_json()
    star = request_data['star']
    comment = request_data['comment']
    review_date = request_data['review_date']
    item_id = request_data['item_id']
    buyer_id = request_data['buyer_id']
    review = Review(star=star, comment=comment, review_date=review_date, item_id=item_id, buyer_id=buyer_id)
    print(review)
    db.session.add(review)
    db.session.commit()
    return json.dumps({'message':'create review successfully'})


