import uuid
from datetime import datetime
from typing import Optional

from models.material import MaterialType
from pydantic import BaseModel


class MaterialCreate(BaseModel):
    material_type: MaterialType
    name: str
    quantity: float
    unit: str  # "kg", "bags", "pieces", "litres"
    unit_cost: float
    supplier: Optional[str] = None
    project_id: uuid.UUID


class MaterialOut(BaseModel):
    id: uuid.UUID
    material_type: MaterialType
    name: str
    quantity: float
    unit: str
    unit_cost: float
    total_cost: float  # auto-calculated: quantity × unit_cost
    supplier: Optional[str]
    project_id: uuid.UUID
    purchased_at: datetime
    created_at: datetime

    class Config:
        from_attributes = True
