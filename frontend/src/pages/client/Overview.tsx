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
		in_progress: "border-t-[#c7ced6]",
		completed: "border-t-[#c7ced6]",
		on_hold: "border-t-[#c7ced6]",
		planning: "border-t-[#c7ced6]",
	};

	const statusBadge: Record<string, string> = {
		in_progress: "bg-[#eef3f6] text-[#475462]",
		completed: "bg-[#eef3f6] text-[#475462]",
		on_hold: "bg-[#eef3f6] text-[#475462]",
		planning: "bg-[#eef3f6] text-[#475462]",
	};

	const renderProgressBar = (progress: number, status: string) => {
		const statusColor: Record<string, string> = {
			planning: "#c7ced6",
			in_progress: "#c7ced6",
			on_hold: "#c7ced6",
			completed: "#c7ced6",
		};

		return (
			<div className="mt-2 flex items-center gap-2">
				<div className="flex-1 overflow-hidden rounded-full bg-[rgba(224,234,242,0.5)]">
					<div
						className="h-2 rounded-full transition-all"
						style={{
							width: `${progress}%`,
							backgroundColor: statusColor[status],
						}}
					/>
				</div>
				<span className="text-sm text-[#5d6a78]">{progress}%</span>
			</div>
		);
	};

	return (
		<>
			<div className="border-b border-black/10 bg-[#f8fafb] px-6 py-8 backdrop-blur-sm">
				<h1 className="text-4xl font-bold text-[#1f2a34]">Dashboard</h1>
				<p className="mt-2 text-[#5d6a78]">
					Track your projects and their progress in real-time
				</p>
			</div>

			<div className="animate-fade-up space-y-6 px-6 py-8">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{[
						{
							label: "Total Projects",
							value: total,
						},
						{ label: "Active", value: active },
						{
							label: "Completed",
							value: completed,
						},
						{
							label: "Avg. Progress",
							value: `${avgProgress}%`,
						},
					].map((stat) => (
						<div
							key={stat.label}
							className="rounded-2xl border border-black/10 bg-[rgba(224,234,242,0.3)] p-5 backdrop-blur-sm"
						>
							<p className="text-sm text-[#5d6a78]">
								{stat.label}
							</p>
							<div className="mt-2 flex items-end gap-2">
								<span className="text-3xl font-bold text-[#1f2a34]">
									{stat.value}
								</span>
							</div>
						</div>
					))}
				</div>

				<div>
					<div className="mb-4 flex items-center justify-between">
						<h2 className="text-2xl font-bold text-[#1f2a34]">
							Your Projects
						</h2>
						<button
							onClick={() => navigate("/client/projects")}
							className="rounded-lg border border-black/10 px-4 py-2 text-sm font-medium text-[#475462] transition-all hover:bg-black/5 hover:text-[#1f2a34]"
						>
							View All
						</button>
					</div>

					{loading ? (
						<div className="rounded-2xl border border-black/10 bg-[rgba(224,234,242,0.3)] p-8 text-center backdrop-blur-sm">
							<p className="text-[#5d6a78]">Loading projects…</p>
						</div>
					) : projects.length === 0 ? (
						<div className="rounded-2xl border border-black/10 bg-[rgba(224,234,242,0.3)] p-8 text-center backdrop-blur-sm">
							<p className="text-[#5d6a78]">No projects yet</p>
						</div>
					) : (
						<div className="grid gap-4 sm:grid-cols-2">
							{projects.map((p) => (
								<div
									key={p.id}
									onClick={() =>
										navigate(`/client/projects/${p.id}`)
									}
									className={cn(
										"cursor-pointer rounded-2xl border border-black/10 bg-[rgba(224,234,242,0.3)] p-5 transition-all hover:bg-[rgba(224,234,242,0.5)] hover:shadow-lg backdrop-blur-sm",
										statusAccent[p.status],
									)}
								>
									<div className="mb-3 flex items-start justify-between">
										<div>
											<h3 className="font-semibold text-[#1f2a34]">
												{p.name}
											</h3>
											<p className="mt-1 text-sm text-[#5d6a78]">
												{p.location ?? "Location TBD"}
											</p>
										</div>
										<span
											className={cn(
												"rounded-full px-3 py-1 text-xs font-medium",
												statusBadge[p.status],
											)}
										>
											{p.status.replace("_", " ")}
										</span>
									</div>
									{renderProgressBar(
										p.overall_progress,
										p.status,
									)}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
