from src.schemas.card_schema import CardsSchema
from apiflask import Schema, fields


class GetCardOut(CardsSchema):
    class Meta:
        fields = ("user_id", "dish_id", "dish")

class GetCardIn(CardsSchema):
    class Meta:
        fields = ("user_id",)

class AddToCardIn(CardsSchema):
    class Meta:
        fields = ("dish_id",)

class AddToCardOut(CardsSchema):
    class Meta:
        fields = ("dish_id", "dish")