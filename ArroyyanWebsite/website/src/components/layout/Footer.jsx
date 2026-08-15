import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPengaturan } from "../../services/pengaturanService.js";

const SOCIAL_LINKS = [
  {
    key: "instagram",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.97.24 2.43.4a4.9 4.9 0 0 1 1.77 1.15 4.9 4.9 0 0 1 1.15 1.77c.16.46.35 1.26.4 2.43.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.97-.4 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.46.16-1.26.35-2.43.4-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.24-2.43-.4a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.16-.46-.35-1.26-.4-2.43C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.24-1.97.4-2.43a4.9 4.9 0 0 1 1.15-1.77A4.9 4.9 0 0 1 5.59 1.8c.46-.16 1.26-.35 2.43-.4C9.29 1.34 9.67 1.33 12.87 1.33Zm0 1.98c-3.15 0-3.5.01-4.73.07-1.02.05-1.58.22-1.94.36-.49.19-.84.42-1.21.79-.37.37-.6.72-.79 1.21-.14.36-.31.92-.36 1.94-.06 1.1-.07 1.44-.07 4.35s.01 3.25.07 4.35c.05 1.02.22 1.58.36 1.94.19.49.42.84.79 1.21.37.37.72.6 1.21.79.36.14.92.31 1.94.36 1.1.06 1.44.07 4.35.07s3.25-.01 4.35-.07c1.02-.05 1.58-.22 1.94-.36.49-.19.84-.42 1.21-.79.37-.37.6-.72.79-1.21.14-.36.31-.92.36-1.94.06-1.1.07-1.44.07-4.35s-.01-3.25-.07-4.35c-.05-1.02-.22-1.58-.36-1.94a3.3 3.3 0 0 0-.79-1.21 3.3 3.3 0 0 0-1.21-.79c-.36-.14-.92-.31-1.94-.36-1.13-.06-1.48-.07-4.62-.07ZM12 6.65a5.35 5.35 0 1 1 0 10.7 5.35 5.35 0 0 1 0-10.7Zm0 1.98a3.37 3.37 0 1 0 0 6.74 3.37 3.37 0 0 0 0-6.74Zm5.56-2.16a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z" />
      </svg>
    ),
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M13.5 21.9v-8.1h2.72l.41-3.16h-3.13V8.65c0-.91.25-1.53 1.56-1.53h1.67V4.31C15.98 4.24 15 4.15 13.85 4.15c-2.4 0-4.05 1.47-4.05 4.15v2.31H7.07v3.16h2.73v8.1h3.7Z" />
      </svg>
    ),
  },
  {
    key: "tiktok",
    label: "TikTok",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M16.6 2h-3.2v13.4a2.9 2.9 0 1 1-2.05-2.77V9.4a6.1 6.1 0 1 0 5.25 6.04V8.62a7.9 7.9 0 0 0 4.4 1.34V6.75a4.7 4.7 0 0 1-4.4-4.75Z" />
      </svg>
    ),
  },
];

