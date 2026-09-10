interface KapasitasBadgeProps {
  slotTersedia: number;
}

export function KapasitasBadge({ slotTersedia }: KapasitasBadgeProps) {
  if (slotTersedia <= 0) return null;

  return (
    <span className="inline-flex items-center gap-2 rounded-pill border border-line-strong bg-bg-raised px-4 py-2 text-label uppercase text-ok-ink">
      <span aria-hidden="true" className="h-2 w-2 rounded-pill bg-ok" />
      {slotTersedia} slot terbuka bulan ini
    </span>
  );
}
