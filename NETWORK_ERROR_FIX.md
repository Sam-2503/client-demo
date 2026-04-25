# 🔧 Network Error Fix - Production Deployment

**Date**: 2026-04-25  
**Issue**: Frontend on Vercel cannot connect to Railway backend  
**Status**: ✅ Fixed

---

## 🐛 Problem Summary

When accessing the deployed Vercel frontend (rjs-home-silk.vercel.app), login attempts show:
- **"Network Error"** message
- Failed API calls to backend
- CORS blocking requests

**Root Cause**: Backend CORS configuration was set to allow only localhost, not the Vercel domain.

---

## ✅ Solution Implemented

### Backend Changes

**File**: `backend/main.py`

Changed from hardcoded localhost list to dynamic CORS configuration:

```python
# Build CORS origins list
cors_origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174",
    "https://localhost:3000",
    "https://localhost:5173",
]

# Add FRONTEND_URL from environment if set
if settings.FRONTEND_URL and settings.FRONTEND_URL not in cors_origins:
    cors_origins.append(settings.FRONTEND_URL)

# Support multiple domains if needed (comma-separated in env)
if hasattr(settings, 'ALLOWED_ORIGINS') and settings.ALLOWED_ORIGINS:
    allowed = settings.ALLOWED_ORIGINS.split(",")
    cors_origins.extend([origin.strip() for origin in allowed])

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**File**: `backend/config.py`

Added ALLOWED_ORIGINS configuration:

```python
ALLOWED_ORIGINS: str = ""  # Comma-separated list of additional origins
```

---

## 📋 What You Need To Do

### Step 1: Get Your URLs

**Railway Backend URL**:
1. Go to Railway dashboard
2. Click "rjs-homes-api" project
3. Click "Visit" button (top right)
4. Copy the URL (e.g., `https://rjs-homes-api-prod-xxxxx.railway.app`)

**Vercel Frontend URL**:
1. Go to Vercel dashboard
2. Click "rjs-home" project
3. From your images: `rjs-home-silk.vercel.app`
4. Full URL: `https://rjs-home-silk.vercel.app`

### Step 2: Update Railway Environment Variables

In Railway console:
1. Go to "rjs-homes-api" project
2. Click "Variables" or "Settings" → "Environment"
3. Add or update this variable:

```
FRONTEND_URL = https://rjs-home-silk.vercel.app
```

4. Click Save
5. Railway auto-redeploys (takes 1-2 minutes)

### Step 3: Update Vercel Environment Variables

In Vercel console:
1. Go to "rjs-home" project
2. Click "Settings" → "Environment Variables"
3. Update or verify this variable:

```
VITE_API_URL = https://rjs-homes-api-prod-xxxxx.railway.app
```

(Use YOUR Railway URL from Step 1)

4. Click Save
5. Vercel auto-redeploys (takes 1-2 minutes)

### Step 4: Test the Connection

1. Wait for both deployments to finish (watch Deployments tabs)
2. Visit: `https://rjs-home-silk.vercel.app/login`
3. Try to login with test credentials:
   - Email: `test_client@test.com`
   - Password: `test123`
4. Should work now! No more "Network Error"

---

## 🔍 Debugging Checklist

If still getting Network Error:

### Check 1: Environment Variables
- [ ] Railway FRONTEND_URL is set to your Vercel domain
- [ ] Vercel VITE_API_URL is set to your Railway URL
- [ ] Both have `https://` (not http://)
- [ ] No trailing slashes

### Check 2: Deployments Finished
- [ ] Railway shows "Ready" status
- [ ] Vercel shows "Ready" status
- [ ] Both have been redeployed (green checkmark)

### Check 3: Backend Accessibility
Open terminal and run:
```bash
curl https://your-railway-url.railway.app/docs
```

Should return HTML. If connection timeout, backend URL is wrong.

### Check 4: Network Tab
1. Visit Vercel frontend
2. Open DevTools (F12)
3. Go to "Network" tab
4. Try to login
5. Look for API call:
   - Should see request to your Railway URL
   - Status should be 200 or 400 (not 0)
   - Check Response headers for `access-control-*` headers

### Check 5: Console Errors
1. Open DevTools (F12)
2. Go to "Console" tab
3. Look for specific error messages
4. CORS errors will mention the domain

---

## 📝 Environment Variables Reference

### Backend (Railway)

**Required**:
- `DATABASE_URL` - PostgreSQL connection string from Neon.tech
- `JWT_SECRET` - Your JWT secret key

**For Production**:
- `FRONTEND_URL` - Your Vercel frontend domain (e.g., `https://rjs-home-silk.vercel.app`)

**Optional**:
- `ALLOWED_ORIGINS` - Comma-separated list of additional allowed origins

### Frontend (Vercel)

**Required**:
- `VITE_API_URL` - Your Railway backend URL (e.g., `https://rjs-homes-api-prod.railway.app`)

---

## 🎯 Common Mistakes

❌ **WRONG**:
```
VITE_API_URL = localhost:8000
FRONTEND_URL = localhost:5173
```

✅ **RIGHT**:
```
VITE_API_URL = https://rjs-homes-api-prod.railway.app
FRONTEND_URL = https://rjs-home-silk.vercel.app
```

---

## 📊 Testing the Fix

### Test Case 1: Login Flow
1. Visit frontend
2. Try login as client
3. Should succeed

### Test Case 2: Register Flow
1. Visit frontend
2. Register new user
3. Should get confirmation

### Test Case 3: API Calls
1. Login successfully
2. Open Network tab (F12)
3. Navigate app
4. All API calls should:
   - Go to your Railway URL
   - Return 200 status
   - Have CORS headers in response

---

## 🚀 After Everything Works

Once login works:
1. Test all user roles (Admin, Builder, Client)
2. Test project creation
3. Test updates system
4. Test query system
5. Verify all features work end-to-end

---

## 📞 Support

If still having issues:

Share with me:
1. Your Railway backend URL
2. Your Vercel frontend URL
3. Screenshot of Railway Variables
4. Screenshot of Vercel Variables
5. Network tab screenshot (F12)
6. Console errors screenshot

I'll help debug!

---

## ✅ Status

- [x] Backend code updated
- [x] Code committed to git
- [x] Ready for production
- [ ] Environment variables set (YOUR JOB)
- [ ] Testing passed (after you set env vars)

---

**Next Step**: Set the 2 environment variables and redeploy!

**Time to Fix**: 5 minutes  
**Difficulty**: Easy

Let me know when you've set the variables, and we can test together!
