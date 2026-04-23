import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import '../styles/Sidebar.css'

interface NavItem {
  label: string
  path: string
  icon?: string
}

interface SidebarProps {
  navItems: NavItem[]
  title?: string
  subtitle?: string
  logo?: string
}

export default function Sidebar({
  navItems,
  title = 'RJS',
  subtitle = 'Homes',
  logo,
}: SidebarProps) {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sb-logo">
        {logo ? (
          <img src={logo} alt="Logo" className="sb-logo-img" />
        ) : (
          <div className="sb-logo-text">{title.slice(0, 1)}</div>
        )}
        <div>
          <div className="sb-logo-name">{title}</div>
          <div className="sb-logo-sub">{subtitle}</div>
        </div>
      </div>

      {/* User Info */}
      {user && (
        <div className="sb-user">
          <div className="sb-avatar">{getInitials(user.full_name)}</div>
          <div>
            <div className="sb-user-name">{user.full_name}</div>
            <div className="sb-user-role">{user.role}</div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="sb-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${
              location.pathname === item.path ? 'active' : ''
            }`}
          >
            {item.icon && <span className="nav-icon">{item.icon}</span>}
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="sb-footer">
        <button className="sb-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}
