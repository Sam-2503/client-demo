import { useNavigate } from "react-router-dom";
import "./Services.css";

export default function Services() {
	const navigate = useNavigate();

	const services = [
		{
			id: 1,
			icon: "🏗",
			title: "Post-Civil Construction",
			description:
				"Expert finishing work on completed structures. From interior walls to exterior finishes, we ensure impeccable quality.",
			features: [
				"Interior Finishing",
				"Exterior Cladding",
				"Flooring",
				"Painting",
			],
		},
		{
			id: 2,
			icon: "🛋",
			title: "Interior Design & Execution",
			description:
				"Transform raw spaces into beautiful homes. Our design team creates functional, aesthetic interiors tailored to your taste.",
			features: [
				"Space Planning",
				"Material Selection",
				"Furniture Design",
				"Installation",
			],
		},
		{
			id: 3,
			icon: "💧",
			title: "Plumbing & Sanitaryware",
			description:
				"Complete plumbing solutions from planning to execution. Quality fixtures, efficient systems, zero leaks guaranteed.",
			features: [
				"System Design",
				"Premium Fixtures",
				"Maintenance Support",
				"Certifications",
			],
		},
		{
			id: 4,
			icon: "⚡",
			title: "Electrical Systems",
			description:
				"State-of-the-art electrical installations meeting international standards. Safety, efficiency, smart home ready.",
			features: [
				"Wiring Systems",
				"Smart Home Setup",
				"Solar Integration",
				"Certification",
			],
		},
		{
			id: 5,
			icon: "🎨",
			title: "Custom Woodwork",
			description:
				"Bespoke carpentry and woodwork. Wardrobes, cabinets, doors — all crafted with precision and finest materials.",
			features: [
				"Custom Design",
				"Premium Wood",
				"Expert Installation",
				"Long Warranty",
			],
		},
		{
			id: 6,
			icon: "🏡",
			title: "Landscaping & Outdoor",
			description:
				"Beautiful outdoor spaces that complement your home. Gardens, patios, water features — complete outdoor solutions.",
			features: [
				"Garden Design",
				"Hardscaping",
				"Maintenance Plans",
				"Sustainability",
			],
		},
	];

	const testimonials = [
		{
			name: "Arjun Reddy",
			project: "Villa Areca, Jubilee Hills",
			text: "RJS Homes transformed our bare structure into a dream home. The attention to detail and transparency was remarkable.",
			rating: 5,
		},
		{
			name: "Priya Sharma",
			project: "Skyline Block A, Gachibowli",
			text: "From initial design to final handover, every step was communicated clearly. Outstanding craftsmanship!",
			rating: 5,
		},
		{
			name: "Vikram Patel",
			project: "Duplex Row, Kompally",
			text: "We got our custom interiors exactly as envisioned. The team's professionalism was exceptional.",
			rating: 5,
		},
	];

	return (
		<div className="services-page">
			{/* NAVBAR */}
			<nav className="nav-services">
				<a href="/" className="nav-logo-services">
					<span>RJS HOMES</span>
				</a>
				<div className="nav-links-services">
					<a href="/">Home</a>
					<a href="#services">Services</a>
					<a href="#testimonials">Testimonials</a>
					<button
						className="nav-cta-services"
						onClick={() => navigate("/login")}
					>
						Portal →
					</button>
				</div>
			</nav>

			{/* HERO SECTION */}
			<section className="hero-services" id="home">
				<div className="hero-bg-services"></div>
				<div className="hero-grid-services"></div>
				<div className="hero-left-services">
					<div className="hero-eyebrow-services">
						Complete Post-Civil Solutions
					</div>
					<h1 className="hero-title-services">
						From Raw Space
						<br />
						<span>to Your Dream Interior</span>
					</h1>
					<p className="hero-desc-services">
						We specialize in complete post-civil construction and
						interior solutions. Every project reflects our
						commitment to quality, transparency, and your vision.
					</p>
					<div className="hero-btns-services">
						<button
							className="btn-primary-services"
							onClick={() => navigate("/login")}
						>
							Get Started
						</button>
						<a href="#services" className="btn-outline-services">
							Explore Services
						</a>
					</div>
				</div>
				<div className="hero-right-services">
					<div className="hero-stat-grid-services">
						<div className="hero-stat-services">
							<div className="hero-stat-num-services">500+</div>
							<div className="hero-stat-label-services">
								Projects Completed
							</div>
						</div>
						<div className="hero-stat-services">
							<div className="hero-stat-num-services">15+</div>
							<div className="hero-stat-label-services">
								Years Excellence
							</div>
						</div>
						<div className="hero-stat-services">
							<div className="hero-stat-num-services">99%</div>
							<div className="hero-stat-label-services">
								Client Satisfaction
							</div>
						</div>
						<div className="hero-stat-services">
							<div className="hero-stat-num-services">100%</div>
							<div className="hero-stat-label-services">
								Quality Assured
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* SERVICES SECTION */}
			<section className="services-section" id="services">
				<div className="section-header-services">
					<h2>Our Complete Service Suite</h2>
					<p>
						Every aspect of your construction and interior needs,
						handled with expertise and care.
					</p>
				</div>

				<div className="services-grid">
					{services.map((service) => (
						<div key={service.id} className="service-card">
							<div className="service-icon">{service.icon}</div>
							<h3>{service.title}</h3>
							<p className="service-desc">
								{service.description}
							</p>
							<div className="service-features">
								{service.features.map((feature, i) => (
									<span key={i} className="feature-tag">
										{feature}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</section>

			{/* PROCESS SECTION */}
			<section className="process-section">
				<div className="section-header-services">
					<h2>Our Process</h2>
					<p>Transparent, step-by-step approach to every project</p>
				</div>

				<div className="process-steps">
					<div className="process-step">
						<div className="step-num">01</div>
						<h4>Consultation</h4>
						<p>
							Understand your vision, budget, and requirements in
							detail.
						</p>
					</div>
					<div className="process-step">
						<div className="step-num">02</div>
						<h4>Design & Planning</h4>
						<p>
							Create detailed designs and material specifications
							for approval.
						</p>
					</div>
					<div className="process-step">
						<div className="step-num">03</div>
						<h4>Execution</h4>
						<p>
							Skilled teams execute with precision, real-time
							updates provided.
						</p>
					</div>
					<div className="process-step">
						<div className="step-num">04</div>
						<h4>Quality Check</h4>
						<p>Rigorous inspection and testing before handover.</p>
					</div>
					<div className="process-step">
						<div className="step-num">05</div>
						<h4>Handover</h4>
						<p>
							Complete project handover with warranty and support.
						</p>
					</div>
				</div>
			</section>

			{/* TESTIMONIALS SECTION */}
			<section className="testimonials-section" id="testimonials">
				<div className="section-header-services">
					<h2>What Our Clients Say</h2>
					<p>
						Real experiences from homeowners who trusted us with
						their dreams
					</p>
				</div>

				<div className="testimonials-grid">
					{testimonials.map((testimonial, i) => (
						<div key={i} className="testimonial-card">
							<div className="stars">
								{"⭐".repeat(testimonial.rating)}
							</div>
							<p className="testimonial-text">
								"{testimonial.text}"
							</p>
							<div className="testimonial-author">
								<h4>{testimonial.name}</h4>
								<p>{testimonial.project}</p>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* CTA SECTION */}
			<section className="cta-section">
				<h2>Ready to Transform Your Space?</h2>
				<p>
					Let's discuss your project. We're excited to bring your
					vision to life.
				</p>
				<button
					className="btn-primary-services btn-large"
					onClick={() => navigate("/login")}
				>
					Start Your Journey
				</button>
			</section>

			{/* FOOTER */}
			<footer className="footer-services">
				<div className="footer-content-services">
					<div className="footer-section-services">
						<h4>RJS HOMES</h4>
						<p>
							Complete post-civil construction and interior
							solutions.
						</p>
					</div>
					<div className="footer-section-services">
						<h4>Quick Links</h4>
						<ul>
							<li>
								<a href="/">Home</a>
							</li>
							<li>
								<a href="#services">Services</a>
							</li>
							<li>
								<a href="#testimonials">Testimonials</a>
							</li>
						</ul>
					</div>
					<div className="footer-section-services">
						<h4>Contact</h4>
						<p>hello@rjshomes.com</p>
						<p>+91 95 9999 8888</p>
					</div>
				</div>
				<div className="footer-bottom-services">
					<p>&copy; 2024 RJS Homes. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}
