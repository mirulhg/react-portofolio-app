import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export type DialogPhase = "entering" | "open" | "exiting";

/**
 * Siklus fase masuk/keluar untuk dialog yang dianimasikan (entering -> open -> exiting), dan
 * menunda `onClose` sungguhan sampai durasi transisi keluar selesai supaya animasinya sempat
 * diputar. `onClose` disimpan lewat ref (bukan dependency effect) supaya identitas fungsi baru
 * di tiap render induk tidak mereset timer yang sedang berjalan — pola sama seperti
 * `useDialogA11y`. Kalau prefers-reduced-motion aktif, langsung ke "open" dan `onClose`
 * dipanggil instan tanpa jeda buatan.
 */
export function useDialogTransition(isOpen: boolean, onClose: () => void, durationMs: number) {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<DialogPhase>(!isOpen || prefersReducedMotion ? "open" : "entering");

  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!isOpen || prefersReducedMotion) return;
    const id = requestAnimationFrame(() => setPhase("open"));
    return () => cancelAnimationFrame(id);
  }, [isOpen, prefersReducedMotion]);

  useEffect(() => {
    if (phase !== "exiting") return;
    const timer = setTimeout(() => onCloseRef.current(), durationMs);
    return () => clearTimeout(timer);
  }, [phase, durationMs]);

  function requestClose() {
    if (prefersReducedMotion) {
      onCloseRef.current();
      return;
    }
    setPhase("exiting");
  }

  return { phase, requestClose };
}
