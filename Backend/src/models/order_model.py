from extension import db
from src.models.base_model import BaseModel
from sqlalchemy import String, ForeignKey, Boolean, Integer, Date
from sqlalchemy.dialects.postgresql import UUID

class Order(BaseModel):
    __tablename__ = "orders"
    user_id = db.Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable= False)
    table_id = db.Column(UUID(as_uuid=True), ForeignKey("tables.id"))
    active = db.Column(Boolean)
    # period = db.Column(Integer)
    issue_date = db.Column(Date)
    time_section = db.Column(Integer)

    #________________RelationShip______________________
    user = db.relationship("User", back_populates="orders", uselist = False)
    table = db.relationship("Table", back_populates="orders", uselist = False)
    orderdetail = db.relationship('OrderDetail', back_populates="order", uselist = True, cascade="all, delete")
    def __init__(self, **kwargs):
        super().__init__()
        self.user_id = kwargs.get("user_id",None)
        self.table_id = kwargs.get("table_id",None)
        self.active = True
        # self.period = kwargs.get("period",2)
        self.issue_date = kwargs.get("issue_date",None)
        self.time_section= kwargs.get("time_section",0)

