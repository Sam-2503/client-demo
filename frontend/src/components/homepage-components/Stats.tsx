const stats = [
	{
		value: "20+",
		label: "Years of Execution",
		detail: "Residential and commercial delivery across Hyderabad.",
	},
	{
		value: "500+",
		label: "Homes Delivered",
		detail: "From core shell completion to full interior fit-out.",
	},
	{
		value: "50+",
		label: "Active Teams",
		detail: "Civil, MEP, interior, finishing and QA specialists.",
	},
	{
		value: "99%",
		label: "Schedule Reliability",
		detail: "Milestone-driven planning with weekly progress visibility.",
	},
];

export default function Stats() {
	return (
		<section className="px-4 py-14 md:px-8">
			<div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
				{stats.map((stat) => (
					<article
						key={stat.label}
						className="rounded-xl border border-white/10 bg-[linear-gradient(160deg,rgba(13,24,39,0.9)_0%,rgba(18,33,52,0.9)_100%)] p-5 shadow-[0_16px_36px_rgba(0,0,0,0.28)]"
					>
						<div className="font-serif text-4xl text-[#d8bc8f]">
							{stat.value}
						</div>
						<div className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[#e1e7f0]">
							{stat.label}
						</div>
						<p className="mt-3 text-[13px] leading-6 text-[#9eabc0]">
							{stat.detail}
						</p>
					</article>
				))}
			</div>
		</section>
	);
}
