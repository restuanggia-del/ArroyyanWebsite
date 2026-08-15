import { Link } from "react-router-dom";
import Reveal from "./Reveal.jsx";
import Kicker from "./Kicker.jsx";

function LegalLayout({ kicker, title, lastUpdated, sections }) {
  return (
    <div className="overflow-x-clip">
      <section className="relative overflow-hidden bg-[#F7F5F0]">
        <div
          aria-hidden="true"
          className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-16">
          <Reveal variant="fade">
            <Kicker>{kicker}</Kicker>
            <h1 className="font-display mt-3 text-3xl font-semibold text-secondary sm:text-4xl">
              {title}
            </h1>
            {lastUpdated && (
              <p className="mt-3 text-sm text-slate-400">
                Terakhir diperbarui: {lastUpdated}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.7fr_2fr] lg:gap-14">
          {/* Table of contents */}
          <Reveal variant="fade" className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Daftar Isi
              </p>
              <ul className="space-y-2 border-l border-slate-200 pl-4 text-sm">
                {sections.map((s, idx) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block text-slate-500 transition-colors hover:text-primary"
                    >
                      {idx + 1}. {s.judul}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((s, idx) => {
              const paragraf = Array.isArray(s.isi) ? s.isi : [s.isi];
              return (
                <Reveal key={s.id} variant="fade" delay={idx * 40}>
                  <section
                    id={s.id}
                    className="scroll-mt-24 border-b border-slate-100 pb-8 last:border-0"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <span className="font-display flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {idx + 1}
                      </span>
                      <h2 className="text-base font-semibold text-secondary sm:text-lg">
                        {s.judul}
                      </h2>
                    </div>
                    <div className="space-y-3 pl-11 text-sm leading-relaxed text-slate-600 sm:text-base">
                      {paragraf.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </section>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal variant="fade">
          <div className="mt-14 flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-[#F7F5F0] p-8 text-center sm:mt-20">
            <p className="text-sm text-slate-500 sm:text-base">
              Ada pertanyaan lebih lanjut mengenai halaman ini?
            </p>
            <Link
              to="/kontak"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              Hubungi Kami
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

export default LegalLayout;
