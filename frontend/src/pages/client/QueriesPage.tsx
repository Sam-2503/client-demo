import { useState, useEffect } from 'react'
import { Card, useToast, QueryForm, QueryList } from '../../components'
import api from '../../api/client'
import type { Query, CreateQueryRequest, Project } from '../../types'
import './styles/QueriesPage.css'

export default function ClientQueriesPage() {
  const [queries, setQueries] = useState<Query[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const toast = useToast()

  const loadData = async () => {
    setLoading(true)
    try {
      const [projectsRes, queriesRes] = await Promise.all([
        api.get<Project[]>('/api/projects/').catch(() => ({ data: [] })),
        api.get<Query[]>('/api/queries').catch(() => ({ data: [] })),
      ])

      setProjects(projectsRes.data)
      setQueries(queriesRes.data)

      if (projectsRes.data.length > 0 && !selectedProjectId) {
        setSelectedProjectId(projectsRes.data[0].id)
      }
    } catch {
      toast('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleSubmitQuery = async (query: CreateQueryRequest) => {
    setSubmitting(true)
    try {
      await api.post('/api/queries', query)
      toast('Question submitted successfully')
      await loadData()
    } catch (err: any) {
      toast(err?.response?.data?.detail || 'Failed to submit question')
    } finally {
      setSubmitting(false)
    }
  }

  const filteredQueries = selectedProjectId
    ? queries.filter((q) => q.project_id === selectedProjectId)
    : []

  return (
    <div className="client-queries-page">
      {/* Header */}
      <div className="client-queries-header">
        <div className="client-queries-title-section">
          <h1 className="client-queries-title">Questions</h1>
          <p className="client-queries-subtitle">
            Ask the builder about your project
          </p>
        </div>
      </div>

      {loading ? (
        <Card>
          <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>
            Loading...
          </div>
        </Card>
      ) : (
        <div className="client-queries-content">
          {/* Sidebar with Projects */}
          <div className="client-queries-sidebar">
            <Card className="client-queries-projects-card">
              <div className="client-queries-projects-title">Your Projects</div>
              <div className="client-queries-projects-list">
                {projects.length === 0 ? (
                  <div className="client-queries-projects-empty">
                    No projects assigned
                  </div>
                ) : (
                  projects.map((project) => (
                    <button
                      key={project.id}
                      className={`client-queries-project-item ${
                        selectedProjectId === project.id ? 'active' : ''
                      }`}
                      onClick={() => setSelectedProjectId(project.id)}
                    >
                      <div className="client-queries-project-name">
                        {project.name}
                      </div>
                      <div className="client-queries-project-count">
                        {queries.filter((q) => q.project_id === project.id).length} {
                          queries.filter((q) => q.project_id === project.id)
                            .length === 1
                            ? 'question'
                            : 'questions'
                        }
                      </div>
                    </button>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="client-queries-main">
            {selectedProjectId ? (
              <>
                {/* Query Form */}
                <QueryForm
                  projectId={selectedProjectId}
                  onSubmit={handleSubmitQuery}
                  loading={submitting}
                />

                {/* Queries List */}
                <div className="client-queries-section">
                  <div className="client-queries-section-title">
                    Questions ({filteredQueries.length})
                  </div>
                  <QueryList queries={filteredQueries} loading={false} />
                </div>
              </>
            ) : (
              <Card>
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                    📋
                  </div>
                  <div style={{ color: '#ccc' }}>
                    Select a project to ask questions
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
