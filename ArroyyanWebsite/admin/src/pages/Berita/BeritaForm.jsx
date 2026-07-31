import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createBerita,
  updateBerita,
  getBeritaById,
} from "../../services/beritaService.js";

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
      navigate("/berita");
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menyimpan berita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-secondary">
        {isEdit ? "Edit Berita" : "Tambah Berita"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-4 rounded-xl bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-1 block text-sm font-medium">Judul</label>
          <input
            name="judul"
            value={form.judul}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Slug (URL){" "}
            <span className="text-xs text-gray-400">
              — otomatis dari judul, bisa diedit
            </span>
          </label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleSlugChange}
            required
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Kategori</label>
          <select
            name="kategori"
            value={form.kategori}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-2"
          >
            <option value="kegiatan">Kegiatan</option>
            <option value="penghargaan">Penghargaan</option>
            <option value="promo">Promo</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Ringkasan (tampil di list berita)
          </label>
          <textarea
            name="ringkasan"
            value={form.ringkasan}
            onChange={handleChange}
            required
            rows={2}
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Konten Lengkap
          </label>
          <textarea
            name="konten"
            value={form.konten}
            onChange={handleChange}
            required
            rows={8}
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Penulis</label>
          <input
            name="penulis"
            value={form.penulis}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Gambar Sampul
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setGambar(e.target.files[0])}
            className="w-full"
          />
          {isEdit && form.gambar && !gambar && (
            <p className="mt-1 text-xs text-gray-400">
              Gambar saat ini akan tetap dipakai kalau tidak diganti.
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-2"
          >
            <option value="draft">Draft (belum tampil di website)</option>
            <option value="publish">Publish (tampil di website)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:bg-sky-700 disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}

export default BeritaForm;
