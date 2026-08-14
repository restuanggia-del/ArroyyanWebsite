import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStats } from "../services/statsService.js";
import { useAuth } from "../context/AuthContext.jsx";
import { clayCard, clayCardSm, clayButtonGhost } from "../styles/ui.js";

const iconProduk = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <path d="M20.5 7.5 12 3 3.5 7.5 12 12l8.5-4.5Z" />
    <path d="M3.5 7.5v9L12 21l8.5-4.5v-9" />
    <path d="M12 12v9" />
  </svg>
);
const iconBerita = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M7 8h10M7 12h10M7 16h6" />
  </svg>
);
const iconBanner = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <circle cx="8.5" cy="11" r="1.5" />
    <path d="m3 16 4.5-4.5L12 15l3-3 6 6" />
  </svg>
);
const iconPesan = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <path d="M4 4h16v14H7l-3 3V4Z" />
  </svg>
);
const iconArrow = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-4 w-4"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function MiniBars({ heights, accent, dim }) {
  return (
    <div className="flex items-end gap-1">
      {heights.map((h, i) => (
        <div
          key={i}
          className={`w-2 rounded-full ${i === heights.length - 1 ? accent : dim}`}
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  );
}

function sapaanWaktu() {
  const jam = new Date().getHours();
  if (jam >= 4 && jam < 11) return "Selamat Pagi";
  if (jam >= 11 && jam < 15) return "Selamat Siang";
  if (jam >= 15 && jam < 18) return "Selamat Sore";
  return "Selamat Malam";
}

function Dashboard() {
  const { admin } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then((res) => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const kartu = [
    {
      label: "Total Produk",
      nilai: stats?.totalProduk,
      link: "/produk",
      icon: iconProduk,
      iconBg: "bg-blue-50 text-blue-600",
      accent: "bg-blue-400",
      dim: "bg-blue-100",
      bars: [10, 16, 12, 20, 14, 18, 26],
    },
    {
      label: "Total Berita",
      nilai: stats?.totalBerita,
      link: "/berita",
      icon: iconBerita,
      iconBg: "bg-sky-50 text-sky-600",
      accent: "bg-sky-400",
      dim: "bg-sky-100",
      bars: [14, 10, 18, 12, 22, 16, 24],
    },
    {
      label: "Banner Aktif",
      nilai: stats?.totalBanner,
      link: "/banner",
      icon: iconBanner,
      iconBg: "bg-emerald-50 text-emerald-600",
      accent: "bg-emerald-400",
      dim: "bg-emerald-100",
      bars: [8, 12, 10, 14, 12, 16, 20],
    },
    {
      label: "Pesan Masuk",
      nilai: stats?.totalPesan,
      keterangan:
        stats?.pesanBelumDibaca > 0
          ? `${stats.pesanBelumDibaca} belum dibaca`
          : null,
      link: "/kontak",
      icon: iconPesan,
      iconBg: "bg-amber-50 text-amber-600",
      accent: "bg-amber-400",
      dim: "bg-amber-100",
      bars: [12, 20, 14, 10, 18, 22, 16],
    },
  ];

  const aksiCepat = [
    { label: "Tambah Produk", link: "/produk/tambah", icon: iconProduk },
    { label: "Tulis Berita", link: "/berita/tambah", icon: iconBerita },
    { label: "Unggah Banner", link: "/banner", icon: iconBanner },
    { label: "Lihat Pesan", link: "/kontak", icon: iconPesan },
  ];

  const heroStats = [
    { label: "Produk", nilai: stats?.totalProduk },
    { label: "Berita", nilai: stats?.totalBerita },
    { label: "Pesan Masuk", nilai: stats?.totalPesan },
  ];

  return (
    <div>
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-blue-500 via-cyan-500 to-pink-400 p-6 shadow-[10px_10px_28px_rgba(37,99,235,0.3),-6px_-6px_20px_rgba(255,255,255,0.5)] sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-white/10" />

        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              Dashboard
            </span>
            <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              {sapaanWaktu()}, {admin?.nama?.split(" ")[0] || "Admin"} 👋
            </h1>
            <p className="mt-1.5 max-w-md text-sm text-white/80">
              Ringkasan konten website Arroyyan99 saat ini.
            </p>
            <Link
              to="/produk"
              className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 shadow-[5px_5px_14px_rgba(0,0,0,0.15)] transition-transform hover:-translate-y-0.5"
            >
              Kelola Konten {iconArrow}
            </Link>
          </div>

          <div className="flex gap-3 sm:gap-4">
            {heroStats.map((item) => (
              <div
                key={item.label}
                className="min-w-[104px] rounded-2xl border border-white/25 bg-white/15 px-4 py-3 text-center shadow-[inset_2px_2px_6px_rgba(255,255,255,0.15)] backdrop-blur-sm"
              >
                <p className="text-xl font-bold text-white sm:text-2xl">
                  {loading ? "…" : (item.nilai ?? 0)}
                </p>
                <p className="mt-0.5 text-xs text-white/75">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {kartu.map((item) => (
          <Link
            key={item.label}
            to={item.link}
            className={`p-5 transition-transform hover:-translate-y-1 ${clayCard}`}
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-2xl ${item.iconBg}`}
              >
                {item.icon}
              </div>
              <MiniBars
                heights={item.bars}
                accent={item.accent}
                dim={item.dim}
              />
            </div>
            <p className="mt-4 text-sm font-medium text-gray-500">
              {item.label}
            </p>
            <p className="mt-1 text-3xl font-bold text-secondary">
              {loading ? (
                <span className="inline-block h-8 w-14 animate-pulse rounded bg-gray-100" />
              ) : (
                (item.nilai ?? 0)
              )}
            </p>
            {item.keterangan && (
              <p className="mt-2 inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                {item.keterangan}
              </p>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className={`p-5 lg:col-span-2 ${clayCard}`}>
          <h2 className="mb-4 text-sm font-semibold text-secondary">
            Aksi Cepat
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {aksiCepat.map((item) => (
              <Link
                key={item.label}
                to={item.link}
                className={`flex flex-col items-center gap-2.5 px-3 py-5 text-center transition-transform hover:-translate-y-1 ${clayCardSm}`}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  {item.icon}
                </div>
                <span className="text-xs font-medium text-gray-600">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className={`p-5 ${clayCard}`}>
          <h2 className="mb-4 text-sm font-semibold text-secondary">
            Akun Anda
          </h2>
          <div className="flex items-center gap-3 rounded-2xl bg-[#eef5fd] p-3 shadow-[inset_2px_2px_6px_rgba(96,130,196,0.12),inset_-2px_-2px_6px_rgba(255,255,255,0.9)]">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-sm font-bold text-white">
              {admin?.nama?.charAt(0) || "A"}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-secondary">
                {admin?.nama || "Admin"}
              </p>
              <p className="truncate text-xs text-gray-500">{admin?.email}</p>
            </div>
          </div>
          <Link
            to="/pengaturan"
            className={`${clayButtonGhost} mt-4 w-full px-4 py-2.5 text-sm font-medium`}
          >
            Pengaturan Akun
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
