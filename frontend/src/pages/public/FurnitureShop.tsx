const FEATURED_PRODUCTS = [
	{
		name: "Linea Lounge Sofa",
		price: "₹ 72,900",
		rating: "4.8",
		reviews: "128 reviews",
		location: "Living room",
		image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
	},
	{
		name: "Oak Frame Bed",
		price: "₹ 58,400",
		rating: "4.7",
		reviews: "84 reviews",
		location: "Bedroom",
		image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
	},
	{
		name: "Nordic Dining Set",
		price: "₹ 46,200",
		rating: "4.9",
		reviews: "95 reviews",
		location: "Dining room",
		image: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
	},
	{
		name: "Soft Arch Accent Chair",
		price: "₹ 18,500",
		rating: "4.6",
		reviews: "61 reviews",
		location: "Lounge",
		image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1200&auto=format&fit=crop",
	},
	{
		name: "Cloud Fabric Armchair",
		price: "₹ 24,900",
		rating: "4.8",
		reviews: "103 reviews",
		location: "Reading nook",
		image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=1200&auto=format&fit=crop",
	},
	{
		name: "Studio Storage Cabinet",
		price: "₹ 31,200",
		rating: "4.5",
		reviews: "47 reviews",
		location: "Home office",
		image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1200&auto=format&fit=crop",
	},
];

const FILTERS = ["Sofas", "Beds", "Tables", "Chairs", "Storage", "Decor"];

const COLORS = ["Oak", "Walnut", "Ash", "White", "Sand"];

export default function FurnitureShop() {
	return (
		<>
			<title>RJS Homes - Furniture Shop</title>
			<div className="min-h-screen bg-[#f1f2f4] text-[#1f2a34]">
				<header className="border-b border-black/10 bg-white/90 backdrop-blur-sm">
					<div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-4 md:px-8 lg:flex-row lg:items-center lg:justify-between">
						<div>
							<div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5a6977]">
								RJS Homes Furniture
							</div>
							<h1 className="mt-1 font-serif text-3xl font-semibold text-[#1f2a34]">
								Shop for furniture
							</h1>
						</div>
						<div className="flex flex-1 flex-col gap-3 lg:max-w-[780px] lg:flex-row">
							<div className="flex items-center gap-2 rounded-full border border-black/10 bg-[#f8fafb] px-4 py-2 text-sm text-[#5d6a78] lg:flex-[1.2]">
								<span className="text-xs font-semibold uppercase tracking-[0.1em]">
									Category
								</span>
								<select className="min-w-0 flex-1 bg-transparent text-[#1f2a34] outline-none">
									<option>Living room</option>
									<option>Bedroom</option>
									<option>Dining room</option>
									<option>Office</option>
								</select>
							</div>
							<div className="flex flex-1 items-center gap-2 rounded-full border border-black/10 bg-[#f8fafb] px-4 py-2 lg:flex-[1.8]">
								<input
									className="w-full bg-transparent text-sm outline-none"
									placeholder="Search chairs, sofas, beds..."
								/>
								<button className="rounded-full bg-[#1e2a35] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white">
									Search
								</button>
							</div>
						</div>
					</div>
				</header>

				<main className="mx-auto grid max-w-[1440px] gap-6 px-4 py-6 md:px-8 lg:grid-cols-[270px_1fr]">
					<aside className="rounded-[18px] border border-black/10 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
						<div className="flex items-center justify-between">
							<h2 className="font-serif text-xl font-semibold text-[#1f2a34]">
								Filter
							</h2>
							<button className="text-sm text-[#5d6a78]">
								Clear all
							</button>
						</div>

						<div className="mt-6 space-y-5">
							<div>
								<div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5a6977]">
									Shop by type
								</div>
								<div className="mt-3 flex flex-wrap gap-2">
									{FILTERS.map((item) => (
										<span
											key={item}
											className="rounded-full border border-black/10 bg-[#f8fafb] px-3 py-1 text-xs text-[#475462]"
										>
											{item}
										</span>
									))}
								</div>
							</div>

							<div>
								<div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5a6977]">
									Price range
								</div>
								<div className="mt-3 rounded-2xl border border-black/10 bg-[#f8fafb] px-4 py-3 text-sm text-[#1f2a34]">
									₹ 8,000 - ₹ 95,000
								</div>
							</div>

							<div>
								<div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5a6977]">
									Color
								</div>
								<div className="mt-3 flex flex-wrap gap-2">
									{COLORS.map((item) => (
										<span
											key={item}
											className="rounded-full border border-black/10 px-3 py-1 text-xs text-[#475462]"
										>
											{item}
										</span>
									))}
								</div>
							</div>
						</div>
					</aside>

					<section className="space-y-5">
						<div className="flex flex-col gap-4 rounded-[18px] border border-black/10 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)] md:flex-row md:items-center md:justify-between">
							<div className="flex gap-2">
								<button className="rounded-full bg-[#1e2a35] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white">
									Products
								</button>
								<button className="rounded-full border border-black/10 bg-[#f8fafb] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#475462]">
									Stores
								</button>
							</div>
							<div className="flex items-center gap-3 text-sm text-[#5d6a78]">
								<span className="rounded-full border border-black/10 bg-[#f8fafb] px-4 py-2">
									Price range
								</span>
								<span className="rounded-full border border-black/10 bg-[#f8fafb] px-4 py-2">
									Sort by: Reviews
								</span>
							</div>
						</div>

						<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
							{FEATURED_PRODUCTS.map((product) => (
								<article
									key={product.name}
									className="group overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)]"
								>
									<div className="relative aspect-[4/3] overflow-hidden bg-[#eef3f6]">
										<img
											src={product.image}
											alt={product.name}
											className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
										/>
									</div>
									<div className="space-y-3 p-4">
										<div>
											<h3 className="font-serif text-[1.05rem] font-semibold text-[#1f2a34]">
												{product.name}
											</h3>
											<p className="mt-1 text-sm text-[#5d6a78]">
												{product.location}
											</p>
										</div>
										<div className="flex items-center justify-between text-sm text-[#475462]">
											<span>★ {product.rating}</span>
											<span>{product.reviews}</span>
										</div>
										<div className="flex items-center justify-between">
											<div className="text-lg font-semibold text-[#1f2a34]">
												{product.price}
											</div>
											<button className="rounded-full bg-[#1e2a35] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white">
												Add to cart
											</button>
										</div>
									</div>
								</article>
							))}
						</div>
					</section>
				</main>
			</div>
		</>
	);
}
