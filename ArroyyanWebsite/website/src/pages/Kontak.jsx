import { useEffect, useState } from "react";
import { kirimPesanKontak } from "../services/kontakService.js";
import { getPengaturan } from "../services/pengaturanService.js";
import MapEmbed from "../components/common/MapEmbed.jsx";
import FAQ from "../components/common/FAQ.jsx";
import Reveal from "../components/common/Reveal.jsx";
import Kicker from "../components/common/Kicker.jsx";
import WaveDivider from "../components/common/WaveDivider.jsx";

const KONTAK_INFO = [
  {
    key: "alamat",
    label: "Alamat",
    icon: (
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
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        />
      </svg>
    ),
  },
  {
    key: "telepon",
    label: "Telepon",
    icon: (
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
          d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a1.5 1.5 0 0 0 1.5-1.5v-2.4a1.5 1.5 0 0 0-1.146-1.457l-3.415-.854a1.5 1.5 0 0 0-1.482.401l-1.02 1.02a11.25 11.25 0 0 1-5.397-5.397l1.02-1.02a1.5 1.5 0 0 0 .401-1.482l-.854-3.415A1.5 1.5 0 0 0 6.6 4.5H4.5A1.5 1.5 0 0 0 3 6v.75Z"
        />
      </svg>
    ),
  },
  {
    key: "email",
    label: "Email",
    icon: (
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
          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.007 1.872l-7.5 5.006a2.25 2.25 0 0 1-2.486 0L3.257 8.865A2.25 2.25 0 0 1 2.25 6.993V6.75"
        />
      </svg>
    ),
  },
];

const FIELD_CLASS =
  "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-secondary placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10";

function Kontak() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    telepon: "",
    pesan: "",
  });
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [pengaturan, setPengaturan] = useState(null);

  useEffect(() => {
    getPengaturan()
      .then((res) => setPengaturan(res.data))
      .catch(() => {});
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      await kirimPesanKontak(form);
      setStatus({
        tipe: "sukses",
        pesan:
          "Pesan berhasil dikirim, terima kasih! Tim kami akan segera menghubungi Anda.",
      });
      setForm({ nama: "", email: "", telepon: "", pesan: "" });
    } catch {
      setStatus({
        tipe: "gagal",
        pesan: "Gagal mengirim pesan, silakan coba lagi.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const waLink = pengaturan?.whatsapp
    ? `https://wa.me/${pengaturan.whatsapp}?text=${encodeURIComponent("Halo Arroyyan99, saya ingin bertanya.")}`
    : null;

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

        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <Reveal variant="up">
            <Kicker>Kami Siap Membantu</Kicker>
            <h1 className="font-display mt-4 text-3xl font-semibold text-secondary sm:text-5xl">
              Hubungi Kami
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
              Ada pertanyaan seputar produk, pemesanan, atau kerja sama
              distribusi? Tim kami siap membantu Anda.
            </p>
          </Reveal>
        </div>

        <WaveDivider tone="#ffffff" />
      </section>

      {/* Info + Form */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Info kontak */}
          <Reveal variant="right">
            <div className="space-y-4">
              {KONTAK_INFO.map((item) => (
                <div
                  key={item.key}
                  className="flex items-start gap-4 rounded-2xl border border-slate-200 p-5 transition-colors hover:border-primary/30"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm text-secondary sm:text-base">
                      {pengaturan?.[item.key] || "-"}
                    </p>
                  </div>
                </div>
              ))}

              {waLink && (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                  >
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.005c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.14h-.005a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.55-3.7 8.24-8.25 8.24Zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.24-.64.8-.78.97-.14.17-.29.19-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.24-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42-.14-.01-.31-.01-.47-.01-.17 0-.44.06-.67.31-.23.24-.87.85-.87 2.08 0 1.22.89 2.4 1.02 2.57.13.16 1.74 2.66 4.22 3.72.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
                  </svg>
                  Chat via WhatsApp
                </a>
              )}

              <div className="overflow-hidden rounded-2xl border border-slate-200">
                {pengaturan?.mapsEmbedUrl ? (
                  <MapEmbed src={pengaturan.mapsEmbedUrl} height="16rem" />
                ) : (
                  <div className="flex h-64 items-center justify-center bg-slate-50 text-sm text-slate-400">
                    Peta belum diatur di Admin Panel &gt; Pengaturan
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal variant="left" delay={100}>
            <form
              onSubmit={handleSubmit}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.25)] sm:p-8"
            >
              <h2 className="font-display text-xl font-semibold text-secondary sm:text-2xl">
                Kirim Pesan
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Isi form berikut, kami akan merespons secepatnya.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="nama"
                    className="mb-1.5 block text-xs font-semibold text-secondary"
                  >
                    Nama
                  </label>
                  <input
                    id="nama"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    placeholder="Nama lengkap Anda"
                    required
                    className={FIELD_CLASS}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-xs font-semibold text-secondary"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="nama@email.com"
                      required
                      className={FIELD_CLASS}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="telepon"
                      className="mb-1.5 block text-xs font-semibold text-secondary"
                    >
                      Telepon
                    </label>
                    <input
                      id="telepon"
                      name="telepon"
                      value={form.telepon}
                      onChange={handleChange}
                      placeholder="08xxxxxxxxxx"
                      className={FIELD_CLASS}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="pesan"
                    className="mb-1.5 block text-xs font-semibold text-secondary"
                  >
                    Pesan
                  </label>
                  <textarea
                    id="pesan"
                    name="pesan"
                    value={form.pesan}
                    onChange={handleChange}
                    placeholder="Tulis pertanyaan atau kebutuhan Anda di sini..."
                    required
                    rows={5}
                    className={`${FIELD_CLASS} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(2,132,199,0.55)] transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {submitting ? "Mengirim..." : "Kirim Pesan"}
                </button>

                {status && (
                  <p
                    className={`rounded-xl px-4 py-3 text-sm ${
                      status.tipe === "sukses"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {status.pesan}
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F5F0] py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal variant="up">
            <div className="mb-10 text-center">
              <Kicker>Masih Ada Pertanyaan?</Kicker>
              <h2 className="font-display mt-3 text-2xl font-semibold text-secondary sm:text-4xl">
                Pertanyaan yang Sering Diajukan
              </h2>
            </div>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <FAQ />
          </Reveal>
        </div>
      </section>
    </div>
  );
}

export default Kontak;
