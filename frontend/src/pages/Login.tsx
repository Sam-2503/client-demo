import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../types";

interface RoleOption {
	id: UserRole;
	ic: string;
	name: string;
	desc: string;
	badgeClass: string;
	bl: string;
}

const ROLES: RoleOption[] = [
	{
		id: "builder",
		ic: "🏗",
		name: "Builder",
		desc: "Manage projects & updates",
		badgeClass: "bg-[rgba(79,155,212,0.15)] text-[#4f9bd4]",
		bl: "Builder",
	},
	{
		id: "client",
		ic: "👤",
		name: "Client",
		desc: "View your project progress",
		badgeClass: "bg-[rgba(100,180,150,0.15)] text-[#64b496]",
		bl: "Client",
	},
];

export default function Login() {
	const { login, register, loading } = useAuth();
	const navigate = useNavigate();

	const [mode, setMode] = useState<"login" | "register">("login");
	const [role, setRole] = useState<UserRole>("client");
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [err, setErr] = useState("");
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	const switchMode = (m: "login" | "register") => {
		setMode(m);
		setErr("");
		setShowSuccessMessage(false);
	};

	const submit = async () => {
		setErr("");
		if (!email || !password) {
			setErr("Please fill all fields");
			return;
		}
		if (mode === "register" && !fullName) {
			setErr("Name is required");
			return;
		}

		try {
			let u;
			if (mode === "login") {
				u = await login(email, password);
			} else {
				u = await register({
					full_name: fullName,
					email,
					password,
					role,
				});
			}

			if (mode === "register" && role === "builder") {
				setShowSuccessMessage(true);
				setEmail("");
				setPassword("");
				setFullName("");
			} else {
				navigate(u.role === "client" ? "/client" : "/builder");
			}
		} catch (e: any) {
			setErr(
				e?.response?.data?.detail ||
					e?.message ||
					"Something went wrong",
			);
		}
	};

	return (
		<div className="relative flex min-h-screen items-center justify-center overflow-y-auto bg-brand-black px-4 py-4 text-white">
			<button
				type="button"
				className="absolute left-4 top-4 inline-flex items-center gap-2 rounded border border-brand-border-light bg-brand-card px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.5px] text-brand-muted transition-all duration-300 hover:border-brand-gold hover:text-brand-gold"
				onClick={() => navigate("/")}
			>
				<span aria-hidden="true">←</span>
				Back
			</button>
			<div className="w-full max-w-[450px] animate-fade-up">
				<div className="mb-4 flex items-center gap-2 text-left">
					<div className="font-serif text-[20px] font-bold tracking-[2px] text-brand-gold">
						RJS
					</div>
					<div>
						<div className="mb-0.5 font-serif text-sm font-semibold text-white">
							RJS Homes
						</div>
						<div className="text-[10px] uppercase tracking-[1px] text-brand-muted">
							Project Portal
						</div>
					</div>
				</div>

				<div className="overflow-hidden rounded-lg border border-brand-border-light bg-brand-card shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
					<div className="h-0.5 bg-brand-gold" />
					<div className="px-4 py-5 sm:px-5">
						{showSuccessMessage ? (
							<div className="flex flex-col gap-4">
								<div>
									<div className="mb-2 font-serif text-[18px] font-bold text-white">
										Registration Successful
									</div>
									<div className="text-xs text-brand-muted">
										Your builder account has been created
									</div>
								</div>

								<div className="flex flex-col gap-4 rounded-lg border border-[rgba(39,174,96,0.3)] bg-[rgba(39,174,96,0.1)] p-5 text-center">
									<div className="text-[3rem] leading-none text-[#27ae60]">
										✓
									</div>
									<div className="font-serif text-[1.12rem] font-semibold text-[#27ae60]">
										Pending Admin Approval
									</div>
									<div className="text-sm leading-6 text-brand-muted">
										Your registration is pending admin
										approval. You will be able to access
										your account once an administrator
										reviews and approves your request. This
										typically takes 24-48 hours.
									</div>
									<div className="rounded-md bg-[rgba(39,174,96,0.05)] p-4 text-left">
										<strong className="mb-3 block text-xs font-semibold uppercase tracking-[0.05em] text-[#27ae60]">
											What to expect:
										</strong>
										<ul className="flex flex-col gap-2">
											<li className="relative pl-4 text-sm text-brand-muted before:absolute before:left-0 before:text-[#27ae60] before:content-['✓']">
												Admin will review your
												credentials
											</li>
											<li className="relative pl-4 text-sm text-brand-muted before:absolute before:left-0 before:text-[#27ae60] before:content-['✓']">
												You'll receive an email once
												approved
											</li>
											<li className="relative pl-4 text-sm text-brand-muted before:absolute before:left-0 before:text-[#27ae60] before:content-['✓']">
												You can then log in with your
												credentials
											</li>
										</ul>
									</div>
								</div>

								<button
									type="button"
									className="mt-4 inline-flex w-full items-center justify-center rounded border border-brand-gold bg-brand-gold px-4 py-3 text-xs font-bold uppercase tracking-[1px] text-brand-black transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-gold-light hover:bg-brand-gold-light disabled:cursor-not-allowed disabled:opacity-60"
									onClick={() => {
										setShowSuccessMessage(false);
										switchMode("login");
									}}
								>
									Back to Login →
								</button>
							</div>
						) : (
							<div className="flex flex-col">
								<div className="mb-2 font-serif text-[18px] font-bold text-white">
									{mode === "login"
										? "Welcome Back"
										: "Create Account"}
								</div>
								<div className="mb-4 text-xs text-brand-muted">
									{mode === "login"
										? "Sign in to your project portal"
										: "Register to get access"}
								</div>

								{mode === "register" && (
									<>
										<div className="mb-4 grid grid-cols-2 gap-3">
											{ROLES.map((r) => {
												const selected = role === r.id;

												return (
													<button
														key={r.id}
														type="button"
														className={`relative rounded-md border-2 px-4 py-4 text-center transition-all duration-300 ${
															selected
																? "border-brand-gold bg-[rgba(200,151,31,0.08)]"
																: "border-brand-border-light bg-brand-panel hover:border-brand-gold hover:bg-brand-panel-light"
														}`}
														onClick={() =>
															setRole(r.id)
														}
													>
														{selected && (
															<div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-gold text-[10px] font-bold text-brand-black">
																✓
															</div>
														)}
														<div className="mb-2 text-2xl leading-none">
															{r.ic}
														</div>
														<div className="mb-0.5 text-xs font-semibold text-white">
															{r.name}
														</div>
														<div className="mb-2 text-[10px] text-brand-muted">
															{r.desc}
														</div>
														<span
															className={`inline-flex rounded-sm px-2 py-1 text-[10px] font-semibold ${r.badgeClass}`}
														>
															{r.bl}
														</span>
													</button>
												);
											})}
										</div>

										<div className="mb-4">
											<label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.5px] text-white">
												Full Name
											</label>
											<input
												className="w-full rounded border border-brand-border-light bg-brand-panel px-3 py-2 text-xs text-white transition-all duration-300 placeholder:text-brand-muted focus:border-brand-gold focus:bg-brand-panel-light focus:outline-none"
												placeholder="Your full name"
												value={fullName}
												onChange={(e) =>
													setFullName(e.target.value)
												}
											/>
										</div>
									</>
								)}

								<div className="mb-4">
									<label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.5px] text-white">
										Email Address
									</label>
									<input
										className="w-full rounded border border-brand-border-light bg-brand-panel px-3 py-2 text-xs text-white transition-all duration-300 placeholder:text-brand-muted focus:border-brand-gold focus:bg-brand-panel-light focus:outline-none"
										type="email"
										placeholder="you@example.com"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										onKeyDown={(e) =>
											e.key === "Enter" && submit()
										}
									/>
								</div>

								<div className="mb-4">
									<label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.5px] text-white">
										Password
									</label>
									<input
										className="w-full rounded border border-brand-border-light bg-brand-panel px-3 py-2 text-xs text-white transition-all duration-300 placeholder:text-brand-muted focus:border-brand-gold focus:bg-brand-panel-light focus:outline-none"
										type="password"
										placeholder="••••••••"
										value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
										onKeyDown={(e) =>
											e.key === "Enter" && submit()
										}
									/>
								</div>

								{err && (
									<div className="mb-4 animate-fade-in rounded border border-[rgba(192,57,43,0.3)] bg-[rgba(192,57,43,0.1)] px-4 py-3 text-xs text-[#e74c3c]">
										{err}
									</div>
								)}

								<button
									type="button"
									className="mb-3 inline-flex w-full items-center justify-center rounded border border-brand-gold bg-brand-gold px-4 py-3 text-xs font-bold uppercase tracking-[1px] text-brand-black transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-gold-light hover:bg-brand-gold-light disabled:cursor-not-allowed disabled:opacity-60"
									onClick={submit}
									disabled={loading}
								>
									{loading
										? "Please wait…"
										: mode === "login"
											? "Sign In →"
											: "Create Account →"}
								</button>

								<div className="mb-3 text-center text-[11px] text-brand-muted">
									{mode === "login" ? (
										<>
											No account?{" "}
											<button
												type="button"
												className="font-semibold text-brand-gold transition-colors duration-300 hover:text-brand-gold-light"
												onClick={() =>
													switchMode("register")
												}
											>
												Register here
											</button>
										</>
									) : (
										<>
											Have an account?{" "}
											<button
												type="button"
												className="font-semibold text-brand-gold transition-colors duration-300 hover:text-brand-gold-light"
												onClick={() =>
													switchMode("login")
												}
											>
												Sign In
											</button>
										</>
									)}
								</div>

								<div className="text-center text-[9px] uppercase tracking-[0.5px] text-[#777]">
									RJS Homes · Hyderabad · Est. 2002
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
