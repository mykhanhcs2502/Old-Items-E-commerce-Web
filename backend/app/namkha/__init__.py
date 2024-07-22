from flask import Blueprint

bp = Blueprint('namkha', __name__)


from app.namkha import routes