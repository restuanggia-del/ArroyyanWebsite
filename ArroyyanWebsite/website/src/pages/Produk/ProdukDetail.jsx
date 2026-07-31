import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProdukById } from "../../services/produkService.js";

function ProdukDetail() {
  const { id } = useParams();
  const [produk, setProduk] = useState(null);

  useEffect(() => {
    getProdukById(id).then((res) => setProduk(res.data)).catch(() => {});
  }, [id]);

  if (!produk) return <div className="px-4 py-16 text-center">Memuat produk...</div>;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-secondary">{produk.nama}</h1>
      <p className="mb-6 text-gray-500">{produk.volume} • {produk.kategori}</p>
      <p className="text-gray-600">{produk.deskripsi}</p>
      {produk.komposisi && (
        <div className="mt-6">
          <h3 className="mb-2 font-semibold">Komposisi / Kandungan</h3>
          <p className="text-gray-600">{produk.komposisi}</p>
        </div>
      )}
      {produk.isiPerDus && (
        <p className="mt-4 text-sm text-gray-500">Isi {produk.isiPerDus} pcs per dus</p>
      )}
    </div>
  );
}

export default ProdukDetail;
