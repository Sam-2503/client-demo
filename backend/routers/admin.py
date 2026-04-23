from datetime import datetime
from typing import List
from uuid import UUID

from core.deps import get_current_user, require_admin
from core.security import hash_password
from database import get_db
from fastapi import APIRouter, Depends, HTTPException, status
from models.user import User, UserRole
from models.builder_request import BuilderRequest, BuilderRequestStatus
from schemas.builder_request import (
    ApproveBuilderRequest,
    RejectBuilderRequest,
    BuilderRequestOut,
)
from sqlalchemy.orm import Session

router = APIRouter(prefix="/api/admin", tags=["Admin"])


@router.get("/requests", response_model=List[BuilderRequestOut])
def get_builder_requests(
    status_filter: str = "pending",
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    """Get pending builder registration requests (admin only)"""
    query = db.query(BuilderRequest)
    
    if status_filter and status_filter in ["pending", "approved", "rejected"]:
        query = query.filter(BuilderRequest.status == status_filter)
    
    return query.all()


@router.post("/requests/{request_id}/approve", response_model=dict)
def approve_builder_request(
    request_id: UUID,
    payload: ApproveBuilderRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    """Approve a builder registration request (admin only)"""
    builder_req = db.query(BuilderRequest).filter(BuilderRequest.id == request_id).first()
    
    if not builder_req:
        raise HTTPException(status_code=404, detail="Builder request not found")
    
    if builder_req.status != BuilderRequestStatus.pending:
        raise HTTPException(
            status_code=400,
            detail=f"Cannot approve request with status: {builder_req.status}"
        )

    # Create user account from request
    user = User(
        email=builder_req.email,
        full_name=builder_req.full_name,
        hashed_password=builder_req.hashed_password,
        role=UserRole.builder,
        is_approved=True,
        approved_at=datetime.utcnow(),
        approval_notes=payload.notes or "Approved by admin",
    )
    db.add(user)

    # Mark request as approved
    builder_req.status = BuilderRequestStatus.approved
    builder_req.reviewed_at = datetime.utcnow()

    db.commit()
    
    return {
        "message": "Builder request approved successfully",
        "user_id": str(user.id),
        "email": user.email,
    }


@router.post("/requests/{request_id}/reject", response_model=dict)
def reject_builder_request(
    request_id: UUID,
    payload: RejectBuilderRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    """Reject a builder registration request (admin only)"""
    builder_req = db.query(BuilderRequest).filter(BuilderRequest.id == request_id).first()
    
    if not builder_req:
        raise HTTPException(status_code=404, detail="Builder request not found")
    
    if builder_req.status != BuilderRequestStatus.pending:
        raise HTTPException(
            status_code=400,
            detail=f"Cannot reject request with status: {builder_req.status}"
        )

    builder_req.status = BuilderRequestStatus.rejected
    builder_req.rejection_reason = payload.reason
    builder_req.reviewed_at = datetime.utcnow()
    
    db.commit()
    
    return {
        "message": "Builder request rejected",
        "email": builder_req.email,
        "reason": payload.reason,
    }


@router.get("/analytics", response_model=dict)
def get_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    """Get admin analytics (admin only)"""
    from models.project import Project
    from models.user import UserRole as Role
    
    total_users = db.query(User).count()
    total_builders = db.query(User).filter(User.role == Role.builder).count()
    total_clients = db.query(User).filter(User.role == Role.client).count()
    total_projects = db.query(Project).count()
    pending_requests = db.query(BuilderRequest).filter(
        BuilderRequest.status == BuilderRequestStatus.pending
    ).count()
    
    return {
        "total_users": total_users,
        "total_builders": total_builders,
        "total_clients": total_clients,
        "total_projects": total_projects,
        "pending_builder_requests": pending_requests,
    }
