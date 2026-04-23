import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";
import { useToast } from "../../components/Toast";
import {
  Project,
  ProjectStatus,
  User,
  CreateProjectRequest,
} from "../../types";

const STATUS_COLOR: Record<ProjectStatus, string> = {
  planning: "var(--gray)",
  in_progress: "var(--gold)",
  on_hold: "var(--orange)",
  completed: "var(--green)",
};

const STATUS_LABEL: Record<ProjectStatus, string> = {
  planning: "Planning",
  in_progress: "Active",
  on_hold: "On Hold",
  completed: "Complete",
};

const STATUS_BADGE: Record<ProjectStatus, string> = {
  planning: "b-pend",
  in_progress: "b-active",
  on_hold: "b-hold",
  completed: "b-done",
};

const EMPTY: CreateProjectRequest = {
  name: "",
  description: null,
  location: null,
  client_id: "",
  start_date: null,
  expected_end_date: null,
};

export default function BuilderProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<CreateProjectRequest>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const [pRes, cRes] = await Promise.all([
        api.get<Project[]>("/api/projects/"),
        api
          .get<User[]>("/api/users/clients")
          .catch(() => ({ data: [] as User[] })),
      ]);
      setProjects(pRes.data);
      setClients(cRes.data);
    } catch {
      toast("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const set =
    (k: keyof CreateProjectRequest) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value || null }));

  const create = async () => {
    if (!form.name) {
      toast("Project name is required");
      return;
    }
    if (!form.client_id) {
      toast("Please select a client");
      return;
    }
    setSaving(true);
    try {
      await api.post("/api/projects/", form);
      toast("Project created ✓");
      setOpen(false);
      setForm(EMPTY);
      load();
    } catch (e: any) {
      toast(e?.response?.data?.detail ?? "Failed to create project");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Topbar */}
      <div className="topbar">
        <div className="tb-title">Projects</div>
        <div className="tb-right">
          <button className="btn-g btn-sm" onClick={() => setOpen(true)}>
            + New Project
          </button>
        </div>
      </div>

      <div className="content fade-up">
        {loading ? (
          <div className="empty">
            <div className="empty-ic">⏳</div>
            <div className="empty-tx">Loading…</div>
          </div>
        ) : (
          <div className="proj-grid">
            {projects.map((p) => (
              <div
                key={p.id}
                className="proj-card"
                style={{ borderTopColor: STATUS_COLOR[p.status] }}
                onClick={() => navigate(`/builder/projects/${p.id}`)}
              >
                <div className="proj-card-top">
                  <div className="proj-card-hdr">
                    <div>
                      <div className="proj-card-name">{p.name}</div>
                      <div className="proj-card-sub">
                        {p.location ?? "Location TBD"}
                      </div>
                    </div>
                    <span className={`badge ${STATUS_BADGE[p.status]}`}>
                      {STATUS_LABEL[p.status]}
                    </span>
                  </div>

                  <div className="proj-card-client">📍 {p.location ?? "—"}</div>

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
                          background: STATUS_COLOR[p.status],
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="proj-card-bot">
                  <div className="proj-card-phase">
                    Status: <span>{STATUS_LABEL[p.status]}</span>
                  </div>
                  <div style={{ fontSize: ".68rem", color: "var(--gray)" }}>
                    {p.expected_end_date
                      ? "Due: " +
                        new Date(p.expected_end_date).toLocaleDateString(
                          "en-IN",
                          { month: "short", year: "numeric" },
                        )
                      : "—"}
                  </div>
                </div>
              </div>
            ))}

            {/* Add card */}
            <div
              className="proj-card add-proj-card"
              onClick={() => setOpen(true)}
            >
              <div className="add-proj-card-icon">＋</div>
              <div className="add-proj-card-label">Create New Project</div>
            </div>
          </div>
        )}
      </div>

      {/* ── CREATE PROJECT MODAL ── */}
      <div
        className={`mo${open ? " open" : ""}`}
        onClick={(e) => e.target === e.currentTarget && setOpen(false)}
      >
        <div className="modal" style={{ maxWidth: 520 }}>
          <div className="modal-bar" />
          <div className="modal-in">
            <div className="mhdr">
              <div>
                <div className="mti">New Project</div>
                <div className="msu">Fill in the project details below</div>
              </div>
              <button className="mc" onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>

            <div className="mf">
              <label className="ml2">Project Name *</label>
              <input
                className="mi2"
                placeholder="e.g. Villa Areca, Green Meadows Phase 2"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>

            <div className="mf">
              <label className="ml2">Description</label>
              <textarea
                className="mta2"
                placeholder="Brief description of the project…"
                value={form.description ?? ""}
                onChange={set("description")}
              />
            </div>

            <div className="mf">
              <label className="ml2">Location</label>
              <input
                className="mi2"
                placeholder="e.g. Banjara Hills, Hyderabad"
                value={form.location ?? ""}
                onChange={set("location")}
              />
            </div>

            <div className="mf">
              <label className="ml2">Assign Client *</label>
              {clients.length === 0 ? (
                <div
                  style={{
                    padding: "10px 12px",
                    background: "var(--panel2)",
                    fontSize: ".78rem",
                    color: "var(--gray)",
                    borderBottom: "2px solid var(--border2)",
                  }}
                >
                  No clients registered yet. Ask client to register first.
                </div>
              ) : (
                <select
                  className="ms2"
                  value={form.client_id}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, client_id: e.target.value }))
                  }
                >
                  <option value="">Select client…</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.full_name} — {c.email}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="grid-2">
              <div className="mf">
                <label className="ml2">Start Date</label>
                <input
                  className="mi2"
                  type="date"
                  value={form.start_date ?? ""}
                  onChange={set("start_date")}
                />
              </div>
              <div className="mf">
                <label className="ml2">Expected Handover</label>
                <input
                  className="mi2"
                  type="date"
                  value={form.expected_end_date ?? ""}
                  onChange={set("expected_end_date")}
                />
              </div>
            </div>

            <div className="macts">
              <button className="btn-o" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button
                className="btn-g"
                style={{ flex: 1 }}
                onClick={create}
                disabled={saving}
              >
                {saving ? "Creating…" : "Create Project →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
