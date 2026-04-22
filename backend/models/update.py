import enum
import uuid
from datetime import datetime

from database import Base
from sqlalchemy import JSON, DateTime, Enum, Float, ForeignKey, String, Text
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

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    category: Mapped[WorkCategory] = mapped_column(
        Enum(WorkCategory), default=WorkCategory.other
    )
    progress_percentage: Mapped[float] = mapped_column(
        Float, default=0.0
    )  # 0 to 100 for this category
    photo_urls: Mapped[list] = mapped_column(
        JSON, default=list
    )  # list of image URL strings
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Foreign keys
    project_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False
    )
    posted_by: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id"), nullable=False
    )

    # Relationships
    project = relationship("Project", back_populates="updates")
    posted_by_user = relationship("User", back_populates="updates")
