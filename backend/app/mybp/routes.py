from app.mybp import bp
# from app.db import db
from app.models.user import User
from app.models.item import Item
from app.models.image import Image
from app.models.cart import Cart
import jsonpickle
import json
from flask import jsonify
from app.extensions import db


@bp.route('/', methods=['GET'])
def index():
    return 'This is The Main Blueprint'

@bp.route('/cart/<userId>/<itemId>', methods=['POST'])
def addItem(userId, itemId):
    userId = int(userId)
    itemId = int(itemId)
    searchItem = Cart.query.filter_by(user_id=userId, item_id=itemId).all()
    if (searchItem == []):
        cart = Cart(user_id=userId, item_id=itemId)
        # print(cart)
        db.session.add(cart)
        db.session.commit()
        return json.dumps({'message':'Item added to Cart'})
    else:
        return json.dumps({'message':'Item is already in Cart'})

@bp.route('/cart/<userId>/<itemId>', methods=['PUT'])
def setItem(userId, itemId):
    itemId = int(itemId)
    userId = int(userId)
    searchItem = Item.query.filter_by(item_id=itemId).all()
    if (searchItem == []):
        return json.dumps({'message':'Item is not exist'})
    else:
        searchItem[0].buyer_id = userId
        return json.dumps({'message':'Item is bought'})

@bp.route('/cart/<itemId>', methods=['PUT'])
def resetItem(itemId):
    itemId = int(itemId)
    searchItem = Item.query.filter_by(item_id=itemId).all()
    if (searchItem == []):
        return json.dumps({'message':'Item is not exist'})
    else:
        searchItem[0].buyer_id = None
        return json.dumps({'message':'Item is bought'})

@bp.route('/cart/<userId>/<itemId>', methods=['DELETE'])
def deleteItem(userId, itemId):
    userId = int(userId)
    itemId = int(itemId)
    deleteItem = Cart.query.filter_by(user_id=userId, item_id=itemId).all()
    # cartId = deleteItem[0]._id
    # print(cartId)
    # cart = Cart.query.find(cartId)
    # print(cart)
    db.session.delete(deleteItem[0])
    db.session.commit()
    return json.dumps({'message':'Item deleted from Cart'})

@bp.route('/cart/', methods=['GET'])
def getAllItems():
    allItem = Item.query.all()
    allImage = Image.query.all()
    listItems = []
    for i in range(len(allItem)):
        imageList = []
        for j in range(len(allImage)):
            if ((allItem[i].id+1) == (allImage[j].id)):
                imageItem = {
                    'id': allImage[j].id,
                    'image_url': allImage[j].url,
                    'type': allImage[j].image_type
                }
                imageList.append(imageItem)
        # print(imageList)
        if (len(imageList) == 0):
            imageList = [
                {
                    "image_id": 0,
                    "image_url": "https://img.freepik.com/premium-vector/kids-toys-wood-shop-shelves_53562-2731.jpg?w=360"
                }
            ]
        jsonItem = {
            'id': allItem[i].id,
            'item_name': allItem[i].item_name,
            'status': allItem[i].status,
            'condition': allItem[i].condition,
            'price': allItem[i].price,
            'description': allItem[i].description,
            'seller_id': allItem[i].seller_id,
            'buyer_id': allItem[i].buyer_id,
            'images': imageList
        }
        listItems.append(jsonItem)
    # print(listItems)
    filteredListItems = listItems
    return filteredListItems
    # return jsonpickle.encode(allItem)
    
@bp.route('/cart/<buyerId>', methods=['GET'])
def getAllCartItems(buyerId):
    allItem = Item.query.all()
    allImage = Image.query.all()
    listItems = []
    for i in range(len(allItem)):
        imageList = []
        for j in range(len(allImage)):
            if ((allItem[i].id+1) == (allImage[j].id)):
                imageItem = {
                    'id': allImage[j].id,
                    'image_url': allImage[j].url,
                    'type': allImage[j].image_type
                }
                imageList.append(imageItem)
        if (len(imageList) == 0):
            imageList = [
                {
                    "image_id": 0,
                    "image_url": "https://img.freepik.com/premium-vector/kids-toys-wood-shop-shelves_53562-2731.jpg?w=360"
                }
            ]
        jsonItem = {
            'id': allItem[i].id,
            'item_name': allItem[i].item_name,
            'status': allItem[i].status,
            'condition': allItem[i].condition,
            'price': allItem[i].price,
            'description': allItem[i].description,
            'seller_id': allItem[i].seller_id,
            'buyer_id': allItem[i].buyer_id,
            'images': imageList
        }
        listItems.append(jsonItem)
    cart = Cart.query.filter_by(user_id=buyerId).all()
    print(cart)
    filteredListItems = []
    for item in listItems:
        for i in range(len(cart)):
            if (item["id"] == cart[i].item_id):
                filteredListItems.append(item)
    return filteredListItems

# @bp.route('/cart/<buyerId>', methods=['GET'])
# def getItems(buyerId):
#     buyerId = int(buyerId)
#     cartItemId = Cart.query.filter_by(user_id=buyerId).all()
#     # print(cartItemId)
#     itemList = []
#     for itemId in cartItemId:
#         newItemList = Item.query.filter_by(item_id=itemId["item_id"]).all()
#         itemList.append(newItemList)
#     return jsonpickle.encode(itemList)

@bp.route('/hello')
def hello():
    return 'Hello, World!'

@bp.route('/test')
def test_page():
    return '<h1>Testing</h1>'