import mongoose from "mongoose";

const kontakSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true },
    email: { type: String, required: true },
    telepon: { type: String },
    pesan: { type: String, required: true },
    dibaca: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Kontak", kontakSchema);
