import React from "react";
import "./styles/Card.css";
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
		<div className={cn("card", hoverable && "card-hoverable", className)}>
			{header && <div className="card-header">{header}</div>}
			<div className="card-content">{children}</div>
			{footer && <div className="card-footer">{footer}</div>}
		</div>
	);
}
