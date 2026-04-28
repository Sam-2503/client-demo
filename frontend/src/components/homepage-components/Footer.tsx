export default function Footer() {
	return (
		<footer className="border-t border-white/10 bg-[#07101b] px-4 py-10 md:px-8">
			<div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 md:grid-cols-3">
				<div>
					<div className="font-serif text-2xl text-[#f1e7d5]">
						RJS Homes
					</div>
					<p className="mt-3 max-w-[360px] text-sm leading-7 text-[#aeb9ca]">
						High-quality construction and interiors delivered with
						rigorous site execution and transparent client
						communication.
					</p>
				</div>

				<div>
					<div className="text-[11px] uppercase tracking-[0.16em] text-[#d8bc8f]">
						Quick Navigation
					</div>
					<ul className="mt-4 space-y-2 text-sm text-[#c5cfdd]">
						<li>
							<a
								href="#about"
								className="transition hover:text-[#f1e7d5]"
							>
								About
							</a>
						</li>
						<li>
							<a
								href="#services"
								className="transition hover:text-[#f1e7d5]"
							>
								Services
							</a>
						</li>
						<li>
							<a
								href="#projects"
								className="transition hover:text-[#f1e7d5]"
							>
								Projects
							</a>
						</li>
						<li>
							<a
								href="#contact"
								className="transition hover:text-[#f1e7d5]"
							>
								Contact
							</a>
						</li>
					</ul>
				</div>

				<div>
					<div className="text-[11px] uppercase tracking-[0.16em] text-[#d8bc8f]">
						Client Access
					</div>
					<p className="mt-4 text-sm leading-7 text-[#c5cfdd]">
						Use the project portal for approvals, progress tracking,
						material updates, and issue resolution workflows.
					</p>
					<a
						href="/login"
						className="mt-4 inline-flex rounded-md border border-[#d8bc8f]/40 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f2e7d4] transition hover:bg-white/5"
					>
						Open Portal
					</a>
				</div>
			</div>

			<div className="mx-auto mt-8 max-w-[1280px] border-t border-white/10 pt-6 text-xs uppercase tracking-[0.12em] text-[#7f8ea5]">
				RJS Homes · Hyderabad · Since 2002
			</div>
		</footer>
	);
}
