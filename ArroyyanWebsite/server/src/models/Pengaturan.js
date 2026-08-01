import mongoose from "mongoose";

const pengaturanSchema = new mongoose.Schema(
  {
    alamat: { type: String, default: "" },
    telepon: { type: String, default: "" },
    email: { type: String, default: "" },
    instagram: { type: String, default: "" },
    facebook: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    mapsEmbedUrl: { type: String, default: "" },

    tahunBerdiri: { type: Number, default: null },
    jumlahDistributor: { type: String, default: "" },
    literProduksiPerBulan: { type: String, default: "" },
    jumlahPelangganPuas: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model("Pengaturan", pengaturanSchema);
