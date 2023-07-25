from extension import db
from src.models.base_model import BaseModel
from sqlalchemy import String, Boolean, Integer


class Dishes(BaseModel):
    __tablename__ = "dishes"
    type = db.Column(String, nullable=False)
    image = db.Column(String, nullable=False)
    name = db.Column(String, nullable=False)
    price = db.Column(Integer, nullable = False)
    description = db.Column(String, nullable = False)
    active = db.Column(Boolean)
    order_detail = db.relationship("OrderDetail", back_populates = "dishes", uselist= True)
    card = db.relationship("Card", back_populates = "dish",  uselist = True)
    
    def __init__(self, **kwargs):
        super().__init__()
        self.type = kwargs.get('type',None)
        self.image = kwargs.get("image",None)
        self.name = kwargs.get("name",None)
        self.price = kwargs.get("price",None)
        self.description = kwargs.get("description",None)
        self.active = True
