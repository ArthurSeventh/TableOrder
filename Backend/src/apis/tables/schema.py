from src.schemas.table_schema import TableSchema
from src.schemas.order_schema import OrderSchema
from marshmallow import fields, Schema



class GetTableSchemaIn(Schema):
    date_time = fields.Date()
    time_section = fields.Integer()
        
class GetTableSchemaOut(TableSchema):
    # available = fields.Boolean()
    class Meta:
        fields = ("category", "id", "code")

class GetOrderId(OrderSchema):
    class Meta: 
        fields = ("id",)
      

class CreateTableSchema(TableSchema):
    class Meta:
        fields = ("category", "code")

