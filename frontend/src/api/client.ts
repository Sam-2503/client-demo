import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: apiUrl,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("rjs_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// If 401 anywhere — wipe token and redirect to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("rjs_token");
      localStorage.removeItem("rjs_user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  },
);

export default api;
