from extension import db
from src.models.base_model import BaseModel
from sqlalchemy import UUID, ForeignKey

class Card(BaseModel):
    __tableName__ = "cards"
    user_id = db.Column(UUID, ForeignKey("users.id"), primary_key=True)
    dish_id = db.Column(UUID, ForeignKey("dishes.id"), primary_key=True)
    
    user = db.relationship("User", back_populates = "card",  uselist = False)
    dish = db.relationship("Dishes", back_populates = "card",  uselist = False)


    def __init__(self, **kwargs):
        super().__init__()
        self.user_id = kwargs.get("user_id",None)
        self.dish_id = kwargs.get("dish_id", None)