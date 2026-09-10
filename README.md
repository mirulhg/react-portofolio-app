# Portofolio Interaktif

Situs portofolio personal satu-halaman yang menampilkan identitas, keahlian, dan hasil
kerja kepada calon klien — dengan tambahan proyek yang **sedang berjalan** beserta
kemajuannya, dan penjelasan terbuka soal cara kerja sama, sehingga calon klien bisa
menilai kapasitas dan kecocokan sebelum menghubungi.

Dibangun dengan React + TypeScript + Vite + Tailwind CSS, mengikuti kontrak kerja
teknis dan spek desain di folder [`Docs/`](./Docs).

## Struktur

- `src/app/` — entry point, layout (header/footer/navigasi), halaman.
- `src/features/` — satu folder per bagian situs (beranda, tentang, proyek, berjalan,
  kerjasama, kontak). Tiap fitur hanya diakses lewat `index.ts`-nya sendiri.
- `src/shared/` — hook, util, dan komponen UI yang dipakai lintas fitur.

Aturan struktur dan kualitas kode yang mengikat ada di
[`Docs/CLAUDE.md`](./Docs/CLAUDE.md).

## Menjalankan proyek

```bash
npm install
npm run dev        # server pengembangan
npm run build       # type-check (tsc -b) + build produksi
npm run lint         # oxlint
npm run preview      # pratinjau hasil build
```

## Status

Fase 1–4 (lihat peta fitur di [`Docs/PRD-Portofolio-Interaktif.md`](./Docs/PRD-Portofolio-Interaktif.md))
sudah selesai dibangun secara fungsional. Yang masih tersisa sebelum tayang: konten &
data asli (identitas, proyek, harga, kanal kontak — semua masih placeholder), SEO dasar,
dan deployment. Riwayat keputusan dan prompt lanjutan tiap fase ada di
[`Docs/HANDOFF.md`](./Docs/HANDOFF.md) dan berkas `Docs/HANDOFF-FASE*.md`.
