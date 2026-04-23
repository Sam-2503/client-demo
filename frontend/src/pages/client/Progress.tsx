import { useEffect, useState } from 'react'
import api from '../../api/client'
import { useToast } from '../../components/Toast'
import type { Project } from '../../types'

export default function ClientProgress() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const response = await api.get<Project[]>('/api/projects')
        setProjects(response.data.sort((a, b) => b.overall_progress - a.overall_progress))
      } catch {
        toast('Failed to load projects')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <>
      {/* Topbar */}
      <div className="topbar">
        <div className="tb-title">Progress Tracking</div>
      </div>

      <div className="content fade-up">
        {/* Progress header */}
        <div className="sh" style={{ marginBottom: 20 }}>
          <div className="st">Project Progress</div>
        </div>

        {/* Progress cards */}
        {loading ? (
          <div className="empty">
            <div className="empty-ic">⏳</div>
            <div className="empty-tx">Loading progress…</div>
          </div>
        ) : projects.length === 0 ? (
          <div className="empty">
            <div className="empty-ic">📊</div>
            <div className="empty-tx">No projects yet</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {projects.map((p) => (
              <div key={p.id} className="card">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                >
                  <div>
                    <div style={{ fontSize: '.85rem', fontWeight: 500, marginBottom: 4 }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: '.72rem', color: 'var(--gray)' }}>
                      {p.location ?? 'Location TBD'}
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.1rem',
                      color: 'var(--gold)',
                    }}
                  >
                    {p.overall_progress}%
                  </span>
                </div>

                <div className="pb" style={{ marginBottom: 8 }}>
                  <div
                    className="pf"
                    style={{
                      width: `${p.overall_progress}%`,
                      background:
                        p.overall_progress === 100
                          ? 'var(--green)'
                          : p.overall_progress >= 75
                            ? 'var(--gold)'
                            : 'var(--orange)',
                    }}
                  />
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 12,
                    fontSize: '.7rem',
                    color: 'var(--gray)',
                  }}
                >
                  <div>
                    <div style={{ marginBottom: 4 }}>Start</div>
                    <div style={{ color: 'var(--white)' }}>
                      {p.start_date
                        ? new Date(p.start_date).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                          })
                        : '—'}
                    </div>
                  </div>
                  <div>
                    <div style={{ marginBottom: 4 }}>Expected End</div>
                    <div style={{ color: 'var(--white)' }}>
                      {p.expected_end_date
                        ? new Date(p.expected_end_date).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                          })
                        : '—'}
                    </div>
                  </div>
                  <div>
                    <div style={{ marginBottom: 4 }}>Status</div>
                    <div
                      style={{
                        color:
                          p.status === 'completed'
                            ? 'var(--green)'
                            : p.status === 'in_progress'
                              ? 'var(--gold)'
                              : 'var(--orange)',
                      }}
                    >
                      {p.status.replace('_', ' ')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
