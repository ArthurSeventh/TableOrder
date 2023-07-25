import functools
from flask_jwt_extended import verify_jwt_in_request, get_jwt, current_user

def permission_required(roles: list = ["A"], super_only: bool = False):
    def wrapper(fn):
        @functools.wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            is_permitted = False
            is_super = current_user.is_super      
            if is_super:
                return fn(*args, **kwargs)
            if not super_only:
                if claims:
                    if claims.get("role"):
                        if claims["role"] in roles:
                            is_permitted = True
            if is_permitted:
                return fn(*args, **kwargs)
            else:
                raise Exception("Insufficient authority")
        return decorator
    return wrapper
