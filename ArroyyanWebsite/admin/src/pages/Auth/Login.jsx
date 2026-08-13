import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { clayCard, clayInput, clayButtonPrimary } from "../../styles/ui.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#eaf2fd] px-4">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-200/50 blur-3xl" />

      <div className="relative w-full max-w-sm">
        <div className="mb-3 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-[24px] bg-white p-2.5 shadow-[8px_8px_18px_rgba(96,130,196,0.25),-6px_-6px_16px_rgba(255,255,255,0.9)]">
            <img
              src="/logo-arroyyan.png"
              alt="Arroyyan99"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
        <p className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-slate-400">
          Admin Panel
        </p>

        <form onSubmit={handleSubmit} className={`p-8 ${clayCard}`}>
          <h1 className="mb-1 text-lg font-semibold text-secondary">
            Selamat datang kembali
          </h1>
          <p className="mb-6 text-sm text-gray-500">
            Masuk untuk mengelola konten Arroyyan99
          </p>

          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              placeholder="nama@arroyyan99.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={clayInput}
            />
          </div>

          <div className="mb-5">
            <label className="mb-1.5 block text-xs font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={clayInput}
            />
          </div>

          {error && (
            <p className="mb-4 rounded-2xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600 shadow-[inset_2px_2px_5px_rgba(239,68,68,0.06)]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`${clayButtonPrimary} w-full px-4 py-2.5 text-sm font-semibold`}
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
