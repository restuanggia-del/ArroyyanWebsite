import { useEffect, useState } from "react";
import { kirimPesanKontak } from "../services/kontakService.js";
import { getPengaturan } from "../services/pengaturanService.js";
import MapEmbed from "../components/common/MapEmbed.jsx";

function Kontak() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    telepon: "",
    pesan: "",
  });
  const [status, setStatus] = useState(null);
  const [pengaturan, setPengaturan] = useState(null);

  useEffect(() => {
    getPengaturan()
      .then((res) => setPengaturan(res.data))
      .catch(() => {});
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await kirimPesanKontak(form);
      setStatus("Pesan berhasil dikirim, terima kasih!");
      setForm({ nama: "", email: "", telepon: "", pesan: "" });
    } catch {
      setStatus("Gagal mengirim pesan, silakan coba lagi.");
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold text-secondary">Kontak Kami</h1>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <p className="mb-2 text-gray-600">
            Alamat: {pengaturan?.alamat || "-"}
          </p>
          <p className="mb-2 text-gray-600">
            Telepon: {pengaturan?.telepon || "-"}
          </p>
          <p className="mb-2 text-gray-600">
            Email: {pengaturan?.email || "-"}
          </p>
          <div className="mt-6">
            {pengaturan?.mapsEmbedUrl ? (
              <MapEmbed src={pengaturan.mapsEmbedUrl} height="18rem" />
            ) : (
              <div className="flex h-72 items-center justify-center rounded-xl bg-gray-100 text-sm text-gray-400">
                Peta belum diatur di Admin Panel &gt; Pengaturan
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="nama"
            value={form.nama}
            onChange={handleChange}
            placeholder="Nama"
            required
            className="w-full rounded-lg border px-4 py-2"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full rounded-lg border px-4 py-2"
          />
          <input
            name="telepon"
            value={form.telepon}
            onChange={handleChange}
            placeholder="Telepon"
            className="w-full rounded-lg border px-4 py-2"
          />
          <textarea
            name="pesan"
            value={form.pesan}
            onChange={handleChange}
            placeholder="Pesan"
            required
            rows={4}
            className="w-full rounded-lg border px-4 py-2"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:bg-sky-700"
          >
            Kirim Pesan
          </button>
          {status && <p className="text-sm text-gray-600">{status}</p>}
        </form>
      </div>
    </div>
  );
}

export default Kontak;
