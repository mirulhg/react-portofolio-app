const KETENTUAN = [
  {
    label: "Kepemilikan hasil",
    nilai: "Kode dan aset jadi milik klien sepenuhnya setelah pelunasan.",
  },
  {
    label: "Jumlah revisi",
    nilai: "2× revisi besar per tahap. Revisi kecil (teks, warna) tidak dibatasi.",
  },
  {
    label: "Kebijakan pembatalan",
    nilai: "DP tidak dikembalikan kalau proyek dibatalkan setelah pengembangan dimulai.",
  },
] as const;

export function KartuKetentuan() {
  return (
    <dl className="grid gap-6 rounded-lg border border-line bg-bg-raised p-6 sm:grid-cols-3">
      {KETENTUAN.map((item) => (
        <div key={item.label} className="flex flex-col gap-2">
          <dt className="text-label uppercase text-ink-faint">{item.label}</dt>
          <dd className="text-body-sm text-ink-muted">{item.nilai}</dd>
        </div>
      ))}
    </dl>
  );
}
