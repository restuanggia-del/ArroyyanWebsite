import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getProdukUnggulan } from "../services/produkService.js";
import { getAllBanner } from "../services/bannerService.js";
import { getPengaturan } from "../services/pengaturanService.js";
import MapEmbed from "../components/common/MapEmbed.jsx";

const API_BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

const KEUNGGULAN = [
  {
    judul: "Kualitas Terjamin",
    deskripsi:
      "Diproses melalui standar produksi ketat dengan kontrol kualitas di setiap tahap.",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    judul: "Higienis & Steril",
    deskripsi:
      "Kemasan diproduksi dalam fasilitas tertutup untuk menjaga kebersihan dan kesegaran air.",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21c4.556 0 7.5-3.278 7.5-7.5 0-3.556-4.5-9-7.5-11.25C9 4.5 4.5 9.944 4.5 13.5 4.5 17.722 7.444 21 12 21Z"
        />
      </svg>
    ),
  },
  {
    judul: "Distribusi Cepat",
    deskripsi:
      "Jaringan distributor luas untuk memastikan pesanan sampai tepat waktu.",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 18.75a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM18.75 18.75a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 3h1.5l1.325 6.625M6.575 9.625H19.5l-2.25 7.125H7.5m-1.925-7.125L7.5 16.75m0 0h9.75"
        />
      </svg>
    ),
  },
  {
    judul: "Harga Bersahabat",
    deskripsi:
      "Kualitas premium dengan harga yang tetap terjangkau untuk seluruh keluarga.",
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182.554-.439 1.278-.659 2.003-.659.725 0 1.45.22 2.003.659L14.5 8.5"
        />
      </svg>
    ),
  },
];

const SERTIFIKASI = [
  {
    nama: "BPOM RI",
    keterangan: "Terdaftar & diawasi Badan POM",
    gambar: "/sertifikasi/bpom.png",
  },
  {
    nama: "SNI",
    keterangan: "Memenuhi Standar Nasional Indonesia",
    gambar: "/sertifikasi/sni.png",
  },
  {
    nama: "Halal MUI",
    keterangan: "Bersertifikat Halal MUI",
    gambar: "/sertifikasi/halal.png",
  },
];

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
  const [pengaturan, setPengaturan] = useState(null);

  useEffect(() => {
    getAllBanner()
      .then((res) => setBanners(res.data))
      .catch(() => {})
      .finally(() => setLoadingBanner(false));
    getProdukUnggulan()
      .then((res) => setProdukUnggulan(res.data))
      .catch(() => {});
    getPengaturan()
      .then((res) => setPengaturan(res.data))
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
          <h2 className="mb-12 text-center text-3xl font-bold text-secondary">
            Mengapa Arroyyan?
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {KEUNGGULAN.map((item) => (
              <div key={item.judul} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <h3 className="mb-2 font-semibold text-secondary">
                  {item.judul}
                </h3>
                <p className="text-sm text-gray-500">{item.deskripsi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistik Pencapaian */}
      {pengaturan &&
        (() => {
          const statistik = [
            pengaturan.tahunBerdiri && {
              label: "Berdiri Sejak",
              nilai: pengaturan.tahunBerdiri,
            },
            pengaturan.jumlahDistributor && {
              label: "Distributor",
              nilai: pengaturan.jumlahDistributor,
            },
            pengaturan.literProduksiPerBulan && {
              label: "Produksi / Bulan",
              nilai: pengaturan.literProduksiPerBulan,
            },
            pengaturan.jumlahPelangganPuas && {
              label: "Pelanggan Puas",
              nilai: pengaturan.jumlahPelangganPuas,
            },
          ].filter(Boolean);

          if (statistik.length === 0) return null;

          return (
            <section className="bg-primary py-16 text-white">
              <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 text-center md:grid-cols-4">
                {statistik.map((item) => (
                  <div key={item.label}>
                    <p className="text-3xl font-bold md:text-4xl">
                      {item.nilai}
                    </p>
                    <p className="mt-1 text-sm text-white/80">{item.label}</p>
                  </div>
                ))}
              </div>
            </section>
          );
        })()}

      {/* Sertifikasi & Legalitas */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="mb-2 text-3xl font-bold text-secondary">
            Sertifikasi & Legalitas
          </h2>
          <p className="mb-10 text-sm text-gray-500">
            Arroyyan99 telah memenuhi standar keamanan pangan dan legalitas
            produk yang berlaku di Indonesia.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {SERTIFIKASI.map((item) => (
              <div
                key={item.nama}
                className="flex flex-col items-center rounded-xl border p-6"
              >
                <img
                  src={item.gambar}
                  alt={`Logo ${item.nama}`}
                  className="mb-4 h-16 w-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <h3 className="font-semibold text-secondary">{item.nama}</h3>
                <p className="mt-1 text-xs text-gray-500">{item.keterangan}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-gray-400">
            * Nomor registrasi/sertifikat resmi dapat ditampilkan di sini
            setelah dokumen tersedia.
          </p>
        </div>
      </section>

      {/* Maps */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-secondary">
          Lokasi Kami
        </h2>
        <MapEmbed src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d402.191539341772!2d105.48303621142395!3d-4.186876230866167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sid!2sid!4v1785470467584!5m2!1sid!2sid" />
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
