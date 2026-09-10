// Placeholder — kisah, keahlian, dan prinsip kerja belum konten asli, ganti sebelum tayang
// (pola sama seperti Hero.tsx, HANDOFF §7.2).
const KISAH_SINGKAT =
  "Saya front-end engineer yang fokus membangun situs dan dasbor yang benar-benar dipakai, " +
  "bukan sekadar terlihat bagus di demo. Perjalanan saya dimulai dari proyek kecil untuk usaha " +
  "teman dan keluarga, lalu berkembang ke produk dengan pengguna nyata yang butuh performa dan " +
  "aksesibilitas serius. Saya percaya kode yang baik itu membosankan — mudah dibaca, mudah " +
  "diubah, dan tidak menyimpan kejutan. Setiap proyek saya perlakukan seolah saya sendiri yang " +
  "akan merawatnya setahun ke depan. Di luar coding, saya suka membaca dokumentasi sampai detail " +
  "kecil dan menguji situs saya sendiri pakai keyboard saja untuk memastikan semua orang bisa " +
  "memakainya.";

const KELOMPOK_KEAHLIAN = [
  { kelompok: "Front-End", item: ["React", "TypeScript", "Tailwind CSS", "Aksesibilitas (WCAG)"] },
  { kelompok: "Alat & Alur Kerja", item: ["Vite", "Git", "Figma-ke-kode", "Playwright"] },
  { kelompok: "Kolaborasi", item: ["Menerjemahkan kebutuhan klien", "Dokumentasi serah-terima", "Revisi terukur"] },
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

        <div className="grid gap-6 sm:grid-cols-3">
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
