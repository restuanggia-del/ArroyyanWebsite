import { clayCard, clayIconBadge } from "../../styles/ui.js";

function FormSection({ icon, title, subtitle, children, columns = 2 }) {
  return (
    <div className={`overflow-hidden ${clayCard}`}>
      <div className="flex items-center gap-3.5 px-6 py-5">
        <div className={`h-11 w-11 shrink-0 ${clayIconBadge}`}>{icon}</div>
        <div>
          <h2 className="text-sm font-semibold text-secondary">{title}</h2>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
      <div
        className={`grid grid-cols-1 gap-5 px-6 pb-6 ${
          columns === 2 ? "sm:grid-cols-2" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default FormSection;
