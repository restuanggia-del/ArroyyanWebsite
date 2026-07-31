import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAllProduk } from "../../services/produkService.js";

function ProdukList() {
  const { kategori } = useParams();
  const [produk, setProduk] = useState([]);

  useEffect(() => {
    getAllProduk(kategori).then((res) => setProduk(res.data)).catch(() => {});
  }, [kategori]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-secondary">Produk Arroyyan</h1>
      <p className="mb-8 text-gray-500">
        {kategori ? `Kategori: ${kategori}` : "Semua produk Cup, Botol, dan Galon"}
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {produk.map((item) => (
          <Link
            key={item._id}
            to={`/produk/${item._id}`}
            className="rounded-xl border p-4 shadow-sm hover:shadow-md"
          >
            <h3 className="font-semibold">{item.nama}</h3>
            <p className="text-sm text-gray-500">{item.volume} • {item.kategori}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProdukList;
