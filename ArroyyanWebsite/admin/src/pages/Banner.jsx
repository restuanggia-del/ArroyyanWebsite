import { useEffect, useState } from "react";
import {
  getAllBanner,
  createBanner,
  deleteBanner,
} from "../services/bannerService.js";
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

const iconImage = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-5-5L5 21" />
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

function Banner() {
  const [banners, setBanners] = useState([]);
  const [judul, setJudul] = useState("");
  const [urutan, setUrutan] = useState(0);
  const [gambar, setGambar] = useState(null);
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
      tampilkanToast("Banner berhasil diunggah");
    } catch (err) {
      const pesan = err.response?.data?.message || "Gagal mengunggah banner";
      setError(pesan);
      tampilkanToast(pesan, "error");
    } finally {
      setLoading(false);
    }
  };

  const konfirmasiHapus = async () => {
    setMenghapus(true);
    try {
      await deleteBanner(idAkanDihapus);
      fetchBanners();
      tampilkanToast("Banner berhasil dihapus");
    } catch (err) {
      tampilkanToast(
        err.response?.data?.message || "Gagal menghapus banner",
        "error",
      );
    } finally {
      setMenghapus(false);
      setIdAkanDihapus(null);
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-secondary">
            Kelola Banner Slider
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Rekomendasi: unggah 3–5 gambar rasio lebar (misal 1600×600px).
            "Urutan" mengatur posisi banner (0 = paling pertama).
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <FormSection
          icon={iconImage}
          title="Unggah Banner Baru"
          subtitle="Gambar akan tampil sebagai slider di beranda"
        >
          <div>
            <label className={clayLabel}>
              Judul{" "}
              <span className="text-xs font-normal text-gray-400">
                (opsional, tampil di atas gambar)
              </span>
            </label>
            <input
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Contoh: Air Minum Berkualitas untuk Keluarga Anda"
              className={clayInput}
            />
          </div>
          <div>
            <label className={clayLabel}>Urutan Tampil</label>
            <input
              type="number"
              value={urutan}
              onChange={(e) => setUrutan(e.target.value)}
              className={clayInput}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={clayLabel}>Gambar Banner</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setGambar(e.target.files[0])}
              required
              className="block w-full rounded-2xl border-2 border-dashed border-blue-200 bg-[#eef5fd]/60 px-4 py-6 text-sm text-gray-500 file:mr-4 file:rounded-xl file:border-0 file:bg-gradient-to-br file:from-blue-500 file:to-cyan-500 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white file:shadow-[3px_3px_8px_rgba(37,99,235,0.35)]"
            />
          </div>
          {error && (
            <div className="sm:col-span-2">
              <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 shadow-[inset_2px_2px_5px_rgba(239,68,68,0.06)]">
                {error}
              </p>
            </div>
          )}
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className={`${clayButtonPrimary} px-5 py-2.5 text-sm font-semibold`}
            >
              {iconCheck}
              {loading ? "Mengunggah..." : "Unggah Banner"}
            </button>
          </div>
        </FormSection>
      </form>

      <h2 className="mb-4 text-sm font-semibold text-secondary">
        Banner Aktif ({banners.length})
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {banners.map((item) => (
          <div
            key={item._id}
            className="overflow-hidden rounded-[24px] border border-white bg-white shadow-[8px_8px_18px_rgba(96,130,196,0.16),-8px_-8px_18px_rgba(255,255,255,0.95)]"
          >
            <img
              src={`${API_BASE_URL}${item.gambar}`}
              alt={item.judul || "Banner"}
              className="h-32 w-full object-cover"
            />
            <div className="flex items-center justify-between p-3.5">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-secondary">
                  {item.judul || "(tanpa judul)"}
                </p>
                <p className="text-xs text-gray-400">Urutan: {item.urutan}</p>
              </div>
              <button
                onClick={() => setIdAkanDihapus(item._id)}
                title="Hapus"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                {iconTrash}
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

      <ConfirmDialog
        open={Boolean(idAkanDihapus)}
        title="Hapus Banner"
        message="Yakin ingin menghapus banner ini? Tindakan ini tidak bisa dibatalkan."
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

export default Banner;
