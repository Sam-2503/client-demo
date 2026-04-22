import uuid
from typing import List

from core.deps import get_current_user, require_builder
from database import get_db
from fastapi import APIRouter, Depends, HTTPException
from models.material import Material
from models.project import Project
from models.user import User, UserRole
from schemas.material import MaterialCreate, MaterialOut
from sqlalchemy.orm import Session

router = APIRouter(prefix="/api/materials", tags=["Materials"])


@router.post("/", response_model=MaterialOut, status_code=201)
def add_material(
    payload: MaterialCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_builder),
):
    project = db.query(Project).filter(Project.id == payload.project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    material = Material(
        **payload.model_dump(),
        total_cost=payload.quantity * payload.unit_cost,
    )
    db.add(material)
    db.flush()
    db.refresh(material)
    return material


@router.get("/{project_id}", response_model=List[MaterialOut])
def get_materials(
    project_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    if current_user.role == UserRole.client and project.client_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")

    return (
        db.query(Material)
        .filter(Material.project_id == project_id)
        .order_by(Material.purchased_at.desc())
        .all()
    )


@router.delete("/{material_id}", status_code=204)
def delete_material(
    material_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_builder),
):
    material = db.query(Material).filter(Material.id == material_id).first()
    if not material:
        raise HTTPException(status_code=404, detail="Material not found")
    db.delete(material)
