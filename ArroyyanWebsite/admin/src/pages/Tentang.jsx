import { useEffect, useState } from "react";
import { getTentang, updateTentang } from "../services/tentangService.js";

const API_BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

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
    <div>
      <h1 className="mb-6 text-2xl font-bold text-secondary">
        Kelola Halaman Tentang
      </h1>
      <p className="mb-6 text-sm text-gray-500">
        Konten ini akan tampil di halaman "Tentang Arroyyan" pada website
        publik.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-4 rounded-xl bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-1 block text-sm font-medium">
            Sejarah Berdirinya Arroyyan99
          </label>
          <textarea
            name="sejarah"
            value={form.sejarah}
            onChange={handleChange}
            rows={5}
            placeholder="Ceritakan bagaimana Arroyyan99 berdiri, sejak kapan, dan latar belakangnya"
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Lokasi</label>
          <textarea
            name="lokasi"
            value={form.lokasi}
            onChange={handleChange}
            rows={2}
            placeholder="Alamat pabrik/kantor pusat Arroyyan99"
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Visi</label>
          <textarea
            name="visi"
            value={form.visi}
            onChange={handleChange}
            rows={2}
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Misi</label>
          <textarea
            name="misi"
            value={form.misi}
            onChange={handleChange}
            rows={4}
            placeholder="Bisa ditulis per poin, misal: 1. ... 2. ... 3. ..."
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Foto Pabrik/Kantor (opsional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFoto(e.target.files[0])}
            className="w-full"
          />
          {fotoLama && !foto && (
            <img
              src={`${API_BASE_URL}${fotoLama}`}
              alt="Foto Tentang"
              className="mt-3 h-32 rounded-lg object-cover"
            />
          )}
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

export default Tentang;
