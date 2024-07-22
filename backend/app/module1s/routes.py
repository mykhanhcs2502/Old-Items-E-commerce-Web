from app.module1s import bp

@bp.route('/')
def index():
    return "This is routed to / request of module1s"

@bp.route('/categories/')
def categories():
    return "This is routed to /categories of module1s"