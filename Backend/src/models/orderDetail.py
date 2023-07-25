from extension import db
from sqlalchemy import String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID

class OrderDetail(db.Model):
    __tablename__ = "orderdetail"
    order_id = db.Column(UUID(as_uuid=True), ForeignKey("orders.id"), primary_key=True)
    dishes_id = db.Column(UUID(as_uuid=True), ForeignKey("dishes.id"), primary_key=True)
    
    #________________RelationShip______________________
    dishes = db.relationship("Dishes", back_populates = "order_detail", uselist = False)
    order = db.relationship("Order", back_populates = "orderdetail", uselist = False)
    def __init__(self, **kwargs) -> None:
        self.order_id = kwargs.get("order_id", None)
        self.dishes_id = kwargs.get("dishes_id", None)
