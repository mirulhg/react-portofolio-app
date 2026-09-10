import { useEffect, useState } from "react";

const ACTIVE_OFFSET = 80;

interface ScrollHeaderState {
  /** 0–1, seberapa jauh halaman sudah digulir */
  progress: number;
  /** id section terakhir yang top-nya sudah melewati ACTIVE_OFFSET, atau null */
  activeId: string | null;
}

/**
 * Satu pendengar scroll (passive) untuk section aktif + kemajuan gulir sekaligus —
 * dua listener terpisah untuk hal yang sama pernah jadi dua sumber kebenaran yang gagal.
 */
export function useScrollHeader(sectionIds: string[]): ScrollHeaderState {
  const [state, setState] = useState<ScrollHeaderState>({
    progress: 0,
    activeId: null,
  });

  useEffect(() => {
    let ticking = false;

    function computeState() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;

      let activeId: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= ACTIVE_OFFSET) {
          activeId = id;
        }
      }

      setState({ progress, activeId });
      ticking = false;
    }

    function handleScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(computeState);
    }

    computeState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
    // sectionIds datang dari konstanta modul di pemanggil, bukan state yang berubah tiap render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
