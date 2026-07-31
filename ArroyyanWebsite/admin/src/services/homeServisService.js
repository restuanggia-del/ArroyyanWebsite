import api from "./api.js";

export const getHomeServis = () => api.get("/home-servis");
export const updateHomeServis = (data) => api.put("/home-servis", data);
