import { useEffect, useState } from "react";
import {
  getPengaturan,
  updatePengaturan,
} from "../services/pengaturanService.js";
import FormSection from "../components/common/FormSection.jsx";
import { clayInput, clayLabel, clayButtonPrimary } from "../styles/ui.js";

const iconContact = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8.1 9.7a16 16 0 0 0 6.2 6.2l1.2-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z" />
  </svg>
);
const iconShare = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="m8.6 10.6 6.8-3.8M8.6 13.4l6.8 3.8" />
  </svg>
);
const iconMapPin = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const iconChart = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <path d="M3 3v18h18" />
    <path d="M18 17V9M13 17V5M8 17v-4" />
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

function Pengaturan() {
  const [form, setForm] = useState({
    alamat: "",
    telepon: "",
    email: "",
    instagram: "",
    facebook: "",
    whatsapp: "",
    mapsEmbedUrl: "",
    tahunBerdiri: "",
    jumlahDistributor: "",
    literProduksiPerBulan: "",
    jumlahPelangganPuas: "",
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
    <form onSubmit={handleSubmit}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Pengaturan Umum</h1>
          <p className="mt-1 text-sm text-gray-500">
            Data ini dipakai di Footer dan halaman Kontak pada website publik.
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
          icon={iconContact}
          title="Kontak"
          subtitle="Alamat, telepon, email, dan WhatsApp"
        >
          <div className="sm:col-span-2">
            <label className={clayLabel}>Alamat</label>
            <textarea
              name="alamat"
              value={form.alamat}
              onChange={handleChange}
              rows={2}
              className={clayInput}
            />
          </div>
          <div>
            <label className={clayLabel}>Telepon</label>
            <input
              name="telepon"
              value={form.telepon}
              onChange={handleChange}
              className={clayInput}
            />
          </div>
          <div>
            <label className={clayLabel}>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className={clayInput}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={clayLabel}>
              Nomor WhatsApp{" "}
              <span className="text-xs font-normal text-gray-400">
                (untuk tombol floating WA)
              </span>
            </label>
            <input
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              placeholder="62812xxxxxxx (tanpa spasi/strip)"
              className={clayInput}
            />
          </div>
        </FormSection>

        <FormSection
          icon={iconShare}
          title="Media Sosial"
          subtitle="Tautan Instagram dan Facebook"
        >
          <div>
            <label className={clayLabel}>Instagram</label>
            <input
              name="instagram"
              value={form.instagram}
              onChange={handleChange}
              placeholder="https://instagram.com/arroyyan99"
              className={clayInput}
            />
          </div>
          <div>
            <label className={clayLabel}>Facebook</label>
            <input
              name="facebook"
              value={form.facebook}
              onChange={handleChange}
              placeholder="https://facebook.com/arroyyan99"
              className={clayInput}
            />
          </div>
        </FormSection>

        <FormSection
          icon={iconMapPin}
          title="Peta Lokasi"
          subtitle="Embed Google Maps untuk halaman Kontak"
          columns={1}
        >
          <div>
            <label className={clayLabel}>
              Link Embed Google Maps{" "}
              <span className="text-xs font-normal text-gray-400">
                (dari Bagikan &gt; Sematkan peta, ambil isi src="...")
              </span>
            </label>
            <input
              name="mapsEmbedUrl"
              value={form.mapsEmbedUrl}
              onChange={handleChange}
              placeholder="https://www.google.com/maps/embed?pb=..."
              className={clayInput}
            />
          </div>
        </FormSection>

        <FormSection
          icon={iconChart}
          title="Statistik Pencapaian"
          subtitle="Angka yang tampil di halaman Beranda"
        >
          <div>
            <label className={clayLabel}>Tahun Berdiri</label>
            <input
              name="tahunBerdiri"
              type="number"
              value={form.tahunBerdiri ?? ""}
              onChange={handleChange}
              placeholder="Contoh: 2015"
              className={clayInput}
            />
          </div>
          <div>
            <label className={clayLabel}>Jumlah Distributor</label>
            <input
              name="jumlahDistributor"
              value={form.jumlahDistributor}
              onChange={handleChange}
              placeholder="Contoh: 50+"
              className={clayInput}
            />
          </div>
          <div>
            <label className={clayLabel}>Produksi per Bulan</label>
            <input
              name="literProduksiPerBulan"
              value={form.literProduksiPerBulan}
              onChange={handleChange}
              placeholder="Contoh: 100.000 Liter"
              className={clayInput}
            />
          </div>
          <div>
            <label className={clayLabel}>Pelanggan Puas</label>
            <input
              name="jumlahPelangganPuas"
              value={form.jumlahPelangganPuas}
              onChange={handleChange}
              placeholder="Contoh: 5.000+"
              className={clayInput}
            />
          </div>
        </FormSection>
      </div>
    </form>
  );
}

export default Pengaturan;
