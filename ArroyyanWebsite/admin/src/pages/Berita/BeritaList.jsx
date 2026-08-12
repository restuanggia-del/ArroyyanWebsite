import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAllBerita, deleteBerita } from "../../services/beritaService.js";
import ConfirmDialog from "../../components/common/ConfirmDialog.jsx";
import Toast from "../../components/common/Toast.jsx";

function BeritaList() {
  const [berita, setBerita] = useState([]);
  const [idAkanDihapus, setIdAkanDihapus] = useState(null);
  const [menghapus, setMenghapus] = useState(false);
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

  const fetchBerita = () => {
    getAllBerita()
      .then((res) => setBerita(res.data))
      .catch(() => {});
  };

  useEffect(() => {
    fetchBerita();
  }, []);

  const konfirmasiHapus = async () => {
    setMenghapus(true);
    try {
      await deleteBerita(idAkanDihapus);
      fetchBerita();
      tampilkanToast("Berita berhasil dihapus");
    } catch (err) {
      tampilkanToast(
        err.response?.data?.message || "Gagal menghapus berita",
        "error",
      );
    } finally {
      setMenghapus(false);
      setIdAkanDihapus(null);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary">Kelola Berita</h1>
        <Link
          to="/berita/tambah"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
        >
          + Tambah Berita
        </Link>
      </div>

      <table className="w-full overflow-hidden rounded-xl bg-white shadow-sm">
        <thead className="bg-gray-50 text-left text-sm text-gray-500">
          <tr>
            <th className="px-4 py-3">Judul</th>
            <th className="px-4 py-3">Kategori</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {berita.map((item) => (
            <tr key={item._id} className="border-t text-sm">
              <td className="px-4 py-3">{item.judul}</td>
              <td className="px-4 py-3 capitalize">{item.kategori}</td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-2 py-1 text-xs ${item.status === "publish" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-4 py-3 space-x-2">
                <Link
                  to={`/berita/edit/${item._id}`}
                  className="text-primary hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => setIdAkanDihapus(item._id)}
                  className="text-red-500 hover:underline"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
          {berita.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                Belum ada berita.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <ConfirmDialog
        open={Boolean(idAkanDihapus)}
        title="Hapus Berita"
        message="Yakin ingin menghapus berita ini? Tindakan ini tidak bisa dibatalkan."
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

export default BeritaList;
