import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/client";
import { useToast } from "../../components/Toast";
import {
  Project,
  Update,
  Material,
  ProjectStatus,
  WorkCategory,
  MaterialType,
  CreateUpdateRequest,
  CreateMaterialRequest,
} from "../../types";

const STATUS_LABEL: Record<ProjectStatus, string> = {
  planning: "Planning",
  in_progress: "Active",
  on_hold: "On Hold",
  completed: "Complete",
};
const STATUS_COLOR: Record<ProjectStatus, string> = {
  planning: "var(--gray)",
  in_progress: "var(--gold)",
  on_hold: "var(--orange)",
  completed: "var(--green)",
};
const STATUSES: ProjectStatus[] = [
  "planning",
  "in_progress",
  "on_hold",
  "completed",
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
const MAT_TYPES: MaterialType[] = [
  "lumber",
  "cement",
  "bricks",
  "steel",
  "paint",
  "tiles",
  "plumbing_pipes",
  "electrical_wire",
  "glass",
  "sand",
  "gravel",
  "other",
];

const EMPTY_UPD: CreateUpdateRequest = {
  title: "",
  description: null,
  category: "other",
  progress_percentage: 0,
  photo_urls: [],
  project_id: "",
};
const EMPTY_MAT: Omit<CreateMaterialRequest, "project_id"> & {
  quantity: string;
  unit_cost: string;
} = {
  material_type: "lumber",
  name: "",
  quantity: "",
  unit: "",
  unit_cost: "",
  supplier: null,
};

type Tab = "updates" | "materials" | "info";

export default function BuilderProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  const [project, setProject] = useState<Project | null>(null);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [tab, setTab] = useState<Tab>("updates");

  const [showUpd, setShowUpd] = useState(false);
  const [showMat, setShowMat] = useState(false);
  const [updForm, setUpdForm] = useState<CreateUpdateRequest>(EMPTY_UPD);
  const [matForm, setMatForm] = useState(EMPTY_MAT);
  const [photoIn, setPhotoIn] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    if (!id) return;
    try {
      const [pR, uR, mR] = await Promise.all([
        api.get<Project>(`/api/projects/${id}`),
        api.get<Update[]>(`/api/updates/${id}`),
        api.get<Material[]>(`/api/materials/${id}`),
      ]);
      setProject(pR.data);
      setUpdates(uR.data);
      setMaterials(mR.data);
    } catch {
      toast("Failed to load project");
      navigate("/builder/projects");
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const addPhoto = () => {
    const u = photoIn.trim();
    if (u) {
      setUpdForm((f) => ({ ...f, photo_urls: [...f.photo_urls, u] }));
      setPhotoIn("");
    }
  };

  const postUpdate = async () => {
    if (!updForm.title) {
      toast("Title is required");
      return;
    }
    setSaving(true);
    try {
      await api.post("/api/updates/", { ...updForm, project_id: id });
      toast("Update posted ✓");
      setShowUpd(false);
      setUpdForm(EMPTY_UPD);
      load();
    } catch (e: any) {
      toast(e?.response?.data?.detail ?? "Failed");
    } finally {
      setSaving(false);
    }
  };

  const addMaterial = async () => {
    if (!matForm.name || !matForm.quantity || !matForm.unit_cost) {
      toast("Name, quantity and unit cost are required");
      return;
    }
    setSaving(true);
    try {
      await api.post("/api/materials/", {
        ...matForm,
        project_id: id,
        quantity: parseFloat(matForm.quantity),
        unit_cost: parseFloat(matForm.unit_cost),
      });
      toast("Material logged ✓");
      setShowMat(false);
      setMatForm(EMPTY_MAT);
      load();
    } catch (e: any) {
      toast(e?.response?.data?.detail ?? "Failed");
    } finally {
      setSaving(false);
    }
  };

  const setStatus = async (s: ProjectStatus) => {
    try {
      await api.patch(`/api/projects/${id}`, { status: s });
      toast("Status updated ✓");
      load();
    } catch {
      toast("Failed");
    }
  };

  const setProgress = async (v: string) => {
    try {
      await api.patch(`/api/projects/${id}`, {
        overall_progress: parseFloat(v),
      });
      load();
    } catch {}
  };

  if (!project)
    return (
      <>
        <div className="topbar">
          <div className="tb-title">Loading…</div>
        </div>
        <div className="content">
          <div className="empty">
            <div className="empty-ic">⏳</div>
          </div>
        </div>
      </>
    );

  const totalCost = materials.reduce((a, m) => a + m.total_cost, 0);

  return (
    <>
      {/* Topbar */}
      <div className="topbar">
        <div
          className="tb-title"
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <span
            style={{ color: "var(--gray)", cursor: "pointer" }}
            onClick={() => navigate("/builder/projects")}
          >
            ←
          </span>
          {project.name}
        </div>
        <div className="tb-right">
          <span className="badge b-active" style={{ fontSize: ".6rem" }}>
            {STATUS_LABEL[project.status]}
          </span>
          <button className="btn-g btn-sm" onClick={() => setShowUpd(true)}>
            + Post Update
          </button>
          <button className="btn-o btn-sm" onClick={() => setShowMat(true)}>
            + Material
          </button>
        </div>
      </div>

      <div className="content fade-up">
        {/* KPIs */}
        <div className="kpi-row">
          <div className="kpi" style={{ borderTopColor: "var(--green)" }}>
            <div className="kpi-v" style={{ color: "var(--green2)" }}>
              {project.overall_progress}%
            </div>
            <div className="kpi-l">Overall Progress</div>
          </div>
          <div className="kpi">
            <div className="kpi-v">{updates.length}</div>
            <div className="kpi-l">Updates Posted</div>
          </div>
          <div className="kpi">
            <div className="kpi-v">{materials.length}</div>
            <div className="kpi-l">Materials Logged</div>
          </div>
          <div className="kpi">
            <div className="kpi-v">₹{(totalCost / 1000).toFixed(0)}K</div>
            <div className="kpi-l">Material Cost</div>
          </div>
        </div>

        {/* Progress + status control */}
        <div className="card">
          <div className="sh" style={{ marginBottom: 14 }}>
            <div className="st">Overall Progress</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  style={{
                    padding: "5px 12px",
                    fontSize: ".68rem",
                    cursor: "pointer",
                    fontFamily: "'Jost',sans-serif",
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                    transition: ".15s",
                    background:
                      project.status === s ? "var(--gold)" : "transparent",
                    border:
                      project.status === s
                        ? "none"
                        : "1px solid var(--border2)",
                    color:
                      project.status === s ? "var(--black)" : "var(--gray)",
                  }}
                >
                  {STATUS_LABEL[s]}
                </button>
              ))}
            </div>
          </div>
          <div className="pr">
            <div className="pl">
              <span>{project.name}</span>
              <span>{project.overall_progress}%</span>
            </div>
            <div className="pb">
              <div
                className="pf"
                style={{ width: `${project.overall_progress}%` }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 10,
            }}
          >
            <span
              style={{
                fontSize: ".67rem",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              Set:
            </span>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={project.overall_progress}
              onChange={(e) => setProgress(e.target.value)}
              style={{ flex: 1 }}
            />
            <span
              style={{
                fontSize: ".85rem",
                color: "var(--gold)",
                minWidth: 36,
                fontFamily: "'Cormorant Garamond',serif",
              }}
            >
              {project.overall_progress}%
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid var(--border)",
            marginBottom: 16,
          }}
        >
          {(
            [
              ["updates", "📝 Updates"],
              ["materials", "🪵 Materials"],
              ["info", "⚙ Info"],
            ] as [Tab, string][]
          ).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              style={{
                background: "none",
                border: "none",
                padding: "10px 18px",
                cursor: "pointer",
                fontFamily: "'Jost',sans-serif",
                fontSize: ".78rem",
                color: tab === k ? "var(--gold)" : "var(--gray)",
                borderBottom:
                  tab === k ? "2px solid var(--gold)" : "2px solid transparent",
                marginBottom: -1,
                transition: ".15s",
              }}
            >
              {l}
            </button>
          ))}
        </div>

        {/* ── UPDATES TAB ── */}
        {tab === "updates" &&
          (updates.length === 0 ? (
            <div className="empty">
              <div className="empty-ic">📝</div>
              <div className="empty-tx">
                No updates yet. Click "+ Post Update" to add one.
              </div>
            </div>
          ) : (
            <div className="feed">
              {updates.map((u) => (
                <div
                  key={u.id}
                  className={`fi ${u.progress_percentage >= 100 ? "fi-green" : "fi-gold"}`}
                >
                  <div className="fi-ic">{CAT_IC[u.category]}</div>
                  <div style={{ flex: 1 }}>
                    <div className="fi-ti">{u.title}</div>
                    {u.description && (
                      <div className="fi-de">{u.description}</div>
                    )}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginTop: 6,
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        className="badge b-pend"
                        style={{ fontSize: ".58rem" }}
                      >
                        {u.category.replace("_", " ")}
                      </span>
                      <span style={{ fontSize: ".7rem", color: "var(--gold)" }}>
                        {u.progress_percentage}% complete
                      </span>
                      {u.photo_urls.length > 0 && (
                        <span
                          style={{ fontSize: ".7rem", color: "var(--blue)" }}
                        >
                          📸 {u.photo_urls.length} photo
                          {u.photo_urls.length > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                    <div className="fi-tm">
                      {new Date(u.created_at).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

        {/* ── MATERIALS TAB ── */}
        {tab === "materials" &&
          (materials.length === 0 ? (
            <div className="empty">
              <div className="empty-ic">🪵</div>
              <div className="empty-tx">
                No materials logged yet. Click "+ Material" to add one.
              </div>
            </div>
          ) : (
            <div className="card" style={{ padding: 0 }}>
              <table className="dt">
                <thead>
                  <tr>
                    <th>Material</th>
                    <th>Type</th>
                    <th>Qty</th>
                    <th>Unit Cost</th>
                    <th>Total</th>
                    <th>Supplier</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map((m) => (
                    <tr key={m.id}>
                      <td>{m.name}</td>
                      <td>
                        <span
                          className="badge b-pend"
                          style={{ fontSize: ".58rem" }}
                        >
                          {m.material_type.replace("_", " ")}
                        </span>
                      </td>
                      <td>
                        {m.quantity} {m.unit}
                      </td>
                      <td>₹{m.unit_cost.toLocaleString()}</td>
                      <td style={{ color: "var(--gold)" }}>
                        ₹{m.total_cost.toLocaleString()}
                      </td>
                      <td>{m.supplier ?? "—"}</td>
                      <td>
                        {new Date(m.purchased_at).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                style={{
                  padding: "12px 20px",
                  borderTop: "1px solid var(--border)",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: ".78rem", color: "var(--gray)" }}>
                  Total Material Cost:
                </span>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "1.2rem",
                    color: "var(--gold)",
                  }}
                >
                  ₹{totalCost.toLocaleString()}
                </span>
              </div>
            </div>
          ))}

        {/* ── INFO TAB ── */}
        {tab === "info" && (
          <div className="card">
            <div className="st" style={{ marginBottom: 16 }}>
              Project Information
            </div>
            <div className="grid-2" style={{ gap: "4px 24px" }}>
              {(
                [
                  ["Status", STATUS_LABEL[project.status]],
                  ["Location", project.location ?? "—"],
                  [
                    "Start Date",
                    project.start_date
                      ? new Date(project.start_date).toLocaleDateString("en-IN")
                      : "—",
                  ],
                  [
                    "Expected Handover",
                    project.expected_end_date
                      ? new Date(project.expected_end_date).toLocaleDateString(
                          "en-IN",
                        )
                      : "—",
                  ],
                  [
                    "Created",
                    new Date(project.created_at).toLocaleDateString("en-IN"),
                  ],
                  [
                    "Last Updated",
                    new Date(project.updated_at).toLocaleDateString("en-IN"),
                  ],
                ] as [string, string][]
              ).map(([label, val]) => (
                <div
                  key={label}
                  style={{
                    padding: "10px 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontSize: ".62rem",
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      color: "var(--gray)",
                      marginBottom: 4,
                    }}
                  >
                    {label}
                  </div>
                  <div style={{ fontSize: ".82rem", color: "var(--lgray)" }}>
                    {val}
                  </div>
                </div>
              ))}
            </div>
            {project.description && (
              <div style={{ marginTop: 16 }}>
                <div
                  style={{
                    fontSize: ".62rem",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "var(--gray)",
                    marginBottom: 6,
                  }}
                >
                  Description
                </div>
                <div
                  style={{
                    fontSize: ".82rem",
                    color: "var(--lgray)",
                    lineHeight: 1.6,
                  }}
                >
                  {project.description}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── POST UPDATE MODAL ── */}
      <div
        className={`mo${showUpd ? " open" : ""}`}
        onClick={(e) => e.target === e.currentTarget && setShowUpd(false)}
      >
        <div className="modal" style={{ maxWidth: 500 }}>
          <div className="modal-bar" />
          <div className="modal-in">
            <div className="mhdr">
              <div className="mti">Post Update</div>
              <button className="mc" onClick={() => setShowUpd(false)}>
                ✕
              </button>
            </div>

            <div className="mf">
              <label className="ml2">Work Category</label>
              <select
                className="ms2"
                value={updForm.category}
                onChange={(e) =>
                  setUpdForm((f) => ({
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
            <div className="mf">
              <label className="ml2">Update Title *</label>
              <input
                className="mi2"
                placeholder="e.g. Foundation slab complete"
                value={updForm.title}
                onChange={(e) =>
                  setUpdForm((f) => ({ ...f, title: e.target.value }))
                }
              />
            </div>
            <div className="mf">
              <label className="ml2">Description</label>
              <textarea
                className="mta2"
                placeholder="What was done? Materials used? Next steps?"
                value={updForm.description ?? ""}
                onChange={(e) =>
                  setUpdForm((f) => ({ ...f, description: e.target.value }))
                }
              />
            </div>
            <div className="mf">
              <label className="ml2">
                Category Progress — {updForm.progress_percentage}%
              </label>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={updForm.progress_percentage}
                onChange={(e) =>
                  setUpdForm((f) => ({
                    ...f,
                    progress_percentage: parseInt(e.target.value),
                  }))
                }
              />
            </div>
            <div className="mf">
              <label className="ml2">Photo URLs (optional)</label>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  className="mi2"
                  style={{ flex: 1 }}
                  placeholder="Paste image URL…"
                  value={photoIn}
                  onChange={(e) => setPhotoIn(e.target.value)}
                />
                <button className="btn-o btn-sm" onClick={addPhoto}>
                  Add
                </button>
              </div>
              {updForm.photo_urls.map((url, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 5,
                    fontSize: ".72rem",
                    color: "var(--lgray)",
                  }}
                >
                  <span
                    style={{
                      flex: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    📸 {url}
                  </span>
                  <button
                    className="mc"
                    onClick={() =>
                      setUpdForm((f) => ({
                        ...f,
                        photo_urls: f.photo_urls.filter((_, j) => j !== i),
                      }))
                    }
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="macts">
              <button className="btn-o" onClick={() => setShowUpd(false)}>
                Cancel
              </button>
              <button
                className="btn-g"
                style={{ flex: 1 }}
                onClick={postUpdate}
                disabled={saving}
              >
                {saving ? "Posting…" : "Post Update →"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── ADD MATERIAL MODAL ── */}
      <div
        className={`mo${showMat ? " open" : ""}`}
        onClick={(e) => e.target === e.currentTarget && setShowMat(false)}
      >
        <div className="modal" style={{ maxWidth: 460 }}>
          <div className="modal-bar" />
          <div className="modal-in">
            <div className="mhdr">
              <div className="mti">Log Material</div>
              <button className="mc" onClick={() => setShowMat(false)}>
                ✕
              </button>
            </div>
            <div className="grid-2">
              <div className="mf">
                <label className="ml2">Material Type</label>
                <select
                  className="ms2"
                  value={matForm.material_type}
                  onChange={(e) =>
                    setMatForm((f) => ({
                      ...f,
                      material_type: e.target.value as MaterialType,
                    }))
                  }
                >
                  {MAT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mf">
                <label className="ml2">Name *</label>
                <input
                  className="mi2"
                  placeholder="e.g. Red Clay Bricks"
                  value={matForm.name}
                  onChange={(e) =>
                    setMatForm((f) => ({ ...f, name: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="grid-2">
              <div className="mf">
                <label className="ml2">Quantity *</label>
                <input
                  className="mi2"
                  type="number"
                  min="0"
                  placeholder="500"
                  value={matForm.quantity}
                  onChange={(e) =>
                    setMatForm((f) => ({ ...f, quantity: e.target.value }))
                  }
                />
              </div>
              <div className="mf">
                <label className="ml2">Unit</label>
                <input
                  className="mi2"
                  placeholder="bags / kg / pieces"
                  value={matForm.unit}
                  onChange={(e) =>
                    setMatForm((f) => ({ ...f, unit: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="grid-2">
              <div className="mf">
                <label className="ml2">Unit Cost ₹ *</label>
                <input
                  className="mi2"
                  type="number"
                  min="0"
                  placeholder="12.50"
                  value={matForm.unit_cost}
                  onChange={(e) =>
                    setMatForm((f) => ({ ...f, unit_cost: e.target.value }))
                  }
                />
              </div>
              <div className="mf">
                <label className="ml2">Supplier</label>
                <input
                  className="mi2"
                  placeholder="Supplier name"
                  value={matForm.supplier ?? ""}
                  onChange={(e) =>
                    setMatForm((f) => ({ ...f, supplier: e.target.value }))
                  }
                />
              </div>
            </div>
            {matForm.quantity && matForm.unit_cost && (
              <div
                style={{
                  padding: "8px 12px",
                  background: "var(--panel2)",
                  marginBottom: 12,
                  borderLeft: "3px solid var(--gold)",
                  fontSize: ".78rem",
                }}
              >
                Total:{" "}
                <span
                  style={{
                    color: "var(--gold)",
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "1.05rem",
                  }}
                >
                  ₹
                  {(
                    parseFloat(matForm.quantity || "0") *
                    parseFloat(matForm.unit_cost || "0")
                  ).toLocaleString()}
                </span>
              </div>
            )}
            <div className="macts">
              <button className="btn-o" onClick={() => setShowMat(false)}>
                Cancel
              </button>
              <button
                className="btn-g"
                style={{ flex: 1 }}
                onClick={addMaterial}
                disabled={saving}
              >
                {saving ? "Saving…" : "Log Material →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
