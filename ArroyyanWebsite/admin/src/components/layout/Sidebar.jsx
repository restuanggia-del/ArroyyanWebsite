import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

function Sidebar() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `block rounded-lg px-4 py-2 text-sm ${isActive ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"}`;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="flex h-screen w-64 flex-col justify-between border-r bg-white p-4">
      <div>
        <h2 className="mb-6 text-lg font-bold text-primary">Arroyyan Admin</h2>
        <nav className="space-y-1">
          <NavLink to="/" className={linkClass} end>
            Dashboard
          </NavLink>
          <NavLink to="/produk" className={linkClass}>
            Produk
          </NavLink>
          <NavLink to="/berita" className={linkClass}>
            Berita
          </NavLink>
          <NavLink to="/banner" className={linkClass}>
            Banner
          </NavLink>
          <NavLink to="/testimoni" className={linkClass}>
            Testimoni
          </NavLink>
          <NavLink to="/tentang" className={linkClass}>
            Tentang
          </NavLink>
          <NavLink to="/home-servis" className={linkClass}>
            Home Servis
          </NavLink>
          <NavLink to="/kontak" className={linkClass}>
            Pesan Masuk
          </NavLink>
          <NavLink to="/pengaturan" className={linkClass}>
            Pengaturan
          </NavLink>
        </nav>
      </div>
      <div className="border-t pt-4">
        <p className="mb-2 text-xs text-gray-500">
          {admin?.nama} ({admin?.email})
        </p>
        <button
          onClick={handleLogout}
          className="w-full rounded-lg bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200"
        >
          Keluar
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
