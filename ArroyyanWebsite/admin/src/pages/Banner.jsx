import { useEffect, useState } from "react";
import {
  getAllBanner,
  createBanner,
  deleteBanner,
} from "../services/bannerService.js";

const API_BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

function Banner() {
  const [banners, setBanners] = useState([]);
  const [judul, setJudul] = useState("");
  const [urutan, setUrutan] = useState(0);
  const [gambar, setGambar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBanners = () => {
    getAllBanner()
      .then((res) => setBanners(res.data))
      .catch(() => {});
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!gambar) {
      setError("Gambar wajib diunggah");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("judul", judul);
      formData.append("urutan", urutan);
      formData.append("gambar", gambar);
      await createBanner(formData);
      setJudul("");
      setUrutan(0);
      setGambar(null);
      e.target.reset();
      fetchBanners();
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengunggah banner");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus banner ini?")) return;
    await deleteBanner(id);
    fetchBanners();
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-secondary">
        Kelola Banner Slider
      </h1>
      <p className="mb-6 text-sm text-gray-500">
        Rekomendasi: unggah 3–5 gambar dengan rasio lebar (misal 1600×600px)
        agar tampil rapi di beranda. Gunakan kolom "Urutan" untuk mengatur
        posisi banner (0 = paling pertama).
      </p>

      {/* Form tambah banner */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 max-w-xl space-y-4 rounded-xl bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-1 block text-sm font-medium">
            Judul (opsional, tampil di atas gambar)
          </label>
          <input
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            placeholder="Contoh: Air Minum Berkualitas untuk Keluarga Anda"
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Urutan Tampil
          </label>
          <input
            type="number"
            value={urutan}
            onChange={(e) => setUrutan(e.target.value)}
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Gambar Banner
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setGambar(e.target.files[0])}
            required
            className="w-full"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:bg-sky-700 disabled:opacity-50"
        >
          {loading ? "Mengunggah..." : "Unggah Banner"}
        </button>
      </form>

      {/* Daftar banner yang sudah ada */}
      <h2 className="mb-4 text-lg font-semibold text-secondary">
        Banner Aktif ({banners.length})
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {banners.map((item) => (
          <div
            key={item._id}
            className="overflow-hidden rounded-xl bg-white shadow-sm"
          >
            <img
              src={`${API_BASE_URL}${item.gambar}`}
              alt={item.judul || "Banner"}
              className="h-32 w-full object-cover"
            />
            <div className="p-3">
              <p className="text-sm font-medium">
                {item.judul || "(tanpa judul)"}
              </p>
              <p className="text-xs text-gray-400">Urutan: {item.urutan}</p>
              <button
                onClick={() => handleDelete(item._id)}
                className="mt-2 text-xs text-red-500 hover:underline"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
        {banners.length === 0 && (
          <p className="text-sm text-gray-400">
            Belum ada banner. Unggah minimal 3 gambar di atas.
          </p>
        )}
      </div>
    </div>
  );
}

export default Banner;
