# Client Query/Question Feature Guide

## Overview
The construction management app now includes a comprehensive query system that enables **clients to ask questions** about their projects and **builders/admins to respond** to those questions in real-time.

## System Architecture

### Backend (FastAPI)
**Location**: `/backend/routers/queries.py`

**Models**:
- `Query`: Stores questions asked by clients about projects
  - `id`: Unique query ID (UUID)
  - `project_id`: Project the question is about
  - `asked_by_id`: Client who asked (User ID)
  - `answered_by_id`: Builder/Admin who responded (optional)
  - `question`: The question text
  - `answer`: Response from builder/admin (optional)
  - `status`: "open" or "resolved"
  - `created_at`: When question was asked
  - `resolved_at`: When answer was provided

**Endpoints**:
```
GET    /api/queries              # Get queries (filtered by role)
POST   /api/queries              # Create a new question
GET    /api/queries/{query_id}   # Get specific question details
POST   /api/queries/{query_id}/respond  # Respond to a question
PUT    /api/queries/{query_id}   # Update query status
```

**Authorization**:
- **Clients**: Can ask questions about their own projects, see all their questions
- **Builders**: Can see questions about their projects, respond to questions
- **Admins**: Can see all questions and respond to any

### Frontend (React)

**Components**:
1. **QueryForm.tsx** - Form for clients to ask new questions
   - Single textarea for the question
   - Simple submit button
   - Error handling

2. **QueryList.tsx** - Display list of questions
   - Shows question text and status badge
   - Displays builder response if provided
   - Shows creation date

3. **QueryResponseForm.tsx** - Form for builders to respond
   - Shows the original question
   - Textarea for builder to type response
   - Submit button

4. **QueriesPage.tsx** (Client) - Full page for clients to ask questions
   - Sidebar with project selection
   - Query form to ask new questions
   - List of all questions for selected project
   - Shows both open and resolved questions

5. **QueriesPage.tsx** (Builder) - Full page for builders to manage questions
   - Filter tabs: All, Open, Resolved
   - Click a question to open response form
   - Shows all questions about their projects

**Navigation**:
- Client Portal: Sidebar → "Questions" (❓)
- Builder Portal: Sidebar → "Queries" (accessible after admin approval)

## How It Works

### Client Workflow
1. **Navigate to Questions** (from client sidebar)
2. **Select a project** from the left sidebar
3. **Type a question** in the "Ask a Question" form
4. **Submit** - question appears in the list with "open" status
5. **View responses** - when builder responds, the response appears under the question
6. Question status changes to "resolved"

### Builder Workflow
1. **Navigate to Queries** (from builder sidebar)
2. **View open questions** about their projects
3. **Use filter tabs** to see All, Open, or Resolved questions
4. **Click a question** to open the response form
5. **Type a response** to the client's question
6. **Submit** - response is saved and question status changes to "resolved"

### Admin Workflow
1. **Navigate to Queries** (from builder/admin sidebar)
2. **View all questions** in the system
3. **Respond to any question** about any project
4. **Manage question statuses** as needed

## Frontend Routes

```
/client/queries           # Client questions page
/builder/queries          # Builder queries page (shared with /admin/queries)
```

## Database Schema

```sql
CREATE TABLE queries (
    id UUID PRIMARY KEY,
    project_id UUID NOT NULL FOREIGN KEY -> projects.id,
    asked_by_id UUID NOT NULL FOREIGN KEY -> users.id,
    answered_by_id UUID NULLABLE FOREIGN KEY -> users.id,
    question TEXT NOT NULL,
    answer TEXT NULLABLE,
    status ENUM('open', 'resolved') DEFAULT 'open',
    created_at DATETIME DEFAULT now(),
    resolved_at DATETIME NULLABLE
);
```

## API Examples

### Create a Question (Client)
```bash
curl -X POST http://localhost:8000/api/queries \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d {
    "project_id": "123e4567-e89b-12d3-a456-426614174000",
    "question": "When will the plumbing work start?"
  }
```

### Respond to a Question (Builder)
```bash
curl -X POST http://localhost:8000/api/queries/{query_id}/respond \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d {
    "answer": "Plumbing work will start next Monday, April 28th."
  }
```

### Get All Questions (with role-based filtering)
```bash
curl -X GET http://localhost:8000/api/queries \
  -H "Authorization: Bearer <token>"
```

