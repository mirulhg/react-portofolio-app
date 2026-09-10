# Prompt lanjutan — Fase 3 (Kerja Sama, Kontak)

Prompt ini ditulis untuk ditempel ke sesi Claude Code baru (tidak punya memori percakapan
sebelumnya). Baca dulu tiga dokumen di `Docs/` sebelum menulis kode apa pun:

1. `Docs/CLAUDE.md` — kontrak kerja wajib, semua aturan di sana mengikat.
2. `Docs/HANDOFF.md` — spek desain & implementasi (token, struktur folder, perilaku per section).
3. `Docs/PRD-Portofolio-Interaktif.md` — kebutuhan produk & kriteria penerimaan per fitur.

---

## Status saat ini

**Fase 1 (Beranda + Navigasi) dan Fase 2 (Tentang, Proyek, Sedang Berjalan) sudah selesai** dan
sudah direview terhadap spec. Yang relevan untuk Fase 3:

- `src/shared/lib/format.ts` sudah ada, isinya `formatTanggalIndonesia()` dan
  `isLebihDari30Hari()`. **Tambahkan** `rupiah()` ke file ini, jangan bikin modul baru.
- `src/shared/hooks/useDialogA11y.ts` — hook fokus-trap/Esc/body-lock yang dipakai drawer nav dan
  modal proyek. Fase 3 tidak butuh dialog baru, tapi kalau ternyata butuh, pakai hook ini.
- `src/features/proyek` mengekspor `KATEGORI` lewat barrel (`export { KATEGORI } from "./types"`
  di `features/proyek/index.ts`) — form Kontak butuh daftar "jenis proyek", **impor dari barrel
  ini**, jangan duplikat daftar kategori.
- Sebuah pelanggaran nyata sudah diperbaiki: `tsconfig.app.json` sekarang punya `"strict": true`
  (sebelumnya tidak ada sama sekali, padahal CLAUDE.md §6 mewajibkan). Sudah diverifikasi 0 error
  baru. Jangan matikan ini.
- Keputusan NDA (proyek anonim ditampilkan "Klien A/B" + label NDA) **sudah dikonfirmasi Amirul,
  disetujui**. Pola yang sama (`anonim` + `catatanAnonim`) boleh dipakai lagi kalau relevan di
  Fase 3, tapi kemungkinan besar tidak relevan di sini.

## Verifikasi environment

Sesi sebelumnya sempat gagal menjalankan `oxlint` dan `vite build` di sandbox tertentu (bug
binding native npm, tidak terkait kode). **Di environment kamu sekarang, jalankan penuh**:
`tsc -b --noEmit`, `npm run lint`, dan `npm run build` — ketiganya harus bersih sebelum lapor
selesai. Jangan asumsikan ini "masalah environment" tanpa mencoba dulu.

## Dependency baru

HANDOFF §8 sudah menetapkan **React Hook Form + Zod** untuk semua form di proyek ini (Zod sudah
terpasang dari Fase 2). Install `react-hook-form` — sebutkan versi & ukuran ke Amirul sebelum
`npm install`, sesuai CLAUDE.md §0.5, meski pilihan library-nya sendiri sudah ditetapkan di
HANDOFF (bukan keputusan baru).

---

## Keputusan yang SUDAH diambil Amirul — ikuti persis, jangan tanya ulang

1. **Harga di Kerja Sama: placeholder dulu**, ditandai jelas "ganti sebelum tayang" (pola sama
   seperti data proyek/berjalan di Fase 2). Bukan angka final.
2. **Formulir Kontak: bangun UI + validasi saja.** Situs ini murni front-end, belum ada backend.
   Pengiriman sungguhan (email ke pengirim, notifikasi ≤1 menit ke Amirul, validasi server-side)
   **ditunda** sampai Amirul memutuskan layanan pihak ketiga (Formspree/Web3Forms/dsb) atau
   backend sendiri. Ini bukan "belum sempat" — ini keputusan sadar, laporkan sebagai gap yang
   diketahui, bukan sebagai fitur selesai.

---

## Tugas: bangun dua fitur Fase 3

### F6 — Kerja Sama (`features/kerjasama/`)

Struktur sesuai HANDOFF §2: `KerjasamaSection.tsx`, `LiniAlurKerja.tsx`, `TabelHarga.tsx`,
`KartuKetentuan.tsx`.

- **Lini alur kerja**: 5 langkah bernomor, masing-masing dengan estimasi durasi. Durasi adalah
  bagian dari janji ke klien (HANDOFF §4 eksplisit) — jangan dihilangkan atau disamarkan.
