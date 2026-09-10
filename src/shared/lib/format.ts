const FORMAT_TANGGAL_INDONESIA = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatTanggalIndonesia(tanggalIso: string): string {
  return FORMAT_TANGGAL_INDONESIA.format(new Date(tanggalIso));
}

const SATU_HARI_MS = 24 * 60 * 60 * 1000;

export function isLebihDari30Hari(tanggalIso: string): boolean {
  const berlaluMs = Date.now() - new Date(tanggalIso).getTime();
  return berlaluMs > 30 * SATU_HARI_MS;
}

const FORMAT_RUPIAH = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function rupiah(nilai: number): string {
  return FORMAT_RUPIAH.format(nilai);
}
