export default function Differentiator() {
	const differentiators = [
		{
			title: "Ground-Level Execution",
			description:
				"We stay directly involved on-site, ensuring decisions are practical and work progresses without unnecessary delays.",
		},
		{
			title: "Consistent Quality Checks",
			description:
				"Materials and workmanship are reviewed at every stage to avoid rework and maintain long-term durability.",
		},
		{
			title: "Clear Communication",
			description:
				"You’re always aware of what’s happening — timelines, changes, and progress are shared without confusion.",
		},
		{
			title: "Integrated Furniture Support",
			description:
				"Alongside construction, we make essential furniture available without long waiting periods, helping you complete spaces faster.",
		},
	];
	return (
		<section className="bg-white px-4 py-14 md:px-8" id="why-choose">
			<div className="mx-auto max-w-[1240px]">
				<h2 className="text-[clamp(1.8rem,3.4vw,2.7rem)] font-semibold text-[#1f2b35]">
					Why Choose RJS Homes
				</h2>
				<p className="mt-2 max-w-[780px] text-[15px] text-[#5a6674]">
					We focus on practical execution, reliable communication, and
					workmanship that stands up over time.
				</p>
				<div className="mt-8 grid gap-4 md:grid-cols-4">
					{differentiators.map((item) => (
						<div
							key={item.title}
							className="rounded-[10px] border border-black/10 bg-[#f7f4ed] p-5"
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
