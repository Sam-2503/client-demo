import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class BuilderRequestOut(BaseModel):
    id: str = Field(..., description="Request ID")
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
        
    @staticmethod
    def from_orm(obj):
        return BuilderRequestOut(
            id=str(obj.id),
            email=obj.email,
            full_name=obj.full_name,
            phone=obj.phone,
            company_name=obj.company_name,
            status=obj.status,
            rejection_reason=obj.rejection_reason,
            created_at=obj.created_at,
            reviewed_at=obj.reviewed_at,
        )


class ApproveBuilderRequest(BaseModel):
    notes: Optional[str] = None


class RejectBuilderRequest(BaseModel):
    reason: str
