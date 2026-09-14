import { Hero } from "../features/beranda";
import { TentangSection } from "../features/tentang";
import { ProyekSection } from "../features/proyek";
import { BerjalanSection } from "../features/berjalan";
import { ProjectZeroSection } from "../features/projectzero";
import { KerjasamaSection } from "../features/kerjasama";
import { KontakSection } from "../features/kontak";

export function HomePage() {
  return (
    <main>
      <Hero />
      <TentangSection />
      <ProyekSection />
      <BerjalanSection />
      <ProjectZeroSection />
      <KerjasamaSection />
      <KontakSection />
    </main>
  );
}
