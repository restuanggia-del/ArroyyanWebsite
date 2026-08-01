import { useEffect, useState } from "react";
import {
  getPengaturan,
  updatePengaturan,
} from "../services/pengaturanService.js";

function Pengaturan() {
  const [form, setForm] = useState({
    alamat: "",
    telepon: "",
    email: "",
    instagram: "",
    facebook: "",
    whatsapp: "",
    mapsEmbedUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [sukses, setSukses] = useState(false);

  useEffect(() => {
    getPengaturan()
      .then((res) => setForm(res.data))
      .catch(() => {});
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSukses(false);
    try {
      await updatePengaturan(form);
      setSukses(true);
      setTimeout(() => setSukses(false), 3000);
    } catch (err) {
      console.error("Gagal update pengaturan:", err);
      const pesan =
        err.response?.data?.message ||
        err.message ||
        "Gagal menyimpan perubahan";
      alert(`Gagal menyimpan perubahan: ${pesan}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-secondary">
        Pengaturan Umum
      </h1>
      <p className="mb-6 text-sm text-gray-500">
        Data ini dipakai di Footer dan halaman Kontak pada website publik.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-4 rounded-xl bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-1 block text-sm font-medium">Alamat</label>
          <textarea
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            rows={2}
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Telepon</label>
            <input
              name="telepon"
              value={form.telepon}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Nomor WhatsApp (untuk tombol floating WA)
          </label>
          <input
            name="whatsapp"
            value={form.whatsapp}
            onChange={handleChange}
            placeholder="62812xxxxxxx (tanpa spasi/strip)"
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Instagram</label>
            <input
              name="instagram"
              value={form.instagram}
              onChange={handleChange}
              placeholder="https://instagram.com/arroyyan99"
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Facebook</label>
            <input
              name="facebook"
              value={form.facebook}
              onChange={handleChange}
              placeholder="https://facebook.com/arroyyan99"
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Link Embed Google Maps{" "}
            <span className="text-xs text-gray-400">
              (dari Bagikan &gt; Sematkan peta, ambil isi src="...")
            </span>
          </label>
          <input
            name="mapsEmbedUrl"
            value={form.mapsEmbedUrl}
            onChange={handleChange}
            placeholder="https://www.google.com/maps/embed?pb=..."
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>

        {sukses && (
          <p className="text-sm text-green-600">Perubahan berhasil disimpan.</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:bg-sky-700 disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
}

export default Pengaturan;
