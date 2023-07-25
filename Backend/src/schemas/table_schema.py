from marshmallow import fields
from src.schemas.base_schema import BaseSchema

class TableSchema(BaseSchema):
    category = fields.String(required = True)
    code = fields.Integer()
    period =  fields.Integer()
   
