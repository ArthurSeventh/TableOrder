from apiflask.blueprint import APIBlueprint
from flask_jwt_extended import jwt_required, current_user
from extension import db
from sqlalchemy import or_
from src.models.user_model import User
from src.apis.users.schema import GetListInSchema, GetListOutSchema, GetDetailOutSchema, UpdateInSchema, AssignRoleInSchema, ChangePasswordInSchema
from src.utilities.helpers.paginate import paginate
from src.utilities.helpers.clean_string import clean_string
from src.utilities.helpers.permission_checker import permission_required
from src.utilities.helpers.converter import md5_hash


#============================== Import for send file=================== 
from werkzeug.datastructures import FileStorage
import os
from flask import send_file
from config import basedir


app = APIBlueprint("users", __name__, url_prefix="/api/v1/users")



#---------------------------------GET LIST USER-----------------------------
@app.get("")
@app.input(GetListInSchema, "query")
@app.doc(security="JWT")
@jwt_required()
def get_users(data: dict):

    users = User.cquery().filter(User.is_super == False)

    if data.get("search_string", None):
        search_string = clean_string(data["search_string"], True)
        users = users.filter(
            or_(User.unaccented_fullname.like(f"%{search_string}%"),
                User.username.like(f"%{search_string}%")))

    return  {
        'message': 'Query user Successfully',
        'details': GetListOutSchema(many=True).dump(users)
    }



#---------------------------------SEARCH USER BY ID-----------------------------
@app.get("/<id>")
@app.doc(security="JWT")
@jwt_required()
def get_user(id):
    user = User.cquery().get_or_404(id)

    return {
        "message": "Get user successfully",
        "detail": GetDetailOutSchema().dump(user)
    }

#---------------------------------Get Current User-----------------------------
@app.get("/get-current-user")
@app.doc(security="JWT")
@jwt_required()
def get_current_user():
    user = User.query.filter(User.id == current_user.id).first()

    return {
        "message": "Get user successfully",
        "detail": GetDetailOutSchema().dump(user)
    }



#---------------------------------GET USER AVATAR-----------------------------
@app.get("/get-image/<image>")
def get_image(image):
    if not image:
        raise Exception("Invalid Image")
    
    return send_file(f"{basedir}/Images/User/{image}")


#---------------------------------UPDATE USER-----------------------------
@app.put("/update-user")
@app.input(UpdateInSchema, "form_and_files")
@app.doc(security="JWT")
@jwt_required()
def update_user(data: dict):
    target_user: User = User.query.filter(User.id == current_user.id).first()
    image :FileStorage = data.get("file_input",None)
    if image:
        path = f"{basedir}/Images/User/{image.filename}"
        image.save(path)
        data["avatar"] = f"/users/get-image/{image.filename}"
    try:
        target_user.update(**data)
        db.session.commit()
    except:
        os.remove(data["image"])
    return {
        "message": "Update successfully"
    }



#---------------------------------DELETE USER-----------------------------
@app.delete("/<id>")
@app.doc(security="JWT")
@jwt_required()
@permission_required()
def delete_user(id):
    target_user: User = User.cquery().get_or_404(id)

    target_user.delete()
    db.session.commit()

    return {
        "message": "Delete successfully"
    }



#ASSIGN ROLE FOR USER RECEIVED: user_id, role_id
@app.post("/assign-role/<id>")
@app.input(AssignRoleInSchema, "json")
@app.doc(security="JWT")
@jwt_required()
@permission_required()
def assign_role(id, data: dict):
    target_user: User = User.cquery().get_or_404(id)

    target_user.update(**data)
    db.session.commit()

    return {
        "message": f"Assigned {target_user.role.name} role for user {target_user.username}"
    }


#---------------------------------CHANG USER PASSWORD-----------------------------
@app.post("/change-password/<id>")
@app.input(ChangePasswordInSchema, "json")
@app.doc(security="JWT")
@jwt_required()
def change_password(id, data: dict):
    target_user: User = User.cquery().get_or_404(id)

    old_password = md5_hash(data["old_password"])

    if target_user.password != old_password:
        raise Exception("Password not match")

    new_password = md5_hash(data["new_password"])

    data["password"] = new_password
        
    target_user.update(**data)
    db.session.commit()

    return {
        "message": "Change password successfully"
    }
