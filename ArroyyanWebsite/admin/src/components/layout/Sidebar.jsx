import { NavLink } from "react-router-dom";
import { clayPillActive } from "../../styles/ui.js";

const Icon = {
  dashboard: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0"
    >
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  ),
  produk: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0"
    >
      <path d="M20.5 7.5 12 3 3.5 7.5 12 12l8.5-4.5Z" />
      <path d="M3.5 7.5v9L12 21l8.5-4.5v-9" />
      <path d="M12 12v9" />
    </svg>
  ),
  berita: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 8h10M7 12h10M7 16h6" />
    </svg>
  ),
  banner: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0"
    >
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="8.5" cy="11" r="1.5" />
      <path d="m3 16 4.5-4.5L12 15l3-3 6 6" />
    </svg>
  ),
  testimoni: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
  ),
  tentang: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
  homeServis: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0"
    >
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </svg>
  ),
  pesan: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0"
    >
      <path d="M4 4h16v14H7l-3 3V4Z" />
    </svg>
  ),
  pengaturan: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  ),
  tambahAdmin: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0"
    >
      <circle cx="9" cy="8" r="4" />
      <path d="M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1" />
      <path d="M19 8v6M22 11h-6" />
    </svg>
  ),
};

const GROUPS = [
  {
    label: "Ringkasan",
    items: [{ to: "/", label: "Dashboard", icon: Icon.dashboard, end: true }],
  },
  {
    label: "Konten",
    items: [
      { to: "/produk", label: "Produk", icon: Icon.produk },
      { to: "/berita", label: "Berita", icon: Icon.berita },
      { to: "/banner", label: "Banner", icon: Icon.banner },
      { to: "/testimoni", label: "Testimoni", icon: Icon.testimoni },
      { to: "/tentang", label: "Tentang", icon: Icon.tentang },
      { to: "/home-servis", label: "Home Servis", icon: Icon.homeServis },
    ],
  },
  {
    label: "Lainnya",
    items: [
      { to: "/kontak", label: "Pesan Masuk", icon: Icon.pesan },
      { to: "/pengaturan", label: "Pengaturan", icon: Icon.pengaturan },
      { to: "/tambah-admin", label: "Tambah Admin", icon: Icon.tambahAdmin },
    ],
  },
];

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-all ${
      isActive
        ? clayPillActive
        : "text-slate-500 hover:bg-white/70 hover:text-slate-900"
    }`;

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col overflow-y-auto bg-[#eaf2fd] p-4">
      <div className="mb-8 flex items-center gap-2.5 px-1 pt-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-[4px_4px_10px_rgba(37,99,235,0.35),-2px_-2px_6px_rgba(255,255,255,0.5)]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
          >
            <path d="M13 2 3 14h7l-1 8 11-14h-7l1-6Z" />
          </svg>
        </div>
        <span className="truncate text-base font-bold tracking-tight text-slate-900">
          Arroyyan99
        </span>
      </div>

      <nav className="space-y-5 pb-4">
        {GROUPS.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {group.label}
            </p>
            <div className="space-y-1.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={linkClass}
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
