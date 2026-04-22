import api from "./api";

export const getUpdates = async (id: string) => {
  const res = await api.get(`/updates/${id}`);
  return res.data;
};

export const addUpdate = async (data: any) => {
  const res = await api.post("/updates", data);
  return res.data;
};
