# app/models.py
from sqlalchemy import Column, Integer, String, DateTime, func
# import the single shared Base from database.py
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(150), nullable=False)
    mobile_number = Column(String(20), nullable=False, default="")
    email = Column(String(150), nullable=False, unique=True, index=True)
    status = Column(String(10), nullable=False, default="Active")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
