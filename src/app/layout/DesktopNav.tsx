import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS } from "./navItems";

interface DesktopNavProps {
  activeId: string | null;
}

export function DesktopNav({ activeId }: DesktopNavProps) {
  const navRef = useRef<HTMLUListElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    function measureIndicator() {
      const nav = navRef.current;
      if (!nav) return;
      const activeLink = nav.querySelector<HTMLAnchorElement>(`a[href="#${activeId}"]`);
      if (!activeLink) {
        setIndicator({ left: 0, width: 0 });
        return;
      }
      const navRect = nav.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setIndicator({ left: linkRect.left - navRect.left, width: linkRect.width });
    }
    measureIndicator();
    window.addEventListener("resize", measureIndicator);
    return () => window.removeEventListener("resize", measureIndicator);
  }, [activeId]);

  return (
    <nav aria-label="Navigasi utama" className="hidden md:block">
      <ul ref={navRef} className="relative flex items-center gap-7">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "true" : undefined}
              className={`text-body-sm transition-colors ${
                activeId === item.id ? "text-ink" : "text-ink-muted hover:text-ink"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
        {/* Indikator lebar 1px yang di-translate+scale dari titik jangkar kiri (bukan animasi
            `left`/`width` langsung) — `left`/`width` memicu reflow tata letak, `transform`
            tidak. Prinsip performa dari Emil Kowalski: animasikan hanya transform/opacity. */}
        <span
          aria-hidden="true"
          className="absolute -bottom-2 left-0 h-0.5 w-px origin-left bg-accent-a transition-transform duration-200 ease-standard"
          style={{ transform: `translateX(${indicator.left}px) scaleX(${indicator.width})` }}
        />
      </ul>
    </nav>
  );
}
