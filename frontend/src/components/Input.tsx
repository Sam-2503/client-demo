import React from "react";
import { cn } from "../utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	helperText?: string;
	fullWidth?: boolean;
}

export default function Input({
	label,
	error,
	helperText,
	fullWidth = true,
	className,
	id,
	...props
}: InputProps) {
	const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

	return (
		<div
			className={cn(
				"flex flex-col gap-2",
				fullWidth && "w-full",
			)}
		>
			{label && (
				<label
					htmlFor={inputId}
					className={cn(
						"text-sm font-semibold uppercase tracking-[0.06em] transition",
						error ? "text-red-300" : "text-brand-muted",
					)}
				>
					{label}
				</label>
			)}
			<input
				id={inputId}
				className={cn(
					"w-full rounded-md border border-brand-border bg-brand-panel px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#3a3a3a] hover:border-brand-border-light hover:bg-[rgba(200,151,31,0.02)] focus:border-brand-gold focus:bg-[rgba(200,151,31,0.05)] focus:ring-2 focus:ring-brand-gold/10 disabled:cursor-not-allowed disabled:bg-brand-panel-light disabled:opacity-50",
					error &&
						"border-red-700 bg-[rgba(192,57,43,0.05)] focus:border-red-500 focus:ring-red-500/10",
					className,
				)}
				{...props}
			/>
			{error && <span className="text-xs font-medium text-red-400">{error}</span>}
			{helperText && !error && (
				<span className="text-xs text-brand-muted">{helperText}</span>
			)}
		</div>
	);
}
