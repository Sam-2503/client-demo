export default function Footer() {
	return (
		<footer className="border-t border-[#1a1a1a] bg-brand-black px-4 pb-8 pt-12 md:px-[5vw]">
			<div className="mx-auto mb-8 grid max-w-[1200px] grid-cols-1 gap-8 md:grid-cols-3">
				<div>
					<h4 className="mb-4 text-base font-semibold text-brand-gold">
						RJS HOMES
					</h4>
					<p className="text-[0.85rem] leading-[1.6] text-brand-muted-light">
						Building dreams since 2002. Transparency, quality, and
						innovation in every project.
					</p>
				</div>
				<div>
					<h4 className="mb-4 text-base font-semibold text-brand-gold">
						Quick Links
					</h4>
					<ul className="space-y-2">
						<li>
							<a
								href="#home"
								className="text-[0.85rem] text-brand-muted-light transition hover:text-brand-gold"
							>
								Home
							</a>
						</li>
						<li>
							<a
								href="#about"
								className="text-[0.85rem] text-brand-muted-light transition hover:text-brand-gold"
							>
								About
							</a>
						</li>
						<li>
							<a
								href="#projects"
								className="text-[0.85rem] text-brand-muted-light transition hover:text-brand-gold"
							>
								Projects
							</a>
						</li>
						<li>
							<a
								href="#contact"
								className="text-[0.85rem] text-brand-muted-light transition hover:text-brand-gold"
							>
								Contact
							</a>
						</li>
					</ul>
				</div>
				<div>
					<h4 className="mb-4 text-base font-semibold text-brand-gold">
						Legal
					</h4>
					<ul className="space-y-2">
						<li>
							<a
								href="#"
								className="text-[0.85rem] text-brand-muted-light transition hover:text-brand-gold"
							>
								Privacy Policy
							</a>
						</li>
						<li>
							<a
								href="#"
								className="text-[0.85rem] text-brand-muted-light transition hover:text-brand-gold"
							>
								Terms & Conditions
							</a>
						</li>
						<li>
							<a
								href="#"
								className="text-[0.85rem] text-brand-muted-light transition hover:text-brand-gold"
							>
								Disclaimer
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="border-t border-[#1a1a1a] pt-8 text-center text-[0.8rem] text-brand-muted">
				<p>&copy; 2024 RJS Homes. All rights reserved.</p>
			</div>
		</footer>
	);
}
