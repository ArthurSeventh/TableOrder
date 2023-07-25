from marshmallow import fields, Schema
from src.schemas.dishes_schema import DishesSchema
# from src.schemas.order_schema import OrderSchema


class OrderDetailSchema(Schema):
    order_id = fields.UUID(required= True)
    dishes_id = fields.UUID(required= True)

    dishes = fields.Nested(nested= DishesSchema)
    # order = fields.Nested(nested= OrderSchema)
