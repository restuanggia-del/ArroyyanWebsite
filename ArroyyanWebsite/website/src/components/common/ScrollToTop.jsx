import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router (SPA) tidak reset posisi scroll saat pindah halaman,
 * beda dengan website biasa yang selalu mulai dari atas.
 * Komponen ini "menonton" perubahan URL (pathname) dan otomatis
 * men-scroll window ke posisi paling atas setiap kali halaman berganti.
 *
 * Ditaruh sekali di App.jsx, di dalam <BrowserRouter>, di luar <Routes>.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // behavior: "auto" dipakai secara eksplisit supaya tidak ikut animasi
    // "scroll-behavior: smooth" global di styles/index.css saat pindah halaman.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
