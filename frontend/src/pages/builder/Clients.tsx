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
			<div className="flex items-center justify-between border-b border-brand-border-light bg-brand-card px-6 py-4">
				<div className="font-serif text-2xl font-semibold text-white">
					Clients
				</div>
				<div className="text-xs text-brand-muted">
					{clients.length} client{clients.length !== 1 ? "s" : ""}
				</div>
			</div>

			<div className="animate-fade-up space-y-4 px-6 py-6">
				{/* Search */}
				<div className="rounded-md border border-brand-border-light bg-brand-card p-4">
					<div className="flex items-center gap-3">
						<span className="text-xs text-brand-muted">🔍</span>
						<input
							className="w-full border-b-2 border-brand-border bg-brand-panel px-3 py-2 text-sm text-white outline-none transition focus:border-brand-gold"
							placeholder="Search by name or email…"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
				</div>

				{/* Clients list */}
				{loading ? (
					<div className="rounded-md border border-brand-border-light bg-brand-card p-10 text-center">
						<div className="mb-2 text-3xl">⏳</div>
						<div className="text-sm text-brand-muted-light">
							Loading clients…
						</div>
					</div>
				) : filteredClients.length === 0 ? (
					<div className="rounded-md border border-brand-border-light bg-brand-card p-10 text-center">
						<div className="mb-2 text-3xl">👥</div>
						<div className="text-sm text-brand-muted-light">
							{searchTerm ? "No clients found" : "No clients yet"}
						</div>
					</div>
				) : (
					<div className="overflow-hidden rounded-md border border-brand-border-light bg-brand-card">
						<div style={{ overflowX: "auto" }}>
							<table className="min-w-full text-left text-sm">
								<thead>
									<tr className="border-b border-brand-border bg-brand-panel text-xs uppercase tracking-[0.08em] text-brand-muted-light">
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
												className="cursor-pointer border-b border-brand-border/50 text-brand-muted-light transition hover:bg-brand-panel"
											>
												<td className="px-3 py-2 font-medium text-white">
													{client.full_name}
												</td>
												<td className="px-3 py-2 text-xs">
													{client.email}
												</td>
												<td>
													<span className="inline-block rounded bg-brand-panel-light px-2 py-1 text-[0.7rem] font-medium text-brand-gold">
														{projectCount} project
														{projectCount !== 1
															? "s"
															: ""}
													</span>
												</td>
												<td>
													<span
														className={`rounded px-2 py-0.5 text-[0.58rem] font-semibold uppercase ${client.is_active ? "bg-[#27ae60] text-brand-black" : "bg-brand-muted text-brand-black"}`}
													>
														{client.is_active
															? "Active"
															: "Inactive"}
													</span>
												</td>
												<td className="px-3 py-2 text-xs text-brand-muted">
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
					<div className="rounded-md border border-brand-border-light border-l-4 border-l-brand-gold bg-brand-card p-4">
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
									<div className="mb-4 flex items-start justify-between">
										<div>
											<div className="mb-2 text-base font-semibold text-white">
												{client.full_name}
											</div>
											<div className="text-xs text-brand-muted">
												{client.email}
											</div>
										</div>
										<button
											className="rounded border border-brand-border px-3 py-2 text-xs font-medium text-brand-muted-light transition hover:border-brand-gold hover:text-brand-gold"
											onClick={() =>
												setSelectedClient(null)
											}
										>
											Close
										</button>
									</div>

									{/* Client stats */}
									<div className="mb-4 grid grid-cols-3 gap-3 border-b border-brand-border pb-4">
										<div className="text-center">
											<div className="font-serif text-2xl text-brand-gold">
												{clientProjects.length}
											</div>
											<div className="text-[0.7rem] text-brand-muted">
												Total Projects
											</div>
										</div>
										<div className="text-center">
											<div className="font-serif text-2xl text-[#27ae60]">
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
										<div className="text-center">
											<div className="font-serif text-2xl text-[#4caf50]">
												{completedProjects}
											</div>
											<div className="text-[0.7rem] text-brand-muted">
												Completed
											</div>
										</div>
									</div>

									{/* Client projects */}
									{clientProjects.length > 0 ? (
										<>
											<div className="mb-2 text-[0.7rem] uppercase tracking-[0.08em] text-brand-muted">
												Projects
											</div>
											<div className="grid gap-2">
												{clientProjects.map((p) => (
													<div
														key={p.id}
														onClick={() =>
															navigate(
																`/builder/projects/${p.id}`,
															)
														}
														className="flex items-center justify-between rounded bg-brand-panel-light p-3 transition hover:bg-brand-panel"
													>
														<div>
															<div className="mb-1 text-[0.78rem] font-medium text-white">
																{p.name}
															</div>
															<div className="text-[0.7rem] text-brand-muted">
																{p.location ||
																	"Location TBD"}
															</div>
														</div>
														<span
															className={`rounded px-2 py-1 text-[0.68rem] font-semibold uppercase ${p.status === "completed" ? "bg-[#27ae60] text-brand-black" : p.status === "in_progress" ? "bg-brand-gold text-brand-black" : "bg-brand-muted text-brand-black"}`}
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
										<div className="text-[0.78rem] text-brand-muted">
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
