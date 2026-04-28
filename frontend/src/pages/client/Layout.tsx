import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../utils/cn";

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
		<div className="flex min-h-screen w-full bg-brand-black text-white">
			{/* ── SIDEBAR ── */}
			<div className="flex w-[280px] shrink-0 flex-col border-r border-brand-border-light bg-brand-dark">
				{/* Logo */}
				<div className="mb-6 border-b border-brand-border-light px-4 py-6">
					<div className="mb-2 inline-flex rounded bg-brand-gold px-2 py-1 text-xs font-semibold tracking-[0.1em] text-brand-black">
						RJS
					</div>
					<div>
						<div className="font-serif text-xl font-semibold text-white">
							RJS Homes
						</div>
						<div className="text-xs uppercase tracking-[0.12em] text-brand-muted">
							Client Portal
						</div>
					</div>
				</div>

				{/* Logged-in user */}
				<div className="mx-4 mb-6 flex items-center gap-3 rounded border border-brand-border bg-brand-panel p-3">
					<div className="grid h-10 w-10 place-items-center rounded-full bg-brand-gold font-semibold text-brand-black">
						{initials}
					</div>
					<div>
						<div className="text-sm font-medium text-white">
							{user?.full_name}
						</div>
						<div className="text-xs uppercase text-brand-muted">
							{user?.role}
						</div>
					</div>
				</div>

				{/* Nav */}
				<div className="px-4 pb-2 text-xs uppercase tracking-[0.12em] text-brand-muted">
					Tools
				</div>
				{nav.map((n) => (
					<NavLink
						key={n.to}
						to={n.to}
						end={n.end}
						className={({ isActive }) =>
							cn(
								"mx-3 mb-1 flex items-center gap-3 rounded border border-transparent px-3 py-2 text-sm text-brand-muted-light transition",
								isActive
									? "border-brand-gold bg-brand-panel-light text-brand-gold"
									: "hover:border-brand-gold hover:bg-brand-panel hover:text-white",
							)
						}
					>
						<span className="inline-flex w-5 items-center justify-center text-base">
							{n.icon}
						</span>
						{n.label}
					</NavLink>
				))}

				<div className="mt-auto border-t border-brand-border-light p-4">
					<button
						className="w-full rounded border border-red-700 bg-[rgba(192,57,43,0.12)] px-3 py-2 text-sm font-medium text-red-300 transition hover:bg-[rgba(192,57,43,0.2)]"
						onClick={doLogout}
					>
						Sign Out
					</button>
				</div>
			</div>

			{/* ── MAIN ── */}
			<div className="min-w-0 flex-1 overflow-x-hidden bg-brand-dark-secondary">
				<Outlet />
			</div>
		</div>
	);
}
