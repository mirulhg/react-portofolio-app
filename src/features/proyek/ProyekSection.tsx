import { useSearchParams } from "react-router-dom";
import { projects } from "./data/projects";
import { FilterKategori } from "./FilterKategori";
import { KartuProyek } from "./KartuProyek";
import { getKategoriAktif } from "./types";

export function ProyekSection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const kategoriAktif = getKategoriAktif(searchParams);

  const proyekTersaring =
    kategoriAktif === "Semua" ? projects : projects.filter((proyek) => proyek.category === kategoriAktif);

  function resetFilter() {
    const next = new URLSearchParams(searchParams);
    next.delete("kategori");
    setSearchParams(next);
  }

  return (
    <section id="proyek" className="py-section-py px-section-px">
      <div className="mx-auto flex max-w-content flex-col gap-8">
        <div className="flex flex-col gap-6">
          <h2 className="font-heading text-h2 font-semibold text-ink">Hasil Proyek</h2>
          <FilterKategori />
        </div>

        {proyekTersaring.length === 0 ? (
          <div className="flex flex-col items-start gap-4 rounded-lg border border-line bg-bg-raised p-8">
            <p className="text-body text-ink-muted">
              Belum ada proyek di kategori &ldquo;{kategoriAktif}&rdquo;. Kategori ini memang belum terisi saat
              rilis.
            </p>
            <button
              type="button"
              onClick={resetFilter}
              className="min-h-[44px] rounded-md border border-line-strong px-5 text-body-sm text-ink hover:border-focus"
            >
              Tampilkan semua proyek
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-5">
            {proyekTersaring.map((proyek) => (
              <KartuProyek key={proyek.slug} proyek={proyek} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
