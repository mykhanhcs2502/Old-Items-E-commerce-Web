import json

import jsonpickle
from flask import request
from sqlalchemy import func

from app.manhkhang import bp
from app.models.category import Category
from app.models.image import Image
from app.models.item import Item


@bp.route('/items/<itemId>', methods=['GET'])
def getItem(itemId):
    itemId = int(itemId)
    item = Item.query.get(itemId)
    item.activate_reference()
    serialized_item = jsonpickle.encode(item)
    # weird behavior from Flask-SQLAlchemy?
    # has to call the category_ref method in order for category_ref to appear in the return json?
    # category_ref does not show the full Category object.
    similar_items = Item.query.filter(Item.category_id == item.category_id, Item.id != item.id).all()
    pre_serialized_similar_items = [
        jsonpickle.encode(similar_item) if similar_item.activate_reference() else None
        for similar_item in similar_items
    ]
    serialized_similar_items = '[' + ', '.join(pre_serialized_similar_items) + ']'
    serialized_seller_ref = jsonpickle.encode(item.seller_ref)
    item_images = Image.query.filter_by(item_id=item.id).all()
    serialized_item_images = jsonpickle.encode(item_images)
    return f"{{" \
           f'"item": {serialized_item},' \
           f'"seller":{serialized_seller_ref},' \
           f'"similar_items": {serialized_similar_items},' \
           f'"item_images": {serialized_item_images}' \
           f"}}"
    # return jsonpickle.encode({"item": similar_items})
@bp.route('/categories/<categoryId>', methods=['GET'])
def getCategoryItems(categoryId):
    category = Category.query.get(categoryId)
    items = category.belonging_items
    activated_items = [
        jsonpickle.encode(activated_item) if activated_item.activate_reference() else None
        for activated_item in items
    ]
    serialized_activated_items = '['+','.join(activated_items)+']'
    return serialized_activated_items
@bp.route('/search', methods=['GET'])
def searchItems():
    query_params = request.args
    search_value = query_params.get("q")
    search_key = f'%{search_value.lower()}%'
    matched_items = Item.query.filter(func.lower(Item.item_name).like(search_key)).all()
    activated_items = [
        jsonpickle.encode(activated_item) if activated_item.activate_reference() else None
        for activated_item in matched_items
    ]
    serialized_activated_items = '['+','.join(activated_items)+']'
    return serialized_activated_items
