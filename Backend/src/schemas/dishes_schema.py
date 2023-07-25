from marshmallow import fields
from src.schemas.base_schema import BaseSchema


class DishesSchema(BaseSchema):
    type = fields.String(required = True)
    image = fields.String()
    name = fields.String(required = True)
    description = fields.String(required = True)
    price = fields.Integer()
    active = fields.Boolean()
    # order_detail = fields.Nested(nested=)
