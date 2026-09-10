# Prompt lanjutan — Fase 2 (Tentang, Proyek, Sedang Berjalan)

Prompt ini ditulis untuk ditempel ke sesi Claude Code baru (tidak punya memori percakapan
sebelumnya). Baca dulu tiga dokumen di `Docs/` sebelum menulis kode apa pun:

1. `Docs/CLAUDE.md` — kontrak kerja wajib, semua aturan di sana mengikat.
2. `Docs/HANDOFF.md` — spek desain & implementasi (token, struktur folder, perilaku per section).
3. `Docs/PRD-Portofolio-Interaktif.md` — kebutuhan produk & kriteria penerimaan per fitur.

---

## Status saat ini

Fase 1 (Beranda + Navigasi) sudah selesai:

- `src/styles/tokens.css` + `tailwind.config.ts` — token warna/tipografi/spasi/radius sudah dipetakan.
- `src/app/layout/SiteHeader.tsx` — sticky header, progress bar gulir, section aktif dari geometri
  (satu scroll listener), indikator garis nav, drawer mobile dengan focus trap.
- `src/app/layout/SiteFooter.tsx` — nav ulang + copyright.
- `src/app/layout/navItems.ts` — sumber tunggal daftar section, dipakai header & footer.
- `src/features/beranda/Hero.tsx` + `KapasitasBadge.tsx` — hero dengan glow dekoratif, badge kapasitas
  yang hilang total (bukan "0 slot") saat `slotTersedia <= 0`.
- `src/shared/hooks/`: `useReducedMotion`, `useRevealOnce`, `useScrollHeader`.
- `src/shared/ui/Button.tsx`.

## Isu yang belum diselesaikan — tangani lebih dulu

1. **`node_modules` rusak di environment ini.** `npx oxlint` dan `npx vite build` gagal dengan
   `Cannot find native binding` (bug npm optional-dependencies). Perbaiki dengan
   `rm -rf node_modules package-lock.json && npm i`, lalu pastikan `tsc -b --noEmit`, lint, dan
   build semua lolos sebelum lanjut — jangan kerjakan Fase 2 di atas toolchain yang belum terbukti jalan.
2. **`SiteHeader.tsx` 181 baris**, melebihi batas 150 baris di `CLAUDE.md` §3. Pecah jadi
   sub-komponen (mis. `DesktopNav.tsx`, `MobileDrawer.tsx`, `ScrollProgressBar.tsx`) di
   `app/layout/`. Kerjakan sebagai langkah terpisah dari Fase 2, jangan diamkan.

## Dependency yang dibutuhkan Fase 2

Fase 2 butuh `zod` (skema data Proyek & ProyekBerjalan, HANDOFF §3) dan `react-router-dom`
(rute `/proyek/:slug`, HANDOFF §4 bagian Detail Proyek). **Sebelum `npm install`, ikuti
CLAUDE.md §0.5**: sebutkan nama paket, alasan, ukuran, dan alternatif tanpa paket — tunggu
persetujuan Amirul dulu.

---

## Tugas: bangun tiga fitur Fase 2

### F3 — Tentang (`features/tentang/`)

- `TentangSection.tsx`: kisah singkat maks 150 kata, keahlian sebagai **daftar terkelompok**
  (bukan bilah persentase — PRD F3 eksplisit melarang ini karena tidak bisa diverifikasi),
  prinsip kerja 3–5 poin satu kalimat masing-masing.
- Data boleh inline sebagai konstanta bertanda jelas "placeholder, ganti sebelum tayang"
  seperti pola di `Hero.tsx`, kecuali Amirul sudah punya isi asli untuk bagian ini.

### F4 — Proyek (`features/proyek/`)

Struktur sesuai HANDOFF §2: `ProyekSection.tsx` (judul + filter + grid + empty state),
`FilterKategori.tsx`, `KartuProyek.tsx`, `DetailProyekModal.tsx`, `data/projects.ts` + `types.ts`.

