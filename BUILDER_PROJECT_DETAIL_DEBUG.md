# Builder Project Detail Loading - Debug Guide

## Status: ✅ Backend API is 100% Working

I've thoroughly tested the backend APIs and verified all 4 endpoints work correctly:
- ✅ GET /api/projects/{id} - Returns 200 with project data
- ✅ GET /api/updates/{id} - Returns 200 with updates array
- ✅ GET /api/materials/{id} - Returns 200 with materials array
- ✅ GET /api/queries?project_id={id} - Returns 200 with queries array

## Frontend Changes Made

1. **Removed Auto-Redirect** (Line 158): 
   - Previous code had `navigate("/builder/projects")` in catch block
   - Removed to prevent automatic navigation away from detail page
   - Now shows error message instead

2. **Enhanced Error Display** (Lines 266-277):
   - Shows Project ID on loading screen
   - Displays error message if loading fails
   - Better debugging information

3. **Improved Console Logging**:
   - Logs token presence and first 30 chars
   - Logs API endpoint being called
   - Logs status codes and response details
   - Helps identify exactly where the failure occurs

## How to Debug in Your Browser

1. **Open Browser Console**: Press `F12` on Windows/Linux or `Cmd+Option+I` on Mac
2. **Switch to "Console" tab**
3. **Login as Builder**
4. **Navigate to Projects Dashboard**
5. **Click on a Project Card**
6. **Watch the console output for logs like:**
   ```
   Loading project: {project-id-here}
   Token present: true
   Token: eyJhbGciOiJIUzI1NiIsInR5cCI6...
   Calling /api/projects/{project-id}
   ✓ Project loaded: {project object}
   ✓ All data loaded, setting state...
   ✓ State updated, component should render
   ```

7. **If Error Occurs, Look For:**
   ```
   Failed to load project - Error: {error message}
   Status: {HTTP status code like 401, 403, 404, 500}
   ```

## Test Data

You can use these credentials to test:

```
Admin Account:
- Email: admin_new@test.com
- Password: Admin123!

Builder Account:
- Email: builder@builtrack.test  
- Password: Builder123!
- (Must be approved by admin first)

Client Account:
- Email: client@builtrack.test
- Password: Client123!
```

## Expected Console Output on Success

When everything works, you'll see:
1. "Loading project: {id}"
2. "Token present: true"
3. "Token: eyJ..."
4. "Calling /api/projects/{id}"
5. "✓ Project loaded: {data}"
6. "✓ All data loaded, setting state..."
7. "✓ State updated, component should render"

Then the page should display the project details with tabs for Updates, Materials, Queries, and Info.

## Expected Console Output on Failure

If there's an error, you'll see:
1. "Failed to load project - Error: {description}"
2. "Status: {code}" (401, 403, 404, 500, etc.)
3. "Full response: {error details}"

Common errors:
- **401 Unauthorized**: Token is missing or expired. Try logging in again.
- **403 Forbidden**: Your user doesn't have permission to view this project. Make sure you're accessing your own project.
- **404 Not Found**: The project doesn't exist. Check the project ID in the URL.
- **500 Internal Server Error**: Backend issue. Check backend logs.

## Verification Steps

1. **Check Token Storage**:
   - Open Dev Tools > Application/Storage > Local Storage
   - Look for `rjs_token` - it should contain a long JWT string
   - If it's empty, login again

2. **Check Network Tab**:
   - Open Dev Tools > Network tab
   - Reload the project detail page
   - Look for the API calls:
     - /api/projects/{id} - should be 200
     - /api/updates/{id} - should be 200
     - /api/materials/{id} - should be 200
     - /api/queries?project_id={id} - should be 200
   - If any are 401, 403, or 404, that's the issue

3. **Check Project Ownership**:
   - If you're logged in as a builder, verify you own the project
   - In the backend database, check that the project's builder_id matches your user ID
   - Admins can access all projects, builders can only access their own

## If Problem Persists

Please provide:
1. Screenshots of the browser console showing the error logs
2. The HTTP status code from the Network tab
3. The full error message from the console
4. Which role you're logged in as (admin/builder/client)
5. The project ID from the URL

This will help identify the exact issue quickly.

## Architecture Verification

- **Frontend Dev Server**: Running on http://localhost:5173
- **Backend API Server**: Running on http://localhost:8000
- **Database**: Connected to Neon.tech PostgreSQL
- **Vite Dev Server**: Should auto-reload on file changes
- **Token Storage**: localStorage key `rjs_token`
- **CORS**: Configured to allow http://localhost:5173

---

**Last Updated**: 2026-04-25  
**Built**: npm run build  
**Dev Server**: npm run dev
