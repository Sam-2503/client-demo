export default function Services() {
	const services = [
		{
			title: "Build Your Dream Home",
			route: "/home#contact",
			description:
				"From planning and design to complete construction and building execution with accountability and precision.",
			image: "https://images.unsplash.com/photo-1532562145520-b8cce2486cd2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			title: "Get Furniture Delivered to Your Doorstep",
			route: "/shop",
			description:
				"Curated furniture collections delivered and installed with care right at your doorstep.",
			image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
	];

	return (
		<section className="px-4 py-14 md:px-8" id="services">
			<div className="mx-auto max-w-[1240px]">
				{/* Main Header */}
				<div className="mb-8">
					<h2 className="text-[clamp(1.8rem,3.5vw,2.9rem)] font-semibold text-[#1f2b35]">
						Choose Your Service
					</h2>
					<p className="mt-2 max-w-[1240px] text-[15px] text-[#51606e]">
						We provide construction services and furniture delivery
						services to build your dream home from the plans to the
						final touches.
					</p>
				</div>

				{/* Two Box Layout - Compact Tabs that Expand on Hover */}
				<div className="grid gap-6 md:grid-cols-2">
					{services.map((service) => (
						<a
							href={service.route}
							key={service.title}
							className="group relative h-24 overflow-hidden rounded-[12px] border border-black/10 transition-all duration-500 ease-out hover:h-96 md:h-28 md:hover:h-96"
						>
							<img
								src={service.image}
								alt={service.title}
								className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-500 group-hover:from-black/95 group-hover:via-black/70 group-hover:to-black/40" />
							<div className="absolute inset-0 p-6 text-white flex flex-col justify-end transition-all duration-500 ease-out">
								<h3 className="text-lg font-semibold leading-tight md:text-2xl">
									{service.title}
								</h3>
								<p className="mt-3 max-h-0 overflow-hidden text-sm leading-6 text-white/85 transition-all duration-500 ease-out group-hover:max-h-96">
									{service.description}
								</p>
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}
