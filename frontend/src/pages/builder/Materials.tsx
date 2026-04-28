import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";
import { useToast } from "../../components/Toast";
import type { Material, MaterialType } from "../../types";

const MATERIAL_TYPES: MaterialType[] = [
	"lumber",
	"cement",
	"bricks",
	"steel",
	"paint",
	"tiles",
	"plumbing_pipes",
	"electrical_wire",
	"glass",
	"sand",
	"gravel",
	"other",
];

export default function BuilderMaterials() {
	const [materials, setMaterials] = useState<Material[]>([]);
	const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
	const [loading, setLoading] = useState(true);
	const [typeFilter, setTypeFilter] = useState<MaterialType | "all">("all");
	const [projectFilter, setProjectFilter] = useState("");
	const [sortBy, setSortBy] = useState<"cost" | "date" | "qty">("date");
	const navigate = useNavigate();
	const toast = useToast();

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			try {
				const response = await api.get<Material[]>("/api/materials");
				setMaterials(response.data);
			} catch {
				toast("Failed to load materials");
			} finally {
				setLoading(false);
			}
		};

		load();
	}, []);

	useEffect(() => {
		let filtered = materials;

		if (typeFilter !== "all") {
			filtered = filtered.filter((m) => m.material_type === typeFilter);
		}

		if (projectFilter) {
			filtered = filtered.filter((m) =>
				m.project_id
					.toLowerCase()
					.includes(projectFilter.toLowerCase()),
			);
		}

		if (sortBy === "cost") {
			filtered.sort((a, b) => b.total_cost - a.total_cost);
		} else if (sortBy === "date") {
			filtered.sort(
				(a, b) =>
					new Date(b.purchased_at).getTime() -
					new Date(a.purchased_at).getTime(),
			);
		} else if (sortBy === "qty") {
			filtered.sort((a, b) => b.quantity - a.quantity);
		}

		setFilteredMaterials(filtered);
	}, [materials, typeFilter, projectFilter, sortBy]);

	const totalCost = filteredMaterials.reduce(
		(acc, m) => acc + m.total_cost,
		0,
	);

	return (
		<>
			{/* Topbar */}
			<div className="flex items-center justify-between border-b border-brand-border-light bg-brand-card px-6 py-4">
				<div className="font-serif text-2xl font-semibold text-white">
					Materials Inventory
				</div>
				<div className="flex items-center gap-2">
					<span className="text-xs text-brand-muted">
						Total Cost:
					</span>
					<span className="font-serif text-xl text-brand-gold">
						₹{totalCost.toLocaleString()}
					</span>
				</div>
			</div>

			<div className="animate-fade-up space-y-4 px-6 py-6">
				{/* Filters */}
				<div className="rounded-md border border-brand-border-light bg-brand-card p-4">
					<div className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-brand-muted-light">
						Filter & Sort
					</div>
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-[220px_220px_1fr]">
						<div>
							<label className="mb-1 block text-xs uppercase tracking-[0.08em] text-brand-muted">
								Material Type
							</label>
							<select
								className="w-full border-b-2 border-brand-border bg-brand-panel px-3 py-2 text-sm text-white outline-none transition focus:border-brand-gold"
								value={typeFilter}
								onChange={(e) =>
									setTypeFilter(
										e.target.value as MaterialType | "all",
									)
								}
							>
								<option value="all">All Types</option>
								{MATERIAL_TYPES.map((t) => (
									<option key={t} value={t}>
										{t.replace("_", " ")}
									</option>
								))}
							</select>
						</div>

						<div>
							<label className="mb-1 block text-xs uppercase tracking-[0.08em] text-brand-muted">
								Sort By
							</label>
							<select
								className="w-full border-b-2 border-brand-border bg-brand-panel px-3 py-2 text-sm text-white outline-none transition focus:border-brand-gold"
								value={sortBy}
								onChange={(e) =>
									setSortBy(
										e.target.value as
											| "cost"
											| "date"
											| "qty",
									)
								}
							>
								<option value="date">Latest First</option>
								<option value="cost">Highest Cost</option>
								<option value="qty">Highest Quantity</option>
							</select>
						</div>

						<div>
							<label className="mb-1 block text-xs uppercase tracking-[0.08em] text-brand-muted">
								Search Project
							</label>
							<input
								className="w-full border-b-2 border-brand-border bg-brand-panel px-3 py-2 text-sm text-white outline-none transition focus:border-brand-gold"
								placeholder="Search by project ID…"
								value={projectFilter}
								onChange={(e) =>
									setProjectFilter(e.target.value)
								}
							/>
						</div>
					</div>
				</div>

				{/* Materials table */}
				{loading ? (
					<div className="rounded-md border border-brand-border-light bg-brand-card p-10 text-center">
						<div className="mb-2 text-3xl">⏳</div>
						<div className="text-sm text-brand-muted-light">
							Loading materials…
						</div>
					</div>
				) : filteredMaterials.length === 0 ? (
					<div className="rounded-md border border-brand-border-light bg-brand-card p-10 text-center">
						<div className="mb-2 text-3xl">🪵</div>
						<div className="text-sm text-brand-muted-light">
							No materials found
						</div>
					</div>
				) : (
					<div className="overflow-hidden rounded-md border border-brand-border-light bg-brand-card">
						<div style={{ overflowX: "auto" }}>
							<table className="min-w-full text-left text-sm">
								<thead>
									<tr className="border-b border-brand-border bg-brand-panel text-xs uppercase tracking-[0.08em] text-brand-muted-light">
										<th>Material Name</th>
										<th>Type</th>
										<th>Quantity</th>
										<th>Unit Cost</th>
										<th>Total Cost</th>
										<th>Project</th>
										<th>Supplier</th>
										<th>Date</th>
									</tr>
								</thead>
								<tbody>
									{filteredMaterials.map((m) => (
										<tr
											key={m.id}
											onClick={() =>
												navigate(
													`/builder/projects/${m.project_id}`,
												)
											}
											className="cursor-pointer border-b border-brand-border/50 text-brand-muted-light transition hover:bg-brand-panel"
										>
											<td className="px-3 py-2 font-medium text-white">
												{m.name}
											</td>
											<td>
												<span className="rounded bg-brand-panel-light px-2 py-0.5 text-[0.58rem] uppercase text-brand-muted-light">
													{m.material_type.replace(
														"_",
														" ",
													)}
												</span>
											</td>
											<td>
												{m.quantity} {m.unit}
											</td>
											<td>
												₹{m.unit_cost.toLocaleString()}
											</td>
											<td className="px-3 py-2 font-medium text-brand-gold">
												₹{m.total_cost.toLocaleString()}
											</td>
											<td className="px-3 py-2 text-xs text-brand-muted">
												{m.project_id.slice(0, 12)}…
											</td>
											<td>{m.supplier ?? "—"}</td>
											<td className="px-3 py-2 text-xs text-brand-muted">
												{new Date(
													m.purchased_at,
												).toLocaleDateString("en-IN", {
													day: "2-digit",
													month: "short",
													year: "numeric",
												})}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="flex items-center justify-between border-t border-brand-border px-4 py-3">
							<span className="text-xs text-brand-muted">
								{filteredMaterials.length} material
								{filteredMaterials.length !== 1 ? "s" : ""}
							</span>
							<span className="font-serif text-lg text-brand-gold">
								Total: ₹{totalCost.toLocaleString()}
							</span>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
