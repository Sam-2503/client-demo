const services = [
	{
		title: "Civil Completion",
		detail: "Structural finishing, facade packages, and handover-ready execution.",
	},
	{
		title: "Interior Fit-Out",
		detail: "Design-to-delivery interiors with strict workmanship standards.",
	},
	{
		title: "MEP Coordination",
		detail: "Integrated electrical and plumbing systems with documented QA.",
	},
	{
		title: "Material Governance",
		detail: "Approved vendors, controlled procurement, and audit-ready logs.",
	},
];

export default function ServicesPreview() {
	return (
		<section className="px-4 py-24 md:px-8" id="services">
			<div className="mx-auto max-w-[1280px] rounded-2xl border border-white/10 bg-[linear-gradient(140deg,#122338_0%,#213b57_60%,#2c4a64_100%)] p-7 md:p-10">
				<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div>
						<div className="text-[11px] uppercase tracking-[0.18em] text-[#e4d0a9]">
							Core Services
						</div>
						<h2 className="mt-3 font-serif text-[clamp(2rem,3.4vw,3rem)] text-[#f6f2ea]">
							Comprehensive Construction Delivery Under One Team
						</h2>
					</div>
					<a
						href="/services"
						className="inline-flex h-11 items-center justify-center rounded-md border border-[#dfc598]/40 bg-[#dfc598] px-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#122338] transition hover:brightness-105"
					>
						View Service Details
					</a>
				</div>

				<div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
					{services.map((service) => (
						<article
							key={service.title}
							className="rounded-xl border border-white/15 bg-[rgba(8,16,26,0.34)] p-5"
						>
							<h3 className="font-serif text-2xl text-[#f4ead7]">
								{service.title}
							</h3>
							<p className="mt-2 text-[0.93rem] leading-7 text-[#c6d2e4]">
								{service.detail}
							</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
