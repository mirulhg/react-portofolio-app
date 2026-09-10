# Prompt lanjutan — Fase 4 (Gerakan & Interaksi)

Prompt ini ditulis untuk ditempel ke sesi Claude Code baru (tidak punya memori percakapan
sebelumnya). Baca dulu tiga dokumen di `Docs/` sebelum menulis kode apa pun:

1. `Docs/CLAUDE.md` — kontrak kerja wajib, semua aturan di sana mengikat.
2. `Docs/HANDOFF.md` — spek desain & implementasi, terutama tabel "Gerakan" di §1.
3. `Docs/PRD-Portofolio-Interaktif.md` — kriteria penerimaan F8 (Gerakan & Interaksi).

---

## Status saat ini

**Fase 1–3 sudah selesai** (Beranda, Navigasi, Tentang, Proyek, Sedang Berjalan, Kerja Sama,
Kontak) dan sudah direview terhadap spec. Situs sudah lengkap secara struktur/fitur. Sebagian
besar Fase 4 **sudah ikut terbangun** sejak Fase 1 (HANDOFF §7.4 sudah memperingatkan ini):

- `useRevealOnce` + `useReducedMotion` sudah ada di `shared/hooks/`, tapi **baru dipakai di dua
  tempat**: `Hero.tsx` dan `BatangKemajuan.tsx`. Cek dengan `grep -rl useRevealOnce src` untuk
  verifikasi sebelum menambah — jangan bikin hook baru, reuse yang sudah ada.
- Semua transisi CSS situs otomatis dimatikan lewat media query global di `styles/tokens.css`
  (`@media (prefers-reduced-motion: reduce)` men-set semua `transition-duration`/
  `animation-duration` ke `0.01ms`). Ini sudah menutupi sebagian besar syarat "hormati
  prefers-reduced-motion" — jangan tulis ulang logika ini di komponen manapun.
- Hover state sudah ada di banyak tempat (`grep -rn "hover:" src` → 12 lokasi): kartu, tombol,
  tautan nav. **Belum ada state `:active` (ditekan) di manapun** — cek dengan
  `grep -rn "active:" src`, hasilnya kosong.
- Tidak ada fallback `<noscript>` di `index.html`.

## Gap yang perlu kamu tangani, urut prioritas

### 1. Terapkan reveal-on-scroll secara konsisten (PRD F8, HANDOFF §1)

`useRevealOnce` saat ini cuma dipakai Hero dan batang kemajuan. HANDOFF §1 mendeskripsikan pola
"Elemen masuk layar: opacity+translateY(12px) 320ms ease-out, sekali" sebagai pola umum, bukan
khusus Hero. Terapkan ke elemen section yang belum punya:

- Judul + isi `TentangSection`
- Header section + tiap kartu `ProyekSection` / `KartuProyek` (hati-hati: kalau tiap kartu
  observer sendiri-sendiri, itu wajar dan sesuai pola "sekali" per elemen)
- `KerjasamaSection` (lini alur, tabel harga, kartu ketentuan)
- `KontakSection`

Jangan animasikan ulang saat filter proyek berubah atau saat re-render biasa — hanya saat elemen
pertama kali masuk viewport, sama seperti `BatangKemajuan` sekarang. Ingat prinsip HANDOFF: efek
visual boleh ada, tapi **satu momen saja** yang menonjol di tiap layar — jangan semua section
punya fade-and-slide-up yang identik dan berulang sehingga terasa generik (CLAUDE.md §7 daftar
larangan eksplisit menyebut ini sebagai ciri kode AI-slop). Variasikan sedikit tempo/skala
kemunculan antar section kalau perlu, atau batasi ke elemen yang benar-benar butuh penekanan.

### 2. Tambahkan state `:active` (ditekan) di elemen interaktif utama (PRD F8)

