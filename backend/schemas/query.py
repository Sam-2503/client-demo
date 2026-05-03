from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
from uuid import UUID


class QueryCreate(BaseModel):
    project_id: UUID
    question: str


class QueryRespond(BaseModel):
    answer: str
    answer_media_urls: Optional[List[str]] = None


class UserBasic(BaseModel):
    """Basic user info for queries"""
    id: UUID
    email: str
    full_name: str
    
    class Config:
        from_attributes = True


class QueryOut(BaseModel):
    id: UUID
    project_id: UUID
    asked_by_id: UUID
    answered_by_id: Optional[UUID] = None
    question: str
    answer: Optional[str] = None
    answer_media_urls: List[str] = Field(default_factory=list)
    status: str  # open, resolved
    created_at: datetime
    resolved_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class QueryDetailOut(BaseModel):
    """Extended query with user details"""
    id: UUID
    project_id: UUID
    asked_by_id: UUID
    answered_by_id: Optional[UUID] = None
    question: str
    answer: Optional[str] = None
    answer_media_urls: List[str] = Field(default_factory=list)
    status: str
    created_at: datetime
    resolved_at: Optional[datetime] = None
    asked_by: Optional[UserBasic] = None
    answered_by: Optional[UserBasic] = None
    
    class Config:
        from_attributes = True
