import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPengaturan } from "../../services/pengaturanService.js";

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

  return (
    <footer className="relative bg-secondary text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 text-center md:grid-cols-3 md:py-12 md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <img
            src="/logo-arroyyan.png"
            alt="Logo Arroyyan99"
            className="mb-3 h-10 w-auto"
          />
          <p className="max-w-xs text-sm text-gray-300">
            Air Minum Dalam Kemasan berkualitas untuk keluarga Indonesia.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h4 className="mb-3 font-semibold">Navigasi</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/" className="hover:text-primary">
                Beranda
              </Link>
            </li>
            <li>
              <Link to="/tentang" className="hover:text-primary">
                Tentang
              </Link>
            </li>
            <li>
              <Link to="/produk" className="hover:text-primary">
                Produk
              </Link>
            </li>
            <li>
              <Link to="/home-servis" className="hover:text-primary">
                Home Servis
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h4 className="mb-3 font-semibold">Hubungi Kami</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="max-w-xs">
              {pengaturan?.alamat || "Alamat belum diisi di Admin Panel"}
            </li>
            <li>{pengaturan?.telepon || "-"}</li>
            <li>{pengaturan?.email || "-"}</li>
          </ul>
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

      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-400">
        &copy; Arroyyan 2026. Seluruh hak cipta dilindungi.
      </div>
    </footer>
  );
}

export default Footer;
