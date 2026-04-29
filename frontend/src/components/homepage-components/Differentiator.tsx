export default function Differentiator() {
	const differentiators = [
		{
			title: "No Unnecessary Delays",
			description:
				"Projects don’t drag endlessly. Rest assured while work moves with a clear plan and steady progress on-site.",
		},
		{
			title: "No Constant Follow-Ups",
			description:
				"You won’t have to keep calling for updates you we keep you updated without you having to ask.",
		},
		{
			title: "Website and App Support",
			description:
				"All your updates, project details, and communication in one place with our website and app support.",
		},
		{
			title: "Ready-to-Use Spaces",
			description:
				"We don’t stop at construction. We take care of your interior as well, so your space is actually ready to live in.",
		},
	];
	return (
		<section className="bg-white px-4 py-14 md:px-8" id="why-choose">
			<div className="mx-auto max-w-[1240px]">
				<h2 className="text-[clamp(1.8rem,3.4vw,2.7rem)] font-semibold text-[#1f2b35]">
					Why Choose RJS Homes
				</h2>
				<p className="mt-2 max-w-[780px] text-[15px] text-[#5a6674]">
					We focus on execution that stays on track, communication
					that stays clear, and results that hold up over time.
				</p>
				<div className="mt-8 grid gap-4 md:grid-cols-4">
					{differentiators.map((item) => (
						<div
							key={item.title}
							className="rounded-[10px] border border-black/10 bg-[#f1f5f8] p-5"
						>
							<h3 className="text-lg font-semibold text-[#1f2a34]">
								{item.title}
							</h3>
							<p className="mt-2 text-sm leading-6 text-[#586473]">
								{item.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
