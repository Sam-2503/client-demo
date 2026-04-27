import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";
import { useToast } from "../../components/Toast";
import type { User, Project } from "../../types";

export default function BuilderClients() {
	const [clients, setClients] = useState<User[]>([]);
	const [projects, setProjects] = useState<Project[]>([]);
	const [filteredClients, setFilteredClients] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedClient, setSelectedClient] = useState<string | null>(null);
	const navigate = useNavigate();
	const toast = useToast();

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			try {
				const [clientsRes, projectsRes] = await Promise.all([
					api.get<User[]>("/api/users/clients"),
					api.get<Project[]>("/api/projects"),
				]);
				setClients(clientsRes.data);
				setProjects(projectsRes.data);
			} catch {
				toast("Failed to load clients");
			} finally {
				setLoading(false);
			}
		};

		load();
	}, []);

	useEffect(() => {
		let filtered = clients;

		if (searchTerm) {
			const term = searchTerm.toLowerCase();
			filtered = filtered.filter(
				(c) =>
					c.full_name.toLowerCase().includes(term) ||
					c.email.toLowerCase().includes(term),
			);
		}

		setFilteredClients(filtered);
	}, [clients, searchTerm]);

	const getClientProjectCount = (clientId: string) => {
		return projects.filter((p) => p.client_id === clientId).length;
	};

	const getClientProjects = (clientId: string) => {
		return projects.filter((p) => p.client_id === clientId);
	};

	return (
		<>
			{/* Topbar */}
			<div className="topbar">
				<div className="tb-title">Clients</div>
				<div className="tb-right">
					<span style={{ fontSize: ".78rem", color: "var(--gray)" }}>
						{clients.length} client{clients.length !== 1 ? "s" : ""}
					</span>
				</div>
			</div>

			<div className="content fade-up">
				{/* Search */}
				<div className="card" style={{ marginBottom: 16 }}>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: 12,
						}}
					>
						<span
							style={{ fontSize: ".78rem", color: "var(--gray)" }}
						>
							🔍
						</span>
						<input
							className="mi2"
							placeholder="Search by name or email…"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							style={{ flex: 1 }}
						/>
					</div>
				</div>

				{/* Clients list */}
				{loading ? (
					<div className="empty">
						<div className="empty-ic">⏳</div>
						<div className="empty-tx">Loading clients…</div>
					</div>
				) : filteredClients.length === 0 ? (
					<div className="empty">
						<div className="empty-ic">👥</div>
						<div className="empty-tx">
							{searchTerm ? "No clients found" : "No clients yet"}
						</div>
					</div>
				) : (
					<div className="card" style={{ padding: 0 }}>
						<div style={{ overflowX: "auto" }}>
							<table className="dt">
								<thead>
									<tr>
										<th>Client Name</th>
										<th>Email</th>
										<th>Projects</th>
										<th>Status</th>
										<th>Joined</th>
									</tr>
								</thead>
								<tbody>
									{filteredClients.map((client) => {
										const projectCount =
											getClientProjectCount(client.id);
										return (
											<tr
												key={client.id}
												onClick={() =>
													setSelectedClient(client.id)
												}
												style={{ cursor: "pointer" }}
											>
												<td style={{ fontWeight: 500 }}>
													{client.full_name}
												</td>
												<td
													style={{
														fontSize: ".75rem",
													}}
												>
													{client.email}
												</td>
												<td>
													<span
														style={{
															display:
																"inline-block",
															padding: "4px 8px",
															background:
																"var(--panel-light)",
															borderRadius:
																"var(--radius-md)",
															fontSize: ".7rem",
															fontWeight: 500,
															color: "var(--gold)",
														}}
													>
														{projectCount} project
														{projectCount !== 1
															? "s"
															: ""}
													</span>
												</td>
												<td>
													<span
														className="badge"
														style={{
															background:
																client.is_active
																	? "var(--green)"
																	: "var(--gray)",
															color: "var(--black)",
															fontSize: ".58rem",
														}}
													>
														{client.is_active
															? "Active"
															: "Inactive"}
													</span>
												</td>
												<td
													style={{
														fontSize: ".7rem",
														color: "var(--gray)",
													}}
												>
													{new Date(
														client.created_at,
													).toLocaleDateString(
														"en-IN",
														{
															day: "2-digit",
															month: "short",
															year: "numeric",
														},
													)}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				)}

				{/* Client details panel */}
				{selectedClient && (
					<div
						className="card"
						style={{
							marginTop: 20,
							borderLeft: "3px solid var(--gold)",
						}}
					>
						{(() => {
							const client = clients.find(
								(c) => c.id === selectedClient,
							);
							if (!client) return null;

							const clientProjects = getClientProjects(client.id);
							const activeProjects = clientProjects.filter(
								(p) => p.status === "in_progress",
							).length;
							const completedProjects = clientProjects.filter(
								(p) => p.status === "completed",
							).length;

							return (
								<>
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "flex-start",
											marginBottom: 16,
										}}
									>
										<div>
											<div
												className="st"
												style={{ marginBottom: 8 }}
											>
												{client.full_name}
											</div>
											<div
												style={{
													fontSize: ".78rem",
													color: "var(--gray)",
												}}
											>
												{client.email}
											</div>
										</div>
										<button
											className="btn-o btn-sm"
											onClick={() =>
												setSelectedClient(null)
											}
										>
											Close
										</button>
									</div>

									{/* Client stats */}
									<div
										style={{
											display: "grid",
											gridTemplateColumns:
												"repeat(3, 1fr)",
											gap: 12,
											marginBottom: 16,
											borderBottom:
												"1px solid var(--border)",
											paddingBottom: 16,
										}}
									>
										<div style={{ textAlign: "center" }}>
											<div
												style={{
													fontSize: "1.3rem",
													fontFamily:
														"'Cormorant Garamond', serif",
													color: "var(--gold)",
												}}
											>
												{clientProjects.length}
											</div>
											<div
												style={{
													fontSize: ".7rem",
													color: "var(--gray)",
												}}
											>
												Total Projects
											</div>
										</div>
										<div style={{ textAlign: "center" }}>
											<div
												style={{
													fontSize: "1.3rem",
													fontFamily:
														"'Cormorant Garamond', serif",
													color: "var(--green)",
												}}
											>
												{activeProjects}
											</div>
											<div
												style={{
													fontSize: ".7rem",
													color: "var(--gray)",
												}}
											>
												Active
											</div>
										</div>
										<div style={{ textAlign: "center" }}>
											<div
												style={{
													fontSize: "1.3rem",
													fontFamily:
														"'Cormorant Garamond', serif",
													color: "var(--green)",
												}}
											>
												{completedProjects}
											</div>
											<div
												style={{
													fontSize: ".7rem",
													color: "var(--gray)",
												}}
											>
												Completed
											</div>
										</div>
									</div>

									{/* Client projects */}
									{clientProjects.length > 0 ? (
										<>
											<div
												style={{
													fontSize: ".7rem",
													letterSpacing: ".08em",
													textTransform: "uppercase",
													color: "var(--gray)",
													marginBottom: 8,
												}}
											>
												Projects
											</div>
											<div
												style={{
													display: "grid",
													gap: 8,
												}}
											>
												{clientProjects.map((p) => (
													<div
														key={p.id}
														onClick={() =>
															navigate(
																`/builder/projects/${p.id}`,
															)
														}
														style={{
															padding: "12px",
															background:
																"var(--panel-light)",
															borderRadius:
																"var(--radius-md)",
															cursor: "pointer",
															transition:
																"var(--transition-base)",
															display: "flex",
															justifyContent:
																"space-between",
															alignItems:
																"center",
														}}
													>
														<div>
															<div
																style={{
																	fontSize:
																		".78rem",
																	fontWeight: 500,
																	marginBottom: 4,
																}}
															>
																{p.name}
															</div>
															<div
																style={{
																	fontSize:
																		".7rem",
																	color: "var(--gray)",
																}}
															>
																{p.location ||
																	"Location TBD"}
															</div>
														</div>
														<span
															style={{
																fontSize:
																	".68rem",
																background:
																	p.status ===
																	"completed"
																		? "var(--green)"
																		: p.status ===
																			  "in_progress"
																			? "var(--gold)"
																			: "var(--gray)",
																color: "var(--black)",
																padding:
																	"4px 8px",
																borderRadius:
																	"var(--radius-md)",
															}}
														>
															{p.status.replace(
																"_",
																" ",
															)}
														</span>
													</div>
												))}
											</div>
										</>
									) : (
										<div
											style={{
												fontSize: ".78rem",
												color: "var(--gray)",
											}}
										>
											No projects assigned
										</div>
									)}
								</>
							);
						})()}
					</div>
				)}
			</div>
		</>
	);
}
