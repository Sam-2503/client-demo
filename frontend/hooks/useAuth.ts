"use client";

import { useEffect, useState } from "react";

export default function useAuth() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  return { user };
}
