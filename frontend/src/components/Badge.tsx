import React from "react";
import { cn } from "../utils/cn";

type BadgeStatus = "done" | "active" | "pending" | "blocked" | "default";

interface BadgeProps {
	status: BadgeStatus;
	children: React.ReactNode;
	className?: string;
	size?: "sm" | "md";
}

export default function Badge({
	status,
	children,
	className,
	size = "md",
}: BadgeProps) {
	const statusClass: Record<BadgeStatus, string> = {
		done: "border-[rgba(39,174,96,0.3)] bg-[rgba(39,174,96,0.15)] text-[#27ae60] hover:border-[rgba(39,174,96,0.5)] hover:bg-[rgba(39,174,96,0.25)]",
		active: "border-[rgba(41,128,185,0.3)] bg-[rgba(41,128,185,0.15)] text-[#2980b9] hover:border-[rgba(41,128,185,0.5)] hover:bg-[rgba(41,128,185,0.25)]",
		pending:
			"border-[rgba(230,126,34,0.3)] bg-[rgba(230,126,34,0.15)] text-[#e67e22] hover:border-[rgba(230,126,34,0.5)] hover:bg-[rgba(230,126,34,0.25)]",
		blocked:
			"border-[rgba(192,57,43,0.3)] bg-[rgba(192,57,43,0.15)] text-[#c0392b] hover:border-[rgba(192,57,43,0.5)] hover:bg-[rgba(192,57,43,0.25)]",
		default:
			"border-[rgba(127,140,141,0.3)] bg-[rgba(127,140,141,0.15)] text-[#7f8c8d] hover:border-[rgba(127,140,141,0.5)] hover:bg-[rgba(127,140,141,0.25)]",
	};

	const sizeClass: Record<"sm" | "md", string> = {
		sm: "px-1.5 py-0.5",
		md: "px-2 py-1",
	};

	return (
		<span
			className={cn(
				"inline-flex whitespace-nowrap rounded-sm border text-[0.65rem] font-semibold uppercase tracking-[0.08em] transition",
				statusClass[status],
				sizeClass[size],
				className,
			)}
		>
			{children}
		</span>
	);
}
