import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProdukUnggulan } from "../services/produkService.js";
import { getAllBanner } from "../services/bannerService.js";

function Beranda() {
  const [banners, setBanners] = useState([]);
  const [produkUnggulan, setProdukUnggulan] = useState([]);

  useEffect(() => {
    getAllBanner().then((res) => setBanners(res.data)).catch(() => {});
    getProdukUnggulan().then((res) => setProdukUnggulan(res.data)).catch(() => {});
  }, []);

  return (
    <div>
      {/* Banner Slider - gunakan library Swiper (sudah terpasang di package.json) */}
      <section className="relative h-[400px] bg-gray-100 md:h-[500px]">
        {/* TODO: implementasikan Swiper carousel di sini menggunakan data `banners` */}
        <div className="flex h-full items-center justify-center text-gray-400">
          Banner Slider ({banners.length} gambar)
        </div>
      </section>

      {/* Produk Unggulan */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-secondary">Produk Unggulan</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {produkUnggulan.map((produk) => (
            <div key={produk._id} className="rounded-xl border p-4 shadow-sm">
              <h3 className="font-semibold">{produk.nama}</h3>
              <p className="text-sm text-gray-500">{produk.volume}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <Link to="/produk" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700">
            Lihat Selengkapnya
          </Link>
        </div>
      </section>

      {/* Mengapa Arroyyan */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-secondary">Mengapa Arroyyan?</h2>
          {/* TODO: isi dengan poin-poin keunggulan, sertifikasi BPOM/SNI/Halal, statistik */}
        </div>
      </section>

      {/* Maps */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-secondary">Lokasi Kami</h2>
        {/* TODO: embed Google Maps iframe */}
        <div className="h-96 w-full rounded-xl bg-gray-100"></div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-center text-white">
        <h2 className="mb-4 text-2xl font-bold">Siap Berlangganan Air Minum Berkualitas?</h2>
        <Link to="/kontak" className="rounded-full bg-white px-6 py-3 font-semibold text-primary">
          Hubungi Kami Sekarang
        </Link>
      </section>
    </div>
  );
}

export default Beranda;
