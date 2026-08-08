import { Routes, Route } from "react-router-dom";

import Beranda from "../pages/Beranda.jsx";
import Tentang from "../pages/Tentang.jsx";
import ProdukList from "../pages/Produk/ProdukList.jsx";
import ProdukDetail from "../pages/Produk/ProdukDetail.jsx";
import HomeServis from "../pages/HomeServis.jsx";
import BeritaList from "../pages/Berita/BeritaList.jsx";
import BeritaDetail from "../pages/Berita/BeritaDetail.jsx";
import Kontak from "../pages/Kontak.jsx";
import KebijakanPrivasi from "../pages/KebijakanPrivasi.jsx";
import SyaratKetentuan from "../pages/SyaratKetentuan.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Beranda />} />
      <Route path="/tentang" element={<Tentang />} />
      <Route path="/produk" element={<ProdukList />} />
      <Route path="/produk/kategori/:kategori" element={<ProdukList />} />
      <Route path="/produk/:id" element={<ProdukDetail />} />
      <Route path="/home-servis" element={<HomeServis />} />
      <Route path="/berita" element={<BeritaList />} />
      <Route path="/berita/:slug" element={<BeritaDetail />} />
      <Route path="/kontak" element={<Kontak />} />
      <Route path="/kebijakan-privasi" element={<KebijakanPrivasi />} />
      <Route path="/syarat-ketentuan" element={<SyaratKetentuan />} />
    </Routes>
  );
}

export default AppRoutes;
