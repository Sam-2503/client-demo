import { useState } from "react";

export default function Contact() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	});
	const handleContactSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Contact form submitted:", formData);
		alert("Thank you for reaching out! We'll contact you within 24 hours.");
		setFormData({ name: "", email: "", phone: "", message: "" });
	};
	const primaryBtnClass =
		"inline-block border-0 bg-brand-gold px-8 py-3.5 text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-brand-black transition duration-200 hover:-translate-y-0.5 hover:bg-brand-gold-light hover:shadow-glow";

	const sectionLabelClass =
		"mb-4 text-xs uppercase tracking-[0.2em] text-brand-gold";
	return (
		<section className="bg-[#111111] px-4 py-24 md:px-[5vw]" id="contact">
			<div className="mx-auto mb-16 max-w-[600px] text-center">
				<div className={sectionLabelClass}>Get In Touch</div>
				<h2 className="mb-4 font-serif text-4xl font-bold leading-[1.2] md:text-5xl">
					Let's Build Your Dream
					<br />
					Together
				</h2>
				<p className="text-[0.95rem] text-brand-muted-light">
					We respond within 24 hours. No missed opportunities — just
					real conversations about your future home.
				</p>
			</div>

			<div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-12 md:grid-cols-2">
				<div>
					<h3 className="mb-6 text-[1.2rem]">Send Us a Message</h3>
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
	);
}
