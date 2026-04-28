import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";
import { useToast } from "../../components/Toast";
import { cn } from "../../utils/cn";
import type { Project, ProjectStatus } from "../../types";

const STATUS_COLOR: Record<ProjectStatus, string> = {
	planning: "#5a6b7a",
	in_progress: "#d8bc8f",
	on_hold: "#f39c12",
	completed: "#69c58a",
};

const STATUS_LABEL: Record<ProjectStatus, string> = {
	planning: "Planning",
	in_progress: "Active",
	on_hold: "On Hold",
	completed: "Complete",
};

const STATUS_BADGE: Record<ProjectStatus, string> = {
	planning: "bg-[#5a6b7a] text-white",
	in_progress: "bg-[#d8bc8f] text-[#101824]",
	on_hold: "bg-[#f39c12] text-white",
	completed: "bg-[#69c58a] text-white",
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
			<div className="border-b border-white/10 bg-[linear-gradient(160deg,rgba(10,18,28,0.4)_0%,rgba(16,31,48,0.4)_100%)] px-6 py-6 backdrop-blur-sm">
				<div className="font-serif text-3xl font-semibold text-[#f5efe2]">
					Dashboard
				</div>
			</div>

			<div className="animate-fade-up space-y-8 px-6 py-8">
				{/* KPIs */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
					<div className="rounded-2xl border border-white/10 border-t-2 border-t-[#d8bc8f] bg-[rgba(13,38,58,0.3)] p-5 backdrop-blur-sm transition hover:border-[#d8bc8f]/20 hover:bg-[rgba(13,38,58,0.5)]">
						<div className="text-sm uppercase tracking-[0.12em] text-[#a9b7c8]">
							Total Projects
						</div>
						<div className="mt-3 font-serif text-4xl font-semibold text-[#d8bc8f]">
							{total}
						</div>
						<div className="mt-2 text-xs text-[#7a8894]">
							All time
						</div>
					</div>
					<div className="rounded-2xl border border-white/10 border-t-2 border-t-[#69c58a] bg-[rgba(13,38,58,0.3)] p-5 backdrop-blur-sm transition hover:border-[#69c58a]/20 hover:bg-[rgba(13,38,58,0.5)]">
						<div className="text-sm uppercase tracking-[0.12em] text-[#a9b7c8]">
							Active Builds
						</div>
						<div className="mt-3 font-serif text-4xl font-semibold text-[#69c58a]">
							{active}
						</div>
						<div className="mt-2 text-xs text-[#7a8894]">
							In progress
						</div>
					</div>
					<div className="rounded-2xl border border-white/10 border-t-2 border-t-[#5dade2] bg-[rgba(13,38,58,0.3)] p-5 backdrop-blur-sm transition hover:border-[#5dade2]/20 hover:bg-[rgba(13,38,58,0.5)]">
						<div className="text-sm uppercase tracking-[0.12em] text-[#a9b7c8]">
							Completed
						</div>
						<div className="mt-3 font-serif text-4xl font-semibold text-[#5dade2]">
							{completed}
						</div>
						<div className="mt-2 text-xs text-[#7a8894]">
							Delivered
						</div>
					</div>
					<div className="rounded-2xl border border-white/10 border-t-2 border-t-[#d8bc8f] bg-[rgba(13,38,58,0.3)] p-5 backdrop-blur-sm transition hover:border-[#d8bc8f]/20 hover:bg-[rgba(13,38,58,0.5)]">
						<div className="text-sm uppercase tracking-[0.12em] text-[#a9b7c8]">
							Avg Progress
						</div>
						<div className="mt-3 font-serif text-4xl font-semibold text-[#d8bc8f]">
							{avgProg}%
						</div>
						<div className="mt-2 text-xs text-[#7a8894]">
							Across all projects
						</div>
					</div>
				</div>

				{/* Projects header */}
				<div className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#a9b7c8]">
					All Projects
				</div>

				{/* Projects grid */}
				{loading ? (
					<div className="rounded-2xl border border-white/10 bg-[rgba(13,38,58,0.3)] p-12 text-center backdrop-blur-sm">
						<div className="text-sm text-[#a9b7c8]">
							Loading projects…
						</div>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
						{projects.map((p) => (
							<div
								key={p.id}
								className="cursor-pointer rounded-2xl border border-white/10 border-t-2 bg-[rgba(13,38,58,0.3)] p-5 transition hover:border-[#d8bc8f]/35 hover:bg-[rgba(13,38,58,0.5)]"
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
											<div className="font-medium text-white">
												{p.name}
											</div>
											<div className="mt-1 text-xs text-[#a9b7c8]">
												{p.location ?? "Location TBD"}
											</div>
										</div>
										<span
											className={cn(
												"rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase",
												STATUS_BADGE[p.status],
											)}
										>
											{STATUS_LABEL[p.status]}
										</span>
									</div>

									<div>
										<div className="mb-2 flex items-center justify-between text-[0.7rem]">
											<span className="text-[#a9b7c8]">
												Progress
											</span>
											<span className="font-semibold text-white">
												{p.overall_progress}%
											</span>
										</div>
										<div className="h-1.5 overflow-hidden rounded-full bg-white/5">
											<div
												className="h-full rounded-full"
												style={{
													width: `${p.overall_progress}%`,
													background:
														STATUS_COLOR[p.status],
												}}
											/>
										</div>
									</div>
								</div>

								<div className="mt-4 border-t border-white/10 pt-3 text-[0.72rem]">
									<div className="text-[#a9b7c8]">
										Status:{" "}
										<span className="text-[#d8bc8f]">
											{STATUS_LABEL[p.status]}
										</span>
									</div>
									<div className="mt-2 text-[#7a8894]">
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
							className="grid cursor-pointer place-items-center rounded-2xl border border-dashed border-[#d8bc8f]/50 bg-[rgba(216,188,143,0.08)] p-8 text-center transition hover:border-[#d8bc8f]/70 hover:bg-[rgba(216,188,143,0.12)]"
							onClick={() => navigate("/builder/projects")}
						>
							<div className="text-[#d8bc8f]">
								<div className="mb-2 text-2xl font-semibold">
									+
								</div>
								<div className="text-sm font-medium">
									Create New Project
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
