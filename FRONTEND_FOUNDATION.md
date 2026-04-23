# Construction Management App - React Frontend Foundation

## Overview

This document describes the Phase 1 foundation components created for the Construction Management App React frontend. All components are fully typed with TypeScript, follow the design system, and are production-ready.

## Created File Structure

```
src/
├── api/
│   ├── client.ts (existing - axios instance with auth interceptor)
│   ├── index.ts (new - barrel exports)
│   └── services/ (new)
│       ├── auth.ts
│       ├── projects.ts
│       ├── updates.ts
│       ├── materials.ts
│       └── users.ts
│
├── components/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   ├── Modal.tsx
│   ├── Badge.tsx
│   ├── ProgressBar.tsx
│   ├── Skeleton.tsx
│   ├── Toast.tsx (enhanced with CSS)
│   ├── ProtectedRoute.tsx (enhanced with type imports)
│   ├── index.ts (new - barrel exports)
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Topbar.tsx
│   │   └── MainLayout.tsx
│   └── styles/
│       ├── Button.css
│       ├── Card.css
│       ├── Input.css
│       ├── Select.css
│       ├── Modal.css
│       ├── Badge.css
│       ├── ProgressBar.css
│       ├── Skeleton.css
│       ├── Toast.css
│       ├── Sidebar.css
│       ├── Topbar.css
│       └── MainLayout.css
│
├── utils/
│   ├── cn.ts (classname utility)
│   ├── formatDate.ts
│   ├── formatCurrency.ts
│   ├── statusBadgeColor.ts
│   ├── getStatusColor.ts
│   └── index.ts (new - barrel exports)
│
├── context/
│   └── AuthContext.tsx (enhanced with type imports)
│
└── types/
    └── index.ts (existing - TypeScript interfaces)
```

## API Services

All API services are located in `src/api/services/` and use the `axiosInstance` from `src/api/client.ts`.

### authService
- `login(email: string, password: string): Promise<Token>`
- `register(payload: RegisterRequest): Promise<Token>`

### projectService
- `getAll(): Promise<Project[]>`
- `getById(id: string): Promise<Project>`
- `create(payload: CreateProjectRequest): Promise<Project>`
- `update(id: string, payload: UpdateProjectRequest): Promise<Project>`
- `delete(id: string): Promise<void>`

### updateService
- `getByProject(projectId: string): Promise<Update[]>`
- `getById(id: string): Promise<Update>`
- `create(payload: CreateUpdateRequest): Promise<Update>`
- `delete(id: string): Promise<void>`

### materialService
- `getByProject(projectId: string): Promise<Material[]>`
- `getById(id: string): Promise<Material>`
- `create(payload: CreateMaterialRequest): Promise<Material>`
- `update(id: string, payload: Partial<CreateMaterialRequest>): Promise<Material>`
- `delete(id: string): Promise<void>`

### userService
- `getMe(): Promise<User>`
- `getClients(): Promise<User[]>`
- `getAll(): Promise<User[]>`
- `getById(id: string): Promise<User>`

**Import Usage:**
```typescript
import { authService, projectService, updateService, materialService, userService } from 'src/api'
```

## UI Components

### Basic Components

#### Button
Styled button with multiple variants and sizes.

**Props:**
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'secondary'  // default: 'primary'
  size?: 'sm' | 'md' | 'lg'                       // default: 'md'
  children: React.ReactNode
  isLoading?: boolean                             // default: false
}
```

**Usage:**
```tsx
<Button variant="primary" size="md" onClick={() => {}}>
  Submit
</Button>

<Button variant="outline" isLoading={loading}>
  Loading...
</Button>
```

#### Card
Generic card container component with optional header and footer.

**Props:**
```typescript
interface CardProps {
  children: React.ReactNode
  className?: string
  header?: React.ReactNode
  footer?: React.ReactNode
  hoverable?: boolean  // default: false
}
```

**Usage:**
```tsx
<Card 
  header={<h2>Title</h2>}
  hoverable
>
  Card content here
</Card>
```

#### Input
Text input with label, error, and helper text support.

**Props:**
```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean  // default: true
}
```

**Usage:**
```tsx
<Input
  label="Email"
  type="email"
  placeholder="user@example.com"
  error={errors.email}
  helperText="We'll never share your email"
