import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProdukById, getAllProduk } from "../../services/produkService.js";
import { getPengaturan } from "../../services/pengaturanService.js";
import Reveal from "../../components/common/Reveal.jsx";
import Kicker from "../../components/common/Kicker.jsx";

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
  const [whatsapp, setWhatsapp] = useState(null);
  const [terkait, setTerkait] = useState([]);

  useEffect(() => {
    setLoading(true);
    setProduk(null);
    getProdukById(id)
      .then((res) => setProduk(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
    getPengaturan()
      .then((res) => setWhatsapp(res.data?.whatsapp || null))
      .catch(() => {});
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  useEffect(() => {
    if (!produk?.kategori) return;
    getAllProduk(produk.kategori)
      .then((res) =>
        setTerkait(res.data.filter((p) => p._id !== produk._id).slice(0, 3)),
      )
      .catch(() => {});
  }, [produk]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4 py-16 text-center text-slate-400">
        Memuat produk...
      </div>
    );
  }

  if (!produk) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 py-16 text-center text-slate-400">
        <p>Produk tidak ditemukan.</p>
        <Link
          to="/produk"
          className="text-sm font-semibold text-primary hover:underline"
        >
          ← Kembali ke daftar produk
        </Link>
      </div>
    );
  }

  const waLink = whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(
        `Halo Arroyyan99, saya ingin memesan ${produk.nama} (${produk.volume || ""}).`,
      )}`
    : "/kontak";

  return (
    <div className="overflow-x-clip">
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <Reveal variant="up">
          <nav className="mb-8 flex items-center gap-1.5 text-sm text-slate-400">
            <Link to="/produk" className="transition-colors hover:text-primary">
              Produk
            </Link>
            <span>/</span>
            <span className="capitalize text-slate-500">{produk.kategori}</span>
            <span>/</span>
            <span className="truncate text-secondary">{produk.nama}</span>
          </nav>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
          {/* Gambar */}
          <Reveal variant="right" duration={800}>
            <div className="relative">
              <div
                aria-hidden="true"
                className="animate-float-slow absolute -left-8 -top-8 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
              />
              <div className="relative aspect-square w-full overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-100 shadow-[0_25px_50px_-25px_rgba(15,23,42,0.3)]">
                {produk.gambar ? (
                  <img
                    src={`${API_BASE_URL}${produk.gambar}`}
                    alt={produk.nama}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-slate-400">
                    Belum ada gambar
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          {/* Detail */}
          <Reveal variant="left" duration={800} delay={100}>
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold capitalize text-primary">
              {produk.kategori}
            </span>
            <h1 className="font-display text-3xl font-semibold text-secondary sm:text-4xl">
              {produk.nama}
            </h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              {produk.volume}
            </p>

            {formatHarga(produk.harga) && (
              <p className="font-display mt-5 text-3xl font-semibold text-primary">
                {formatHarga(produk.harga)}
              </p>
            )}

            {produk.deskripsi && (
              <p className="mt-5 whitespace-pre-line text-sm leading-relaxed text-slate-600 sm:text-base">
                {produk.deskripsi}
              </p>
            )}

            {produk.isiPerDus && (
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600">
                <svg
                  className="h-4 w-4 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5 12 3 3.75 7.5m16.5 0L12 12m8.25-4.5v9L12 21m0-9L3.75 7.5m8.25 4.5v9M3.75 7.5v9L12 21"
                  />
                </svg>
                Isi {produk.isiPerDus} pcs per dus
              </div>
            )}

            {produk.komposisi && (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-[#F7F5F0] p-5">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-secondary">
                  Komposisi / Kandungan
                </h3>
                <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
                  {produk.komposisi}
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={waLink}
                target={whatsapp ? "_blank" : undefined}
                rel={whatsapp ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(2,132,199,0.55)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Pesan Produk Ini
              </a>
              <Link
                to="/produk"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3.5 text-sm font-semibold text-secondary transition-colors hover:border-primary hover:text-primary"
              >
                ← Kembali ke Produk
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Produk Terkait */}
      {terkait.length > 0 && (
        <section className="bg-[#F7F5F0] py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal variant="up">
              <Kicker>Kategori Serupa</Kicker>
              <h2 className="font-display mt-3 mb-8 text-xl font-semibold text-secondary sm:text-2xl">
                Produk Lainnya
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {terkait.map((item, idx) => (
                <Reveal key={item._id} variant="up" delay={idx * 90}>
                  <Link
                    to={`/produk/${item._id}`}
                    className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_20px_35px_-20px_rgba(15,23,42,0.25)]"
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
                    <div className="p-4">
                      <h3 className="font-semibold text-secondary">
                        {item.nama}
                      </h3>
                      <p className="text-sm text-slate-500">{item.volume}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default ProdukDetail;
