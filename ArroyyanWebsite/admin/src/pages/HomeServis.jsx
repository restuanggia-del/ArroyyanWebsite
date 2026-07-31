import { useEffect, useState } from "react";
import {
  getHomeServis,
  updateHomeServis,
} from "../services/homeServisService.js";

function HomeServis() {
  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
    areaCakupan: "",
    alurPemesanan: "",
    minimalOrder: "",
  });
  const [loading, setLoading] = useState(false);
  const [sukses, setSukses] = useState(false);

  useEffect(() => {
    getHomeServis()
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
      await updateHomeServis(form);
      setSukses(true);
      setTimeout(() => setSukses(false), 3000);
    } catch {
      alert("Gagal menyimpan perubahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-secondary">
        Kelola Home Servis (Distribusi)
      </h1>
      <p className="mb-6 text-sm text-gray-500">
        Konten ini akan tampil di halaman "Home Servis" pada website publik.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-4 rounded-xl bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-1 block text-sm font-medium">
            Judul Halaman
          </label>
          <input
            name="judul"
            value={form.judul}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Deskripsi Layanan
          </label>
          <textarea
            name="deskripsi"
            value={form.deskripsi}
            onChange={handleChange}
            rows={4}
            placeholder="Jelaskan layanan distribusi Arroyyan99 secara umum"
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Area Cakupan Distribusi
          </label>
          <textarea
            name="areaCakupan"
            value={form.areaCakupan}
            onChange={handleChange}
            rows={2}
            placeholder="Contoh: Terbanggi Besar, Bandar Jaya, Kota Gajah, dst (pisahkan dengan koma)"
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Alur Pemesanan
          </label>
          <textarea
            name="alurPemesanan"
            value={form.alurPemesanan}
            onChange={handleChange}
            rows={3}
            placeholder="Contoh: 1. Hubungi kami via WhatsApp 2. Konfirmasi jumlah pesanan 3. Pengiriman dijadwalkan"
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Minimal Order
          </label>
          <input
            name="minimalOrder"
            value={form.minimalOrder}
            onChange={handleChange}
            placeholder="Contoh: Minimal 1 dus / 1 galon"
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

export default HomeServis;
