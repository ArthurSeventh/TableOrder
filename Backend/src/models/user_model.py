from src.models.base_model import BaseModel
from extension import db
from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from src.utilities.helpers.converter import md5_hash
from src.utilities.helpers.clean_string import clean_string


class User(BaseModel):
    __tablename__ = "users"
    username = db.Column(String, nullable=False)
    password = db.Column(String, nullable=False)
    fullname = db.Column(String)
    unaccented_fullname = db.Column(String)
    phone = db.Column(String)
    email = db.Column(String)
    is_super = db.Column(Boolean)
    avatar = db.Column(String, nullable = True)
    role_id = db.Column(UUID(as_uuid=True), ForeignKey(
        "roles.id"), nullable=False)
    
    
    role = db.relationship("Role", back_populates="users", uselist=False)
    orders = db.relationship("Order", back_populates="user", uselist = True, cascade="all, delete")
    card = db.relationship("Card", back_populates = "user",  uselist = True, cascade="all, delete")
    def __init__(self, **kwargs):
        super().__init__()
        self.username = kwargs.get("username", None)
        self.password = md5_hash(kwargs.get("password", None))
        self.fullname = kwargs.get("fullname", None)
        self.unaccented_fullname = clean_string(kwargs.get("fullname", None)) if kwargs.get("fullname",None) else None
        self.phone = kwargs.get("phone", None)
        self.email = kwargs.get("email", None)
        self.role_id = kwargs.get("role_id", None)
        self.is_super = kwargs.get("is_super", False)
        self.avatar = kwargs.get("avatar",None)
