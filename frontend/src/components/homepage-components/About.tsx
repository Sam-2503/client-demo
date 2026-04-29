export default function About() {
	return (
		<section className="bg-white px-4 py-14 md:px-8" id="about">
			<div className="mx-auto grid max-w-[1240px] md:grid-cols-[1fr_1.2fr]">
				<div className="min-h-[280px] overflow-hidden rounded-l-[12px] border border-black/10 bg-black">
					<img
						src="/founder.jpeg"
						alt="Founder"
						className="h-full w-full object-cover"
					/>
				</div>
				<div className="rounded-r-[12px] border border-black/10 bg-[#f7f8fa] p-6 md:p-8">
					<h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-semibold text-[#1f2a34]">
						About The Team
					</h2>
					<p className="mt-4 text-[15px] leading-7 text-[#556271]">
						RJS Homes is a focused construction team working at the
						intersection of planning, execution, and practical
						delivery.
					</p>
					<p className="mt-3 text-[15px] leading-7 text-[#556271]">
						We stay closely involved in every project aligning
						design decisions, materials, and timelines without
						unnecessary complexity. The goal is simple: keep the
						process clear and the work consistent from start to
						finish.
					</p>
					<p className="mt-3 text-[15px] leading-7 text-[#556271]">
						Alongside construction, we also make essential furniture
						accessible without long waiting cycles, helping projects
						move forward without delays.
					</p>
					<p className="mt-3 text-[15px] leading-7 text-[#556271]">
						Our founder and core team work directly with clients to
						align design intent, technical choices, and delivery
						timelines through every phase.
					</p>
				</div>
			</div>
		</section>
	);
}
