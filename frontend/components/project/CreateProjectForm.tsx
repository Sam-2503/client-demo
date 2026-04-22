"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function CreateProjectForm({ onSuccess }: any) {
  const [name, setName] = useState("");
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState("");

  // 🔥 fetch real users
  useEffect(() => {
    const fetchClients = async () => {
      const res = await api.get("/auth/users"); // MUST EXIST
      const filtered = res.data.filter((u: any) => u.role === "client");
      setClients(filtered);
    };

    fetchClients();
  }, []);

  const handle = async () => {
    if (!selectedClient) {
      alert("Select a client");
      return;
    }

    await api.post("/projects", {
      name,
      client_id: selectedClient,
    });

    setName("");
    setSelectedClient("");
    onSuccess();
  };

  return (
    <div className="card">
      <div className="h2">Create Project</div>

      <input
        className="input"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        className="input"
        value={selectedClient}
        onChange={(e) => setSelectedClient(e.target.value)}
      >
        <option value="">Select Client</option>

        {clients.map((c) => (
          <option key={c.id} value={c.id}>
            {c.full_name}
          </option>
        ))}
      </select>

      <button className="btn" onClick={handle}>
        Create
      </button>
    </div>
  );
}
