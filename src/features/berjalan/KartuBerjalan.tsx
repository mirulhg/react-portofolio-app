import { formatTanggalIndonesia, isLebihDari30Hari } from "../../shared/lib/format";
import { BatangKemajuan } from "./BatangKemajuan";
import { hitungPersenSelesai, type ProyekBerjalan, type Tahap } from "./types";

interface KartuBerjalanProps {
  proyek: ProyekBerjalan;
}

function IkonStatusTahap({ status }: { status: Tahap["status"] }) {
  if (status === "selesai") {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 shrink-0">
        <circle cx="10" cy="10" r="9" fill="var(--ok)" />
        <path
          d="M6 10.5l2.5 2.5L14 7.5"
          stroke="var(--bg-base)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (status === "jalan") {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 shrink-0">
        <circle cx="10" cy="10" r="8" fill="none" stroke="var(--accent-a)" strokeWidth="2" />
        <circle cx="10" cy="10" r="4" fill="var(--accent-a)" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 shrink-0">
      <circle cx="10" cy="10" r="8" fill="none" stroke="var(--line-strong)" strokeWidth="2" />
    </svg>
  );
}

const STATUS_LABEL: Record<Tahap["status"], string> = {
  selesai: "selesai",
  jalan: "sedang dikerjakan",
  belum: "belum mulai",
};

export function KartuBerjalan({ proyek }: KartuBerjalanProps) {
  const persen = hitungPersenSelesai(proyek.tahap);
  const basi = isLebihDari30Hari(proyek.diperbarui);

  return (
    <div className="flex flex-col gap-5 rounded-lg border border-line bg-bg-raised p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-label uppercase text-ink-faint">{proyek.category}</span>
        {proyek.anonim && (
          <span className="rounded-pill border border-line-strong px-2 py-0.5 font-mono text-label text-ink-muted">
            NDA
          </span>
        )}
      </div>

      <h3 className="font-heading text-h3 font-semibold text-ink">{proyek.title}</h3>

      {proyek.anonim && proyek.catatanAnonim && (
        <p className="text-body-sm text-ink-muted">{proyek.catatanAnonim}</p>
      )}

      <BatangKemajuan persen={persen} namaProyek={proyek.title} isBasi={basi} />

      <ul className="flex flex-col gap-2">
        {proyek.tahap.map((tahap) => (
          <li key={tahap.label} className="flex items-center gap-3 text-body-sm text-ink-muted">
            <IkonStatusTahap status={tahap.status} />
            <span>
              {tahap.label} <span className="sr-only">({STATUS_LABEL[tahap.status]})</span>
            </span>
          </li>
        ))}
      </ul>

      <p className="text-body-sm text-ink-faint">Diperbarui {formatTanggalIndonesia(proyek.diperbarui)}</p>
    </div>
  );
}
