import type { ProjectStatus } from "../types";

export const statusBadgeColor = (
	status: ProjectStatus,
): { bg: string; text: string; dot: string } => {
	switch (status) {
		case "completed":
			return {
				bg: "rgba(39, 174, 96, 0.15)",
				text: "#27AE60",
				dot: "#27AE60",
			};
		case "in_progress":
			return {
				bg: "rgba(41, 128, 185, 0.15)",
				text: "#2980B9",
				dot: "#2980B9",
			};
		case "on_hold":
			return {
				bg: "rgba(230, 126, 34, 0.15)",
				text: "#E67E22",
				dot: "#E67E22",
			};
		case "planning":
			return {
				bg: "rgba(149, 165, 166, 0.15)",
				text: "#7F8C8D",
				dot: "#7F8C8D",
			};
		default:
			return {
				bg: "rgba(127, 140, 141, 0.15)",
				text: "#95A5A6",
				dot: "#95A5A6",
			};
	}
};

export const getStatusColor = (status: string): string => {
	switch (status.toLowerCase()) {
		case "completed":
		case "done":
			return "#27AE60";
		case "in_progress":
		case "active":
			return "#2980B9";
		case "pending":
			return "#E67E22";
		case "on_hold":
		case "blocked":
			return "#C0392B";
		default:
			return "#95A5A6";
	}
};
