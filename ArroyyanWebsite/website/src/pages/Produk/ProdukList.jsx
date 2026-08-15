import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAllProduk } from "../../services/produkService.js";
import Reveal from "../../components/common/Reveal.jsx";
import Kicker from "../../components/common/Kicker.jsx";
import WaveDivider from "../../components/common/WaveDivider.jsx";

const API_BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

const KATEGORI_TABS = [
  { slug: undefined, label: "Semua" },
  { slug: "cup", label: "Cup" },
  { slug: "botol", label: "Botol" },
  { slug: "galon", label: "Galon" },
];

function formatHarga(angka) {
  if (!angka) return null;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}

function ProdukSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="aspect-[4/3] w-full bg-slate-100" />
      <div className="space-y-2 p-5">
        <div className="h-4 w-2/3 rounded bg-slate-100" />
        <div className="h-3 w-1/3 rounded bg-slate-100" />
        <div className="h-4 w-1/2 rounded bg-slate-100" />
      </div>
    </div>
  );
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
    <div className="overflow-x-clip">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#F7F5F0]">
        <div
          aria-hidden="true"
          className="animate-float-slow absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="animate-float-slower absolute -bottom-16 -right-10 h-64 w-64 rounded-full bg-secondary/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 sm:py-20 sm:text-left">
          <Reveal variant="up">
            <Kicker>Katalog Kami</Kicker>
            <h1 className="font-display mt-4 text-3xl font-semibold text-secondary sm:text-5xl">
              Produk Arroyyan99
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-500 sm:mx-0 sm:text-base">
              Tersedia dalam varian Cup, Botol, dan Galon — dikemas higienis
              dengan kualitas air terjaga, siap diantar sampai ke tempat Anda.
            </p>
          </Reveal>
        </div>

        <WaveDivider tone="#ffffff" />
      </section>

      {/* Filter Grid */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <Reveal variant="up">
          <div className="mb-10 flex flex-wrap justify-center gap-2.5 sm:justify-start">
            {KATEGORI_TABS.map((tab) => {
              const isActive = (kategori || undefined) === tab.slug;
              const to = tab.slug ? `/produk/kategori/${tab.slug}` : "/produk";
              return (
                <Link
                  key={tab.label}
                  to={to}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-primary text-white shadow-[0_8px_18px_-8px_rgba(2,132,199,0.6)]"
                      : "border border-slate-300 text-secondary hover:border-primary hover:text-primary"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </Reveal>

        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProdukSkeleton key={i} />
            ))}
          </div>
        ) : produk.length === 0 ? (
          <Reveal variant="up">
            <div className="rounded-2xl border border-dashed border-slate-300 py-20 text-center text-slate-400">
              Belum ada produk untuk kategori ini.
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {produk.map((item, idx) => (
              <Reveal key={item._id} variant="up" delay={(idx % 6) * 80}>
                <Link
                  to={`/produk/${item._id}`}
                  className="group block h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_24px_40px_-20px_rgba(15,23,42,0.25)]"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    {item.gambar ? (
                      <img
                        src={`${API_BASE_URL}${item.gambar}`}
                        alt={item.nama}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-slate-400">
                        Belum ada gambar
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <h3 className="text-base font-semibold text-secondary sm:text-lg">
                        {item.nama}
                      </h3>
                      <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium capitalize text-primary">
                        {item.kategori}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">{item.volume}</p>
                    {item.deskripsi && (
                      <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                        {item.deskripsi}
                      </p>
                    )}
                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                      {formatHarga(item.harga) ? (
                        <p className="font-semibold text-primary">
                          {formatHarga(item.harga)}
                        </p>
                      ) : (
                        <span />
                      )}
                      <span className="text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Lihat Detail →
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ProdukList;
