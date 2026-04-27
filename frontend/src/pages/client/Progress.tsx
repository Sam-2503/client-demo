import { useEffect, useState } from "react";
import api from "../../api/client";
import { useToast } from "../../components/Toast";
import { cn } from "../../utils/cn";
import type { Project } from "../../types";

export default function ClientProgress() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const toast = useToast();

	const progressFillClass = (status: Project["status"], progress: number) =>
		progress === 100
			? "bg-brand-green"
			: progress >= 75
				? "bg-brand-gold"
				: status === "completed"
					? "bg-brand-green"
					: "bg-brand-orange";

	const renderProgressBar = (status: Project["status"], progress: number) => {
		const filledSegments = Math.ceil((progress / 100) * 20);
		return (
			<div className="mb-2 flex h-1.5 gap-px overflow-hidden rounded bg-brand-border">
				{Array.from({ length: 20 }).map((_, index) => (
					<div
						key={index}
						className={cn(
							"flex-1 rounded",
							index < filledSegments
								? progressFillClass(status, progress)
								: "bg-transparent",
						)}
					/>
				))}
			</div>
		);
	};

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			try {
				const response = await api.get<Project[]>("/api/projects");
				setProjects(
					response.data.sort(
						(a, b) => b.overall_progress - a.overall_progress,
					),
				);
			} catch {
				toast("Failed to load projects");
			} finally {
				setLoading(false);
			}
		};

		load();
	}, []);

	return (
		<>
			<div className="flex items-center justify-between border-b border-brand-border-light bg-brand-card px-6 py-4">
				<div className="font-serif text-2xl font-semibold text-white">
					Progress Tracking
				</div>
			</div>

			<div className="animate-fade-up space-y-5 px-6 py-6">
				<div className="mb-4 flex items-center justify-between">
					<div className="text-sm font-semibold uppercase tracking-[0.1em] text-brand-muted-light">
						Project Progress
					</div>
				</div>

				{loading ? (
					<div className="rounded-md border border-brand-border-light bg-brand-card p-10 text-center">
						<div className="mb-2 text-3xl">⏳</div>
						<div className="text-sm text-brand-muted-light">
							Loading progress…
						</div>
					</div>
				) : projects.length === 0 ? (
					<div className="rounded-md border border-brand-border-light bg-brand-card p-10 text-center">
						<div className="mb-2 text-3xl">📊</div>
						<div className="text-sm text-brand-muted-light">
							No projects yet
						</div>
					</div>
				) : (
					<div className="grid gap-4">
						{projects.map((p) => (
							<div
								key={p.id}
								className="rounded-md border border-brand-border-light bg-brand-card p-4"
							>
								<div className="mb-3 flex items-center justify-between">
									<div>
										<div className="mb-1 text-sm font-medium text-white">
											{p.name}
										</div>
										<div className="text-xs text-brand-muted">
											{p.location ?? "Location TBD"}
										</div>
									</div>
									<span className="font-serif text-xl text-brand-gold">
										{p.overall_progress}%
									</span>
								</div>

								{renderProgressBar(
									p.status,
									p.overall_progress,
								)}

								<div className="grid grid-cols-3 gap-3 text-[0.7rem] text-brand-muted">
									<div>
										<div className="mb-1">Start</div>
										<div className="text-white">
											{p.start_date
												? new Date(
														p.start_date,
													).toLocaleDateString(
														"en-IN",
														{
															day: "2-digit",
															month: "short",
														},
													)
												: "—"}
										</div>
									</div>
									<div>
										<div className="mb-1">Expected End</div>
										<div className="text-white">
											{p.expected_end_date
												? new Date(
														p.expected_end_date,
													).toLocaleDateString(
														"en-IN",
														{
															day: "2-digit",
															month: "short",
														},
													)
												: "—"}
										</div>
									</div>
									<div>
										<div className="mb-1">Status</div>
										<div
											className={
												p.status === "completed"
													? "text-[#27ae60]"
													: p.status === "in_progress"
														? "text-brand-gold"
														: "text-[#e67e22]"
											}
										>
											{p.status.replace("_", " ")}
										</div>
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
