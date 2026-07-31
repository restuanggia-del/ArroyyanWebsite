import api from "./api.js";

export const getAllBanner = () => api.get("/banner");
export const createBanner = (formData) =>
  api.post("/banner", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteBanner = (id) => api.delete(`/banner/${id}`);
