import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../api/client'
import { useToast } from '../../components/Toast'
import type { Project, Update, Query } from '../../types'

export default function ClientProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const toast = useToast()

  const [project, setProject] = useState<Project | null>(null)
  const [updates, setUpdates] = useState<Update[]>([])
  const [queries, setQueries] = useState<Query[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'updates' | 'queries' | 'info'>('updates')
  const [newQuery, setNewQuery] = useState('')
  const [submittingQuery, setSubmittingQuery] = useState(false)

  const load = async () => {
    if (!id) return
    setLoading(true)
    try {
      const [projRes, updatesRes, queriesRes] = await Promise.all([
        api.get<Project>(`/api/projects/${id}`),
        api.get<Update[]>(`/api/updates?project_id=${id}`),
        api.get<Query[]>(`/api/queries?project_id=${id}`),
      ])
      setProject(projRes.data)
      setUpdates(updatesRes.data)
      setQueries(queriesRes.data)
    } catch (err: any) {
      toast(err?.response?.data?.detail || 'Failed to load project')
      console.error('Load error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [id])

  const handleSubmitQuery = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newQuery.trim() || !id) return

    setSubmittingQuery(true)
    try {
      await api.post('/api/queries', {
        project_id: id,
        question: newQuery.trim(),
      })
      toast('Question submitted successfully')
      setNewQuery('')
      await load()
    } catch (err: any) {
      toast(err?.response?.data?.detail || 'Failed to submit question')
    } finally {
      setSubmittingQuery(false)
    }
  }

  if (loading) {
    return (
      <div className="topbar">
        <div className="tb-title">Loading project...</div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="content fade-up">
        <div className="empty">
          <div className="empty-ic">❌</div>
          <div className="empty-tx">Project not found</div>
          <button
            onClick={() => navigate('/client')}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              background: 'var(--gold)',
              color: 'var(--black)',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Back to Projects
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <div className="topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => navigate('/client')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--gold)',
              cursor: 'pointer',
              fontSize: '1.2rem',
            }}
          >
            ← Back
          </button>
          <div>
            <div className="tb-title">{project.name}</div>
            {project.location && (
              <div style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>
                📍 {project.location}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="content fade-up">
        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            borderBottom: '1px solid var(--gray)',
            paddingBottom: '1rem',
          }}
        >
          <button
            onClick={() => setActiveTab('updates')}
            style={{
              background: 'transparent',
              border: 'none',
              color: activeTab === 'updates' ? 'var(--gold)' : 'var(--gray)',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: activeTab === 'updates' ? '600' : '400',
              borderBottom: activeTab === 'updates' ? '2px solid var(--gold)' : 'none',
              paddingBottom: '0.5rem',
            }}
          >
            Updates ({updates.length})
          </button>
          <button
            onClick={() => setActiveTab('queries')}
            style={{
              background: 'transparent',
              border: 'none',
              color: activeTab === 'queries' ? 'var(--gold)' : 'var(--gray)',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: activeTab === 'queries' ? '600' : '400',
              borderBottom: activeTab === 'queries' ? '2px solid var(--gold)' : 'none',
              paddingBottom: '0.5rem',
            }}
          >
            Questions ({queries.length})
          </button>
          <button
            onClick={() => setActiveTab('info')}
            style={{
              background: 'transparent',
              border: 'none',
              color: activeTab === 'info' ? 'var(--gold)' : 'var(--gray)',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: activeTab === 'info' ? '600' : '400',
              borderBottom: activeTab === 'info' ? '2px solid var(--gold)' : 'none',
              paddingBottom: '0.5rem',
            }}
          >
            Info
          </button>
        </div>

        {/* Updates Tab */}
        {activeTab === 'updates' && (
          <div>
            {updates.length === 0 ? (
              <div className="empty">
                <div className="empty-ic">📝</div>
                <div className="empty-tx">No updates yet</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {updates.map((update) => (
                  <div
                    key={update.id}
                    style={{
                      padding: '1.5rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--gray)',
                      borderRadius: '8px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        marginBottom: '1rem',
                      }}
                    >
                      <div>
                        <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--white)' }}>
                          {update.title}
                        </h3>
                        <div
                          style={{
                            display: 'flex',
                            gap: '1rem',
                            fontSize: '0.85rem',
                            color: 'var(--gray)',
                          }}
                        >
                          <span>{update.category}</span>
                          <span>{new Date(update.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div
                        style={{
                          background: 'var(--gold)',
                          color: 'var(--black)',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '4px',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                        }}
                      >
                        {update.progress_percentage}%
                      </div>
                    </div>

                    {update.description && (
                      <p style={{ margin: '0 0 1rem 0', color: 'var(--light-gray)' }}>
                        {update.description}
                      </p>
                    )}

                    {update.photo_urls && update.photo_urls.length > 0 && (
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                          gap: '1rem',
                        }}
                      >
                        {update.photo_urls.map((url, idx) => (
                          <img
                            key={idx}
                            src={url}
                            alt={`Update ${idx + 1}`}
                            style={{
                              width: '100%',
                              maxHeight: '300px',
                              objectFit: 'cover',
                              borderRadius: '4px',
                            }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none'
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Queries Tab */}
        {activeTab === 'queries' && (
          <div>
            {/* Query Form */}
            <form
              onSubmit={handleSubmitQuery}
              style={{
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--gold)',
                borderRadius: '8px',
                marginBottom: '2rem',
              }}
            >
              <h3 style={{ margin: '0 0 1rem 0', color: 'var(--white)' }}>
                Ask a Question
              </h3>
              <textarea
                placeholder="Ask the builder about this project..."
                value={newQuery}
                onChange={(e) => setNewQuery(e.target.value)}
                disabled={submittingQuery}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  marginBottom: '1rem',
                  background: 'var(--input-bg)',
                  border: '1px solid var(--gray)',
                  borderRadius: '4px',
                  color: 'var(--white)',
                  fontFamily: 'inherit',
                  fontSize: '0.95rem',
                  minHeight: '100px',
                  resize: 'vertical',
                }}
              />
              <button
                type="submit"
                disabled={submittingQuery || !newQuery.trim()}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'var(--gold)',
                  color: 'var(--black)',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: submittingQuery ? 'not-allowed' : 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  opacity: submittingQuery ? 0.6 : 1,
                }}
              >
                {submittingQuery ? 'Submitting...' : 'Submit Question'}
              </button>
            </form>

            {/* Queries List */}
            {queries.length === 0 ? (
              <div className="empty">
                <div className="empty-ic">💬</div>
                <div className="empty-tx">No questions yet</div>
                <div className="empty-sub">Ask your first question above</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {queries.map((query) => (
                  <div
                    key={query.id}
                    style={{
                      padding: '1.5rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--gray)',
                      borderRadius: '8px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        marginBottom: '1rem',
                      }}
                    >
                      <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--white)' }}>
                        {query.question}
                      </h3>
                      <div
                        style={{
                          background: query.status === 'resolved' ? 'var(--green)' : 'var(--orange)',
                          color: 'var(--black)',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '4px',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {query.status}
                      </div>
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--gray)', marginBottom: '1rem' }}>
                      {new Date(query.created_at).toLocaleDateString()}
                    </div>

                    {query.answer && (
                      <div
                        style={{
                          padding: '1rem',
                          background: 'rgba(0, 0, 0, 0.3)',
                          borderLeft: '3px solid var(--gold)',
                          borderRadius: '4px',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '0.85rem',
                            color: 'var(--gold)',
                            marginBottom: '0.5rem',
                            fontWeight: '600',
                          }}
                        >
                          Builder's Response:
                        </div>
                        <p style={{ margin: 0, color: 'var(--light-gray)' }}>{query.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Info Tab */}
        {activeTab === 'info' && (
          <div
            style={{
              padding: '1.5rem',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--gray)',
              borderRadius: '8px',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--gray)', marginBottom: '0.5rem' }}>
                  Status
                </div>
                <div style={{ fontSize: '1.1rem', color: 'var(--white)', fontWeight: '600' }}>
                  {project.status.replace('_', ' ')}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--gray)', marginBottom: '0.5rem' }}>
                  Overall Progress
                </div>
                <div style={{ fontSize: '1.1rem', color: 'var(--gold)', fontWeight: '600' }}>
                  {project.overall_progress}%
                </div>
              </div>

              {project.location && (
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--gray)', marginBottom: '0.5rem' }}>
                    Location
                  </div>
                  <div style={{ fontSize: '1rem', color: 'var(--white)' }}>
                    📍 {project.location}
                  </div>
                </div>
              )}

              {project.start_date && (
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--gray)', marginBottom: '0.5rem' }}>
                    Started
                  </div>
                  <div style={{ fontSize: '1rem', color: 'var(--white)' }}>
                    {new Date(project.start_date).toLocaleDateString()}
                  </div>
                </div>
              )}

              {project.expected_end_date && (
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--gray)', marginBottom: '0.5rem' }}>
                    Expected End
                  </div>
                  <div style={{ fontSize: '1rem', color: 'var(--white)' }}>
                    {new Date(project.expected_end_date).toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>

            {project.description && (
              <div style={{ marginTop: '2rem' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--gray)', marginBottom: '0.5rem' }}>
                  Description
                </div>
                <p style={{ margin: '0.5rem 0 0 0', color: 'var(--light-gray)' }}>
                  {project.description}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
