import mongoose from "mongoose";

const produkSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true },
    kategori: {
      type: String,
      required: true,
      enum: ["cup", "botol", "galon"],
    },
    volume: { type: String, required: true }, // contoh: "200ml", "600ml", "19L"
    deskripsi: { type: String, required: true },
    komposisi: { type: String }, // kandungan mineral, dll
    gambar: { type: String }, // path ke file di /uploads
    isiPerDus: { type: Number }, // contoh: isi 48 pcs per dus (untuk cup/botol)
    harga: { type: Number },
    unggulan: { type: Boolean, default: false }, // untuk tampil di "Produk Unggulan"
    status: { type: String, enum: ["aktif", "nonaktif"], default: "aktif" },
  },
  { timestamps: true }
);

export default mongoose.model("Produk", produkSchema);
