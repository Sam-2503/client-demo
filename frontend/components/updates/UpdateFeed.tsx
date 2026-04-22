"use client";

import { useEffect, useState } from "react";
import { getUpdates } from "@/lib/updates";

export default function UpdateFeed({ projectId }: any) {
  const [updates, setUpdates] = useState<any[]>([]);

  useEffect(() => {
    getUpdates(projectId).then(setUpdates);

    const socket = new WebSocket(
      `ws://127.0.0.1:8000/api/updates/ws/${projectId}`,
    );

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setUpdates((prev) => [data.update, ...prev]);
    };

    return () => socket.close();
  }, []);

  return (
    <div>
      {updates.map((u) => (
        <div key={u.id}>{u.title}</div>
      ))}
    </div>
  );
}