/>
```

#### Select
Dropdown select with label and error support.

**Props:**
```typescript
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
  fullWidth?: boolean  // default: true
}

interface SelectOption {
  value: string | number
  label: string
}
```

**Usage:**
```tsx
<Select
  label="Status"
  options={[
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ]}
  placeholder="Select a status"
/>
```

#### Modal
Popup modal with close button and footer.

**Props:**
```typescript
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  footer?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'           // default: 'md'
  closeOnBackdrop?: boolean            // default: true
}
```

**Usage:**
```tsx
<Modal isOpen={open} onClose={() => setOpen(false)} title="Confirm">
  Are you sure?
  <button onClick={() => setOpen(false)}>Cancel</button>
</Modal>
```

#### Badge
Status badges with predefined colors.

**Props:**
```typescript
interface BadgeProps {
  status: 'done' | 'active' | 'pending' | 'blocked' | 'default'
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md'  // default: 'md'
}
```

**Usage:**
```tsx
<Badge status="done">Completed</Badge>
<Badge status="pending" size="sm">In Progress</Badge>
```

#### ProgressBar
Animated progress visualization.

**Props:**
```typescript
interface ProgressBarProps {
  value: number
  max?: number                    // default: 100
  label?: string | React.ReactNode
  size?: 'sm' | 'md' | 'lg'       // default: 'md'
  animated?: boolean              // default: true
  showPercent?: boolean           // default: true
  className?: string
}
```

**Usage:**
```tsx
<ProgressBar 
  value={65}
  label="Project Progress"
  size="md"
/>
```

#### Skeleton
Loading skeleton loaders for placeholder content.

**Props:**
```typescript
interface SkeletonProps {
  type?: 'text' | 'circle' | 'rect' | 'card'  // default: 'text'
  count?: number                               // default: 1
  width?: string | number
  height?: string | number
  className?: string
}
```

**Usage:**
```tsx
<Skeleton type="text" count={3} />
<Skeleton type="circle" width={40} height={40} />
<Skeleton type="card" />
```

### Layout Components

#### Sidebar
Left navigation sidebar with logo, user info, and nav items.

**Props:**
```typescript
interface SidebarProps {
  navItems: NavItem[]
  title?: string          // default: 'RJS'
  subtitle?: string       // default: 'Homes'
  logo?: string          // URL to logo image
}

interface NavItem {
  label: string
  path: string
  icon?: string
}
```

**Usage:**
```tsx
<Sidebar
  navItems={[
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Projects', path: '/projects' }
  ]}
/>
```

#### Topbar
Top navigation bar with title, subtitle, and user info.

**Props:**
```typescript
interface TopbarProps {
  title?: string
  subtitle?: string
  actions?: React.ReactNode
}
```

**Usage:**
```tsx
<Topbar 
  title="Projects"
  subtitle="Manage your construction projects"
  actions={<Button>New Project</Button>}
/>
```

#### MainLayout
Complete portal layout combining Sidebar, Topbar, and content area.

**Props:**
```typescript
interface MainLayoutProps {
  children: React.ReactNode
  navItems: NavItem[]
  pageTitle?: string
  pageSubtitle?: string
  pageActions?: React.ReactNode
  logo?: string
  title?: string        // default: 'RJS'
  subtitle?: string     // default: 'Homes'
}
```

**Usage:**
```tsx
<MainLayout
  navItems={navItems}
  pageTitle="Projects"
  pageSubtitle="Manage your projects"
  pageActions={<Button>Add Project</Button>}
>
  <div>Page content here</div>
</MainLayout>
```

## Utility Functions

### formatDate
Format date strings to readable format.

```typescript
import { formatDate, formatDateTime } from 'src/utils'

formatDate('2024-04-23')       // "Apr 23, 2024"
formatDateTime('2024-04-23T10:30:00')  // "Apr 23, 2024, 10:30 AM"
```

### formatCurrency
Format numbers as currency.

```typescript
import { formatCurrency } from 'src/utils'

formatCurrency(1500)    // "$1,500.00"
formatCurrency(99.5)    // "$99.50"
```

### statusBadgeColor
Get color styling for project status.

```typescript
import { statusBadgeColor } from 'src/utils'

