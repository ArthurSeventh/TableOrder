from src.schemas.order_schema import OrderSchema
from src.schemas.order_detail_schema import OrderDetailSchema
from src.schemas.table_schema import TableSchema
from marshmallow import Schema, fields

class OrderTableIn(OrderSchema):
    class Meta:
        fields = ("table_id","issue_date","time_section")


class OrderTableOut(OrderSchema):
    class Meta:
        fields = ("id", "table_id", "user_id")

class OrderDishesIn(OrderSchema):
    dishes_id = fields.List(fields.UUID(required=True))
    class Meta:
        fields = ("issue_date","dishes_id")


class GetOrderIn(OrderSchema):
    class Meta:
        fields = ("issue_date",)

class GetOrderOut(OrderSchema):
    class Meta:
        fields = ("id","user_id","table_id","issue_date","time_section","active","table","orderdetail","user")

class GetOrderDetails(OrderDetailSchema):
    class Meta:
        fields = ("order_id" ,"dishes_id" ,"dishes")


class DeleteOrder(OrderSchema):
    class Meta: 
        fields = ("id",)

class GetTableOut(TableSchema):
    class Meta:
        fields = ("category", "code",)


class GetDishesOut(TableSchema):
    class Meta:
        fields = ("category", "code",)


#==========================Get order by User ====================

class GetOrderByUserIn(OrderSchema):
    class Meta:
        fields = ("issue_date",)


class GetOrderByUserOut(OrderSchema):
    class Meta:
        fields = ("id", "table_id","issue_date","time_section", "orderdetail", "table")


class GetOrderDetailByUserOut(OrderDetailSchema):
    class Meta:
        fields = ("dishes_id" ,"dishes")