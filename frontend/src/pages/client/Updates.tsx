import { useEffect, useState } from "react";
import api from "../../api/client";
import { useToast } from "../../components/Toast";
import type { Update, WorkCategory } from "../../types";

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

const CAT_COLORS: Record<WorkCategory, string> = {
	foundation: "bg-[rgba(212,175,55,0.15)] border-[#d4af37]",
	framing: "bg-[rgba(168,135,94,0.15)] border-[#a8875e]",
	roofing: "bg-[rgba(93,173,226,0.15)] border-[#5dade2]",
	plumbing: "bg-[rgba(52,152,219,0.15)] border-[#3498db]",
	electrical: "bg-[rgba(241,196,15,0.15)] border-[#f1c40f]",
	painting: "bg-[rgba(155,89,182,0.15)] border-[#9b59b6]",
	flooring: "bg-[rgba(230,126,34,0.15)] border-[#e67e22]",
	windows_doors: "bg-[rgba(52,73,94,0.15)] border-[#34495e]",
	finishing: "bg-[rgba(46,204,113,0.15)] border-[#2ecc71]",
	other: "bg-[rgba(149,165,166,0.15)] border-[#95a5a6]",
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
		<div className="flex flex-col gap-6 px-6 py-8 animate-fade-up">
			<div className="border-b border-white/10 bg-[linear-gradient(160deg,rgba(10,18,28,0.4)_0%,rgba(16,31,48,0.4)_100%)] mb-2 px-0 py-6 backdrop-blur-sm">
				<div className="font-serif text-3xl font-semibold text-[#f5efe2]">
					Project Updates
				</div>
				<p className="mt-1 text-sm text-[#a9b7c8]">
					View-only project progress updates
				</p>
			</div>

			<div className="flex flex-col gap-6">
				<div className="rounded-2xl border border-white/10 bg-[rgba(13,38,58,0.3)] p-5 backdrop-blur-sm">
					<div className="mb-4 border-b border-white/10 pb-4 font-serif text-lg font-semibold text-[#f5efe2]">
						Filter Updates
					</div>
					<div>
						<label
							htmlFor="category-filter"
							className="mb-3 block text-sm font-semibold uppercase tracking-[0.1em] text-[#a9b7c8]"
						>
							Work Category
						</label>
						<select
							id="category-filter"
							className="w-full rounded-xl border border-white/10 bg-[rgba(13,38,58,0.5)] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#a9b7c8] focus:border-[#d8bc8f]/35 focus:bg-[rgba(13,38,58,0.7)]"
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

				{loading ? (
					<div className="rounded-2xl border border-white/10 bg-[rgba(13,38,58,0.3)] px-8 py-12 text-center backdrop-blur-sm">
						<div className="text-sm text-[#a9b7c8]">
							Loading updates…
						</div>
					</div>
				) : filteredUpdates.length === 0 ? (
					<div className="rounded-2xl border border-white/10 bg-[rgba(13,38,58,0.3)] px-8 py-12 text-center backdrop-blur-sm">
						<div className="text-sm text-[#a9b7c8]">
							No updates available yet
						</div>
						<div className="mt-2 text-xs text-[#7a8894]">
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
									className={`flex gap-4 rounded-2xl border p-5 backdrop-blur-sm ${
										isComplete
											? "border-[#69c58a]/30 bg-[rgba(105,197,138,0.08)]"
											: "border-[#d8bc8f]/30 bg-[rgba(216,188,143,0.08)]"
									}`}
								>
									<div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/5 text-sm font-medium text-[#d8bc8f]">
										●
									</div>
									<div className="min-w-0 flex-1">
										<div className="font-serif text-lg font-semibold text-white">
											{u.title}
										</div>
										{u.description && (
											<div className="line-clamp-2 mt-1 text-sm leading-6 text-[#a9b7c8]">
												{u.description}
											</div>
										)}
										<div className="mt-3 flex flex-wrap gap-2 text-xs">
											<span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-medium uppercase tracking-[0.05em] text-[#c0ccd8]">
												{u.category.replace("_", " ")}
											</span>
											<span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-medium text-[#d8bc8f]">
												{u.progress_percentage}% complete
											</span>
											{u.photo_urls.length > 0 && (
												<span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-medium text-[#5dade2]">
													{u.photo_urls.length} {u.photo_urls.length > 1 ? "photos" : "photo"}
												</span>
											)}
										</div>
										<div className="mt-3 text-xs text-[#7a8894]">
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
