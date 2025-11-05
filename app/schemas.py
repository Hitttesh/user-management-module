# app/schemas.py
from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserBase(BaseModel):
    full_name: str
    mobile_number: str
    email: EmailStr
    status: str = "Active"

class UserCreate(UserBase):
    pass

class UserRead(UserBase):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}
