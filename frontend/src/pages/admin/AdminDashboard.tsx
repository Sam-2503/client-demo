import { useState, useEffect } from "react";
import { Card, ProgressBar, useToast } from "../../components";
import api from "../../api/client";
import type { Project } from "../../types";
import "./styles/AdminDashboard.css";

interface DashboardStats {
	totalProjects: number;
	activeProjects: number;
	completedProjects: number;
	totalBuilders: number;
	totalClients: number;
	pendingRequests: number;
}

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
			<div className="admin-dashboard-page">
				<div className="admin-dashboard-loading">
					Loading dashboard...
				</div>
			</div>
		);
	}

	return (
		<div className="admin-dashboard-page">
			{/* Header */}
			<div className="admin-dashboard-header">
				<div className="admin-dashboard-title-section">
					<h1 className="admin-dashboard-title">Admin Dashboard</h1>
					<p className="admin-dashboard-subtitle">
						System overview and management
					</p>
				</div>
			</div>

			{/* Key Stats */}
			<div className="admin-stats-grid">
				<Card className="admin-stat-card">
					<div className="admin-stat-label">Total Projects</div>
					<div className="admin-stat-value">
						{stats.totalProjects}
					</div>
					<div className="admin-stat-bar">
						<div
							className="admin-stat-bar-fill"
							style={{
								width: `${Math.min(100, (stats.totalProjects / 50) * 100)}%`,
							}}
						/>
					</div>
				</Card>

				<Card className="admin-stat-card">
					<div className="admin-stat-label">Active Projects</div>
					<div className="admin-stat-value">
						{stats.activeProjects}
					</div>
					<div className="admin-stat-meta">
						{(
							(stats.activeProjects /
								(stats.totalProjects || 1)) *
							100
						).toFixed(0)}
						% of total
					</div>
				</Card>

				<Card className="admin-stat-card">
					<div className="admin-stat-label">Completed</div>
					<div className="admin-stat-value">
						{stats.completedProjects}
					</div>
					<div className="admin-stat-meta">✓</div>
				</Card>

				<Card className="admin-stat-card admin-stat-card-alert">
					<div className="admin-stat-label">Pending Approvals</div>
					<div className="admin-stat-value">
						{stats.pendingRequests}
					</div>
					<div className="admin-stat-action">
						<a href="/admin/approvals">Review →</a>
					</div>
				</Card>

				<Card className="admin-stat-card">
					<div className="admin-stat-label">Builders</div>
					<div className="admin-stat-value">
						{stats.totalBuilders}
					</div>
					<div className="admin-stat-meta">Approved</div>
				</Card>

				<Card className="admin-stat-card">
					<div className="admin-stat-label">Clients</div>
					<div className="admin-stat-value">{stats.totalClients}</div>
					<div className="admin-stat-meta">Registered</div>
				</Card>
			</div>

			{/* Recent Projects */}
			<Card className="admin-dashboard-projects-card">
				<div className="admin-projects-header">
					<h2 className="admin-projects-title">Recent Projects</h2>
					<a href="/admin/projects" className="admin-projects-link">
						View All →
					</a>
				</div>

				{recentProjects.length === 0 ? (
					<div className="admin-projects-empty">No projects yet</div>
				) : (
					<div className="admin-projects-list">
						{recentProjects.map((project) => (
							<div
								key={project.id}
								className="admin-project-item"
							>
								<div className="admin-project-info">
									<h3 className="admin-project-name">
										{project.name}
									</h3>
									<p className="admin-project-location">
										{project.location || "No location"}
									</p>
								</div>
								<div className="admin-project-progress">
									<ProgressBar
										value={project.overall_progress}
										max={100}
										label={`${project.overall_progress}%`}
									/>
								</div>
								<div className="admin-project-status">
									<span
										className={`admin-project-status-badge admin-status-${project.status}`}
									>
										{project.status.replace("_", " ")}
									</span>
								</div>
							</div>
						))}
					</div>
				)}
			</Card>
		</div>
	);
}
