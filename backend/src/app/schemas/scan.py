from datetime import datetime

from pydantic import BaseModel


class ScanCreate(BaseModel):
    host: str
    port: int
    title: str


class ScanCreateInternal(ScanCreate):
    id: str
    status: str
    user_id: int


class ScanRead(BaseModel):
    id: str
    host: str
    port: int
    title: str
    status: str
    created_at: datetime
