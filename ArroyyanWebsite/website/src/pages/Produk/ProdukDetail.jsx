import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProdukById } from "../../services/produkService.js";

const API_BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

function formatHarga(angka) {
  if (!angka) return null;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}

function ProdukDetail() {
  const { id } = useParams();
  const [produk, setProduk] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProdukById(id)
      .then((res) => setProduk(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="px-4 py-16 text-center text-gray-400">
        Memuat produk...
      </div>
    );
  if (!produk)
    return (
      <div className="px-4 py-16 text-center text-gray-400">
        Produk tidak ditemukan.
      </div>
    );

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <Link
        to="/produk"
        className="mb-6 inline-block text-sm text-primary hover:underline"
      >
        ← Kembali ke Produk
      </Link>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Gambar */}
        <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
          {produk.gambar ? (
            <img
              src={`${API_BASE_URL}${produk.gambar}`}
              alt={produk.nama}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              Belum ada gambar
            </div>
          )}
        </div>

        {/* Detail */}
        <div>
          <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">
            {produk.kategori}
          </span>
          <h1 className="mb-2 text-3xl font-bold text-secondary">
            {produk.nama}
          </h1>
          <p className="mb-4 text-gray-500">{produk.volume}</p>

          {formatHarga(produk.harga) && (
            <p className="mb-4 text-2xl font-bold text-primary">
              {formatHarga(produk.harga)}
            </p>
          )}

          <p className="text-gray-600">{produk.deskripsi}</p>

          {produk.komposisi && (
            <div className="mt-6">
              <h3 className="mb-2 font-semibold text-secondary">
                Komposisi / Kandungan
              </h3>
              <p className="text-gray-600">{produk.komposisi}</p>
            </div>
          )}

          {produk.isiPerDus && (
            <p className="mt-4 text-sm text-gray-500">
              Isi {produk.isiPerDus} pcs per dus
            </p>
          )}

          <Link
            to="/kontak"
            className="mt-8 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700"
          >
            Pesan Produk Ini
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProdukDetail;
