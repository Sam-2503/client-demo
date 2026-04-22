"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import api from "@/lib/api";

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  const fetch = async () => {
    const res = await api.get("/auth/users");
    setUsers(res.data);
  };

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(u);

    if (u.role !== "admin") {
      window.location.href = "/dashboard";
    } else {
      fetch();
    }
  }, []);

  const makeBuilder = async (id: string) => {
    await api.patch(`/auth/users/${id}`, {
      role: "builder",
    });
    fetch();
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="h1">Admin Panel</div>

      {users.map((u) => (
        <div key={u.id} className="card">
          <div>{u.full_name}</div>
          <div>{u.email}</div>
          <div>Role: {u.role}</div>

          {u.role === "client" && (
            <button className="btn" onClick={() => makeBuilder(u.id)}>
              Make Builder
            </button>
          )}
        </div>
      ))}
    </Layout>
  );
}
