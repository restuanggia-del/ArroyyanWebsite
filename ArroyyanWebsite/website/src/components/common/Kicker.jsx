function Kicker({ children, tone = "light" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] ${
        tone === "light" ? "text-primary" : "text-white/70"
      }`}
    >
      <span
        className={`h-px w-8 ${tone === "light" ? "bg-primary" : "bg-white/50"}`}
      />
      {children}
    </span>
  );
}

export default Kicker;
