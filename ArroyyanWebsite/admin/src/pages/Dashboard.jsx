function Dashboard() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-secondary">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {/* TODO: tampilkan ringkasan jumlah produk, berita, pesan masuk, dll */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Produk</p>
          <p className="text-2xl font-bold">-</p>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Berita</p>
          <p className="text-2xl font-bold">-</p>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Pesan Masuk</p>
          <p className="text-2xl font-bold">-</p>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Banner Aktif</p>
          <p className="text-2xl font-bold">-</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
