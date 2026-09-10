interface LangkahAlurKerja {
  no: string;
  judul: string;
  durasi: string;
}

const ALUR_KERJA: LangkahAlurKerja[] = [
  { no: "01", judul: "Konsultasi & lingkup", durasi: "1–2 hari kerja" },
  { no: "02", judul: "Proposal & kontrak", durasi: "2–3 hari kerja" },
  { no: "03", judul: "Desain & purwarupa", durasi: "5–7 hari kerja" },
  { no: "04", judul: "Pengembangan", durasi: "10–15 hari kerja" },
  { no: "05", judul: "Uji & serah terima", durasi: "3–5 hari kerja" },
];

export function LiniAlurKerja() {
  return (
    <ol className="grid gap-6 sm:grid-cols-5">
      {ALUR_KERJA.map((langkah) => (
        <li key={langkah.no} className="flex flex-col gap-2">
          <span className="font-mono text-body-sm tabular-nums text-ink-faint">{langkah.no}</span>
          <span className="font-heading text-body font-semibold text-ink">{langkah.judul}</span>
          <span className="text-body-sm text-ink-muted">{langkah.durasi}</span>
        </li>
      ))}
    </ol>
  );
}
