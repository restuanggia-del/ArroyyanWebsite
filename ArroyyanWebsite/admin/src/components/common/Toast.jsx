import { useEffect } from "react";

function Toast({ show, message, type = "success", onClose, duration = 3000 }) {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [show, onClose, duration]);

  if (!show) return null;

  const warna =
    type === "success"
      ? "bg-green-600"
      : type === "error"
        ? "bg-red-500"
        : "bg-secondary";

  const ikon = type === "success" ? "✓" : type === "error" ? "✕" : "ℹ";

  return (
    <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2 animate-[fadeIn_0.2s_ease-out]">
      <div
        className={`flex items-center gap-3 rounded-lg ${warna} px-4 py-3 text-sm font-medium text-white shadow-lg`}
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs">
          {ikon}
        </span>
        {message}
        <button
          onClick={onClose}
          className="ml-2 text-white/80 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default Toast;
