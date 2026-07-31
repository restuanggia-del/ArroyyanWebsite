import mongoose from "mongoose";

const beritaSchema = new mongoose.Schema(
  {
    judul: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    kategori: {
      type: String,
      enum: ["kegiatan", "penghargaan", "promo", "lainnya"],
      default: "lainnya",
    },
    ringkasan: { type: String, required: true },
    konten: { type: String, required: true },
    gambar: { type: String },
    penulis: { type: String, default: "Admin Arroyyan" },
    status: { type: String, enum: ["draft", "publish"], default: "draft" },
  },
  { timestamps: true }
);

export default mongoose.model("Berita", beritaSchema);
