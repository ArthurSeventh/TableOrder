from apiflask import APIFlask
from src.apis.users.authentication import app as authentication_controller
from src.apis.roles.roles import app as role_controller
from src.apis.users.users import app as user_controller
from src.apis.dishes.dishes import app as dishes_controller
from src.apis.tables.table import app as table_controller
from src.apis.orders.orders import app as order_controller
from src.apis.cards.cards import app as card_controller


def register_apis(app: APIFlask):
    app.register_blueprint(role_controller)
    app.register_blueprint(authentication_controller)
    app.register_blueprint(user_controller)
    app.register_blueprint(dishes_controller)
    app.register_blueprint(table_controller)
    app.register_blueprint(order_controller)
    app.register_blueprint(card_controller)