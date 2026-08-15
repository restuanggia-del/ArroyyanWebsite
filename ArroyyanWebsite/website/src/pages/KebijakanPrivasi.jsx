import LegalLayout from "../components/common/LegalLayout.jsx";

const SECTIONS = [
  {
    id: "informasi-dikumpulkan",
    judul: "Informasi yang Kami Kumpulkan",
    isi: "Saat Anda mengisi formulir kontak di website ini, kami mengumpulkan informasi seperti nama, alamat email, nomor telepon, dan isi pesan yang Anda kirimkan.",
  },
  {
    id: "penggunaan-informasi",
    judul: "Penggunaan Informasi",
    isi: "Informasi yang Anda berikan digunakan semata-mata untuk merespons pertanyaan atau permintaan Anda, dan tidak akan dibagikan kepada pihak ketiga tanpa izin Anda, kecuali diwajibkan oleh hukum.",
  },
  {
    id: "penyimpanan-data",
    judul: "Penyimpanan Data",
    isi: "Data yang Anda kirimkan disimpan secara aman dalam sistem basis data kami dan hanya dapat diakses oleh pihak internal Arroyyan99 yang berwenang.",
  },
  {
    id: "hak-anda",
    judul: "Hak Anda",
    isi: "Anda berhak meminta informasi mengenai data yang kami simpan tentang Anda, serta meminta penghapusan data tersebut dengan menghubungi kami melalui halaman Kontak.",
  },
  {
    id: "perubahan-kebijakan",
    judul: "Perubahan Kebijakan",
    isi: "Kebijakan privasi ini dapat diperbarui sewaktu-waktu. Perubahan akan diinformasikan melalui halaman ini.",
  },
  {
    id: "hubungi-kami",
    judul: "Hubungi Kami",
    isi: "Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini, silakan hubungi kami melalui halaman Kontak.",
  },
];

function KebijakanPrivasi() {
  return (
    <LegalLayout
      kicker="Legal"
      title="Kebijakan Privasi"
      lastUpdated="15 Agustus 2026"
      sections={SECTIONS}
    />
  );
}

export default KebijakanPrivasi;
