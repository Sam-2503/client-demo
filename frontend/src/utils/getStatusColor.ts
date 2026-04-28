export const getStatusColor = (status: string): string => {
	switch (status.toLowerCase()) {
		case "completed":
		case "done":
			return "var(--green)";
		case "in_progress":
		case "active":
			return "var(--blue)";
		case "pending":
			return "var(--orange)";
		case "on_hold":
		case "blocked":
			return "var(--red)";
		default:
			return "var(--gray)";
	}
};
