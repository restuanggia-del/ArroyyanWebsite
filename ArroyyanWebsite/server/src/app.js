import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import produkRoutes from "./routes/produkRoutes.js";
import beritaRoutes from "./routes/beritaRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import kontakRoutes from "./routes/kontakRoutes.js";
import homeServisRoutes from "./routes/homeServisRoutes.js";
import pengaturanRoutes from "./routes/pengaturanRoutes.js";
import testimoniRoutes from "./routes/testimoniRoutes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: [process.env.CLIENT_WEBSITE_URL, process.env.CLIENT_ADMIN_URL],
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan("dev"));

// Static folder untuk gambar upload (produk, banner, berita)
app.use("/uploads", express.static("uploads"));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Arroyyan99 API berjalan dengan baik" });
});

app.use("/api/auth", authRoutes);
app.use("/api/produk", produkRoutes);
app.use("/api/berita", beritaRoutes);
app.use("/api/banner", bannerRoutes);
app.use("/api/kontak", kontakRoutes);
app.use("/api/home-servis", homeServisRoutes);
app.use("/api/pengaturan", pengaturanRoutes);
app.use("/api/testimoni", testimoniRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan" });
});

// Error handler global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Terjadi kesalahan pada server",
  });
});

export default app;
