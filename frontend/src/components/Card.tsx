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
				"overflow-hidden rounded-lg border border-brand-border bg-brand-card transition",
				hoverable &&
					"cursor-pointer hover:border-brand-gold hover:bg-[#1a1a1a] hover:shadow-[0_4px_16px_rgba(200,151,31,0.15)] active:-translate-y-0.5 active:shadow-[0_6px_20px_rgba(200,151,31,0.2)]",
				className,
			)}
		>
			{header && (
				<div className="border-b border-brand-border bg-[rgba(200,151,31,0.03)] p-4">
					{header}
				</div>
			)}
			<div className="p-4">{children}</div>
			{footer && (
				<div className="border-t border-brand-border bg-[rgba(255,255,255,0.02)] p-4">
					{footer}
				</div>
			)}
		</div>
	);
}
