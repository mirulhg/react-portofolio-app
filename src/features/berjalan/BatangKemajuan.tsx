import { useRevealOnce } from "../../shared/hooks/useRevealOnce";

interface BatangKemajuanProps {
  persen: number;
  namaProyek: string;
  isBasi: boolean;
}

export function BatangKemajuan({ persen, namaProyek, isBasi }: BatangKemajuanProps) {
  const { ref, isRevealed } = useRevealOnce<HTMLDivElement>();

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <div
        role="progressbar"
        aria-valuenow={persen}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={namaProyek}
        className="h-2 w-full overflow-hidden rounded-pill bg-bg-inset"
      >
        <div
          className={`h-full origin-left rounded-pill transition-transform duration-[400ms] ease-out ${
            isBasi ? "bg-ink-muted" : "bg-grad-accent"
          }`}
          style={{ transform: `scaleX(${isRevealed ? persen / 100 : 0})` }}
        />
      </div>
      <div className="flex items-center justify-between text-body-sm text-ink-muted">
        <span className="tabular-nums">{persen}%</span>
        {isBasi && <span>belum diperbarui</span>}
      </div>
    </div>
  );
}
