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
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="font-medium text-secondary">{item.pertanyaan}</span>
        <span
          className={`ml-4 shrink-0 text-primary transition-transform ${terbuka ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      {terbuka && (
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          {item.jawaban}
        </p>
      )}
    </div>
  );
}

function FAQ() {
  const [indexTerbuka, setIndexTerbuka] = useState(0);

  return (
    <div className="mx-auto max-w-3xl">
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
