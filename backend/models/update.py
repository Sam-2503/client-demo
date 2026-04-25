import enum
import uuid as uuid_module
from datetime import datetime

from database import Base
from sqlalchemy import (
    JSON,
    Column,
    DateTime,
    Enum,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship


class WorkCategory(str, enum.Enum):
    foundation = "foundation"
    framing = "framing"
    roofing = "roofing"
    plumbing = "plumbing"
    electrical = "electrical"
    painting = "painting"
    flooring = "flooring"
    windows_doors = "windows_doors"
    finishing = "finishing"
    other = "other"


class Update(Base):
    __tablename__ = "updates"

    id = Column(UUID, primary_key=True, default=uuid_module.uuid4)
    project_id = Column(UUID, ForeignKey("projects.id"))

    title = Column(String)
    description = Column(Text)
    
    # Category of work being done
    category = Column(Enum(WorkCategory), default=WorkCategory.other)
    
    # Progress as percentage
    progress_percentage = Column(Float, default=0.0)
    
    # Photos/URLs for this update
    photo_urls = Column(JSON, default=list)  # list of URLs
    
    # Who posted this update
    posted_by = Column(UUID, ForeignKey("users.id"))

    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationship back to Project
    project = relationship(
        "Project", back_populates="updates"
    )
