import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { getAllProduk } from "../../services/produkService.js";
import { getAllBerita } from "../../services/beritaService.js";
import { getTentang } from "../../services/tentangService.js";
import { getAllTestimoni } from "../../services/testimoniService.js";
import { getAllBanner } from "../../services/bannerService.js";
import { getHomeServis } from "../../services/homeServisService.js";
import { getAllKontak } from "../../services/kontakService.js";
import {
  clayButtonPrimary,
  clayInset,
  clayButtonGhost,
  clayCardSm,
} from "../../styles/ui.js";

const NOTIF_ACK_KEY = "arroyyan_notif_ack_ids";
const KONTAK_POLL_MS = 20000;

const quickCreate = [
  { label: "Produk Baru", to: "/produk/tambah" },
  { label: "Berita Baru", to: "/berita/tambah" },
  { label: "Banner Baru", to: "/banner" },
];

const iconProduk = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <path d="M20.5 7.5 12 3 3.5 7.5 12 12l8.5-4.5Z" />
    <path d="M3.5 7.5v9L12 21l8.5-4.5v-9" />
  </svg>
);
const iconBerita = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
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
    className="h-4 w-4"
  >
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <circle cx="8.5" cy="11" r="1.5" />
    <path d="m3 16 4.5-4.5L12 15l3-3 6 6" />
  </svg>
);
const iconTestimoni = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
  </svg>
);
const iconTentang = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);
const iconHomeServis = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <path d="m3 11 9-8 9 8" />
    <path d="M5 10v10h14V10" />
  </svg>
);
const iconPesan = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <path d="M4 4h16v14H7l-3 3V4Z" />
  </svg>
);
const iconSearch = (
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
);
const iconBell = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

function formatTanggal(iso) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
}

