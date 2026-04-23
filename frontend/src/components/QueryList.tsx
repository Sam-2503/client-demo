import { Badge, Card } from '.'
import './styles/QueryList.css'
import type { Query } from '../types'

interface QueryListProps {
  queries: Query[]
  loading?: boolean
  onSelect?: (query: Query) => void
}

const STATUS_BADGE: Record<string, 'active' | 'done' | 'pending'> = {
  open: 'active',
  answered: 'active',
  resolved: 'done',
}

export default function QueryList({
  queries,
  loading = false,
  onSelect,
}: QueryListProps) {
  if (loading) {
    return (
      <div className="query-list">
        <Card>
          <div className="query-list-loading">Loading queries...</div>
        </Card>
      </div>
    )
  }

  if (queries.length === 0) {
    return (
      <div className="query-list">
        <Card>
          <div className="query-list-empty">
            <div className="query-list-empty-icon">💬</div>
            <div className="query-list-empty-text">No questions yet</div>
            <div className="query-list-empty-subtext">
              Your questions will appear here
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="query-list">
      {queries.map((query) => (
        <div
          key={query.id}
          className="query-item-wrapper"
          onClick={() => onSelect?.(query)}
        >
          <Card className="query-item" hoverable={!!onSelect}>
            <div className="query-item-header">
              <h3 className="query-item-title">{query.title}</h3>
              <Badge status={STATUS_BADGE[query.status]}>
                {query.status}
              </Badge>
            </div>

            {query.description && (
              <p className="query-item-description">{query.description}</p>
            )}

            {query.response && (
              <div className="query-item-response">
                <div className="query-item-response-label">Response:</div>
                <div className="query-item-response-text">{query.response}</div>
              </div>
            )}

            <div className="query-item-meta">
              <span className="query-item-date">
                {new Date(query.created_at).toLocaleDateString()}
              </span>
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}
