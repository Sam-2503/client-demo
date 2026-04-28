import { useState, useEffect } from "react";
import { Card, useToast, QueryForm, QueryList } from "../../components";
import api from "../../api/client";
import type { Query, CreateQueryRequest, Project } from "../../types";

export default function ClientQueriesPage() {
	const [queries, setQueries] = useState<Query[]>([]);
	const [projects, setProjects] = useState<Project[]>([]);
	const [selectedProjectId, setSelectedProjectId] = useState<string>("");
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const toast = useToast();

	const loadData = async () => {
		setLoading(true);
		try {
			const [projectsRes, queriesRes] = await Promise.all([
				api
					.get<Project[]>("/api/projects/")
					.catch(() => ({ data: [] })),
				api.get<Query[]>("/api/queries").catch(() => ({ data: [] })),
			]);

			setProjects(projectsRes.data);
			setQueries(queriesRes.data);

			if (projectsRes.data.length > 0 && !selectedProjectId) {
				setSelectedProjectId(projectsRes.data[0].id);
			}
		} catch {
			toast("Failed to load data");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadData();
	}, []);

	const handleSubmitQuery = async (query: CreateQueryRequest) => {
		setSubmitting(true);
		try {
			await api.post("/api/queries", query);
			toast("Question submitted successfully");
			await loadData();
		} catch (err: any) {
			toast(err?.response?.data?.detail || "Failed to submit question");
		} finally {
			setSubmitting(false);
		}
	};

	const filteredQueries = selectedProjectId
		? queries.filter((q) => q.project_id === selectedProjectId)
		: [];

	return (
		<div className="flex flex-col gap-6 px-6 py-8 animate-fade-up">
			<div className="border-b border-white/10 bg-[linear-gradient(160deg,rgba(10,18,28,0.4)_0%,rgba(16,31,48,0.4)_100%)] mb-2 px-0 py-6 backdrop-blur-sm">
				<div className="font-serif text-3xl font-semibold text-[#f5efe2]">
					Questions
				</div>
				<p className="mt-1 text-sm text-[#a9b7c8]">
					Ask the builder about your project
				</p>
			</div>

			{loading ? (
				<div className="rounded-2xl border border-white/10 bg-[rgba(13,38,58,0.3)] px-8 py-12 text-center backdrop-blur-sm">
					<div className="text-sm text-[#a9b7c8]">
						Loading projects...
					</div>
				</div>
			) : (
				<div className="grid items-start gap-6 lg:grid-cols-[280px_1fr]">
					<div className="sticky top-6 hidden lg:block">
						<div className="rounded-2xl border border-white/10 bg-[rgba(13,38,58,0.3)] p-5 backdrop-blur-sm">
							<div className="mb-4 border-b border-white/10 pb-4 font-serif text-lg font-semibold text-[#f5efe2]">
								Your Projects
							</div>
							<div className="flex flex-col gap-2">
								{projects.length === 0 ? (
									<div className="rounded-xl bg-white/5 px-4 py-4 text-center text-sm text-[#a9b7c8]">
										No projects assigned
									</div>
								) : (
									projects.map((project) => (
										<button
											key={project.id}
											className={
												selectedProjectId === project.id
													? "flex flex-col gap-1 rounded-xl border border-[#d8bc8f]/35 bg-[rgba(216,188,143,0.1)] px-4 py-3 text-left transition"
													: "flex flex-col gap-1 rounded-xl border border-white/10 px-4 py-3 text-left transition hover:border-[#d8bc8f]/25 hover:bg-white/5"
											}
											onClick={() =>
												setSelectedProjectId(project.id)
											}
										>
											<div className="font-semibold text-white">
												{project.name}
											</div>
											<div
												className={`text-xs ${selectedProjectId === project.id ? "text-[#d8bc8f]" : "text-[#a9b7c8]"}`}
											>
												{
													queries.filter(
														(q) =>
															q.project_id ===
															project.id,
													).length
												}{" "}
												{queries.filter(
													(q) =>
														q.project_id ===
														project.id,
												).length === 1
													? "question"
													: "questions"}
											</div>
										</button>
									))
								)}
							</div>
						</div>
					</div>

					{/* Main Content */}
					<div className="flex min-w-0 flex-col gap-6">
						{selectedProjectId ? (
							<>
								{/* Query Form */}
								<QueryForm
									projectId={selectedProjectId}
									onSubmit={handleSubmitQuery}
									loading={submitting}
								/>

								{/* Queries List */}
								<div className="flex flex-col gap-4">
									<div className="font-serif text-lg font-semibold text-[#f5efe2]">
										Questions ({filteredQueries.length})
									</div>
									<QueryList
										queries={filteredQueries}
										loading={false}
									/>
								</div>
							</>
						) : (
							<div className="rounded-2xl border border-white/10 bg-[rgba(13,38,58,0.3)] px-8 py-12 text-center backdrop-blur-sm">
								<div className="text-[#a9b7c8]">
									Select a project to ask questions
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
