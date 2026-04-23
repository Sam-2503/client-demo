import { useEffect, useState } from "react";
import api from "../../api/client";
import { useToast } from "../../components/Toast";
import type {
  Project,
  Update,
  WorkCategory,
  CreateUpdateRequest,
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

const EMPTY: CreateUpdateRequest = {
  title: "",
  description: null,
  category: "other",
  progress_percentage: 0,
  photo_urls: [],
  project_id: "",
};

export default function BuilderUpdates() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [recentUpdates, setRecentUpdates] = useState<Update[]>([]);
  const [form, setForm] = useState<CreateUpdateRequest>(EMPTY);
  const [photoIn, setPhotoIn] = useState("");
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    api
      .get<Project[]>("/api/projects/")
      .then((r) => {
        setProjects(r.data);
        if (r.data.length > 0) {
          const firstId = r.data[0].id;
          setForm((f) => ({ ...f, project_id: firstId }));
          loadRecent(firstId);
        }
      })
      .catch(() => toast("Failed to load projects"));
  }, []);

  const loadRecent = (pid: string) => {
    api
      .get<Update[]>(`/api/updates/${pid}`)
      .then((r) => setRecentUpdates(r.data.slice(0, 6)))
      .catch(() => {});
  };

  const handleProjectChange = (pid: string) => {
    setForm((f) => ({ ...f, project_id: pid }));
    loadRecent(pid);
  };

  const addPhoto = () => {
    const u = photoIn.trim();
    if (u) {
      setForm((f) => ({ ...f, photo_urls: [...f.photo_urls, u] }));
      setPhotoIn("");
    }
  };

  const removePhoto = (i: number) =>
    setForm((f) => ({
      ...f,
      photo_urls: f.photo_urls.filter((_, j) => j !== i),
    }));

  const submit = async () => {
    if (!form.project_id) {
      toast("Please select a project");
      return;
    }
    if (!form.title) {
      toast("Update title is required");
      return;
    }
    setSaving(true);
    try {
      await api.post("/api/updates/", form);
      toast("Update posted — client notified ✓");
      setForm((f) => ({ ...EMPTY, project_id: f.project_id }));
      loadRecent(form.project_id);
    } catch (e: any) {
      toast(e?.response?.data?.detail ?? "Failed to post update");
    } finally {
      setSaving(false);
    }
  };

  const selProj = projects.find((p) => p.id === form.project_id);

  return (
    <>
      {/* Topbar */}
      <div className="topbar">
        <div className="tb-title">Post Update</div>
        <div className="tb-right">
          {selProj && (
            <div className="tb-proj">
              Project: <span>{selProj.name}</span>
            </div>
          )}
          <span className="badge b-builder">Builder</span>
        </div>
      </div>

      <div className="content fade-up">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            alignItems: "start",
          }}
        >
          {/* ── LEFT: FORM ── */}
          <div>
            <div className="card">
              <div className="sh" style={{ marginBottom: 14 }}>
                <div className="st">New Construction Update</div>
              </div>

              {/* Project selector */}
              <div className="fg">
                <label className="fl">Select Project *</label>
                {projects.length === 0 ? (
                  <div style={{ fontSize: ".78rem", color: "var(--gray)" }}>
                    No projects found.
                  </div>
                ) : (
                  <select
                    className="fi-sel"
                    value={form.project_id}
                    onChange={(e) => handleProjectChange(e.target.value)}
                  >
                    <option value="">Choose project…</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Category */}
              <div className="fg">
                <label className="fl">Work Category</label>
                <select
                  className="fi-sel"
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      category: e.target.value as WorkCategory,
                    }))
                  }
                >
                  {CATS.map((c) => (
                    <option key={c.v} value={c.v}>
                      {c.l}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div className="fg">
                <label className="fl">Update Title *</label>
                <input
                  className="fi-inp"
                  placeholder="e.g. Foundation slab complete, Brick masonry 80%…"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                />
              </div>

              {/* Description */}
              <div className="fg">
                <label className="fl">Detailed Notes</label>
                <textarea
                  className="fi-ta"
                  placeholder="What was completed? Materials used? Next steps?"
                  value={form.description ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  style={{ minHeight: 100 }}
                />
              </div>

              {/* Progress slider */}
              <div className="fg">
                <label className="fl">
                  Category Progress — {form.progress_percentage}%
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={form.progress_percentage}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      progress_percentage: parseInt(e.target.value),
                    }))
                  }
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: ".65rem",
                    color: "var(--gray)",
                    marginTop: 4,
                  }}
                >
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Photo URLs */}
              <div className="fg">
                <label className="fl">Photo URLs (optional)</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    className="fi-inp"
                    style={{ flex: 1 }}
                    placeholder="Paste image URL…"
                    value={photoIn}
                    onChange={(e) => setPhotoIn(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addPhoto()}
                  />
                  <button className="btn-o btn-sm" onClick={addPhoto}>
                    + Add
                  </button>
                </div>
                {form.photo_urls.map((url, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginTop: 6,
                      padding: "6px 10px",
                      background: "var(--panel)",
                      fontSize: ".72rem",
                    }}
                  >
                    <span
                      style={{
                        flex: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: "var(--lgray)",
                      }}
                    >
                      📸 {url}
                    </span>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--gray)",
                        cursor: "pointer",
                      }}
                      onClick={() => removePhoto(i)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  className="btn-o"
                  onClick={() =>
                    setForm((f) => ({ ...EMPTY, project_id: f.project_id }))
                  }
                >
                  Clear
                </button>
                <button
                  className="btn-g"
                  style={{ flex: 1 }}
                  onClick={submit}
                  disabled={saving}
                >
                  {saving ? "Posting…" : "Post Update → Client Notified"}
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT: RECENT UPDATES ── */}
          <div>
            <div className="sh" style={{ marginBottom: 12 }}>
              <div className="st">Recent Updates</div>
              {selProj && (
                <span style={{ fontSize: ".72rem", color: "var(--gray)" }}>
                  {selProj.name}
                </span>
              )}
            </div>

            {recentUpdates.length === 0 ? (
              <div className="empty">
                <div className="empty-ic">📋</div>
                <div className="empty-tx">No updates yet for this project.</div>
              </div>
            ) : (
              <div className="feed">
                {recentUpdates.map((u) => (
                  <div
                    key={u.id}
                    className={`fi ${u.progress_percentage >= 100 ? "fi-green" : "fi-gold"}`}
                  >
                    <div className="fi-ic">{CAT_IC[u.category]}</div>
                    <div style={{ flex: 1 }}>
                      <div className="fi-ti">{u.title}</div>
                      {u.description && (
                        <div
                          className="fi-de"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {u.description}
                        </div>
                      )}
                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          marginTop: 5,
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          className="badge b-pend"
                          style={{ fontSize: ".58rem" }}
                        >
                          {u.category.replace("_", " ")}
                        </span>
                        <span
                          style={{ fontSize: ".7rem", color: "var(--gold)" }}
                        >
                          {u.progress_percentage}%
                        </span>
                        {u.photo_urls.length > 0 && (
                          <span
                            style={{ fontSize: ".7rem", color: "var(--blue)" }}
                          >
                            📸 {u.photo_urls.length}
                          </span>
                        )}
                      </div>
                      <div className="fi-tm">
                        {new Date(u.created_at).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
