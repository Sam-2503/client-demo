import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

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

	return (
		<div className="homepage">
			{/* NAVBAR */}
			<nav className="navbar">
				<a href="#home" className="nav-logo">
					<span>RJS HOMES</span>
				</a>
				<div className={`nav-links ${menuOpen ? "active" : ""}`}>
					<a href="#home">Home</a>
					<a href="#about">About</a>
					<a href="#projects">Projects</a>
					<a href="#services">Services</a>
					<a href="#contact">Contact</a>
					<button
						className="nav-cta"
						onClick={() => navigate("/login")}
					>
						Portal →
					</button>
				</div>
				<button
					className="hamburger"
					onClick={() => setMenuOpen(!menuOpen)}
				>
					<span></span>
					<span></span>
					<span></span>
				</button>
			</nav>

			{/* HERO SECTION */}
			<section className="hero" id="home">
				<div className="hero-gold-bar"></div>
				<div className="hero-content">
					<div className="hero-eyebrow">
						Hyderabad's Premium Real Estate
					</div>
					<h1>
						Building Dreams
						<br />
						<span>Since 2002</span>
					</h1>
					<p className="hero-sub">
						From our father's legacy of craftsmanship to a fully
						transparent, technology-driven real estate experience —
						RJS Homes delivers quality, trust, and innovation.
					</p>
					<div className="hero-btns">
						<a href="#projects" className="btn-primary">
							View Our Projects
						</a>
						<a href="#about" className="btn-outline">
							Our Story
						</a>
					</div>
				</div>
				<div className="hero-stats">
					<div className="stat-block">
						<div className="stat-num">20+</div>
						<div className="stat-label">Years</div>
					</div>
					<div className="stat-divider"></div>
					<div className="stat-block">
						<div className="stat-num">500+</div>
						<div className="stat-label">Families</div>
					</div>
					<div className="stat-divider"></div>
					<div className="stat-block">
						<div className="stat-num">50+</div>
						<div className="stat-label">Projects</div>
					</div>
				</div>
			</section>

			{/* STATS STRIP */}
			<div className="stats-strip">
				<div className="stat-item">
					<div className="stat-number">20+</div>
					<div className="stat-text">Years of Experience</div>
				</div>
				<div className="stat-item">
					<div className="stat-number">500+</div>
					<div className="stat-text">Happy Families</div>
				</div>
				<div className="stat-item">
					<div className="stat-number">50+</div>
					<div className="stat-text">Projects Delivered</div>
				</div>
				<div className="stat-item">
					<div className="stat-number">100%</div>
					<div className="stat-text">Transparent Process</div>
				</div>
			</div>

			{/* ABOUT SECTION */}
			<section className="about" id="about">
				<div className="about-container">
					<div className="about-left">
						<div className="founder-card">
							<div className="founder-info">
								<h4>Raman Jee Sharma</h4>
								<p>Founder & Director, RJS Homes</p>
							</div>
						</div>
					</div>
					<div className="about-right">
						<div className="section-label">Our Story</div>
						<h2>
							From My Father's Workshop
							<br />
							to Your Dream Home
						</h2>
						<blockquote className="founder-quote">
							"Building isn't just about structures — it's about
							building trust, family legacies, and futures."
						</blockquote>
						<div className="about-text">
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
						<div className="about-values">
							<div className="value">Transparency</div>
							<div className="value">Quality</div>
							<div className="value">Legacy</div>
							<div className="value">Innovation</div>
						</div>
						<div className="about-btns">
							<a href="#projects" className="btn-primary">
								Explore Projects
							</a>
							<a href="#contact" className="btn-outline">
								Get In Touch
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* PROJECTS SECTION */}
			<section className="projects" id="projects">
				<div className="projects-header">
					<div className="section-label">Our Portfolio</div>
					<div className="projects-top">
						<h2>Featured Projects</h2>
						<a
							href="#"
							style={{
								fontSize: "0.8rem",
								color: "var(--mid-gray)",
								textDecoration: "none",
							}}
						>
							View All →
						</a>
					</div>
				</div>

				<div className="filter-buttons">
					{["all", "villa", "apartment", "duplex", "commercial"].map(
						(filter) => (
							<button
								key={filter}
								className={`filter-btn ${projectFilter === filter ? "active" : ""}`}
								onClick={() => setProjectFilter(filter)}
							>
								{filter.charAt(0).toUpperCase() +
									filter.slice(1)}
							</button>
						),
					)}
				</div>

				<div className="projects-grid">
					{filteredProjects.map((project) => (
						<div key={project.id} className="project-card">
							<div
								className="project-color"
								style={{ background: project.color }}
							></div>
							<div className="project-image"></div>
							<div className="project-info">
								<div className="project-name">
									{project.name}
								</div>
								<div className="project-meta">
									{project.location} · {project.units}
								</div>
								<div className="project-price">
									{project.price}
								</div>
								<div className="project-footer">
									<span
										className={`status ${project.status.toLowerCase().replace(" ", "-")}`}
									>
										{project.status}
									</span>
									<a href="#">Details →</a>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* CONTACT SECTION */}
			<section className="contact" id="contact">
				<div className="contact-header">
					<div className="section-label">Get In Touch</div>
					<h2>
						Let's Build Your Dream
						<br />
						Together
					</h2>
					<p>
						We respond within 24 hours. No missed opportunities —
						just real conversations about your future home.
					</p>
				</div>

				<div className="contact-container">
					<div className="contact-form-wrapper">
						<h3>Send Us a Message</h3>
						<form
							onSubmit={handleContactSubmit}
							className="contact-form"
						>
							<input
								type="text"
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
							<button type="submit" className="btn-primary">
								Send Message
							</button>
						</form>
					</div>

					<div className="contact-info">
						<div className="info-block">
							<h4>📍 Address</h4>
							<p>
								Hyderabad, Telangana
								<br />
								India
							</p>
						</div>
						<div className="info-block">
							<h4>📞 Phone</h4>
							<p>+91 95 9999 8888</p>
						</div>
						<div className="info-block">
							<h4>✉️ Email</h4>
							<p>hello@rjshomes.com</p>
						</div>
						<div className="info-block">
							<h4>🕐 Hours</h4>
							<p>
								Mon – Fri: 9 AM – 6 PM
								<br />
								Sat: 10 AM – 4 PM
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* FOOTER */}
			<footer className="footer">
				<div className="footer-content">
					<div className="footer-section">
						<h4>RJS HOMES</h4>
						<p>
							Building dreams since 2002. Transparency, quality,
							and innovation in every project.
						</p>
					</div>
					<div className="footer-section">
						<h4>Quick Links</h4>
						<ul>
							<li>
								<a href="#home">Home</a>
							</li>
							<li>
								<a href="#about">About</a>
							</li>
							<li>
								<a href="#projects">Projects</a>
							</li>
							<li>
								<a href="#contact">Contact</a>
							</li>
						</ul>
					</div>
					<div className="footer-section">
						<h4>Legal</h4>
						<ul>
							<li>
								<a href="#">Privacy Policy</a>
							</li>
							<li>
								<a href="#">Terms & Conditions</a>
							</li>
							<li>
								<a href="#">Disclaimer</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="footer-bottom">
					<p>&copy; 2024 RJS Homes. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}
