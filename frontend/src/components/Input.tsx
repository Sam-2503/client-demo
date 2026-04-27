import React from "react";
import "./styles/Input.css";
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
				"input-group",
				fullWidth && "input-group-full",
				error && "input-group-error",
			)}
		>
			{label && (
				<label htmlFor={inputId} className="input-label">
					{label}
				</label>
			)}
			<input id={inputId} className={cn("input", className)} {...props} />
			{error && <span className="input-error">{error}</span>}
			{helperText && !error && (
				<span className="input-helper">{helperText}</span>
			)}
		</div>
	);
}
