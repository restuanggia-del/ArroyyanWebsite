import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    judul: { type: String },
    gambar: { type: String, required: true },
    urutan: { type: Number, default: 0 },
    aktif: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Banner", bannerSchema);
