import { useEffect, useState } from "react";
import api from "../../api/client";
import { useToast } from "../../components/Toast";
import type {
  Update,
  WorkCategory,
} from "../../types";

const CATS: { v: WorkCategory; l: string }[] = [
  { v: "foundation", l: "🏗 Foundation" },
  { v: "framing", l: "🪵 Framing" },
  { v: "roofing", l: "🏠 Roofing" },
  { v: "plumbing", l: "💧 Plumbing" },
  { v: "electrical", l: "⚡ Electrical" },
  { v: "painting", l: "🎨 Painting" },
  { v: "flooring", l: "🪨 Flooring" },
  { v: "windows_doors", l: "🚪 Windows & Doors" },
  { v: "finishing", l: "✨ Finishing" },
  { v: "other", l: "📋 Other" },
];

const CAT_IC: Record<WorkCategory, string> = {
  foundation: "🏗",
  framing: "🪵",
  roofing: "🏠",
  plumbing: "💧",
  electrical: "⚡",
  painting: "🎨",
  flooring: "🪨",
  windows_doors: "🚪",
  finishing: "✨",
  other: "📋",
};

export default function ClientUpdates() {
  const [recentUpdates, setRecentUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<WorkCategory | 'all'>(
    'all',
  );
  const toast = useToast();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const response = await api.get<Update[]>('/api/updates');
        setRecentUpdates(response.data);
      } catch {
        toast('Failed to load updates');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const filteredUpdates = recentUpdates.filter((u) => {
    if (categoryFilter !== 'all') {
      return u.category === categoryFilter;
    }
    return true;
  });

  return (
    <>
      {/* Topbar */}
      <div className="topbar">
        <div className="tb-title">Project Updates</div>
        <div className="tb-right">
          <span className="badge b-active">View Only</span>
        </div>
      </div>

      <div className="content fade-up">
        {/* Filter Card */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="sh" style={{ marginBottom: 12 }}>
            <div className="st">Filter Updates</div>
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <label className="fl" style={{ marginBottom: 8 }}>
                Work Category
              </label>
              <select
                className="fi-sel"
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(e.target.value as WorkCategory | 'all')
                }
              >
                <option value="all">All Categories</option>
                {CATS.map((c) => (
                  <option key={c.v} value={c.v}>
                    {c.l}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Updates Feed */}
        {loading ? (
          <div className="empty">
            <div className="empty-ic">⏳</div>
            <div className="empty-tx">Loading updates…</div>
          </div>
        ) : filteredUpdates.length === 0 ? (
          <div className="empty">
            <div className="empty-ic">📝</div>
            <div className="empty-tx">No updates available yet</div>
            <div
              style={{
                fontSize: '.75rem',
                color: 'var(--gray)',
                marginTop: 8,
              }}
            >
              Check back soon for project progress
            </div>
          </div>
        ) : (
          <div className="feed">
            {filteredUpdates.map((u) => (
              <div
                key={u.id}
                className={`fi ${u.progress_percentage >= 100 ? 'fi-green' : 'fi-gold'}`}
              >
                <div className="fi-ic">{CAT_IC[u.category]}</div>
                <div style={{ flex: 1 }}>
                  <div className="fi-ti">{u.title}</div>
                  {u.description && (
                    <div
                      className="fi-de"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {u.description}
                    </div>
                  )}
                  <div
                    style={{
                      display: 'flex',
                      gap: 8,
                      marginTop: 5,
                      flexWrap: 'wrap',
                    }}
                  >
                    <span
                      className="badge b-pend"
                      style={{ fontSize: '.58rem' }}
                    >
                      {u.category.replace('_', ' ')}
                    </span>
                    <span
                      style={{ fontSize: '.7rem', color: 'var(--gold)' }}
                    >
                      Progress: {u.progress_percentage}%
                    </span>
                    {u.photo_urls.length > 0 && (
                      <span
                        style={{ fontSize: '.7rem', color: 'var(--blue)' }}
                      >
                        📸 {u.photo_urls.length} photo
                        {u.photo_urls.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  <div className="fi-tm">
                    {new Date(u.created_at).toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
