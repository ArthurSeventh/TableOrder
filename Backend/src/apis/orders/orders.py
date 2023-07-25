from apiflask.blueprint import APIBlueprint
from flask_jwt_extended import jwt_required, create_access_token, current_user, get_jwt
from extension import jwt
from main import db 
from datetime import datetime, timedelta
from sqlalchemy import and_, or_


#------------------------------ Utilities services-----------------------
from src.utilities.helpers.converter import milisecond_convert
from src.utilities.helpers.permission_checker import permission_required
#-----------------------------------Import Table------------------------------
from src.models.table import Table
from src.models.order_model import Order
from src.models.orderDetail import OrderDetail
from src.models.dish_model import Dishes
#------------------------------Schema------------------------------
from src.apis.orders.schema import OrderTableIn,\
GetOrderDetails, GetOrderIn, GetOrderOut, \
DeleteOrder, OrderDishesIn, OrderTableOut, \
GetOrderByUserOut, GetTableOut, GetOrderDetailByUserOut, GetOrderByUserIn
#------------------------------Rigist BluePrint------------------------------
app = APIBlueprint("Order", __name__, url_prefix="/api/v1/orders")




#==============================Get Order=======================
@app.post("/get-order")
# @app.doc(security="JWT")
# @jwt_required()
# @permission_required()
@app.input(GetOrderIn, "json")
def get_order(data):

    list = Order.query.filter(and_(Order.active == True, Order.issue_date >= data["issue_date"])).all()
    
    result = GetOrderOut(many=True).dump(list)

    for item in result:
        if item["table_id"]:
            item["type"] = "Table"
        else:
            item["type"] = "Dishes"
             
    return{
        "Message" : "Get Order successfully",
        "Order_list" : result
    }


@app.post("/get-all-order")
# @app.doc(security="JWT")
# @jwt_required()
# @permission_required()
def get_all_order():

    list = Order.query.all()
    
    result = GetOrderOut(many=True).dump(list)

    for item in result:
        if item["table_id"]:
            item["type"] = "Table"
        else:
            item["type"] = "Dishes"
             
    return{
        "Message" : "Get Order successfully",
        "Order_list" : result
    }

#==============================Get Order By User ID=======================
@app.post("/get-order-by-user")
@app.doc(security="JWT")
@jwt_required()
@app.input(GetOrderByUserIn,"json")
def getOrderByID(data):
    list = Order.query.filter(and_(Order.user_id == current_user.id, Order.active == True, Order.issue_date >= data["issue_date"] )).all()
    order = GetOrderByUserOut(many=True).dump(list)

    for item in order:
        if item["table_id"]:
            item["type"] = "Table"
        else:
           item["type"] = "Dishes"
           
    return{
        "message": "Successful",
        "detail": order,
        "len": len(list)
    }


#=================================Make Order Table=====================
@app.post("/make-order-table")
@app.input(OrderTableIn, "json")
@app.doc(security="JWT")
@jwt_required()
def order_table(data):
    user_id = current_user.id
    table_id = data.get("table_id",None)
    time_section = data["time_section"]
    issue_date = data["issue_date"]

    exits = Order.query.filter(and_(
                                Order.issue_date == issue_date, 
                                Order.time_section == time_section, 
                                Order.table_id == table_id,
                                Order.active == True,
                                )).first()
    if exits:
        raise Exception("Table Already Order")
    
    new_order = Order(**{
        "issue_date" : issue_date,
        "user_id" : user_id,
        "time_section" : time_section,
        "table_id" : table_id,  
    })

    db.session.add(new_order)
    db.session.commit()
    result = OrderTableOut().dump(new_order)
    return{
        "message" : "Make Order Successfully",
        "details" : result
    }

#=================================Make Order Dishes=====================
@app.post("/make-order-dishes")
@app.input(OrderDishesIn, "json")
@app.doc(security="JWT")
@jwt_required()
def order_dishes(data):
    new_order = Order(**{
        "user_id": current_user.id,
        "issue_date" : data["issue_date"],
    })

    db.session.add(new_order)

    #---------Create Order_Detail-----------------
    order_id = new_order.id
    dishes_id = data["dishes_id"]

    for item in dishes_id:
        new_order_detail = OrderDetail(**{
        "order_id" :  order_id,
        "dishes_id" : item
        })
        db.session.add(new_order_detail)

    db.session.commit()

    return{
        "message" : "Make Order Successfully",
        "details" : GetOrderDetails().dump(new_order_detail)
    }
    

#=================================Delet Order=====================
@app.delete("/delete-order/<id>")
def delete_order(id):   
    target:Order = Order.query.filter(Order.id == id).first()
    
    db.session.delete(target)
    db.session.commit()

    return{
        "message" : "Delete Successfully",
        "Detail" : DeleteOrder().dump(target)
    }
#==============================Get Order Detail=======================
@app.get("/order-details/<id>")
# @app.doc(security="JWT")
# @jwt_required()
# @permission_required()
def get_orderDetails(id):
    user = current_user

    target = OrderDetail.query.filter(OrderDetail.order_id == id).all()

    if not target:
        raise Exception("Order Details Not Found")
    result = GetOrderDetails(many=True).dump(target)

    return{
        "message" : "Get Order details Successfully",
        "Detail" : result
    }