from apiflask.blueprint import APIBlueprint
from sqlalchemy import and_, or_
from flask_jwt_extended import create_access_token, current_user, jwt_required, get_jwt
from extension import jwt
from main import db


from src.utilities.helpers.converter import md5_hash
from src.models.user_model import User
from src.models.role_model import Role
from src.apis.users.schema import RegisterInSchema, RegisterOutSchema, LoginInSchema, LoginOutSchema, VerifyTokenSchema


app = APIBlueprint("authentication", __name__, url_prefix="/api/v1/auth")

#----------------------------REGIST-----------------------------------------
@app.post("/register")
@app.input(RegisterInSchema, "json")
def register(data):
    exists = db.session.query(User.id).filter(
        User.username == data["username"])  
    
    if data.get("email", None):
        exists = exists.filter(User.email == data["email"])

    if data.get("phone", None):
        exists = exists.filter(User.phone == data["phone"])

    exists = exists.first()

    if exists:
        raise Exception("Username, Email or Phone already exists!")

    user_role,= db.session.query(Role.id).filter(Role.key == "U").first()
    data["role_id"] = user_role
    new_user = User(**data)

    db.session.add(new_user)
    db.session.commit()

    return {
        "message": "Success",
        "detail": RegisterOutSchema().dump(new_user)
    }


#----------------------------LOGIN-----------------------------------------
@app.post("/login")
@app.input(LoginInSchema, "json")
def login(data):
    username = data["username"]
    password = md5_hash(data["password"])
    target_user: User = User.query.filter(
        and_(User.username == username, User.password == password)).first()

    if not target_user:
        raise Exception("Wrong username or password")
    
    user_role = Role.query.filter(Role.id == target_user.role_id).one()
    result = LoginOutSchema().dump(target_user)
    result["role_key"] = target_user.role.key

    return {
        "message": "Login successfully",
        "detail": {
            "access_token": create_access_token(identity=target_user.id, additional_claims={"role": user_role.key}),
            "user": result
        }
    }

#------------------------------Verify Token-----------------------
@app.post("/token")
@app.doc(security="JWT")
@jwt_required()
def get_user_info():
    target_user: User = current_user
    result = VerifyTokenSchema().dump(target_user)
    result["role_key"] = target_user.role.key
    return{
        "user" : result
    }



#------------------------------ASSIGN CURRENT-USER---------------------------
@jwt.user_lookup_loader
def user_loader_callback(jwt_headers, jwt_payload):
    identity = jwt_payload["sub"]
    return User.query.filter(User.id == identity).one()

