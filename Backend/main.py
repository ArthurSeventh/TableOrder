import os
from apiflask import APIFlask
from extension import db, ma, cors, jwt, mir

from src.apis import register_apis
from src.utilities.services.exception_handler import exception_handler_init

def create_app():
    app = APIFlask(__name__)

    # configuration for db, jwt, 
    setup_configurations(app)
    # Pre-definded initialize for SQLALCHEMY, Marshmallow, Cors, jwt, migrate
    setup_extentions(app)

    #Set up Blueprint for routes
    register_apis(app)

    #Predefined error handeler for app
    exception_handler_init(app)
    configure_cli(app)

    return app


def setup_configurations(app: APIFlask):
    app.config.from_pyfile("config.py")
    app.security_schemes = {
        "JWT":{"type" : "http", "in" : "header", "scheme" : "bearer"}
    }
    # app.security_schemes = {
    #     "JWT": {"type": "http", "in": "header", "scheme": "bearer"}}


def setup_extentions(app: APIFlask):
    db.init_app(app)
    ma.init_app(app)
    mir.init_app(app, db)
    jwt.init_app(app)
    # để người dùng truy cập được vào API thì phải bắt đầu bằng /api/
    cors.init_app(app, resources={r"/api/*": {"origins": "*"}})

def configure_cli(app: APIFlask):
    import manage    
    app.cli.add_command(manage.init)


if __name__ == "__main__":
    create_app().run()
