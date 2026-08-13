import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAllProduk, deleteProduk } from "../../services/produkService.js";
import ConfirmDialog from "../../components/common/ConfirmDialog.jsx";
import Toast from "../../components/common/Toast.jsx";
import {
  clayCard,
  clayInset,
  clayPillActive,
  clayPillInactive,
  clayButtonPrimary,
} from "../../styles/ui.js";

const API_BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

const iconEdit = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);
const iconTrash = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <path d="M3 6h18" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
  </svg>
);
const iconSearch = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3-3" />
  </svg>
);

const kategoriBadge = {
  cup: "bg-sky-50 text-sky-700",
  botol: "bg-blue-50 text-blue-700",
  galon: "bg-amber-50 text-amber-700",
};

function ProdukList() {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idAkanDihapus, setIdAkanDihapus] = useState(null);
  const [menghapus, setMenghapus] = useState(false);
  const [tab, setTab] = useState("semua");
  const [pencarian, setPencarian] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const location = useLocation();
  const navigate = useNavigate();

  const tampilkanToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  useEffect(() => {
    if (location.state?.toast) {
      tampilkanToast(location.state.toast);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  const fetchProduk = () => {
    setLoading(true);
    getAllProduk()
      .then((res) => setProduk(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  const konfirmasiHapus = async () => {
    setMenghapus(true);
    try {
      await deleteProduk(idAkanDihapus);
      fetchProduk();
      tampilkanToast("Produk berhasil dihapus");
    } catch (err) {
      tampilkanToast(
        err.response?.data?.message || "Gagal menghapus produk",
        "error",
      );
    } finally {
      setMenghapus(false);
      setIdAkanDihapus(null);
    }
  };

  const jumlah = useMemo(
    () => ({
      semua: produk.length,
      aktif: produk.filter((p) => p.status === "aktif").length,
      nonaktif: produk.filter((p) => p.status !== "aktif").length,
    }),
    [produk],
  );

  const tabs = [
    { key: "semua", label: "Semua", count: jumlah.semua },
    { key: "aktif", label: "Aktif", count: jumlah.aktif },
    { key: "nonaktif", label: "Nonaktif", count: jumlah.nonaktif },
  ];

  const produkTampil = useMemo(() => {
    return produk.filter((item) => {
      const cocokTab =
        tab === "semua" ||
        (tab === "aktif" && item.status === "aktif") ||
        (tab === "nonaktif" && item.status !== "aktif");
      const cocokCari = item.nama
        ?.toLowerCase()
        .includes(pencarian.toLowerCase());
      return cocokTab && cocokCari;
    });
  }, [produk, tab, pencarian]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Kelola Produk</h1>
          <p className="mt-1 text-sm text-gray-500">
            Daftar produk Cup, Botol, dan Galon Arroyyan99.
          </p>
        </div>
        <Link
          to="/produk/tambah"
          className={`${clayButtonPrimary} px-4 py-2.5 text-sm font-semibold`}
        >
          + Tambah Produk
        </Link>
      </div>

      {/* Filter bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium transition-all ${
                tab === t.key ? clayPillActive : clayPillInactive
              }`}
            >
              {t.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-xs ${
                  tab === t.key
                    ? "bg-white/25 text-white"
                    : "bg-white/70 text-gray-500"
                }`}
              >
                {t.count}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            {iconSearch}
          </span>
          <input
            type="text"
            value={pencarian}
            onChange={(e) => setPencarian(e.target.value)}
            placeholder="Cari produk..."
            className={`${clayInset} w-full rounded-full py-2 pl-10 pr-4 text-sm outline-none`}
          />
        </div>
      </div>

      <div className={`overflow-hidden ${clayCard}`}>
        <table className="w-full">
          <thead>
            <tr className="bg-[#eef5fd]/70 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              <th className="px-5 py-3">Produk</th>
              <th className="px-5 py-3">Kategori</th>
              <th className="px-5 py-3">Volume</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(3)].map((_, i) => (
                <tr key={i} className="border-b border-blue-50 last:border-0">
                  <td colSpan={5} className="px-5 py-4">
                    <div className="h-5 w-full animate-pulse rounded bg-gray-100" />
                  </td>
                </tr>
              ))
            ) : produkTampil.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-14 text-center">
                  <p className="text-sm font-medium text-secondary">
                    {produk.length === 0
                      ? "Belum ada produk"
                      : "Tidak ada produk yang cocok"}
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    {produk.length === 0
                      ? 'Klik "Tambah Produk" untuk menambahkan produk pertama.'
                      : "Coba ubah kata kunci atau filter."}
                  </p>
                </td>
              </tr>
            ) : (
              produkTampil.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-blue-50 text-sm transition-colors last:border-0 hover:bg-blue-50/40"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        {item.gambar && (
                          <img
                            src={`${API_BASE_URL}${item.gambar}`}
                            alt={item.nama}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <span className="font-medium text-secondary">
                        {item.nama}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                        kategoriBadge[item.kategori] ||
                        "bg-slate-100 text-gray-600"
                      }`}
                    >
                      {item.kategori}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{item.volume}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                        item.status === "aktif"
                          ? "bg-green-50 text-green-700"
                          : "bg-slate-100 text-gray-500"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          item.status === "aktif"
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      />
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1.5">
                      <Link
                        to={`/produk/edit/${item._id}`}
                        title="Edit"
                        className="flex h-8 w-8 items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
                      >
                        {iconEdit}
                      </Link>
                      <button
                        onClick={() => setIdAkanDihapus(item._id)}
                        title="Hapus"
                        className="flex h-8 w-8 items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        {iconTrash}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={Boolean(idAkanDihapus)}
        title="Hapus Produk"
        message="Yakin ingin menghapus produk ini? Tindakan ini tidak bisa dibatalkan."
        loading={menghapus}
        onConfirm={konfirmasiHapus}
        onCancel={() => setIdAkanDihapus(null)}
      />

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
}

export default ProdukList;