function Topbar({ title = "Dashboard" }) {
  const { admin } = useAuth();
  const navigate = useNavigate();

  const [openCreate, setOpenCreate] = useState(false);
  const createRef = useRef(null);

  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const [data, setData] = useState({
    produk: [],
    berita: [],
    tentang: null,
    testimoni: [],
    banner: [],
    homeServis: null,
  });

  const [kontak, setKontak] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const [ackIds, setAckIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(NOTIF_ACK_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const onClick = (e) => {
      if (createRef.current && !createRef.current.contains(e.target)) {
        setOpenCreate(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    Promise.allSettled([
      getAllProduk(),
      getAllBerita(),
      getTentang(),
      getAllTestimoni(),
      getAllBanner(),
      getHomeServis(),
    ]).then(([produk, berita, tentang, testimoni, banner, homeServis]) => {
      setData({
        produk: produk.status === "fulfilled" ? produk.value.data : [],
        berita: berita.status === "fulfilled" ? berita.value.data : [],
        tentang: tentang.status === "fulfilled" ? tentang.value.data : null,
        testimoni: testimoni.status === "fulfilled" ? testimoni.value.data : [],
        banner: banner.status === "fulfilled" ? banner.value.data : [],
        homeServis:
          homeServis.status === "fulfilled" ? homeServis.value.data : null,
      });
    });
  }, []);

  useEffect(() => {
    const fetchKontak = () => {
      getAllKontak()
        .then((res) => setKontak(res.data))
        .catch(() => {});
    };
    fetchKontak();
    const interval = setInterval(fetchKontak, KONTAK_POLL_MS);
    return () => clearInterval(interval);
  }, []);

  const pesanBelumDiack = useMemo(
    () => kontak.filter((p) => !p.dibaca && !ackIds.includes(p._id)),
    [kontak, ackIds],
  );
  const pesanBelumDibaca = useMemo(
    () => kontak.filter((p) => !p.dibaca),
    [kontak],
  );

  const handleBellClick = () => {
    setNotifOpen((v) => !v);
    setOpenCreate(false);
    setSearchOpen(false);
    if (pesanBelumDiack.length > 0) {
      const merged = Array.from(
        new Set([...ackIds, ...pesanBelumDiack.map((p) => p._id)]),
      );
      setAckIds(merged);
      try {
        localStorage.setItem(NOTIF_ACK_KEY, JSON.stringify(merged));
      } catch {}
    }
  };

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const out = [];

    data.produk.forEach((p) => {
      if (p.nama?.toLowerCase().includes(q)) {
        out.push({
          key: `produk-${p._id}`,
          type: "Produk",
          icon: iconProduk,
          label: p.nama,
          sub: p.kategori,
          to: `/produk/edit/${p._id}`,
        });
      }
    });

    data.berita.forEach((b) => {
      if (b.judul?.toLowerCase().includes(q)) {
        out.push({
          key: `berita-${b._id}`,
          type: "Berita",
          icon: iconBerita,
          label: b.judul,
          sub: b.kategori,
          to: `/berita/edit/${b._id}`,
        });
      }
    });

    if (data.tentang) {
      const fields = {
        sejarah: "Sejarah",
        lokasi: "Lokasi",
        visi: "Visi",
        misi: "Misi",
      };
      Object.entries(fields).forEach(([key, label]) => {
        if (data.tentang[key]?.toLowerCase().includes(q)) {
          out.push({
            key: `tentang-${key}`,
            type: "Tentang",
            icon: iconTentang,
            label,
            sub: "Halaman Tentang Arroyyan",
            to: "/tentang",
          });
        }
      });
    }

    data.testimoni.forEach((t) => {
      if (
        t.nama?.toLowerCase().includes(q) ||
        t.pesan?.toLowerCase().includes(q)
      ) {
        out.push({
          key: `testimoni-${t._id}`,
          type: "Testimoni",
          icon: iconTestimoni,
          label: t.nama,
          sub: t.peran || "Testimoni pelanggan",
          to: "/testimoni",
        });
      }
    });

    data.banner.forEach((b) => {
      if (b.judul?.toLowerCase().includes(q)) {
        out.push({
          key: `banner-${b._id}`,
          type: "Banner",
          icon: iconBanner,
          label: b.judul || "(tanpa judul)",
          sub: "Banner slider",
          to: "/banner",
        });
      }
    });

    if (
      data.homeServis &&
      (data.homeServis.judul?.toLowerCase().includes(q) ||
        data.homeServis.deskripsi?.toLowerCase().includes(q) ||
        data.homeServis.areaCakupan?.toLowerCase().includes(q))
    ) {
      out.push({
        key: "home-servis",
        type: "Home Servis",
        icon: iconHomeServis,
        label: data.homeServis.judul || "Home Servis",
        sub: "Halaman Home Servis",
        to: "/home-servis",
      });
    }

    return out.slice(0, 8);
  }, [query, data]);

  const handleResultClick = (to) => {
    navigate(to);
    setQuery("");
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 bg-[#eaf2fd]/90 px-6 py-4 backdrop-blur">
      <h1 className="hidden shrink-0 text-lg font-semibold text-slate-900 sm:block">
        {title}
      </h1>

      <div className="relative ml-0 flex-1 sm:ml-4 sm:max-w-md" ref={searchRef}>
        {iconSearch}
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSearchOpen(true);
          }}
          onFocus={() => setSearchOpen(true)}
          placeholder="Cari produk, berita, tentang..."
          className={`${clayInset} w-full py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none`}
        />

        {searchOpen && query.trim() && (
          <div
            className={`absolute left-0 right-0 top-full z-30 mt-2 max-h-96 overflow-y-auto py-2 ${clayCardSm}`}
          >
            {searchResults.length === 0 ? (
              <p className="px-4 py-3 text-sm text-gray-400">
                Tidak ada hasil untuk "{query}"
              </p>
            ) : (
              searchResults.map((r) => (
                <button
                  key={r.key}
                  onClick={() => handleResultClick(r.to)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-blue-50"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    {r.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-secondary">
                      {r.label}
                    </span>
                    <span className="block truncate text-xs text-gray-400">
                      {r.type}
                      {r.sub ? ` • ${r.sub}` : ""}
                    </span>
                  </span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="relative" ref={createRef}>
          <button
            onClick={() => {
              setOpenCreate((v) => !v);
              setSearchOpen(false);
              setNotifOpen(false);
            }}
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

        <div className="relative" ref={notifRef}>
          <button
            onClick={handleBellClick}
            className={`${clayButtonGhost} relative h-10 w-10`}
            title="Notifikasi"
          >
            {iconBell}
            {pesanBelumDiack.length > 0 && (
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            )}
          </button>

          {notifOpen && (
            <div
              className={`absolute right-0 mt-2 w-72 overflow-hidden ${clayCardSm}`}
            >
              <div className="flex items-center justify-between px-4 py-3">
                <p className="text-sm font-semibold text-secondary">
                  Pesan Masuk
                </p>
                {pesanBelumDibaca.length > 0 && (
                  <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">
                    {pesanBelumDibaca.length} belum dibaca
                  </span>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto">
                {kontak.length === 0 ? (
                  <p className="px-4 pb-4 text-sm text-gray-400">
                    Belum ada pesan masuk.
                  </p>
                ) : (
                  kontak.slice(0, 5).map((p) => (
                    <Link
                      key={p._id}
                      to="/kontak"
                      onClick={() => setNotifOpen(false)}
                      className="flex items-start gap-3 px-4 py-2.5 transition-colors hover:bg-blue-50"
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        {iconPesan}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1.5">
                          <span className="truncate text-sm font-medium text-secondary">
                            {p.nama}
                          </span>
                          {!p.dibaca && (
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                          )}
                        </span>
                        <span className="block truncate text-xs text-gray-400">
                          {p.pesan}
                        </span>
                      </span>
                      <span className="shrink-0 text-xs text-gray-400">
                        {formatTanggal(p.createdAt)}
                      </span>
                    </Link>
                  ))
                )}
              </div>
              <Link
                to="/kontak"
                onClick={() => setNotifOpen(false)}
                className="block border-t border-blue-50 px-4 py-2.5 text-center text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
              >
                Lihat semua pesan
              </Link>
            </div>
          )}
        </div>

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
