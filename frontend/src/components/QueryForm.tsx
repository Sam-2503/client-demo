import { useState } from 'react'
import { Input, Button, Card } from '.'
import './styles/QueryForm.css'
import type { CreateQueryRequest } from '../types'

interface QueryFormProps {
  projectId: string
  onSubmit: (query: CreateQueryRequest) => Promise<void>
  loading?: boolean
}

export default function QueryForm({
  projectId,
  onSubmit,
  loading = false,
}: QueryFormProps) {
  const [question, setQuestion] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!question.trim()) {
      setError('Question is required')
      return
    }

    setSubmitting(true)
    try {
      await onSubmit({
        question: question.trim(),
        project_id: projectId,
      })
      setQuestion('')
    } catch (err: any) {
      setError(err?.response?.data?.detail || err?.message || 'Failed to submit question')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="query-form-card">
      <form onSubmit={handleSubmit} className="query-form">
        <h3 className="query-form-title">Ask a Question</h3>

        <Input
          label="Your Question"
          placeholder="e.g., When will plumbing start? What's the timeline for completion?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          error={error && !question.trim() ? error : ''}
          disabled={submitting || loading}
          fullWidth
        />

        {error && <div className="query-form-error">{error}</div>}

        <div className="query-form-actions">
          <Button
            type="submit"
            variant="primary"
            disabled={submitting || loading}
            isLoading={submitting || loading}
          >
            Submit Question
          </Button>
        </div>
      </form>
    </Card>
  )
}
