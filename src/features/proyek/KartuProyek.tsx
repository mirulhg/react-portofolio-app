import { useLocation, useNavigate } from "react-router-dom";
import { useRevealOnce } from "../../shared/hooks/useRevealOnce";
import type { Proyek } from "./types";

interface KartuProyekProps {
  proyek: Proyek;
}

export function KartuProyek({ proyek }: KartuProyekProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { ref, isRevealed } = useRevealOnce<HTMLButtonElement>();

  function handleClick() {
    navigate(`/proyek/${proyek.slug}`, { state: { backgroundLocation: location } });
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      className={`flex flex-col overflow-hidden rounded-lg border border-line bg-bg-raised text-left transition-[opacity,transform] duration-[320ms] ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] ${
        isRevealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      <div className="relative h-[176px] w-full overflow-hidden bg-bg-inset">
        {proyek.sampul ? (
          <img
            src={proyek.sampul.src}
            alt={proyek.sampul.alt}
            width={300}
            height={176}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="h-full w-full bg-[repeating-linear-gradient(135deg,var(--line-strong)_0px,var(--line-strong)_1px,transparent_1px,transparent_12px)]"
          />
        )}
      </div>
      <div className="flex flex-col gap-2 p-5">
        <div className="flex items-center gap-2">
          <span className="text-label uppercase text-ink-faint">{proyek.category}</span>
          {proyek.anonim && (
            <span className="rounded-pill border border-line-strong px-2 py-0.5 font-mono text-label text-ink-muted">
              NDA
            </span>
          )}
          {proyek.mandiri && (
            <span className="rounded-pill border border-line-strong px-2 py-0.5 font-mono text-label text-ink-muted">
              Proyek Mandiri
            </span>
          )}
        </div>
        <h3 className="font-heading text-h3 font-semibold text-ink">{proyek.title}</h3>
        <p className="text-body-sm text-ink-muted">{proyek.blurb}</p>
      </div>
    </button>
  );
}
