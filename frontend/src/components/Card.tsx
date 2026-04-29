import React from "react";
import { cn } from "../utils/cn";

interface CardProps {
	children: React.ReactNode;
	className?: string;
	header?: React.ReactNode;
	footer?: React.ReactNode;
	hoverable?: boolean;
}

export default function Card({
	children,
	className,
	header,
	footer,
	hoverable = false,
}: CardProps) {
	return (
		<div
			className={cn(
				"overflow-hidden rounded-lg border border-black/10 bg-[rgba(224,234,242,0.3)] transition",
				hoverable &&
					"cursor-pointer hover:border-black/20 hover:bg-[rgba(224,234,242,0.5)] hover:shadow-[0_4px_16px_rgba(31,42,52,0.08)] active:-translate-y-0.5 active:shadow-[0_6px_20px_rgba(31,42,52,0.1)]",
				className,
			)}
		>
			{header && (
				<div className="border-b border-black/10 bg-[#f8fafb] p-4">
					{header}
				</div>
			)}
			<div className="p-4">{children}</div>
			{footer && (
				<div className="border-t border-black/10 bg-[#f8fafb] p-4">
					{footer}
				</div>
			)}
		</div>
	);
}
