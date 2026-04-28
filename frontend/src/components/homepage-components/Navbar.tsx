import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";

export default function Navbar() {
	const navigate = useNavigate();
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<nav className="fixed left-0 right-0 top-0 z-[100] flex h-[72px] items-center justify-between border-b border-[#1a1a1a] bg-brand-black px-4 md:px-[5vw]">
			<a
				href="/"
				className="flex items-center gap-3 font-serif text-[1.35rem] font-bold tracking-[0.05em] text-white"
			>
				<span>RJS HOMES</span>
			</a>
			<div
				className={cn(
					"fixed top-[72px] z-40 flex w-full flex-col gap-4 bg-brand-black px-4 py-8 text-center transition-all duration-300 md:static md:w-auto md:flex-row md:items-center md:gap-8 md:bg-transparent md:px-0 md:py-0",
					menuOpen ? "left-0" : "-left-full md:left-auto",
				)}
			>
				<a
					href="/"
					className="text-[0.82rem] uppercase tracking-[0.08em] text-brand-muted-light transition-colors hover:text-brand-gold"
				>
					Home
				</a>
				<a
					href="#about"
					className="text-[0.82rem] uppercase tracking-[0.08em] text-brand-muted-light transition-colors hover:text-brand-gold"
				>
					About
				</a>
				<a
					href="#projects"
					className="text-[0.82rem] uppercase tracking-[0.08em] text-brand-muted-light transition-colors hover:text-brand-gold"
				>
					Projects
				</a>
				<a
					href="#services"
					className="text-[0.82rem] uppercase tracking-[0.08em] text-brand-muted-light transition-colors hover:text-brand-gold"
				>
					Services
				</a>
				<a
					href="#contact"
					className="text-[0.82rem] uppercase tracking-[0.08em] text-brand-muted-light transition-colors hover:text-brand-gold"
				>
					Contact
				</a>
				<button
					className="border-0 bg-brand-gold px-5 py-2 text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-brand-black transition hover:bg-brand-gold-light"
					onClick={() => navigate("/login")}
				>
					Portal →
				</button>
			</div>
			<button
				className="flex flex-col gap-[5px] bg-transparent md:hidden"
				onClick={() => setMenuOpen(!menuOpen)}
			>
				<span className="h-[2px] w-6 bg-white"></span>
				<span className="h-[2px] w-6 bg-white"></span>
				<span className="h-[2px] w-6 bg-white"></span>
			</button>
		</nav>
	);
}
