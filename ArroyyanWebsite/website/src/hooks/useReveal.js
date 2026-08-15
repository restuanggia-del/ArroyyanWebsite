import { useEffect, useRef, useState } from "react";

/**
 * useReveal
 * IntersectionObserver hook that toggles `inView` every time the element
 * crosses into/out of the viewport — in BOTH scroll directions — so the
 * page keeps feeling alive whether the user scrolls down or back up.
 *
 * @param {Object} options
 * @param {number} options.threshold  0..1, how much of the element must be visible
 * @param {string} options.rootMargin CSS margin to shift the trigger point
 * @param {boolean} options.once      if true, stops observing after first reveal
 */
export function useReveal({
  threshold = 0.18,
  rootMargin = "0px 0px -8% 0px",
  once = false,
} = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}

export function useParallax(speed = 0.15) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const centerDelta = rect.top + rect.height / 2 - vh / 2;
        setOffset(centerDelta * speed);
        raf = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return { ref, offset };
}
