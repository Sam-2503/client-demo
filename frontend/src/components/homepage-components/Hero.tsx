import { useNavigate } from "react-router-dom";

export default function Hero() {
	const navigate = useNavigate();

	return (
		<section
			id="home"
			className='bg-[url("https://images.unsplash.com/photo-1736595031972-b33097c43509?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] bg-cover bg-center bg-no-repeat'
		>
			<div className="w-full border border-black/10 bg-[#dbe6ec]/50 py-12">
				<div className="grid gap-8 px-6 pb-8 pt-8 md:grid-cols-[1.1fr_1fr] md:px-10 md:pt-10">
					<div className="flex flex-col justify-center">
						<h1 className="text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[1.1] text-[#141b20]">
							From Construction Sites to Finished Spaces.
						</h1>
						<p className="mt-4 max-w-[560px] text-[15px] leading-7 text-[#000000]">
							RJS Homes delivers construction and interior
							execution with practical planning, reliable
							coordination, and quality-focused delivery so you
							don’t have to deal with multiple vendors or delays.
						</p>
						<div className="mt-8 flex gap-3">
							<a
								href="#contact"
								className="rounded-full border border-[#1e2a35] bg-[#1e2a35] px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-white"
							>
								Get in touch
							</a>
							<button
								type="button"
								onClick={() => navigate("/shop")}
								className="rounded-full border border-[#1e2a35] bg-transparent px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#1e2a35]"
							>
								Shop for furniture
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
