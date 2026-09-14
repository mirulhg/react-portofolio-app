import { isLebihDari30Hari } from "../../shared/lib/format";
import { ongoingProjects } from "./data/ongoing";
import { BatangKemajuan } from "./BatangKemajuan";
import { hitungPersenSelesai } from "./types";

const JUMLAH_PREVIEW = 2;

function ambilProyekTerbaru() {
  return [...ongoingProjects].sort((a, b) => b.diperbarui.localeCompare(a.diperbarui)).slice(0, JUMLAH_PREVIEW);
}

export function PreviewBerjalan() {
  const proyekTerbaru = ambilProyekTerbaru();

  if (proyekTerbaru.length === 0) {
    return null;
  }

  return (
    <a
      href="#berjalan"
      className="flex w-full flex-col gap-4 rounded-lg border border-line bg-bg-raised p-5 transition-transform duration-[170ms] ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]"
    >
      <p className="text-label uppercase text-ink-faint">Sedang Berjalan</p>
      <div className="flex flex-col gap-4">
        {proyekTerbaru.map((proyek) => (
          <div key={proyek.id} className="flex flex-col gap-2">
            <p className="text-body-sm font-medium text-ink">{proyek.title}</p>
            <BatangKemajuan
              persen={hitungPersenSelesai(proyek.tahap)}
              namaProyek={proyek.title}
              isBasi={isLebihDari30Hari(proyek.diperbarui)}
            />
          </div>
        ))}
      </div>
    </a>
  );
}
