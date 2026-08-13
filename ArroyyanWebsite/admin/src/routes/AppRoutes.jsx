import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/layout/ProtectedRoute.jsx";
import Sidebar from "../components/layout/Sidebar.jsx";
import Topbar from "../components/layout/Topbar.jsx";

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
import TambahAdmin from "../pages/TambahAdmin.jsx";

function AdminLayout({ children, title }) {
  return (
    <div className="flex min-h-screen bg-[#eaf2fd]">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar title={title} />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
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
            <AdminLayout title="Dashboard">
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/produk"
        element={
          <ProtectedRoute>
            <AdminLayout title="Produk">
              <ProdukList />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/produk/tambah"
        element={
          <ProtectedRoute>
            <AdminLayout title="Form Produk">
              <ProdukForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/produk/edit/:id"
        element={
          <ProtectedRoute>
            <AdminLayout title="Form Produk">
              <ProdukForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/berita"
        element={
          <ProtectedRoute>
            <AdminLayout title="Berita">
              <BeritaList />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/berita/tambah"
        element={
          <ProtectedRoute>
            <AdminLayout title="Form Berita">
              <BeritaForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/berita/edit/:id"
        element={
          <ProtectedRoute>
            <AdminLayout title="Form Berita">
              <BeritaForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/banner"
        element={
          <ProtectedRoute>
            <AdminLayout title="Banner">
              <Banner />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/testimoni"
        element={
          <ProtectedRoute>
            <AdminLayout title="Testimoni">
              <Testimoni />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tentang"
        element={
          <ProtectedRoute>
            <AdminLayout title="Tentang">
              <Tentang />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/home-servis"
        element={
          <ProtectedRoute>
            <AdminLayout title="Home Servis">
              <HomeServis />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/kontak"
        element={
          <ProtectedRoute>
            <AdminLayout title="Pesan Masuk">
              <Kontak />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/pengaturan"
        element={
          <ProtectedRoute>
            <AdminLayout title="Pengaturan">
              <Pengaturan />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tambah-admin"
        element={
          <ProtectedRoute>
            <AdminLayout title="Tambah Admin">
              <TambahAdmin />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
