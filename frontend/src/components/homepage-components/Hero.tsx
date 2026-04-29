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
							From Dreams to Finished Spaces
						</h1>
						<p className="mt-4 max-w-[560px] text-sm leading-7 text-[#000000]">
							RJS Homes takes care of planning and construction of
							your dream house till delivering your furniture
							right at your doorstep
						</p>
						<div className="mt-8 flex gap-3">
							<a
								href="/login"
								className="mt-2 rounded-full border border-[#1e2a35] bg-[#1e2a35] px-4 py-2 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:opacity-90 md:mt-0"
							>
								Track your project
							</a>
							<button
								type="button"
								onClick={() => navigate("/shop")}
								className="mt-2 rounded-full border border-[#1e2a35] bg-transparent px-4 py-2 text-sm font-bold uppercase tracking-[0.14em] text-[#1e2a35] transition hover:bg-[#1e2a35] hover:text-white md:mt-0"
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
