import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduk,
  updateProduk,
  getProdukById,
} from "../../services/produkService.js";

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
    <div>
      <h1 className="mb-6 text-2xl font-bold text-secondary">
        {isEdit ? "Edit Produk" : "Tambah Produk"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl space-y-4 rounded-xl bg-white p-6 shadow-sm"
      >
        <input
          name="nama"
          value={form.nama}
          onChange={handleChange}
          placeholder="Nama Produk"
          required
          className="w-full rounded-lg border px-4 py-2"
        />

        <select
          name="kategori"
          value={form.kategori}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-2"
        >
          <option value="cup">Cup</option>
          <option value="botol">Botol</option>
          <option value="galon">Galon</option>
        </select>

        <input
          name="volume"
          value={form.volume}
          onChange={handleChange}
          placeholder="Volume (contoh: 200ml)"
          required
          className="w-full rounded-lg border px-4 py-2"
        />
        <textarea
          name="deskripsi"
          value={form.deskripsi}
          onChange={handleChange}
          placeholder="Deskripsi"
          required
          rows={3}
          className="w-full rounded-lg border px-4 py-2"
        />
        <input
          name="komposisi"
          value={form.komposisi}
          onChange={handleChange}
          placeholder="Komposisi / Kandungan"
          className="w-full rounded-lg border px-4 py-2"
        />
        <input
          name="isiPerDus"
          type="number"
          value={form.isiPerDus}
          onChange={handleChange}
          placeholder="Isi per dus"
          className="w-full rounded-lg border px-4 py-2"
        />
        <input
          name="harga"
          type="number"
          value={form.harga}
          onChange={handleChange}
          placeholder="Harga"
          className="w-full rounded-lg border px-4 py-2"
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="unggulan"
            checked={form.unggulan}
            onChange={handleChange}
          />
          Tampilkan sebagai Produk Unggulan di Beranda
        </label>

        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setGambar(e.target.files[0])}
            className="w-full"
          />
          {isEdit && gambarLama && !gambar && (
            <p className="mt-1 text-xs text-gray-400">
              Gambar saat ini akan tetap dipakai kalau tidak diganti.
            </p>
          )}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

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

export default ProdukForm;
