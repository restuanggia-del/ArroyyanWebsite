import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBerita } from "../../services/beritaService.js";

function BeritaList() {
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    getAllBerita().then((res) => setBerita(res.data)).catch(() => {});
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold text-secondary">Berita Terkini</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {berita.map((item) => (
          <Link
            key={item._id}
            to={`/berita/${item.slug}`}
            className="rounded-xl border p-4 shadow-sm hover:shadow-md"
          >
            <h3 className="font-semibold">{item.judul}</h3>
            <p className="mt-2 text-sm text-gray-500">{item.ringkasan}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BeritaList;
