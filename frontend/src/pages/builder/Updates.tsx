import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";
import { useToast } from "../../components/Toast";
import type { Update, WorkCategory } from "../../types";

const CAT_IC: Record<WorkCategory, string> = {
	foundation: "",
	framing: "",
	roofing: "",
	plumbing: "",
	electrical: "",
	painting: "",
	flooring: "",
	windows_doors: "",
	finishing: "",
	other: "",
};

const CATS: { v: WorkCategory; l: string }[] = [
	{ v: "foundation", l: "Foundation" },
	{ v: "framing", l: "Framing" },
	{ v: "roofing", l: "Roofing" },
	{ v: "plumbing", l: "Plumbing" },
	{ v: "electrical", l: "Electrical" },
	{ v: "painting", l: "Painting" },
	{ v: "flooring", l: "Flooring" },
	{ v: "windows_doors", l: "Windows & Doors" },
	{ v: "finishing", l: "Finishing" },
	{ v: "other", l: "Other" },
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
			<div className="border-b border-white/10 bg-[linear-gradient(160deg,rgba(10,18,28,0.4)_0%,rgba(16,31,48,0.4)_100%)] px-6 py-6 backdrop-blur-sm">
				<div className="font-serif text-3xl font-semibold text-[#f5efe2]">
					Recent Updates
				</div>
			</div>

			<div className="animate-fade-up space-y-6 px-6 py-8">
				{/* Filters */}
				<div className="rounded-2xl border border-white/10 bg-[rgba(13,38,58,0.3)] p-5 backdrop-blur-sm">
					<div className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#a9b7c8]">
						Filter
					</div>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-[220px_1fr]">
						<div>
							<label className="mb-2 block text-xs uppercase tracking-[0.08em] text-[#a9b7c8]">
								Category
							</label>
							<select
								className="w-full border-b-2 border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-[#d8bc8f]"
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
							<label className="mb-2 block text-xs uppercase tracking-[0.08em] text-[#a9b7c8]">
								Search Project
							</label>
							<input
								className="w-full border-b-2 border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-[#d8bc8f]"
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
					<div className="rounded-2xl border border-white/10 bg-[rgba(13,38,58,0.3)] p-12 text-center backdrop-blur-sm">
						<div className="text-sm text-[#a9b7c8]">
							Loading updates…
						</div>
					</div>
				) : filteredUpdates.length === 0 ? (
					<div className="rounded-2xl border border-white/10 bg-[rgba(13,38,58,0.3)] p-12 text-center backdrop-blur-sm">
						<div className="text-sm text-[#a9b7c8]">
							No updates found
						</div>
					</div>
				) : (
					<div className="space-y-3">
						{filteredUpdates.map((u) => (
							<div
								key={u.id}
								className={`flex cursor-pointer gap-4 rounded-2xl border p-4 backdrop-blur-sm transition ${
									u.progress_percentage >= 100
										? "border-[#69c58a]/30 bg-[rgba(105,197,138,0.08)]"
										: "border-[#d8bc8f]/30 bg-[rgba(216,188,143,0.08)]"
								}`}
								onClick={() =>
									navigate(
										`/builder/projects/${u.project_id}`,
									)
								}
							>
								<div className="flex-1">
									<div className="text-sm font-medium text-white">
										{u.title}
									</div>
									{u.description && (
										<div className="mt-1 text-[0.78rem] text-[#a9b7c8]">
											{u.description}
										</div>
									)}
									<div className="mt-3 flex flex-wrap items-center gap-2">
										<span className="rounded-full bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase text-[#a9b7c8]">
											{u.category.replace("_", " ")}
										</span>
										<span className="text-[0.7rem] font-medium text-[#d8bc8f]">
											{u.progress_percentage}% complete
										</span>
										{u.photo_urls.length > 0 && (
											<span className="text-[0.7rem] font-medium text-[#5dade2]">
												{u.photo_urls.length} photo
												{u.photo_urls.length > 1
													? "s"
													: ""}
											</span>
										)}
									</div>
									<div className="mt-2 text-[0.68rem] text-[#7a8894]">
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
