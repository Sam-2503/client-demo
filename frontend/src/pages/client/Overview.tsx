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
		in_progress: "border-t-[#d8bc8f]",
		completed: "border-t-[#69c58a]",
		on_hold: "border-t-[#f39c12]",
		planning: "border-t-[#5a6b7a]",
	};

	const statusBadge: Record<string, string> = {
		in_progress: "bg-[#d8bc8f] text-[#101824]",
		completed: "bg-[#69c58a] text-white",
		on_hold: "bg-[#f39c12] text-white",
		planning: "bg-[#5a6b7a] text-white",
	};

	const renderProgressBar = (progress: number, status: string) => {
		const statusColor: Record<string, string> = {
			planning: "#5a6b7a",
			in_progress: "#d8bc8f",
			on_hold: "#f39c12",
			completed: "#69c58a",
		};

		return (
			<div className="mt-2 flex items-center gap-2">
				<div className="flex-1 overflow-hidden rounded-full bg-[rgba(13,38,58,0.5)]">
					<div
						className="h-2 rounded-full transition-all"
						style={{ width: `${progress}%`, backgroundColor: statusColor[status] }}
					/>
				</div>
				<span className="text-sm text-[#a9b7c8]">{progress}%</span>
			</div>
		);
	};

	return (
		<>
			<div className="border-b border-white/10 bg-[linear-gradient(160deg,rgba(10,18,28,0.4)_0%,rgba(16,31,48,0.4)_100%)] px-6 py-8 backdrop-blur-sm">
				<h1 className="text-4xl font-bold text-[#f5efe2]">Dashboard</h1>
				<p className="mt-2 text-[#a9b7c8]">
					Track your projects and their progress in real-time
				</p>
			</div>

			<div className="animate-fade-up space-y-6 px-6 py-8">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{[
						{ label: "Total Projects", value: total, color: "#5dade2" },
						{ label: "Active", value: active, color: "#d8bc8f" },
						{ label: "Completed", value: completed, color: "#69c58a" },
						{ label: "Avg. Progress", value: `${avgProgress}%`, color: "#a8875e" },
					].map((stat) => (
						<div
							key={stat.label}
							className="rounded-2xl border border-white/10 bg-[rgba(13,38,58,0.3)] p-5 backdrop-blur-sm"
						>
							<p className="text-sm text-[#7a8894]">{stat.label}</p>
							<div className="mt-2 flex items-end gap-2">
								<span
									className="text-3xl font-bold"
									style={{ color: stat.color }}
								>
									{stat.value}
								</span>
							</div>
						</div>
					))}
				</div>

				<div>
					<div className="mb-4 flex items-center justify-between">
						<h2 className="text-2xl font-bold text-[#f5efe2]">Your Projects</h2>
						<button
							onClick={() => navigate("/client/projects")}
							className="rounded-lg border border-[#d8bc8f]/30 px-4 py-2 text-sm font-medium text-[#d8bc8f] transition-all hover:bg-[#d8bc8f]/10"
						>
							View All
						</button>
					</div>

					{loading ? (
						<div className="rounded-2xl border border-white/10 bg-[rgba(13,38,58,0.3)] p-8 text-center backdrop-blur-sm">
							<p className="text-[#a9b7c8]">Loading projects…</p>
						</div>
					) : projects.length === 0 ? (
						<div className="rounded-2xl border border-white/10 bg-[rgba(13,38,58,0.3)] p-8 text-center backdrop-blur-sm">
							<p className="text-[#a9b7c8]">No projects yet</p>
						</div>
					) : (
						<div className="grid gap-4 sm:grid-cols-2">
							{projects.map((p) => (
								<div
									key={p.id}
									onClick={() => navigate(`/client/projects/${p.id}`)}
									className={cn(
										"cursor-pointer rounded-2xl border border-white/10 bg-[rgba(13,38,58,0.3)] p-5 transition-all hover:bg-[rgba(13,38,58,0.5)] hover:shadow-lg backdrop-blur-sm",
										statusAccent[p.status],
									)}
								>
									<div className="mb-3 flex items-start justify-between">
										<div>
											<h3 className="font-semibold text-[#f5efe2]">{p.name}</h3>
											<p className="mt-1 text-sm text-[#a9b7c8]">
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
									{renderProgressBar(p.overall_progress, p.status)}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
