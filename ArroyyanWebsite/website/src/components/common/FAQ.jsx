import { useState } from "react";

const DAFTAR_FAQ = [
  {
    pertanyaan: "Berapa minimal order untuk pemesanan?",
    jawaban:
      "Minimal order adalah 1 dus (untuk Cup/Botol) atau 1 galon. Untuk pemesanan dalam jumlah besar, silakan hubungi kami langsung untuk penawaran khusus.",
  },
  {
    pertanyaan: "Area mana saja yang dilayani untuk distribusi?",
    jawaban:
      "Kami melayani distribusi ke wilayah Tulang Bawang dan sekitarnya. Untuk cek apakah area Anda termasuk cakupan kami, silakan hubungi kami via WhatsApp.",
  },
  {
    pertanyaan: "Bagaimana cara pembayaran yang bisa dilakukan?",
    jawaban:
      "Kami menerima pembayaran tunai (COD saat barang diantar) dan transfer bank. Untuk pelanggan langganan/distributor, tersedia juga sistem pembayaran berkala.",
  },
  {
    pertanyaan: "Berapa lama waktu pengiriman setelah pemesanan?",
    jawaban:
      "Pesanan biasanya diproses dan dikirim dalam 1x24 jam setelah konfirmasi, tergantung jarak dan jadwal distribusi ke area Anda.",
  },
  {
    pertanyaan: "Apakah produk Arroyyan99 sudah bersertifikat resmi?",
    jawaban:
      "Ya, produk kami telah memenuhi standar keamanan pangan yang berlaku. Detail sertifikasi dapat dilihat di halaman Beranda bagian Sertifikasi & Legalitas.",
  },
  {
    pertanyaan: "Bisakah saya menjadi distributor/reseller Arroyyan99?",
    jawaban:
      "Tentu, kami membuka peluang kerja sama distributor. Silakan hubungi kami via WhatsApp atau isi form kontak untuk informasi lebih lanjut.",
  },
];

function FAQItem({ item, terbuka, onToggle }) {
  return (
    <div className="border-b border-slate-200 py-1">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
        aria-expanded={terbuka}
      >
        <span
          className={`font-medium transition-colors ${terbuka ? "text-primary" : "text-secondary"}`}
        >
          {item.pertanyaan}
        </span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-primary transition-transform duration-300 ${
            terbuka ? "rotate-45 bg-primary/10" : "bg-slate-100"
          }`}
        >
          +
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: terbuka ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="pb-4 pr-10 text-sm leading-relaxed text-slate-500">
            {item.jawaban}
          </p>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const [indexTerbuka, setIndexTerbuka] = useState(0);

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white px-5 sm:px-7">
      {DAFTAR_FAQ.map((item, index) => (
        <FAQItem
          key={item.pertanyaan}
          item={item}
          terbuka={indexTerbuka === index}
          onToggle={() => setIndexTerbuka(indexTerbuka === index ? -1 : index)}
        />
      ))}
    </div>
  );
}

export default FAQ;
