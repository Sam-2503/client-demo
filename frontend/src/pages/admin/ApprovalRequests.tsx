import { useState, useEffect } from "react";
import { Badge, Button, Modal, Input, useToast } from "../../components";
import api from "../../api/client";
import type { BuilderRequest } from "../../types";
import { cn } from "../../utils";

type ApprovalAction = "approve" | "reject" | null;

interface ApprovalState {
	requestId: string;
	action: ApprovalAction;
	notesOpen: boolean;
	notes: string;
}

export default function ApprovalRequests() {
	const [requests, setRequests] = useState<BuilderRequest[]>([]);
	const [loading, setLoading] = useState(true);
	const [approvalState, setApprovalState] = useState<ApprovalState>({
		requestId: "",
		action: null,
		notesOpen: false,
		notes: "",
	});
	const [submitting, setSubmitting] = useState(false);
	const toast = useToast();

	const loadRequests = async () => {
		setLoading(true);
		try {
			const res = await api.get<BuilderRequest[]>("/api/admin/requests");
			setRequests(res.data);
		} catch (err: any) {
			toast(err?.response?.data?.detail || "Failed to load requests");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadRequests();
	}, []);

	const openApprovalModal = (requestId: string, action: ApprovalAction) => {
		setApprovalState({
			requestId,
			action,
			notesOpen: true,
			notes: "",
		});
	};

	const closeModal = () => {
		setApprovalState({
			requestId: "",
			action: null,
			notesOpen: false,
			notes: "",
		});
	};

	const handleApproval = async () => {
		const { requestId, action, notes } = approvalState;

		if (action === "reject" && !notes.trim()) {
			toast("Rejection reason is required");
			return;
		}

		setSubmitting(true);
		try {
			if (action === "approve") {
				await api.post(`/api/admin/requests/${requestId}/approve`, {
					notes: notes.trim() || null,
				});
				toast("Builder approved successfully!");
			} else if (action === "reject") {
				await api.post(`/api/admin/requests/${requestId}/reject`, {
					reason: notes.trim(),
				});
				toast("Builder request rejected");
			}

			closeModal();
			// Reload requests after brief delay to ensure DB is updated
			setTimeout(() => {
				loadRequests();
			}, 300);
		} catch (err: any) {
			console.error("Approval error:", err);
			toast(err?.response?.data?.detail || "Failed to process request");
		} finally {
			setSubmitting(false);
		}
	};

	const pendingCount = requests.filter((r) => r.status === "pending").length;
	const approvedCount = requests.filter(
		(r) => r.status === "approved",
	).length;
	const rejectedCount = requests.filter(
		(r) => r.status === "rejected",
	).length;

	return (
		<div className="flex flex-col gap-6 p-6 max-md:p-4">
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<h1 className="font-serif text-[1.75rem] font-semibold text-white max-md:text-2xl">
						Builder Approval Requests
					</h1>
					<p className="text-sm text-brand-muted">
						Review and approve pending builder registrations
					</p>
				</div>

				<div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))] max-md:grid-cols-1">
					<div className="flex flex-col gap-3 rounded-lg border border-brand-border bg-brand-card p-4 text-center">
						<div className="font-serif text-2xl font-bold text-brand-gold">
							{pendingCount}
						</div>
						<div className="text-xs font-semibold uppercase tracking-[0.05em] text-brand-muted">
							Pending
						</div>
					</div>
					<div className="flex flex-col gap-3 rounded-lg border border-brand-border bg-brand-card p-4 text-center">
						<div className="font-serif text-2xl font-bold text-brand-gold">
							{approvedCount}
						</div>
						<div className="text-xs font-semibold uppercase tracking-[0.05em] text-brand-muted">
							Approved
						</div>
					</div>
					<div className="flex flex-col gap-3 rounded-lg border border-brand-border bg-brand-card p-4 text-center">
						<div className="font-serif text-2xl font-bold text-brand-gold">
							{rejectedCount}
						</div>
						<div className="text-xs font-semibold uppercase tracking-[0.05em] text-brand-muted">
							Rejected
						</div>
					</div>
				</div>
			</div>

			<div className="overflow-hidden rounded-lg border border-brand-border bg-brand-card">
				{loading ? (
					<div className="flex min-h-[280px] items-center justify-center p-8 text-sm text-brand-muted">
						Loading requests...
					</div>
				) : requests.length === 0 ? (
					<div className="flex min-h-[280px] flex-col items-center justify-center gap-4 p-8 text-center">
						<div className="text-4xl text-brand-gold">✓</div>
						<div className="font-serif text-lg font-semibold text-white">
							All caught up!
						</div>
						<div className="text-sm text-brand-muted">
							No builder requests to process
						</div>
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="min-w-full border-collapse">
							<thead>
								<tr className="border-b-2 border-brand-border bg-brand-panel">
									<th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-[0.05em] text-brand-muted max-md:hidden">
										Email
									</th>
									<th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-[0.05em] text-brand-muted">
										Full Name
									</th>
									<th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-[0.05em] text-brand-muted">
										Status
									</th>
									<th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-[0.05em] text-brand-muted max-md:hidden">
										Submitted
									</th>
									<th className="px-4 py-4 text-right text-sm font-semibold uppercase tracking-[0.05em] text-brand-muted">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-brand-border">
								{requests.map((request) => (
									<tr
										key={request.id}
										className={cn(
											"transition-colors duration-300 hover:bg-[#252525]",
											request.status === "pending" &&
												"bg-[rgba(230,126,34,0.05)]",
											request.status === "approved" &&
												"bg-[rgba(39,174,96,0.05)]",
											request.status === "rejected" &&
												"bg-[rgba(192,57,43,0.05)]",
										)}
									>
										<td className="px-4 py-4 font-mono text-sm text-brand-gold max-md:hidden">
											{request.email}
										</td>
										<td className="px-4 py-4 text-sm font-medium text-white">
											{request.full_name}
										</td>
										<td className="px-4 py-4 text-sm text-white">
											<Badge
												status={
													request.status === "pending"
														? "pending"
														: request.status === "approved"
															? "done"
															: "blocked"
												}
											>
												{request.status}
											</Badge>
										</td>
										<td className="px-4 py-4 text-sm text-brand-muted max-md:hidden">
											{new Date(request.created_at).toLocaleDateString()}
										</td>
										<td className="px-4 py-4 text-right text-sm text-white">
											{request.status === "pending" ? (
												<div className="flex flex-col justify-end gap-2 lg:flex-row">
													<Button
														variant="primary"
														size="sm"
														className="w-full lg:w-auto"
														onClick={() =>
															openApprovalModal(request.id, "approve")
														}
														disabled={submitting}
													>
														Approve
													</Button>
													<Button
														variant="outline"
														size="sm"
														className="w-full lg:w-auto"
														onClick={() =>
															openApprovalModal(request.id, "reject")
														}
														disabled={submitting}
													>
														Reject
													</Button>
												</div>
											) : (
												<span className="text-brand-muted">—</span>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>

			<Modal
				isOpen={approvalState.notesOpen}
				onClose={closeModal}
				title={
					approvalState.action === "approve"
						? "Approve Builder Request"
						: "Reject Builder Request"
				}
				size="md"
				footer={
					<div className="flex w-full flex-col justify-end gap-3 sm:flex-row">
						<Button
							variant="outline"
							onClick={closeModal}
							disabled={submitting}
							className="min-w-[120px] sm:w-auto"
						>
							Cancel
						</Button>
						<Button
							variant="primary"
							onClick={handleApproval}
							disabled={submitting}
							isLoading={submitting}
							className="min-w-[120px] sm:w-auto"
						>
							{approvalState.action === "approve"
								? "Approve"
								: "Reject"}
						</Button>
					</div>
				}
			>
				<div className="flex flex-col gap-4">
					{approvalState.action === "approve" ? (
						<>
							<p className="text-sm leading-6 text-brand-muted">
								Are you sure you want to approve this builder
								request?
							</p>
							<Input
								label="Approval Notes (optional)"
								placeholder="Add any notes for the builder..."
								value={approvalState.notes}
								onChange={(e) =>
									setApprovalState((prev) => ({
										...prev,
										notes: e.target.value,
									}))
								}
								fullWidth
								disabled={submitting}
							/>
						</>
					) : (
						<>
							<p className="text-sm leading-6 text-brand-muted">
								Please provide a reason for rejecting this
								request:
							</p>
							<textarea
								className="min-h-[120px] w-full resize-y rounded-md border border-brand-border bg-brand-panel px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#3a3a3a] hover:border-brand-border-light hover:bg-[rgba(200,151,31,0.02)] focus:border-brand-gold focus:bg-[rgba(200,151,31,0.05)] focus:ring-2 focus:ring-brand-gold/10 disabled:cursor-not-allowed disabled:bg-brand-panel-light disabled:opacity-50"
								placeholder="Rejection reason..."
								value={approvalState.notes}
								onChange={(e) =>
									setApprovalState((prev) => ({
										...prev,
										notes: e.target.value,
									}))
								}
								disabled={submitting}
								rows={3}
							/>
							{!approvalState.notes.trim() && (
								<div className="rounded-md border border-[rgba(192,57,43,0.3)] bg-[rgba(192,57,43,0.1)] px-4 py-3 text-sm text-[#c0392b]">
									Rejection reason is required
								</div>
							)}
						</>
					)}
				</div>
			</Modal>
		</div>
	);
}
