import uuid
from typing import List

from core.deps import get_current_user, require_builder
from database import get_db
from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from models.project import Project
from models.update import Update
from models.user import User, UserRole
from schemas.update import UpdateCreate, UpdateOut
from sqlalchemy.orm import Session
from websocket.manager import manager

router = APIRouter(prefix="/api/updates", tags=["Updates"])


# ── WebSocket — stays async, WebSockets are always async ───────────────────
@router.websocket("/ws/{project_id}")
async def websocket_endpoint(websocket: WebSocket, project_id: str):
    await manager.connect(websocket, project_id)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket, project_id)


# ── REST endpoints ──────────────────────────────────────────────────────────
@router.get("/", response_model=List[UpdateOut])
def get_all_updates(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get all updates accessible to the current user"""
    if current_user.role == UserRole.admin:
        # Admins see all updates
        return (
            db.query(Update)
            .order_by(Update.created_at.desc())
            .all()
        )
    elif current_user.role == UserRole.builder:
        # Builders see updates for their own projects
        return (
            db.query(Update)
            .join(Project, Update.project_id == Project.id)
            .filter(Project.builder_id == current_user.id)
            .order_by(Update.created_at.desc())
            .all()
        )
    else:  # client
        # Clients see updates for their own projects
        return (
            db.query(Update)
            .join(Project, Update.project_id == Project.id)
            .filter(Project.client_id == current_user.id)
            .order_by(Update.created_at.desc())
            .all()
        )


@router.post("/", response_model=UpdateOut, status_code=201)
def post_update(
    payload: UpdateCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_builder),
):
    project = db.query(Project).filter(Project.id == payload.project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Only project builder or admin can post updates
    if current_user.id != project.builder_id and current_user.role != UserRole.admin:
        raise HTTPException(status_code=403, detail="Only project builder or admin can post updates")
    
    # Check if builder is approved (only for non-admins)
    if current_user.role == UserRole.builder and not current_user.is_approved:
        raise HTTPException(status_code=403, detail="Only approved builders can post updates")

    update = Update(**payload.model_dump(), posted_by=current_user.id)
    db.add(update)
    db.commit()
    db.refresh(update)

    # Fire and forget broadcast — run async broadcast from sync context
    import asyncio

    asyncio.create_task(
        manager.broadcast_to_project(
            str(payload.project_id),
            {
                "event": "NEW_UPDATE",
                "project_id": str(payload.project_id),
                "update": {
                    "id": str(update.id),
                    "title": update.title,
                    "category": update.category,
                    "progress_percentage": update.progress_percentage,
                    "description": update.description,
                    "photo_urls": update.photo_urls,
                    "posted_by": str(update.posted_by),
                    "created_at": update.created_at.isoformat(),
                },
            },
        )
    )
    return update


@router.get("/{project_id}", response_model=List[UpdateOut])
def get_updates_for_project(
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
        db.query(Update)
        .filter(Update.project_id == project_id)
        .order_by(Update.created_at.desc())
        .all()
    )
