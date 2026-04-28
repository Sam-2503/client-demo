export default function Hero() {
	const primaryBtnClass =
		"inline-block border-0 bg-brand-gold px-8 py-3.5 text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-brand-black transition duration-200 hover:-translate-y-0.5 hover:bg-brand-gold-light hover:shadow-glow";
	const outlineBtnClass =
		"inline-block border border-[#444] px-8 py-3.5 text-[0.85rem] uppercase tracking-[0.1em] text-white transition duration-200 hover:border-brand-gold hover:text-brand-gold";
	return (
		<section
			className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#080808] px-4 pb-16 pt-28 md:px-[5vw] md:pb-20 md:pt-32"
			id="home"
		>
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(200,151,31,0.06)_0%,transparent_70%)]"></div>
			<div className="absolute bottom-0 left-0 top-0 w-[5px] bg-brand-gold"></div>
			<div className="relative max-w-[640px] animate-fade-up">
				<div className="mb-6 flex items-center gap-2.5 text-[0.78rem] uppercase tracking-[0.2em] text-brand-gold before:h-px before:w-8 before:bg-brand-gold before:content-['']">
					Hyderabad's Premium Real Estate
				</div>
				<h1 className="mb-6 font-serif text-[clamp(2.8rem,6vw,5rem)] font-bold leading-[1.1]">
					Building Dreams
					<br />
					<span className="text-brand-gold">Since 2002</span>
				</h1>
				<p className="mb-10 max-w-[520px] text-[1.05rem] leading-[1.7] text-brand-muted-light">
					From our father's legacy of craftsmanship to a fully
					transparent, technology-driven real estate experience — RJS
					Homes delivers quality, trust, and innovation.
				</p>
				<div className="flex flex-wrap gap-4">
					<a href="#projects" className={primaryBtnClass}>
						View Our Projects
					</a>
					<a href="#about" className={outlineBtnClass}>
						Our Story
					</a>
				</div>
			</div>
			<div className="relative mt-10 flex animate-fade-in flex-row justify-center gap-6 md:absolute md:right-[5vw] md:top-1/2 md:mt-0 md:-translate-y-1/2 md:flex-col md:gap-6">
				<div className="text-center">
					<div className="font-serif text-5xl font-bold leading-none text-brand-gold">
						20+
					</div>
					<div className="mt-1 text-[0.72rem] uppercase tracking-[0.12em] text-brand-muted">
						Years
					</div>
				</div>
				<div className="mx-auto h-8 w-px bg-[#333]"></div>
				<div className="text-center">
					<div className="font-serif text-5xl font-bold leading-none text-brand-gold">
						500+
					</div>
					<div className="mt-1 text-[0.72rem] uppercase tracking-[0.12em] text-brand-muted">
						Families
					</div>
				</div>
				<div className="mx-auto h-8 w-px bg-[#333]"></div>
				<div className="text-center">
					<div className="font-serif text-5xl font-bold leading-none text-brand-gold">
						50+
					</div>
					<div className="mt-1 text-[0.72rem] uppercase tracking-[0.12em] text-brand-muted">
						Projects
					</div>
				</div>
			</div>
		</section>
	);
}
