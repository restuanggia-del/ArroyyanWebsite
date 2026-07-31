import { useEffect, useState } from "react";
import api from "../services/api.js";

function Kontak() {
  const [pesan, setPesan] = useState([]);

  useEffect(() => {
    api.get("/kontak").then((res) => setPesan(res.data)).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-secondary">Pesan Masuk</h1>
      <div className="space-y-3">
        {pesan.map((item) => (
          <div key={item._id} className="rounded-xl border bg-white p-4 shadow-sm">
            <p className="font-semibold">{item.nama} — {item.email}</p>
            <p className="mt-1 text-sm text-gray-600">{item.pesan}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Kontak;
