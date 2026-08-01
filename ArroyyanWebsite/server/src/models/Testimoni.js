import mongoose from "mongoose";

const testimoniSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true },
    peran: { type: String, default: "" },
    pesan: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    foto: { type: String },
    aktif: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model("Testimoni", testimoniSchema);
