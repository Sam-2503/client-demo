import api from "./api";

export const getMaterials = async (id: string) => {
  const res = await api.get(`/materials/${id}`);
  return res.data;
};

export const addMaterial = async (data: any) => {
  const res = await api.post("/materials", data);
  return res.data;
};
