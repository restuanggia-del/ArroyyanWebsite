import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBerita } from "../../services/beritaService.js";
import Reveal from "../../components/common/Reveal.jsx";
import Kicker from "../../components/common/Kicker.jsx";
import WaveDivider from "../../components/common/WaveDivider.jsx";

const API_BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

function formatTanggal(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function BeritaSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="aspect-video w-full bg-slate-100" />
      <div className="space-y-2 p-5">
        <div className="h-3 w-1/4 rounded bg-slate-100" />
        <div className="h-4 w-3/4 rounded bg-slate-100" />
        <div className="h-3 w-full rounded bg-slate-100" />
      </div>
    </div>
  );
}

function BeritaList() {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aktifKategori, setAktifKategori] = useState(null);

  useEffect(() => {
    getAllBerita()
      .then((res) => setBerita(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const kategoriList = useMemo(
    () => [...new Set(berita.map((b) => b.kategori).filter(Boolean))],
    [berita],
  );

  const filtered = aktifKategori
    ? berita.filter((b) => b.kategori === aktifKategori)
    : berita;
  const [unggulan, ...sisanya] = filtered;

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
            <Kicker>Update Terbaru</Kicker>
            <h1 className="font-display mt-4 text-3xl font-semibold text-secondary sm:text-5xl">
              Berita &amp; Info Arroyyan99
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-500 sm:mx-0 sm:text-base">
              Kabar terbaru seputar produk, kegiatan, dan perkembangan
              Arroyyan99.
            </p>
          </Reveal>
        </div>

        <WaveDivider tone="#ffffff" />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        {kategoriList.length > 1 && (
          <Reveal variant="up">
            <div className="mb-10 flex flex-wrap justify-center gap-2.5 sm:justify-start">
              <button
                onClick={() => setAktifKategori(null)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  aktifKategori === null
                    ? "bg-primary text-white shadow-[0_8px_18px_-8px_rgba(2,132,199,0.6)]"
                    : "border border-slate-300 text-secondary hover:border-primary hover:text-primary"
                }`}
              >
                Semua
              </button>
              {kategoriList.map((kat) => (
                <button
                  key={kat}
                  onClick={() => setAktifKategori(kat)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold capitalize transition-colors ${
                    aktifKategori === kat
                      ? "bg-primary text-white shadow-[0_8px_18px_-8px_rgba(2,132,199,0.6)]"
                      : "border border-slate-300 text-secondary hover:border-primary hover:text-primary"
                  }`}
                >
                  {kat}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <BeritaSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <Reveal variant="up">
            <div className="rounded-2xl border border-dashed border-slate-300 py-20 text-center text-slate-400">
              Belum ada berita untuk ditampilkan.
            </div>
          </Reveal>
        ) : (
          <>
            {/* Featured article */}
            <Reveal variant="up">
              <Link
                to={`/berita/${unggulan.slug}`}
                className="group mb-10 grid grid-cols-1 gap-6 overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-primary/30 hover:shadow-[0_24px_45px_-25px_rgba(15,23,42,0.3)] sm:mb-14 md:grid-cols-2"
              >
                <div className="aspect-video w-full overflow-hidden bg-slate-100 md:aspect-auto">
                  {unggulan.gambar ? (
                    <img
                      src={`${API_BASE_URL}${unggulan.gambar}`}
                      alt={unggulan.judul}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-400">
                      Belum ada gambar
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8">
                  {unggulan.kategori && (
                    <span className="mb-3 inline-block w-fit rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium capitalize text-primary">
                      {unggulan.kategori}
                    </span>
                  )}
                  <h2 className="font-display text-xl font-semibold text-secondary sm:text-2xl">
                    {unggulan.judul}
                  </h2>
                  {formatTanggal(unggulan.tanggal || unggulan.createdAt) && (
                    <p className="mt-1.5 text-xs text-slate-400">
                      {formatTanggal(unggulan.tanggal || unggulan.createdAt)}
                    </p>
                  )}
                  <p className="mt-3 text-sm text-slate-500 line-clamp-3 sm:text-base">
                    {unggulan.ringkasan}
                  </p>
                  <span className="mt-4 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Baca Selengkapnya →
                  </span>
                </div>
              </Link>
            </Reveal>

            {sisanya.length > 0 && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {sisanya.map((item, idx) => (
                  <Reveal key={item._id} variant="up" delay={(idx % 6) * 80}>
                    <Link
                      to={`/berita/${item.slug}`}
                      className="group block h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_24px_40px_-20px_rgba(15,23,42,0.25)]"
                    >
                      <div className="aspect-video w-full overflow-hidden bg-slate-100">
                        {item.gambar ? (
                          <img
                            src={`${API_BASE_URL}${item.gambar}`}
                            alt={item.judul}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm text-slate-400">
                            Belum ada gambar
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        {item.kategori && (
                          <span className="mb-2 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium capitalize text-primary">
                            {item.kategori}
                          </span>
                        )}
                        <h3 className="mb-1 text-base font-semibold text-secondary sm:text-lg">
                          {item.judul}
                        </h3>
                        {formatTanggal(item.tanggal || item.createdAt) && (
                          <p className="mb-1.5 text-xs text-slate-400">
                            {formatTanggal(item.tanggal || item.createdAt)}
                          </p>
                        )}
                        <p className="text-sm text-slate-500 line-clamp-2">
                          {item.ringkasan}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default BeritaList;
