from apiflask.blueprint import APIBlueprint
from sqlalchemy import and_
from flask_jwt_extended import jwt_required, create_access_token, current_user, get_jwt
from extension import jwt
from main import db
from werkzeug.datastructures import FileStorage
import os
from src.utilities.helpers.converter import md5_hash
from src.models.dish_model import Dishes
from src.models.order_model import Order
from src.models.orderDetail import OrderDetail
from src.models.table import Table
from src.apis.dishes.schema import getMenuSchema, addDishesSchemaIn, addDishesSchemaOut
from config import basedir
from flask import send_file

# print(basedir)
app = APIBlueprint("Dishes", __name__, url_prefix="/api/v1/dishes")



#=====================================Get Menu========================
@app.get("/get-menu")
def get_menu():

    dishes = Dishes.query.filter(Dishes.active == True)
    result = getMenuSchema(many=True).dump(dishes)

    return{
        "message": "Get Menu Success",
        "detail": result
    }

#=====================================Get Image========================
@app.get("/get-image/<image>")
def get_image(image):
    if not image:
        raise Exception("Invalid Image")
    
    return send_file(f"{basedir}/Images/{image}")





#=====================================Add Dishes========================
@app.post("/add-dishes")
@app.input(addDishesSchemaIn, "form_and_files")
@app.doc(security="JWT")
@jwt_required()
def add_dishes(data):
    exits = Dishes.query.filter(
        and_(Dishes.name == data["name"], Dishes.type == data["type"])).first()

    if exits:
        raise Exception("Dishes are already exits!!")
    
    image :FileStorage = data["file_input"]
    path = f"{basedir}/Images/{image.filename}"
    image.save(path)
    data["image"] = f"/dishes/get-image/{image.filename}"
    try:
        new_dishes =  Dishes(**data)
        db.session.add(new_dishes)
        db.session.commit()
    except:
        os.remove(data["image"])
 
    return{
        "message": "Add dishes successfulluy",
        "Detail" : addDishesSchemaOut().dump(new_dishes)
    }


#=====================================Delete Dishes=========================
@app.delete("/delete-dishes/<id>")
def delete_dishes(id): 
    target: Dishes = Dishes.query.filter(Dishes.id == id).first()

    if not target:
        raise Exception("Invalid Dishes")
    
    target.active = False

    db.session.commit()

    return {
        "message" :  "Delete Succesfully",
    }
    