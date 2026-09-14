import { BatangKemajuan } from "../berjalan";
import { proyekGame } from "./data/gameProjects";

export function PreviewProjectZero() {
  if (proyekGame.length === 0) {
    return null;
  }

  return (
    <a
      href="#project-zero"
      className="flex w-full flex-col gap-4 rounded-lg border border-line bg-bg-raised p-5 transition-transform duration-[170ms] ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]"
    >
      <p className="text-label uppercase text-ink-faint">ProjectZero / Game Development</p>
      <div className="flex flex-col gap-4">
        {proyekGame.map((proyek) => (
          <div key={proyek.id} className="flex flex-col gap-2">
            <p className="text-body-sm font-medium text-ink">{proyek.judul}</p>
            <BatangKemajuan persen={proyek.persen} namaProyek={proyek.judul} isBasi={false} />
          </div>
        ))}
      </div>
    </a>
  );
}
