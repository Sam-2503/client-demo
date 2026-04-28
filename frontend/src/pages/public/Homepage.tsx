import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";

export default function Homepage() {
	const navigate = useNavigate();
	const [menuOpen, setMenuOpen] = useState(false);
	const [projectFilter, setProjectFilter] = useState("all");
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	});

	const projects = [
		{
			id: 1,
			type: "villa",
			name: "Villa Areca – Jubilee Hills",
			location: "Jubilee Hills, Hyderabad",
			units: "24 Units",
			price: "₹85L – ₹1.2 Cr",
			status: "Active",
			color: "#C8971F",
		},
		{
			id: 2,
			type: "apartment",
			name: "Skyline Block A – Gachibowli",
			location: "Gachibowli, Hyderabad",
			units: "120 Units",
			price: "₹45L – ₹75L",
			status: "Active",
			color: "#1A7ABF",
		},
		{
			id: 3,
			type: "duplex",
			name: "Duplex Row Phase 1 – Kompally",
			location: "Kompally, Hyderabad",
			units: "36 Units",
			price: "₹65L – ₹90L",
			status: "Ongoing",
			color: "#C87830",
		},
		{
			id: 4,
			type: "villa",
			name: "Green Meadows – Shamirpet",
			location: "Shamirpet, Hyderabad",
			units: "48 Units",
			price: "₹1.1 Cr – ₹1.8 Cr",
			status: "New Launch",
			color: "#2A7A2A",
		},
		{
			id: 5,
			type: "commercial",
			name: "Commercial Hub – HITEC City",
			location: "HITEC City, Hyderabad",
			units: "18 Units",
			price: "₹1.5 Cr – ₹3 Cr",
			status: "Completed",
			color: "#8B1A1A",
		},
		{
			id: 6,
			type: "apartment",
			name: "Emerald Heights – Miyapur",
			location: "Miyapur, Hyderabad",
			units: "96 Units",
			price: "₹38L – ₹62L",
			status: "New Launch",
			color: "#1A7ABF",
		},
	];

	const filteredProjects =
		projectFilter === "all"
			? projects
			: projects.filter((p) => p.type === projectFilter);

	const handleContactSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Contact form submitted:", formData);
		alert("Thank you for reaching out! We'll contact you within 24 hours.");
		setFormData({ name: "", email: "", phone: "", message: "" });
	};

	const statusClasses: Record<string, string> = {
		active: "bg-[rgba(200,151,31,0.15)] text-brand-gold",
		ongoing: "bg-[rgba(26,122,191,0.15)] text-[#7ec7f5]",
		"new-launch": "bg-[rgba(39,174,96,0.15)] text-[#7ae7a4]",
		completed: "bg-[rgba(192,57,43,0.15)] text-[#f3a39a]",
	};

	const sectionLabelClass =
		"mb-4 text-xs uppercase tracking-[0.2em] text-brand-gold";
	const primaryBtnClass =
		"inline-block border-0 bg-brand-gold px-8 py-3.5 text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-brand-black transition duration-200 hover:-translate-y-0.5 hover:bg-brand-gold-light hover:shadow-glow";
	const outlineBtnClass =
		"inline-block border border-[#444] px-8 py-3.5 text-[0.85rem] uppercase tracking-[0.1em] text-white transition duration-200 hover:border-brand-gold hover:text-brand-gold";

	return (
		<div className="min-h-screen overflow-x-hidden bg-[#111111] font-sans text-white">
			{/* NAVBAR */}
			<nav className="fixed left-0 right-0 top-0 z-[100] flex h-[72px] items-center justify-between border-b border-[#1a1a1a] bg-brand-black px-4 md:px-[5vw]">
				<a
					href="#home"
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
						href="#home"
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

			{/* HERO SECTION */}
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
						transparent, technology-driven real estate experience —
						RJS Homes delivers quality, trust, and innovation.
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

			{/* STATS STRIP */}
			<div className="grid grid-cols-2 gap-8 border-y border-[#1a1a1a] bg-brand-black px-4 py-10 md:grid-cols-4 md:px-[5vw]">
				<div className="text-center">
					<div className="mb-2 font-serif text-[2.5rem] font-bold leading-none text-brand-gold">
						20+
					</div>
					<div className="text-[0.8rem] uppercase tracking-[0.1em] text-brand-muted-light">
						Years of Experience
					</div>
				</div>
				<div className="text-center">
					<div className="mb-2 font-serif text-[2.5rem] font-bold leading-none text-brand-gold">
						500+
					</div>
					<div className="text-[0.8rem] uppercase tracking-[0.1em] text-brand-muted-light">
						Happy Families
					</div>
				</div>
				<div className="text-center">
					<div className="mb-2 font-serif text-[2.5rem] font-bold leading-none text-brand-gold">
						50+
					</div>
					<div className="text-[0.8rem] uppercase tracking-[0.1em] text-brand-muted-light">
						Projects Delivered
					</div>
				</div>
				<div className="text-center">
					<div className="mb-2 font-serif text-[2.5rem] font-bold leading-none text-brand-gold">
						100%
					</div>
					<div className="text-[0.8rem] uppercase tracking-[0.1em] text-brand-muted-light">
						Transparent Process
					</div>
				</div>
			</div>

			{/* ABOUT SECTION */}
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
								Growing up in Hyderabad, I had a front-row seat
								to my father's furniture contracting business —
								a venture he poured his heart into for over two
								decades. He built with his hands and his values.
							</p>
							<p>
								That gap — between what was promised and what
								clients could verify — became the mission I
								built RJS Homes around. When transparency became
								our first principle, everything changed.
							</p>
							<p>
								Today, RJS Homes is a bridge between two
								generations. We carry forward two decades of
								on-ground expertise, trusted suppliers, and
								craftsmen — and we pair it with technology,
								systems, and radical transparency.
							</p>
							<p>
								<strong>
									This isn't just real estate. It's your
									family's future — and we take that
									seriously.
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

			{/* PROJECTS SECTION */}
			<section
				className="bg-[#080808] px-4 py-24 md:px-[5vw]"
				id="projects"
			>
				<div className="mx-auto mb-12 max-w-[1200px]">
					<div className={sectionLabelClass}>Our Portfolio</div>
					<div className="mt-4 flex items-end justify-between">
						<h2 className="font-serif text-4xl font-bold">
							Featured Projects
						</h2>
						<a href="#" className="text-[0.8rem] text-brand-muted">
							View All →
						</a>
					</div>
				</div>

				<div className="mx-auto my-8 flex max-w-[1200px] flex-wrap justify-center gap-4">
					{["all", "villa", "apartment", "duplex", "commercial"].map(
						(filter) => (
							<button
								key={filter}
								className={cn(
									"border border-[#444] px-5 py-2.5 text-[0.85rem] uppercase tracking-[0.1em] text-brand-muted-light transition",
									projectFilter === filter
										? "border-brand-gold bg-brand-gold text-brand-black"
										: "bg-transparent hover:border-brand-gold hover:text-brand-gold",
								)}
								onClick={() => setProjectFilter(filter)}
							>
								{filter.charAt(0).toUpperCase() +
									filter.slice(1)}
							</button>
						),
					)}
				</div>

				<div className="mx-auto mt-8 grid max-w-[1200px] grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
					{filteredProjects.map((project) => (
						<div
							key={project.id}
							className="overflow-hidden bg-[#1a1a1a] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)]"
						>
							<div
								className="h-20 w-full"
								style={{ background: project.color }}
							></div>
							<div className="h-[180px] bg-gradient-to-br from-[#222] to-[#111]"></div>
							<div className="p-6">
								<div className="mb-2 text-base font-semibold">
									{project.name}
								</div>
								<div className="mb-4 text-[0.8rem] text-brand-muted">
									{project.location} · {project.units}
								</div>
								<div className="mb-4 font-serif text-[1.1rem] font-semibold text-brand-gold">
									{project.price}
								</div>
								<div className="flex items-center justify-between border-t border-[#333] pt-4">
									<span
										className={cn(
											"rounded-[2px] px-2.5 py-1 text-[0.7rem] uppercase",
											statusClasses[
												project.status
													.toLowerCase()
													.replace(" ", "-")
											] ?? statusClasses.active,
										)}
									>
										{project.status}
									</span>
									<a
										href="#"
										className="text-[0.85rem] text-brand-gold"
									>
										Details →
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* CONTACT SECTION */}
			<section
				className="bg-[#111111] px-4 py-24 md:px-[5vw]"
				id="contact"
			>
				<div className="mx-auto mb-16 max-w-[600px] text-center">
					<div className={sectionLabelClass}>Get In Touch</div>
					<h2 className="mb-4 font-serif text-4xl font-bold leading-[1.2] md:text-5xl">
						Let's Build Your Dream
						<br />
						Together
					</h2>
					<p className="text-[0.95rem] text-brand-muted-light">
						We respond within 24 hours. No missed opportunities —
						just real conversations about your future home.
					</p>
				</div>

				<div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-12 md:grid-cols-2">
					<div>
						<h3 className="mb-6 text-[1.2rem]">
							Send Us a Message
						</h3>
						<form
							onSubmit={handleContactSubmit}
							className="flex flex-col gap-4"
						>
							<input
								type="text"
								className="border border-[#333] bg-brand-panel px-3.5 py-3 text-[0.9rem] text-white transition placeholder:text-[#666] focus:border-brand-gold focus:bg-[#252525] focus:outline-none"
								placeholder="Your Name"
								value={formData.name}
								onChange={(e) =>
									setFormData({
										...formData,
										name: e.target.value,
									})
								}
								required
							/>
							<input
								type="email"
								className="border border-[#333] bg-brand-panel px-3.5 py-3 text-[0.9rem] text-white transition placeholder:text-[#666] focus:border-brand-gold focus:bg-[#252525] focus:outline-none"
								placeholder="Your Email"
								value={formData.email}
								onChange={(e) =>
									setFormData({
										...formData,
										email: e.target.value,
									})
								}
								required
							/>
							<input
								type="tel"
								className="border border-[#333] bg-brand-panel px-3.5 py-3 text-[0.9rem] text-white transition placeholder:text-[#666] focus:border-brand-gold focus:bg-[#252525] focus:outline-none"
								placeholder="Your Phone"
								value={formData.phone}
								onChange={(e) =>
									setFormData({
										...formData,
										phone: e.target.value,
									})
								}
							/>
							<textarea
								className="min-h-[120px] resize-y border border-[#333] bg-brand-panel px-3.5 py-3 text-[0.9rem] text-white transition placeholder:text-[#666] focus:border-brand-gold focus:bg-[#252525] focus:outline-none"
								placeholder="Tell us about your dream..."
								value={formData.message}
								onChange={(e) =>
									setFormData({
										...formData,
										message: e.target.value,
									})
								}
								required
							></textarea>
							<button type="submit" className={primaryBtnClass}>
								Send Message
							</button>
						</form>
					</div>

					<div className="flex flex-col gap-6">
						<div>
							<h4 className="mb-2 text-base font-semibold">
								📍 Address
							</h4>
							<p className="text-[0.9rem] leading-[1.6] text-brand-muted-light">
								Hyderabad, Telangana
								<br />
								India
							</p>
						</div>
						<div>
							<h4 className="mb-2 text-base font-semibold">
								📞 Phone
							</h4>
							<p className="text-[0.9rem] leading-[1.6] text-brand-muted-light">
								+91 95 9999 8888
							</p>
						</div>
						<div>
							<h4 className="mb-2 text-base font-semibold">
								✉️ Email
							</h4>
							<p className="text-[0.9rem] leading-[1.6] text-brand-muted-light">
								hello@rjshomes.com
							</p>
						</div>
						<div>
							<h4 className="mb-2 text-base font-semibold">
								🕐 Hours
							</h4>
							<p className="text-[0.9rem] leading-[1.6] text-brand-muted-light">
								Mon – Fri: 9 AM – 6 PM
								<br />
								Sat: 10 AM – 4 PM
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* FOOTER */}
			<footer className="border-t border-[#1a1a1a] bg-brand-black px-4 pb-8 pt-12 md:px-[5vw]">
				<div className="mx-auto mb-8 grid max-w-[1200px] grid-cols-1 gap-8 md:grid-cols-3">
					<div>
						<h4 className="mb-4 text-base font-semibold text-brand-gold">
							RJS HOMES
						</h4>
						<p className="text-[0.85rem] leading-[1.6] text-brand-muted-light">
							Building dreams since 2002. Transparency, quality,
							and innovation in every project.
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
		</div>
	);
}
