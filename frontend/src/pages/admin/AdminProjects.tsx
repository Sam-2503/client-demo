import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, ProgressBar, useToast } from '../../components'
import api from '../../api/client'
import type { Project } from '../../types'
import './styles/AdminProjects.css'

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const toast = useToast()
  const navigate = useNavigate()

  const loadProjects = async () => {
    setLoading(true)
    try {
      const res = await api.get<Project[]>('/api/projects/')
      setProjects(res.data)
    } catch {
      toast('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const filteredProjects = projects.filter((p) => {
    if (filter === 'active') return p.status === 'in_progress'
    if (filter === 'completed') return p.status === 'completed'
    return true
  })

  const statusCounts = {
    all: projects.length,
    active: projects.filter((p) => p.status === 'in_progress').length,
    completed: projects.filter((p) => p.status === 'completed').length,
  }

  return (
    <div className="admin-projects-page">
      {/* Header */}
      <div className="admin-projects-page-header">
        <div className="admin-projects-page-title-section">
          <h1 className="admin-projects-page-title">All Projects</h1>
          <p className="admin-projects-page-subtitle">
            System-wide project management
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="admin-projects-filter-tabs">
        <button
          className={`admin-projects-filter-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Projects ({statusCounts.all})
        </button>
        <button
          className={`admin-projects-filter-tab ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active ({statusCounts.active})
        </button>
        <button
          className={`admin-projects-filter-tab ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed ({statusCounts.completed})
        </button>
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="admin-projects-page-loading">Loading projects...</div>
      ) : filteredProjects.length === 0 ? (
        <Card className="admin-projects-page-empty">
          <div className="admin-projects-page-empty-icon">📋</div>
          <div className="admin-projects-page-empty-title">No projects found</div>
          <div className="admin-projects-page-empty-text">
            {filter === 'all'
              ? 'Start by creating your first project'
              : `No ${filter} projects at this time`}
          </div>
        </Card>
      ) : (
        <div className="admin-projects-page-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="admin-projects-page-item"
              onClick={() => navigate(`/builder/projects/${project.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="admin-projects-page-item-header">
                <div className="admin-projects-page-item-title-section">
                  <h3 className="admin-projects-page-item-title">
                    {project.name}
                  </h3>
                  {project.location && (
                    <p className="admin-projects-page-item-location">
                      📍 {project.location}
                    </p>
                  )}
                </div>
                <span
                  className={`admin-projects-page-item-status admin-projects-page-status-${project.status}`}
                >
                  {project.status.replace('_', ' ')}
                </span>
              </div>

              {project.description && (
                <p className="admin-projects-page-item-description">
                  {project.description}
                </p>
              )}

              <div className="admin-projects-page-item-progress">
                <div className="admin-projects-page-progress-label">
                  Progress
                </div>
                <ProgressBar
                  value={project.overall_progress}
                  max={100}
                  label={`${project.overall_progress}%`}
                />
              </div>

              <div className="admin-projects-page-item-meta">
                {project.start_date && (
                  <div className="admin-projects-page-item-date">
                    <span className="admin-projects-page-item-date-label">
                      Started
                    </span>
                    <span className="admin-projects-page-item-date-value">
                      {new Date(project.start_date).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {project.expected_end_date && (
                  <div className="admin-projects-page-item-date">
                    <span className="admin-projects-page-item-date-label">
                      Expected End
                    </span>
                    <span className="admin-projects-page-item-date-value">
                      {new Date(project.expected_end_date).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
