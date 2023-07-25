from extension import db
from src.models.base_model import BaseModel
from sqlalchemy import String, event, or_


class Role(BaseModel):
    __tablename__ = "roles"
    name = db.Column(String, nullable=False)
    key = db.Column(String, nullable=False)

    users = db.relationship("User", back_populates="role", uselist=True)

    def __init__(self, **kwargs):
        super().__init__()
        self.name = kwargs.get("name", None)
        self.key = kwargs.get("key", None)
