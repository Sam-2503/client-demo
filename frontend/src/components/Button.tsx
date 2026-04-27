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
			"border-brand-gold bg-brand-gold text-brand-black hover:-translate-y-0.5 hover:border-brand-gold-light hover:bg-brand-gold-light hover:shadow-[0_4px_16px_rgba(200,151,31,0.3)] focus-visible:outline-brand-gold-dark",
		outline:
			"border-brand-gold bg-transparent text-brand-gold hover:-translate-y-0.5 hover:border-brand-gold-light hover:bg-[rgba(200,151,31,0.15)] hover:shadow-[0_4px_12px_rgba(200,151,31,0.15)] focus-visible:outline-brand-gold",
		secondary:
			"border-brand-border bg-brand-panel text-white hover:-translate-y-0.5 hover:border-brand-gold hover:bg-[#252525] hover:shadow-[0_4px_12px_rgba(200,151,31,0.1)] focus-visible:outline-brand-gold",
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
