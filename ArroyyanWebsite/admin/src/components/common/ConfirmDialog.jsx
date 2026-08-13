import { clayCard, clayButtonPrimary } from "../../styles/ui.js";

function ConfirmDialog({
  open,
  title = "Konfirmasi",
  message = "Apakah Anda yakin?",
  confirmText = "Hapus",
  cancelText = "Batal",
  danger = true,
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className={`w-full max-w-sm p-6 ${clayCard}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-2 text-lg font-semibold text-secondary">{title}</h3>
        <p className="mb-6 text-sm text-gray-600">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-2xl px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-blue-50 disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={
              danger
                ? "rounded-2xl bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-[5px_5px_12px_rgba(239,68,68,0.35)] transition-opacity hover:bg-red-600 disabled:opacity-50"
                : `${clayButtonPrimary} px-4 py-2 text-sm font-semibold`
            }
          >
            {loading ? "Memproses..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
