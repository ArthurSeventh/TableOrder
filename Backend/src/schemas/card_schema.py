from marshmallow import fields
from src.schemas.base_schema import BaseSchema
from src.schemas.dishes_schema import DishesSchema
# from src.schemas.user_schema import UserSchema

class CardsSchema(BaseSchema):
    user_id = fields.UUID(required=True)
    dish_id = fields.UUID(required=True)
    dish = fields.Nested(nested=DishesSchema) 