import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDialogA11y } from "../../shared/hooks/useDialogA11y";
import { NAV_ITEMS } from "./navItems";

interface MobileNavProps {
  activeId: string | null;
}

export function MobileNav({ activeId }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useDialogA11y(drawerRef, isOpen, () => setIsOpen(false));

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-controls="drawer-navigasi"
        className="flex h-11 w-11 items-center justify-center rounded-md md:hidden"
      >
        <span className="sr-only">Buka menu navigasi</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      {createPortal(
        // Portal ke <body>: <header> pakai backdrop-blur, yang diam-diam jadi containing
        // block untuk descendant position:fixed dan merusak inset-y-0 (bug yang pernah
        // terjadi). Render di luar subtree header menghindarinya sama sekali.
        <>
          <div
            aria-hidden={!isOpen}
            onClick={() => setIsOpen(false)}
            className={`fixed inset-0 z-40 bg-bg-base transition-opacity duration-200 ease-out md:hidden ${
              isOpen ? "pointer-events-auto opacity-70" : "pointer-events-none opacity-0"
            }`}
          />
          <div
            ref={drawerRef}
            id="drawer-navigasi"
            role="dialog"
            aria-modal="true"
            aria-label="Navigasi"
            aria-hidden={!isOpen}
            className={`fixed inset-y-0 right-0 z-50 flex w-[min(320px,80vw)] flex-col gap-6 bg-bg-raised p-6 shadow-xl transition-transform duration-[240ms] ease-standard md:hidden ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              type="button"
              tabIndex={isOpen ? 0 : -1}
              onClick={() => setIsOpen(false)}
              className="ml-auto flex h-11 w-11 items-center justify-center rounded-md"
            >
              <span className="sr-only">Tutup menu</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
            <ul className="flex flex-col gap-5">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    tabIndex={isOpen ? 0 : -1}
                    onClick={() => setIsOpen(false)}
                    aria-current={activeId === item.id ? "true" : undefined}
                    className={`text-h3 ${activeId === item.id ? "text-ink" : "text-ink-muted"}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>,
        document.body,
      )}
    </>
  );
}
