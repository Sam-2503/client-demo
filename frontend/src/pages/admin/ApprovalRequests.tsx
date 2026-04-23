import { useState, useEffect } from 'react'
import { Card, Badge, Button, Modal, Input, useToast } from '../../components'
import api from '../../api/client'
import type { BuilderRequest } from '../../types'
import './styles/ApprovalRequests.css'

type ApprovalAction = 'approve' | 'reject' | null

interface ApprovalState {
  requestId: string
  action: ApprovalAction
  notesOpen: boolean
  notes: string
}

export default function ApprovalRequests() {
  const [requests, setRequests] = useState<BuilderRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [approvalState, setApprovalState] = useState<ApprovalState>({
    requestId: '',
    action: null,
    notesOpen: false,
    notes: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const toast = useToast()

  const loadRequests = async () => {
    setLoading(true)
    try {
      const res = await api.get<BuilderRequest[]>('/api/admin/requests')
      setRequests(res.data)
    } catch (err: any) {
      toast(err?.response?.data?.detail || 'Failed to load requests')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRequests()
  }, [])

  const openApprovalModal = (requestId: string, action: ApprovalAction) => {
    setApprovalState({
      requestId,
      action,
      notesOpen: true,
      notes: '',
    })
  }

  const closeModal = () => {
    setApprovalState({
      requestId: '',
      action: null,
      notesOpen: false,
      notes: '',
    })
  }

  const handleApproval = async () => {
    const { requestId, action, notes } = approvalState

    if (action === 'reject' && !notes.trim()) {
      toast('Rejection reason is required')
      return
    }

    setSubmitting(true)
    try {
      if (action === 'approve') {
        await api.post(`/api/admin/requests/${requestId}/approve`, {
          notes: notes.trim() || null,
        })
        toast('Request approved')
      } else if (action === 'reject') {
        await api.post(`/api/admin/requests/${requestId}/reject`, {
          rejection_reason: notes.trim(),
        })
        toast('Request rejected')
      }

      await loadRequests()
      closeModal()
    } catch (err: any) {
      toast(err?.response?.data?.detail || 'Failed to process request')
    } finally {
      setSubmitting(false)
    }
  }

  const pendingCount = requests.filter((r) => r.status === 'pending').length
  const approvedCount = requests.filter((r) => r.status === 'approved').length
  const rejectedCount = requests.filter((r) => r.status === 'rejected').length

  return (
    <div className="approval-requests-page">
      {/* Header with Stats */}
      <div className="approval-header">
        <div className="approval-title-section">
          <h1 className="approval-title">Builder Approval Requests</h1>
          <p className="approval-subtitle">
            Review and approve pending builder registrations
          </p>
        </div>

        <div className="approval-stats">
          <Card className="approval-stat">
            <div className="stat-value">{pendingCount}</div>
            <div className="stat-label">Pending</div>
          </Card>
          <Card className="approval-stat">
            <div className="stat-value">{approvedCount}</div>
            <div className="stat-label">Approved</div>
          </Card>
          <Card className="approval-stat">
            <div className="stat-value">{rejectedCount}</div>
            <div className="stat-label">Rejected</div>
          </Card>
        </div>
      </div>

      {/* Requests Table */}
      <Card className="approval-table-card">
        {loading ? (
          <div className="approval-loading">Loading requests...</div>
        ) : requests.length === 0 ? (
          <div className="approval-empty">
            <div className="approval-empty-icon">✓</div>
            <div className="approval-empty-title">All caught up!</div>
            <div className="approval-empty-text">
              No pending builder requests at this time
            </div>
          </div>
        ) : (
          <div className="approval-table-wrapper">
            <table className="approval-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Full Name</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th className="approval-table-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr
                    key={request.id}
                    className={`approval-table-row approval-status-${request.status}`}
                  >
                    <td className="approval-table-email">{request.email}</td>
                    <td className="approval-table-name">{request.full_name}</td>
                    <td className="approval-table-status">
                      <Badge
                        status={
                          request.status === 'pending'
                            ? 'pending'
                            : request.status === 'approved'
                              ? 'done'
                              : 'blocked'
                        }
                      >
                        {request.status}
                      </Badge>
                    </td>
                    <td className="approval-table-date">
                      {new Date(request.created_at).toLocaleDateString()}
                    </td>
                    <td className="approval-table-actions">
                      {request.status === 'pending' ? (
                        <div className="approval-actions">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() =>
                              openApprovalModal(request.id, 'approve')
                            }
                            disabled={submitting}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              openApprovalModal(request.id, 'reject')
                            }
                            disabled={submitting}
                          >
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="approval-no-actions">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Approval Modal */}
      <Modal
        isOpen={approvalState.notesOpen}
        onClose={closeModal}
        title={
          approvalState.action === 'approve'
            ? 'Approve Builder Request'
            : 'Reject Builder Request'
        }
        size="md"
        footer={
          <div className="modal-footer-actions">
            <Button variant="outline" onClick={closeModal} disabled={submitting}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleApproval}
              disabled={submitting}
              isLoading={submitting}
            >
              {approvalState.action === 'approve' ? 'Approve' : 'Reject'}
            </Button>
          </div>
        }
      >
        <div className="approval-modal-content">
          {approvalState.action === 'approve' ? (
            <>
              <p className="approval-modal-desc">
                Are you sure you want to approve this builder request?
              </p>
              <Input
                label="Approval Notes (optional)"
                placeholder="Add any notes for the builder..."
                value={approvalState.notes}
                onChange={(e) =>
                  setApprovalState((prev) => ({
                    ...prev,
                    notes: e.target.value,
                  }))
                }
                fullWidth
                disabled={submitting}
              />
            </>
          ) : (
            <>
              <p className="approval-modal-desc">
                Please provide a reason for rejecting this request:
              </p>
              <textarea
                className="approval-modal-textarea"
                placeholder="Rejection reason..."
                value={approvalState.notes}
                onChange={(e) =>
                  setApprovalState((prev) => ({
                    ...prev,
                    notes: e.target.value,
                  }))
                }
                disabled={submitting}
                rows={3}
              />
              {!approvalState.notes.trim() && (
                <div className="approval-modal-error">
                  Rejection reason is required
                </div>
              )}
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}
