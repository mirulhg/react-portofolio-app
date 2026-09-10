import { LiniAlurKerja } from "./LiniAlurKerja";
import { TabelHarga } from "./TabelHarga";
import { KartuKetentuan } from "./KartuKetentuan";

export function KerjasamaSection() {
  return (
    <section id="kerjasama" className="py-section-py px-section-px">
      <div className="mx-auto flex max-w-content flex-col gap-9">
        <h2 className="font-heading text-h2 font-semibold text-ink">Kerja Sama</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-label uppercase text-ink-faint">Alur Kerja</h3>
          <LiniAlurKerja />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-label uppercase text-ink-faint">Biaya</h3>
          <TabelHarga />
        </div>

        <KartuKetentuan />
      </div>
    </section>
  );
}
