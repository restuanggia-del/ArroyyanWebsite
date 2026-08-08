import { useEffect, useState } from "react";
import {
  getAllTestimoni,
  createTestimoni,
  deleteTestimoni,
} from "../services/testimoniService.js";
import ConfirmDialog from "../components/common/ConfirmDialog.jsx";

const API_BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

function Testimoni() {
  const [daftar, setDaftar] = useState([]);
  const [nama, setNama] = useState("");
  const [peran, setPeran] = useState("");
  const [pesan, setPesan] = useState("");
  const [rating, setRating] = useState(5);
  const [foto, setFoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menyimpan testimoni");
    } finally {
      setLoading(false);
    }
  };

  const [idAkanDihapus, setIdAkanDihapus] = useState(null);
  const [menghapus, setMenghapus] = useState(false);

  const konfirmasiHapus = async () => {
    setMenghapus(true);
    try {
      await deleteTestimoni(idAkanDihapus);
      fetchTestimoni();
    } finally {
      setMenghapus(false);
      setIdAkanDihapus(null);
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-secondary">
        Kelola Testimoni
      </h1>

      {/* Form tambah testimoni */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 max-w-xl space-y-4 rounded-xl bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-1 block text-sm font-medium">Nama</label>
          <input
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Peran / Keterangan
          </label>
          <input
            value={peran}
            onChange={(e) => setPeran(e.target.value)}
            placeholder="Contoh: Distributor Bandar Jaya, Pelanggan Rumahan"
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Pesan Testimoni
          </label>
          <textarea
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
            required
            rows={3}
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Rating (1–5)</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full rounded-lg border px-4 py-2"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} Bintang
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Foto (opsional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFoto(e.target.files[0])}
            className="w-full"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:bg-sky-700 disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Tambah Testimoni"}
        </button>
      </form>

      {/* Daftar testimoni */}
      <h2 className="mb-4 text-lg font-semibold text-secondary">
        Testimoni ({daftar.length})
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {daftar.map((item) => (
          <div key={item._id} className="rounded-xl bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-3">
              {item.foto ? (
                <img
                  src={`${API_BASE_URL}${item.foto}`}
                  alt={item.nama}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {item.nama.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold">{item.nama}</p>
                <p className="text-xs text-gray-400">{item.peran}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">"{item.pesan}"</p>
            <p className="mt-2 text-xs text-yellow-500">
              {"★".repeat(item.rating)}
              {"☆".repeat(5 - item.rating)}
            </p>
            <button
              onClick={() => setIdAkanDihapus(item._id)}
              className="mt-2 text-xs text-red-500 hover:underline"
            >
              Hapus
            </button>
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
    </div>
  );
}

export default Testimoni;
