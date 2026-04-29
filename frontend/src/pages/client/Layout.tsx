import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../utils/cn";

export default function ClientLayout() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const initials =
		user?.full_name
			?.split(" ")
			.map((w) => w[0])
			.join("")
			.toUpperCase()
			.slice(0, 2) ?? "C";

	const doLogout = () => {
		logout();
		navigate("/login");
	};

	const nav = [
		{ to: "/client", label: "Overview", end: true },
		{ to: "/client/progress", label: "Progress" },
		{ to: "/client/updates", label: "Updates" },
		{ to: "/client/queries", label: "Questions" },
	];

	return (
		<>
			<title>RJS Homes - Client Portal</title>
			<div className="flex min-h-screen w-full bg-[#eef3f6] text-[#1f2a34]">
				{/* ── SIDEBAR ── */}
				<div className="flex w-[280px] shrink-0 flex-col border-r border-black/10 bg-[#f8fafb] backdrop-blur-xl">
					{/* Logo */}
					<div className="flex mb-6 border-b border-black/10 px-4 py-6">
						<img
							src="/rjs-logo.svg"
							className="h-12 w-12 rounded-full border border-[#d5b47a]/40 bg-[radial-gradient(circle_at_30%_25%,#e4cda2_0%,#b68945_60%,#7a5a2e_100%)] shadow-[0_8px_24px_rgba(182,137,69,0.35)]"
						/>
						<div>
							<div className="pl-8 font-serif text-lg font-semibold text-[#1f2a34]">
								RJS Homes
							</div>
							<div className="pl-8 text-[10px] uppercase tracking-[0.12em] text-[#5d6a78]">
								Client Portal
							</div>
						</div>
					</div>

					<div className="mb-6 flex items-center gap-3 rounded-2xl border border-black/10 bg-[#f7f8fa] p-3">
						<div className="grid h-10 w-10 place-items-center rounded-full bg-[#1f2a34] font-semibold text-white">
							{initials}
						</div>
						<div>
							<div className="text-sm font-medium text-[#1f2a34]">
								{user?.full_name}
							</div>
							<div className="text-[10px] uppercase text-[#5d6a78]">
								{user?.role}
							</div>
						</div>
					</div>

					{/* Nav */}
					<div className="px-4 pb-2 text-[10px] uppercase tracking-[0.12em] text-[#5d6a78]">
						Navigation
					</div>
					{nav.map((n) => (
						<NavLink
							key={n.to}
							to={n.to}
							end={n.end}
							className={({ isActive }) =>
								cn(
									"mx-3 mb-1 flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition",
									isActive
										? "border-black/10 bg-black/5 text-[#1f2a34]"
										: "border-black/10 text-[#475462] hover:bg-black/5 hover:text-[#1f2a34]",
								)
							}
						>
							{n.label}
						</NavLink>
					))}

					<div className="mt-auto border-t border-black/10 p-4">
						<button
							className="w-full rounded-xl border border-black/10 bg-[#f7f8fa] px-3 py-2 text-sm font-medium text-[#475462] transition hover:bg-black/5 hover:text-[#1f2a34]"
							onClick={doLogout}
						>
							Sign Out
						</button>
					</div>
				</div>

				{/* ── MAIN ── */}
				<div className="relative min-w-0 flex-1 overflow-x-hidden bg-[#eef3f6]">
					<Outlet />
				</div>
			</div>
		</>
	);
}
