import { Hero } from "../features/beranda/Hero";
import { TentangSection } from "../features/tentang/TentangSection";
import { ProyekSection } from "../features/proyek";
import { BerjalanSection } from "../features/berjalan";
import { KerjasamaSection } from "../features/kerjasama/KerjasamaSection";
import { KontakSection } from "../features/kontak/KontakSection";

export function HomePage() {
  return (
    <main>
      <Hero />
      <TentangSection />
      <ProyekSection />
      <BerjalanSection />
      <KerjasamaSection />
      <KontakSection />
    </main>
  );
}
