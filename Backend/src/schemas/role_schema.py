from src.schemas.base_schema import BaseSchema
from marshmallow import fields


class RoleSchema(BaseSchema):
    name = fields.String(required=True)
    key = fields.String(required=True)
