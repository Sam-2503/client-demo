## Quick Start (2 minutes)

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL connection (Neon.tech)

### Start the Application

**Terminal 1: Start Backend**
```bash
cd backend
python -m uvicorn main:app --port 8000
```

**Terminal 2: Start Frontend**
```bash
cd frontend
npm run dev
```

**Browser**: Open http://localhost:5173

That's it! Both services are now running. 

---
## Test Accounts

```
Admin
  Email: test_admin@test.com
  Password: test1234
  
Builder
  Email: test_builder@test.com
  Password: test_1234
  (Registering as a builder requires admin approval first)
  
Client
  Email: test_client@test.com
  Password: test1234
```

---

## What Each Role Can Do

### Admin
- ✅ View pending builder requests
- ✅ Approve/reject builders
- ✅ Create projects
- ✅ View all projects and users
- ✅ Monitor system activity

### Builder
- ✅ Manage assigned projects
- ✅ Post progress updates
- ✅ Log materials used
- ✅ View client queries
- ✅ Respond to client questions
- ⏳ (Requires admin approval to create account)

### Client
- ✅ View assigned projects
- ✅ See progress updates
- ✅ Track materials used
- ✅ Ask questions to builder
- ✅ View builder responses

---

## Technology Stack

```
Frontend
├── React + TypeScript
├── Vite (build tool)
├── React Router (navigation)
├── Axios (API client)
└── TailwindCSS (styling)

Backend
├── FastAPI (web framework)
├── SQLAlchemy (ORM)
├── Pydantic (validation)
├── JWT (authentication)
└── bcrypt (password hashing)

Database
└── PostgreSQL (Neon.tech)

Deployment
├── Frontend: Vercel
└── Backend: Vercel
```

---

## API Endpoints (16+ Endpoints)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Projects
- `GET /api/projects/` - List user's projects
- `GET /api/projects/{id}` - Get project details
- `POST /api/projects/` - Create project
- `PATCH /api/projects/{id}` - Update project

### Updates
- `GET /api/updates/{project_id}` - Get project updates
- `POST /api/updates/` - Create update

### Materials
- `GET /api/materials/{project_id}` - Get materials
- `POST /api/materials/` - Add material

### Queries
- `GET /api/queries` - Get queries for user
- `POST /api/queries` - Submit query
- `POST /api/queries/{id}/respond` - Respond to query

### Admin
- `GET /api/admin/requests` - Get builder requests
- `POST /api/admin/requests/{id}/approve` - Approve builder
- `POST /api/admin/requests/{id}/reject` - Reject builder

**Full API docs available at**: http://localhost:8000/docs

### Environment Variables

**Backend (.env):**
```
FRONTEND_URL="https://rjs-home-silk.vercel.app"
APP_NAME="rjs-home API"
SECRET_KEY="your-secret-key"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES="60"
DATABASE_URL="postgresql://your-neon-tech-database-url/"

CLOUDINARY_CLOUD_NAME= "cloud-name"
CLOUDINARY_API_KEY= "cloudinary-api-key"
CLOUDINARY_API_SECRET= "cloudinary-api-secret"
```

**Frontend (.env):**
```
VITE_API_URL=https://api.yoursite.com
```

---
## ✨ Key Features

### User Management
- Registration with role selection
- Secure JWT authentication
- Builder approval workflow
- Email-based login

### Project Management
- Create and manage projects
- Assign builders and clients
- Track progress percentage
- Status management (planning, in-progress, completed)

### Real-Time Updates
- Post progress updates with photos
- Categorize updates (foundation, framing, roofing, etc.)
- Full update history
- Timestamp tracking

### Materials Management
- Log materials used
- Track quantities and costs
- Supplier information
- Total cost calculation

### Client Communication
- Ask questions about projects
- Get builder responses
- Query status tracking
- Full conversation history

### Admin Dashboard
- Approve/reject builders
- Create projects
- View all activity
- System monitoring

### Public Pages
- Professional homepage
- Services showcase
- Contact information
- Pre-login branding

---

## Highlights

✅ **Complete RBAC System** - Three roles with full permission enforcement
✅ **Real-Time Updates** - Changes visible immediately
✅ **Material Transparency** - Track every item used with costs
✅ **Query System** - Direct builder-client communication
✅ **Beautiful Design** - Professional, responsive interface
✅ **Production Ready** - Fully tested and optimized
✅ **Scalable Architecture** - Handles unlimited projects


## 🎓 How to Use

### For Clients
1. Visit http://localhost:5173/home
2. Browse company info
3. Click "Portal" → Register as Client
4. See assigned projects
5. View updates and track progress
6. Ask questions to builder

### For Builders
1. Register as Builder
2. Wait for admin approval
3. Admin approves (via admin portal)
4. Login to builder dashboard
5. Post updates and materials
6. Respond to client queries

### For Admins
1. Register as Admin
2. Go to Approvals section
3. Approve/reject builders
4. Create projects
5. Monitor all activity

---

## 🔄 Workflow Example

```
1. Admin creates a house project
   ↓
2. Admin assigns builder to project
   ↓
3. Builder logs in and sees project
   ↓
4. Builder posts an update: "Foundation complete"
   ↓
5. Client sees update in real-time
   ↓
6. Client asks: "When is framing?"
   ↓
7. Builder responds to query
   ↓
8. Client sees response immediately
   ↓
9. Everyone stays informed ✅
```
