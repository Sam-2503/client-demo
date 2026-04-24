import { useState, useEffect } from 'react'
import { Card, useToast, QueryList, QueryResponseForm } from '../../components'
import api from '../../api/client'
import type { Query, RespondToQueryRequest } from '../../types'
import './styles/QueriesPage.css'

export default function QueriesPage() {
  const [queries, setQueries] = useState<Query[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null)
  const [filter, setFilter] = useState<'all' | 'open' | 'resolved'>('all')
  const toast = useToast()

  const loadQueries = async () => {
    setLoading(true)
    try {
      const res = await api.get<Query[]>('/api/queries')
      setQueries(res.data)
    } catch {
      toast('Failed to load queries')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadQueries()
  }, [])

  const handleRespond = async (response: RespondToQueryRequest) => {
    if (!selectedQuery) return

    try {
      await api.post(`/api/queries/${selectedQuery.id}/respond`, response)
      toast('Response submitted successfully')
      await loadQueries()
      setSelectedQuery(null)
    } catch (err: any) {
      toast(err?.response?.data?.detail || 'Failed to submit response')
    }
  }

  const filteredQueries = queries.filter((q) => {
    if (filter === 'all') return true
    return q.status === filter
  })

  const statusCounts = {
    all: queries.length,
    open: queries.filter((q) => q.status === 'open').length,
    resolved: queries.filter((q) => q.status === 'resolved').length,
  }

  return (
    <div className="queries-page">
      {/* Header */}
      <div className="queries-page-header">
        <div className="queries-page-title-section">
          <h1 className="queries-page-title">Client Questions</h1>
          <p className="queries-page-subtitle">
            Respond to client questions about projects
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="queries-page-tabs">
        <button
          className={`queries-page-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({statusCounts.all})
        </button>
        <button
          className={`queries-page-tab ${filter === 'open' ? 'active' : ''}`}
          onClick={() => setFilter('open')}
        >
          Open ({statusCounts.open})
        </button>
        <button
          className={`queries-page-tab ${filter === 'resolved' ? 'active' : ''}`}
          onClick={() => setFilter('resolved')}
        >
          Resolved ({statusCounts.resolved})
        </button>
      </div>

      {/* Main Content */}
      <div className="queries-page-content">
        {/* Queries List */}
        <div className="queries-page-list-section">
          <QueryList
            queries={filteredQueries}
            loading={loading}
            onSelect={setSelectedQuery}
          />
        </div>

        {/* Response Form (if query selected) */}
        {selectedQuery && (
          <div className="queries-page-response-section">
            <Card className="queries-page-close-button-container">
              <button
                className="queries-page-close-button"
                onClick={() => setSelectedQuery(null)}
              >
                ← Back to List
              </button>
            </Card>
            <QueryResponseForm
              query={selectedQuery}
              onSubmit={handleRespond}
            />
          </div>
        )}
      </div>
    </div>
  )
}
