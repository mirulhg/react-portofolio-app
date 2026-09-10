import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/** Mengembalikan true sekali saat elemen `ref` memasuki viewport, lalu berhenti mengamati. */
export function useRevealOnce<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isRevealed, setIsRevealed] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const node = ref.current;
    if (!node) return;

    // IntersectionObserver: memicu animasi masuk-layar sekali, lalu berhenti mengamati
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return { ref, isRevealed };
}
