import { useState } from "react";

export default function Contact() {
	return (
		<section className="px-4 pb-16 pt-14 md:px-8" id="contact">
			<div className="mx-auto max-w-[1240px] rounded-[12px] border border-black/10 bg-[#dfe7ec] p-6 md:p-10">
				<div className="grid gap-8 md:grid-cols-[1fr_1.1fr]">
					<div>
						<div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5a6977]">
							Get in Touch
						</div>
						<h2 className="mt-3 text-[clamp(2rem,3.5vw,3rem)] font-semibold leading-[1.1] text-[#1f2a34]">
							Contact us to get started on your project
						</h2>
						<p className="mt-4 max-w-[520px] text-[15px] leading-7 text-[#556372]">
							Share your scope and timeline. We will respond with
							the next practical steps for planning and execution.
						</p>
					</div>
					<form className="grid gap-3 rounded-[10px] border border-black/10 bg-white p-4 md:p-5">
						<input
							type="text"
							placeholder="Full name"
							className="rounded-md border border-black/15 px-3 py-2 text-sm outline-none"
						/>
						<input
							type="email"
							placeholder="Email address"
							className="rounded-md border border-black/15 px-3 py-2 text-sm outline-none"
						/>
						<input
							type="tel"
							placeholder="Phone number"
							className="rounded-md border border-black/15 px-3 py-2 text-sm outline-none"
						/>
						<textarea
							placeholder="Project requirements"
							rows={4}
							className="rounded-md border border-black/15 px-3 py-2 text-sm outline-none"
						/>
						<button
							type="button"
							className="rounded-full bg-[#1e2a35] px-5 py-2 text-xs font-semibold uppercase tracking-[0.09em] text-white"
						>
							Submit inquiry
						</button>
					</form>
				</div>
			</div>
		</section>
	);
}
