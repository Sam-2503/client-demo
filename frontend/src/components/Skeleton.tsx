import React from "react";
import "./styles/Skeleton.css";
import { cn } from "../utils/cn";

type SkeletonType = "text" | "circle" | "rect" | "card";

interface SkeletonProps {
	type?: SkeletonType;
	count?: number;
	width?: string | number;
	height?: string | number;
	className?: string;
}

export default function Skeleton({
	type = "text",
	count = 1,
	width,
	height,
	className,
}: SkeletonProps) {
	const style: React.CSSProperties = {};

	if (width) {
		style.width = typeof width === "number" ? `${width}px` : width;
	}

	if (height) {
		style.height = typeof height === "number" ? `${height}px` : height;
	}

	const skeletons = Array.from({ length: count }, (_, i) => (
		<div
			key={i}
			className={cn("skeleton", `skeleton-${type}`, className)}
			style={style}
		/>
	));

	if (type === "card") {
		return (
			<div className="skeleton-card">
				<div
					className="skeleton skeleton-rect"
					style={{ height: "120px" }}
				/>
				<div className="skeleton-card-content">
					<div className="skeleton skeleton-text" />
					<div
						className="skeleton skeleton-text"
						style={{ width: "80%" }}
					/>
				</div>
			</div>
		);
	}

	return <>{skeletons}</>;
}
