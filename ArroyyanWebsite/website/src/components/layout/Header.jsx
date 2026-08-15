import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const [produkDropdownOpen, setProdukDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `relative py-1 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:text-primary ${
      isActive
        ? "text-primary font-semibold after:w-full"
        : "text-secondary after:w-0 hover:after:w-full"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 bg-white/90 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-[0_4px_20px_rgba(15,23,42,0.08)]" : "shadow-sm"
      }`}
    >
      <div className="relative mx-auto max-w-7xl">
        <div
          className={`mx-auto flex items-center justify-between px-4 transition-[padding] duration-300 ${
            scrolled ? "py-2" : "py-3"
          }`}
        >
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo-arroyyan.png"
              alt="Logo Arroyyan99"
              className={`w-auto transition-all duration-300 ${scrolled ? "h-8" : "h-10"}`}
            />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink to="/" className={navLinkClass}>
              Beranda
            </NavLink>
            <NavLink to="/tentang" className={navLinkClass}>
              Tentang
            </NavLink>
            <NavLink to="/produk" className={navLinkClass}>
              Produk
            </NavLink>
            <NavLink to="/home-servis" className={navLinkClass}>
              Home Servis
            </NavLink>
            <NavLink to="/berita" className={navLinkClass}>
              Berita Terkini
            </NavLink>
            <NavLink to="/kontak" className={navLinkClass}>
              Kontak
            </NavLink>
          </nav>

          <div className="hidden md:block">
            <Link
              to="/kontak"
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Pesan Sekarang
            </Link>
          </div>

          <button
            className="rounded-md p-2 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Buka menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="mb-1 block h-0.5 w-6 bg-secondary"></span>
            <span className="mb-1 block h-0.5 w-6 bg-secondary"></span>
            <span className="block h-0.5 w-6 bg-secondary"></span>
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="absolute inset-x-0 top-full z-40 border-t bg-white px-4 py-4 shadow-lg md:hidden">
            <div className="flex flex-col gap-3">
              <NavLink
                to="/"
                className={navLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Beranda
              </NavLink>
              <NavLink
                to="/tentang"
                className={navLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Tentang
              </NavLink>
              <NavLink
                to="/produk"
                className={navLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Produk
              </NavLink>
              <NavLink
                to="/home-servis"
                className={navLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home Servis
              </NavLink>
              <NavLink
                to="/berita"
                className={navLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Berita Terkini
              </NavLink>
              <NavLink
                to="/kontak"
                className={navLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Kontak
              </NavLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
