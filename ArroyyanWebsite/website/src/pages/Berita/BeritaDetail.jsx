import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBeritaBySlug, getAllBerita } from "../../services/beritaService.js";
import Reveal from "../../components/common/Reveal.jsx";
import Kicker from "../../components/common/Kicker.jsx";

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

function BeritaDetail() {
  const { slug } = useParams();
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [terkait, setTerkait] = useState([]);

  useEffect(() => {
    setLoading(true);
    setBerita(null);
    getBeritaBySlug(slug)
      .then((res) => setBerita(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  useEffect(() => {
    if (!berita?.kategori) return;
    getAllBerita(berita.kategori)
      .then((res) =>
        setTerkait(res.data.filter((b) => b.slug !== berita.slug).slice(0, 3)),
      )
      .catch(() => {});
  }, [berita]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4 py-16 text-center text-slate-400">
        Memuat berita...
      </div>
    );
  }

  if (!berita) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 py-16 text-center text-slate-400">
        <p>Berita tidak ditemukan.</p>
        <Link
          to="/berita"
          className="text-sm font-semibold text-primary hover:underline"
        >
          ← Kembali ke Berita
        </Link>
      </div>
    );
  }

  const tanggal = formatTanggal(berita.tanggal || berita.createdAt);

  return (
    <div className="overflow-x-clip">
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
        <Reveal variant="up">
          <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-slate-400">
            <Link to="/berita" className="transition-colors hover:text-primary">
              Berita
            </Link>
            {berita.kategori && (
              <>
                <span>/</span>
                <span className="capitalize text-slate-500">
                  {berita.kategori}
                </span>
              </>
            )}
          </nav>

          {berita.kategori && (
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold capitalize text-primary">
              {berita.kategori}
            </span>
          )}
          <h1 className="font-display text-2xl font-semibold leading-tight text-secondary sm:text-4xl">
            {berita.judul}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
            {berita.penulis && <span>Oleh {berita.penulis}</span>}
            {berita.penulis && tanggal && (
              <span className="text-slate-300">•</span>
            )}
            {tanggal && <span>{tanggal}</span>}
          </div>
        </Reveal>

        {berita.gambar && (
          <Reveal variant="zoom" delay={100}>
            <div className="mt-8 aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
              <img
                src={`${API_BASE_URL}${berita.gambar}`}
                alt={berita.judul}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        )}

        <Reveal variant="up" delay={150}>
          <div className="mt-8 whitespace-pre-line text-base leading-[1.9] text-slate-600 sm:text-lg">
            {berita.konten}
          </div>
        </Reveal>

        <Reveal variant="up">
          <div className="mt-10 border-t border-slate-200 pt-6">
            <Link
              to="/berita"
              className="text-sm font-semibold text-primary hover:underline"
            >
              ← Kembali ke Berita
            </Link>
          </div>
        </Reveal>
      </article>

      {/* Berita Terkait */}
      {terkait.length > 0 && (
        <section className="bg-[#F7F5F0] py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal variant="up">
              <Kicker>Baca Juga</Kicker>
              <h2 className="font-display mt-3 mb-8 text-xl font-semibold text-secondary sm:text-2xl">
                Berita Lainnya
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {terkait.map((item, idx) => (
                <Reveal key={item._id} variant="up" delay={idx * 90}>
                  <Link
                    to={`/berita/${item.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_20px_35px_-20px_rgba(15,23,42,0.25)]"
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
                    <div className="p-4">
                      <h3 className="line-clamp-2 font-semibold text-secondary">
                        {item.judul}
                      </h3>
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

export default BeritaDetail;
