import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTentang } from "../services/tentangService.js";
import { getPengaturan } from "../services/pengaturanService.js";
import MapEmbed from "../components/common/MapEmbed.jsx";
import Reveal from "../components/common/Reveal.jsx";
import CountUp from "../components/common/CountUp.jsx";
import Kicker from "../components/common/Kicker.jsx";
import WaveDivider from "../components/common/WaveDivider.jsx";

const API_BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

function Tentang() {
  const [data, setData] = useState(null);
  const [pengaturan, setPengaturan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTentang()
      .then((res) => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
    getPengaturan()
      .then((res) => setPengaturan(res.data))
      .catch(() => {});
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4 py-16 text-center text-slate-400">
        Memuat...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4 py-16 text-center text-slate-400">
        Konten belum tersedia. Silakan lengkapi di Admin Panel &gt; Tentang.
      </div>
    );
  }

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
        <div
          aria-hidden="true"
          className="animate-float-slow absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl sm:h-96 sm:w-96"
        />
        <div
          aria-hidden="true"
          className="animate-float-slower absolute -bottom-20 -right-16 h-80 w-80 rounded-full bg-secondary/10 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-24">
          <Reveal variant="right" duration={800}>
            <Kicker>Profil Perusahaan</Kicker>
            <h1 className="font-display mt-4 text-4xl font-semibold leading-[1.08] text-secondary sm:text-5xl lg:text-[3.2rem]">
              Mengenal lebih dekat
              <br />
              <span className="text-primary">Arroyyan99.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-500 sm:text-lg">
              Perjalanan kami dalam menghadirkan air minum berkualitas untuk
              setiap rumah tangga di Indonesia — dibangun di atas kepercayaan,
              konsistensi, dan komitmen pada mutu.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/produk"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(2,132,199,0.55)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Lihat Produk Kami
              </Link>
              <Link
                to="/kontak"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3.5 text-sm font-semibold text-secondary transition-colors hover:border-primary hover:text-primary"
              >
                Hubungi Kami
              </Link>
            </div>
          </Reveal>

          <Reveal variant="left" duration={800} delay={100}>
            <div className="relative">
              {data.foto ? (
                <div className="relative z-10 aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-white shadow-[0_30px_60px_-20px_rgba(15,23,42,0.25)] sm:mx-auto lg:mx-0">
                  <img
                    src={`${API_BASE_URL}${data.foto}`}
                    alt="Arroyyan99"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="relative z-10 flex aspect-[4/5] w-full max-w-md items-center justify-center rounded-[2rem] border border-white bg-slate-100 text-sm text-slate-400 shadow-[0_30px_60px_-20px_rgba(15,23,42,0.25)] sm:mx-auto lg:mx-0">
                  Belum ada foto
                </div>
              )}

              {pengaturan?.tahunBerdiri && (
                <div className="absolute -bottom-6 -left-4 z-20 w-40 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_20px_40px_-15px_rgba(15,23,42,0.35)] sm:-left-8 sm:w-48">
                  <p className="font-display text-2xl font-semibold text-secondary sm:text-3xl">
                    <CountUp value={pengaturan.tahunBerdiri} />
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                    Tahun beroperasi melayani keluarga Indonesia
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>

        <WaveDivider tone="#ffffff" />
      </section>

      {/* Sejarah */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal variant="up">
          <Kicker>Cerita Kami</Kicker>
          <h2 className="font-display mt-3 text-2xl font-semibold text-secondary sm:text-4xl">
            Sejarah Berdirinya
          </h2>
        </Reveal>
        <Reveal variant="up" delay={100}>
          <p className="first-letter:font-display mt-6 whitespace-pre-line text-base leading-[1.9] text-slate-600 first-letter:float-left first-letter:mr-2 first-letter:text-6xl first-letter:font-semibold first-letter:leading-[0.85] first-letter:text-primary sm:text-lg">
            {data.sejarah || "Konten belum diisi di Admin Panel."}
          </p>
        </Reveal>
      </section>

      {/* Statistik */}
      {statistik.length > 0 && (
        <section className="relative overflow-hidden bg-secondary py-16 text-white sm:py-20">
          <WaveDivider flip tone="#ffffff" />
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
          <WaveDivider tone="#ffffff" />
        </section>
      )}

      {/* Visi Misi */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal variant="up">
          <div className="mb-10 text-center sm:mb-14">
            <Kicker>Arah Kami</Kicker>
            <h2 className="font-display mt-3 text-2xl font-semibold text-secondary sm:text-4xl">
              Visi &amp; Misi
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal variant="right" duration={800}>
            <div className="relative h-full overflow-hidden rounded-[1.75rem] bg-primary p-8 text-white sm:p-10">
              <span className="font-display pointer-events-none absolute -right-2 -top-6 text-8xl font-semibold leading-none text-white/10 sm:text-9xl">
                01
              </span>
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </span>
              <h3 className="font-display relative text-xl font-semibold sm:text-2xl">
                Visi
              </h3>
              <p className="relative mt-3 whitespace-pre-line text-sm leading-relaxed text-white/85 sm:text-base">
                {data.visi || "Konten belum diisi di Admin Panel."}
              </p>
            </div>
          </Reveal>

          <Reveal variant="left" duration={800} delay={100}>
            <div className="relative h-full overflow-hidden rounded-[1.75rem] border border-slate-200 bg-[#F7F5F0] p-8 sm:p-10">
              <span className="font-display pointer-events-none absolute -right-2 -top-6 text-8xl font-semibold leading-none text-secondary/5 sm:text-9xl">
                02
              </span>
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  className="h-5 w-5"
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
              </span>
              <h3 className="font-display relative text-xl font-semibold text-secondary sm:text-2xl">
                Misi
              </h3>
              <p className="relative mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600 sm:text-base">
                {data.misi || "Konten belum diisi di Admin Panel."}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Lokasi */}
      <section className="bg-[#F7F5F0] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
            <Reveal variant="right">
              <Kicker>Kunjungi Kami</Kicker>
              <h2 className="font-display mt-3 text-2xl font-semibold text-secondary sm:text-4xl">
                Lokasi
              </h2>
              <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-500 sm:text-base">
                {data.lokasi || "Konten belum diisi di Admin Panel."}
              </p>
              <Link
                to="/kontak"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
              >
                Hubungi &amp; Dapatkan Arah →
              </Link>
            </Reveal>

            <Reveal variant="zoom" duration={800} delay={100}>
              {pengaturan?.mapsEmbedUrl ? (
                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.25)]">
                  <MapEmbed src={pengaturan.mapsEmbedUrl} />
                </div>
              ) : (
                <div className="flex h-72 items-center justify-center rounded-2xl bg-white text-sm text-slate-400 sm:h-96">
                  Peta belum diatur di Admin Panel &gt; Pengaturan
                </div>
              )}
            </Reveal>
          </div>
        </div>
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
            Mari Berlangganan Bersama Arroyyan99
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/80 sm:text-base">
            Rasakan kesegaran air minum berkualitas untuk rumah, kantor, atau
            bisnis Anda.
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

export default Tentang;
