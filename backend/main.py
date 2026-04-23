import models.material
import models.project
import models.update

# Import all models so Base knows about them before create_all
import models.user
from config import settings
from database import Base, engine
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers
from routers.auth import router as auth_router
from routers.materials import router as materials_router
from routers.projects import router as projects_router
from routers.updates import router as updates_router

# with the other router imports
from routers.users import router as users_router

# ── Create all tables in Neon.tech on startup ────────────────────────────────
Base.metadata.create_all(bind=engine)
print("✅ Database tables ready")

# ── App init ──────────────────────────────────────────────────────────────────
app = FastAPI(title=settings.APP_NAME, version="1.0.0")

# ── CORS ──────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL,
        "http://localhost:3000",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(auth_router)
app.include_router(projects_router)
app.include_router(updates_router)
app.include_router(materials_router)
# with the other app.include_router() calls
app.include_router(users_router)


@app.get("/")
def root():
    return {"message": f"{settings.APP_NAME} is running 🚀"}