- Skema Zod `proyekSchema` persis seperti didefinisikan di HANDOFF §3.
- Filter: 6 chip termasuk "Semua", `aria-pressed` mengikuti state, **disimpan di URL search param**
  (`?kategori=`) bukan `useState` — lihat tangga state CLAUDE.md §4.
- Grid: `repeat(auto-fill, minmax(min(100%, 300px), 1fr))`, gap 20px. Kartu adalah `<button>`,
  sampul tinggi tetap 176px.
- **Empty state wajib untuk kategori "Aplikasi Mobile"** — itu memang kosong saat rilis per
  HANDOFF, bukan bug. Sertakan tombol reset ke "Semua".
- Minimal 6 proyek placeholder yang masuk akal (PRD F4), data karangan yang jelas ditandai
  untuk diganti — jangan mengklaim itu proyek nyata.
- Detail: **satu komponen** melayani modal (dibuka dari grid, `navigate` dengan
  `state.modal = true`) dan halaman penuh di rute `/proyek/:slug` (diakses langsung/reload) —
  isinya identik, sumber kebenaran adalah rute. Modal: `role="dialog"`, `aria-modal`,
  `aria-labelledby`, fokus pindah ke panel saat buka dan **kembali ke kartu pemicu** saat tutup,
  Esc + klik latar menutup, fokus terkunci, `body` overflow hidden, header panel sticky, di
  seluler naik dari bawah. Urutan isi: sampul → Masalahnya → Peran saya → Prosesnya (list
  bernomor) → Hasilnya (kotak `--bg-alt`) → tombol buka situs, atau teks "Situs sudah tidak
  tayang" kalau `tautan === null` (jangan tombol mati).

### F5 — Sedang Berjalan (`features/berjalan/`)

Struktur: `BerjalanSection.tsx`, `KartuBerjalan.tsx`, `BatangKemajuan.tsx`, `data/ongoing.ts`.

- Skema Zod `proyekBerjalanSchema` + `tahapSchema` persis seperti HANDOFF §3.
- Batang kemajuan `role="progressbar"` dengan `aria-valuenow/min/max` dan `aria-label` berisi
  nama proyek. Animasikan tumbuh **sekali** saat masuk layar — pakai `useRevealOnce` yang sudah
  ada, jangan bikin ulang.
- **Kemajuan basi**: kalau `diperbarui` > 30 hari lalu, batang pakai `--ink-muted` bukan
  `--grad-accent`, tambah teks "belum diperbarui".
- Tahap: tiga status visual berbeda (centang hijau / cincin magenta berisi / cincin abu kosong).
- Proyek anonim: label mono "NDA" + satu baris penjelasan di `catatanAnonim`.

---

## Keputusan terbuka — TANYAKAN ke Amirul, jangan menebak (CLAUDE.md §0.4)

1. Proyek NDA ditampilkan anonim ("Klien A" + label NDA), atau tidak ditampilkan sama sekali?
2. Berapa proyek nyata yang siap tayang saat rilis? (PRD: di bawah 4, galeri berfilter terasa kosong)
3. Info harga untuk Fase 3 nanti: rentang, harga mulai, atau paket tetap — dan angka aslinya
   berapa (bukan karangan seperti di prototipe)?
4. Update progres "Sedang Berjalan": edit manual berkas TS tiap Jumat (usulan HANDOFF §6), atau
   ditarik dari alat lain yang sudah dipakai?
5. Belum ada satu pun aset visual (screenshot). Pakai placeholder bergaris dulu sampai ada foto
   asli — konfirmasi ini oke untuk sementara?

## Sebelum lapor selesai

Cek Definition of Done CLAUDE.md §14 secara penuh (tsc bersih, lint bersih, tanpa `any`/
`console.log`/`TODO`, keyboard-operable penuh, rapi di 375px & 1440px, semua nilai visual dari
token, diff hanya menyentuh yang relevan). Untuk tugas yang menyentuh >2 file, tulis rencana
singkat dan tunggu persetujuan dulu (CLAUDE.md §15). Ringkasan akhir maksimal 5 baris.
