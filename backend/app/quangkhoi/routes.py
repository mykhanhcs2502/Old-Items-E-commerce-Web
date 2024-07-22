from app.quangkhoi import bp
from flask import request,Flask,jsonify
from app.models.user import User
from app.models.item import Item
from app.models.category import Category
import jsonpickle
import json
from app.extensions import db
#login API
@bp.route('/login/', methods = ['POST'])
def login():
    data = request.json 
    username = data['username']
    password = data['password']
    user = User.query.filter_by(username = username).first()
    if user == None or user.password != password :
        return jsonify({"error":"error"}),200
    else:
        userid = user.id
        return jsonify({"userName":username,"userId":str(userid)}), 200
    
#sign up API    
@bp.route('/signup/', methods = ['POST'])
def signup():
    data = request.json
    username = data['username']
    password = data['password']
    email = data['email']
    user = User.query.filter_by(username = username).first()
    if user:
        return jsonify({"error":"error"}),200
    max_id = User.query.order_by(User.id.desc()).first().id
    id = max_id + 1
    new_user = User(id = id,username = username, password = password,email = email,address = '',phone = '')
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message":"Sign up successfully"}), 200


#get personal information API
@bp.route('/myaccount/<user_id>', methods = ['GET']) 
def getMyaccount(user_id):
    id = int(user_id)
    user = User.query.filter_by(id = id).first()
    if user:
        return jsonify({
            "username":user.username,
            "email": user.email,
            "address": user.address,
            "phone": user.phone
        })
    else:
        return jsonify({"error":"error"}),404
