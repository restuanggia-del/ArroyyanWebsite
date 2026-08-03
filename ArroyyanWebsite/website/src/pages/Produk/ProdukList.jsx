import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAllProduk } from "../../services/produkService.js";

const API_BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

function formatHarga(angka) {
  if (!angka) return null;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}

function ProdukList() {
  const { kategori } = useParams();
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllProduk(kategori)
      .then((res) => setProduk(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [kategori]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-secondary">
        Produk Arroyyan
      </h1>
      <p className="mb-8 text-gray-500">
        {kategori
          ? `Kategori: ${kategori}`
          : "Semua produk Cup, Botol, dan Galon"}
      </p>

      {loading ? (
        <p className="text-gray-400">Memuat produk...</p>
      ) : produk.length === 0 ? (
        <p className="text-gray-400">Belum ada produk untuk kategori ini.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {produk.map((item) => (
            <Link
              key={item._id}
              to={`/produk/${item._id}`}
              className="group block cursor-pointer overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-video w-full overflow-hidden bg-gray-100">
                {item.gambar ? (
                  <img
                    src={`${API_BASE_URL}${item.gambar}`}
                    alt={item.nama}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-400">
                    Belum ada gambar
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="mb-1 flex items-center justify-between">
                  <h3 className="font-semibold text-secondary">{item.nama}</h3>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium capitalize text-primary">
                    {item.kategori}
                  </span>
                </div>
                <p className="mb-2 text-sm text-gray-500">{item.volume}</p>
                {item.deskripsi && (
                  <p className="mb-3 line-clamp-2 text-sm text-gray-500">
                    {item.deskripsi}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  {formatHarga(item.harga) ? (
                    <p className="font-semibold text-primary">
                      {formatHarga(item.harga)}
                    </p>
                  ) : (
                    <span />
                  )}
                  <span className="text-sm font-medium text-primary group-hover:underline">
                    Lihat Detail →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProdukList;
