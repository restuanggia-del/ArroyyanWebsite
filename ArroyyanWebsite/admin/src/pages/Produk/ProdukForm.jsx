import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduk,
  updateProduk,
  getProdukById,
} from "../../services/produkService.js";
import FormSection from "../../components/common/FormSection.jsx";
import {
  clayInput,
  clayLabel,
  clayButtonPrimary,
  clayCardSm,
} from "../../styles/ui.js";

const iconInfo = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <path d="M20.5 7.5 12 3 3.5 7.5 12 12l8.5-4.5Z" />
    <path d="M3.5 7.5v9L12 21l8.5-4.5v-9" />
    <path d="M12 12v9" />
  </svg>
);
const iconTag = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <path d="M20.6 12.6 12 21.2 2.8 12 12 2.8H21v9.8Z" />
    <circle cx="17" cy="7" r="1.5" />
  </svg>
);
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

function ProdukForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    kategori: "cup",
    volume: "",
    deskripsi: "",
    komposisi: "",
    isiPerDus: "",
    harga: "",
    unggulan: false,
    status: "aktif",
  });
  const [gambar, setGambar] = useState(null);
  const [gambarLama, setGambarLama] = useState("");
  const [loading, setLoading] = useState(false);
  const [memuat, setMemuat] = useState(isEdit);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      getProdukById(id)
        .then((res) => {
          setForm({
            nama: res.data.nama || "",
            kategori: res.data.kategori || "cup",
            volume: res.data.volume || "",
            deskripsi: res.data.deskripsi || "",
            komposisi: res.data.komposisi || "",
            isiPerDus: res.data.isiPerDus || "",
            harga: res.data.harga || "",
            unggulan: res.data.unggulan || false,
            status: res.data.status || "aktif",
          });
          setGambarLama(res.data.gambar || "");
        })
        .catch(() => setError("Gagal memuat data produk"))
        .finally(() => setMemuat(false));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value),
      );
      if (gambar) formData.append("gambar", gambar);

      if (isEdit) {
        await updateProduk(id, formData);
      } else {
        await createProduk(formData);
      }

      navigate("/produk", {
        state: {
          toast: isEdit
            ? "Produk berhasil diperbarui"
            : "Produk berhasil ditambahkan",
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menyimpan produk");
    } finally {
      setLoading(false);
    }
  };

  if (memuat) {
    return <p className="text-gray-400">Memuat data produk...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-secondary">
          {isEdit ? "Edit Produk" : "Tambah Produk"}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Kelola informasi produk yang tampil di katalog website.
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 shadow-[inset_2px_2px_5px_rgba(239,68,68,0.06)]">
          {error}
        </div>
      )}

      <div className="space-y-5">
        <FormSection
          icon={iconInfo}
          title="Informasi Produk"
          subtitle="Nama, kategori, dan detail dasar produk"
        >
          <div>
            <label className={clayLabel}>Nama Produk</label>
            <input
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Contoh: Air Mineral Cup 220ml"
              required
              className={clayInput}
            />
          </div>
          <div>
            <label className={clayLabel}>Kategori</label>
            <select
              name="kategori"
              value={form.kategori}
              onChange={handleChange}
              className={clayInput}
            >
              <option value="cup">Cup</option>
              <option value="botol">Botol</option>
              <option value="galon">Galon</option>
            </select>
          </div>
          <div>
            <label className={clayLabel}>Volume</label>
            <input
              name="volume"
              value={form.volume}
              onChange={handleChange}
              placeholder="Contoh: 200ml"
              required
              className={clayInput}
            />
          </div>
          <div>
            <label className={clayLabel}>Isi per Dus</label>
            <input
              name="isiPerDus"
              type="number"
              value={form.isiPerDus}
              onChange={handleChange}
              placeholder="Contoh: 48"
              className={clayInput}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={clayLabel}>Deskripsi</label>
            <textarea
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              placeholder="Deskripsi singkat produk"
              required
              rows={3}
              className={clayInput}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={clayLabel}>Komposisi / Kandungan</label>
            <input
              name="komposisi"
              value={form.komposisi}
              onChange={handleChange}
              placeholder="Komposisi / Kandungan"
              className={clayInput}
            />
          </div>
        </FormSection>

        <FormSection
          icon={iconTag}
          title="Harga & Visibilitas"
          subtitle="Harga jual dan status tampil produk"
        >
          <div>
            <label className={clayLabel}>Harga</label>
            <input
              name="harga"
              type="number"
              value={form.harga}
              onChange={handleChange}
              placeholder="Contoh: 25000"
              className={clayInput}
            />
          </div>
          <div>
            <label className={clayLabel}>Status Produk</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className={clayInput}
            >
              <option value="aktif">Aktif (tampil di website)</option>
              <option value="nonaktif">Nonaktif (disembunyikan)</option>
            </select>
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2.5 rounded-2xl border border-white bg-[#eef5fd] px-4 py-2.5 text-sm text-gray-700 shadow-[inset_2px_2px_5px_rgba(96,130,196,0.12),inset_-2px_-2px_5px_rgba(255,255,255,0.9)]">
              <input
                type="checkbox"
                name="unggulan"
                checked={form.unggulan}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-400"
              />
              Tampilkan sebagai Produk Unggulan
            </label>
          </div>
        </FormSection>

        <FormSection
          icon={iconImage}
          title="Gambar Produk"
          subtitle="Foto tampilan produk untuk katalog"
          columns={1}
        >
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setGambar(e.target.files[0])}
              className="block w-full rounded-2xl border-2 border-dashed border-blue-200 bg-[#eef5fd]/60 px-4 py-6 text-sm text-gray-500 file:mr-4 file:rounded-xl file:border-0 file:bg-gradient-to-br file:from-blue-500 file:to-cyan-500 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white file:shadow-[3px_3px_8px_rgba(37,99,235,0.35)]"
            />
            {isEdit && gambarLama && !gambar && (
              <p className="mt-2 text-xs text-gray-400">
                Gambar saat ini akan tetap dipakai kalau tidak diganti.
              </p>
            )}
          </div>
        </FormSection>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className={`${clayButtonPrimary} px-5 py-2.5 text-sm font-semibold`}
        >
          {iconCheck}
          {loading ? "Menyimpan..." : "Simpan Produk"}
        </button>
      </div>
    </form>
  );
}

export default ProdukForm;
