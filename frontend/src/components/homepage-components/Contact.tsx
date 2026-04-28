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
		alert(
			"Thank you. Our team will get back to you within one business day.",
		);
		setFormData({ name: "", email: "", phone: "", message: "" });
	};

	return (
		<section className="px-4 pb-24 pt-20 md:px-8" id="contact">
			<div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
				<div className="rounded-2xl border border-white/10 bg-[linear-gradient(170deg,rgba(9,16,26,0.95)_0%,rgba(17,30,47,0.92)_100%)] p-7 md:p-10">
					<div className="text-[11px] uppercase tracking-[0.18em] text-[#c9aa72]">
						Start Your Project
					</div>
					<h2 className="mt-3 font-serif text-[clamp(2rem,3.5vw,3rem)] text-[#f5efe3]">
						Speak with Our Construction Team
					</h2>
					<p className="mt-4 max-w-[620px] text-[0.97rem] leading-8 text-[#b9c6d8]">
						Share your site location, scope, and expected timeline.
						We will schedule a focused consultation and provide a
						practical execution roadmap.
					</p>

					<form
						onSubmit={handleContactSubmit}
						className="mt-8 space-y-4"
					>
						<input
							type="text"
							placeholder="Full Name"
							className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm text-[#f0f4fb] placeholder:text-[#8f9db3] outline-none transition focus:border-[#d8bc8f]/50"
							value={formData.name}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									name: e.target.value,
								}))
							}
							required
						/>
						<input
							type="email"
							placeholder="Email Address"
							className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm text-[#f0f4fb] placeholder:text-[#8f9db3] outline-none transition focus:border-[#d8bc8f]/50"
							value={formData.email}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									email: e.target.value,
								}))
							}
							required
						/>
						<input
							type="tel"
							placeholder="Phone Number"
							className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm text-[#f0f4fb] placeholder:text-[#8f9db3] outline-none transition focus:border-[#d8bc8f]/50"
							value={formData.phone}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									phone: e.target.value,
								}))
							}
						/>
						<textarea
							placeholder="Project requirements"
							className="min-h-[140px] w-full resize-y rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm text-[#f0f4fb] placeholder:text-[#8f9db3] outline-none transition focus:border-[#d8bc8f]/50"
							value={formData.message}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									message: e.target.value,
								}))
							}
							required
						/>
						<button
							type="submit"
							className="inline-flex h-12 items-center justify-center rounded-md border border-[#d8bc8f]/40 bg-[linear-gradient(90deg,#dac195_0%,#b3833f_100%)] px-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#111a27] transition hover:brightness-110"
						>
							Request Consultation
						</button>
					</form>
				</div>

				<div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(17,30,46,0.95)_0%,rgba(14,24,38,0.95)_100%)] p-7 md:p-10">
					<h3 className="font-serif text-3xl text-[#f5efe3]">
						Head Office
					</h3>
					<div className="mt-6 space-y-6 text-sm leading-7 text-[#c2cfde]">
						<div>
							<div className="text-[11px] uppercase tracking-[0.14em] text-[#d8bc8f]">
								Address
							</div>
							<div>Hyderabad, Telangana, India</div>
						</div>
						<div>
							<div className="text-[11px] uppercase tracking-[0.14em] text-[#d8bc8f]">
								Phone
							</div>
							<div>+91 95 9999 8888</div>
						</div>
						<div>
							<div className="text-[11px] uppercase tracking-[0.14em] text-[#d8bc8f]">
								Email
							</div>
							<div>hello@rjshomes.com</div>
						</div>
						<div>
							<div className="text-[11px] uppercase tracking-[0.14em] text-[#d8bc8f]">
								Working Hours
							</div>
							<div>Mon - Fri: 9:00 AM - 6:00 PM</div>
							<div>Sat: 10:00 AM - 4:00 PM</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
