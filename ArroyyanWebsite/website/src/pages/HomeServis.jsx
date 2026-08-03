import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHomeServis } from "../services/homeServisService.js";

function HomeServis() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getHomeServis()
      .then((res) => setData(res.data))
      .catch(() => {});
  }, []);

  if (!data) {
    return (
      <div className="px-4 py-16 text-center text-gray-400">Memuat...</div>
    );
  }

  const daftarArea = data.areaCakupan
    ? data.areaCakupan
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="mb-4 text-3xl font-bold text-secondary">
        {data.judul || "Home Servis (Distribusi)"}
      </h1>

      {data.deskripsi && (
        <p className="mb-10 whitespace-pre-line text-gray-600">
          {data.deskripsi}
        </p>
      )}

      {daftarArea.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-secondary">
            Area Cakupan Distribusi
          </h2>
          <div className="flex flex-wrap gap-2">
            {daftarArea.map((area) => (
              <span
                key={area}
                className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
              >
                {area}
              </span>
            ))}
          </div>
        </section>
      )}

      {data.alurPemesanan && (
        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-secondary">
            Alur Pemesanan
          </h2>
          <p className="whitespace-pre-line text-gray-600">
            {data.alurPemesanan}
          </p>
        </section>
      )}

      {data.minimalOrder && (
        <section className="mb-10 rounded-xl border border-primary/20 bg-primary/5 p-6">
          <h2 className="mb-1 text-lg font-semibold text-secondary">
            Minimal Order
          </h2>
          <p className="text-gray-600">{data.minimalOrder}</p>
        </section>
      )}

      {!data.deskripsi &&
        daftarArea.length === 0 &&
        !data.alurPemesanan &&
        !data.minimalOrder && (
          <p className="text-gray-400">Konten belum diisi di Admin Panel.</p>
        )}

      <Link
        to="/kontak"
        className="mt-4 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700"
      >
        Hubungi Kami untuk Distribusi
      </Link>
    </div>
  );
}

export default HomeServis;
