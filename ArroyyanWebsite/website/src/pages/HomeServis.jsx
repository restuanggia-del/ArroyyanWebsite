import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHomeServis } from "../services/homeServisService.js";
import { getPengaturan } from "../services/pengaturanService.js";
import Reveal from "../components/common/Reveal.jsx";
import Kicker from "../components/common/Kicker.jsx";
import WaveDivider from "../components/common/WaveDivider.jsx";

function HomeServis() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [whatsapp, setWhatsapp] = useState(null);

  useEffect(() => {
    getHomeServis()
      .then((res) => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
    getPengaturan()
      .then((res) => setWhatsapp(res.data?.whatsapp || null))
      .catch(() => {});
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4 py-16 text-center text-slate-400">
        Memuat...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4 py-16 text-center text-slate-400">
        Konten belum tersedia. Silakan lengkapi di Admin Panel &gt; Home Servis.
      </div>
    );
  }

  const daftarArea = data.areaCakupan
    ? data.areaCakupan
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean)
    : [];

  const langkahAlur = data.alurPemesanan
    ? data.alurPemesanan
        .split("\n")
        .map((l) => l.replace(/^\d+[.)]\s*/, "").trim())
        .filter(Boolean)
    : [];

  const waLink = whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(
        "Halo Arroyyan99, saya ingin bertanya tentang layanan Home Servis / distribusi.",
      )}`
    : "/kontak";

  const isKosong =
    !data.deskripsi &&
    daftarArea.length === 0 &&
    langkahAlur.length === 0 &&
    !data.minimalOrder;

  return (
    <div className="overflow-x-clip">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#F7F5F0]">
        <div
          aria-hidden="true"
          className="animate-float-slow absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl sm:h-80 sm:w-80"
        />
        <div
          aria-hidden="true"
          className="animate-float-slower absolute -bottom-16 -right-10 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <Reveal variant="up">
            <Kicker>Layanan Distribusi</Kicker>
            <h1 className="font-display mx-auto mt-4 max-w-2xl text-3xl font-semibold leading-tight text-secondary sm:text-5xl">
              {data.judul || "Home Servis"}
            </h1>
            {data.deskripsi && (
              <p className="mx-auto mt-5 max-w-xl whitespace-pre-line text-sm leading-relaxed text-slate-500 sm:text-base">
                {data.deskripsi}
              </p>
            )}
            <a
              href={waLink}
              target={whatsapp ? "_blank" : undefined}
              rel={whatsapp ? "noopener noreferrer" : undefined}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(2,132,199,0.55)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              Hubungi Kami untuk Distribusi
            </a>
          </Reveal>
        </div>

        <WaveDivider tone="#ffffff" />
      </section>

      {isKosong && (
        <div className="mx-auto max-w-4xl px-4 py-16 text-center text-slate-400">
          Konten lainnya belum diisi di Admin Panel.
        </div>
      )}

      {/* Alur Pemesanan */}
      {langkahAlur.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal variant="up">
            <div className="mb-10 text-center sm:mb-14">
              <Kicker>Cara Kerja</Kicker>
              <h2 className="font-display mt-3 text-2xl font-semibold text-secondary sm:text-4xl">
                Alur Pemesanan
              </h2>
            </div>
          </Reveal>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute bottom-6 left-[27px] top-6 hidden w-px bg-slate-200 sm:block"
            />
            <ol className="space-y-6">
              {langkahAlur.map((langkah, idx) => (
                <Reveal key={idx} variant="up" delay={idx * 100}>
                  <li className="relative flex items-start gap-5 rounded-2xl border border-slate-200 bg-white p-5 sm:border-0 sm:bg-transparent sm:p-0">
                    <span className="font-display flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-semibold text-primary">
                      {idx + 1}
                    </span>
                    <p className="mt-3.5 text-sm leading-relaxed text-slate-600 sm:text-base">
                      {langkah}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Area Cakupan */}
      {(daftarArea.length > 0 || data.minimalOrder) && (
        <section className="bg-[#F7F5F0] py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
              {daftarArea.length > 0 && (
                <Reveal variant="right">
                  <Kicker>Jangkauan Kami</Kicker>
                  <h2 className="font-display mt-3 text-2xl font-semibold text-secondary sm:text-4xl">
                    Area Cakupan Distribusi
                  </h2>
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {daftarArea.map((area, idx) => (
                      <span
                        key={area}
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-primary/40 hover:text-primary"
                        style={{ transitionDelay: `${idx * 20}ms` }}
                      >
                        <svg
                          className="h-3.5 w-3.5 text-primary"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                          />
                        </svg>
                        {area}
                      </span>
                    ))}
                  </div>
                </Reveal>
              )}

              {data.minimalOrder && (
                <Reveal variant="left" delay={100}>
                  <div className="relative h-full overflow-hidden rounded-[1.75rem] bg-secondary p-8 text-white sm:p-10">
                    <span className="font-display pointer-events-none absolute -right-3 -top-6 text-8xl font-semibold leading-none text-white/10">
                      MOQ
                    </span>
                    <span className="relative mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25c-.67 0-1.189-.578-1.119-1.243l1.263-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.06.435 1.119 1.007Z"
                        />
                      </svg>
                    </span>
                    <h3 className="font-display relative text-lg font-semibold sm:text-xl">
                      Minimal Order
                    </h3>
                    <p className="relative mt-3 whitespace-pre-line text-sm leading-relaxed text-white/85 sm:text-base">
                      {data.minimalOrder}
                    </p>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden bg-primary px-4 py-16 text-center text-white sm:px-6 sm:py-24">
        <div
          aria-hidden="true"
          className="animate-float-slow absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="animate-float-slower absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-secondary/20 blur-3xl"
        />
        <Reveal variant="zoom" className="relative">
          <h2 className="font-display mx-auto max-w-xl text-2xl font-semibold sm:text-4xl">
            Ingin Berlangganan Rutin?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/80 sm:text-base">
            Tim kami siap membantu mengatur jadwal pengiriman air minum sesuai
            kebutuhan rumah, kantor, atau bisnis Anda.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={waLink}
              target={whatsapp ? "_blank" : undefined}
              rel={whatsapp ? "noopener noreferrer" : undefined}
              className="inline-block rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Hubungi Kami Sekarang
            </a>
            <Link
              to="/produk"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white"
            >
              Lihat Produk
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

export default HomeServis;
