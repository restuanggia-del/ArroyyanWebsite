import { useEffect, useState } from "react";
import { getTentang } from "../services/tentangService.js";

const API_BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

function Tentang() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getTentang()
      .then((res) => setData(res.data))
      .catch(() => {});
  }, []);

  if (!data) {
    return (
      <div className="px-4 py-16 text-center text-gray-400">Memuat...</div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 text-center sm:py-16 sm:text-left">
      <h1 className="mb-8 text-3xl font-bold text-secondary">
        Tentang Arroyyan
      </h1>

      {data.foto && (
        <img
          src={`${API_BASE_URL}${data.foto}`}
          alt="Arroyyan99"
          className="mx-auto mb-10 h-64 w-full rounded-xl object-cover sm:mx-0 sm:h-80"
        />
      )}

      <section className="mb-10 text-center sm:text-left">
        <h2 className="mb-3 text-xl font-semibold text-secondary">
          Sejarah Berdirinya
        </h2>
        <p className="whitespace-pre-line text-gray-600">
          {data.sejarah || "Konten belum diisi di Admin Panel."}
        </p>
      </section>

      <section className="mb-10 text-center sm:text-left">
        <h2 className="mb-3 text-xl font-semibold text-secondary">Lokasi</h2>
        <p className="whitespace-pre-line text-gray-600">
          {data.lokasi || "Konten belum diisi di Admin Panel."}
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border p-6 text-center sm:text-left">
          <h3 className="mb-2 font-semibold text-secondary">Visi</h3>
          <p className="whitespace-pre-line text-gray-600">
            {data.visi || "Konten belum diisi di Admin Panel."}
          </p>
        </div>
        <div className="rounded-xl border p-6 text-center sm:text-left">
          <h3 className="mb-2 font-semibold text-secondary">Misi</h3>
          <p className="whitespace-pre-line text-gray-600">
            {data.misi || "Konten belum diisi di Admin Panel."}
          </p>
        </div>
      </section>
    </div>
  );
}

export default Tentang;
