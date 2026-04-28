const principles = [
	"Site-first execution discipline",
	"Transparent material and milestone reporting",
	"Multi-stage quality checks",
	"Clear financial visibility",
	"Single accountable project owner",
	"Post-handover support",
];

const milestones = [
	{
		title: "Legacy in Craftsmanship",
		copy: "RJS Homes began with deep on-ground contracting expertise and a culture of quality workmanship.",
	},
	{
		title: "Process-Driven Expansion",
		copy: "The company evolved into structured project delivery with reliable vendor ecosystems and tested site workflows.",
	},
	{
		title: "Technology-Led Transparency",
		copy: "Today, clients receive clear progress communication through digital updates and documented milestones.",
	},
];

export default function About() {
	return (
		<section className="px-4 py-24 md:px-8" id="about">
			<div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 lg:grid-cols-[1.05fr_1fr]">
				<div className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(10,18,30,0.95)_0%,rgba(18,31,48,0.92)_100%)] p-7 md:p-10">
					<div className="text-[11px] uppercase tracking-[0.18em] text-[#c9aa72]">
						About RJS Homes
					</div>
					<h2 className="mt-4 font-serif text-[clamp(2rem,3.7vw,3.4rem)] leading-[1.15] text-[#f5efe3]">
						A Construction Partner Built on Trust, Process, and
						Precision.
					</h2>
					<p className="mt-6 text-[0.98rem] leading-8 text-[#bec9d8]">
						We build homes the way they should be built: with
						disciplined planning, responsible budgeting, strong site
						supervision, and consistent communication. Every project
						is engineered to reduce risk and improve decision
						clarity for families.
					</p>
					<p className="mt-4 text-[0.98rem] leading-8 text-[#bec9d8]">
						From structural coordination to final finishes, RJS
						Homes integrates civil and interior execution under one
						accountable delivery framework.
					</p>

					<div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
						{principles.map((item) => (
							<div
								key={item}
								className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#d8e1ef]"
							>
								{item}
							</div>
						))}
					</div>
				</div>

				<div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(12,22,35,0.92)_0%,rgba(14,26,42,0.92)_100%)] p-7 md:p-10">
					<div className="text-[11px] uppercase tracking-[0.18em] text-[#c9aa72]">
						Growth Journey
					</div>
					<div className="mt-6 space-y-5">
						{milestones.map((item, index) => (
							<div key={item.title} className="relative pl-8">
								<div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-[#c9aa72]" />
								{index < milestones.length - 1 && (
									<div className="absolute left-[5px] top-5 h-[calc(100%-8px)] w-px bg-[#c9aa72]/40" />
								)}
								<h3 className="font-serif text-2xl text-[#f2e7d4]">
									{item.title}
								</h3>
								<p className="mt-2 text-[0.95rem] leading-7 text-[#aebbd0]">
									{item.copy}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
