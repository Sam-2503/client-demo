import React from "react";
import "./styles/Select.css";
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
		<div
			className={cn(
				"select-group",
				fullWidth && "select-group-full",
				error && "select-group-error",
			)}
		>
			{label && (
				<label htmlFor={selectId} className="select-label">
					{label}
				</label>
			)}
			<select
				id={selectId}
				className={cn("select", className)}
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
			{error && <span className="select-error">{error}</span>}
		</div>
	);
}
