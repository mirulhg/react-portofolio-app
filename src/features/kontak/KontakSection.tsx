import { KartuKanalKontak } from "./KartuKanalKontak";
import { KontakForm } from "./KontakForm";

export function KontakSection() {
  return (
    <section id="kontak" className="py-section-py px-section-px">
      <div className="mx-auto flex max-w-content flex-col gap-9">
        <h2 className="font-heading text-h2 font-semibold text-ink">Kontak</h2>
        <KartuKanalKontak />
        <KontakForm />
      </div>
    </section>
  );
}
