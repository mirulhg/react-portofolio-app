import type { Proyek } from "./types";

interface SampulProyekProps {
  sampul: Proyek["sampul"];
  className: string;
}

const SAMPUL_PLACEHOLDER_CLASS =
  "bg-[repeating-linear-gradient(135deg,var(--line-strong)_0px,var(--line-strong)_1px,transparent_1px,transparent_12px)]";

// Dipakai bareng oleh KartuProyek.tsx (galeri) dan DetailProyekModal.tsx (detail) —
// sebelumnya detail selalu menampilkan placeholder walau `sampul` sudah ada (bug).
export function SampulProyek({ sampul, className }: SampulProyekProps) {
  if (!sampul) {
    return <div aria-hidden="true" className={`${className} ${SAMPUL_PLACEHOLDER_CLASS}`} />;
  }
  return <img src={sampul.src} alt={sampul.alt} loading="lazy" className={`${className} object-cover`} />;
}
