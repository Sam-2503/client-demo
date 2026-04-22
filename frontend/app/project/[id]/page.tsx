"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { getProject } from "@/lib/projects";
import AddUpdateForm from "@/components/updates/AddUpdateForm";
import UpdateFeed from "@/components/updates/UpdateFeed";
import AddMaterialForm from "@/components/materials/AddMaterialForm";
import MaterialTable from "@/components/materials/MaterialTable";

export default function Page() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);

  const fetch = async () => {
    const res = await getProject(id as string);
    setProject(res);
  };

  useEffect(() => {
    fetch();
  }, []);

  if (!project) return <div>Loading...</div>;

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isBuilder = user.role === "builder";

  return (
    <Layout>
      <h2>{project.name}</h2>

      <div>Progress: {project.overall_progress}%</div>

      {isBuilder && <AddUpdateForm projectId={id} onSuccess={fetch} />}
      <UpdateFeed projectId={id} />

      {isBuilder && <AddMaterialForm projectId={id} onSuccess={fetch} />}
      <MaterialTable projectId={id} />
    </Layout>
  );
}
