import enum
import uuid
from datetime import datetime

from database import Base
from sqlalchemy import DateTime, Enum, Float, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship


class MaterialType(str, enum.Enum):
    lumber = "lumber"
    cement = "cement"
    bricks = "bricks"
    steel = "steel"
    paint = "paint"
    tiles = "tiles"
    plumbing_pipes = "plumbing_pipes"
    electrical_wire = "electrical_wire"
    glass = "glass"
    sand = "sand"
    gravel = "gravel"
    other = "other"


class Material(Base):
    __tablename__ = "materials"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    material_type: Mapped[MaterialType] = mapped_column(
        Enum(MaterialType), nullable=False
    )
    name: Mapped[str] = mapped_column(
        String(200), nullable=False
    )  # e.g. "Teak Wood Planks"
    quantity: Mapped[float] = mapped_column(Float, nullable=False)
    unit: Mapped[str] = mapped_column(
        String(50), nullable=False
    )  # e.g. "kg", "bags", "pieces"
    unit_cost: Mapped[float] = mapped_column(Float, nullable=False)  # cost per unit
    total_cost: Mapped[float] = mapped_column(
        Float, nullable=False
    )  # quantity × unit_cost
    supplier: Mapped[str] = mapped_column(String(200), nullable=True)
    purchased_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Foreign key
    project_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False
    )

    # Relationship
    project = relationship("Project", back_populates="materials")
