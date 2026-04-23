import { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { Project } from "../../types";
import api from "../../api/client";

const STATUS_COLOR: Record<string, string> = {
  planning: "#444",
  in_progress: "var(--gold)",
  on_hold: "var(--orange)",
  completed: "var(--green)",
};

export default function BuilderLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    api
      .get<Project[]>("/api/projects/")
      .then((r) => setProjects(r.data))
      .catch(() => {});
  }, []);

  const initials =
    user?.full_name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) ?? "RJ";

  const doLogout = () => {
    logout();
    navigate("/login");
  };

  const nav = [
    { to: "/builder", label: "Dashboard", ic: "◈", end: true },
    { to: "/builder/projects", label: "Projects", ic: "🏗" },
    { to: "/builder/updates", label: "Post Update", ic: "📢" },
    { to: "/builder/materials", label: "Materials Log", ic: "🪵" },
    { to: "/builder/clients", label: "Clients", ic: "👥" },
  ];

  return (
    <div className="portal">
      {/* ── SIDEBAR ── */}
      <div className="sb">
        {/* Logo */}
        <div className="sb-logo">
          <div className="sb-logo-icon">RJS</div>
          <div>
            <div className="sb-logo-n">RJS Homes</div>
            <div className="sb-logo-s">Admin Portal</div>
          </div>
        </div>

        {/* Logged-in user */}
        <div className="sb-user">
          <div className="sb-av">{initials}</div>
          <div>
            <div className="sb-un">{user?.full_name}</div>
            <div className="sb-ur">{user?.role}</div>
          </div>
        </div>

        {/* Project quick-switcher */}
        <div className="sb-proj-hdr">
          <div className="sb-proj-label">Projects</div>
          <button
            className="sb-proj-new"
            onClick={() => navigate("/builder/projects")}
          >
            + New
          </button>
        </div>

        <div className="proj-list">
          {projects.slice(0, 6).map((p) => (
            <div
              key={p.id}
              className="proj-item"
              onClick={() => navigate(`/builder/projects/${p.id}`)}
            >
              <div className="proj-item-name">{p.name}</div>
              <div className="proj-item-meta">
                <span
                  style={{
                    display: "inline-block",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: STATUS_COLOR[p.status] ?? "#444",
                    marginRight: 5,
                    verticalAlign: "middle",
                  }}
                />
                {p.overall_progress}% · {p.status.replace("_", " ")}
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div
              style={{ padding: "6px 10px", fontSize: ".72rem", color: "#333" }}
            >
              No projects yet
            </div>
          )}
        </div>

        {/* Nav */}
        <div className="sb-section">Tools</div>
        {nav.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.end}
            className={({ isActive }) => `ni${isActive ? " act" : ""}`}
          >
            <span className="ni-ic">{n.ic}</span>
            {n.label}
          </NavLink>
        ))}

        <div className="sb-foot">
          <button className="sb-logout" onClick={doLogout}>
            Sign Out
          </button>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}
