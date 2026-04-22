"use client";

import { useEffect, useState } from "react";

export default function Sidebar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  if (!user) return null;

  return (
    <div className="sidebar">
      <div style={{ color: "#C8971F", marginBottom: 20 }}>RJS Homes</div>

      <div style={{ marginBottom: 20 }}>
        <div>{user.full_name}</div>
        <div style={{ color: "#888" }}>{user.role}</div>
      </div>

      <a href="/dashboard">Dashboard</a>

      <br />
      <br />

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );
}
