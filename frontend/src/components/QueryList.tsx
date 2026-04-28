import { Badge, Card } from ".";
import type { Query } from "../types";

interface QueryListProps {
	queries: Query[];
	loading?: boolean;
	onSelect?: (query: Query) => void;
}

const STATUS_BADGE: Record<string, "active" | "done" | "pending"> = {
	open: "active",
	resolved: "done",
};

export default function QueryList({
	queries,
	loading = false,
	onSelect,
}: QueryListProps) {
	if (loading) {
		return (
			<div className="flex flex-col gap-5">
				<Card>
					<div className="flex flex-col items-center justify-center px-8 py-12 text-center text-brand-muted-light">
						Loading questions...
					</div>
				</Card>
			</div>
		);
	}

	if (queries.length === 0) {
		return (
			<div className="flex flex-col gap-5">
				<Card>
					<div className="flex flex-col items-center justify-center gap-4 px-8 py-12 text-center">
						<div className="text-5xl leading-none">💬</div>
						<div className="font-serif text-lg font-semibold text-white">
							No questions yet
						</div>
						<div className="text-sm text-brand-muted-light">
							Ask your first question above
						</div>
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4">
			{queries.map((query) => (
				<div
					key={query.id}
					className="cursor-pointer"
					onClick={() => onSelect?.(query)}
				>
					<Card
						className="cursor-pointer border-brand-border-light bg-brand-card p-4"
						hoverable={!!onSelect}
					>
						<div className="mb-4 flex items-start justify-between gap-3 max-md:flex-col">
							<h3 className="font-serif text-lg font-semibold text-white max-md:text-base">
								{query.question}
							</h3>
							<Badge status={STATUS_BADGE[query.status]}>
								{query.status}
							</Badge>
						</div>

						{query.answer && (
							<div className="my-4 rounded-sm border-l-4 border-brand-gold bg-brand-panel-light p-4">
								<div className="mb-1 text-sm font-semibold uppercase tracking-[0.05em] text-brand-gold">
									Response from builder:
								</div>
								<div className="text-base leading-6 text-white">
									{query.answer}
								</div>
							</div>
						)}

						<div className="mt-4 flex gap-3 border-t border-brand-border pt-4 text-sm text-brand-muted">
							<span className="flex items-center">
								{new Date(
									query.created_at,
								).toLocaleDateString()}
							</span>
						</div>
					</Card>
				</div>
			))}
		</div>
	);
}
