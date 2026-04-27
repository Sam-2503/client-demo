import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ClientLayout() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const initials =
		user?.full_name
			?.split(" ")
			.map((w) => w[0])
			.join("")
			.toUpperCase()
			.slice(0, 2) ?? "C";

	const doLogout = () => {
		logout();
		navigate("/login");
	};

	const nav = [
		{ to: "/client", label: "Overview", icon: "◈", end: true },
		{ to: "/client/progress", label: "Progress", icon: "📈" },
		{ to: "/client/updates", label: "Updates", icon: "📝" },
		{ to: "/client/queries", label: "Questions", icon: "❓" },
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
						<div className="sb-logo-s">Client Portal</div>
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

				{/* Nav */}
				<div className="sb-section">Tools</div>
				{nav.map((n) => (
					<NavLink
						key={n.to}
						to={n.to}
						end={n.end}
						className={({ isActive }) =>
							`ni${isActive ? " act" : ""}`
						}
					>
						<span className="ni-ic">{n.icon}</span>
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
