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
		done: "border-black/10 bg-[#eef3f6] text-[#475462] hover:border-black/20 hover:bg-white",
		active: "border-black/10 bg-[#eef3f6] text-[#475462] hover:border-black/20 hover:bg-white",
		pending:
			"border-black/10 bg-[#eef3f6] text-[#475462] hover:border-black/20 hover:bg-white",
		blocked:
			"border-black/10 bg-[#eef3f6] text-[#475462] hover:border-black/20 hover:bg-white",
		default:
			"border-black/10 bg-[#eef3f6] text-[#475462] hover:border-black/20 hover:bg-white",
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
