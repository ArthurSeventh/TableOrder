from apiflask import APIFlask, HTTPError
from flask_jwt_extended.exceptions import NoAuthorizationError, WrongTokenError, RevokedTokenError, UserLookupError


def exception_handler_init(app: APIFlask):

    @app.errorhandler(NoAuthorizationError)
    def no_auth_exception_handle(ex):
        return {
            "status": 401,
            "message": "Unauthorized"
        }, 401

    @app.errorhandler(WrongTokenError)
    @app.errorhandler(UserLookupError)
    @app.errorhandler(RevokedTokenError)
    def invalid_token_exception_handle(ex):
        return {
            "status": 401,
            "message": "Authorization token invalid or revoked"
        }, 401


    @app.errorhandler(Exception)
    @app.errorhandler(HTTPError)
    def exception_handle(ex):
        return{
            "status" : 500,
            "message" : ex.args[0]
        }, 500
    # @app.errorhandler(Exception)
    # @app.errorhandler(HTTPError)
    # def exception_handle(ex):
    #     return {
    #         "status": 500,
    #         "message": ex.args[0]
    #     }, 500

