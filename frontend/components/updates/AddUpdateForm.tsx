"use client";

import { useState } from "react";
import { addUpdate } from "@/lib/updates";

export default function AddUpdateForm({ projectId, onSuccess }: any) {
  const [title, setTitle] = useState("");

  const handle = async () => {
    await addUpdate({
      title,
      project_id: projectId,
      progress_percentage: 10,
      category: "other",
      photo_urls: [],
    });

    onSuccess();
  };

  return (
    <div>
      <input onChange={(e) => setTitle(e.target.value)} />
      <button onClick={handle}>Add Update</button>
    </div>
  );
}
