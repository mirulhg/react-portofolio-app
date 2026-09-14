import { useRevealOnce } from "../../shared/hooks/useRevealOnce";
import { useCountUp } from "../../shared/hooks/useCountUp";

interface BatangKemajuanProps {
  persen: number;
  namaProyek: string;
  isBasi: boolean;
}

// Redraw sendiri (bukan aset diunduh) dari ikon konsep "sync" — dua panah melingkar.
// Berputar hanya kalau progresnya masih segar (isBasi false); prefers-reduced-motion
// sudah ditangani global lewat tokens.css, jangan tulis ulang di sini (HANDOFF §gerakan).
function IkonSinkron({ berputar }: { berputar: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-4 w-4 shrink-0 ${berputar ? "animate-spin text-accent-a" : "text-ink-faint"}`}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M4 12a8 8 0 0 1 8-8c2.5 0 4.7 1.2 6 3M20 12a8 8 0 0 1-8 8c-2.5 0-4.7-1.2-6-3"
      />
      <path fill="currentColor" d="M17 3v5h-5zM7 21v-5h5z" />
    </svg>
  );
}

export function BatangKemajuan({ persen, namaProyek, isBasi }: BatangKemajuanProps) {
  const { ref, isRevealed } = useRevealOnce<HTMLDivElement>();
  const persenAnimasi = useCountUp(persen, isRevealed);

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div
          role="progressbar"
          aria-valuenow={persen}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={namaProyek}
          className="h-2 w-full flex-1 overflow-hidden rounded-pill bg-bg-inset"
        >
          <div
            className={`h-full origin-left rounded-pill transition-transform duration-[400ms] ease-out ${
              isBasi ? "bg-ink-muted" : "bg-grad-accent"
            }`}
            style={{ transform: `scaleX(${isRevealed ? persen / 100 : 0})` }}
          />
        </div>
        <IkonSinkron berputar={!isBasi} />
      </div>
      <div className="flex items-center justify-between text-body-sm text-ink-muted">
        <span className="tabular-nums">{persenAnimasi}%</span>
        {isBasi && <span>belum diperbarui</span>}
      </div>
    </div>
  );
}
