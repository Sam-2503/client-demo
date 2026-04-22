"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {
        full_name: name,
        email,
        password,
        role: "client", // 🔥 FORCE CLIENT ROLE
      });

      alert("Account created. Please login.");
      router.push("/login");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error");
    }
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
      <div style={{ background: "#1A1A1A", padding: 30, width: 320 }}>
        <h2 style={{ color: "#C8971F", marginBottom: 20 }}>Register</h2>

        <input
          className="input"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn" onClick={handleRegister}>
          Register
        </button>

        <div style={{ marginTop: 10 }}>
          <a href="/login">Already have an account?</a>
        </div>
      </div>
    </div>
  );
}
