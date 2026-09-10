import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    // sinkronisasi dengan preferensi OS/peramban yang bisa berubah saat runtime
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    function handleChange() {
      setPrefersReduced(query.matches);
    }
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return prefersReduced;
}
