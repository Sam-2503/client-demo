"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { getProjects } from "@/lib/projects";
import ProjectCard from "@/components/project/ProjectCard";
import CreateProjectForm from "@/components/project/CreateProjectForm";

export default function Dashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  const fetch = async () => {
    const res = await getProjects();
    setProjects(res);
  };

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
    fetch();
  }, []);

  if (!user) return null;

  const isBuilder = user.role === "builder" || user.role === "admin";

  return (
    <Layout>
      <div className="h1">Dashboard</div>

      {/* ✅ ONLY BUILDERS + ADMINS */}
      {isBuilder && <CreateProjectForm onSuccess={fetch} />}

      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </Layout>
  );
}
