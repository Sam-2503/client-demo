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
			? "bg-[#69c58a]"
			: progress >= 75
				? "bg-[#d8bc8f]"
				: status === "completed"
					? "bg-[#69c58a]"
					: "bg-[#f39c12]";

	const renderProgressBar = (status: Project["status"], progress: number) => {
		const filledSegments = Math.ceil((progress / 100) * 20);
		return (
			<div className="mb-2 flex h-1.5 gap-px overflow-hidden rounded-full bg-white/5">
				{Array.from({ length: 20 }).map((_, index) => (
					<div
						key={index}
						className={cn(
							"flex-1 rounded-full",
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
			<div className="border-b border-white/10 bg-[linear-gradient(160deg,rgba(10,18,28,0.4)_0%,rgba(16,31,48,0.4)_100%)] px-6 py-6 backdrop-blur-sm">
				<div className="font-serif text-3xl font-semibold text-[#f5efe2]">
					Progress Tracking
				</div>
				<p className="mt-1 text-sm text-[#a9b7c8]">
					Monitor your project progress
				</p>
			</div>

			<div className="animate-fade-up space-y-6 px-6 py-8">
				<div className="text-sm font-semibold uppercase tracking-[0.12em] text-[#a9b7c8]">
					Project Progress
				</div>

				{loading ? (
					<div className="rounded-2xl border border-white/10 bg-[rgba(13,38,58,0.3)] p-12 text-center backdrop-blur-sm">
						<div className="text-sm text-[#a9b7c8]">
							Loading progress…
						</div>
					</div>
				) : projects.length === 0 ? (
					<div className="rounded-2xl border border-white/10 bg-[rgba(13,38,58,0.3)] p-12 text-center backdrop-blur-sm">
						<div className="text-sm text-[#a9b7c8]">
							No projects yet
						</div>
					</div>
				) : (
					<div className="grid gap-4">
						{projects.map((p) => (
							<div
								key={p.id}
								className="rounded-2xl border border-white/10 bg-[rgba(13,38,58,0.3)] p-5 backdrop-blur-sm"
							>
								<div className="mb-4 flex items-center justify-between">
									<div>
										<div className="font-medium text-white">
											{p.name}
										</div>
										<div className="mt-1 text-xs text-[#a9b7c8]">
											{p.location ?? "Location TBD"}
										</div>
									</div>
									<span className="font-serif text-2xl font-semibold text-[#d8bc8f]">
										{p.overall_progress}%
									</span>
								</div>

								{renderProgressBar(
									p.status,
									p.overall_progress,
								)}

								<div className="mt-4 grid grid-cols-3 gap-4 border-t border-white/10 pt-4 text-[0.75rem]">
									<div>
										<div className="text-[#a9b7c8]">
											Start
										</div>
										<div className="mt-1 font-medium text-white">
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
										<div className="text-[#a9b7c8]">
											Expected End
										</div>
										<div className="mt-1 font-medium text-white">
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
										<div className="text-[#a9b7c8]">
											Status
										</div>
										<div
											className={
												p.status === "completed"
													? "mt-1 font-medium text-[#69c58a]"
													: p.status === "in_progress"
														? "mt-1 font-medium text-[#d8bc8f]"
														: "mt-1 font-medium text-[#f39c12]"
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
