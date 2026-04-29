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
		<div className={cn("flex flex-col gap-2", fullWidth && "w-full")}>
			{label && (
				<label
					htmlFor={inputId}
					className={cn(
						"text-sm font-semibold uppercase tracking-[0.06em] transition",
						error ? "text-[#b45309]" : "text-[#5d6a78]",
					)}
				>
					{label}
				</label>
			)}
			<input
				id={inputId}
				className={cn(
					"w-full rounded-md border border-black/10 bg-[#f8fafb] px-4 py-3 text-sm text-[#1f2a34] outline-none transition placeholder:text-[#8b9ba9] hover:border-black/20 hover:bg-white focus:border-black/20 focus:bg-white focus:ring-2 focus:ring-black/10 disabled:cursor-not-allowed disabled:bg-[#f8fafb] disabled:opacity-50",
					error &&
						"border-[#b45309] bg-[#fff7ed] focus:border-[#b45309] focus:ring-[#b45309]/10",
					className,
				)}
				{...props}
			/>
			{error && (
				<span className="text-xs font-medium text-[#b45309]">
					{error}
				</span>
			)}
			{helperText && !error && (
				<span className="text-xs text-[#5d6a78]">{helperText}</span>
			)}
		</div>
	);
}
