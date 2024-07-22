from app.namkhoa import bp
from flask import request,Flask
from app.models.user import User
from app.models.item import Item
from app.models.category import Category
import jsonpickle
import json
from app.extensions import db
from flask_cors import CORS, cross_origin
# this is used to retrieve all item categories
@bp.route('/categories/', methods=['GET'])
def getCategories():
    
    itemCategories = Category.query.all()
    return jsonpickle.encode(itemCategories)

# this is used to retrieve items of a seller
@bp.route('/items/', methods=['GET'])
@cross_origin()
def getItemsOfUser():
    args = request.args
    sellerId = args.get("sellerId", default=0, type=int)
    if (sellerId ==0):
        itemsOfSeller = Item.query.all()
    else:    
        itemsOfSeller = Item.query.filter_by(seller_id=sellerId).all()
    for item in itemsOfSeller:
        print(item.item_name)
        print(item.seller_ref)
        print(item.item_images)
        print(item.category_ref)
        # temp =item.category_ref 
        # print(temp.name)
    return jsonpickle.encode(itemsOfSeller)

# this is used to add an item from user store
@bp.route('/items/', methods=['POST'])
def createItem():
    request_data = request.get_json()

    item_name = request_data['item_name']
    status = 0 #because add item so the status is always new
    condition = request_data['condition']
    price = request_data['price']
    description = request_data['description']
    category_id = int(request_data['category_id'])
    seller_id = request_data['seller_id']
    
    item= Item(item_name=item_name, status = status, condition=condition, price=price,description=description, category_id=category_id ,seller_id=seller_id)
    print(item)
    db.session.add(item)
    db.session.commit()
    return json.dumps({'message':'add item successfully'})

# this is used to delete an item from user store
@bp.route('/items/<itemId>', methods=['DELETE'])
def deleteItem(itemId):
    itemId = int(itemId)
    print(itemId)
    item = Item.query.get(itemId)
    db.session.delete(item)
    db.session.commit()
    return json.dumps({'message':'delete item successfully'})



# this is used to add an item from user store
@bp.route('/items/<itemId>', methods=['PUT'])
def updateItem(itemId):
    request_data = request.get_json()
    itemId = int(itemId)
    item_name = request_data['item_name']
    status = request_data['status']
    condition = request_data['condition']
    price = request_data['price']
    description = request_data['description']
    category_id = request_data['category_id']
    
    item = Item.query.get(itemId)
    item.item_name=item_name
    item.status = status
    item.condition=condition
    item.price=price
    item.description=description
    item.category_id=category_id
    print(item)
    
    item.verified = True
    db.session.commit()
    return json.dumps({'message':'update item successfully'})
    