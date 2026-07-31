import mongoose from "mongoose";

const homeServisSchema = new mongoose.Schema(
  {
    judul: { type: String, default: "Home Servis (Distribusi)" },
    deskripsi: { type: String, default: "" },
    areaCakupan: { type: String, default: "" },
    alurPemesanan: { type: String, default: "" },
    minimalOrder: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model("HomeServis", homeServisSchema);
