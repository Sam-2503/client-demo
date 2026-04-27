import { useState } from "react";
import { Button } from ".";
import type { Query, RespondToQueryRequest } from "../types";

interface QueryResponseFormProps {
	query: Query;
	onSubmit: (response: RespondToQueryRequest) => Promise<void>;
	loading?: boolean;
}

export default function QueryResponseForm({
	query,
	onSubmit,
	loading = false,
}: QueryResponseFormProps) {
	const [answer, setAnswer] = useState("");
	const [error, setError] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!answer.trim()) {
			setError("Response is required");
			return;
		}

		setSubmitting(true);
		try {
			await onSubmit({
				answer: answer.trim(),
			});
			setAnswer("");
		} catch (err: any) {
			setError(
				err?.response?.data?.detail ||
					err?.message ||
					"Failed to submit response",
			);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="rounded-lg border border-brand-gold border-l-4 border-l-brand-gold bg-brand-card">
			<div className="mb-5 border-b border-brand-border pb-5">
				<h3 className="mb-3 font-serif text-lg font-semibold text-white">
					Respond to Question
				</h3>
				<div className="text-base text-brand-muted-light">
					<strong>{query.question}</strong>
				</div>
			</div>

			<form onSubmit={handleSubmit} className="flex flex-col gap-5">
				<div className="flex flex-col gap-3">
					<label
						htmlFor="response-text"
						className="text-base font-medium text-brand-muted-light"
					>
						Your Response
					</label>
					<textarea
						id="response-text"
						className="min-h-[100px] resize-y rounded-md border border-brand-border bg-brand-panel px-4 py-3 text-base leading-6 text-white outline-none transition placeholder:text-[#3a3a3a] focus:border-brand-gold focus:bg-brand-panel-light focus:ring-2 focus:ring-brand-gold/10 disabled:cursor-not-allowed disabled:opacity-50"
						placeholder="Provide your detailed response..."
						value={answer}
						onChange={(e) => setAnswer(e.target.value)}
						disabled={submitting || loading}
						rows={4}
					/>
				</div>

				{error && (
					<div className="rounded-md border border-red-700 bg-[rgba(192,57,43,0.1)] px-4 py-3 text-sm text-red-400">
						{error}
					</div>
				)}

				<div className="flex gap-3 border-t border-brand-border pt-4 max-md:flex-col">
					<Button
						type="submit"
						variant="primary"
						disabled={submitting || loading}
						isLoading={submitting || loading}
						className="w-full max-w-[200px] max-md:max-w-none"
					>
						Send Response
					</Button>
				</div>
			</form>
		</div>
	);
}
