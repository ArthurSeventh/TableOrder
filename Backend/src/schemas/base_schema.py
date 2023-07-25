from extension import ma
from apiflask import fields


class BaseSchema(ma.Schema):
    id = fields.UUID(dump_only=True, metadata={
        "title": "This is the identify key of an entity",
        "description": "This key will be assign automatically to an entity when ever that entity being create",
        "example": "399536a0-1365-4782-9eba-3dcfed241d34"})
    created_at = fields.Integer(dump_only=True)
    created_by = fields.UUID(dump_only=True)
    updated_at = fields.Integer()
    updated_by = fields.UUID()
