import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";

export default function Navbar() {
	const navigate = useNavigate();
	const [menuOpen, setMenuOpen] = useState(false);

	const navLinks = [
		{ href: "#about", label: "About" },
		{ href: "#projects", label: "Projects" },
		{ href: "#services", label: "Services" },
		{ href: "#contact", label: "Contact" },
	];

	return (
		<nav className="fixed inset-x-0 top-0 z-[100] border-b border-white/10 bg-[rgba(8,14,22,0.84)] backdrop-blur-xl">
			<div className="mx-auto flex h-[78px] max-w-[1280px] items-center justify-between px-4 md:px-8">
				<a href="/home" className="flex items-center gap-3">
					<div className="h-9 w-9 rounded-full border border-[#d5b47a]/40 bg-[radial-gradient(circle_at_30%_25%,#e4cda2_0%,#b68945_60%,#7a5a2e_100%)] shadow-[0_8px_24px_rgba(182,137,69,0.35)]" />
					<div>
						<div className="font-serif text-lg font-semibold tracking-[0.08em] text-[#f3ede2]">
							RJS Homes
						</div>
						<div className="text-[10px] uppercase tracking-[0.24em] text-[#b5bcc6]">
							Construction & Interiors
						</div>
					</div>
				</a>

				<div
					className={cn(
						"fixed left-0 top-[78px] flex w-full flex-col gap-1 border-b border-white/10 bg-[#0c1521]/95 px-4 py-6 shadow-2xl transition-transform duration-300 md:static md:w-auto md:flex-row md:items-center md:gap-2 md:border-none md:bg-transparent md:px-0 md:py-0 md:shadow-none",
						menuOpen
							? "translate-x-0"
							: "-translate-x-full md:translate-x-0",
					)}
				>
					{navLinks.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="rounded-md px-3 py-2 text-[12px] font-medium uppercase tracking-[0.12em] text-[#d0d5de] transition hover:bg-white/5 hover:text-[#f3ede2]"
							onClick={() => setMenuOpen(false)}
						>
							{link.label}
						</a>
					))}
					<button
						type="button"
						className="mt-2 rounded-md border border-[#d5b47a]/40 bg-[linear-gradient(90deg,#d8bc8f_0%,#b88a47_100%)] px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#101722] transition hover:brightness-110 md:mt-0"
						onClick={() => navigate("/login")}
					>
						Client Portal
					</button>
				</div>

				<button
					type="button"
					className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-[#f3ede2] md:hidden"
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

			<div
				className={cn(
					"pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent",
					menuOpen && "md:block",
				)}
			/>
		</nav>
	);
}
