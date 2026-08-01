import { Link } from "react-router-dom";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-secondary text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-3">
        {/* Kiri: Logo & Slogan */}
        <div>
          <img
            src="/logo-arroyyan-white.png"
            alt="Logo Arroyyan99"
            className="h-10 w-auto mb-3"
          />
          <p className="text-sm text-gray-300">
            Air Minum Dalam Kemasan berkualitas untuk keluarga Indonesia.
          </p>
        </div>

        {/* Tengah: Navigasi */}
        <div>
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

        {/* Kanan: Kontak */}
        <div>
          <h4 className="mb-3 font-semibold">Hubungi Kami</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              Jl. Malabar No.88 Bogatama, Penawar Tama, Tulang Bawang, Lampung
            </li>
            <li>0812-3456-7890</li>
            <li>info@arroyyan99.com</li>
          </ul>
        </div>
      </div>

      {/* Tombol kembali ke atas */}
      <button
        onClick={scrollToTop}
        aria-label="Kembali ke atas"
        className="absolute right-6 top-0 -translate-y-1/2 rounded-full bg-primary p-3 text-white shadow-lg hover:bg-sky-700"
      >
        ↑
      </button>

      {/* Copyright */}
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-400">
        &copy; Arroyyan 2026. Seluruh hak cipta dilindungi.
      </div>
    </footer>
  );
}

export default Footer;
