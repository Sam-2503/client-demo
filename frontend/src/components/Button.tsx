import React from "react";
import { cn } from "../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "outline" | "secondary";
	size?: "sm" | "md" | "lg";
	children: React.ReactNode;
	isLoading?: boolean;
}

export default function Button({
	variant = "primary",
	size = "md",
	children,
	isLoading = false,
	disabled,
	className,
	...props
}: ButtonProps) {
	const baseClass =
		"inline-flex items-center justify-center gap-2 rounded-md border-2 text-xs font-semibold uppercase tracking-[0.08em] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

	const variantClass = {
		primary:
			"border-black/10 bg-[#1f2a34] text-white hover:-translate-y-0.5 hover:border-black/20 hover:bg-[#2a3641] hover:shadow-[0_4px_16px_rgba(31,42,52,0.18)] focus-visible:outline-[#1f2a34]",
		outline:
			"border-black/10 bg-transparent text-[#475462] hover:-translate-y-0.5 hover:border-black/20 hover:bg-black/5 hover:shadow-[0_4px_12px_rgba(31,42,52,0.08)] focus-visible:outline-[#1f2a34]",
		secondary:
			"border-black/10 bg-[#f8fafb] text-[#1f2a34] hover:-translate-y-0.5 hover:border-black/20 hover:bg-white hover:shadow-[0_4px_12px_rgba(31,42,52,0.08)] focus-visible:outline-[#1f2a34]",
	}[variant];

	const sizeClass = {
		sm: "px-3 py-1.5 text-[0.65rem]",
		md: "px-4 py-2.5 text-[0.72rem]",
		lg: "px-6 py-3.5 text-[0.875rem]",
	}[size];

	return (
		<button
			className={cn(baseClass, variantClass, sizeClass, className)}
			disabled={disabled || isLoading}
			{...props}
		>
			{isLoading ? (
				<>
					<span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
					{children}
				</>
			) : (
				children
			)}
		</button>
	);
}
