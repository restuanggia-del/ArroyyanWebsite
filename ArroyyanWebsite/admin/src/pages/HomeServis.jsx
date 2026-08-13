import { useEffect, useState } from "react";
import {
  getHomeServis,
  updateHomeServis,
} from "../services/homeServisService.js";
import FormSection from "../components/common/FormSection.jsx";
import { clayInput, clayLabel, clayButtonPrimary } from "../styles/ui.js";

const iconTruck = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <rect x="1" y="7" width="14" height="10" rx="1" />
    <path d="M15 10h4l3 3v4h-7z" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </svg>
);
const iconMap = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <path d="m1 6 7-3 8 3 7-3v15l-7 3-8-3-7 3Z" />
    <path d="M8 3v15M16 6v15" />
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
    <form onSubmit={handleSubmit}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-secondary">
            Kelola Home Servis (Distribusi)
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Konten ini tampil di halaman "Home Servis" pada website publik.
          </p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`${clayButtonPrimary} px-5 py-2.5 text-sm font-semibold`}
        >
          {iconCheck}
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>

      {sukses && (
        <div className="mb-5 rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700 shadow-[inset_2px_2px_5px_rgba(34,197,94,0.06)]">
          Perubahan berhasil disimpan.
        </div>
      )}

      <div className="space-y-5">
        <FormSection
          icon={iconTruck}
          title="Layanan Distribusi"
          subtitle="Judul dan deskripsi layanan Home Servis"
        >
          <div>
            <label className={clayLabel}>Judul Halaman</label>
            <input
              name="judul"
              value={form.judul}
              onChange={handleChange}
              className={clayInput}
            />
          </div>
          <div>
            <label className={clayLabel}>Minimal Order</label>
            <input
              name="minimalOrder"
              value={form.minimalOrder}
              onChange={handleChange}
              placeholder="Contoh: Minimal 1 dus / 1 galon"
              className={clayInput}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={clayLabel}>Deskripsi Layanan</label>
            <textarea
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              rows={4}
              placeholder="Jelaskan layanan distribusi Arroyyan99 secara umum"
              className={clayInput}
            />
          </div>
        </FormSection>

        <FormSection
          icon={iconMap}
          title="Area & Alur Pemesanan"
          subtitle="Cakupan wilayah dan cara memesan"
        >
          <div className="sm:col-span-2">
            <label className={clayLabel}>Area Cakupan Distribusi</label>
            <textarea
              name="areaCakupan"
              value={form.areaCakupan}
              onChange={handleChange}
              rows={2}
              placeholder="Contoh: Bogatama, Penawar Tama, Penawar Aji, Rawapitu, dst (pisahkan dengan koma)"
              className={clayInput}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={clayLabel}>Alur Pemesanan</label>
            <textarea
              name="alurPemesanan"
              value={form.alurPemesanan}
              onChange={handleChange}
              rows={3}
              placeholder="Contoh: 1. Hubungi kami via WhatsApp 2. Konfirmasi jumlah pesanan 3. Pengiriman dijadwalkan"
              className={clayInput}
            />
          </div>
        </FormSection>
      </div>
    </form>
  );
}

export default HomeServis;
