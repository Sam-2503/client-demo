import { useState } from "react";
import { cn } from "../../utils/cn";

export default function Projects() {
	const [projectFilter, setProjectFilter] = useState("all");

	const projects = [
		{
			id: 1,
			type: "villa",
			name: "Villa Areca – Jubilee Hills",
			location: "Jubilee Hills, Hyderabad",
			units: "24 Units",
			price: "₹85L – ₹1.2 Cr",
			status: "Active",
			color: "#C8971F",
		},
		{
			id: 2,
			type: "apartment",
			name: "Skyline Block A – Gachibowli",
			location: "Gachibowli, Hyderabad",
			units: "120 Units",
			price: "₹45L – ₹75L",
			status: "Active",
			color: "#1A7ABF",
		},
		{
			id: 3,
			type: "duplex",
			name: "Duplex Row Phase 1 – Kompally",
			location: "Kompally, Hyderabad",
			units: "36 Units",
			price: "₹65L – ₹90L",
			status: "Ongoing",
			color: "#C87830",
		},
		{
			id: 4,
			type: "villa",
			name: "Green Meadows – Shamirpet",
			location: "Shamirpet, Hyderabad",
			units: "48 Units",
			price: "₹1.1 Cr – ₹1.8 Cr",
			status: "New Launch",
			color: "#2A7A2A",
		},
		{
			id: 5,
			type: "commercial",
			name: "Commercial Hub – HITEC City",
			location: "HITEC City, Hyderabad",
			units: "18 Units",
			price: "₹1.5 Cr – ₹3 Cr",
			status: "Completed",
			color: "#8B1A1A",
		},
		{
			id: 6,
			type: "apartment",
			name: "Emerald Heights – Miyapur",
			location: "Miyapur, Hyderabad",
			units: "96 Units",
			price: "₹38L – ₹62L",
			status: "New Launch",
			color: "#1A7ABF",
		},
	];
	const filteredProjects =
		projectFilter === "all"
			? projects
			: projects.filter((p) => p.type === projectFilter);

	const statusClasses: Record<string, string> = {
		active: "bg-[rgba(200,151,31,0.15)] text-brand-gold",
		ongoing: "bg-[rgba(26,122,191,0.15)] text-[#7ec7f5]",
		"new-launch": "bg-[rgba(39,174,96,0.15)] text-[#7ae7a4]",
		completed: "bg-[rgba(192,57,43,0.15)] text-[#f3a39a]",
	};
	const sectionLabelClass =
		"mb-4 text-xs uppercase tracking-[0.2em] text-brand-gold";
	return (
		<section className="bg-[#080808] px-4 py-24 md:px-[5vw]" id="projects">
			<div className="mx-auto mb-12 max-w-[1200px]">
				<div className={sectionLabelClass}>Our Portfolio</div>
				<div className="mt-4 flex items-end justify-between">
					<h2 className="font-serif text-4xl font-bold">
						Featured Projects
					</h2>
					<a href="#" className="text-[0.8rem] text-brand-muted">
						View All →
					</a>
				</div>
			</div>

			<div className="mx-auto my-8 flex max-w-[1200px] flex-wrap justify-center gap-4">
				{["all", "villa", "apartment", "duplex", "commercial"].map(
					(filter) => (
						<button
							key={filter}
							className={cn(
								"border border-[#444] px-5 py-2.5 text-[0.85rem] uppercase tracking-[0.1em] text-brand-muted-light transition",
								projectFilter === filter
									? "border-brand-gold bg-brand-gold text-brand-black"
									: "bg-transparent hover:border-brand-gold hover:text-brand-gold",
							)}
							onClick={() => setProjectFilter(filter)}
						>
							{filter.charAt(0).toUpperCase() + filter.slice(1)}
						</button>
					),
				)}
			</div>

			<div className="mx-auto mt-8 grid max-w-[1200px] grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
				{filteredProjects.map((project) => (
					<div
						key={project.id}
						className="overflow-hidden bg-[#1a1a1a] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)]"
					>
						<div
							className="h-20 w-full"
							style={{ background: project.color }}
						></div>
						<div className="h-[180px] bg-gradient-to-br from-[#222] to-[#111]"></div>
						<div className="p-6">
							<div className="mb-2 text-base font-semibold">
								{project.name}
							</div>
							<div className="mb-4 text-[0.8rem] text-brand-muted">
								{project.location} · {project.units}
							</div>
							<div className="mb-4 font-serif text-[1.1rem] font-semibold text-brand-gold">
								{project.price}
							</div>
							<div className="flex items-center justify-between border-t border-[#333] pt-4">
								<span
									className={cn(
										"rounded-[2px] px-2.5 py-1 text-[0.7rem] uppercase",
										statusClasses[
											project.status
												.toLowerCase()
												.replace(" ", "-")
										] ?? statusClasses.active,
									)}
								>
									{project.status}
								</span>
								<a
									href="#"
									className="text-[0.85rem] text-brand-gold"
								>
									Details →
								</a>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
