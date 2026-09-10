import { NAV_ITEMS } from "./navItems";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg-alt">
      <div className="mx-auto flex max-w-content flex-col gap-8 px-section-px py-9 md:flex-row md:items-start md:justify-between">
        <div className="flex max-w-[38ch] flex-col gap-2">
          <a href="#beranda" className="font-heading text-h3 font-semibold text-ink">
            Portofolio
          </a>
          <p className="text-body-sm text-ink-muted">
            Situs dan dasbor untuk klien — dari ide sampai rilis.
          </p>
        </div>

        <nav aria-label="Navigasi footer">
          <ul className="flex flex-col gap-3 md:flex-row md:gap-7">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-body-sm text-ink-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-content flex-col-reverse items-center gap-3 px-section-px py-5 text-body-sm text-ink-muted md:flex-row md:justify-between">
          <p>© {year} Portofolio. Semua hak cipta dilindungi.</p>
          <a href="#beranda" className="text-ink-muted transition-colors hover:text-ink">
            Kembali ke atas
          </a>
        </div>
      </div>
    </footer>
  );
}
