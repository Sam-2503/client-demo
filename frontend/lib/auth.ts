import api from "./api";

export const login = async (data: any) => {
  const res = await api.post("/auth/login", data);

  localStorage.setItem("token", res.data.access_token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data;
};
