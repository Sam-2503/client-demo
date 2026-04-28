import { useState, useEffect } from "react";
import { ProgressBar, useToast } from "../../components";
import api from "../../api/client";
import type { Project } from "../../types";
import { cn } from "../../utils";

interface DashboardStats {
	totalProjects: number;
	activeProjects: number;
	completedProjects: number;
	totalBuilders: number;
	totalClients: number;
	pendingRequests: number;
}

const projectStatusClasses: Record<Project["status"], string> = {
	planning:
		"border-[rgba(127,140,141,0.3)] bg-[rgba(127,140,141,0.15)] text-[#7f8c8d]",
	in_progress:
		"border-[rgba(200,151,31,0.3)] bg-[rgba(200,151,31,0.15)] text-brand-gold",
	on_hold:
		"border-[rgba(230,126,34,0.3)] bg-[rgba(230,126,34,0.15)] text-[#e67e22]",
	completed:
		"border-[rgba(39,174,96,0.3)] bg-[rgba(39,174,96,0.15)] text-[#27ae60]",
};

const statCardClass =
	"relative overflow-hidden border-brand-border before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-gradient-to-r before:from-transparent before:via-brand-gold before:to-transparent before:content-['']";

export default function AdminDashboard() {
	const [stats, setStats] = useState<DashboardStats>({
		totalProjects: 0,
		activeProjects: 0,
		completedProjects: 0,
		totalBuilders: 0,
		totalClients: 0,
		pendingRequests: 0,
	});
	const [recentProjects, setRecentProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const toast = useToast();

	const loadDashboardData = async () => {
		setLoading(true);
		try {
			const [projectsRes, builderRes, clientRes, requestsRes] =
				await Promise.all([
					api
						.get<Project[]>("/api/projects/")
						.catch(() => ({ data: [] })),
					api
						.get<{ count: number }>("/api/users/builders/count")
						.catch(() => ({ data: { count: 0 } })),
					api
						.get<{ count: number }>("/api/users/clients/count")
						.catch(() => ({ data: { count: 0 } })),
					api
						.get<{
							count: number;
						}>("/api/admin/requests/pending/count")
						.catch(() => ({ data: { count: 0 } })),
				]);

			const projects = projectsRes.data;
			const activeProjects = projects.filter(
				(p) => p.status === "in_progress",
			).length;
			const completedProjects = projects.filter(
				(p) => p.status === "completed",
			).length;

			setStats({
				totalProjects: projects.length,
				activeProjects,
				completedProjects,
				totalBuilders: builderRes.data.count,
				totalClients: clientRes.data.count,
				pendingRequests: requestsRes.data.count,
			});

			setRecentProjects(projects.slice(0, 5));
		} catch {
			toast("Failed to load dashboard data");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadDashboardData();
	}, []);

	if (loading) {
		return (
			<div className="flex min-h-[240px] flex-col gap-6 p-6 max-md:p-4">
				<div className="flex min-h-[240px] items-center justify-center rounded-lg border border-brand-border bg-brand-card text-sm text-brand-muted">
					Loading dashboard...
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6 p-6 max-md:p-4">
			<div className="mb-2 flex flex-col gap-2">
				<h1 className="font-serif text-[1.75rem] font-semibold text-white max-md:text-2xl">
					Admin Dashboard
				</h1>
				<p className="text-sm text-brand-muted">
					System overview and management
				</p>
			</div>

			<div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))] max-lg:[grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] max-md:grid-cols-1">
				<div
					className={cn(
						"flex flex-col gap-3 rounded-lg border bg-brand-card p-4",
						statCardClass,
					)}
				>
					<div className="text-xs font-semibold uppercase tracking-[0.05em] text-brand-muted">
						Total Projects
					</div>
					<div className="font-serif text-[1.75rem] font-bold text-brand-gold">
						{stats.totalProjects}
					</div>
					<div className="h-1 overflow-hidden rounded-sm bg-brand-panel">
						<div
							className="h-full bg-brand-gold transition-[width] duration-500 ease-out"
							style={{
								width: `${Math.min(100, (stats.totalProjects / 50) * 100)}%`,
							}}
						/>
					</div>
				</div>

				<div
					className={cn(
						"flex flex-col gap-3 rounded-lg border bg-brand-card p-4",
						statCardClass,
					)}
				>
					<div className="text-xs font-semibold uppercase tracking-[0.05em] text-brand-muted">
						Active Projects
					</div>
					<div className="font-serif text-[1.75rem] font-bold text-brand-gold">
						{stats.activeProjects}
					</div>
					<div className="text-sm text-brand-muted">
						{(
							(stats.activeProjects /
								(stats.totalProjects || 1)) *
							100
						).toFixed(0)}
						% of total
					</div>
				</div>

				<div
					className={cn(
						"flex flex-col gap-3 rounded-lg border bg-brand-card p-4",
						statCardClass,
					)}
				>
					<div className="text-xs font-semibold uppercase tracking-[0.05em] text-brand-muted">
						Completed
					</div>
					<div className="font-serif text-[1.75rem] font-bold text-brand-gold">
						{stats.completedProjects}
					</div>
					<div className="text-sm text-brand-muted">✓</div>
				</div>

				<div
					className={cn(
						"flex flex-col gap-3 rounded-lg border border-brand-gold bg-brand-card p-4",
						statCardClass,
					)}
				>
					<div className="text-xs font-semibold uppercase tracking-[0.05em] text-brand-muted">
						Pending Approvals
					</div>
					<div className="font-serif text-[1.75rem] font-bold text-brand-gold">
						{stats.pendingRequests}
					</div>
					<div>
						<a
							href="/admin/approvals"
							className="text-sm font-semibold text-brand-gold transition-colors duration-300 hover:text-brand-gold-light"
						>
							Review →
						</a>
					</div>
				</div>

				<div
					className={cn(
						"flex flex-col gap-3 rounded-lg border bg-brand-card p-4",
						statCardClass,
					)}
				>
					<div className="text-xs font-semibold uppercase tracking-[0.05em] text-brand-muted">
						Builders
					</div>
					<div className="font-serif text-[1.75rem] font-bold text-brand-gold">
						{stats.totalBuilders}
					</div>
					<div className="text-sm text-brand-muted">Approved</div>
				</div>

				<div
					className={cn(
						"flex flex-col gap-3 rounded-lg border bg-brand-card p-4",
						statCardClass,
					)}
				>
					<div className="text-xs font-semibold uppercase tracking-[0.05em] text-brand-muted">
						Clients
					</div>
					<div className="font-serif text-[1.75rem] font-bold text-brand-gold">
						{stats.totalClients}
					</div>
					<div className="text-sm text-brand-muted">Registered</div>
				</div>
			</div>

			<div className="rounded-lg border border-brand-border bg-brand-card p-4">
				<div className="mb-4 flex items-center justify-between gap-4 border-b border-brand-border pb-4 max-md:flex-col max-md:items-start">
					<h2 className="font-serif text-xl font-semibold text-white">
						Recent Projects
					</h2>
					<a
						href="/admin/projects"
						className="text-sm font-semibold text-brand-gold transition-colors duration-300 hover:text-brand-gold-light"
					>
						View All →
					</a>
				</div>

				{recentProjects.length === 0 ? (
					<div className="flex min-h-[160px] items-center justify-center rounded-md border border-dashed border-brand-border bg-brand-panel text-sm text-brand-muted">
						No projects yet
					</div>
				) : (
					<div className="flex flex-col gap-4">
						{recentProjects.map((project) => (
							<div
								key={project.id}
								className="grid grid-cols-1 gap-4 rounded-md border border-brand-border bg-brand-panel p-4 transition-all duration-300 hover:border-brand-gold hover:bg-[#252525] lg:grid-cols-[minmax(0,1fr)_200px_150px] max-lg:grid-cols-[minmax(0,1fr)_100px] max-md:grid-cols-1"
							>
								<div className="min-w-0">
									<h3 className="mb-1 font-serif text-lg font-semibold text-white">
										{project.name}
									</h3>
									<p className="text-sm text-brand-muted">
										{project.location || "No location"}
									</p>
								</div>
								<div className="flex min-w-0 flex-col gap-2">
									<ProgressBar
										value={project.overall_progress}
										max={100}
										label={`${project.overall_progress}%`}
									/>
								</div>
								<div className="flex justify-end max-lg:hidden">
									<span
										className={cn(
											"inline-flex whitespace-nowrap rounded-sm border px-3 py-2 text-[0.72rem] font-semibold capitalize",
											projectStatusClasses[
												project.status
											],
										)}
									>
										{project.status.replace("_", " ")}
									</span>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
