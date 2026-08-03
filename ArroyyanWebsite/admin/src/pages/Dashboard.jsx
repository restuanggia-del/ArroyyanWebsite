import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStats } from "../services/statsService.js";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then((res) => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const kartu = [
    { label: "Total Produk", nilai: stats?.totalProduk, link: "/produk" },
    { label: "Total Berita", nilai: stats?.totalBerita, link: "/berita" },
    { label: "Banner Aktif", nilai: stats?.totalBanner, link: "/banner" },
    {
      label: "Pesan Masuk",
      nilai: stats?.totalPesan,
      keterangan:
        stats?.pesanBelumDibaca > 0
          ? `${stats.pesanBelumDibaca} belum dibaca`
          : null,
      link: "/kontak",
    },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-secondary">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {kartu.map((item) => (
          <Link
            key={item.label}
            to={item.link}
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-2xl font-bold text-secondary">
              {loading ? "..." : (item.nilai ?? 0)}
            </p>
            {item.keterangan && (
              <p className="mt-1 text-xs font-medium text-amber-600">
                {item.keterangan}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