function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [pengaturan, setPengaturan] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    getPengaturan()
      .then((res) => setPengaturan(res.data))
      .catch(() => {});
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeSocials = SOCIAL_LINKS.filter((s) => pengaturan?.[s.key]);

  return (
    <footer className="relative bg-secondary text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 text-center sm:px-6 md:grid-cols-[1.2fr_1fr_1fr_1.3fr] md:gap-8 md:py-16 md:text-left">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src="/logo-arroyyan.png"
            alt="Logo Arroyyan99"
            className="mb-4 h-10 w-auto"
          />
          <p className="max-w-xs text-sm leading-relaxed text-white/60">
            Air Minum Dalam Kemasan berkualitas untuk keluarga Indonesia —
            higienis, segar, dan terpercaya.
          </p>
        </div>

        {/* Navigasi */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-display mb-4 text-sm font-semibold uppercase tracking-wide text-white">
            Navigasi
          </h4>
          <ul className="space-y-2.5 text-sm text-white/60">
            <li>
              <Link to="/" className="transition-colors hover:text-primary">
                Beranda
              </Link>
            </li>
            <li>
              <Link
                to="/tentang"
                className="transition-colors hover:text-primary"
              >
                Tentang
              </Link>
            </li>
            <li>
              <Link
                to="/produk"
                className="transition-colors hover:text-primary"
              >
                Produk
              </Link>
            </li>
            <li>
              <Link
                to="/home-servis"
                className="transition-colors hover:text-primary"
              >
                Home Servis
              </Link>
            </li>
            <li>
              <Link
                to="/berita"
                className="transition-colors hover:text-primary"
              >
                Berita Terkini
              </Link>
            </li>
          </ul>
        </div>

        {/* Produk */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-display mb-4 text-sm font-semibold uppercase tracking-wide text-white">
            Produk Kami
          </h4>
          <ul className="space-y-2.5 text-sm text-white/60">
            <li>
              <Link
                to="/produk/kategori/cup"
                className="transition-colors hover:text-primary"
              >
                Air Minum Cup
              </Link>
            </li>
            <li>
              <Link
                to="/produk/kategori/botol"
                className="transition-colors hover:text-primary"
              >
                Air Minum Botol
              </Link>
            </li>
            <li>
              <Link
                to="/produk/kategori/galon"
                className="transition-colors hover:text-primary"
              >
                Air Minum Galon
              </Link>
            </li>
            <li>
              <Link
                to="/kontak"
                className="transition-colors hover:text-primary"
              >
                Jadi Sales?
              </Link>
            </li>
          </ul>
        </div>

        {/* Kontak */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-display mb-4 text-sm font-semibold uppercase tracking-wide text-white">
            Hubungi Kami
          </h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex max-w-xs items-start justify-center gap-2 md:justify-start">
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <span>
                {pengaturan?.alamat || "Alamat belum diisi di Admin Panel"}
              </span>
            </li>
            <li className="flex items-center justify-center gap-2 md:justify-start">
              <svg
                className="h-4 w-4 shrink-0 text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a1.5 1.5 0 0 0 1.5-1.5v-2.4a1.5 1.5 0 0 0-1.146-1.457l-3.415-.854a1.5 1.5 0 0 0-1.482.401l-1.02 1.02a11.25 11.25 0 0 1-5.397-5.397l1.02-1.02a1.5 1.5 0 0 0 .401-1.482l-.854-3.415A1.5 1.5 0 0 0 6.6 4.5H4.5A1.5 1.5 0 0 0 3 6v.75Z"
                />
              </svg>
              {pengaturan?.telepon || "-"}
            </li>
            <li className="flex items-center justify-center gap-2 md:justify-start">
              <svg
                className="h-4 w-4 shrink-0 text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.007 1.872l-7.5 5.006a2.25 2.25 0 0 1-2.486 0L3.257 8.865A2.25 2.25 0 0 1 2.25 6.993V6.75"
                />
              </svg>
              {pengaturan?.email || "-"}
            </li>
          </ul>

          {activeSocials.length > 0 && (
            <div className="mt-5 flex items-center justify-center gap-3 md:justify-start">
              {activeSocials.map((s) => (
                <a
                  key={s.key}
                  href={pengaturan[s.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-primary hover:bg-primary hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Kembali ke atas"
          className="fixed bottom-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-lg text-white shadow-[0_6px_14px_rgba(0,0,0,0.18)] ring-2 ring-white/40 transition-all duration-200 hover:scale-105 hover:bg-sky-700 md:bottom-5 md:right-5 md:h-12 md:w-12 md:text-xl"
        >
          ↑
        </button>
      )}

      <div className="border-t border-white/10 py-3 text-center text-xs text-white/50">
        <Link to="/kebijakan-privasi" className="hover:text-primary">
          Kebijakan Privasi
        </Link>
        <span className="mx-2">•</span>
        <Link to="/syarat-ketentuan" className="hover:text-primary">
          Syarat & Ketentuan
        </Link>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        &copy; Arroyyan 2026. Seluruh hak cipta dilindungi.
      </div>
    </footer>
  );
}

export default Footer;
