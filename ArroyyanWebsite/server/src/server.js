import "dotenv/config";
import fs from "fs";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

// Pastikan folder uploads ada (dipakai untuk simpan gambar produk/banner/berita/dll)
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
});
