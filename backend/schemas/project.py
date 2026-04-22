import uuid
from datetime import datetime
from typing import Optional

from models.project import ProjectStatus
from pydantic import BaseModel


class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None
    location: Optional[str] = None
    start_date: Optional[datetime] = None
    expected_end_date: Optional[datetime] = None
    client_id: uuid.UUID  # which client this project belongs to


class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    status: Optional[ProjectStatus] = None
    overall_progress: Optional[float] = None
    expected_end_date: Optional[datetime] = None


class ProjectOut(BaseModel):
    id: uuid.UUID
    name: str
    description: Optional[str]
    location: Optional[str]
    status: ProjectStatus
    overall_progress: float
    start_date: Optional[datetime]
    expected_end_date: Optional[datetime]
    client_id: uuid.UUID
    builder_id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
