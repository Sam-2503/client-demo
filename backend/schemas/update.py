import uuid
from datetime import datetime
from typing import List, Optional

from models.update import WorkCategory
from pydantic import BaseModel


class UpdateCreate(BaseModel):
    title: str
    description: Optional[str] = None
    category: WorkCategory = WorkCategory.other
    progress_percentage: float = 0.0
    photo_urls: List[str] = []
    project_id: uuid.UUID


class UpdateOut(BaseModel):
    id: uuid.UUID
    title: str
    description: Optional[str]
    category: WorkCategory
    progress_percentage: float
    photo_urls: List[str]
    project_id: uuid.UUID
    posted_by: uuid.UUID
    created_at: datetime

    class Config:
        from_attributes = True
