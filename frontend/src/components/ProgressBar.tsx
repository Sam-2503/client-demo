import React from "react";
import { cn } from "../utils/cn";

interface ProgressBarProps {
	value: number;
	max?: number;
	label?: string | React.ReactNode;
	size?: "sm" | "md" | "lg";
	animated?: boolean;
	showPercent?: boolean;
	className?: string;
}

export default function ProgressBar({
	value,
	max = 100,
	label,
	size = "md",
	animated = true,
	showPercent = true,
	className,
}: ProgressBarProps) {
	const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
	const sizeClass: Record<NonNullable<ProgressBarProps["size"]>, string> = {
		sm: "h-1",
		md: "h-2",
		lg: "h-3",
	};

	return (
		<div className={cn("flex w-full flex-col gap-2", className)}>
			{(label || showPercent) && (
				<div className="flex items-center justify-between gap-3 text-sm">
					{label && (
						<span className="text-sm font-medium text-brand-muted">
							{label}
						</span>
					)}
					{showPercent && (
						<span className="text-sm font-semibold text-brand-gold">
							{Math.round(percentage)}%
						</span>
					)}
				</div>
			)}
			<div className={cn("w-full overflow-hidden rounded-sm border border-brand-border bg-brand-panel", sizeClass[size])}>
				<div
					className={cn(
						"h-full rounded-sm bg-gradient-to-r from-brand-gold to-brand-gold-light transition-[width] duration-300 ease-out",
					)}
					style={{
						width: `${percentage}%`,
						animation: animated ? "pulse 2s infinite" : undefined,
					}}
				></div>
			</div>
		</div>
	);
}
