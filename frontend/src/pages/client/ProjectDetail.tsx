import { useEffect, useState, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/client";
import { useToast } from "../../components/Toast";
import { cn } from "../../utils/cn";
import type { Project, Update, Query } from "../../types";

type ActiveTab = "updates" | "queries" | "info";

export default function ClientProjectDetail() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const toast = useToast();

	const [project, setProject] = useState<Project | null>(null);
	const [updates, setUpdates] = useState<Update[]>([]);
	const [queries, setQueries] = useState<Query[]>([]);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState<ActiveTab>("updates");
	const [newQuery, setNewQuery] = useState("");
	const [submittingQuery, setSubmittingQuery] = useState(false);

	const load = async () => {
		if (!id) return;
		setLoading(true);
		try {
			const [projRes, updatesRes, queriesRes] = await Promise.all([
				api.get<Project>(`/api/projects/${id}`),
				api.get<Update[]>(`/api/updates/${id}`),
				api.get<Query[]>(`/api/queries?project_id=${id}`),
			]);
			setProject(projRes.data);
			setUpdates(updatesRes.data);
			setQueries(queriesRes.data);
		} catch (err: any) {
			toast(err?.response?.data?.detail || "Failed to load project");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		load();
	}, [id]);

	const handleSubmitQuery = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!newQuery.trim() || !id) return;

		setSubmittingQuery(true);
		try {
			await api.post("/api/queries", {
				project_id: id,
				question: newQuery.trim(),
			});
			toast("Question submitted successfully");
			setNewQuery("");
			await load();
		} catch (err: any) {
			toast(err?.response?.data?.detail || "Failed to submit question");
		} finally {
			setSubmittingQuery(false);
		}
	};

	const tabClass = (tab: ActiveTab) =>
		cn(
			"border-b-2 px-1 py-2 text-base font-medium transition",
			activeTab === tab
				? "border-brand-gold text-brand-gold font-semibold"
				: "border-transparent text-brand-muted hover:text-brand-gold",
		);

	if (loading) {
		return (
			<div className="flex items-center justify-between border-b border-brand-border-light bg-brand-card px-6 py-4">
				<div className="font-serif text-2xl font-semibold text-white">
					Loading project...
				</div>
			</div>
		);
	}

	if (!project) {
		return (
			<div className="flex min-h-[calc(100vh-1px)] items-center justify-center px-6 py-10">
				<div className="w-full max-w-md rounded-md border border-brand-border-light bg-brand-card p-8 text-center">
					<div className="mb-3 text-4xl">❌</div>
					<div className="font-serif text-2xl font-semibold text-white">
						Project not found
					</div>
					<p className="mt-2 text-sm text-brand-muted-light">
						The requested project could not be loaded.
					</p>
					<button
						onClick={() => navigate("/client")}
						className="mt-6 inline-flex items-center justify-center rounded-md border border-brand-gold bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-black transition hover:border-brand-gold-light hover:bg-brand-gold-light hover:shadow-glow"
					>
						Back to Projects
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6 px-6 py-6 animate-fade-up">
			<div className="flex items-center gap-4 border-b border-brand-border-light bg-brand-card px-6 py-4">
				<button
					onClick={() => navigate("/client")}
					className="inline-flex items-center gap-2 rounded border border-brand-gold px-3 py-2 text-sm font-medium text-brand-gold transition hover:bg-brand-gold hover:text-brand-black"
				>
					<span>←</span>
					Back
				</button>
				<div className="min-w-0">
					<div className="font-serif text-2xl font-semibold text-white">
						{project.name}
					</div>
					{project.location && (
						<div className="mt-1 text-sm text-brand-muted">
							📍 {project.location}
						</div>
					)}
				</div>
			</div>

			<div className="flex flex-col gap-6">
				<div className="flex border-b border-brand-border-light">
					<button
						onClick={() => setActiveTab("updates")}
						className={tabClass("updates")}
					>
						Updates ({updates.length})
					</button>
					<button
						onClick={() => setActiveTab("queries")}
						className={tabClass("queries")}
					>
						Questions ({queries.length})
					</button>
					<button
						onClick={() => setActiveTab("info")}
						className={tabClass("info")}
					>
						Info
					</button>
				</div>

				{activeTab === "updates" && (
					<div>
						{updates.length === 0 ? (
							<div className="rounded-md border border-brand-border-light bg-brand-card px-8 py-12 text-center">
								<div className="mb-2 text-3xl">📝</div>
								<div className="text-sm text-brand-muted-light">
									No updates yet
								</div>
							</div>
						) : (
							<div className="flex flex-col gap-4">
								{updates.map((update) => (
									<div
										key={update.id}
										className="rounded-md border border-brand-border-light bg-brand-card p-5"
									>
										<div className="mb-4 flex items-start justify-between gap-4 max-md:flex-col">
											<div>
												<h3 className="mb-2 font-serif text-xl font-semibold text-white">
													{update.title}
												</h3>
												<div className="flex flex-wrap gap-4 text-sm text-brand-muted">
													<span>
														{update.category.replace(
															"_",
															" ",
														)}
													</span>
													<span>
														{new Date(
															update.created_at,
														).toLocaleDateString()}
													</span>
												</div>
											</div>
											<div className="rounded bg-brand-gold px-3 py-1.5 text-sm font-semibold text-brand-black">
												{update.progress_percentage}%
											</div>
										</div>

										{update.description && (
											<p className="mb-4 text-sm leading-6 text-brand-muted-light">
												{update.description}
											</p>
										)}

										{update.photo_urls &&
											update.photo_urls.length > 0 && (
												<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
													{update.photo_urls.map(
														(url, idx) => (
															<img
																key={idx}
																src={url}
																alt={`Update ${idx + 1}`}
																className="max-h-[300px] w-full rounded-md object-cover"
																onError={(
																	e,
																) => {
																	e.currentTarget.classList.add(
																		"hidden",
																	);
																}}
															/>
														),
													)}
												</div>
											)}
									</div>
								))}
							</div>
						)}
					</div>
				)}

				{activeTab === "queries" && (
					<div className="flex flex-col gap-6">
						<form
							onSubmit={handleSubmitQuery}
							className="rounded-md border border-brand-gold bg-brand-card p-5"
						>
							<h3 className="mb-4 font-serif text-xl font-semibold text-white">
								Ask a Question
							</h3>
							<textarea
								placeholder="Ask the builder about this project..."
								value={newQuery}
								onChange={(e) => setNewQuery(e.target.value)}
								disabled={submittingQuery}
								className="min-h-[120px] w-full resize-y rounded-md border border-brand-border bg-brand-panel px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#3a3a3a] focus:border-brand-gold focus:bg-brand-panel-light focus:ring-2 focus:ring-brand-gold/10 disabled:cursor-not-allowed disabled:opacity-50"
							/>
							<div className="mt-4 flex gap-3 max-md:flex-col">
								<button
									type="submit"
									disabled={
										submittingQuery || !newQuery.trim()
									}
									className="inline-flex w-full max-w-[200px] items-center justify-center rounded-md border border-brand-gold bg-brand-gold px-4 py-2.5 text-sm font-semibold text-brand-black transition hover:border-brand-gold-light hover:bg-brand-gold-light disabled:cursor-not-allowed disabled:opacity-60 max-md:max-w-none"
								>
									{submittingQuery
										? "Submitting..."
										: "Submit Question"}
								</button>
							</div>
						</form>

						{queries.length === 0 ? (
							<div className="rounded-md border border-brand-border-light bg-brand-card px-8 py-12 text-center">
								<div className="mb-2 text-3xl">💬</div>
								<div className="text-sm text-brand-muted-light">
									No questions yet
								</div>
								<div className="mt-2 text-xs text-brand-muted">
									Ask your first question above
								</div>
							</div>
						) : (
							<div className="flex flex-col gap-4">
								{queries.map((query) => (
									<div
										key={query.id}
										className="rounded-md border border-brand-border-light bg-brand-card p-5"
									>
										<div className="mb-4 flex items-start justify-between gap-4 max-md:flex-col">
											<div className="min-w-0">
												<h3 className="mb-2 font-serif text-lg font-semibold text-white">
													{query.question}
												</h3>
												<div className="text-sm text-brand-muted">
													{new Date(
														query.created_at,
													).toLocaleDateString()}
												</div>
											</div>
											<div
												className={cn(
													"rounded px-3 py-1.5 text-sm font-semibold whitespace-nowrap",
													query.status === "resolved"
														? "bg-brand-green text-brand-black"
														: "bg-brand-orange text-brand-black",
												)}
											>
												{query.status}
											</div>
										</div>

										{query.answer && (
											<div className="rounded-md border-l-4 border-brand-gold bg-brand-panel-light p-4">
												<div className="mb-2 text-sm font-semibold uppercase tracking-[0.05em] text-brand-gold">
													Builder's Response:
												</div>
												<p className="text-sm leading-6 text-brand-muted-light">
													{query.answer}
												</p>
											</div>
										)}
									</div>
								))}
							</div>
						)}
					</div>
				)}

				{activeTab === "info" && (
					<div className="rounded-md border border-brand-border-light bg-brand-card p-5">
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							<div>
								<div className="mb-2 text-sm font-semibold uppercase tracking-[0.05em] text-brand-muted">
									Status
								</div>
								<div className="text-lg font-semibold text-white">
									{project.status.replace("_", " ")}
								</div>
							</div>

							<div>
								<div className="mb-2 text-sm font-semibold uppercase tracking-[0.05em] text-brand-muted">
									Overall Progress
								</div>
								<div className="text-lg font-semibold text-brand-gold">
									{project.overall_progress}%
								</div>
							</div>

							{project.location && (
								<div>
									<div className="mb-2 text-sm font-semibold uppercase tracking-[0.05em] text-brand-muted">
										Location
									</div>
									<div className="text-base text-white">
										📍 {project.location}
									</div>
								</div>
							)}

							{project.start_date && (
								<div>
									<div className="mb-2 text-sm font-semibold uppercase tracking-[0.05em] text-brand-muted">
										Started
									</div>
									<div className="text-base text-white">
										{new Date(
											project.start_date,
										).toLocaleDateString()}
									</div>
								</div>
							)}

							{project.expected_end_date && (
								<div>
									<div className="mb-2 text-sm font-semibold uppercase tracking-[0.05em] text-brand-muted">
										Expected End
									</div>
									<div className="text-base text-white">
										{new Date(
											project.expected_end_date,
										).toLocaleDateString()}
									</div>
								</div>
							)}
						</div>

						{project.description && (
							<div className="mt-8 border-t border-brand-border pt-6">
								<div className="mb-2 text-sm font-semibold uppercase tracking-[0.05em] text-brand-muted">
									Description
								</div>
								<p className="text-sm leading-6 text-brand-muted-light">
									{project.description}
								</p>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
