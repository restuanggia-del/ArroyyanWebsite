import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("Email atau password salah");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-xl font-bold text-primary">Admin Arroyyan99</h1>
        <input
          type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required
          className="mb-4 w-full rounded-lg border px-4 py-2"
        />
        <input
          type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required
          className="mb-4 w-full rounded-lg border px-4 py-2"
        />
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <button type="submit" className="w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:bg-sky-700">
          Masuk
        </button>
      </form>
    </div>
  );
}

export default Login;
