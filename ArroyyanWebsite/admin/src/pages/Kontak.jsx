import { useEffect, useState } from "react";
import {
  getAllKontak,
  toggleDibaca,
  deleteKontak,
} from "../services/kontakService.js";
import { clayCardSm } from "../styles/ui.js";

function formatTanggal(iso) {
  return new Date(iso).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Kontak() {
  const [pesan, setPesan] = useState([]);

  const fetchPesan = () => {
    getAllKontak()
      .then((res) => setPesan(res.data))
      .catch(() => {});
  };

  useEffect(() => {
    fetchPesan();
  }, []);

  const handleToggleDibaca = async (id) => {
    await toggleDibaca(id);
    fetchPesan();
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus pesan ini?")) return;
    await deleteKontak(id);
    fetchPesan();
  };

  const jumlahBelumDibaca = pesan.filter((p) => !p.dibaca).length;

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-2xl font-bold text-secondary">Pesan Masuk</h1>
        {jumlahBelumDibaca > 0 && (
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
            {jumlahBelumDibaca} belum dibaca
          </span>
        )}
      </div>

      <div className="space-y-3">
        {pesan.map((item) => (
          <div
            key={item._id}
            className={`p-4 ${clayCardSm} ${item.dibaca ? "" : "ring-2 ring-blue-200"}`}
          >
            <div className="mb-1 flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-secondary">
                  {item.nama}
                  {!item.dibaca && (
                    <span className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-500 align-middle" />
                  )}
                </p>
                <p className="text-xs text-gray-400">
                  {item.email}
                  {item.telepon ? ` • ${item.telepon}` : ""}
                </p>
              </div>
              <p className="whitespace-nowrap text-xs text-gray-400">
                {formatTanggal(item.createdAt)}
              </p>
            </div>

            <p className="mt-2 text-sm text-gray-600">{item.pesan}</p>

            <div className="mt-3 flex gap-4 text-xs">
              <button
                onClick={() => handleToggleDibaca(item._id)}
                className="font-medium text-blue-600 hover:underline"
              >
                {item.dibaca ? "Tandai Belum Dibaca" : "Tandai Sudah Dibaca"}
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="font-medium text-red-500 hover:underline"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}

        {pesan.length === 0 && (
          <p className="text-sm text-gray-400">Belum ada pesan masuk.</p>
        )}
      </div>
    </div>
  );
}

export default Kontak;
