export default function Services() {
	const services = [
		{
			title: "Design and Planning Services",
			description:
				"Clear project planning, drawings, and execution strategy before work begins.",
			image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			title: "Construction and Building",
			description:
				"End-to-end on-site execution with schedule discipline and consistent site supervision.",
			image: "https://images.unsplash.com/photo-1532562145520-b8cce2486cd2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			title: "Furniture at your Doorstep",
			description:
				"Sourced, delivered, and installed with care so you can enjoy your new space without the hassle.",
			image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
	];
	return (
		<section className="px-4 py-14 md:px-8" id="services">
			<div className="mx-auto max-w-[1240px]">
				<h2 className="text-[clamp(1.8rem,3.5vw,2.9rem)] font-semibold text-[#1f2b35]">
					Tailored Construction Solutions
				</h2>
				<p className="mt-2 max-w-[760px] text-[15px] text-[#51606e]">
					From planning till interiors, our services are structured
					for clarity, accountability, and speed.
				</p>

				<div className="mt-8 grid gap-5 md:grid-cols-3">
					{services.map((service) => (
						<article
							key={service.title}
							className="group relative min-h-[260px] overflow-hidden rounded-[12px] border border-black/10"
						>
							<img
								src={service.image}
								alt={service.title}
								className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
							<div className="absolute inset-x-0 bottom-0 p-5 text-white">
								<h3 className="text-xl font-semibold leading-tight">
									{service.title}
								</h3>
								<p className="mt-2 text-sm leading-6 text-white/85">
									{service.description}
								</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
