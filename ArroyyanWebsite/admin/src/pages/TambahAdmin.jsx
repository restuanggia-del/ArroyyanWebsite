import { useState } from "react";
import { registerAdmin } from "../services/authService.js";

function TambahAdmin() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    konfirmasiPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sukses, setSukses] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSukses(false);

    if (form.password !== form.konfirmasiPassword) {
      setError("Konfirmasi password tidak cocok");
      return;
    }
    if (form.password.length < 8) {
      setError("Password minimal 8 karakter");
      return;
    }

    setLoading(true);
    try {
      await registerAdmin({
        nama: form.nama,
        email: form.email,
        password: form.password,
      });
      setSukses(true);
      setForm({ nama: "", email: "", password: "", konfirmasiPassword: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Gagal membuat akun admin baru");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-secondary">
        Tambah Akun Admin
      </h1>
      <p className="mb-6 text-sm text-gray-500">
        Akun baru akan langsung bisa login ke Admin Panel ini dengan email dan
        password yang Anda buat di sini.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-md space-y-4 rounded-xl bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-1 block text-sm font-medium">Nama</label>
          <input
            name="nama"
            value={form.nama}
            onChange={handleChange}
            required
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
            required
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={8}
            className="w-full rounded-lg border px-4 py-2"
          />
          <p className="mt-1 text-xs text-gray-400">Minimal 8 karakter</p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Konfirmasi Password
          </label>
          <input
            name="konfirmasiPassword"
            type="password"
            value={form.konfirmasiPassword}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {sukses && (
          <p className="text-sm text-green-600">
            Akun admin baru berhasil dibuat.
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:bg-sky-700 disabled:opacity-50"
        >
          {loading ? "Membuat akun..." : "Buat Akun Admin"}
        </button>
      </form>
    </div>
  );
}

export default TambahAdmin;
