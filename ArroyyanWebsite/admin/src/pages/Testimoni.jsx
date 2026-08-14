import { useEffect, useState } from "react";
import {
  getAllTestimoni,
  createTestimoni,
  deleteTestimoni,
} from "../services/testimoniService.js";
import ConfirmDialog from "../components/common/ConfirmDialog.jsx";
import Toast from "../components/common/Toast.jsx";
import FormSection from "../components/common/FormSection.jsx";
import {
  clayInput,
  clayLabel,
  clayButtonPrimary,
  clayCardSm,
} from "../styles/ui.js";

const API_BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

const iconUser = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
  </svg>
);
const iconStar = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8l-6.2 3.2 1.2-6.8-5-4.9 6.9-1L12 2Z" />
  </svg>
);
const iconCheck = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    className="h-4 w-4"
  >
    <path d="M20 6 9 17l-5-5" />
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

function Testimoni() {
  const [daftar, setDaftar] = useState([]);
  const [nama, setNama] = useState("");
  const [peran, setPeran] = useState("");
  const [pesan, setPesan] = useState("");
  const [rating, setRating] = useState(5);
  const [foto, setFoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [idAkanDihapus, setIdAkanDihapus] = useState(null);
  const [menghapus, setMenghapus] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const tampilkanToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const fetchTestimoni = () => {
    getAllTestimoni()
      .then((res) => setDaftar(res.data))
      .catch(() => {});
  };

  useEffect(() => {
    fetchTestimoni();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("peran", peran);
      formData.append("pesan", pesan);
      formData.append("rating", rating);
      if (foto) formData.append("foto", foto);

      await createTestimoni(formData);
      setNama("");
      setPeran("");
      setPesan("");
      setRating(5);
      setFoto(null);
      e.target.reset();
      fetchTestimoni();
      tampilkanToast("Testimoni berhasil ditambahkan");
    } catch (err) {
      const pesanError =
        err.response?.data?.message || "Gagal menyimpan testimoni";
      setError(pesanError);
      tampilkanToast(pesanError, "error");
    } finally {
      setLoading(false);
    }
  };

  const konfirmasiHapus = async () => {
    setMenghapus(true);
    try {
      await deleteTestimoni(idAkanDihapus);
      fetchTestimoni();
      tampilkanToast("Testimoni berhasil dihapus");
    } catch (err) {
      tampilkanToast(
        err.response?.data?.message || "Gagal menghapus testimoni",
        "error",
      );
    } finally {
      setMenghapus(false);
      setIdAkanDihapus(null);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-secondary">Kelola Testimoni</h1>
        <p className="mt-1 text-sm text-gray-500">
          Ulasan pelanggan yang tampil di halaman beranda.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <FormSection
          icon={iconUser}
          title="Tambah Testimoni"
          subtitle="Masukkan ulasan pelanggan baru"
        >
          <div>
            <label className={clayLabel}>Nama</label>
            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              className={clayInput}
            />
          </div>
          <div>
            <label className={clayLabel}>Peran / Keterangan</label>
            <input
              value={peran}
              onChange={(e) => setPeran(e.target.value)}
              placeholder="Contoh: Distributor Bandar Jaya"
              className={clayInput}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={clayLabel}>Pesan Testimoni</label>
            <textarea
              value={pesan}
              onChange={(e) => setPesan(e.target.value)}
              required
              rows={3}
              className={clayInput}
            />
          </div>
          <div>
            <label className={clayLabel}>Rating (1–5)</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className={clayInput}
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Bintang
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={clayLabel}>Foto (opsional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFoto(e.target.files[0])}
              className="block w-full rounded-2xl border-2 border-dashed border-blue-200 bg-[#eef5fd]/60 px-4 py-2.5 text-sm text-gray-500 file:mr-4 file:rounded-xl file:border-0 file:bg-gradient-to-br file:from-blue-500 file:to-cyan-500 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white"
            />
          </div>
          {error && (
            <div className="sm:col-span-2">
              <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 shadow-[inset_2px_2px_5px_rgba(239,68,68,0.06)]">
                {error}
              </p>
            </div>
          )}
          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`${clayButtonPrimary} px-5 py-2.5 text-sm font-semibold`}
            >
              {iconCheck}
              {loading ? "Menyimpan..." : "Tambah Testimoni"}
            </button>
          </div>
        </FormSection>
      </form>

      <h2 className="mb-4 text-sm font-semibold text-secondary">
        Testimoni ({daftar.length})
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {daftar.map((item) => (
          <div key={item._id} className={`${clayCardSm} p-4`}>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {item.foto ? (
                  <img
                    src={`${API_BASE_URL}${item.foto}`}
                    alt={item.nama}
                    className="h-10 w-10 rounded-full object-cover shadow-[3px_3px_8px_rgba(96,130,196,0.2)]"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-sm font-semibold text-white shadow-[3px_3px_8px_rgba(37,99,235,0.3)]">
                    {item.nama.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-secondary">
                    {item.nama}
                  </p>
                  <p className="text-xs text-gray-400">{item.peran}</p>
                </div>
              </div>
              <button
                onClick={() => setIdAkanDihapus(item._id)}
                title="Hapus"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                {iconTrash}
              </button>
            </div>
            <p className="text-sm text-gray-600">"{item.pesan}"</p>
            <p className="mt-2 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={
                    i < item.rating ? "text-amber-400" : "text-gray-200"
                  }
                >
                  {iconStar}
                </span>
              ))}
            </p>
          </div>
        ))}
        {daftar.length === 0 && (
          <p className="text-sm text-gray-400">Belum ada testimoni.</p>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(idAkanDihapus)}
        title="Hapus Testimoni"
        message="Yakin ingin menghapus testimoni ini? Tindakan ini tidak bisa dibatalkan."
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

export default Testimoni;
