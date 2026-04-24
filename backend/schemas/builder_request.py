import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, field_serializer


class BuilderRequestOut(BaseModel):
    id: uuid.UUID = Field(..., description="Request ID")
    email: EmailStr
    full_name: str
    phone: Optional[str] = None
    company_name: Optional[str] = None
    status: str  # pending, approved, rejected
    rejection_reason: Optional[str] = None
    created_at: datetime
    reviewed_at: Optional[datetime] = None

    class Config:
        from_attributes = True
    
    @field_serializer('id')
    def serialize_id(self, value: uuid.UUID) -> str:
        return str(value)


class ApproveBuilderRequest(BaseModel):
    notes: Optional[str] = None


class RejectBuilderRequest(BaseModel):
    reason: str
