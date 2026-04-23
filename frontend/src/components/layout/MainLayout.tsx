import React from 'react'
import '../styles/MainLayout.css'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

interface NavItem {
  label: string
  path: string
  icon?: string
}

interface MainLayoutProps {
  children: React.ReactNode
  navItems: NavItem[]
  pageTitle?: string
  pageSubtitle?: string
  pageActions?: React.ReactNode
  logo?: string
  title?: string
  subtitle?: string
}

export default function MainLayout({
  children,
  navItems,
  pageTitle,
  pageSubtitle,
  pageActions,
  logo,
  title = 'RJS',
  subtitle = 'Homes',
}: MainLayoutProps) {
  return (
    <div className="main-layout">
      <Sidebar navItems={navItems} logo={logo} title={title} subtitle={subtitle} />
      <div className="main-content">
        {(pageTitle || pageSubtitle || pageActions) && (
          <Topbar
            title={pageTitle}
            subtitle={pageSubtitle}
            actions={pageActions}
          />
        )}
        <div className="page-content">{children}</div>
      </div>
    </div>
  )
}
