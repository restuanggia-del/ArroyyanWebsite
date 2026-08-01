import { useEffect, useState } from "react";
import { getPengaturan } from "../../services/pengaturanService.js";

const PESAN_DEFAULT =
  "Halo Arroyyan99, saya ingin bertanya seputar produk AMDK.";

function FloatingWhatsApp() {
  const [nomorWA, setNomorWA] = useState(null);

  useEffect(() => {
    getPengaturan()
      .then((res) => {
        if (res.data?.whatsapp) setNomorWA(res.data.whatsapp);
      })
      .catch(() => {});
  }, []);

  if (!nomorWA) return null;

  const link = `https://wa.me/${nomorWA}?text=${encodeURIComponent(PESAN_DEFAULT)}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi kami via WhatsApp"
      className="fixed bottom-20 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_14px_rgba(37,211,102,0.18)] ring-2 ring-white/40 transition-all duration-200 hover:scale-105 md:bottom-24 md:right-5 md:h-14 md:w-14 md:shadow-[0_8px_18px_rgba(0,0,0,0.18)]"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 md:h-7 md:w-7"
        fill="currentColor"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.005c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.14h-.005a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.55-3.7 8.24-8.25 8.24Zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.24-.64.8-.78.97-.14.17-.29.19-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.24-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42-.14-.01-.31-.01-.47-.01-.17 0-.44.06-.67.31-.23.24-.87.85-.87 2.08 0 1.22.89 2.4 1.02 2.57.13.16 1.74 2.66 4.22 3.72.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
      </svg>
    </a>
  );
}

export default FloatingWhatsApp;
