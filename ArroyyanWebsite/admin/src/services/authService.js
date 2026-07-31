import api from "./api.js";

export const login = (email, password) => api.post("/auth/login", { email, password });
