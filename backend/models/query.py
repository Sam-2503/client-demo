import enum
import uuid
from datetime import datetime

from database import Base
from sqlalchemy import DateTime, ForeignKey, Text, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship


class QueryStatus(str, enum.Enum):
    open = "open"
    resolved = "resolved"


class Query(Base):
    __tablename__ = "queries"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    project_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("projects.id"))
    asked_by_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"))
    answered_by_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    
    question: Mapped[str] = mapped_column(Text, nullable=False)
    answer: Mapped[str] = mapped_column(Text, nullable=True)
    status: Mapped[QueryStatus] = mapped_column(Enum(QueryStatus), default=QueryStatus.open)
    
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    resolved_at: Mapped[datetime] = mapped_column(DateTime, nullable=True)

    # Relationships
    project = relationship("Project", foreign_keys=[project_id])
    asked_by = relationship("User", foreign_keys=[asked_by_id], back_populates="queries_asked")
    answered_by = relationship("User", foreign_keys=[answered_by_id], back_populates="queries_answered")
