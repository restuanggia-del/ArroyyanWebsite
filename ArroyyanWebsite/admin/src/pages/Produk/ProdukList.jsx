import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProduk, deleteProduk } from "../../services/produkService.js";

function ProdukList() {
  const [produk, setProduk] = useState([]);

  const fetchProduk = () => {
    getAllProduk().then((res) => setProduk(res.data)).catch(() => {});
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;
    await deleteProduk(id);
    fetchProduk();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary">Kelola Produk</h1>
        <Link to="/produk/tambah" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700">
          + Tambah Produk
        </Link>
      </div>

      <table className="w-full overflow-hidden rounded-xl bg-white shadow-sm">
        <thead className="bg-gray-50 text-left text-sm text-gray-500">
          <tr>
            <th className="px-4 py-3">Nama</th>
            <th className="px-4 py-3">Kategori</th>
            <th className="px-4 py-3">Volume</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {produk.map((item) => (
            <tr key={item._id} className="border-t text-sm">
              <td className="px-4 py-3">{item.nama}</td>
              <td className="px-4 py-3 capitalize">{item.kategori}</td>
              <td className="px-4 py-3">{item.volume}</td>
              <td className="px-4 py-3">{item.status}</td>
              <td className="px-4 py-3 space-x-2">
                <Link to={`/produk/edit/${item._id}`} className="text-primary hover:underline">Edit</Link>
                <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:underline">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProdukList;
