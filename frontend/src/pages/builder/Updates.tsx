import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";
import { useToast } from "../../components/Toast";
import type { Update, WorkCategory } from "../../types";

const CAT_IC: Record<WorkCategory, string> = {
	foundation: "🏗",
	framing: "🪵",
	roofing: "🏠",
	plumbing: "💧",
	electrical: "⚡",
	painting: "🎨",
	flooring: "🪨",
	windows_doors: "🚪",
	finishing: "✨",
	other: "📋",
};

const CATS: { v: WorkCategory; l: string }[] = [
	{ v: "foundation", l: "🏗 Foundation" },
	{ v: "framing", l: "🪵 Framing" },
	{ v: "roofing", l: "🏠 Roofing" },
	{ v: "plumbing", l: "💧 Plumbing" },
	{ v: "electrical", l: "⚡ Electrical" },
	{ v: "painting", l: "🎨 Painting" },
	{ v: "flooring", l: "🪨 Flooring" },
	{ v: "windows_doors", l: "🚪 Windows & Doors" },
	{ v: "finishing", l: "✨ Finishing" },
	{ v: "other", l: "📋 Other" },
];

export default function BuilderUpdates() {
	const [updates, setUpdates] = useState<Update[]>([]);
	const [filteredUpdates, setFilteredUpdates] = useState<Update[]>([]);
	const [loading, setLoading] = useState(true);
	const [categoryFilter, setCategoryFilter] = useState<WorkCategory | "all">(
		"all",
	);
	const [projectFilter, setProjectFilter] = useState("");
	const navigate = useNavigate();
	const toast = useToast();

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			try {
				const response = await api.get<Update[]>("/api/updates");
				setUpdates(response.data);
			} catch {
				toast("Failed to load updates");
			} finally {
				setLoading(false);
			}
		};

		load();
	}, []);

	useEffect(() => {
		let filtered = updates;

		if (categoryFilter !== "all") {
			filtered = filtered.filter((u) => u.category === categoryFilter);
		}

		if (projectFilter) {
			filtered = filtered.filter((u) =>
				u.project_id
					.toLowerCase()
					.includes(projectFilter.toLowerCase()),
			);
		}

		filtered.sort(
			(a, b) =>
				new Date(b.created_at).getTime() -
				new Date(a.created_at).getTime(),
		);

		setFilteredUpdates(filtered);
	}, [updates, categoryFilter, projectFilter]);

	return (
		<>
			{/* Topbar */}
			<div className="flex items-center justify-between border-b border-brand-border-light bg-brand-card px-6 py-4">
				<div className="font-serif text-2xl font-semibold text-white">
					Recent Updates
				</div>
			</div>

			<div className="animate-fade-up space-y-4 px-6 py-6">
				{/* Filters */}
				<div className="rounded-md border border-brand-border-light bg-brand-card p-4">
					<div className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-brand-muted-light">
						Filter
					</div>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-[220px_1fr]">
						<div>
							<label className="mb-1 block text-xs uppercase tracking-[0.08em] text-brand-muted">
								Category
							</label>
							<select
								className="w-full border-b-2 border-brand-border bg-brand-panel px-3 py-2 text-sm text-white outline-none transition focus:border-brand-gold"
								value={categoryFilter}
								onChange={(e) =>
									setCategoryFilter(
										e.target.value as WorkCategory | "all",
									)
								}
							>
								<option value="all">All Categories</option>
								{CATS.map((c) => (
									<option key={c.v} value={c.v}>
										{c.l}
									</option>
								))}
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

				{/* Updates feed */}
				{loading ? (
					<div className="rounded-md border border-brand-border-light bg-brand-card p-10 text-center">
						<div className="mb-2 text-3xl">⏳</div>
						<div className="text-sm text-brand-muted-light">
							Loading updates…
						</div>
					</div>
				) : filteredUpdates.length === 0 ? (
					<div className="rounded-md border border-brand-border-light bg-brand-card p-10 text-center">
						<div className="mb-2 text-3xl">📝</div>
						<div className="text-sm text-brand-muted-light">
							No updates found
						</div>
					</div>
				) : (
					<div className="space-y-3">
						{filteredUpdates.map((u) => (
							<div
								key={u.id}
								className={`flex cursor-pointer gap-3 rounded-md border p-4 ${u.progress_percentage >= 100 ? "border-[#27ae60] bg-[rgba(39,174,96,0.08)]" : "border-brand-gold bg-[rgba(200,151,31,0.08)]"}`}
								onClick={() =>
									navigate(
										`/builder/projects/${u.project_id}`,
									)
								}
							>
								<div className="grid h-9 w-9 place-items-center rounded bg-brand-panel text-base">
									{CAT_IC[u.category]}
								</div>
								<div style={{ flex: 1 }}>
									<div className="text-sm font-medium text-white">
										{u.title}
									</div>
									{u.description && (
										<div className="mt-1 text-[0.78rem] text-brand-muted-light">
											{u.description}
										</div>
									)}
									<div
										style={{
											display: "flex",
											alignItems: "center",
											gap: 8,
											marginTop: 6,
											flexWrap: "wrap",
										}}
									>
										<span className="rounded bg-brand-panel-light px-2 py-0.5 text-[0.58rem] uppercase text-brand-muted-light">
											{u.category.replace("_", " ")}
										</span>
										<span
											style={{
												fontSize: ".7rem",
												color: "var(--gold)",
											}}
										>
											{u.progress_percentage}% complete
										</span>
										{u.photo_urls.length > 0 && (
											<span
												style={{
													fontSize: ".7rem",
													color: "var(--blue)",
												}}
											>
												📸 {u.photo_urls.length} photo
												{u.photo_urls.length > 1
													? "s"
													: ""}
											</span>
										)}
									</div>
									<div className="mt-2 text-[0.68rem] text-brand-muted">
										Project: {u.project_id}
										{" · "}
										{new Date(u.created_at).toLocaleString(
											"en-IN",
											{
												day: "2-digit",
												month: "short",
												year: "numeric",
												hour: "2-digit",
												minute: "2-digit",
											},
										)}
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
