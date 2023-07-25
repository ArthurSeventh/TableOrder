from apiflask.blueprint import APIBlueprint
from sqlalchemy import and_
from flask_jwt_extended import jwt_required, create_access_token, current_user, get_jwt
from extension import jwt
from main import db
from src.models.card_model import Card


#===============================Schema===============================
from src.apis.cards.schema import  GetCardOut,\
AddToCardIn, AddToCardOut

app = APIBlueprint("Cards", __name__, url_prefix="/api/v1/cards")


#================================Get Card=====================
@app.get("/get-card")
@app.doc(security="JWT")
@jwt_required()
def get_card():

    list = Card.query.filter(Card.user_id == current_user.id).all()
    total = len(list)

    return{
        "message": "Get Card Success",
        "detail": GetCardOut(many=True).dump(list),
        "Total": total,
    }


#===============================Add To Card======================
@app.post("/add-to-card")
@app.input(AddToCardIn, "json")
@app.doc(security="JWT")
@jwt_required()
def AddToCard(data):
    new_card = Card(**{
        "user_id" : current_user.id,
        "dish_id" : data["dish_id"]
    })
    db.session.add(new_card)
    db.session.commit()
    return{
        "message": "Add Success",
        "detail": GetCardOut().dump(new_card)
    }

#=====================================Pop out Card======================
@app.delete("pop-out-card/<id>")
@app.doc(security="JWT")
@jwt_required()
def pop_out_card(id):
    delete_card = Card.query.filter(and_(Card.dish_id == id, Card.user_id == current_user.id)).first().delete()
    db.session.commit()

    return{
        "message": "Delete Successfull",
    }

#=====================================Delete Card======================
@app.delete("clean-card")
@app.doc(security="JWT")
@jwt_required()
def clean_card():
    delete_card = Card.query.filter(and_(Card.user_id == current_user.id)).delete()
    db.session.commit()

    return{
        "message": "Clean Card Successfull",
    }

