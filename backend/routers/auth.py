from core.security import create_access_token, hash_password, verify_password
from database import get_db
from fastapi import APIRouter, Depends, HTTPException, status
from models.user import User, UserRole
from models.builder_request import BuilderRequest
from schemas.user import LoginRequest, Token, UserCreate, UserOut
from schemas.builder_request import BuilderRequestOut
from sqlalchemy.orm import Session

router = APIRouter(prefix="/api/auth", tags=["Auth"])


@router.post("/register", status_code=201)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user.
    - Clients/Admins: Account created immediately with access token
    - Builders: Request created, awaiting admin approval
    """
    # Check if email exists in users or pending requests
    existing_user = db.query(User).filter(User.email == payload.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    existing_request = db.query(BuilderRequest).filter(BuilderRequest.email == payload.email).first()
    if existing_request:
        raise HTTPException(status_code=400, detail="Registration request already exists for this email")

    # For builders: create pending request instead of user
    if payload.role == UserRole.builder:
        builder_request = BuilderRequest(
            email=payload.email,
            full_name=payload.full_name,
            hashed_password=hash_password(payload.password),
        )
        db.add(builder_request)
        db.commit()
        db.refresh(builder_request)
        return {
            "message": "Registration request submitted. Please wait for admin approval.",
            "request_id": str(builder_request.id),
            "email": builder_request.email,
            "status": "pending"
        }

    # For clients/admins: create user immediately with access token
    user = User(
        full_name=payload.full_name,
        email=payload.email,
        hashed_password=hash_password(payload.password),
        role=payload.role,
        is_approved=True,  # Admins and clients are auto-approved
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    # Return Token (with access_token) for immediate login capability
    token = create_access_token(data={"sub": str(user.id), "role": user.role})
    return Token(access_token=token, user=UserOut.model_validate(user))


@router.post("/login", response_model=Token)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()

    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account is deactivated")
    
    # Builders must be approved before login
    if user.role == UserRole.builder and not user.is_approved:
        raise HTTPException(status_code=403, detail="Account awaiting admin approval. Please contact support.")

    token = create_access_token(data={"sub": str(user.id), "role": user.role})
    return Token(access_token=token, user=UserOut.model_validate(user))
