export default function Process() {
	const processSteps = [
		{
			step: "01",
			title: "Consultation",
			description:
				"Understand scope, priorities, and timeline with a practical project brief.",
		},
		{
			step: "02",
			title: "Planning",
			description:
				"Finalize drawings, technical details, materials, and phased execution plan.",
		},
		{
			step: "03",
			title: "Execution",
			description:
				"On-site delivery with schedule tracking, quality checks, and regular updates.",
		},
		{
			step: "04",
			title: "Handover",
			description:
				"Final walkthrough, finishing checks, and clean handover with closure support.",
		},
	];
	return (
		<section className="px-4 py-14 md:px-8" id="process">
			<div className="mx-auto max-w-[1240px]">
				<h2 className="text-[clamp(1.8rem,3.4vw,2.7rem)] font-semibold text-[#1f2a34]">
					Our Process
				</h2>
				<div className="mt-8 grid gap-4 md:grid-cols-4">
					{processSteps.map((step) => (
						<div
							key={step.step}
							className="rounded-[10px] border border-black/10 bg-[#f1f5f8] p-5"
						>
							<div className="text-xs font-semibold tracking-[0.12em] text-[#5e6b79]">
								STEP {step.step}
							</div>
							<h3 className="mt-2 text-xl font-semibold text-[#1e2a35]">
								{step.title}
							</h3>
							<p className="mt-2 text-sm leading-6 text-[#5b6775]">
								{step.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
