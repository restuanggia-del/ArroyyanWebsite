import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const [produkDropdownOpen, setProdukDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `hover:text-primary transition-colors ${isActive ? "text-primary font-semibold" : "text-secondary"}`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Kiri: Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo-arroyyan.png" alt="Logo Arroyyan99" className="h-10 w-auto" />
          <span className="text-lg font-bold text-primary">Arroyyan99</span>
        </Link>

        {/* Tengah: Navbar (desktop) */}
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={navLinkClass}>Beranda</NavLink>
          <NavLink to="/tentang" className={navLinkClass}>Tentang</NavLink>

          {/* Dropdown Produk */}
          <div
            className="relative"
            onMouseEnter={() => setProdukDropdownOpen(true)}
            onMouseLeave={() => setProdukDropdownOpen(false)}
          >
            <NavLink to="/produk" className={navLinkClass}>Produk</NavLink>
            {produkDropdownOpen && (
              <div className="absolute left-0 top-full w-40 rounded-md bg-white py-2 shadow-lg">
                <Link to="/produk/kategori/cup" className="block px-4 py-2 hover:bg-gray-50">Cup</Link>
                <Link to="/produk/kategori/botol" className="block px-4 py-2 hover:bg-gray-50">Botol</Link>
                <Link to="/produk/kategori/galon" className="block px-4 py-2 hover:bg-gray-50">Galon</Link>
              </div>
            )}
          </div>

          <NavLink to="/home-servis" className={navLinkClass}>Home Servis</NavLink>
          <NavLink to="/berita" className={navLinkClass}>Berita Terkini</NavLink>
          <NavLink to="/kontak" className={navLinkClass}>Kontak</NavLink>
        </nav>

        {/* Kanan: CTA */}
        <div className="hidden md:block">
          <Link
            to="/kontak"
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-sky-700"
          >
            Pesan Sekarang
          </Link>
        </div>

        {/* Tombol menu mobile */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Buka menu"
        >
          <span className="block h-0.5 w-6 bg-secondary mb-1"></span>
          <span className="block h-0.5 w-6 bg-secondary mb-1"></span>
          <span className="block h-0.5 w-6 bg-secondary"></span>
        </button>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <nav className="flex flex-col gap-3 border-t bg-white px-4 py-4 md:hidden">
          <NavLink to="/" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>Beranda</NavLink>
          <NavLink to="/tentang" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>Tentang</NavLink>
          <NavLink to="/produk" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>Produk</NavLink>
          <NavLink to="/home-servis" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>Home Servis</NavLink>
          <NavLink to="/berita" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>Berita Terkini</NavLink>
          <NavLink to="/kontak" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>Kontak</NavLink>
        </nav>
      )}
    </header>
  );
}

export default Header;
