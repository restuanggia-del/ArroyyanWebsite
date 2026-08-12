import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAllProduk, deleteProduk } from "../../services/produkService.js";
import ConfirmDialog from "../../components/common/ConfirmDialog.jsx";
import Toast from "../../components/common/Toast.jsx";

function ProdukList() {
  const [produk, setProduk] = useState([]);
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

  const fetchProduk = () => {
    getAllProduk()
      .then((res) => setProduk(res.data))
      .catch(() => {});
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

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary">Kelola Produk</h1>
        <Link
          to="/produk/tambah"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
        >
          + Tambah Produk
        </Link>
      </div>

      <table className="w-full overflow-hidden rounded-xl bg-white shadow-sm">
        <thead className="bg-gray-50 text-left text-sm text-gray-500">
          <tr>
            <th className="px-4 py-3">Nama</th>
            <th className="px-4 py-3">Kategori</th>
            <th className="px-4 py-3">Volume</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {produk.map((item) => (
            <tr key={item._id} className="border-t text-sm">
              <td className="px-4 py-3">{item.nama}</td>
              <td className="px-4 py-3 capitalize">{item.kategori}</td>
              <td className="px-4 py-3">{item.volume}</td>
              <td className="px-4 py-3">{item.status}</td>
              <td className="px-4 py-3 space-x-2">
                <Link
                  to={`/produk/edit/${item._id}`}
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
        </tbody>
      </table>

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
