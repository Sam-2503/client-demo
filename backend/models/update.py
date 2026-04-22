import enum
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

    id = Column(UUID, primary_key=True)
    project_id = Column(UUID, ForeignKey("projects.id"))

    title = Column(String)
    description = Column(Text)

    media = Column(JSON)  # list of {type, url}

    progress = Column(Integer)  # % completion

    created_at = Column(DateTime, default=datetime.utcnow)
