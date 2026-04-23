from typing import List

from core.deps import get_current_user, require_builder
from database import get_db
from fastapi import APIRouter, Depends
from models.user import User, UserRole
from schemas.user import UserOut
from sqlalchemy.orm import Session

router = APIRouter(prefix="/api/users", tags=["Users"])


@router.get("/me", response_model=UserOut)
def get_me(current_user: User = Depends(get_current_user)):
    """Return the currently logged-in user."""
    return current_user


@router.get("/clients", response_model=List[UserOut])
def get_clients(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_builder),
):
    """Return all registered clients. Used by builder when assigning a project."""
    return (
        db.query(User)
        .filter(User.role == UserRole.client, User.is_active == True)
        .all()
    )
