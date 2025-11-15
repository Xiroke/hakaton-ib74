from datetime import datetime

from pydantic import BaseModel


class ScanCreate(BaseModel):
    target: str
    title: str


class ScanCreateInternal(ScanCreate):
    id: str
    status: str
    user_id: int


class ScanRead(BaseModel):
    id: str
    target: str
    title: str
    status: str
    created_at: datetime
