from extension import db
from src.models.base_model import BaseModel
from sqlalchemy import String, Boolean, Integer

class Table(BaseModel):
    __tablename__ = "tables"
    category = db.Column(String, nullable=False)
    code = db.Column(Integer, nullable=False)
    orders = db.relationship("Order", back_populates="table", uselist = True)


    def __init__(self, **kwargs):
        super().__init__()
        self.category = kwargs.get('category',None)
        self.code = kwargs.get("code",None)
