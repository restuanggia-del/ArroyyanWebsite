import api from "./api.js";

export const getTentang = () => api.get("/tentang");
export const updateTentang = (formData) =>
  api.put("/tentang", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
