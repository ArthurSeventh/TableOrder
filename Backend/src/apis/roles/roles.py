from apiflask.blueprint import APIBlueprint
from main import db
from src.models.role_model import Role
from src.schemas.role_schema import RoleSchema
from src.apis.roles.schema import RoleGetListInSchema, RoleGetListOutSchema, RoleUpdateInSchema
from src.utilities.helpers.permission_checker import permission_required
from src.utilities.helpers.paginate import paginate
from flask_jwt_extended import jwt_required
from sqlalchemy import or_

app = APIBlueprint("roles", __name__, url_prefix="/api/v1/roles")

#ADD ROLE
@app.post("")
@app.input(RoleSchema, "json")
@app.doc(security="JWT")
@jwt_required()
@permission_required(super_only=True)
def create_role(data: dict):
    exists = db.session.query(Role.id).filter(
        or_(Role.name == data["name"], Role.key == data["key"])).first()
    if exists:
        raise Exception("This role already exist")
    
    new_role = Role(**data)

    db.session.add(new_role)
    db.session.commit()

    return {
        "message": f"Created {new_role.name} role successfully",
        "detail": RoleSchema().dump(new_role)
    }





#----------------------------------SEARCH ROLE----------------------------------
@app.get("")
@app.input(RoleGetListInSchema, "query")
@app.doc(security="JWT")
@jwt_required()
def get_roles(data: dict):
    roles = Role.query

    if data.get("search_string", None):
        if data["search_string"]:
            search_string = str.upper(data["search_string"])
            roles = roles.filter(
                or_(Role.name == search_string, Role.key == search_string))

    return paginate(roles, RoleGetListOutSchema(many=True))





#----------------------------------SEARCH ROLE----------------------------------
@app.get("/<id>")
@app.doc(security="JWT")
@jwt_required()
def get_role(id):
    role = Role.cquery().get_or_404(id)

    return {
        "message": "Get role successfully",
        "detail": RoleSchema().dump(role)
    }



#----------------------------------UPDATE ROLE----------------------------------
@app.put("/<id>")
@app.input(RoleUpdateInSchema, "json")
@app.doc(security="JWT")
@jwt_required()
@permission_required(super_only=True)
def update_role(id, data: dict):
    target_role: Role = Role.cquery().get_or_404(id)

    target_role.update(**data)
    db.session.commit()

    return {
        "message": "Update successfully"
    }





#----------------------------------DELETE ROLE----------------------------------
@app.delete("/<id>")
@app.doc(security="JWT")
@jwt_required()
@permission_required(super_only=True)
def delete_role(id):
    target_role: Role = Role.cquery().get_or_404(id)

    target_role.delete()
    db.session.commit()
    return {
        "message": "Delete successfully"
    }
