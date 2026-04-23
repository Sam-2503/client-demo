import uuid
from typing import List

from core.deps import get_current_user, require_builder
from database import get_db
from fastapi import APIRouter, Depends, HTTPException
from models.project import Project
from models.user import User, UserRole
from schemas.project import ProjectCreate, ProjectOut, ProjectUpdate
from sqlalchemy.orm import Session

router = APIRouter(prefix="/api/projects", tags=["Projects"])


@router.post("/", response_model=ProjectOut, status_code=201)
def create_project(
    payload: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_builder),
):
    # Check if builder is approved
    if current_user.role == UserRole.builder and not current_user.is_approved:
        raise HTTPException(
            status_code=403,
            detail="Only approved builders can create projects"
        )
    
    project = Project(**payload.model_dump(), builder_id=current_user.id)
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


@router.get("/", response_model=List[ProjectOut])
def get_projects(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role in (UserRole.admin, UserRole.builder):
        return db.query(Project).all()
    return db.query(Project).filter(Project.client_id == current_user.id).all()


@router.get("/{project_id}", response_model=ProjectOut)
def get_project(
    project_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    if current_user.role == UserRole.client and project.client_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")

    return project


@router.patch("/{project_id}", response_model=ProjectOut)
def update_project(
    project_id: uuid.UUID,
    payload: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_builder),
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    # Only project builder or admin can edit
    if current_user.id != project.builder_id and current_user.role != UserRole.admin:
        raise HTTPException(status_code=403, detail="Only project builder or admin can edit")
    
    # Check if builder is approved (only for non-admins)
    if current_user.role == UserRole.builder and not current_user.is_approved:
        raise HTTPException(status_code=403, detail="Only approved builders can edit projects")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(project, field, value)

    db.commit()
    db.refresh(project)
    return project


@router.delete("/{project_id}", status_code=204)
def delete_project(
    project_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_builder),
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Only project builder or admin can delete
    if current_user.id != project.builder_id and current_user.role != UserRole.admin:
        raise HTTPException(status_code=403, detail="Only project builder or admin can delete")
    
    db.delete(project)
    db.commit()
