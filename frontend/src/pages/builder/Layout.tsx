import { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../utils/cn";
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
		api.get<Project[]>("/api/projects/")
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

	const isAdmin = user?.role === "admin";

	const nav = [
		{ to: "/builder", label: "Dashboard", ic: "◈", end: true },
		...(isAdmin
			? []
			: [
					{ to: "/builder/projects", label: "Projects", ic: "🏗" },
					{ to: "/builder/updates", label: "Post Update", ic: "📢" },
					{
						to: "/builder/materials",
						label: "Materials Log",
						ic: "🪵",
					},
					{ to: "/builder/clients", label: "Clients", ic: "👥" },
				]),
		...(isAdmin
			? [
					{
						to: "/admin/approvals",
						label: "Builder Approvals",
						ic: "✓",
						end: false,
					},
					{ to: "/admin/projects", label: "All Projects", ic: "🏗" },
				]
			: []),
	];

	return (
		<div className="flex min-h-screen w-full bg-brand-black text-white">
			{/* ── SIDEBAR ── */}
			<div className="flex w-[300px] shrink-0 flex-col border-r border-brand-border-light bg-brand-dark">
				{/* Logo */}
				<div className="mb-5 border-b border-brand-border-light px-4 py-6">
					<div className="mb-2 inline-flex rounded bg-brand-gold px-2 py-1 text-xs font-semibold tracking-[0.1em] text-brand-black">
						RJS
					</div>
					<div>
						<div className="font-serif text-xl font-semibold text-white">
							RJS Homes
						</div>
						<div className="text-xs uppercase tracking-[0.12em] text-brand-muted">
							{isAdmin ? "Admin Portal" : "Builder Portal"}
						</div>
					</div>
				</div>

				{/* Logged-in user */}
				<div className="mx-4 mb-5 flex items-center gap-3 rounded border border-brand-border bg-brand-panel p-3">
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

				{/* Project quick-switcher */}
				{!isAdmin && (
					<>
						<div className="mb-2 flex items-center justify-between px-4">
							<div className="text-xs uppercase tracking-[0.12em] text-brand-muted">
								Projects
							</div>
							<button
								className="rounded border border-brand-gold px-2 py-1 text-[0.62rem] uppercase tracking-[0.08em] text-brand-gold transition hover:bg-brand-gold hover:text-brand-black"
								onClick={() => navigate("/builder/projects")}
							>
								+ New
							</button>
						</div>

						<div className="mx-3 mb-4 max-h-52 space-y-1 overflow-y-auto rounded border border-brand-border bg-brand-panel p-2">
							{projects.slice(0, 6).map((p) => (
								<div
									key={p.id}
									className="cursor-pointer rounded border border-transparent px-2 py-2 transition hover:border-brand-gold hover:bg-brand-card"
									onClick={() =>
										navigate(`/builder/projects/${p.id}`)
									}
								>
									<div className="truncate text-xs font-medium text-white">
										{p.name}
									</div>
									<div className="mt-1 text-[0.68rem] text-brand-muted-light">
										<span
											style={{
												display: "inline-block",
												width: 6,
												height: 6,
												borderRadius: "50%",
												background:
													STATUS_COLOR[p.status] ??
													"#444",
												marginRight: 5,
												verticalAlign: "middle",
											}}
										/>
										{p.overall_progress}% ·{" "}
										{p.status.replace("_", " ")}
									</div>
								</div>
							))}
							{projects.length === 0 && (
								<div className="px-2 py-1 text-[0.72rem] text-brand-muted">
									No projects yet
								</div>
							)}
						</div>
					</>
				)}

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
									? "border-brand-gold bg-brand-panel text-brand-gold"
									: "hover:border-brand-gold hover:bg-brand-card hover:text-white",
							)
						}
					>
						<span className="inline-flex w-5 items-center justify-center text-base">
							{n.ic}
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
			<div className="min-w-0 flex-1 overflow-x-hidden bg-[#111111]">
				<Outlet />
			</div>
		</div>
	);
}
