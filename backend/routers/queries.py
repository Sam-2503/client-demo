from datetime import datetime
from typing import List
from uuid import UUID

from core.deps import get_current_user
from database import get_db
from fastapi import APIRouter, Depends, HTTPException, status
from models.user import User, UserRole
from models.query import Query, QueryStatus
from models.project import Project
from schemas.query import QueryCreate, QueryRespond, QueryOut, QueryDetailOut
from sqlalchemy.orm import Session

router = APIRouter(prefix="/api/queries", tags=["Queries"])


@router.get("", response_model=List[QueryOut])
def get_queries(
    project_id: UUID = None,
    status_filter: str = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Get queries based on user role:
    - Clients: Only their own questions
    - Builders: Questions about their projects
    - Admins: All questions
    """
    query = db.query(Query)

    # Filter by role
    if current_user.role == UserRole.client:
        query = query.filter(Query.asked_by_id == current_user.id)
    elif current_user.role == UserRole.builder:
        # Get all queries for projects where user is builder
        from models.project import Project
        builder_projects = db.query(Project).filter(Project.builder_id == current_user.id).all()
        project_ids = [p.id for p in builder_projects]
        query = query.filter(Query.project_id.in_(project_ids))
    # Admin can see all

    # Filter by project if specified
    if project_id:
        query = query.filter(Query.project_id == project_id)

    # Filter by status if specified
    if status_filter and status_filter in ["open", "resolved"]:
        query = query.filter(Query.status == status_filter)

    return query.all()


@router.post("", response_model=QueryOut, status_code=201)
def create_query(
    payload: QueryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Create a new query (clients can ask questions about their projects)"""
    
    # Verify project exists and user is assigned to it
    project = db.query(Project).filter(Project.id == payload.project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    if project.client_id != current_user.id and current_user.role != UserRole.admin:
        raise HTTPException(
            status_code=403,
            detail="You can only ask questions about your assigned projects"
        )

    query = Query(
        project_id=payload.project_id,
        asked_by_id=current_user.id,
        question=payload.question,
    )
    db.add(query)
    db.commit()
    db.refresh(query)
    return query


@router.get("/{query_id}", response_model=QueryDetailOut)
def get_query(
    query_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get a specific query"""
    query = db.query(Query).filter(Query.id == query_id).first()
    
    if not query:
        raise HTTPException(status_code=404, detail="Query not found")
    
    # Permission check
    is_owner = query.asked_by_id == current_user.id
    is_builder_of_project = (
        db.query(Project)
        .filter(Project.id == query.project_id, Project.builder_id == current_user.id)
        .first()
    )
    is_admin = current_user.role == UserRole.admin

    if not (is_owner or is_builder_of_project or is_admin):
        raise HTTPException(status_code=403, detail="Access denied")

    return query


@router.post("/{query_id}/respond", response_model=QueryOut)
def respond_to_query(
    query_id: UUID,
    payload: QueryRespond,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Respond to a query (builder/admin only)"""
    query = db.query(Query).filter(Query.id == query_id).first()
    
    if not query:
        raise HTTPException(status_code=404, detail="Query not found")
    
    # Only builder/admin of the project can respond
    project = db.query(Project).filter(Project.id == query.project_id).first()
    if project.builder_id != current_user.id and current_user.role != UserRole.admin:
        raise HTTPException(status_code=403, detail="Only project builder/admin can respond")

    query.answer = payload.answer
    query.answered_by_id = current_user.id
    query.status = QueryStatus.resolved
    query.resolved_at = datetime.utcnow()
    
    db.commit()
    db.refresh(query)
    return query


@router.put("/{query_id}", response_model=QueryOut)
def update_query_status(
    query_id: UUID,
    status: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update query status (open/resolved)"""
    query = db.query(Query).filter(Query.id == query_id).first()
    
    if not query:
        raise HTTPException(status_code=404, detail="Query not found")
    
    # Permission check - only query owner, project builder, or admin
    project = db.query(Project).filter(Project.id == query.project_id).first()
    is_owner = query.asked_by_id == current_user.id
    is_builder = project.builder_id == current_user.id
    is_admin = current_user.role == UserRole.admin

    if not (is_owner or is_builder or is_admin):
        raise HTTPException(status_code=403, detail="Access denied")

    if status not in ["open", "resolved"]:
        raise HTTPException(status_code=400, detail="Invalid status")

    query.status = status
    if status == "resolved":
        query.resolved_at = datetime.utcnow()
    
    db.commit()
    db.refresh(query)
    return query
