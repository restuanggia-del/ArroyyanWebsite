import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { getProdukUnggulan } from "../services/produkService.js";
import { getAllBanner } from "../services/bannerService.js";
import { getPengaturan } from "../services/pengaturanService.js";
import { getAllTestimoni } from "../services/testimoniService.js";
import { getAllBerita } from "../services/beritaService.js";
import MapEmbed from "../components/common/MapEmbed.jsx";
import Reveal from "../components/common/Reveal.jsx";
import CountUp from "../components/common/CountUp.jsx";
import Kicker from "../components/common/Kicker.jsx";
import WaveDivider from "../components/common/WaveDivider.jsx";

const API_BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

const KEUNGGULAN = [
  {
    no: "01",
    judul: "Kualitas Terjamin",
    deskripsi:
      "Diproses melalui standar produksi ketat dengan kontrol kualitas di setiap tahap, dari sumber air hingga kemasan siap kirim.",
    icon: (
      <svg
        className="h-6 w-6"
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
    no: "02",
    judul: "Higienis & Steril",
    deskripsi:
      "Kemasan diproduksi dalam fasilitas tertutup untuk menjaga kebersihan dan kesegaran air sampai ke tangan Anda.",
    icon: (
      <svg
        className="h-6 w-6"
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
    no: "03",
    judul: "Distribusi Cepat",
    deskripsi:
      "Jaringan distributor luas untuk memastikan pesanan sampai tepat waktu, kapan pun dan di mana pun Anda berada.",
    icon: (
      <svg
        className="h-6 w-6"
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
    no: "04",
    judul: "Harga Bersahabat",
    deskripsi:
      "Kualitas premium dengan harga yang tetap terjangkau, dirancang agar bisa dinikmati seluruh keluarga Indonesia.",
    icon: (
      <svg
        className="h-6 w-6"
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

const MARQUEE_ITEMS = [
  "Bersertifikat BPOM RI",
  "Halal MUI",
  "Standar SNI",
  "Higienis & Steril",
  "Distribusi Cepat",
  "Dipercaya Ribuan Keluarga",
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

  const statistik = pengaturan
    ? [
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
      ].filter(Boolean)
    : [];

  return (
    <div className="overflow-x-clip">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#F7F5F0]">
        {/* decorative blobs */}
        <div
          aria-hidden="true"
          className="animate-float-slow absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl sm:h-96 sm:w-96"
        />
        <div
          aria-hidden="true"
          className="animate-float-slower absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-secondary/10 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
          {/* Left: copy */}
          <Reveal variant="right" duration={800}>
            <Kicker>Air Minum Dalam Kemasan</Kicker>
            <h1 className="font-display mt-4 text-4xl font-semibold leading-[1.08] text-secondary sm:text-5xl lg:text-[3.4rem]">
              Kesegaran murni,
              <br />
              dipercaya setiap
              <br />
              <span className="text-primary">rumah tangga.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-500 sm:text-lg">
              Arroyyan99 menghadirkan air minum berkualitas dengan standar
              produksi ketat, dikemas higienis, dan dikirim cepat — dalam varian
              cup, botol, hingga galon.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/kontak"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(2,132,199,0.55)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span className="animate-shimmer absolute inset-y-0 left-0 w-1/3 bg-white/25" />
                Pesan Sekarang
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <Link
                to="/produk"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3.5 text-sm font-semibold text-secondary transition-colors hover:border-primary hover:text-primary"
              >
                Lihat Produk
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
              {SERTIFIKASI.map((item) => (
                <div
                  key={item.nama}
                  className="flex items-center gap-2 text-xs font-medium text-slate-400 sm:text-sm"
                >
                  <img
                    src={item.gambar}
                    alt=""
                    className="h-6 w-auto object-contain opacity-70"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  {item.nama}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right: banner, framed as a floating card */}
          <Reveal variant="left" duration={800} delay={100}>
            <div className="relative">
              <div className="relative z-10 aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-white shadow-[0_30px_60px_-20px_rgba(15,23,42,0.25)] sm:mx-auto sm:aspect-square lg:mx-0 lg:aspect-[4/5]">
                {loadingBanner ? (
                  <div className="flex h-full w-full items-center justify-center bg-slate-100 text-sm text-slate-400">
                    Memuat banner...
                  </div>
                ) : (
                  <Swiper
                    modules={[Autoplay, Navigation, Pagination, EffectFade]}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    autoplay={{ delay: 4200, disableOnInteraction: false }}
                    navigation
                    pagination={{ clickable: true }}
                    loop={slideData.length > 1}
                    className="h-full w-full"
                  >
                    {slideData.map((banner) => (
                      <SwiperSlide key={banner._id}>
                        <div
                          className="flex h-full w-full items-end bg-gradient-to-br from-primary to-secondary bg-cover bg-center p-6"
                          style={
                            banner.gambar
                              ? {
                                  backgroundImage: `url(${API_BASE_URL}${banner.gambar})`,
                                }
                              : {}
                          }
                        >
                          {banner.judul && (
                            <h2 className="rounded-xl bg-black/35 px-4 py-3 text-base font-bold text-white backdrop-blur-sm sm:text-xl">
                              {banner.judul}
                            </h2>
                          )}
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>

              {/* floating stat badge */}
              {pengaturan?.jumlahPelangganPuas && (
                <div className="absolute -bottom-6 -left-4 z-20 w-44 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_20px_40px_-15px_rgba(15,23,42,0.35)] sm:-left-8 sm:w-52">
                  <p className="font-display text-2xl font-semibold text-secondary sm:text-3xl">
                    <CountUp value={pengaturan.jumlahPelangganPuas} />
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                    Pelanggan puas &amp; berlangganan
                  </p>
                </div>
              )}

              {tampilkanPlaceholder && (
                <p className="absolute -top-3 left-1/2 z-10 w-[calc(100%-1.5rem)] max-w-xs -translate-x-1/2 rounded-full bg-yellow-100 px-3 py-1 text-center text-[10px] text-yellow-800 shadow-sm">
                  Banner placeholder — upload di Admin Panel &gt; Banner
                </p>
              )}
            </div>
          </Reveal>
        </div>

        <WaveDivider tone="#ffffff" />
      </section>

      {/* Marquee */}
      <section className="relative overflow-hidden border-y border-slate-100 bg-white py-4">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-2 text-sm font-medium text-slate-400"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Produk Unggulan */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal variant="up">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-14">
            <div>
              <Kicker>Pilihan Terbaik</Kicker>
              <h2 className="font-display mt-3 text-2xl font-semibold text-secondary sm:text-4xl">
                Produk Unggulan
              </h2>
            </div>
            <Link
              to="/produk"
              className="hidden items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 sm:inline-flex transition-all"
            >
              Lihat Semua Produk →
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {produkUnggulan.map((produk, idx) => (
            <Reveal key={produk._id} variant="up" delay={idx * 90}>
              <Link
                to={`/produk/${produk._id}`}
                className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_24px_40px_-20px_rgba(15,23,42,0.25)]"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  {produk.gambar ? (
                    <img
                      src={`${API_BASE_URL}${produk.gambar}`}
                      alt={produk.nama}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-400">
                      Belum ada gambar
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-secondary sm:text-lg">
                    {produk.nama}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{produk.volume}</p>
                  {produk.harga ? (
                    <p className="mt-3 font-semibold text-primary">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(produk.harga)}
                    </p>
                  ) : null}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            to="/produk"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white"
          >
            Lihat Semua Produk
          </Link>
        </div>
      </section>

      {/* Mengapa Arroyyan? */}
      <section className="relative bg-[#F7F5F0] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal variant="right">
              <Kicker>Kenapa Memilih Kami</Kicker>
              <h2 className="font-display mt-3 text-2xl font-semibold leading-tight text-secondary sm:text-4xl">
                Empat alasan keluarga Indonesia mempercayai Arroyyan99.
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500 sm:text-base">
                Bukan sekadar air minum — ini komitmen kami pada kualitas,
                kebersihan, dan pelayanan yang bisa Anda andalkan setiap hari.
              </p>
            </Reveal>

            <div className="divide-y divide-slate-200">
              {KEUNGGULAN.map((item, idx) => (
                <Reveal
                  key={item.judul}
                  variant={idx % 2 === 0 ? "up" : "up"}
                  delay={idx * 100}
                >
                  <div className="group flex items-start gap-5 py-6 first:pt-0 sm:gap-8">
                    <span className="font-display text-3xl font-medium text-slate-300 transition-colors group-hover:text-primary/40 sm:text-4xl">
                      {item.no}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          {item.icon}
                        </span>
                        <h3 className="text-base font-semibold text-secondary sm:text-lg">
                          {item.judul}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500 sm:text-base">
                        {item.deskripsi}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistik */}
      {statistik.length > 0 && (
        <section className="relative overflow-hidden bg-secondary py-20 text-white sm:py-24">
          <WaveDivider flip tone="#F7F5F0" />
          <div
            aria-hidden="true"
            className="animate-float-slow absolute -right-20 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
          />
          <div className="relative mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 text-center sm:px-6 md:grid-cols-4">
            {statistik.map((item, idx) => (
              <Reveal key={item.label} variant="zoom" delay={idx * 100}>
                <p className="font-display text-3xl font-semibold sm:text-5xl">
                  <CountUp value={item.nilai} />
                </p>
                <p className="mt-2 text-sm text-white/70">{item.label}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Sertifikasi */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <Reveal variant="up">
            <Kicker>Legalitas</Kicker>
            <h2 className="font-display mt-3 text-2xl font-semibold text-secondary sm:text-4xl">
              Sertifikasi &amp; Legalitas
            </h2>
            <p className="mx-auto mb-10 mt-3 max-w-lg text-sm text-slate-500 sm:text-base">
              Arroyyan99 telah memenuhi standar keamanan pangan dan legalitas
              produk yang berlaku di Indonesia.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERTIFIKASI.map((item, idx) => (
              <Reveal key={item.nama} variant="up" delay={idx * 100}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-slate-200 p-6 text-center transition-colors hover:border-primary/30 hover:bg-primary/[0.03]">
                  <img
                    src={item.gambar}
                    alt={`Logo ${item.nama}`}
                    className="mb-4 h-14 w-auto object-contain sm:h-16"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <h3 className="font-semibold text-secondary">{item.nama}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    {item.keterangan}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-[11px] text-slate-400 sm:text-xs">
            * Nomor registrasi/sertifikat resmi dapat ditampilkan di sini
            setelah dokumen tersedia.
          </p>
        </div>
      </section>

      {/* Testimoni */}
      {testimoni.length > 0 && (
        <section className="bg-[#F7F5F0] py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <Reveal variant="up">
              <div className="mb-10 text-center sm:mb-14">
                <Kicker>Testimoni</Kicker>
                <h2 className="font-display mt-3 text-2xl font-semibold text-secondary sm:text-4xl">
                  Apa Kata Mereka?
                </h2>
              </div>
            </Reveal>
            <Reveal variant="zoom" duration={800}>
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={testimoni.length > 1}
                className="pb-10"
              >
                {testimoni.map((item) => (
                  <SwiperSlide key={item._id}>
                    <div className="relative mx-0 rounded-2xl border border-slate-200 bg-white p-6 text-center sm:mx-6 sm:p-10">
                      <span className="font-display pointer-events-none absolute left-4 top-2 text-6xl leading-none text-primary/10 sm:text-7xl">
                        &ldquo;
                      </span>
                      {item.foto ? (
                        <img
                          src={`${API_BASE_URL}${item.foto}`}
                          alt={item.nama}
                          className="relative mx-auto mb-4 h-14 w-14 rounded-full object-cover sm:h-16 sm:w-16"
                        />
                      ) : (
                        <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary sm:h-16 sm:w-16 sm:text-lg">
                          {item.nama.charAt(0)}
                        </div>
                      )}
                      <p className="relative mb-1 text-yellow-500">
                        {"★".repeat(item.rating)}
                        {"☆".repeat(5 - item.rating)}
                      </p>
                      <p className="relative mb-4 text-sm italic leading-relaxed text-slate-600 sm:text-base">
                        &ldquo;{item.pesan}&rdquo;
                      </p>
                      <p className="relative font-semibold text-secondary">
                        {item.nama}
                      </p>
                      {item.peran && (
                        <p className="relative text-sm text-slate-400">
                          {item.peran}
                        </p>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Reveal>
          </div>
        </section>
      )}

      {/* Berita Terkini */}
      {beritaTerbaru.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal variant="up">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-14">
              <div>
                <Kicker>Update</Kicker>
                <h2 className="font-display mt-3 text-2xl font-semibold text-secondary sm:text-4xl">
                  Berita Terkini
                </h2>
              </div>
              <Link
                to="/berita"
                className="hidden items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 sm:inline-flex transition-all"
              >
                Lihat Semua Berita →
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {beritaTerbaru.map((item, idx) => (
              <Reveal key={item._id} variant="up" delay={idx * 90}>
                <Link
                  to={`/berita/${item.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_24px_40px_-20px_rgba(15,23,42,0.25)]"
                >
                  <div className="aspect-video w-full overflow-hidden bg-slate-100">
                    {item.gambar ? (
                      <img
                        src={`${API_BASE_URL}${item.gambar}`}
                        alt={item.judul}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-slate-400">
                        Belum ada gambar
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <span className="mb-2 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium capitalize text-primary">
                      {item.kategori}
                    </span>
                    <h3 className="mb-1 text-base font-semibold text-secondary sm:text-lg">
                      {item.judul}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2">
                      {item.ringkasan}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex justify-center sm:hidden">
            <Link
              to="/berita"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white"
            >
              Lihat Semua Berita
            </Link>
          </div>
        </section>
      )}

      {/* Maps */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal variant="up">
          <div className="mb-8 text-center sm:mb-10">
            <Kicker>Kunjungi Kami</Kicker>
            <h2 className="font-display mt-3 text-2xl font-semibold text-secondary sm:text-4xl">
              Lokasi Kami
            </h2>
          </div>
        </Reveal>
        <Reveal variant="zoom" duration={800}>
          {pengaturan?.mapsEmbedUrl ? (
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <MapEmbed src={pengaturan.mapsEmbedUrl} />
            </div>
          ) : (
            <div className="flex h-96 items-center justify-center rounded-2xl bg-slate-100 text-sm text-slate-400">
              Peta belum diatur di Admin Panel &gt; Pengaturan
            </div>
          )}
        </Reveal>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-primary px-4 py-16 text-center text-white sm:px-6 sm:py-24">
        <div
          aria-hidden="true"
          className="animate-float-slow absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="animate-float-slower absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-secondary/20 blur-3xl"
        />
        <Reveal variant="zoom" className="relative">
          <h2 className="font-display mx-auto max-w-xl text-2xl font-semibold sm:text-4xl">
            Siap Berlangganan Air Minum Berkualitas?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/80 sm:text-base">
            Hubungi tim kami sekarang dan nikmati kemudahan berlangganan air
            minum untuk rumah, kantor, atau bisnis Anda.
          </p>
          <Link
            to="/kontak"
            className="mt-8 inline-block rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl"
          >
            Hubungi Kami Sekarang
          </Link>
        </Reveal>
      </section>
    </div>
  );
}

export default Beranda;
