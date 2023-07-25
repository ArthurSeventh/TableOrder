from marshmallow import fields
from src.schemas.role_schema import RoleSchema
from src.schemas.base_schema import BaseSchema
from src.schemas.card_schema import CardsSchema


class UserSchema(BaseSchema):
    username = fields.String(required=True)
    password = fields.String(required=True, load_only=True)
    fullname = fields.String(required=False, allow_none=True)
    phone = fields.String(required=False, allow_none=True)
    email = fields.String(required=False, allow_none=True)
    role_id = fields.UUID(required=True)
    avatar = fields.String(required=False, allow_none=True)
    is_super = fields.Boolean()

    role = fields.Nested(nested=RoleSchema)
    card = fields.Nested(nested=CardsSchema)
