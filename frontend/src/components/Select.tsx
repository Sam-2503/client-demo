import React from "react";
import { cn } from "../utils/cn";

interface SelectOption {
	value: string | number;
	label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	error?: string;
	options: SelectOption[];
	placeholder?: string;
	fullWidth?: boolean;
}

export default function Select({
	label,
	error,
	options,
	placeholder,
	fullWidth = true,
	className,
	id,
	...props
}: SelectProps) {
	const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

	return (
		<div className={cn("group flex flex-col gap-2", fullWidth && "w-full")}>
			{label && (
				<label
					htmlFor={selectId}
					className="text-xs font-semibold uppercase tracking-[0.06em] text-brand-muted transition-colors duration-300 group-focus-within:text-brand-gold"
				>
					{label}
				</label>
			)}
			<select
				id={selectId}
				className={cn(
					"w-full appearance-none rounded-md border border-brand-border bg-brand-panel bg-[length:12px] bg-[position:right_12px_center] bg-no-repeat px-4 py-3 pr-9 text-sm text-white outline-none transition-all duration-300 hover:border-brand-border-light hover:bg-[rgba(200,151,31,0.02)] focus:border-brand-gold focus:bg-[rgba(200,151,31,0.05)] focus:ring-2 focus:ring-brand-gold/10 disabled:cursor-not-allowed disabled:bg-brand-panel-light disabled:opacity-50",
					error &&
						"border-[#c0392b] bg-[rgba(192,57,43,0.05)] focus:border-[#c0392b] focus:ring-[rgba(192,57,43,0.2)]",
					"bg-[url('data:image/svg+xml,%3Csvgxmlns=%22http://www.w3.org/2000/svg%22width=%2212%22height=%228%22viewBox=%220001228%22%3E%3Cpathfill=%22%23C8971F%22d=%22M111556-5%22/%3E%3C/svg%3E')]",
					className,
				)}
				{...props}
			>
				{placeholder && (
					<option value="" disabled>
						{placeholder}
					</option>
				)}
				{options.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
			{error && (
				<span className="mt-1 text-[0.65rem] font-medium text-[#c0392b]">
					{error}
				</span>
			)}
		</div>
	);
}
