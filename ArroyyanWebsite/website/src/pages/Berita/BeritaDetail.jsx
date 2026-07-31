import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBeritaBySlug } from "../../services/beritaService.js";

function BeritaDetail() {
  const { slug } = useParams();
  const [berita, setBerita] = useState(null);

  useEffect(() => {
    getBeritaBySlug(slug).then((res) => setBerita(res.data)).catch(() => {});
  }, [slug]);

  if (!berita) return <div className="px-4 py-16 text-center">Memuat berita...</div>;

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-secondary">{berita.judul}</h1>
      <p className="mb-6 text-sm text-gray-500">Oleh {berita.penulis}</p>
      <div className="prose max-w-none text-gray-600">{berita.konten}</div>
    </article>
  );
}

export default BeritaDetail;
