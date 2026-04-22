"use client";

import { useState } from "react";
import { addMaterial } from "@/lib/materials";

export default function AddMaterialForm({ projectId, onSuccess }: any) {
  const [name, setName] = useState("");

  const handle = async () => {
    await addMaterial({
      name,
      quantity: 1,
      unit_cost: 100,
      project_id: projectId,
    });

    onSuccess();
  };

  return (
    <div>
      <input onChange={(e) => setName(e.target.value)} />
      <button onClick={handle}>Add Material</button>
    </div>
  );
}
