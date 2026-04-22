import api from "./api";

export const getProjects = async () => {
  const res = await api.get("/projects");
  return res.data;
};

export const getProject = async (id: string) => {
  const res = await api.get(`/projects/${id}`);
  return res.data;
};
