import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";
import { useToast } from "../../components/Toast";
import { Project, ProjectStatus } from "../../types";

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

export default function BuilderDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    api
      .get<Project[]>("/api/projects/")
      .then((r) => setProjects(r.data))
      .catch(() => toast("Failed to load projects"))
      .finally(() => setLoading(false));
  }, []);

  const total = projects.length;
  const active = projects.filter((p) => p.status === "in_progress").length;
  const completed = projects.filter((p) => p.status === "completed").length;
  const avgProg = total
    ? Math.round(projects.reduce((a, p) => a + p.overall_progress, 0) / total)
    : 0;

  return (
    <>
      {/* Topbar */}
      <div className="topbar">
        <div className="tb-title">Dashboard</div>
        <div className="tb-right">
          <span className="badge b-admin">ADMIN</span>
          <button
            className="btn-g btn-sm"
            onClick={() => navigate("/builder/projects")}
          >
            + New Project
          </button>
        </div>
      </div>

      <div className="content fade-up">
        {/* KPIs */}
        <div className="kpi-row">
          <div className="kpi">
            <div className="kpi-v">{total}</div>
            <div className="kpi-l">Total Projects</div>
            <div className="kpi-n">All time</div>
          </div>
          <div className="kpi" style={{ borderTopColor: "var(--green)" }}>
            <div className="kpi-v" style={{ color: "var(--green2)" }}>
              {active}
            </div>
            <div className="kpi-l">Active Builds</div>
            <div className="kpi-n">In progress</div>
          </div>
          <div className="kpi" style={{ borderTopColor: "var(--blue)" }}>
            <div className="kpi-v" style={{ color: "#5dade2" }}>
              {completed}
            </div>
            <div className="kpi-l">Completed</div>
            <div className="kpi-n">Delivered</div>
          </div>
          <div className="kpi">
            <div className="kpi-v">{avgProg}%</div>
            <div className="kpi-l">Avg Progress</div>
            <div className="kpi-n">Across all projects</div>
          </div>
        </div>

        {/* Projects header */}
        <div className="sh" style={{ marginBottom: 14 }}>
          <div className="st">All Projects</div>
          <button
            className="btn-g btn-sm"
            onClick={() => navigate("/builder/projects")}
          >
            + New Project
          </button>
        </div>

        {/* Projects grid */}
        {loading ? (
          <div className="empty">
            <div className="empty-ic">⏳</div>
            <div className="empty-tx">Loading projects…</div>
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
                    {p.start_date
                      ? new Date(p.start_date).toLocaleDateString("en-IN", {
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </div>
                </div>
              </div>
            ))}

            {/* Add new card */}
            <div
              className="proj-card add-proj-card"
              onClick={() => navigate("/builder/projects")}
            >
              <div className="add-proj-card-icon">＋</div>
              <div className="add-proj-card-label">Create New Project</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
