export default function Footer() {
	return (
		<footer className="border-t border-gray-200 bg-gray-50 px-4 py-12 md:px-8">
			<div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 md:grid-cols-4">
				<div>
					<div className="font-serif text-xl font-bold text-gray-900">
						RJS Homes
					</div>
					<p className="mt-3 max-w-[300px] text-sm leading-7 text-gray-600">
						Building quality construction and interiors with
						discipline, transparency, and rigorous site execution.
					</p>
				</div>

				<div>
					<div className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-900">
						Quick Links
					</div>
					<ul className="mt-4 space-y-2 text-sm text-gray-600">
						<li>
							<a
								href="#about"
								className="transition hover:text-gray-900"
							>
								About
							</a>
						</li>
						<li>
							<a
								href="#services"
								className="transition hover:text-gray-900"
							>
								Services
							</a>
						</li>
						<li>
							<a
								href="#process"
								className="transition hover:text-gray-900"
							>
								Our Process
							</a>
						</li>
						<li>
							<a
								href="#contact"
								className="transition hover:text-gray-900"
							>
								Contact
							</a>
						</li>
					</ul>
				</div>

				<div>
					<div className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-900">
						Services
					</div>
					<ul className="mt-4 space-y-2 text-sm text-gray-600">
						<li>
							<a
								href="#services"
								className="transition hover:text-gray-900"
							>
								Construction
							</a>
						</li>
						<li>
							<a
								href="#services"
								className="transition hover:text-gray-900"
							>
								Renovation
							</a>
						</li>
						<li>
							<a
								href="#services"
								className="transition hover:text-gray-900"
							>
								Architecture
							</a>
						</li>
						<li>
							<a
								href="#services"
								className="transition hover:text-gray-900"
							>
								Concrete Supply
							</a>
						</li>
					</ul>
				</div>

				<div>
					<div className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-900">
						Contact
					</div>
					<div className="mt-4 space-y-3 text-sm text-gray-600">
						<div>
							<a
								href="tel:+919599998888"
								className="transition hover:text-gray-900"
							>
								+91 95 9999 8888
							</a>
						</div>
						<div>
							<a
								href="mailto:hello@rjshomes.com"
								className="transition hover:text-gray-900"
							>
								hello@rjshomes.com
							</a>
						</div>
						<div>Hyderabad, Telangana</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
