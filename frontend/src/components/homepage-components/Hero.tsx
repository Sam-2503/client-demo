export default function Hero() {
	const primaryBtnClass =
		"inline-flex items-center justify-center rounded-md border border-[#d5b47a]/40 bg-[linear-gradient(90deg,#dac195_0%,#b3833f_100%)] px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0e1722] transition hover:-translate-y-0.5 hover:brightness-110";
	const outlineBtnClass =
		"inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-7 py-3 text-[12px] font-medium uppercase tracking-[0.14em] text-[#e6ebf2] transition hover:border-[#d5b47a]/55 hover:text-[#f2e7d4]";
	const trustPillClass =
		"rounded-md border border-white/15 bg-white/5 px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-[#d2d8e1]";

	return (
		<section
			className="relative overflow-hidden bg-[linear-gradient(160deg,#070c14_0%,#0e1b2d_55%,#1b3248_100%)] px-4 pb-20 pt-32 md:px-8 md:pb-24 md:pt-40"
			id="home"
		>
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_90%_at_85%_0%,rgba(213,180,122,0.18)_0%,transparent_62%),radial-gradient(55%_50%_at_10%_35%,rgba(70,109,146,0.26)_0%,transparent_70%)]" />
			<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:66px_66px] opacity-30" />

			<div className="relative mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
				<div className="animate-fade-up">
					<div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d5b47a]/35 bg-[#d5b47a]/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#efdcbc]">
						Civil + Interior Delivery Experts
					</div>

					<h1 className="font-serif text-[clamp(2.4rem,5.4vw,4.9rem)] font-semibold leading-[1.07] text-[#f6f3ec]">
						Precision Construction.
						<br />
						<span className="text-[#d5b47a]">
							Transparent Project Delivery.
						</span>
					</h1>

					<p className="mt-6 max-w-[650px] text-[1.03rem] leading-8 text-[#c8d1dd]">
						RJS Homes combines two decades of site execution with
						digital reporting, milestone-led planning, and rigorous
						quality control to deliver homes and interiors that are
						crafted to last.
					</p>

					<div className="mt-8 flex flex-wrap gap-3">
						<a href="#projects" className={primaryBtnClass}>
							Explore Projects
						</a>
						<a href="#contact" className={outlineBtnClass}>
							Schedule Consultation
						</a>
					</div>

					<div className="mt-8 flex flex-wrap gap-3">
						<div className={trustPillClass}>Since 2002</div>
						<div className={trustPillClass}>
							500+ Homes Delivered
						</div>
						<div className={trustPillClass}>
							Dedicated Project Portal
						</div>
					</div>
				</div>

				<div className="animate-fade-in rounded-xl border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.03)_100%)] p-5 shadow-[0_24px_48px_rgba(0,0,0,0.4)] backdrop-blur-lg">
					<div className="rounded-lg border border-white/10 bg-[#111f33] p-5">
						<div className="text-[11px] uppercase tracking-[0.14em] text-[#aeb8c7]">
							Live Delivery Blueprint
						</div>
						<h3 className="mt-2 font-serif text-2xl text-[#f5efe3]">
							Jubilee Hills Residential Build
						</h3>
						<div className="mt-4 space-y-3">
							{[
								{
									label: "Structure & Envelope",
									value: "100%",
								},
								{ label: "MEP Integration", value: "86%" },
								{ label: "Interior Fit-Out", value: "64%" },
							].map((item) => (
								<div key={item.label}>
									<div className="mb-1 flex items-center justify-between text-[12px] text-[#d3dae5]">
										<span>{item.label}</span>
										<span className="font-semibold text-[#f2e4c9]">
											{item.value}
										</span>
									</div>
									<div className="h-2 rounded-full bg-[#21344f]">
										<div
											className="h-full rounded-full bg-[linear-gradient(90deg,#d8bc8f_0%,#af7c38_100%)]"
											style={{ width: item.value }}
										/>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="mt-4 grid grid-cols-3 gap-3">
						{[
							{ value: "20+", label: "Years" },
							{ value: "50+", label: "Projects" },
							{ value: "99%", label: "On-Time" },
						].map((metric) => (
							<div
								key={metric.label}
								className="rounded-lg border border-white/10 bg-[#0e1a2b] p-3 text-center"
							>
								<div className="font-serif text-2xl text-[#d8bc8f]">
									{metric.value}
								</div>
								<div className="text-[10px] uppercase tracking-[0.12em] text-[#9aa8bd]">
									{metric.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
