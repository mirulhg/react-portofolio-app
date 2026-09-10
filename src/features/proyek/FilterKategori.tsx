import { useSearchParams } from "react-router-dom";
import { KATEGORI, getKategoriAktif } from "./types";

const CHIPS = ["Semua", ...KATEGORI] as const;

export function FilterKategori() {
  const [searchParams, setSearchParams] = useSearchParams();
  const aktif = getKategoriAktif(searchParams);

  function pilihKategori(kategori: string) {
    const next = new URLSearchParams(searchParams);
    if (kategori === "Semua") {
      next.delete("kategori");
    } else {
      next.set("kategori", kategori);
    }
    setSearchParams(next);
  }

  return (
    <div role="group" aria-label="Filter kategori proyek" className="flex flex-wrap gap-3">
      {CHIPS.map((kategori) => {
        const isActive = kategori === aktif;
        return (
          <button
            key={kategori}
            type="button"
            aria-pressed={isActive}
            onClick={() => pilihKategori(kategori)}
            className={`min-h-[44px] rounded-pill border px-4 text-body-sm transition-[color,transform] duration-[170ms] ease-out active:scale-[0.97] ${
              isActive ? "border-accent-a bg-bg-inset text-ink" : "border-line-strong text-ink-muted hover:text-ink"
            }`}
          >
            {kategori}
          </button>
        );
      })}
    </div>
  );
}