- **Tabel harga**: 3 baris. Harga disimpan sebagai **angka**, bukan string, dalam bentuk
  `{ min, max }` atau `{ perHari }` (HANDOFF §4), dirender oleh satu komponen yang menangani
  kedua bentuk. Tambahkan `rupiah()` ke `shared/lib/format.ts`:
  ```ts
  export function rupiah(nilai: number): string {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(nilai);
  }
  ```
  (sesuaikan kalau perlu, tapi jangan format manual dengan string concatenation).
- Blok syarat pembayaran: metode dan termin pembayaran disebutkan eksplisit (PRD F6).
- **Kartu ketentuan** sebagai `<dl>`: kepemilikan hasil, jumlah revisi, kebijakan pembatalan
  (PRD F6 kriteria penerimaan, HANDOFF §2).
- Semua angka harga PLACEHOLDER yang masuk akal, ditandai komentar jelas — Amirul sudah setuju
  ini boleh sementara.

### F7 — Kontak (`features/kontak/`)

Struktur: `KontakSection.tsx`, `KontakForm.tsx`, `KontakForm.schema.ts`, `KartuKanalKontak.tsx`.

- **Tiga kartu kanal** (surel, WhatsApp, LinkedIn) — datanya juga placeholder sampai Amirul kasih
  kontak asli; tandai jelas, jangan mengarang alamat/nomor yang terlihat asli.
- **Form**: React Hook Form + Zod, skema di `KontakForm.schema.ts`, `mode: 'onSubmit'` (HANDOFF §4).
  Field: nama (wajib) · surel-atau-WhatsApp (wajib, valid salah satu — Zod `refine`) · jenis
  proyek (wajib, `<select>` dari `KATEGORI` yang diimpor dari barrel `features/proyek`) · rentang
  anggaran (opsional) · pesan (wajib, min 20 karakter).
- **Empat state wajib, semua harus ada**:
  1. Kosong — placeholder yang menyebut contoh isi, bukan mengulang label.
  2. Galat — pesan di bawah field, border `--danger`, `aria-invalid="true"`, `aria-describedby`
     ke id pesan galat, fokus pindah ke field invalid pertama saat submit gagal. Pesan galat
     berbahasa manusia yang menjelaskan alasan (HANDOFF beri contoh: "Tanpa ini saya tidak bisa
     membalas" — bukan "Field is required").
  3. Mengirim — tombol nonaktif (`aria-disabled` + `disabled`), spinner, label "Mengirim…",
     `cursor: progress`.
  4. Berhasil — ganti seluruh form dengan konfirmasi `role="status"` + tombol "Kirim pesan lain".
- **Honeypot**: tambahkan satu field tersembunyi (mis. nama field yang wajar seperti "situs-web",
  disembunyikan visual + `tabIndex={-1}` + `autoComplete="off"`, dicek sebelum submit diproses)
  sebagai perlindungan spam minimal yang tidak butuh backend (PRD F7).
- **Submission disimulasikan** — beri komentar eksplisit di kode kenapa (belum ada backend/layanan
  terhubung, menunggu keputusan Amirul) dan bagaimana cara mengganti nanti dengan panggilan nyata.
  **Teks konfirmasi di UI harus jujur** — jangan menulis "Email terkirim" atau "Saya akan
  membalas dalam 1x24 jam" kalau tidak benar-benar ada yang menerima pesan itu. Rumuskan sesuatu
  yang tidak berbohong (misal "Pesan tersimpan di form ini — pengiriman sungguhan belum
  terhubung", atau tanyakan Amirul untuk salinan yang lebih baik) daripada mengarang klaim.
- Tinggi minimum semua kolom & tombol 48px, target sentuh ≥44px (HANDOFF §4).

---

## Sebelum lapor selesai

- Jalankan `tsc -b --noEmit`, `npm run lint`, `npm run build` penuh — semua harus bersih.
- Cek Definition of Done CLAUDE.md §14 lengkap (tanpa `any`/`console.log`/`TODO`, keyboard-operable
  penuh, rapi di 375px & 1440px, semua nilai visual dari token, diff hanya menyentuh yang relevan).
- Laporkan eksplisit sebagai gap yang diketahui (bukan disembunyikan): pengiriman form belum
  terhubung ke backend/layanan nyata, dan harga masih placeholder.
- Untuk tugas yang menyentuh >2 file, tulis rencana singkat dan tunggu persetujuan dulu
  (CLAUDE.md §15). Ringkasan akhir maksimal 5 baris.
