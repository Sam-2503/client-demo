import { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../utils/cn";
import type { Project } from "../../types";
import api from "../../api/client";

const STATUS_COLOR: Record<string, string> = {
	planning: "#5a6b7a",
	in_progress: "#d8bc8f",
	on_hold: "#f39c12",
	completed: "#69c58a",
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
		{ to: "/builder", label: "Dashboard", end: true },
		...(isAdmin
			? []
			: [
					{ to: "/builder/projects", label: "Projects" },
					{ to: "/builder/updates", label: "Post Update" },
					{
						to: "/builder/materials",
						label: "Materials Log",
					},
					{ to: "/builder/clients", label: "Clients" },
				]),
		...(isAdmin
			? [
					{
						to: "/admin/approvals",
						label: "Builder Approvals",
						end: false,
					},
					{ to: "/admin/projects", label: "All Projects" },
				]
			: []),
	];

	return (
		<div className="flex min-h-screen w-full bg-[#101824] text-white">
			{/* ── SIDEBAR ── */}
			<div className="flex w-[300px] shrink-0 flex-col border-r border-white/10 bg-gradient-to-b from-[#0a121c]/80 to-[#050911]/80 backdrop-blur-xl">
				{/* Logo */}
				<div className="mb-5 border-b border-white/10 px-4 py-6">
					<div className="mb-2 inline-flex rounded bg-[#d8bc8f] px-2 py-1 text-xs font-semibold tracking-[0.1em] text-[#101824]">
						RJS
					</div>
					<div>
						<div className="font-serif text-xl font-semibold text-[#f5efe2]">
							RJS Homes
						</div>
						<div className="text-xs uppercase tracking-[0.12em] text-[#a9b7c8]">
							{isAdmin ? "Admin Portal" : "Builder Portal"}
						</div>
					</div>
				</div>

				{/* Logged-in user */}
				<div className="mx-4 mb-5 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
					<div className="grid h-10 w-10 place-items-center rounded-full bg-[#d8bc8f] font-semibold text-[#101824]">
						{initials}
					</div>
					<div>
						<div className="text-sm font-medium text-white">
							{user?.full_name}
						</div>
						<div className="text-xs uppercase text-[#a9b7c8]">
							{user?.role}
						</div>
					</div>
				</div>

				{/* Project quick-switcher */}
				{!isAdmin && (
					<>
						<div className="mb-2 flex items-center justify-between px-4">
							<div className="text-xs uppercase tracking-[0.12em] text-[#a9b7c8]">
								Projects
							</div>
							<button
								className="rounded-lg border border-[#d8bc8f]/35 px-2 py-1 text-[0.62rem] uppercase tracking-[0.08em] text-[#d8bc8f] transition hover:border-[#d8bc8f]/50 hover:bg-[rgba(216,188,143,0.1)]"
								onClick={() => navigate("/builder/projects")}
							>
								+ New
							</button>
						</div>

						<div className="mx-3 mb-4 max-h-52 space-y-1 overflow-y-auto rounded-xl border border-white/10 bg-white/5 p-2">
							{projects.slice(0, 6).map((p) => (
								<div
									key={p.id}
									className="cursor-pointer rounded-lg border border-transparent px-2 py-2 transition hover:border-[#d8bc8f]/25 hover:bg-white/5"
									onClick={() =>
										navigate(`/builder/projects/${p.id}`)
									}
								>
									<div className="truncate text-xs font-medium text-white">
										{p.name}
									</div>
									<div className="mt-1 text-[0.68rem] text-[#a9b7c8]">
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
								<div className="px-2 py-1 text-[0.72rem] text-[#a9b7c8]">
									No projects yet
								</div>
							)}
						</div>
					</>
				)}

				{/* Nav */}
				<div className="px-4 pb-2 text-xs uppercase tracking-[0.12em] text-[#a9b7c8]">
					Navigation
				</div>
				{nav.map((n) => (
					<NavLink
						key={n.to}
						to={n.to}
						end={n.end}
						className={({ isActive }) =>
							cn(
								"mx-3 mb-1 flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 text-sm transition",
								isActive
									? "border-[#d8bc8f]/35 bg-[rgba(216,188,143,0.08)] text-[#d8bc8f]"
									: "text-[#a9b7c8] hover:border-[#d8bc8f]/25 hover:bg-white/5 hover:text-[#f0e0c1]",
							)
						}
					>
						{n.label}
					</NavLink>
				))}

				<div className="mt-auto border-t border-white/10 p-4">
					<button
						className="w-full rounded-lg border border-red-900/40 bg-[rgba(220,76,69,0.08)] px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-[rgba(220,76,69,0.15)]"
						onClick={doLogout}
					>
						Sign Out
					</button>
				</div>
			</div>

			{/* ── MAIN ── */}
			<div className="min-w-0 flex-1 overflow-x-hidden bg-[linear-gradient(120%_90%_at_50%_100%,#13263a_0%,#08111c_48%,#050911_100%)]">
				<Outlet />
			</div>
		</div>
	);
}
