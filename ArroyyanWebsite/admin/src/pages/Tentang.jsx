import { useEffect, useState } from "react";
import { getTentang, updateTentang } from "../services/tentangService.js";
import FormSection from "../components/common/FormSection.jsx";
import { clayInput, clayLabel, clayButtonPrimary } from "../styles/ui.js";

const API_BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

const iconBook = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
  </svg>
);
const iconTarget = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" />
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

function Tentang() {
  const [form, setForm] = useState({
    sejarah: "",
    lokasi: "",
    visi: "",
    misi: "",
  });
  const [fotoLama, setFotoLama] = useState("");
  const [foto, setFoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sukses, setSukses] = useState(false);

  useEffect(() => {
    getTentang()
      .then((res) => {
        setForm(res.data);
        setFotoLama(res.data.foto || "");
      })
      .catch(() => {});
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSukses(false);
    try {
      const formData = new FormData();
      formData.append("sejarah", form.sejarah);
      formData.append("lokasi", form.lokasi);
      formData.append("visi", form.visi);
      formData.append("misi", form.misi);
      if (foto) formData.append("foto", foto);

      const res = await updateTentang(formData);
      setFotoLama(res.data.foto || "");
      setFoto(null);
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
            Kelola Halaman Tentang
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Konten ini tampil di halaman "Tentang Arroyyan" pada website publik.
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
          icon={iconBook}
          title="Profil Perusahaan"
          subtitle="Sejarah dan lokasi Arroyyan99"
        >
          <div className="sm:col-span-2">
            <label className={clayLabel}>Sejarah Berdirinya Arroyyan99</label>
            <textarea
              name="sejarah"
              value={form.sejarah}
              onChange={handleChange}
              rows={5}
              placeholder="Ceritakan bagaimana Arroyyan99 berdiri, sejak kapan, dan latar belakangnya"
              className={clayInput}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={clayLabel}>Lokasi</label>
            <textarea
              name="lokasi"
              value={form.lokasi}
              onChange={handleChange}
              rows={2}
              placeholder="Alamat pabrik/kantor pusat Arroyyan99"
              className={clayInput}
            />
          </div>
        </FormSection>

        <FormSection
          icon={iconTarget}
          title="Visi & Misi"
          subtitle="Arah dan tujuan perusahaan"
        >
          <div>
            <label className={clayLabel}>Visi</label>
            <textarea
              name="visi"
              value={form.visi}
              onChange={handleChange}
              rows={4}
              className={clayInput}
            />
          </div>
          <div>
            <label className={clayLabel}>Misi</label>
            <textarea
              name="misi"
              value={form.misi}
              onChange={handleChange}
              rows={4}
              placeholder="Bisa ditulis per poin, misal: 1. ... 2. ... 3. ..."
              className={clayInput}
            />
          </div>
        </FormSection>

        <FormSection
          icon={iconImage}
          title="Foto Pabrik/Kantor"
          subtitle="Opsional, tampil di halaman Tentang"
          columns={1}
        >
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFoto(e.target.files[0])}
              className="block w-full rounded-2xl border-2 border-dashed border-blue-200 bg-[#eef5fd]/60 px-4 py-6 text-sm text-gray-500 file:mr-4 file:rounded-xl file:border-0 file:bg-gradient-to-br file:from-blue-500 file:to-cyan-500 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
            />
            {fotoLama && !foto && (
              <img
                src={`${API_BASE_URL}${fotoLama}`}
                alt="Foto Tentang"
                className="mt-3 h-32 rounded-2xl object-cover shadow-[6px_6px_14px_rgba(96,130,196,0.2)]"
              />
            )}
          </div>
        </FormSection>
      </div>
    </form>
  );
}

export default Tentang;
