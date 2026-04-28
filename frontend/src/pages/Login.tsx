import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../types";

interface RoleOption {
	id: UserRole;
	name: string;
}

const ROLES: RoleOption[] = [
	{
		id: "builder",
		name: "Builder",
	},
	{
		id: "client",
		name: "Client",
	},
];

function EyeIcon({ open }: { open: boolean }) {
	return open ? (
		<svg
			viewBox="0 0 24 24"
			className="h-4.5 w-4.5"
			fill="none"
			aria-hidden="true"
		>
			<path
				d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z"
				stroke="currentColor"
				strokeWidth="1.7"
			/>
			<circle
				cx="12"
				cy="12"
				r="3"
				stroke="currentColor"
				strokeWidth="1.7"
			/>
		</svg>
	) : (
		<svg
			viewBox="0 0 24 24"
			className="h-4.5 w-4.5"
			fill="none"
			aria-hidden="true"
		>
			<path
				d="M4 4l16 16"
				stroke="currentColor"
				strokeWidth="1.7"
				strokeLinecap="round"
			/>
			<path
				d="M10.5 10.6a3 3 0 0 0 4.2 4.2"
				stroke="currentColor"
				strokeWidth="1.7"
				strokeLinecap="round"
			/>
			<path
				d="M9.3 5.4A10.5 10.5 0 0 1 12 5.1c6 0 9.5 6.9 9.5 6.9a18.8 18.8 0 0 1-3.6 4.8"
				stroke="currentColor"
				strokeWidth="1.7"
				strokeLinecap="round"
			/>
			<path
				d="M14.7 18.6A10.8 10.8 0 0 1 12 18.9c-6 0-9.5-6.9-9.5-6.9a18.6 18.6 0 0 1 3.2-4.4"
				stroke="currentColor"
				strokeWidth="1.7"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export default function Login() {
	const { login, register, loading } = useAuth();
	const navigate = useNavigate();

	const [mode, setMode] = useState<"login" | "register">("login");
	const [role, setRole] = useState<UserRole>("client");
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [err, setErr] = useState("");
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	const switchMode = (nextMode: "login" | "register") => {
		setMode(nextMode);
		setErr("");
		setShowSuccessMessage(false);
		setShowPassword(false);
	};

	const submit = async () => {
		setErr("");

		if (!email || !password) {
			setErr("Please fill all required fields.");
			return;
		}

		if (mode === "register" && !fullName) {
			setErr("Name is required.");
			return;
		}

		try {
			const result =
				mode === "login"
					? await login(email, password)
					: await register({
							full_name: fullName,
							email,
							password,
							role,
						});

			if (mode === "register" && role === "builder") {
				setShowSuccessMessage(true);
				setEmail("");
				setPassword("");
				setFullName("");
				return;
			}

			navigate(result.role === "client" ? "/client" : "/builder");
		} catch (error: any) {
			setErr(
				error?.response?.data?.detail ||
					error?.message ||
					"Something went wrong",
			);
		}
	};

	return (
		<>
			{mode === "register" ? (
				<title>RJS Homes - Register</title>
			) : (
				<title>RJS Homes - Login</title>
			)}
			<div className="relative min-h-screen overflow-hidden bg-[radial-gradient(120%_90%_at_50%_0%,#13263a_0%,#08111c_48%,#050911_100%)] px-4 py-8 text-white md:px-8">
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_84%_10%,rgba(216,188,143,0.14)_0%,transparent_60%),radial-gradient(55%_45%_at_12%_30%,rgba(93,126,161,0.2)_0%,transparent_70%)]" />
				<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.024)_1px,transparent_1px)] bg-[length:68px_68px] opacity-35" />

				<button
					type="button"
					className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[rgba(10,18,28,0.72)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c9d2de] shadow-[0_10px_24px_rgba(0,0,0,0.18)] backdrop-blur-xl transition hover:border-[#d8bc8f]/40 hover:text-[#f0e0c1]"
					onClick={() => navigate("/")}
				>
					<span aria-hidden="true">←</span>
					Back Home
				</button>

				<div className="relative mx-auto flex min-h-screen w-full max-w-[440px] flex-col items-center justify-center">
					{showSuccessMessage ? (
						<div className="w-full space-y-6 rounded-[24px] border border-white/10 bg-[linear-gradient(160deg,rgba(10,18,28,0.86)_0%,rgba(16,31,48,0.86)_100%)] p-8 shadow-[0_28px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
							<div>
								<div className="text-[11px] uppercase tracking-[0.18em] text-[#c9aa72]">
									Registration Status
								</div>
								<h2 className="mt-3 font-serif text-4xl text-[#f5efe2]">
									Registration submitted.
								</h2>
								<p className="mt-3 text-sm leading-7 text-[#c0ccd8]">
									Your builder account has been created and is
									pending admin approval.
								</p>
							</div>

							<div className="rounded-2xl border border-[rgba(99,176,125,0.28)] bg-[rgba(99,176,125,0.08)] p-5">
								<div className="text-[2.2rem] leading-none text-[#69c58a]">
									●
								</div>
								<div className="mt-3 font-serif text-[1.15rem] font-semibold text-[#69c58a]">
									Pending Admin Approval
								</div>
								<p className="mt-3 text-sm leading-7 text-[#c8d5e0]">
									We review every builder account for quality
									and security. You will receive access once
									the review is complete.
								</p>
							</div>

							<button
								type="button"
								className="inline-flex h-12 w-full items-center justify-center rounded-full border border-[#d8bc8f]/35 bg-[linear-gradient(90deg,#d8c29b_0%,#b58543_100%)] px-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#101824] transition hover:brightness-110"
								onClick={() => {
									setShowSuccessMessage(false);
									switchMode("login");
								}}
							>
								Back to Sign In
							</button>
						</div>
					) : (
						<div className="w-full space-y-6 rounded-[24px] border border-white/10 bg-[linear-gradient(160deg,rgba(10,18,28,0.86)_0%,rgba(16,31,48,0.86)_100%)] p-8 shadow-[0_28px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
							<div>
								<h1 className="font-serif text-[2.8rem] font-semibold leading-tight text-[#f5efe2]">
									{mode === "login"
										? "Welcome back."
										: "Create account."}
								</h1>
								<p className="mt-2 text-[13px] text-[#a9b7c8]">
									{mode === "login"
										? "Sign in to access your project dashboard."
										: "Register as a builder or client."}
								</p>
							</div>

							<div className="flex flex-wrap gap-2 rounded-full border border-white/10 bg-white/5 p-1">
								<button
									type="button"
									className={`flex-1 rounded-full px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
										mode === "login"
											? "bg-[#d8bc8f] text-[#101824]"
											: "text-[#c7d1de] hover:text-[#f3e7d1]"
									}`}
									onClick={() => switchMode("login")}
								>
									Sign In
								</button>
								<button
									type="button"
									className={`flex-1 rounded-full px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
										mode === "register"
											? "bg-[#d8bc8f] text-[#101824]"
											: "text-[#c7d1de] hover:text-[#f3e7d1]"
									}`}
									onClick={() => switchMode("register")}
								>
									Register
								</button>
							</div>

							{mode === "register" && (
								<div className="space-y-3">
									<label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#a9b7c8]">
										I am a:
									</label>
									<div className="grid grid-cols-2 gap-3">
										{ROLES.map((item) => {
											const selected = role === item.id;
											return (
												<button
													key={item.id}
													type="button"
													className={`relative rounded-2xl border p-4 text-center transition duration-300 ${
														selected
															? "border-[#d8bc8f]/45 bg-[rgba(216,188,143,0.08)]"
															: "border-white/10 bg-white/5 hover:border-[#d8bc8f]/25 hover:bg-white/8"
													}`}
													onClick={() =>
														setRole(item.id)
													}
												>
													{selected && (
														<div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#d8bc8f] text-[9px] font-bold text-[#101824]">
															✓
														</div>
													)}
													<div className="text-[12px] font-semibold text-[#f4ece0]">
														{item.name}
													</div>
												</button>
											);
										})}
									</div>
								</div>
							)}

							<div className="space-y-4">
								{mode === "register" && (
									<div>
										<label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#e8ebef]">
											Full Name
										</label>
										<input
											className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#8f9cac] focus:border-[#d8bc8f]/45 focus:bg-white/7"
											placeholder="Your full name"
											value={fullName}
											onChange={(e) =>
												setFullName(e.target.value)
											}
										/>
									</div>
								)}

								<div>
									<label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#e8ebef]">
										Email Address
									</label>
									<input
										className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#8f9cac] focus:border-[#d8bc8f]/45 focus:bg-white/7"
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

								<div>
									<label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#e8ebef]">
										Password
									</label>
									<div className="relative">
										<input
											className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-[#8f9cac] focus:border-[#d8bc8f]/45 focus:bg-white/7"
											type={
												showPassword
													? "text"
													: "password"
											}
											placeholder="••••••••"
											value={password}
											onChange={(e) =>
												setPassword(e.target.value)
											}
											onKeyDown={(e) =>
												e.key === "Enter" && submit()
											}
										/>
										<button
											type="button"
											className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-[#bcc7d4] transition hover:bg-white/5 hover:text-[#f4e7cf]"
											onClick={() =>
												setShowPassword((prev) => !prev)
											}
											aria-label={
												showPassword
													? "Hide password"
													: "Show password"
											}
										>
											<EyeIcon open={showPassword} />
										</button>
									</div>
								</div>
							</div>

							{err && (
								<div className="rounded-2xl border border-[rgba(209,81,72,0.24)] bg-[rgba(209,81,72,0.08)] px-4 py-3 text-sm text-[#f1a69f]">
									{err}
								</div>
							)}

							<button
								type="button"
								className="inline-flex h-12 w-full items-center justify-center rounded-full border border-[#d8bc8f]/35 bg-[linear-gradient(90deg,#d8c29b_0%,#b58543_100%)] px-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#101824] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
								onClick={submit}
								disabled={loading}
							>
								{loading
									? "Please wait..."
									: mode === "login"
										? "Sign In"
										: "Create Account"}
							</button>

							<div className="text-center text-[11px] text-[#a9b7c8]">
								{mode === "login" ? (
									<>
										No account yet?{" "}
										<button
											type="button"
											className="font-semibold text-[#e5c68d] transition hover:text-[#f0ddb2]"
											onClick={() =>
												switchMode("register")
											}
										>
											Register here
										</button>
									</>
								) : (
									<>
										Already have an account?{" "}
										<button
											type="button"
											className="font-semibold text-[#e5c68d] transition hover:text-[#f0ddb2]"
											onClick={() => switchMode("login")}
										>
											Sign In
										</button>
									</>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
