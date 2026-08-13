import { useState } from "react";
import { registerAdmin } from "../services/authService.js";
import FormSection from "../components/common/FormSection.jsx";
import { clayInput, clayLabel, clayButtonPrimary } from "../styles/ui.js";

const iconUserPlus = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <circle cx="9" cy="8" r="4" />
    <path d="M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1" />
    <path d="M19 8v6M22 11h-6" />
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
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-secondary">
            Tambah Akun Admin
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Akun baru bisa langsung login dengan email dan password ini.
          </p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`${clayButtonPrimary} px-5 py-2.5 text-sm font-semibold`}
        >
          {iconCheck}
          {loading ? "Membuat akun..." : "Buat Akun Admin"}
        </button>
      </div>

      {error && (
        <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 shadow-[inset_2px_2px_5px_rgba(239,68,68,0.06)]">
          {error}
        </div>
      )}
      {sukses && (
        <div className="mb-5 rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700 shadow-[inset_2px_2px_5px_rgba(34,197,94,0.06)]">
          Akun admin baru berhasil dibuat.
        </div>
      )}

      <FormSection
        icon={iconUserPlus}
        title="Detail Akun"
        subtitle="Data login untuk admin baru"
      >
        <div className="sm:col-span-2">
          <label className={clayLabel}>Nama</label>
          <input
            name="nama"
            value={form.nama}
            onChange={handleChange}
            required
            className={clayInput}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={clayLabel}>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className={clayInput}
          />
        </div>
        <div>
          <label className={clayLabel}>Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={8}
            className={clayInput}
          />
          <p className="mt-1.5 text-xs text-gray-400">Minimal 8 karakter</p>
        </div>
        <div>
          <label className={clayLabel}>Konfirmasi Password</label>
          <input
            name="konfirmasiPassword"
            type="password"
            value={form.konfirmasiPassword}
            onChange={handleChange}
            required
            className={clayInput}
          />
        </div>
      </FormSection>
    </form>
  );
}

export default TambahAdmin;
