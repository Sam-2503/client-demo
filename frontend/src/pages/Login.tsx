import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../types";

interface RoleOption {
  id: UserRole;
  ic: string;
  name: string;
  desc: string;
  badge: string;
  bl: string;
}

const ROLES: RoleOption[] = [
  {
    id: "builder",
    ic: "🏗",
    name: "Builder",
    desc: "Manage projects & updates",
    badge: "b-builder",
    bl: "Builder",
  },
  {
    id: "client",
    ic: "👤",
    name: "Client",
    desc: "View your project progress",
    badge: "b-client",
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

  const switchMode = (m: "login" | "register") => {
    setMode(m);
    setErr("");
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
        u = await register({ full_name: fullName, email, password, role });
      }
      navigate(u.role === "client" ? "/client" : "/builder");
    } catch (e: any) {
      setErr(e?.response?.data?.detail || e?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-screen">
      <div className="login-wrap">
        {/* Brand */}
        <div className="login-brand">
          <div className="login-brand-icon">RJS</div>
          <div>
            <div className="login-brand-name">RJS Homes</div>
            <div className="login-brand-sub">Project Portal</div>
          </div>
        </div>

        {/* Card */}
        <div className="login-card">
          <div className="login-gold-bar" />
          <div className="login-inner">
            <div className="login-h">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </div>
            <div className="login-s">
              {mode === "login"
                ? "Sign in to your project portal"
                : "Register to get access"}
            </div>

            {/* Role selector — register only */}
            {mode === "register" && (
              <>
                <div className="acc-grid">
                  {ROLES.map((r) => (
                    <div
                      key={r.id}
                      className={`acc${role === r.id ? " sel" : ""}`}
                      onClick={() => setRole(r.id)}
                    >
                      {role === r.id && <div className="acc-check">✓</div>}
                      <div className="acc-ic">{r.ic}</div>
                      <div className="acc-n">{r.name}</div>
                      <div className="acc-d">{r.desc}</div>
                      <span className={`badge ${r.badge}`}>{r.bl}</span>
                    </div>
                  ))}
                </div>

                <div className="fg">
                  <label className="fl">Full Name</label>
                  <input
                    className="fi-inp"
                    placeholder="Your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="fg">
              <label className="fl">Email Address</label>
              <input
                className="fi-inp"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
              />
            </div>

            <div className="fg">
              <label className="fl">Password</label>
              <input
                className="fi-inp"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
              />
            </div>

            {err && <div className="login-err">{err}</div>}

            <button className="login-btn" onClick={submit} disabled={loading}>
              {loading
                ? "Please wait…"
                : mode === "login"
                  ? "Sign In →"
                  : "Create Account →"}
            </button>

            <div className="login-toggle">
              {mode === "login" ? (
                <>
                  No account?{" "}
                  <span onClick={() => switchMode("register")}>
                    Register here
                  </span>
                </>
              ) : (
                <>
                  Have an account?{" "}
                  <span onClick={() => switchMode("login")}>Sign In</span>
                </>
              )}
            </div>

            <div className="login-hint">RJS Homes · Hyderabad · Est. 2002</div>
          </div>
        </div>
      </div>
    </div>
  );
}
