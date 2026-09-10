import { rupiah } from "../../shared/lib/format";

interface PaketHarga {
  nama: string;
  deskripsi: string;
  harga: { min: number; max: number } | { perHari: number };
}

// Placeholder — angka karangan yang masuk akal, ganti sebelum tayang (HANDOFF §7.2).
const PAKET_HARGA: PaketHarga[] = [
  {
    nama: "Landing Page / Situs Profil",
    deskripsi: "Satu halaman atau situs profil ringkas, siap rilis.",
    harga: { min: 2_500_000, max: 5_000_000 },
  },
  {
    nama: "Toko Online / Dasbor",
    deskripsi: "Proyek dengan alur data, autentikasi, atau checkout.",
    harga: { min: 6_000_000, max: 12_000_000 },
  },
  {
    nama: "Kerja lepas harian",
    deskripsi: "Bergabung sementara di tim yang sudah berjalan.",
    harga: { perHari: 600_000 },
  },
];

function formatHarga(harga: PaketHarga["harga"]): string {
  if ("perHari" in harga) {
    return `${rupiah(harga.perHari)} / hari`;
  }
  return `${rupiah(harga.min)}–${rupiah(harga.max)}`;
}

export function TabelHarga() {
  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-hidden rounded-lg border border-line">
        {PAKET_HARGA.map((paket) => (
          <div
            key={paket.nama}
            className="flex flex-col gap-2 border-b border-line p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
          >
            <div>
              <p className="font-heading text-body font-semibold text-ink">{paket.nama}</p>
              <p className="text-body-sm text-ink-muted">{paket.deskripsi}</p>
            </div>
            <p className="font-heading tabular-nums text-accent-c sm:whitespace-nowrap">{formatHarga(paket.harga)}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1 text-body-sm text-ink-muted">
        <p>
          <span className="font-medium text-ink">Metode pembayaran:</span> transfer bank.
        </p>
        <p>
          <span className="font-medium text-ink">Termin:</span> DP 50% di awal, pelunasan saat serah terima.
        </p>
      </div>
    </div>
  );
}
