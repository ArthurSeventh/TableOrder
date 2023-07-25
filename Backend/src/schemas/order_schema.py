from marshmallow import fields
from src.schemas.base_schema import BaseSchema
from src.schemas.user_schema import UserSchema
from src.schemas.table_schema import TableSchema
from src.schemas.order_detail_schema import OrderDetailSchema



class OrderSchema(BaseSchema):
    user_id = fields.UUID(required = True)
    table_id = fields.UUID(required= True)
    issue_date = fields.Date()
    time_section = fields.Integer()
    active = fields.Boolean() 
    user = fields.Nested(nested=UserSchema)
    orderdetail = fields.Nested(nested=OrderDetailSchema(many=True))
    table= fields.Nested(nested=TableSchema)
