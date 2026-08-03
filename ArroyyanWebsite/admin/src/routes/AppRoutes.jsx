import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/layout/ProtectedRoute.jsx";
import Sidebar from "../components/layout/Sidebar.jsx";

import Login from "../pages/Auth/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import ProdukList from "../pages/Produk/ProdukList.jsx";
import ProdukForm from "../pages/Produk/ProdukForm.jsx";
import BeritaList from "../pages/Berita/BeritaList.jsx";
import BeritaForm from "../pages/Berita/BeritaForm.jsx";
import Banner from "../pages/Banner.jsx";
import Testimoni from "../pages/Testimoni.jsx";
import Tentang from "../pages/Tentang.jsx";
import HomeServis from "../pages/HomeServis.jsx";
import Kontak from "../pages/Kontak.jsx";
import Pengaturan from "../pages/Pengaturan.jsx";

function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/produk"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ProdukList />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/produk/tambah"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ProdukForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/produk/edit/:id"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ProdukForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/berita"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <BeritaList />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/berita/tambah"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <BeritaForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/berita/edit/:id"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <BeritaForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/banner"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Banner />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/testimoni"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Testimoni />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tentang"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Tentang />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/home-servis"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <HomeServis />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/kontak"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Kontak />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/pengaturan"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Pengaturan />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
