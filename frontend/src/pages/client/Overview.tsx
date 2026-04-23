import { useEffect, useState } from 'react'
import api from '../../api/client'
import { useToast } from '../../components/Toast'
import type { Project } from '../../types'

export default function ClientOverview() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const response = await api.get<Project[]>('/api/projects')
        setProjects(response.data)
      } catch {
        toast('Failed to load projects')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const total = projects.length
  const active = projects.filter((p) => p.status === 'in_progress').length
  const completed = projects.filter((p) => p.status === 'completed').length
  const avgProgress = total
    ? Math.round(projects.reduce((a, p) => a + p.overall_progress, 0) / total)
    : 0

  return (
    <>
      {/* Topbar */}
      <div className="topbar">
        <div className="tb-title">My Projects</div>
      </div>

      <div className="content fade-up">
        {/* KPIs */}
        <div className="kpi-row">
          <div className="kpi">
            <div className="kpi-v">{total}</div>
            <div className="kpi-l">Total Projects</div>
            <div className="kpi-n">All projects</div>
          </div>
          <div className="kpi" style={{ borderTopColor: 'var(--green)' }}>
            <div className="kpi-v" style={{ color: 'var(--green)' }}>
              {active}
            </div>
            <div className="kpi-l">Active Projects</div>
            <div className="kpi-n">In progress</div>
          </div>
          <div className="kpi" style={{ borderTopColor: 'var(--blue)' }}>
            <div className="kpi-v" style={{ color: '#5dade2' }}>
              {completed}
            </div>
            <div className="kpi-l">Completed</div>
            <div className="kpi-n">Delivered</div>
          </div>
          <div className="kpi">
            <div className="kpi-v">{avgProgress}%</div>
            <div className="kpi-l">Average Progress</div>
            <div className="kpi-n">Across all projects</div>
          </div>
        </div>

        {/* Projects header */}
        <div className="sh" style={{ marginBottom: 14 }}>
          <div className="st">Your Projects</div>
        </div>

        {/* Projects grid */}
        {loading ? (
          <div className="empty">
            <div className="empty-ic">⏳</div>
            <div className="empty-tx">Loading projects…</div>
          </div>
        ) : projects.length === 0 ? (
          <div className="empty">
            <div className="empty-ic">📁</div>
            <div className="empty-tx">No projects yet</div>
          </div>
        ) : (
          <div className="proj-grid">
            {projects.map((p) => (
              <div
                key={p.id}
                className="proj-card"
                style={{
                  borderTopColor:
                    p.status === 'in_progress'
                      ? 'var(--gold)'
                      : p.status === 'completed'
                        ? 'var(--green)'
                        : p.status === 'on_hold'
                          ? 'var(--orange)'
                          : 'var(--gray)',
                }}
              >
                <div className="proj-card-top">
                  <div className="proj-card-hdr">
                    <div>
                      <div className="proj-card-name">{p.name}</div>
                      <div className="proj-card-sub">
                        {p.location ?? 'Location TBD'}
                      </div>
                    </div>
                    <span
                      className="badge"
                      style={{
                        background:
                          p.status === 'in_progress'
                            ? 'var(--gold)'
                            : p.status === 'completed'
                              ? 'var(--green)'
                              : p.status === 'on_hold'
                                ? 'var(--orange)'
                                : 'var(--gray)',
                        color: 'var(--black)',
                      }}
                    >
                      {p.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="proj-card-client">📍 {p.location ?? '—'}</div>

                  <div>
                    <div className="pl">
                      <span>Progress</span>
                      <span>{p.overall_progress}%</span>
                    </div>
                    <div className="pb">
                      <div
                        className="pf"
                        style={{
                          width: `${p.overall_progress}%`,
                          background:
                            p.status === 'in_progress'
                              ? 'var(--gold)'
                              : p.status === 'completed'
                                ? 'var(--green)'
                                : 'var(--gray)',
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="proj-card-bot">
                  <div className="proj-card-phase">
                    Status: <span>{p.status.replace('_', ' ')}</span>
                  </div>
                  <div style={{ fontSize: '.68rem', color: 'var(--gray)' }}>
                    {p.start_date
                      ? new Date(p.start_date).toLocaleDateString('en-IN', {
                          month: 'short',
                          year: 'numeric',
                        })
                      : '—'}
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
