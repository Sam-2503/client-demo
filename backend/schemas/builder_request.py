from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr


class BuilderRequestOut(BaseModel):
    id: str
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


class ApproveBuilderRequest(BaseModel):
    notes: Optional[str] = None


class RejectBuilderRequest(BaseModel):
    reason: str
