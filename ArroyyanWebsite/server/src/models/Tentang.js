import mongoose from "mongoose";

const tentangSchema = new mongoose.Schema(
  {
    sejarah: { type: String, default: "" },
    lokasi: { type: String, default: "" },
    visi: { type: String, default: "" },
    misi: { type: String, default: "" },
    foto: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model("Tentang", tentangSchema);
