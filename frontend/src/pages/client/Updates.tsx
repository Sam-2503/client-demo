import { useEffect, useState } from "react";
import api from "../../api/client";
import { useToast } from "../../components/Toast";
import type { Update, WorkCategory } from "../../types";

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

export default function ClientUpdates() {
	const [recentUpdates, setRecentUpdates] = useState<Update[]>([]);
	const [loading, setLoading] = useState(true);
	const [categoryFilter, setCategoryFilter] = useState<WorkCategory | "all">(
		"all",
	);
	const toast = useToast();

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			try {
				const response = await api.get<Update[]>("/api/updates");
				setRecentUpdates(response.data);
			} catch {
				toast("Failed to load updates");
			} finally {
				setLoading(false);
			}
		};

		load();
	}, []);

	const filteredUpdates = recentUpdates.filter((u) => {
		if (categoryFilter !== "all") {
			return u.category === categoryFilter;
		}
		return true;
	});

	return (
		<div className="flex flex-col gap-6 px-6 py-6 animate-fade-up">
			<div className="flex items-center justify-between border-b border-brand-border-light bg-brand-card px-6 py-4">
				<div className="font-serif text-2xl font-semibold text-white">
					Project Updates
				</div>
				<span className="rounded bg-brand-gold px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-brand-black">
					View Only
				</span>
			</div>

			<div className="flex flex-col gap-6">
				<div className="rounded-md border border-brand-border-light bg-brand-card p-4">
					<div className="mb-4 border-b border-brand-border pb-4 font-serif text-lg font-semibold text-white">
						Filter Updates
					</div>
					<div className="flex flex-col gap-4 sm:flex-row sm:items-end">
						<div className="w-full sm:flex-1">
							<label
								htmlFor="category-filter"
								className="mb-2 block text-sm font-semibold uppercase tracking-[0.06em] text-brand-muted-light"
							>
								Work Category
							</label>
							<select
								id="category-filter"
								className="w-full rounded-md border border-brand-border bg-brand-panel px-4 py-3 text-sm text-white outline-none transition hover:border-brand-border-light focus:border-brand-gold focus:bg-brand-panel-light focus:ring-2 focus:ring-brand-gold/10"
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
					</div>
				</div>

				{loading ? (
					<div className="rounded-md border border-brand-border-light bg-brand-card px-8 py-12 text-center">
						<div className="mb-2 text-3xl">⏳</div>
						<div className="text-sm text-brand-muted-light">
							Loading updates…
						</div>
					</div>
				) : filteredUpdates.length === 0 ? (
					<div className="rounded-md border border-brand-border-light bg-brand-card px-8 py-12 text-center">
						<div className="mb-2 text-3xl">📝</div>
						<div className="text-sm text-brand-muted-light">
							No updates available yet
						</div>
						<div className="mt-2 text-xs text-brand-muted">
							Check back soon for project progress
						</div>
					</div>
				) : (
					<div className="flex flex-col gap-4">
						{filteredUpdates.map((u) => {
							const isComplete = u.progress_percentage >= 100;
							return (
								<div
									key={u.id}
									className={
										isComplete
											? "flex gap-4 rounded-md border border-[#27ae60] bg-[rgba(39,174,96,0.08)] p-4"
											: "flex gap-4 rounded-md border border-brand-gold bg-[rgba(200,151,31,0.08)] p-4"
									}
								>
									<div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-panel text-xl">
										{CAT_IC[u.category]}
									</div>
									<div className="min-w-0 flex-1">
										<div className="mb-2 font-serif text-lg font-semibold text-white">
											{u.title}
										</div>
										{u.description && (
											<div className="line-clamp-3 text-sm leading-6 text-brand-muted-light">
												{u.description}
											</div>
										)}
										<div className="mt-2 flex flex-wrap gap-2 text-xs">
											<span className="rounded bg-brand-panel-light px-2 py-1 font-semibold uppercase tracking-[0.05em] text-brand-muted-light">
												{u.category.replace("_", " ")}
											</span>
											<span className="text-brand-gold">
												Progress:{" "}
												{u.progress_percentage}%
											</span>
											{u.photo_urls.length > 0 && (
												<span className="text-[#5dade2]">
													📸 {u.photo_urls.length}{" "}
													photo
													{u.photo_urls.length > 1
														? "s"
														: ""}
												</span>
											)}
										</div>
										<div className="mt-2 text-xs text-brand-muted">
											{new Date(
												u.created_at,
											).toLocaleString("en-IN", {
												day: "2-digit",
												month: "short",
												year: "numeric",
												hour: "2-digit",
												minute: "2-digit",
											})}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
