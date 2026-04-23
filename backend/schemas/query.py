from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from uuid import UUID


class QueryCreate(BaseModel):
    project_id: UUID
    question: str


class QueryRespond(BaseModel):
    answer: str


class QueryOut(BaseModel):
    id: UUID
    project_id: UUID
    asked_by_id: UUID
    answered_by_id: Optional[UUID] = None
    question: str
    answer: Optional[str] = None
    status: str  # open, resolved
    created_at: datetime
    resolved_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class QueryDetailOut(QueryOut):
    """Extended query with user details"""
    asked_by: Optional[dict] = None  # User info who asked
    answered_by: Optional[dict] = None  # User info who answered
