from src.schemas.role_schema import RoleSchema
from apiflask import Schema
from marshmallow import fields


class RoleGetListInSchema(Schema):
    search_string = fields.String(required=False, allow_none=True)


class RoleGetListOutSchema(RoleSchema):
    class Meta:
        fields = ("id", "key", "name")


class RoleUpdateInSchema(RoleSchema):
    class Meta:
        fields = ("key", "name")
