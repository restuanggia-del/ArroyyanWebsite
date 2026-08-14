import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { updateProfil, gantiPassword } from "../services/authService.js";
import FormSection from "../components/common/FormSection.jsx";
import { clayInput, clayLabel, clayButtonPrimary } from "../styles/ui.js";

const iconUser = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
  </svg>
);
const iconLock = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <rect x="4" y="10" width="16" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
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

function AkunSaya() {
  const { admin, updateAdmin } = useAuth();

  const [nama, setNama] = useState(admin?.nama || "");
  const [loadingProfil, setLoadingProfil] = useState(false);
  const [pesanProfil, setPesanProfil] = useState(null);

  const [sandi, setSandi] = useState({
    sandiLama: "",
    sandiBaru: "",
    konfirmasiSandiBaru: "",
  });
  const [loadingSandi, setLoadingSandi] = useState(false);
  const [pesanSandi, setPesanSandi] = useState(null);

  const handleSimpanProfil = async (e) => {
    e.preventDefault();
    setPesanProfil(null);
    setLoadingProfil(true);
    try {
      const res = await updateProfil({ nama });
      updateAdmin({ nama: res.data?.nama ?? nama });
      setPesanProfil({ tipe: "sukses", teks: "Nama berhasil diperbarui." });
    } catch (err) {
      setPesanProfil({
        tipe: "error",
        teks:
          err.response?.data?.message ||
          "Gagal memperbarui nama. Pastikan endpoint PUT /auth/profil sudah tersedia di backend.",
      });
    } finally {
      setLoadingProfil(false);
    }
  };

  const handleGantiSandi = async (e) => {
    e.preventDefault();
    setPesanSandi(null);

    if (sandi.sandiBaru !== sandi.konfirmasiSandiBaru) {
      setPesanSandi({
        tipe: "error",
        teks: "Konfirmasi password baru tidak cocok.",
      });
      return;
    }
    if (sandi.sandiBaru.length < 8) {
      setPesanSandi({
        tipe: "error",
        teks: "Password baru minimal 8 karakter.",
      });
      return;
    }

    setLoadingSandi(true);
    try {
      await gantiPassword({
        sandiLama: sandi.sandiLama,
        sandiBaru: sandi.sandiBaru,
      });
      setSandi({ sandiLama: "", sandiBaru: "", konfirmasiSandiBaru: "" });
      setPesanSandi({ tipe: "sukses", teks: "Password berhasil diganti." });
    } catch (err) {
      setPesanSandi({
        tipe: "error",
        teks:
          err.response?.data?.message ||
          "Gagal mengganti password. Pastikan endpoint PUT /auth/ganti-password sudah tersedia di backend.",
      });
    } finally {
      setLoadingSandi(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-secondary">Pengaturan Akun</h1>
        <p className="mt-1 text-sm text-gray-500">
          Kelola nama tampilan dan keamanan akun admin Anda.
        </p>
      </div>

      <div className="max-w-2xl space-y-5">
        <form onSubmit={handleSimpanProfil}>
          <FormSection
            icon={iconUser}
            title="Informasi Profil"
            subtitle="Email tidak bisa diganti sendiri, hubungi admin lain jika perlu"
          >
            <div>
              <label className={clayLabel}>Email</label>
              <input
                value={admin?.email || ""}
                disabled
                className={`${clayInput} cursor-not-allowed opacity-60`}
              />
            </div>
            <div>
              <label className={clayLabel}>Nama</label>
              <input
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
                className={clayInput}
              />
            </div>

            {pesanProfil && (
              <div className="sm:col-span-2">
                <p
                  className={`rounded-2xl border px-4 py-3 text-sm ${
                    pesanProfil.tipe === "sukses"
                      ? "border-green-100 bg-green-50 text-green-700"
                      : "border-red-100 bg-red-50 text-red-600"
                  }`}
                >
                  {pesanProfil.teks}
                </p>
              </div>
            )}

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={loadingProfil}
                className={`${clayButtonPrimary} px-5 py-2.5 text-sm font-semibold`}
              >
                {iconCheck}
                {loadingProfil ? "Menyimpan..." : "Simpan Nama"}
              </button>
            </div>
          </FormSection>
        </form>

        <form onSubmit={handleGantiSandi}>
          <FormSection
            icon={iconLock}
            title="Ganti Password"
            subtitle="Gunakan password yang kuat dan tidak dipakai di akun lain"
          >
            <div className="sm:col-span-2">
              <label className={clayLabel}>Password Saat Ini</label>
              <input
                type="password"
                value={sandi.sandiLama}
                onChange={(e) =>
                  setSandi({ ...sandi, sandiLama: e.target.value })
                }
                required
                className={clayInput}
              />
            </div>
            <div>
              <label className={clayLabel}>Password Baru</label>
              <input
                type="password"
                value={sandi.sandiBaru}
                onChange={(e) =>
                  setSandi({ ...sandi, sandiBaru: e.target.value })
                }
                required
                minLength={8}
                className={clayInput}
              />
              <p className="mt-1.5 text-xs text-gray-400">Minimal 8 karakter</p>
            </div>
            <div>
              <label className={clayLabel}>Konfirmasi Password Baru</label>
              <input
                type="password"
                value={sandi.konfirmasiSandiBaru}
                onChange={(e) =>
                  setSandi({ ...sandi, konfirmasiSandiBaru: e.target.value })
                }
                required
                className={clayInput}
              />
            </div>

            {pesanSandi && (
              <div className="sm:col-span-2">
                <p
                  className={`rounded-2xl border px-4 py-3 text-sm ${
                    pesanSandi.tipe === "sukses"
                      ? "border-green-100 bg-green-50 text-green-700"
                      : "border-red-100 bg-red-50 text-red-600"
                  }`}
                >
                  {pesanSandi.teks}
                </p>
              </div>
            )}

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={loadingSandi}
                className={`${clayButtonPrimary} px-5 py-2.5 text-sm font-semibold`}
              >
                {iconCheck}
                {loadingSandi ? "Menyimpan..." : "Ganti Password"}
              </button>
            </div>
          </FormSection>
        </form>
      </div>
    </div>
  );
}

export default AkunSaya;
