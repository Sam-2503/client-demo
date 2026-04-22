"use client";

import { useEffect, useState } from "react";
import { getMaterials } from "@/lib/materials";

export default function MaterialTable({ projectId }: any) {
  const [materials, setMaterials] = useState<any[]>([]);

  useEffect(() => {
    getMaterials(projectId).then(setMaterials);
  }, []);

  return (
    <div>
      {materials.map((m) => (
        <div key={m.id}>
          {m.name} - {m.total_cost}
        </div>
      ))}
    </div>
  );
}
