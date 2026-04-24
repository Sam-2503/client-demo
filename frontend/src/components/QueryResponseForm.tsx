import { useState } from 'react'
import { Button, Card } from '.'
import './styles/QueryResponseForm.css'
import type { Query, RespondToQueryRequest } from '../types'

interface QueryResponseFormProps {
  query: Query
  onSubmit: (response: RespondToQueryRequest) => Promise<void>
  loading?: boolean
}

export default function QueryResponseForm({
  query,
  onSubmit,
  loading = false,
}: QueryResponseFormProps) {
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!answer.trim()) {
      setError('Response is required')
      return
    }

    setSubmitting(true)
    try {
      await onSubmit({
        answer: answer.trim(),
      })
      setAnswer('')
    } catch (err: any) {
      setError(err?.response?.data?.detail || err?.message || 'Failed to submit response')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="query-response-card">
      <div className="query-response-header">
        <h3 className="query-response-title">Respond to Question</h3>
        <div className="query-response-question">
          <strong>{query.question}</strong>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="query-response-form">
        <div className="query-response-group">
          <label htmlFor="response-text" className="query-response-label">
            Your Response
          </label>
          <textarea
            id="response-text"
            className="query-response-textarea"
            placeholder="Provide your detailed response..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={submitting || loading}
            rows={4}
          />
        </div>

        {error && <div className="query-response-error">{error}</div>}

        <div className="query-response-actions">
          <Button
            type="submit"
            variant="primary"
            disabled={submitting || loading}
            isLoading={submitting || loading}
          >
            Send Response
          </Button>
        </div>
      </form>
    </Card>
  )
}
