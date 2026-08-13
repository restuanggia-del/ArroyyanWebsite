import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  clayButtonPrimary,
  clayInset,
  clayButtonGhost,
  clayCardSm,
} from "../../styles/ui.js";

const quickCreate = [
  { label: "Produk Baru", to: "/produk/tambah" },
  { label: "Berita Baru", to: "/berita/tambah" },
  { label: "Banner Baru", to: "/banner" },
];

function Topbar({ title = "Dashboard" }) {
  const { admin } = useAuth();
  const [openCreate, setOpenCreate] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpenCreate(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 bg-[#eaf2fd]/90 px-6 py-4 backdrop-blur">
      <h1 className="hidden shrink-0 text-lg font-semibold text-slate-900 sm:block">
        {title}
      </h1>

      <div className="relative ml-0 flex-1 sm:ml-4 sm:max-w-md">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3-3" />
        </svg>
        <input
          type="text"
          placeholder="Cari sesuatu..."
          className={`${clayInset} w-full py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none`}
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpenCreate((v) => !v)}
            className={`${clayButtonPrimary} px-4 py-2.5 text-sm font-semibold`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              className="h-4 w-4"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span className="hidden sm:inline">Buat</span>
          </button>
          {openCreate && (
            <div
              className={`absolute right-0 mt-2 w-48 overflow-hidden py-1.5 ${clayCardSm}`}
            >
              {quickCreate.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpenCreate(false)}
                  className="block px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-blue-50 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <button
          className={`${clayButtonGhost} relative h-10 w-10`}
          title="Notifikasi"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4.5 w-4.5"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-cyan-500" />
        </button>

        <div
          className={`flex items-center gap-2.5 py-1.5 pl-1.5 pr-3.5 ${clayCardSm}`}
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-xs font-bold text-white">
            {admin?.nama?.charAt(0) || "A"}
          </div>
          <span className="hidden truncate text-sm font-medium text-slate-800 md:inline">
            {admin?.nama?.split(" ")[0] || "Admin"}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
