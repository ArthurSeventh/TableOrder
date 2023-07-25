from apiflask.blueprint import APIBlueprint
from sqlalchemy import and_, not_
from flask_jwt_extended import jwt_required, create_access_token, current_user, get_jwt
from extension import jwt
from main import db
from datetime import datetime, timedelta
from src.utilities.helpers.converter import milisecond_convert



#=============================Table=============================
from src.models.table import Table
from src.models.order_model import Order

#=============================Schema=============================
from src.apis.tables.schema import CreateTableSchema, GetTableSchemaIn, GetTableSchemaOut, GetOrderId

app = APIBlueprint("Table", __name__, url_prefix="/api/v1/tables")


#=================================Create Table=====================
@app.post("/create-table")
@app.input(CreateTableSchema, "json")
def create_table(data):
    exits = Table.query.filter(
        and_(
            Table.category == data["category"], 
            Table.code == data["code"]          
        )
    ).first()

    if exits:
        raise Exception("Table Already exist !!!")
    
    new_table = Table(**data)
    new_table.create()
    db.session.commit()

    return{
        "message" : "Create Table Succesfully",
        "detail" : CreateTableSchema().dump(new_table)
    }

#================================Get_Table===============================
@app.post("/get-table")
@app.input(GetTableSchemaIn, "json")
def get_table(data):


    date = data["date_time"]
    time = data["time_section"]

    unavailable_table = db.session.\
                    query(Table.id).\
                    join(Order, Table.id == Order.table_id).\
                    filter(and_(
                        Order.issue_date == date, 
                        Order.time_section == time,
                        Order.active == True,
                        )).all()
    

    #Convert tuple to list and cast item in it to string
    unavailable_table = [str(x) for x, in unavailable_table]

    all_table = Table.query.all()
    result = GetTableSchemaOut(many=True).dump(all_table)

    for item in result:
        if item["id"] in unavailable_table:
            target = Order.query.filter(and_(Order.table_id == item["id"],Order.issue_date == date, Order.time_section == time), Order.active == True).first()
            order_id = GetOrderId().dump(target)
            item["state"] = False
            item["order_id"] = order_id["id"]
        else:
            item["state"] = True
            item["order_id"] = None
    return {
        "message" : "Get Table success",
        "detail" :  result
    }

    # start = milisecond_convert(data["date_time"])
    # end = milisecond_convert(datetime.now() + timedelta(hours=2))

    # unavailable_table = db.session.query(
    #                          Table.id,                                          
    #                          ).join(Order, Table.id == Order.table_id).\
    #                          filter(and_(Order.issue_date.between(start, end),
    #                                           Order.active == False)).all()

    # query = Table.query.all()
    # result = GetTableSchemaOut(many=True).dump(query)

    # for table in result:
    #     if table["id"] in unavailable_table:
    #         table["state"] = False
    #     else:
    #         table["state"] = True

#================================Order_Table===============================
