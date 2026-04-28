import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";
import { useToast } from "../../components/Toast";
import { cn } from "../../utils/cn";
import type { Project } from "../../types";

export default function ClientOverview() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const toast = useToast();
	const navigate = useNavigate();

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			try {
				const response = await api.get<Project[]>("/api/projects");
				setProjects(response.data);
			} catch {
				toast("Failed to load projects");
			} finally {
				setLoading(false);
			}
		};

		load();
	}, []);

	const total = projects.length;
	const active = projects.filter((p) => p.status === "in_progress").length;
	const completed = projects.filter((p) => p.status === "completed").length;
	const avgProgress = total
		? Math.round(
				projects.reduce((a, p) => a + p.overall_progress, 0) / total,
			)
		: 0;

	const statusAccent: Record<string, string> = {
		in_progress: "border-t-brand-gold",
		completed: "border-t-brand-green",
		on_hold: "border-t-brand-orange",
		planning: "border-t-brand-muted",
	};

	const statusBadge: Record<string, string> = {
		in_progress: "bg-brand-gold text-brand-black",
		completed: "bg-brand-green text-brand-black",
		on_hold: "bg-brand-orange text-brand-black",
		planning: "bg-brand-muted text-brand-black",
	};

	const progressFillClass = (status: string) =>
		status === "in_progress"
			? "bg-brand-gold"
			: status === "completed"
				? "bg-brand-green"
				: "bg-brand-muted";

	const renderProgressBar = (progress: number, status: string) => {
		const filledSegments = Math.ceil((progress / 100) * 20);
		return (
			<div className="flex h-1.5 gap-px overflow-hidden rounded bg-brand-border">
				{Array.from({ length: 20 }).map((_, index) => (
					<div
						key={index}
						className={cn(
							"flex-1 rounded",
							index < filledSegments
								? progressFillClass(status)
								: "bg-transparent",
						)}
					/>
				))}
			</div>
		);
	};

	return (
		<>
			<div className="flex items-center justify-between border-b border-brand-border-light bg-brand-card px-6 py-4">
				<div className="font-serif text-2xl font-semibold text-white">
					My Projects
				</div>
			</div>

			<div className="animate-fade-up space-y-5 px-6 py-6">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
					<div className="rounded-md border border-brand-border-light border-t-2 border-t-brand-gold bg-brand-card p-4">
						<div className="font-serif text-3xl text-brand-gold">
							{total}
						</div>
						<div className="mt-1 text-sm font-medium text-white">
							Total Projects
						</div>
						<div className="text-xs text-brand-muted">
							All projects
						</div>
					</div>
					<div className="rounded-md border border-brand-border-light border-t-2 border-t-brand-green bg-brand-card p-4">
						<div className="font-serif text-3xl text-brand-green">
							{active}
						</div>
						<div className="mt-1 text-sm font-medium text-white">
							Active Projects
						</div>
						<div className="text-xs text-brand-muted">
							In progress
						</div>
					</div>
					<div className="rounded-md border border-brand-border-light border-t-2 border-t-[#5dade2] bg-brand-card p-4">
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
							{avgProgress}%
						</div>
						<div className="mt-1 text-sm font-medium text-white">
							Average Progress
						</div>
						<div className="text-xs text-brand-muted">
							Across all projects
						</div>
					</div>
				</div>

				<div className="mb-3 flex items-center justify-between">
					<div className="text-sm font-semibold uppercase tracking-[0.1em] text-brand-muted-light">
						Your Projects
					</div>
				</div>

				{loading ? (
					<div className="rounded-md border border-brand-border-light bg-brand-card p-10 text-center">
						<div className="mb-2 text-3xl">⏳</div>
						<div className="text-sm text-brand-muted-light">
							Loading projects…
						</div>
					</div>
				) : projects.length === 0 ? (
					<div className="rounded-md border border-brand-border-light bg-brand-card p-10 text-center">
						<div className="mb-2 text-3xl">📁</div>
						<div className="text-sm text-brand-muted-light">
							No projects yet
						</div>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
						{projects.map((p) => (
							<div
								key={p.id}
								className={cn(
									"cursor-pointer rounded-md border border-brand-border-light border-t-2 bg-brand-card p-4 transition hover:border-brand-gold",
									statusAccent[p.status] ??
										"border-t-brand-muted",
								)}
								onClick={() =>
									navigate(`/client/projects/${p.id}`)
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
												statusBadge[p.status] ??
													"bg-brand-muted text-brand-black",
											)}
										>
											{p.status.replace("_", " ")}
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
										{renderProgressBar(
											p.overall_progress,
											p.status,
										)}
									</div>
								</div>

								<div className="mt-4 flex items-center justify-between border-t border-brand-border pt-3">
									<div className="text-[0.72rem] text-brand-muted-light">
										Status:{" "}
										<span className="text-brand-gold">
											{p.status.replace("_", " ")}
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
					</div>
				)}
			</div>
		</>
	);
}
