from flask import Blueprint

bp = Blueprint('manhkhang', __name__)


from app.manhkhang import routes