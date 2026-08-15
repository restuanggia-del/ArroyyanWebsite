import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Reset posisi scroll ke atas setiap kali pindah halaman/route.
 * Ditaruh sekali di App.jsx, di dalam <BrowserRouter>.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
