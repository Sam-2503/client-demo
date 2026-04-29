import { useState } from "react";
import { cn } from "../../utils/cn";

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);

	const navLinks = [
		{ href: "#home", label: "Home" },
		{ href: "#about", label: "About" },
		{ href: "#services", label: "Services" },
		{ href: "#why-choose", label: "Why Choose Us" },
		{ href: "#process", label: "Process" },
	];

	return (
		<nav className="sticky inset-x-0 top-0 z-[100] border-b border-black/10 bg-[#f3f7fa]/95 backdrop-blur-sm">
			<div className="mx-auto flex h-16 max-w-full items-center justify-between px-4 md:px-8">
				<a href="/home" className="flex items-center gap-3">
					<img
						src="/rjs-logo.svg"
						alt="RJS Homes logo"
						className="h-10 w-10 rounded-full border border-[#d5b47a]/50 bg-[radial-gradient(circle_at_30%_25%,#e4cda2_0%,#b68945_60%,#7a5a2e_100%)]"
					/>
					<div>
						<div className="font-serif text-base font-bold text-[#1f2a34]">
							RJS Homes
						</div>
						<div className="text-[10px] uppercase tracking-[0.16em] text-[#617181]">
							Construction
						</div>
					</div>
				</a>

				<div
					className={cn(
						"fixed left-0 top-16 flex w-full flex-col gap-1 border-b border-black/10 bg-[#f3f7fa] px-4 py-6 shadow-lg transition-transform duration-300 md:static md:w-auto md:flex-row md:items-center md:gap-1 md:border-none md:bg-transparent md:px-0 md:py-0 md:shadow-none",
						menuOpen
							? "translate-x-0"
							: "-translate-x-full md:translate-x-0",
					)}
				>
					{navLinks.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="rounded-md px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#475462] transition hover:bg-black/5 hover:text-[#1e2a35]"
							onClick={() => setMenuOpen(false)}
						>
							{link.label}
						</a>
					))}
					<a
						href="#contact"
						className="mt-2 rounded-full border border-[#1e2a35] bg-[#1e2a35] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition hover:opacity-90 md:mt-0"
						onClick={() => setMenuOpen(false)}
					>
						Get in touch
					</a>
				</div>

				<button
					type="button"
					className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/20 text-[#1e2a35] md:hidden"
					onClick={() => setMenuOpen((prev) => !prev)}
					aria-label="Toggle menu"
				>
					<div className="space-y-1.5">
						<span className="block h-0.5 w-5 bg-current" />
						<span className="block h-0.5 w-5 bg-current" />
						<span className="block h-0.5 w-5 bg-current" />
					</div>
				</button>
			</div>
		</nav>
	);
}
