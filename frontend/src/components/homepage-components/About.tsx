export default function About() {
	const primaryBtnClass =
		"inline-block border-0 bg-brand-gold px-8 py-3.5 text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-brand-black transition duration-200 hover:-translate-y-0.5 hover:bg-brand-gold-light hover:shadow-glow";

	const outlineBtnClass =
		"inline-block border border-[#444] px-8 py-3.5 text-[0.85rem] uppercase tracking-[0.1em] text-white transition duration-200 hover:border-brand-gold hover:text-brand-gold";

	const sectionLabelClass =
		"mb-4 text-xs uppercase tracking-[0.2em] text-brand-gold";

	return (
		<section className="bg-[#111111] px-4 py-24 md:px-[5vw]" id="about">
			<div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-16 md:grid-cols-2">
				<div>
					<div className="border-l-[3px] border-brand-gold bg-[#1a1a1a] p-8">
						<div>
							<h4 className="mb-2 text-[1.1rem] font-semibold">
								Raman Jee Sharma
							</h4>
							<p className="text-[0.85rem] text-brand-muted">
								Founder & Director, RJS Homes
							</p>
						</div>
					</div>
				</div>
				<div>
					<div className={sectionLabelClass}>Our Story</div>
					<h2 className="mb-6 font-serif text-4xl font-bold leading-[1.2] md:text-5xl">
						From My Father's Workshop
						<br />
						to Your Dream Home
					</h2>
					<blockquote className="my-8 border-l-[3px] border-brand-gold pl-6 text-[1.1rem] italic text-brand-muted-light">
						"Building isn't just about structures — it's about
						building trust, family legacies, and futures."
					</blockquote>
					<div className="space-y-4 text-[0.95rem] leading-[1.8] text-brand-muted-light">
						<p>
							Growing up in Hyderabad, I had a front-row seat to
							my father's furniture contracting business — a
							venture he poured his heart into for over two
							decades. He built with his hands and his values.
						</p>
						<p>
							That gap — between what was promised and what
							clients could verify — became the mission I built
							RJS Homes around. When transparency became our first
							principle, everything changed.
						</p>
						<p>
							Today, RJS Homes is a bridge between two
							generations. We carry forward two decades of
							on-ground expertise, trusted suppliers, and
							craftsmen — and we pair it with technology, systems,
							and radical transparency.
						</p>
						<p>
							<strong>
								This isn't just real estate. It's your family's
								future — and we take that seriously.
							</strong>
						</p>
					</div>
					<div className="my-8 grid grid-cols-2 gap-4 md:grid-cols-4">
						{[
							"Transparency",
							"Quality",
							"Legacy",
							"Innovation",
						].map((value) => (
							<div
								key={value}
								className="border border-[#333] bg-brand-panel p-4 text-center text-[0.85rem] font-semibold"
							>
								{value}
							</div>
						))}
					</div>
					<div className="mt-8 flex flex-wrap gap-4">
						<a href="#projects" className={primaryBtnClass}>
							Explore Projects
						</a>
						<a href="#contact" className={outlineBtnClass}>
							Get In Touch
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
