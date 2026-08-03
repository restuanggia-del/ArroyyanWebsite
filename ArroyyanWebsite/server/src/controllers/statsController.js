import Produk from "../models/Produk.js";
import Berita from "../models/Berita.js";
import Banner from "../models/Banner.js";
import Kontak from "../models/Kontak.js";

export const getStats = async (req, res) => {
  try {
    const [
      totalProduk,
      totalBerita,
      totalBanner,
      totalPesan,
      pesanBelumDibaca,
    ] = await Promise.all([
      Produk.countDocuments(),
      Berita.countDocuments(),
      Banner.countDocuments(),
      Kontak.countDocuments(),
      Kontak.countDocuments({ dibaca: false }),
    ]);

    res.json({
      totalProduk,
      totalBerita,
      totalBanner,
      totalPesan,
      pesanBelumDibaca,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
