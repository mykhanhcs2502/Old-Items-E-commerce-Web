from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app.extensions import db
from config import Config
from flask_cors import CORS, cross_origin
# from app.db import db

def create_app(config_class=Config):
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(config_class)
    # print(app['SQLALCHEMY_DATABASE_URI'])
    # Initialize Flask extensions here
    db.init_app(app)
    # Register blueprints here
    from app.main import bp as main_bp
    app.register_blueprint(main_bp)
    from app.module1s import bp as module1s_bp
    app.register_blueprint(module1s_bp, url_prefix='/module1s')
    from app.namkhoa import bp as namkhoa_bp
    app.register_blueprint(namkhoa_bp, url_prefix='/namkhoa')
    from app.namkha import bp as namkha_bp
    app.register_blueprint(namkha_bp, url_prefix='/namkha')
    from app.quangkhoi import bp as quangkhoi_bp
    app.register_blueprint(quangkhoi_bp, url_prefix = '/quangkhoi')    
    from app.mykhanh import bp as mykhanh_bp
    app.register_blueprint(mykhanh_bp, url_prefix='/mykhanh')
    from app.mybp import bp as dangkhoa_bp
    app.register_blueprint(dangkhoa_bp, url_prefix='/dangkhoab')
    from app.manhkhang import bp as manhkhang_bp
    app.register_blueprint(manhkhang_bp, url_prefix='/manhkhang')

    
    from app.models.user import User
    from app.models.item import Item
    from app.models.category import Category
    from app.models.image import Image
    from app.models.order import Order
    from app.models.review import Review
    with app.app_context():
        db.create_all()

        # db.session.add(Category(name="books"))
        # db.session.add(Category(name="laptops"))
        
        # db.session.add(User(username='admin1', password='password',email='admin@gmail.com',address='address',phone='091409140914'))
        # db.session.add(User(username='admin2', password='password',email='admin@gmail.com',address='address',phone='091509150915'))
        
        # db.session.add(Item(item_name='Macbook Pro 2020', status = 0, condition=80, price=1000,description="like new", category_id=2,seller_id=1))
        # db.session.add(Item(item_name='The Alchemist', status = 1, condition=80, price=10,description="like new", category_id=1,seller_id=2, buyer_id=1))

        # db.session.add(Image(url='https://lavenderlotusgifts.com/cdn/shop/products/IMG_2478.jpg?v=1607740677', image_type='normal', item_id=2))
        # db.session.add(Image(url='https://www.pcworld.com/wp-content/uploads/2023/06/ASUS_ROG_Zephyrus_G14_GA402_1.jpg?quality=50&strip=all', image_type='normal', item_id=3))
        # db.session.add(Image(url='https://thegioiso365.vn/wp-content/uploads/2021/03/Laptop_DELL_INSPIRON_7490-8.jpg', image_type='normal', item_id=4))
        # db.session.add(Image(url='https://laptoptld.com/wp-content/uploads/2022/06/Laptop-Lenovo-Thinkpad-X1-Carbon-Gen-7-COREI5-1.jpg', image_type='normal', item_id=5))
        # db.session.add(Image(url='https://assets-prd.ignimgs.com/2022/10/04/untitled-design-2-1664896904846.png', image_type='normal', item_id=6))
        # db.session.add(Image(url='https://assets-prd.ignimgs.com/2023/03/21/the-hobbit-illustrated-blogroll-1679423874164.png', image_type='normal', item_id=7))

        # db.session.add(Image(url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqhT4opNal1SLvVPSGmxoklzqrOOOyMOJSig&usqp=CAU', image_type='normal', item_id=2))

        # db.session.commit()

        users = User.query.all()
        print(users)

    return app