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
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!title.trim()) {
      setError('Question title is required')
      return
    }

    setSubmitting(true)
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || null,
        project_id: projectId,
      })
      setTitle('')
      setDescription('')
    } catch (err: any) {
      setError(err?.response?.data?.detail || err?.message || 'Failed to submit query')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="query-form-card">
      <form onSubmit={handleSubmit} className="query-form">
        <h3 className="query-form-title">Ask a Question</h3>

        <Input
          label="Question Title"
          placeholder="e.g., When will plumbing start?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={error && !title.trim() ? error : ''}
          disabled={submitting || loading}
          fullWidth
        />

        <div className="query-form-group">
          <label htmlFor="query-desc" className="query-form-label">
            Details (optional)
          </label>
          <textarea
            id="query-desc"
            className="query-form-textarea"
            placeholder="Provide more context if needed..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={submitting || loading}
            rows={3}
          />
        </div>

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
