import { useReveal } from "../../hooks/useReveal.js";

const HIDDEN_TRANSFORM = {
  up: "translateY(2.5rem)",
  down: "translateY(-2.5rem)",
  left: "translateX(2.5rem)",
  right: "translateX(-2.5rem)",
  zoom: "scale(0.94)",
  fade: "none",
};

function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  duration = 700,
  className = "",
  once = false,
  threshold,
}) {
  const { ref, inView } = useReveal({ once, threshold });
  const hiddenTransform = HIDDEN_TRANSFORM[variant] ?? HIDDEN_TRANSFORM.up;

  return (
    <Tag
      ref={ref}
      className={`will-change-transform transition-all ease-out ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: inView ? `${delay}ms` : "0ms",
        transitionProperty: "opacity, transform",
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0,0) scale(1)" : hiddenTransform,
      }}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