Filters:
- `?project_id=<uuid>` - Get questions for specific project
- `?status_filter=open` - Get only open questions
- `?status_filter=resolved` - Get only resolved questions

### Get Questions for Specific Project
```bash
curl -X GET "http://localhost:8000/api/queries?project_id=<uuid>" \
  -H "Authorization: Bearer <token>"
```

## Type Definitions (TypeScript)

```typescript
interface Query {
  id: string;
  project_id: string;
  asked_by_id: string;
  answered_by_id: string | null;
  question: string;
  answer: string | null;
  status: "open" | "resolved";
  created_at: string;
  resolved_at: string | null;
}

interface CreateQueryRequest {
  project_id: string;
  question: string;
}

interface RespondToQueryRequest {
  answer: string;
}
```

## Features

✅ **Real-time Question Posting**
- Clients can ask questions instantly
- Questions immediately appear in the list

✅ **Role-Based Access Control**
- Clients can only ask about their own projects
- Builders can only see questions about their projects
- Admins can see all questions

✅ **Response Management**
- Builders can respond to open questions
- Responses are immediately visible to clients
- Questions automatically mark as "resolved" when answered

✅ **Status Tracking**
- Questions tracked as "open" or "resolved"
- Filter by status for easy management
- Resolved date captured for audit trail

✅ **Project-Based Organization**
- Questions grouped by project
- Easy to navigate and track per-project discussions
- Prevents question confusion across multiple projects

## Testing

### Manual Testing
1. **Log in as client** and navigate to `/client/queries`
2. **Select a project** from the sidebar
3. **Ask a question** - should appear immediately
4. **Log in as builder** and navigate to `/builder/queries`
5. **Click the open question** - response form appears
6. **Type and submit a response**
7. **Return to client portal** - response should be visible

### Automated Testing
```bash
# Run backend tests
cd backend && pytest tests/test_queries.py -v

# Build and test frontend
cd frontend && npm run build && npm run test
```

## Styling

**Client Query Page Styles**:
- `/frontend/src/pages/client/styles/QueriesPage.css`
- Sidebar with project list
- Query form card with clean styling
- Query list with badges for status

**Builder Query Page Styles**:
- `/frontend/src/pages/builder/styles/QueriesPage.css`
- Filter tabs for status filtering
- Query list and response form side-by-side layout

**Component Styles**:
- `QueryForm.css` - Question input form
- `QueryList.css` - Question list items with badges
- `QueryResponseForm.css` - Builder response form

## Common Issues & Solutions

### Issue: "Question won't submit"
- **Cause**: Empty question text
- **Solution**: Ensure question field is not empty before submitting

### Issue: "Can't see questions on other projects"
- **Cause**: RBAC enforcement - clients can only see their own projects
- **Solution**: Select the correct project from the sidebar

### Issue: "Builder can't respond"
- **Cause**: Builder account not approved yet
- **Solution**: Admin must approve the builder account first

### Issue: "Response not visible to client"
- **Cause**: Page needs to be refreshed
- **Solution**: Refresh the page or navigate away and back to see updated response

## Future Enhancements

- [ ] Real-time WebSocket notifications for new questions
- [ ] Email notifications when question is asked/answered
- [ ] Attach images/documents to questions
- [ ] Question categories (urgent, general, technical, etc.)
- [ ] Search and filter questions by keywords
- [ ] Assign questions to specific builders
- [ ] Question priority levels
- [ ] Comment threads on questions
- [ ] Question history and audit log
- [ ] Chatbot for automatic FAQ responses

## Files Modified

### Backend
- `routers/queries.py` - Query endpoints
- `models/query.py` - Query model definition
- `schemas/query.py` - Query request/response schemas
- `main.py` - Router registration

### Frontend
- `pages/client/Layout.tsx` - Added "Questions" nav item
- `pages/client/QueriesPage.tsx` - Client query page
- `pages/builder/QueriesPage.tsx` - Builder query page
- `components/QueryForm.tsx` - Question form component
- `components/QueryList.tsx` - Question list component
- `components/QueryResponseForm.tsx` - Response form component
- `types/index.ts` - TypeScript type definitions

## Support

For issues or questions about the query feature:
1. Check this guide first
2. Review the backend API error message
3. Check browser console for frontend errors
4. Review backend logs: `backend.log`
5. Ensure both services are running: `http://localhost:8000` (backend) and `http://localhost:5173` (frontend)
