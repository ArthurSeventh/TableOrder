import uuid
import datetime
from flask_jwt_extended import current_user
from sqlalchemy import event
from sqlalchemy.dialects.postgresql import UUID
from src.utilities.helpers.converter import milisecond_convert
from flask_sqlalchemy import BaseQuery
from extension import db


class BaseModel(db.Model):
    __abstract__ = True
    id = db.Column(UUID(as_uuid=True), primary_key=True)
    created_at = db.Column(db.BigInteger)
    created_by = db.Column(UUID(as_uuid=True))
    updated_at = db.Column(db.BigInteger)
    updated_by = db.Column(UUID(as_uuid=True))

    def __init__(self):
        self.id = uuid.uuid4()
        self.created_at = milisecond_convert(datetime.datetime.now())
        self.updated_at = milisecond_convert(datetime.datetime.now())
        self.created_by = current_user.id if current_user else None
        self.updated_by = current_user.id if current_user else None

    def update(self, **properties):
        for attr, value in properties.items():
            if hasattr(self, attr):
                setattr(self, attr, value)

    def delete(self):
        from extension import db
        try:
            db.session.delete(self)
        except Exception:
            raise Exception("Delete failed")

    def create(self):
        from extension import db
        try:
            db.session.add(self)
        except Exception:
            raise Exception("Create failed")

    def save(self):
        from extension import db
        try:
            db.session.flush()
        except Exception:
            raise Exception("Save failed")

    def commit(self):
        from extension import db
        try:
            db.session.commit()
        except Exception:
            raise Exception("Commit failed")

    @classmethod
    def cquery(cls) -> BaseQuery:
        query: BaseQuery = cls.query
        return query


@event.listens_for(BaseModel, "before_update", propagate=True)
def on_update_trigger(mapper, connection, target):
    from flask_jwt_extended import current_user
    target.updated_at = milisecond_convert(datetime.datetime.now())
    if current_user:
        target.updated_by = current_user.id
