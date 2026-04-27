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
		<div className="flex flex-col gap-6 px-6 py-6 animate-fade-up">
			<div className="flex flex-col gap-2">
				<h1 className="font-serif text-[1.75rem] font-semibold text-white">
					Questions
				</h1>
				<p className="text-base text-brand-muted-light">
					Ask the builder about your project
				</p>
			</div>

			{loading ? (
				<Card className="border-brand-border-light bg-brand-card">
					<div className="px-8 py-12 text-center text-brand-muted">
						Loading...
					</div>
				</Card>
			) : (
				<div className="grid items-start gap-6 lg:grid-cols-[250px_1fr]">
					<div className="sticky top-6 hidden lg:block">
						<Card className="border-brand-border-light bg-brand-card p-4">
							<div className="mb-4 border-b border-brand-border pb-4 font-serif text-lg font-semibold text-white">
								Your Projects
							</div>
							<div className="flex flex-col gap-2">
								{projects.length === 0 ? (
									<div className="rounded-md bg-brand-panel px-4 py-4 text-center text-sm text-brand-muted-light">
										No projects assigned
									</div>
								) : (
									projects.map((project) => (
										<button
											key={project.id}
											className={
												selectedProjectId === project.id
													? "flex flex-col gap-1 rounded-md border border-brand-gold bg-brand-panel-light px-4 py-3 text-left text-brand-gold transition"
													: "flex flex-col gap-1 rounded-md border border-brand-border px-4 py-3 text-left text-brand-muted-light transition hover:border-brand-gold hover:bg-brand-panel hover:text-white"
											}
											onClick={() =>
												setSelectedProjectId(project.id)
											}
										>
											<div className="font-semibold">
												{project.name}
											</div>
											<div className="text-xs opacity-80">
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
						</Card>
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
									<div className="font-serif text-lg font-semibold text-white">
										Questions ({filteredQueries.length})
									</div>
									<QueryList
										queries={filteredQueries}
										loading={false}
									/>
								</div>
							</>
						) : (
							<Card className="border-brand-border-light bg-brand-card">
								<div className="px-8 py-12 text-center">
									<div className="mb-4 text-3xl">
										📋
									</div>
									<div className="text-brand-muted-light">
										Select a project to ask questions
									</div>
								</div>
							</Card>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
