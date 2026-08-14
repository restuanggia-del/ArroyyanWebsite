import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createBerita,
  updateBerita,
  getBeritaById,
} from "../../services/beritaService.js";
import FormSection from "../../components/common/FormSection.jsx";
import {
  clayInput,
  clayLabel,
  clayButtonPrimary,
  clayCardSm,
} from "../../styles/ui.js";

const iconDoc = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M7 8h10M7 12h10M7 16h6" />
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
const iconGlobe = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
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

function buatSlug(teks) {
  return teks
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function BeritaForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    judul: "",
    slug: "",
    kategori: "kegiatan",
    ringkasan: "",
    konten: "",
    penulis: "Admin Arroyyan",
    status: "draft",
  });
  const [gambar, setGambar] = useState(null);
  const [slugDiedit, setSlugDiedit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      getBeritaById(id)
        .then((res) => setForm(res.data))
        .catch(() => {});
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "judul" && !slugDiedit ? { slug: buatSlug(value) } : {}),
    }));
  };

  const handleSlugChange = (e) => {
    setSlugDiedit(true);
    setForm((prev) => ({ ...prev, slug: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (
          key !== "_id" &&
          key !== "createdAt" &&
          key !== "updatedAt" &&
          key !== "__v"
        ) {
          formData.append(key, value);
        }
      });
      if (gambar) formData.append("gambar", gambar);

      if (isEdit) {
        await updateBerita(id, formData);
      } else {
        await createBerita(formData);
      }
      navigate("/berita", {
        state: {
          toast: isEdit
            ? "Berita berhasil diperbarui"
            : "Berita berhasil ditambahkan",
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menyimpan berita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-secondary">
          {isEdit ? "Edit Berita" : "Tambah Berita"}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Tulis kegiatan, penghargaan, atau promo terbaru Arroyyan99.
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 shadow-[inset_2px_2px_5px_rgba(239,68,68,0.06)]">
          {error}
        </div>
      )}

      <div className="space-y-5">
        <FormSection
          icon={iconDoc}
          title="Konten Berita"
          subtitle="Judul, ringkasan, dan isi lengkap berita"
        >
          <div className="sm:col-span-2">
            <label className={clayLabel}>Judul</label>
            <input
              name="judul"
              value={form.judul}
              onChange={handleChange}
              required
              className={clayInput}
            />
          </div>
          <div>
            <label className={clayLabel}>
              Slug (URL){" "}
              <span className="text-xs font-normal text-gray-400">
                — otomatis dari judul
              </span>
            </label>
            <input
              name="slug"
              value={form.slug}
              onChange={handleSlugChange}
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
              <option value="kegiatan">Kegiatan</option>
              <option value="penghargaan">Penghargaan</option>
              <option value="promo">Promo</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={clayLabel}>
              Ringkasan{" "}
              <span className="text-xs font-normal text-gray-400">
                (tampil di list berita)
              </span>
            </label>
            <textarea
              name="ringkasan"
              value={form.ringkasan}
              onChange={handleChange}
              required
              rows={2}
              className={clayInput}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={clayLabel}>Konten Lengkap</label>
            <textarea
              name="konten"
              value={form.konten}
              onChange={handleChange}
              required
              rows={8}
              className={clayInput}
            />
          </div>
          <div>
            <label className={clayLabel}>Penulis</label>
            <input
              name="penulis"
              value={form.penulis}
              onChange={handleChange}
              className={clayInput}
            />
          </div>
        </FormSection>

        <FormSection
          icon={iconImage}
          title="Gambar Sampul"
          subtitle="Foto utama yang tampil di daftar berita"
          columns={1}
        >
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setGambar(e.target.files[0])}
              className="block w-full rounded-2xl border-2 border-dashed border-blue-200 bg-[#eef5fd]/60 px-4 py-6 text-sm text-gray-500 file:mr-4 file:rounded-xl file:border-0 file:bg-gradient-to-br file:from-blue-500 file:to-cyan-500 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white file:shadow-[3px_3px_8px_rgba(37,99,235,0.35)]"
            />
            {isEdit && form.gambar && !gambar && (
              <p className="mt-2 text-xs text-gray-400">
                Gambar saat ini akan tetap dipakai kalau tidak diganti.
              </p>
            )}
          </div>
        </FormSection>

        <FormSection
          icon={iconGlobe}
          title="Publikasi"
          subtitle="Atur status tampil berita di website"
          columns={1}
        >
          <div className="max-w-xs">
            <label className={clayLabel}>Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className={clayInput}
            >
              <option value="draft">Draft (belum tampil di website)</option>
              <option value="publish">Publish (tampil di website)</option>
            </select>
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
          {loading ? "Menyimpan..." : "Simpan Berita"}
        </button>
      </div>
    </form>
  );
}

export default BeritaForm;
