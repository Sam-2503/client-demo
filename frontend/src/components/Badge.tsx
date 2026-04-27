import React from "react";
import "./styles/Badge.css";
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
	return (
		<span
			className={cn(
				"badge",
				`badge-${status}`,
				`badge-${size}`,
				className,
			)}
		>
			{children}
		</span>
	);
}
