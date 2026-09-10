import { ongoingProjects } from "./data/ongoing";
import { KartuBerjalan } from "./KartuBerjalan";

export function BerjalanSection() {
  return (
    <section id="berjalan" className="py-section-py px-section-px">
      <div className="mx-auto flex max-w-content flex-col gap-8">
        <h2 className="font-heading text-h2 font-semibold text-ink">Sedang Berjalan</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-5">
          {ongoingProjects.map((proyek) => (
            <KartuBerjalan key={proyek.id} proyek={proyek} />
          ))}
        </div>
      </div>
    </section>
  );
}