PRD eksplisit: "Setiap elemen interaktif punya keadaan hover, aktif, fokus, dan nonaktif yang
berbeda." Fokus dan nonaktif sudah ada (fokus lewat `:focus-visible` global, nonaktif lewat
`disabled:` di tombol submit & `Button.tsx`). Tambahkan `active:` di:

- `Button.tsx` (dipakai di banyak tempat)
- `KartuProyek.tsx`
- Chip `FilterKategori.tsx`
- Tombol kirim `KontakForm.tsx`

Buat state aktif terasa seperti "ditekan" — bukan animasi baru yang mencolok, cukup subtle
(mis. hilangkan `-translate-y-0.5` dari hover atau kurangi jadi `translate-y-0` saat `:active`,
supaya terasa seperti tombol fisik yang tertekan). Jangan tambah warna/skala baru di luar token
yang sudah ada.

### 3. Fallback `<noscript>` di `index.html` (PRD F8: "konten tetap terbaca penuh bila JavaScript
gagal dimuat")

**Baca ini dengan teliti sebelum mengerjakan — ini bukan tugas yang bisa diselesaikan penuh
tanpa keputusan arsitektur:**

Situs ini adalah SPA React murni (client-side render, tanpa SSR/prerendering). Tanpa JavaScript,
`<div id="root">` akan benar-benar kosong — tidak ada cara membuat "konten tetap terbaca penuh"
tanpa JS kecuali menambah server-side rendering atau static prerendering, yang merupakan
perubahan arsitektur besar dan **di luar cakupan Fase 4**.

Yang bisa dan harus kamu kerjakan sekarang: tambahkan elemen `<noscript>` di `index.html` berisi
pesan singkat yang jelas (nama, peran, dan cara menghubungi lewat kanal statis — bukan lewat
form) supaya pengunjung tanpa JS setidaknya dapat informasi minimal, bukan halaman kosong total.
**Laporkan eksplisit ke Amirul bahwa ini pemenuhan sebagian, bukan penuh** — kriteria PRD F8 soal
"konten tetap terbaca penuh" baru benar-benar terpenuhi kalau nanti situs pindah ke framework
dengan SSR/prerendering (mis. Next.js, Astro, atau Vite SSG plugin). Jangan klaim ini "selesai"
tanpa catatan itu.

### 4. Verifikasi CLS ≤ 0.1 (PRD, non-fungsional §7)

Cek ulang semua elemen yang baru ditambah Fase 2–3 (kartu proyek, kartu berjalan, form) tidak
menyebabkan pergeseran tata letak saat animasi masuk-layar berjalan — gunakan `transform`/
`opacity` saja (bukan `height`/`margin`/`top` yang berubah), sama seperti pola yang sudah dipakai
`Hero.tsx` dan `BatangKemajuan.tsx`. Kartu proyek sudah punya tinggi sampul tetap 176px
(HANDOFF §4) jadi aman; pastikan reveal animation baru di langkah 1 tidak melanggar prinsip yang
sama.

---

## Sebelum lapor selesai

- Jalankan `tsc -b --noEmit`, `npm run lint`, `npm run build` penuh — semua harus bersih.
- Cek Definition of Done CLAUDE.md §14 lengkap.
- Uji manual: scroll seluruh halaman dan lihat tiap section muncul sekali dengan wajar; nyalakan
  "reduce motion" di OS/peramban dan pastikan semua animasi mati total; coba klik-tahan
  (mousedown) tombol/kartu untuk melihat state aktif; buka DevTools → matikan JavaScript → lihat
  apa yang masih terbaca.
- Laporkan eksplisit sebagai gap yang diketahui (bukan disembunyikan): fallback `<noscript>`
  hanya pemenuhan sebagian dari syarat "konten terbaca tanpa JS" — solusi penuh butuh
  SSR/prerendering yang di luar cakupan Fase 4.
- Untuk tugas yang menyentuh >2 file, tulis rencana singkat dan tunggu persetujuan dulu
  (CLAUDE.md §15). Ringkasan akhir maksimal 5 baris.
