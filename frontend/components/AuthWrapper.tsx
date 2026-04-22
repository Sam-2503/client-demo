"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthWrapper({ children }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ✅ allow public routes
    const publicRoutes = ["/login", "/register"];

    if (!token && !publicRoutes.includes(pathname)) {
      router.push("/login");
    } else {
      setReady(true);
    }
  }, [pathname]);

  if (!ready) return null;

  return children;
}
