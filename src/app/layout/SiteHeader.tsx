import { useScrollHeader } from "../../shared/hooks/useScrollHeader";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { ScrollProgressBar } from "./ScrollProgressBar";
import { SECTION_IDS } from "./navItems";

export function SiteHeader() {
  const { progress, activeId } = useScrollHeader(SECTION_IDS);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[var(--header-bg)] backdrop-blur-md">
      <div className="mx-auto flex max-w-content items-center justify-between px-section-px py-4">
        <a href="#beranda" className="font-heading text-h3 font-semibold text-ink">
          Portofolio
        </a>
        <DesktopNav activeId={activeId} />
        <MobileNav activeId={activeId} />
      </div>
      <ScrollProgressBar progress={progress} />
    </header>
  );
}
