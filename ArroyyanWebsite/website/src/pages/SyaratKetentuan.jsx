import LegalLayout from "../components/common/LegalLayout.jsx";

const SECTIONS = [
  {
    id: "penerimaan-ketentuan",
    judul: "Penerimaan Ketentuan",
    isi: "Dengan mengakses dan menggunakan website ini, Anda dianggap telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan yang berlaku.",
  },
  {
    id: "pemesanan-produk",
    judul: "Pemesanan Produk",
    isi: "Informasi produk dan harga yang tercantum di website ini dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Pemesanan resmi dilakukan melalui kontak langsung dengan pihak Arroyyan99.",
  },
  {
    id: "ketersediaan-produk",
    judul: "Ketersediaan Produk",
    isi: "Ketersediaan produk tergantung pada stok yang ada. Arroyyan99 berhak menolak atau membatalkan pesanan apabila produk yang diminta tidak tersedia.",
  },
  {
    id: "hak-kekayaan-intelektual",
    judul: "Hak Kekayaan Intelektual",
    isi: "Seluruh konten dalam website ini, termasuk logo, teks, dan gambar, adalah milik Arroyyan99 dan dilindungi oleh hukum yang berlaku. Dilarang menyalin atau menggunakan tanpa izin tertulis.",
  },
  {
    id: "batasan-tanggung-jawab",
    judul: "Batasan Tanggung Jawab",
    isi: "Arroyyan99 tidak bertanggung jawab atas kerugian yang timbul akibat penggunaan informasi di website ini di luar konteks pemesanan resmi produk.",
  },
  {
    id: "perubahan-ketentuan",
    judul: "Perubahan Ketentuan",
    isi: "Arroyyan99 berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan diinformasikan melalui halaman ini.",
  },
];

function SyaratKetentuan() {
  return (
    <LegalLayout
      kicker="Legal"
      title="Syarat & Ketentuan"
      lastUpdated="15 Agustus 2026"
      sections={SECTIONS}
    />
  );
}

export default SyaratKetentuan;