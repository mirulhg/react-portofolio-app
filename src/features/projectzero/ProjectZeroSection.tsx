import { BatangKemajuan } from "../berjalan";
import { proyekGame } from "./data/gameProjects";

export function ProjectZeroSection() {
  return (
    <section id="project-zero" className="py-section-py px-section-px">
      <div className="mx-auto flex max-w-content flex-col gap-8">
        <h2 className="font-heading text-h2 font-semibold text-ink">ProjectZero / Game Development</h2>
        <div className="flex flex-col gap-6 rounded-lg border border-line bg-bg-raised p-6">
          {proyekGame.map((proyek) => (
            <div key={proyek.id} className="flex flex-col gap-2">
              <span className="text-label uppercase text-ink-faint">Code Project</span>
              <p className="font-heading text-body font-semibold text-ink">{proyek.judul}</p>
              <BatangKemajuan persen={proyek.persen} namaProyek={proyek.judul} isBasi={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
