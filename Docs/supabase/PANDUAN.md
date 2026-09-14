# Panduan Supabase — Portofolio Interaktif

Ringkasan: data proyek sekarang disimpan di Supabase (Postgres), bukan lagi
di `src/features/proyek/data/projects.ts`. Situs membaca data itu secara
publik (read-only). Kamu menambah/mengubah/menghapus proyek langsung lewat
**Table Editor** di dashboard Supabase — tidak perlu login/halaman admin di
situsnya sendiri.

## 1. Buat akun & project

1. Buka https://supabase.com → Sign in with GitHub (paling gampang, gratis).
2. Klik **New project**. Isi nama (bebas), pilih region terdekat (Singapore),
   buat Database Password (simpan baik-baik, tidak dipakai di kode kita, tapi
   simpan jaga-jaga).
3. Tunggu ~1-2 menit sampai project selesai di-provision.

## 2. Buat tabel `projects`

1. Di sidebar project, buka **SQL Editor** → **New query**.
2. Buka file `Docs/supabase/schema.sql` di project ini, salin seluruh isinya,
   tempel ke SQL Editor, lalu klik **Run**.
3. Ini akan: membuat tabel `projects`, menyalakan Row Level Security (RLS)
   supaya publik cuma bisa membaca (tidak bisa menulis lewat situs), dan
   mengisi 7 proyek contoh yang sebelumnya ada di kode supaya situs tidak
   kosong.
4. Cek hasilnya di menu **Table Editor** di sidebar — harus muncul tabel
   `projects` berisi 7 baris.

## 3. Ambil kunci API

1. Di sidebar, buka **Project Settings** (ikon gerigi) → **API**.
2. Salin dua nilai ini:
   - **Project URL** → contoh `https://abcdefgh.supabase.co`
   - **anon public** key (di bagian "Project API keys") — key ini AMAN
     dipakai di kode front-end/publik, karena akses tulisnya sudah dikunci
     oleh RLS di langkah 2.
   - Jangan pernah pakai/menyebar **service_role** key di kode front-end —
     itu kunci "admin" yang melewati semua RLS.

## 4. Konfigurasi lokal (di komputer kamu)

1. Salin `.env.example` jadi `.env` (file ini sudah masuk `.gitignore`, jadi
   aman, tidak ke-commit ke Git/GitHub).
2. Isi dua variabelnya dengan nilai dari langkah 3:
   ```
   VITE_SUPABASE_URL=https://abcdefgh.supabase.co
   VITE_SUPABASE_ANON_KEY=isi-anon-key-di-sini
   ```
3. Jalankan `npm run dev` seperti biasa — bagian "Hasil Proyek" di beranda
   sekarang mengambil data dari Supabase, bukan dari file lama.

## 5. Supaya build/deploy otomatis (GitHub Pages) tetap jalan

Workflow deploy (`.github/workflows/deploy.yml`) butuh dua env variabel yang
sama saat `npm run build` di GitHub Actions. Tambahkan sebagai **repository
secret** (bukan ditulis di kode):

1. Di GitHub, buka repo ini → **Settings** → **Secrets and variables** →
   **Actions** → **New repository secret**.
2. Tambahkan dua secret dengan nama persis:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   (nilainya sama seperti di `.env` lokal kamu)
3. Push ke `main` seperti biasa — workflow akan otomatis memakainya.

## 6. Cara menambah / mengubah / menghapus proyek

Semua lewat **Table Editor** → tabel `projects` di dashboard Supabase:

- **Tambah proyek baru**: klik **Insert** → **Insert row**, isi tiap kolom:
  - `slug`: huruf kecil, angka, dan tanda `-` saja (contoh `toko-buku-jaya`),
    harus unik — ini dipakai di URL `/proyek/toko-buku-jaya`.
  - `category`: harus persis salah satu dari: `Toko Online`, `Situs Profil`,
    `Dasbor`, `Landing Page`, `Aplikasi Mobile`.
  - `blurb`: maksimal 120 karakter.
  - `sampul`: kosongkan (null) kalau belum ada gambar, atau isi JSON seperti
    `{"src": "https://...", "alt": "deskripsi gambar"}`.
  - `proses`: JSON array, contoh:
    ```json
    [
      {"no": "01", "teks": "Riset kebutuhan."},
      {"no": "02", "teks": "Bangun & uji."}
    ]
    ```
  - `tautan`: link demo/live proyek, atau kosongkan (null) kalau tidak ada.
  - `anonim` / `mandiri`: `true`/`false` (lihat makna aslinya di
    `src/features/proyek/types.ts`).
- **Ubah proyek**: klik langsung sel yang mau diubah di tabel, edit, Enter.
- **Hapus proyek**: pilih baris (checkbox di kiri) → klik ikon tempat sampah.
- Perubahan LANGSUNG terlihat di situs setelah reload halaman (tidak perlu
  build/deploy ulang) — karena situs mengambil data langsung dari Supabase
  tiap kali dibuka.
- Sitemap (`public/sitemap.xml`) baru ikut ter-update saat build berikutnya
  (`npm run build`, termasuk lewat deploy otomatis di GitHub Actions).

## 7. Kalau ada error "Gagal memuat data proyek..." di situs

Kemungkinan besar:
- `.env` (lokal) atau secret GitHub (`VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY`)
  belum diisi/salah.
- Tabel `projects` belum dibuat (ulangi langkah 2).
- Ada baris dengan data yang tidak valid (mis. `category` typo, `proses`
  bukan JSON array yang benar) — cek Table Editor, `proyekSchema` di
  `src/features/proyek/types.ts` akan menolak baris yang bentuknya salah.

## 8. Upload gambar (sampul proyek)

Kolom `sampul` di tabel `projects` cuma menyimpan LINK gambar (`{"src": "...", "alt": "..."}`),
bukan file itu sendiri. Supaya bisa upload file gambar dari komputer, pakai
**Supabase Storage** (bucket `project-images`, sudah dibuat & di-set publik):

1. Dashboard Supabase → **Storage** → **Files** → bucket `project-images`.
2. **Upload file** → pilih gambar dari komputer (maks 50MB).
3. Klik file yang sudah terupload → **Copy URL** (link publiknya).
4. Table Editor → tabel `projects` → edit baris proyek → isi kolom `sampul`:
   ```json
   {"src": "<link yang dicopy>", "alt": "deskripsi singkat gambar"}
   ```
5. Save. Gambar langsung tampil di kartu proyek di situs (reload halaman).

Bucket ini publik untuk BACA saja (siapa pun bisa lihat gambarnya lewat link),
tapi upload/hapus file cuma bisa lewat dashboard Supabase yang sudah login
sebagai kamu — bukan lewat situs publik.
