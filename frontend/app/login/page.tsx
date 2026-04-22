"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handle = async () => {
    const res = await login({ email, password });
    if (res.access_token) router.push("/dashboard");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ background: "#1A1A1A", padding: 20 }}>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <br />
        <br />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button onClick={handle}>Login</button>
      </div>
      <div style={{ marginTop: 10 }}>
        <a href="/register">Create account</a>
      </div>
    </div>
  );
}
