const KISAH_SINGKAT =
  "Saya Amirul, frontend engineer yang juga menyebut diri vibe coder — masuk ke masalah lewat " +
  "eksperimen yang terukur, bukan cuma ikut resep. Asal Sanggau, Kalimantan Barat, sekarang " +
  "menetap di Yogyakarta dan terbuka bekerja remote dari mana saja. Saya membangun situs dan " +
  "dasbor yang benar-benar dipakai, bukan sekadar terlihat bagus di demo — performa dan " +
  "aksesibilitas jadi bagian dari definisi selesai, bukan tambahan di akhir. Di luar layar kode, " +
  "saya menghabiskan waktu main game dan main bola; keduanya mengajarkan hal yang sama: baca " +
  "situasi cepat, ambil keputusan, lalu evaluasi hasilnya. Prinsip itu saya bawa ke cara saya " +
  "bekerja dengan klien — komunikasi jujur soal kendala, revisi yang terukur, dan hasil yang " +
  "bisa dipertanggungjawabkan setahun ke depan.";

const KELOMPOK_KEAHLIAN = [
  { kelompok: "Front-End", item: ["React", "TypeScript", "Tailwind CSS", "Aksesibilitas (WCAG)"] },
  { kelompok: "Alat & Alur Kerja", item: ["Vite", "Git", "Figma-ke-kode", "Playwright"] },
  { kelompok: "Kolaborasi", item: ["Menerjemahkan kebutuhan klien", "Dokumentasi serah-terima", "Revisi terukur"] },
  { kelompok: "Keahlian Lain", item: ["Unity", "DaVinci Resolve"] },
] as const;

const PRINSIP_KERJA = [
  "Kode yang membosankan menang — saya pilih solusi paling sederhana yang benar-benar bekerja.",
  "Aksesibilitas bukan tambahan di akhir, tapi bagian dari definisi selesai.",
  "Saya laporkan kendala sejak dini, bukan menunggu tenggat mepet.",
  "Setiap keputusan desain punya alasan yang bisa saya jelaskan, bukan sekadar “terlihat bagus”.",
] as const;

export function TentangSection() {
  return (
    <section id="tentang" className="py-section-py px-section-px">
      <div className="mx-auto flex max-w-content flex-col gap-9">
        <h2 className="font-heading text-h2 font-semibold text-ink">Tentang</h2>

        <p className="max-w-[65ch] text-body text-ink-muted">{KISAH_SINGKAT}</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {KELOMPOK_KEAHLIAN.map((kelompok) => (
            <div key={kelompok.kelompok} className="flex flex-col gap-3">
              <h3 className="text-label uppercase text-ink-faint">{kelompok.kelompok}</h3>
              <ul className="flex flex-col gap-2">
                {kelompok.item.map((item) => (
                  <li key={item} className="text-body-sm text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-label uppercase text-ink-faint">Prinsip Kerja</h3>
          <ul className="flex flex-col gap-3">
            {PRINSIP_KERJA.map((prinsip) => (
              <li key={prinsip} className="flex gap-3 text-body text-ink-muted">
                <span aria-hidden="true" className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-pill bg-accent-a" />
                {prinsip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
