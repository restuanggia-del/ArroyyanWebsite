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
import { getAllTestimoni } from "../services/testimoniService.js";
import { getAllBerita } from "../services/beritaService.js";
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
  const [testimoni, setTestimoni] = useState([]);
  const [beritaTerbaru, setBeritaTerbaru] = useState([]);

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
    getAllTestimoni()
      .then((res) => setTestimoni(res.data))
      .catch(() => {});
    getAllBerita()
      .then((res) => setBeritaTerbaru(res.data.slice(0, 3)))
      .catch(() => {});
  }, []);

  const tampilkanPlaceholder = !loadingBanner && banners.length === 0;
  const slideData = tampilkanPlaceholder ? BANNER_PLACEHOLDER : banners;

  return (
    <div>
      {/* Banner Slider */}
      <section className="relative h-[260px] sm:h-[340px] md:h-[500px]">
        {loadingBanner ? (
          <div className="flex h-full items-center justify-center bg-gray-100 text-sm text-gray-400 sm:text-base">
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
                  className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-secondary bg-cover bg-center px-4 sm:px-6"
                  style={
                    banner.gambar
                      ? {
                          backgroundImage: `url(${API_BASE_URL}${banner.gambar})`,
                        }
                      : {}
                  }
                >
                  {banner.judul && (
                    <h2 className="max-w-[90%] rounded-lg bg-black/30 px-4 py-2 text-center text-lg font-bold text-white sm:px-5 sm:py-3 sm:text-2xl md:text-4xl">
                      {banner.judul}
                    </h2>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {tampilkanPlaceholder && (
          <p className="absolute bottom-2 left-1/2 z-10 w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 rounded bg-yellow-100 px-3 py-1 text-center text-[10px] text-yellow-800 sm:text-xs">
            Menampilkan banner placeholder — upload banner asli di Admin Panel
            &gt; Banner
          </p>
        )}
      </section>

      {/* Produk Unggulan */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="mb-6 text-center text-2xl font-bold text-secondary sm:text-3xl">
          Produk Unggulan
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {produkUnggulan.map((produk) => (
            <Link
              key={produk._id}
              to={`/produk/${produk._id}`}
              className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="aspect-video w-full overflow-hidden bg-gray-100">
                {produk.gambar ? (
                  <img
                    src={`${API_BASE_URL}${produk.gambar}`}
                    alt={produk.nama}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-400">
                    Belum ada gambar
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-secondary sm:text-lg">
                  {produk.nama}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{produk.volume}</p>
                {produk.harga ? (
                  <p className="mt-2 font-semibold text-primary">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(produk.harga)}
                  </p>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex justify-center sm:justify-end">
          <Link
            to="/produk"
            className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 sm:px-6"
          >
            Lihat Selengkapnya
          </Link>
        </div>
      </section>

      {/* Mengapa Arroyyan */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-8 text-center text-2xl font-bold text-secondary sm:mb-12 sm:text-3xl">
            Mengapa Arroyyan?
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {KEUNGGULAN.map((item) => (
              <div
                key={item.judul}
                className="rounded-xl bg-white p-5 text-center shadow-sm sm:p-6"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-16 sm:w-16">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-base font-semibold text-secondary sm:text-lg">
                  {item.judul}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {item.deskripsi}
                </p>
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
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h2 className="mb-2 text-2xl font-bold text-secondary sm:text-3xl">
            Sertifikasi & Legalitas
          </h2>
          <p className="mb-8 text-sm text-gray-500 sm:mb-10">
            Arroyyan99 telah memenuhi standar keamanan pangan dan legalitas
            produk yang berlaku di Indonesia.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERTIFIKASI.map((item) => (
              <div
                key={item.nama}
                className="flex flex-col items-center rounded-xl border border-slate-200 p-5 text-center sm:p-6"
              >
                <img
                  src={item.gambar}
                  alt={`Logo ${item.nama}`}
                  className="mb-4 h-14 w-auto object-contain sm:h-16"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <h3 className="font-semibold text-secondary">{item.nama}</h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">
                  {item.keterangan}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[11px] text-gray-400 sm:text-xs">
            * Nomor registrasi/sertifikat resmi dapat ditampilkan di sini
            setelah dokumen tersedia.
          </p>
        </div>
      </section>

      {/* Testimoni Pelanggan */}
      {testimoni.length > 0 && (
        <section className="bg-gray-50 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-8 text-center text-2xl font-bold text-secondary sm:mb-10 sm:text-3xl">
              Apa Kata Mereka?
            </h2>
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop={testimoni.length > 1}
              className="pb-10"
            >
              {testimoni.map((item) => (
                <SwiperSlide key={item._id}>
                  <div className="mx-0 rounded-xl bg-white p-5 text-center shadow-sm sm:mx-4 sm:p-8">
                    {item.foto ? (
                      <img
                        src={`${API_BASE_URL}${item.foto}`}
                        alt={item.nama}
                        className="mx-auto mb-4 h-14 w-14 rounded-full object-cover sm:h-16 sm:w-16"
                      />
                    ) : (
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary sm:h-16 sm:w-16 sm:text-lg">
                        {item.nama.charAt(0)}
                      </div>
                    )}
                    <p className="mb-1 text-yellow-500">
                      {"★".repeat(item.rating)}
                      {"☆".repeat(5 - item.rating)}
                    </p>
                    <p className="mb-4 text-sm italic text-gray-600 sm:text-base">
                      &ldquo;{item.pesan}&rdquo;
                    </p>
                    <p className="font-semibold text-secondary">{item.nama}</p>
                    {item.peran && (
                      <p className="text-sm text-gray-400">{item.peran}</p>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* Berita Terkini */}
      {beritaTerbaru.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-secondary sm:mb-8 sm:text-3xl">
            Berita Terkini
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {beritaTerbaru.map((item) => (
              <Link
                key={item._id}
                to={`/berita/${item.slug}`}
                className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="aspect-video w-full overflow-hidden bg-gray-100">
                  {item.gambar ? (
                    <img
                      src={`${API_BASE_URL}${item.gambar}`}
                      alt={item.judul}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                      Belum ada gambar
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <span className="mb-2 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium capitalize text-primary">
                    {item.kategori}
                  </span>
                  <h3 className="mb-1 text-base font-semibold text-secondary sm:text-lg">
                    {item.judul}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {item.ringkasan}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex justify-center sm:justify-end">
            <Link
              to="/berita"
              className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 sm:px-6"
            >
              Lihat Semua Berita
            </Link>
          </div>
        </section>
      )}

      {/* Maps */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="mb-6 text-center text-2xl font-bold text-secondary sm:mb-8 sm:text-3xl">
          Lokasi Kami
        </h2>
        {pengaturan?.mapsEmbedUrl ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <MapEmbed src={pengaturan.mapsEmbedUrl} />
          </div>
        ) : (
          <div className="flex h-96 items-center justify-center rounded-xl bg-gray-100 text-sm text-gray-400">
            Peta belum diatur di Admin Panel &gt; Pengaturan
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-primary px-4 py-12 text-center text-white sm:px-6 sm:py-16">
        <h2 className="mb-4 text-xl font-bold sm:text-2xl">
          Siap Berlangganan Air Minum Berkualitas?
        </h2>
        <Link
          to="/kontak"
          className="inline-block rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:bg-slate-100 sm:px-6"
        >
          Hubungi Kami Sekarang
        </Link>
      </section>
    </div>
  );
}

export default Beranda;
