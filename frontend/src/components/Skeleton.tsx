import React from "react";
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
	const baseClass =
		"animate-pulse rounded-md bg-gradient-to-r from-brand-panel via-brand-panel-light to-brand-panel";

	const typeClass: Record<Exclude<SkeletonType, "card">, string> = {
		text: "mb-3 h-[14px] w-full",
		circle: "h-10 w-10 rounded-full",
		rect: "h-[120px] w-full",
	};

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
			className={cn(
				baseClass,
				type !== "card" && typeClass[type],
				className,
			)}
			style={style}
		/>
	));

	if (type === "card") {
		return (
			<div className="overflow-hidden rounded-lg border border-brand-border bg-brand-card">
				<div
					className={cn(baseClass, "h-[120px] rounded-none")}
					style={{ height: "120px" }}
				/>
				<div className="flex flex-col gap-3 p-4">
					<div className={cn(baseClass, "h-[14px] w-full")} />
					<div
						className={cn(baseClass, "h-[14px] w-4/5")}
						style={{ width: "80%" }}
					/>
				</div>
			</div>
		);
	}

	return <>{skeletons}</>;
}
