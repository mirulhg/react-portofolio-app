import { Button } from "../../shared/ui/Button";
import { useRevealOnce } from "../../shared/hooks/useRevealOnce";
import { KapasitasBadge } from "./KapasitasBadge";
import { PreviewBerjalan } from "../berjalan";
import avatarAmirul from "./avatar-amirul.webp";

const SLOT_TERSEDIA = 2;
const NAMA = "Amirul Muwahiddin Noor";
const PERAN = "Frontend Engineer / Vibe Coder";

export function Hero() {
  const { ref, isRevealed } = useRevealOnce<HTMLDivElement>();

  return (
    <section
      id="beranda"
      className="relative overflow-hidden py-section-py px-section-px"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-pill bg-[radial-gradient(closest-side,var(--accent-a),transparent)] opacity-30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-40 h-[360px] w-[360px] rounded-pill bg-[radial-gradient(closest-side,var(--accent-b),transparent)] opacity-25 blur-3xl"
      />

      <div
        ref={ref}
        className={`relative mx-auto flex max-w-content flex-col gap-10 transition-[opacity,transform] duration-[320ms] ease-out lg:flex-row lg:items-start lg:justify-between ${
          isRevealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        <div className="flex flex-col items-start gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <img
                src={avatarAmirul}
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 shrink-0 rounded-pill object-cover"
              />
              <div>
                <p className="font-heading text-body font-semibold text-ink">
                  {NAMA}
                </p>
                <p className="text-body-sm text-ink-muted">{PERAN}</p>
              </div>
            </div>
            <Button to="/profil" variant="ghost">
              Detail Profil
            </Button>
          </div>

          <KapasitasBadge slotTersedia={SLOT_TERSEDIA} />

          <h1 className="text-gradient-hero font-heading text-hero font-semibold">
            Produk digital untuk klien.
          </h1>

          <p className="max-w-[46ch] text-body text-ink-muted">
            Situs dan dasbor yang cepat, mudah diakses, dan enak dipakai — dari
            ide sampai rilis.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button href="#proyek">Lihat hasil kerja</Button>
            <Button href="#kontak" variant="ghost">
              Mulai proyek
            </Button>
          </div>
        </div>

        <PreviewBerjalan />
      </div>
    </section>
  );
}