const colors = statusBadgeColor('completed')
// { bg: 'rgba(39, 174, 96, 0.15)', text: '#27AE60', dot: '#27AE60' }
```

### cn
Conditional classname utility.

```typescript
import { cn } from 'src/utils'

cn('btn', isActive && 'btn-active', className)
// "btn btn-active custom-class"
```

## Design System

All components use CSS variables from `src/index.css`:

### Colors
- `--gold`: #C8971F (primary)
- `--gold-light`: #E8B830
- `--gold-dark`: #A0740F
- `--dark`: #0f0f0f (background)
- `--card`: #181818 (card background)
- `--panel`: #202020 (panel background)
- `--white`: #FFFFFF (text)
- `--gray`, `--mid-gray`, `--light-gray`: grays
- `--green`, `--blue`, `--orange`, `--red`: status colors

### Fonts
- `--font-serif`: Cormorant Garamond (titles)
- `--font-sans`: Jost (body text)

### Spacing
- `--spacing-xs`: 4px
- `--spacing-sm`: 8px
- `--spacing-md`: 12px
- `--spacing-lg`: 16px
- `--spacing-xl`: 20px
- `--spacing-2xl`: 24px
- `--spacing-3xl`: 32px

### Animations
- `fadeUp`: Fade in with upward slide
- `fadeIn`: Fade in
- `slideIn`: Slide in from left

## Usage Examples

### Complete Page Example

```tsx
import { useState } from 'react'
import { MainLayout, Button, Card, Input, useToast } from 'src/components'
import { projectService } from 'src/api'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Projects', path: '/projects' },
  ]

  const handleCreate = async () => {
    setLoading(true)
    try {
      const project = await projectService.create({
        name: 'New Project',
        description: '',
        location: '',
        client_id: '',
        start_date: null,
        expected_end_date: null,
      })
      setProjects([...projects, project])
      toast('Project created!')
    } catch (error) {
      toast('Error creating project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout
      navItems={navItems}
      pageTitle="Projects"
      pageActions={<Button onClick={handleCreate} isLoading={loading}>
        New Project
      </Button>}
    >
      <div style={{ display: 'grid', gap: '20px' }}>
        {projects.map(project => (
          <Card key={project.id} header={<h3>{project.name}</h3>}>
            <p>{project.description}</p>
          </Card>
        ))}
      </div>
    </MainLayout>
  )
}
```

### Form Example

```tsx
import { useState } from 'react'
import { Card, Input, Select, Button, Modal, useToast } from 'src/components'

export default function ProjectForm() {
  const [formData, setFormData] = useState({
    name: '',
    status: 'planning',
    location: ''
  })
  const [modal, setModal] = useState(false)
  const toast = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    try {
      // Submit form
      toast('Project updated!')
      setModal(false)
    } catch (error) {
      toast('Error updating project')
    }
  }

  return (
    <>
      <Button onClick={() => setModal(true)}>Edit Project</Button>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Edit Project">
        <Input
          label="Project Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={[
            { value: 'planning', label: 'Planning' },
            { value: 'in_progress', label: 'In Progress' },
            { value: 'completed', label: 'Completed' },
          ]}
        />
        <Input
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <Button onClick={handleSubmit}>Save</Button>
          <Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
        </div>
      </Modal>
    </>
  )
}
```

## Import Patterns

### Barrel Exports
For convenience, all components and utilities have barrel exports:

```typescript
// Instead of individual imports
import Button from 'src/components/Button'
import Card from 'src/components/Card'
import Input from 'src/components/Input'

// Use barrel export
import { Button, Card, Input } from 'src/components'

// Same for API services
import { authService, projectService } from 'src/api'

// And utilities
import { formatDate, formatCurrency, cn } from 'src/utils'
```

## Testing & Validation

All components are:
- ✅ Fully typed with TypeScript
- ✅ Properly exported with barrel files
- ✅ Styled according to design system
- ✅ Production-ready
- ✅ Reusable across pages
- ✅ Documented with examples

## Next Steps

The foundation is now ready for building pages like:
- Dashboard
- Projects List
- Project Details
- Updates
- Materials
- Client Portal
- User Management

All existing pages can now import these components and API services directly.
