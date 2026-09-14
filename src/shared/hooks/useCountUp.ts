import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

const DURASI_MS = 900;

/** Menghitung angka dari 0 ke `target` sekali saat `aktif` menjadi true (mis. saat reveal-on-scroll). */
export function useCountUp(target: number, aktif: boolean): number {
  const prefersReducedMotion = useReducedMotion();
  const [nilai, setNilai] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || !aktif) return;

    let frameId: number;
    const mulai = performance.now();

    function tick(waktuSekarang: number) {
      const progres = Math.min((waktuSekarang - mulai) / DURASI_MS, 1);
      setNilai(Math.round(progres * target));
      if (progres < 1) {
        frameId = requestAnimationFrame(tick);
      }
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [aktif, target, prefersReducedMotion]);

  // prefers-reduced-motion: langsung ke nilai akhir, diturunkan saat render, bukan lewat
  // setState di efek (tangga state — CLAUDE.md §4).
  return prefersReducedMotion ? target : nilai;
}
