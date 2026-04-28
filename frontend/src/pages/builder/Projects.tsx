import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";
import { useToast } from "../../components/Toast";
import { cn } from "../../utils/cn";
import type {
	Project,
	ProjectStatus,
	User,
	CreateProjectRequest,
} from "../../types";

const STATUS_COLOR: Record<ProjectStatus, string> = {
	planning: "var(--gray)",
	in_progress: "var(--gold)",
	on_hold: "var(--orange)",
	completed: "var(--green)",
};

const STATUS_LABEL: Record<ProjectStatus, string> = {
	planning: "Planning",
	in_progress: "Active",
	on_hold: "On Hold",
	completed: "Complete",
};

const STATUS_BADGE: Record<ProjectStatus, string> = {
	planning: "bg-brand-muted text-brand-black",
	in_progress: "bg-brand-gold text-brand-black",
	on_hold: "bg-[#e67e22] text-brand-black",
	completed: "bg-[#27ae60] text-brand-black",
};

const EMPTY: CreateProjectRequest = {
	name: "",
	description: null,
	location: null,
	client_id: "",
	start_date: null,
	expected_end_date: null,
};

export default function BuilderProjects() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [clients, setClients] = useState<User[]>([]);
	const [open, setOpen] = useState(false);
	const [form, setForm] = useState<CreateProjectRequest>(EMPTY);
	const [saving, setSaving] = useState(false);
	const [loading, setLoading] = useState(true);
	const toast = useToast();
	const navigate = useNavigate();

	const load = async () => {
		setLoading(true);
		try {
			const [pRes, cRes] = await Promise.all([
				api.get<Project[]>("/api/projects/"),
				api
					.get<User[]>("/api/users/clients")
					.catch(() => ({ data: [] as User[] })),
			]);
			setProjects(pRes.data);
			setClients(cRes.data);
		} catch {
			toast("Failed to load data");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		load();
	}, []);

	const set =
		(k: keyof CreateProjectRequest) =>
		(
			e: React.ChangeEvent<
				HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
			>,
		) =>
			setForm((f) => ({ ...f, [k]: e.target.value || null }));

	const create = async () => {
		if (!form.name) {
			toast("Project name is required");
			return;
		}
		if (!form.client_id) {
			toast("Please select a client");
			return;
		}
		setSaving(true);
		try {
			await api.post("/api/projects/", form);
			toast("Project created ✓");
			setOpen(false);
			setForm(EMPTY);
			load();
		} catch (e: any) {
			toast(e?.response?.data?.detail ?? "Failed to create project");
		} finally {
			setSaving(false);
		}
	};

	return (
		<>
			{/* Topbar */}
			<div className="flex items-center justify-between border-b border-brand-border-light bg-brand-card px-6 py-4">
				<div className="font-serif text-2xl font-semibold text-white">
					Projects
				</div>
				<div className="flex items-center gap-3">
					<button
						className="rounded bg-brand-gold px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-brand-black transition hover:bg-brand-gold-light"
						onClick={() => setOpen(true)}
					>
						+ New Project
					</button>
				</div>
			</div>

			<div className="animate-fade-up px-6 py-6">
				{loading ? (
					<div className="rounded-md border border-brand-border-light bg-brand-card p-10 text-center">
						<div className="mb-2 text-3xl">⏳</div>
						<div className="text-sm text-brand-muted-light">
							Loading…
						</div>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
						{projects.map((p) => (
							<div
								key={p.id}
								className="cursor-pointer rounded-md border border-brand-border-light border-t-2 bg-brand-card p-4 transition hover:border-brand-gold"
								style={{
									borderTopColor: STATUS_COLOR[p.status],
								}}
								onClick={() =>
									navigate(`/builder/projects/${p.id}`)
								}
							>
								<div className="space-y-4">
									<div className="flex items-start justify-between gap-3">
										<div>
											<div className="text-sm font-semibold text-white">
												{p.name}
											</div>
											<div className="text-xs text-brand-muted">
												{p.location ?? "Location TBD"}
											</div>
										</div>
										<span
											className={cn(
												"rounded px-2 py-0.5 text-[0.65rem] font-semibold uppercase",
												STATUS_BADGE[p.status],
											)}
										>
											{STATUS_LABEL[p.status]}
										</span>
									</div>

									<div className="text-xs text-brand-muted-light">
										📍 {p.location ?? "—"}
									</div>

									<div>
										<div className="mb-1 flex items-center justify-between text-[0.7rem] text-brand-muted-light">
											<span>Progress</span>
											<span>{p.overall_progress}%</span>
										</div>
										<div className="h-1.5 overflow-hidden rounded bg-brand-border">
											<div
												className="h-full rounded"
												style={{
													width: `${p.overall_progress}%`,
													background:
														STATUS_COLOR[p.status],
												}}
											/>
										</div>
									</div>
								</div>

								<div className="mt-4 flex items-center justify-between border-t border-brand-border pt-3">
									<div className="text-[0.72rem] text-brand-muted-light">
										Status:{" "}
										<span className="text-brand-gold">
											{STATUS_LABEL[p.status]}
										</span>
									</div>
									<div className="text-[0.68rem] text-brand-muted">
										{p.expected_end_date
											? "Due: " +
												new Date(
													p.expected_end_date,
												).toLocaleDateString("en-IN", {
													month: "short",
													year: "numeric",
												})
											: "—"}
									</div>
								</div>
							</div>
						))}

						{/* Add card */}
						<div
							className="grid cursor-pointer place-items-center rounded-md border border-dashed border-brand-gold bg-brand-card p-6 text-center transition hover:bg-brand-panel"
							onClick={() => setOpen(true)}
						>
							<div className="mb-2 text-2xl text-brand-gold">
								＋
							</div>
							<div className="text-sm font-medium text-brand-muted-light">
								Create New Project
							</div>
						</div>
					</div>
				)}
			</div>

			{/* ── CREATE PROJECT MODAL ── */}
			<div
				className={cn(
					"fixed inset-0 z-[1000] grid place-items-center bg-black/65 p-4 backdrop-blur-sm transition",
					open ? "visible opacity-100" : "invisible opacity-0",
				)}
				onClick={(e) => e.target === e.currentTarget && setOpen(false)}
			>
				<div className="w-full max-w-[520px] rounded-md border border-brand-border-light bg-brand-card shadow-2xl">
					<div className="h-1 w-full bg-brand-gold" />
					<div className="p-5">
						<div className="mb-5 flex items-start justify-between">
							<div>
								<div className="font-serif text-2xl text-white">
									New Project
								</div>
								<div className="text-sm text-brand-muted-light">
									Fill in the project details below
								</div>
							</div>
							<button
								className="rounded border border-brand-border px-2 py-1 text-sm text-brand-muted-light transition hover:border-brand-gold hover:text-brand-gold"
								onClick={() => setOpen(false)}
							>
								✕
							</button>
						</div>

						<div className="mb-4 space-y-1">
							<label className="text-xs uppercase tracking-[0.08em] text-brand-muted">
								Project Name *
							</label>
							<input
								className="w-full border-b-2 border-brand-border bg-brand-panel px-3 py-2 text-sm text-white outline-none transition focus:border-brand-gold"
								placeholder="e.g. Villa Areca, Green Meadows Phase 2"
								value={form.name}
								onChange={(e) =>
									setForm((f) => ({
										...f,
										name: e.target.value,
									}))
								}
							/>
						</div>

						<div className="mb-4 space-y-1">
							<label className="text-xs uppercase tracking-[0.08em] text-brand-muted">
								Description
							</label>
							<textarea
								className="min-h-24 w-full border-b-2 border-brand-border bg-brand-panel px-3 py-2 text-sm text-white outline-none transition focus:border-brand-gold"
								placeholder="Brief description of the project…"
								value={form.description ?? ""}
								onChange={set("description")}
							/>
						</div>

						<div className="mb-4 space-y-1">
							<label className="text-xs uppercase tracking-[0.08em] text-brand-muted">
								Location
							</label>
							<input
								className="w-full border-b-2 border-brand-border bg-brand-panel px-3 py-2 text-sm text-white outline-none transition focus:border-brand-gold"
								placeholder="e.g. Banjara Hills, Hyderabad"
								value={form.location ?? ""}
								onChange={set("location")}
							/>
						</div>

						<div className="mb-4 space-y-1">
							<label className="text-xs uppercase tracking-[0.08em] text-brand-muted">
								Assign Client *
							</label>
							{clients.length === 0 ? (
								<div className="border-b-2 border-brand-border bg-brand-panel px-3 py-2 text-xs text-brand-muted">
									No clients registered yet. Ask client to
									register first.
								</div>
							) : (
								<select
									className="w-full border-b-2 border-brand-border bg-brand-panel px-3 py-2 text-sm text-white outline-none transition focus:border-brand-gold"
									value={form.client_id}
									onChange={(e) =>
										setForm((f) => ({
											...f,
											client_id: e.target.value,
										}))
									}
								>
									<option value="">Select client…</option>
									{clients.map((c) => (
										<option key={c.id} value={c.id}>
											{c.full_name} — {c.email}
										</option>
									))}
								</select>
							)}
						</div>

						<div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
							<div className="space-y-1">
								<label className="text-xs uppercase tracking-[0.08em] text-brand-muted">
									Start Date
								</label>
								<input
									className="w-full border-b-2 border-brand-border bg-brand-panel px-3 py-2 text-sm text-white outline-none transition focus:border-brand-gold"
									type="date"
									value={form.start_date ?? ""}
									onChange={set("start_date")}
								/>
							</div>
							<div className="space-y-1">
								<label className="text-xs uppercase tracking-[0.08em] text-brand-muted">
									Expected Handover
								</label>
								<input
									className="w-full border-b-2 border-brand-border bg-brand-panel px-3 py-2 text-sm text-white outline-none transition focus:border-brand-gold"
									type="date"
									value={form.expected_end_date ?? ""}
									onChange={set("expected_end_date")}
								/>
							</div>
						</div>

						<div className="mt-3 flex gap-2">
							<button
								className="rounded border border-brand-border px-4 py-2 text-sm text-brand-muted-light transition hover:border-brand-gold hover:text-brand-gold"
								onClick={() => setOpen(false)}
							>
								Cancel
							</button>
							<button
								className="flex-1 rounded bg-brand-gold px-4 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-brand-black transition hover:bg-brand-gold-light disabled:opacity-60"
								style={{ flex: 1 }}
								onClick={create}
								disabled={saving}
							>
								{saving ? "Creating…" : "Create Project →"}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
