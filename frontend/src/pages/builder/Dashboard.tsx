import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";
import { useToast } from "../../components/Toast";
import { cn } from "../../utils/cn";
import type { Project, ProjectStatus } from "../../types";

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
	planning: "bg-brand-muted text-brand-black",
	in_progress: "bg-brand-gold text-brand-black",
	on_hold: "bg-[#e67e22] text-brand-black",
	completed: "bg-[#27ae60] text-brand-black",
};

export default function BuilderDashboard() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const toast = useToast();

	useEffect(() => {
		api.get<Project[]>("/api/projects/")
			.then((r) => setProjects(r.data))
			.catch(() => toast("Failed to load projects"))
			.finally(() => setLoading(false));
	}, []);

	const total = projects.length;
	const active = projects.filter((p) => p.status === "in_progress").length;
	const completed = projects.filter((p) => p.status === "completed").length;
	const avgProg = total
		? Math.round(
				projects.reduce((a, p) => a + p.overall_progress, 0) / total,
			)
		: 0;

	return (
		<>
			{/* Topbar */}
			<div className="flex items-center justify-between border-b border-brand-border-light bg-brand-card px-6 py-4">
				<div className="font-serif text-2xl font-semibold text-white">
					Dashboard
				</div>
				<div className="flex items-center gap-3">
					<span className="rounded bg-brand-gold px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-brand-black">
						ADMIN
					</span>
					<button
						className="rounded bg-brand-gold px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-brand-black transition hover:bg-brand-gold-light"
						onClick={() => navigate("/builder/projects")}
					>
						+ New Project
					</button>
				</div>
			</div>

			<div className="animate-fade-up space-y-5 px-6 py-6">
				{/* KPIs */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
					<div className="rounded-md border border-brand-border-light border-t-2 border-t-brand-gold bg-brand-card p-4">
						<div className="font-serif text-3xl text-brand-gold">
							{total}
						</div>
						<div className="mt-1 text-sm font-medium text-white">
							Total Projects
						</div>
						<div className="text-xs text-brand-muted">All time</div>
					</div>
					<div className="rounded-md border border-brand-border-light border-t-2 border-t-[#27ae60] bg-brand-card p-4">
						<div className="font-serif text-3xl text-[#4caf50]">
							{active}
						</div>
						<div className="mt-1 text-sm font-medium text-white">
							Active Builds
						</div>
						<div className="text-xs text-brand-muted">
							In progress
						</div>
					</div>
					<div className="rounded-md border border-brand-border-light border-t-2 border-t-[#2980b9] bg-brand-card p-4">
						<div className="font-serif text-3xl text-[#5dade2]">
							{completed}
						</div>
						<div className="mt-1 text-sm font-medium text-white">
							Completed
						</div>
						<div className="text-xs text-brand-muted">
							Delivered
						</div>
					</div>
					<div className="rounded-md border border-brand-border-light border-t-2 border-t-brand-gold bg-brand-card p-4">
						<div className="font-serif text-3xl text-brand-gold">
							{avgProg}%
						</div>
						<div className="mt-1 text-sm font-medium text-white">
							Avg Progress
						</div>
						<div className="text-xs text-brand-muted">
							Across all projects
						</div>
					</div>
				</div>

				{/* Projects header */}
				<div className="mb-3 flex items-center justify-between">
					<div className="text-sm font-semibold uppercase tracking-[0.1em] text-brand-muted-light">
						All Projects
					</div>
					<button
						className="rounded bg-brand-gold px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-brand-black transition hover:bg-brand-gold-light"
						onClick={() => navigate("/builder/projects")}
					>
						+ New Project
					</button>
				</div>

				{/* Projects grid */}
				{loading ? (
					<div className="rounded-md border border-brand-border-light bg-brand-card p-10 text-center">
						<div className="mb-2 text-3xl">⏳</div>
						<div className="text-sm text-brand-muted-light">
							Loading projects…
						</div>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
						{projects.map((p) => (
							<div
								key={p.id}
								className="cursor-pointer rounded-md border border-brand-border-light border-t-2 bg-brand-card p-4 transition hover:border-brand-gold"
								style={{
									borderTopColor: STATUS_COLOR[p.status],
								}}
								onClick={() =>
									navigate(`/builder/projects/${p.id}`)
								}
							>
								<div className="space-y-4">
									<div className="flex items-start justify-between gap-3">
										<div>
											<div className="text-sm font-semibold text-white">
												{p.name}
											</div>
											<div className="text-xs text-brand-muted">
												{p.location ?? "Location TBD"}
											</div>
										</div>
										<span
											className={cn(
												"rounded px-2 py-0.5 text-[0.65rem] font-semibold uppercase",
												STATUS_BADGE[p.status],
											)}
										>
											{STATUS_LABEL[p.status]}
										</span>
									</div>

									<div className="text-xs text-brand-muted-light">
										📍 {p.location ?? "—"}
									</div>

									<div>
										<div className="mb-1 flex items-center justify-between text-[0.7rem] text-brand-muted-light">
											<span>Progress</span>
											<span>{p.overall_progress}%</span>
										</div>
										<div className="h-1.5 overflow-hidden rounded bg-brand-border">
											<div
												className="h-full rounded"
												style={{
													width: `${p.overall_progress}%`,
													background:
														STATUS_COLOR[p.status],
												}}
											/>
										</div>
									</div>
								</div>

								<div className="mt-4 flex items-center justify-between border-t border-brand-border pt-3">
									<div className="text-[0.72rem] text-brand-muted-light">
										Status:{" "}
										<span className="text-brand-gold">
											{STATUS_LABEL[p.status]}
										</span>
									</div>
									<div className="text-[0.68rem] text-brand-muted">
										{p.start_date
											? new Date(
													p.start_date,
												).toLocaleDateString("en-IN", {
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
							className="grid cursor-pointer place-items-center rounded-md border border-dashed border-brand-gold bg-brand-card p-6 text-center transition hover:bg-brand-panel"
							onClick={() => navigate("/builder/projects")}
						>
							<div className="mb-2 text-2xl text-brand-gold">
								＋
							</div>
							<div className="text-sm font-medium text-brand-muted-light">
								Create New Project
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
