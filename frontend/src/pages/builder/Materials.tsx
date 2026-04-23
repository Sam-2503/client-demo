import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/client'
import { useToast } from '../../components/Toast'
import type { Material, MaterialType } from '../../types'

const MATERIAL_TYPES: MaterialType[] = [
  'lumber',
  'cement',
  'bricks',
  'steel',
  'paint',
  'tiles',
  'plumbing_pipes',
  'electrical_wire',
  'glass',
  'sand',
  'gravel',
  'other',
]

export default function BuilderMaterials() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState<MaterialType | 'all'>('all')
  const [projectFilter, setProjectFilter] = useState('')
  const [sortBy, setSortBy] = useState<'cost' | 'date' | 'qty'>('date')
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const response = await api.get<Material[]>('/api/materials')
        setMaterials(response.data)
      } catch {
        toast('Failed to load materials')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  useEffect(() => {
    let filtered = materials

    if (typeFilter !== 'all') {
      filtered = filtered.filter((m) => m.material_type === typeFilter)
    }

    if (projectFilter) {
      filtered = filtered.filter((m) =>
        m.project_id.toLowerCase().includes(projectFilter.toLowerCase()),
      )
    }

    if (sortBy === 'cost') {
      filtered.sort((a, b) => b.total_cost - a.total_cost)
    } else if (sortBy === 'date') {
      filtered.sort(
        (a, b) =>
          new Date(b.purchased_at).getTime() -
          new Date(a.purchased_at).getTime(),
      )
    } else if (sortBy === 'qty') {
      filtered.sort((a, b) => b.quantity - a.quantity)
    }

    setFilteredMaterials(filtered)
  }, [materials, typeFilter, projectFilter, sortBy])

  const totalCost = filteredMaterials.reduce((acc, m) => acc + m.total_cost, 0)

  return (
    <>
      {/* Topbar */}
      <div className="topbar">
        <div className="tb-title">Materials Inventory</div>
        <div className="tb-right">
          <span style={{ fontSize: '.78rem', color: 'var(--gray)' }}>
            Total Cost:
          </span>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.1rem',
              color: 'var(--gold)',
            }}
          >
            ₹{totalCost.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="content fade-up">
        {/* Filters */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="sh" style={{ marginBottom: 12 }}>
            <div className="st">Filter & Sort</div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto auto 1fr',
              gap: '16px 24px',
            }}
          >
            <div>
              <label className="ml2">Material Type</label>
              <select
                className="ms2"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as MaterialType | 'all')}
              >
                <option value="all">All Types</option>
                {MATERIAL_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="ml2">Sort By</label>
              <select
                className="ms2"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'cost' | 'date' | 'qty')}
              >
                <option value="date">Latest First</option>
                <option value="cost">Highest Cost</option>
                <option value="qty">Highest Quantity</option>
              </select>
            </div>

            <div>
              <label className="ml2">Search Project</label>
              <input
                className="mi2"
                placeholder="Search by project ID…"
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Materials table */}
        {loading ? (
          <div className="empty">
            <div className="empty-ic">⏳</div>
            <div className="empty-tx">Loading materials…</div>
          </div>
        ) : filteredMaterials.length === 0 ? (
          <div className="empty">
            <div className="empty-ic">🪵</div>
            <div className="empty-tx">No materials found</div>
          </div>
        ) : (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="dt">
                <thead>
                  <tr>
                    <th>Material Name</th>
                    <th>Type</th>
                    <th>Quantity</th>
                    <th>Unit Cost</th>
                    <th>Total Cost</th>
                    <th>Project</th>
                    <th>Supplier</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMaterials.map((m) => (
                    <tr
                      key={m.id}
                      onClick={() => navigate(`/builder/projects/${m.project_id}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td style={{ fontWeight: 500 }}>{m.name}</td>
                      <td>
                        <span
                          className="badge b-pend"
                          style={{ fontSize: '.58rem' }}
                        >
                          {m.material_type.replace('_', ' ')}
                        </span>
                      </td>
                      <td>
                        {m.quantity} {m.unit}
                      </td>
                      <td>₹{m.unit_cost.toLocaleString()}</td>
                      <td style={{ color: 'var(--gold)', fontWeight: 500 }}>
                        ₹{m.total_cost.toLocaleString()}
                      </td>
                      <td style={{ fontSize: '.72rem', color: 'var(--gray)' }}>
                        {m.project_id.slice(0, 12)}…
                      </td>
                      <td>{m.supplier ?? '—'}</td>
                      <td style={{ fontSize: '.7rem', color: 'var(--gray)' }}>
                        {new Date(m.purchased_at).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              style={{
                padding: '12px 20px',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '.78rem', color: 'var(--gray)' }}>
                {filteredMaterials.length} material
                {filteredMaterials.length !== 1 ? 's' : ''}
              </span>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.05rem',
                  color: 'var(--gold)',
                }}
              >
                Total: ₹{totalCost.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
