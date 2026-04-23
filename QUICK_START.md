# Quick Start Guide - React Frontend Components

## 🚀 Getting Started

All Phase 1 foundation components are ready to use. Import them with barrel exports.

## 📦 Import Examples

### UI Components
```typescript
import { 
  Button, 
  Card, 
  Input, 
  Select, 
  Modal, 
  Badge, 
  ProgressBar, 
  Skeleton 
} from 'src/components'
```

### Layout
```typescript
import { 
  MainLayout, 
  Sidebar, 
  Topbar,
  ProtectedRoute,
  useToast
} from 'src/components'
```

### API Services
```typescript
import { 
  authService, 
  projectService, 
  updateService, 
  materialService, 
  userService 
} from 'src/api'
```

### Utilities
```typescript
import { 
  formatDate, 
  formatDateTime,
  formatCurrency, 
  statusBadgeColor, 
  cn 
} from 'src/utils'
```

## 💻 Common Patterns

### Login
```typescript
const { login } = useAuth()
const res = await authService.login(email, password)
```

### Fetch Projects
```typescript
const projects = await projectService.getAll()
const project = await projectService.getById(id)
```

### Create Project
```typescript
const project = await projectService.create({
  name: 'New Project',
  description: null,
  location: null,
  client_id: 'client-1',
  start_date: null,
  expected_end_date: null
})
```

### Show Toast
```typescript
const toast = useToast()
toast('Operation successful!')
```

### Render Component
```typescript
<MainLayout
  navItems={[
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Projects', path: '/projects' }
  ]}
  pageTitle="My Page"
>
  <Card header="Title">
    Content here
  </Card>
</MainLayout>
```

## 🎨 Component Sizes & Variants

### Button
```typescript
<Button variant="primary" size="md">Primary</Button>
<Button variant="outline" size="sm">Outline</Button>
<Button variant="secondary" size="lg">Secondary</Button>
<Button isLoading>Loading...</Button>
```

### Badge
```typescript
<Badge status="done">Completed</Badge>
<Badge status="active">Active</Badge>
<Badge status="pending" size="sm">Pending</Badge>
<Badge status="blocked">Blocked</Badge>
```

### Modal
```typescript
<Modal 
  isOpen={open} 
  onClose={() => setOpen(false)}
  size="md"
  title="Confirm Action"
>
  Content
  <button onClick={() => setOpen(false)}>Close</button>
</Modal>
```

### ProgressBar
```typescript
<ProgressBar value={65} label="Progress" size="md" />
```

### Skeleton
```typescript
<Skeleton type="text" count={3} />
<Skeleton type="card" />
<Skeleton type="circle" width={40} height={40} />
```

## 📋 Form Inputs

```typescript
<Input 
  label="Email"
  type="email" 
  placeholder="user@example.com"
  error={errors.email}
/>

<Select
  label="Status"
  options={[
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ]}
  placeholder="Select status"
/>
```

## 🔐 Protected Routes

```typescript
<ProtectedRoute roles={['admin', 'builder']}>
  <Dashboard />
</ProtectedRoute>
```

## 📅 Date Formatting

```typescript
formatDate('2024-04-23')  // "Apr 23, 2024"
formatDateTime('2024-04-23T10:30:00')  // "Apr 23, 2024, 10:30 AM"
```

## 💰 Currency Formatting

```typescript
formatCurrency(1500)    // "$1,500.00"
formatCurrency(99.5)    // "$99.50"
```

## 🎯 Status Colors

```typescript
const colors = statusBadgeColor('completed')
// { bg: 'rgba(39, 174, 96, 0.15)', text: '#27AE60', dot: '#27AE60' }
```

## 🔧 Classname Utility

```typescript
cn('btn', isActive && 'btn-active', className)
// "btn btn-active custom-class"
```

## 📁 File Structure

```
src/
├── api/
│   ├── services/ (auth, projects, updates, materials, users)
│   ├── client.ts (axios instance)
│   └── index.ts (barrel exports)
├── components/
│   ├── Button.tsx, Card.tsx, Input.tsx, etc.
│   ├── layout/ (Sidebar, Topbar, MainLayout)
│   ├── styles/ (All CSS files)
│   ├── Toast.tsx, ProtectedRoute.tsx
│   └── index.ts (barrel exports)
├── utils/
│   ├── formatDate.ts, formatCurrency.ts, etc.
│   └── index.ts (barrel exports)
├── context/
│   └── AuthContext.tsx (useAuth hook)
└── types/
    └── index.ts (TypeScript interfaces)
```

## ✅ Build Status

- ✅ TypeScript: No errors
- ✅ CSS: All scoped
- ✅ Exports: Ready
- ✅ Production: Ready to deploy

## 📚 Full Documentation

See `FRONTEND_FOUNDATION.md` for complete documentation with examples.

---

**Ready to build pages!** All components are production-ready and fully typed.
