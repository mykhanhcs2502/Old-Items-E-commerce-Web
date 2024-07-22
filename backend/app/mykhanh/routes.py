from app.mykhanh import bp
from flask import request, Flask
from app.models.user import User
from app.models.item import Item
from app.models.category import Category
from app.models.image import Image
from app.models.review import Review
import jsonpickle
import json
from app.extensions import db

@bp.route('/items/<userID>', methods=['GET'])
def getItems(userID):
    args = request.args
    print(args)
    userID = int(userID)
    itemsOfSeller = Item.query.filter_by(seller_id=userID).all()  

    item_ids = []
    for item in itemsOfSeller:
        item_ids.append(item.id)
    images = Image.query.filter(Image.item_id.in_(item_ids)).all()

    check = None
    imagesOfItems = []
    for i in range(len(images)):
        if (i > 0):
            if images[i].item_id != check:
                check = images[i].item_id
                imagesOfItems.append(images[i])
        else:
            imagesOfItems.append(images[i])
            check = images[i].item_id

    size = 0
    if len(imagesOfItems) < len(itemsOfSeller):
        size = len(imagesOfItems)
    else:
        size = len(itemsOfSeller)

    serialized_items = []
    for i in range(size):
        serialized_item = {
            'id': itemsOfSeller[i].id,
            'item_name': itemsOfSeller[i].item_name,
            'status': itemsOfSeller[i].status,
            'condition': itemsOfSeller[i].condition,
            'price': itemsOfSeller[i].price,
            'description': itemsOfSeller[i].description,
            'seller_id': itemsOfSeller[i].seller_id,
            'buyer_id': itemsOfSeller[i].buyer_id,
            'image_url': imagesOfItems[i].url
        }
        serialized_items.append(serialized_item)

    item_of_seller = json.dumps(serialized_items, indent=2)
    return item_of_seller

@bp.route('/reviews/<userID>', methods=['GET'])
def getReviews(userID):
    userID = int(userID)
    itemsSold = Item.query.filter_by(seller_id=userID).all()
    buyer_ids = []
    for item in itemsSold:
        buyer_ids.append(item.buyer_id)
    #reviewsOfSeller = Review.query.filter_by(buyer_id=userID).all()
    reviewsOfSeller = Review.query.filter(Review.buyer_id.in_(buyer_ids)).all()
    serialized_reviews = []
    for review in reviewsOfSeller:
        tmp = User.query.filter_by(id=review.buyer_id).all()
        serialized_review = {
            'id': review.id,
            'star': review.star,
            'comment': review.comment,
            'review_date': review.review_date,
            'item_id': review.item_id,
            'buyer_id': review.buyer_id,
            'buyer_name': tmp[0].username
        }
        serialized_reviews.append(serialized_review)
    # print(jsonpickle.encode(reviewsOfSeller))
    return json.dumps(serialized_reviews, indent=2)

@bp.route('/get_inf/<buyerID>', methods=['GET'])
def getBuyerInf(buyerID):
    buyerID = int(buyerID)
    user = User.query.filter_by(id=buyerID).all()
    user_inf = user[0]
    serialized_user = {
        'id': user_inf.id,
        'username': user_inf.username,
        'password': user_inf.password,
        'email': user_inf.email,
        'address': user_inf.address,
        'phone': user_inf.phone
    }
    return json.dumps(serialized_user, indent=2)
