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
			<div className="topbar">
				<div className="tb-title">Recent Updates</div>
			</div>

			<div className="content fade-up">
				{/* Filters */}
				<div className="card" style={{ marginBottom: 16 }}>
					<div className="sh" style={{ marginBottom: 12 }}>
						<div className="st">Filter</div>
					</div>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "auto 1fr",
							gap: "16px 24px",
						}}
					>
						<div>
							<label className="ml2">Category</label>
							<select
								className="ms2"
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
							<label className="ml2">Search Project</label>
							<input
								className="mi2"
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
					<div className="empty">
						<div className="empty-ic">⏳</div>
						<div className="empty-tx">Loading updates…</div>
					</div>
				) : filteredUpdates.length === 0 ? (
					<div className="empty">
						<div className="empty-ic">📝</div>
						<div className="empty-tx">No updates found</div>
					</div>
				) : (
					<div className="feed">
						{filteredUpdates.map((u) => (
							<div
								key={u.id}
								className={`fi ${u.progress_percentage >= 100 ? "fi-green" : "fi-gold"}`}
								onClick={() =>
									navigate(
										`/builder/projects/${u.project_id}`,
									)
								}
								style={{ cursor: "pointer" }}
							>
								<div className="fi-ic">
									{CAT_IC[u.category]}
								</div>
								<div style={{ flex: 1 }}>
									<div className="fi-ti">{u.title}</div>
									{u.description && (
										<div className="fi-de">
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
										<span
											className="badge b-pend"
											style={{ fontSize: ".58rem" }}
										>
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
									<div className="fi-tm">
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
