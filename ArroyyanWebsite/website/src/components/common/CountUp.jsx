import { useEffect, useState } from "react";
import { useReveal } from "../../hooks/useReveal.js";

function CountUp({ value, duration = 1400, className = "" }) {
  const { ref, inView } = useReveal({ once: true, threshold: 0.4 });
  const [display, setDisplay] = useState(null);

  const raw = String(value ?? "");
  const match = raw.match(/-?\d+([.,]\d+)?/);
  const target = match ? parseFloat(match[0].replace(",", ".")) : null;
  const prefix = match ? raw.slice(0, match.index) : "";
  const suffix = match ? raw.slice(match.index + match[0].length) : raw;
  const decimals = match && match[0].includes(",") ? 1 : 0;

  useEffect(() => {
    if (!inView || target === null) return;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration]);

  if (target === null) {
    return (
      <span ref={ref} className={className}>
        {raw}
      </span>
    );
  }

  const shown = display === null ? 0 : display;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown.toLocaleString("id-ID", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export default CountUp;
