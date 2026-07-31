import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getProdukUnggulan } from "../services/produkService.js";
import { getAllBanner } from "../services/bannerService.js";
import MapEmbed from "../components/common/MapEmbed.jsx";

const API_BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

const BANNER_PLACEHOLDER = [
  { _id: "placeholder-1", judul: "Air Minum Berkualitas untuk Keluarga Anda" },
  {
    _id: "placeholder-2",
    judul: "Tersedia dalam Kemasan Cup, Botol, dan Galon",
  },
  { _id: "placeholder-3", judul: "Distribusi Cepat ke Rumah Anda" },
];

function Beranda() {
  const [banners, setBanners] = useState([]);
  const [produkUnggulan, setProdukUnggulan] = useState([]);
  const [loadingBanner, setLoadingBanner] = useState(true);

  useEffect(() => {
    getAllBanner()
      .then((res) => setBanners(res.data))
      .catch(() => {})
      .finally(() => setLoadingBanner(false));
    getProdukUnggulan()
      .then((res) => setProdukUnggulan(res.data))
      .catch(() => {});
  }, []);

  const tampilkanPlaceholder = !loadingBanner && banners.length === 0;
  const slideData = tampilkanPlaceholder ? BANNER_PLACEHOLDER : banners;

  return (
    <div>
      {/* Banner Slider */}
      <section className="relative h-[400px] md:h-[500px]">
        {loadingBanner ? (
          <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">
            Memuat banner...
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            loop={slideData.length > 1}
            className="h-full w-full"
          >
            {slideData.map((banner) => (
              <SwiperSlide key={banner._id}>
                <div
                  className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-secondary bg-cover bg-center"
                  style={
                    banner.gambar
                      ? {
                          backgroundImage: `url(${API_BASE_URL}${banner.gambar})`,
                        }
                      : {}
                  }
                >
                  {banner.judul && (
                    <h2 className="rounded-lg bg-black/30 px-6 py-3 text-center text-2xl font-bold text-white md:text-4xl">
                      {banner.judul}
                    </h2>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {tampilkanPlaceholder && (
          <p className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 rounded bg-yellow-100 px-3 py-1 text-xs text-yellow-800">
            Menampilkan banner placeholder — upload banner asli di Admin Panel
            &gt; Banner
          </p>
        )}
      </section>

      {/* Produk Unggulan */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-secondary">
          Produk Unggulan
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {produkUnggulan.map((produk) => (
            <div key={produk._id} className="rounded-xl border p-4 shadow-sm">
              <h3 className="font-semibold">{produk.nama}</h3>
              <p className="text-sm text-gray-500">{produk.volume}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <Link
            to="/produk"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700"
          >
            Lihat Selengkapnya
          </Link>
        </div>
      </section>

      {/* Mengapa Arroyyan */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-secondary">
            Mengapa Arroyyan?
          </h2>
          {/* TODO: isi dengan poin-poin keunggulan, sertifikasi BPOM/SNI/Halal, statistik */}
        </div>
      </section>

      {/* Maps */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-secondary">
          Lokasi Kami
        </h2>
        <MapEmbed query="Jl. Malabar No. 88 Bogatama, Kec. Penawar Tama, Kab. Tulang Bawang, Lampung 34595" />
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-center text-white">
        <h2 className="mb-4 text-2xl font-bold">
          Siap Berlangganan Air Minum Berkualitas?
        </h2>
        <Link
          to="/kontak"
          className="rounded-full bg-white px-6 py-3 font-semibold text-primary"
        >
          Hubungi Kami Sekarang
        </Link>
      </section>
    </div>
  );
}

export default Beranda;
