# Konten Asli — isi yang perlu diganti sebelum tayang

Dokumen ini daftar semua tempat di kode yang masih data karangan (placeholder),
dan apa persisnya yang saya butuhkan darimu untuk menggantinya. Saya tidak boleh
mengarang ini sendiri (CLAUDE.md §0.4) — jadi tolong isi bagian yang kamu mau,
boleh langsung di sini (lalu bilang "sudah"), atau jawab lewat chat.

Tidak harus sekaligus — bisa per bagian, saya proses begitu ada yang siap.

---

## 1. Identitas (Hero + fallback noscript) — SELESAI

- **Nama**: Amirul Muwahiddin Noor
- **Peran/jabatan**: Frontend Engineer / Vibe Coder
- **Avatar**: foto asli (ilustrasi bergaya "Vice City") menggantikan badge inisial —
  `src/features/beranda/avatar-amirul.webp`
- **Slot tersedia**: 2

## 2. Tentang — SELESAI

- **Kisah singkat**: ditulis baru (115 kata), memuat: suka main game & main bola,
  tinggal di Yogyakarta, asal Sanggau (Kalimantan Barat), terbuka kerja remote.
- **Keahlian**: draf lama dipertahankan + kelompok baru "Keahlian Lain" (Unity,
  DaVinci Resolve).
- **Prinsip kerja**: dipakai apa adanya (draf lama).

## 3. Hasil Proyek Selesai (minimal 6)

Untuk **setiap** proyek, saya butuh:
- Judul
- Kategori — salah satu dari: Toko Online, Situs Profil, Dasbor, Landing Page, Aplikasi Mobile
- Ringkasan singkat (maks 120 karakter)
- Masalah yang diselesaikan
- Peran kamu di proyek itu
- Hasil/dampaknya (angka konkret kalau ada)
- Tautan langsung ke situsnya (kalau boleh dibagikan, kalau tidak: kosongkan)
- Anonim? (ya/tidak — kalau klien terikat NDA, nama disembunyikan)
- Gambar sampul (opsional untuk sekarang — boleh nanti, saat ini `sampul: null` dulu)

Kalau proyek "karangan" yang sudah ada di `src/features/proyek/data/projects.ts`
(mis. "Toko Kopi Nusantara") sebenarnya mendekati proyek asli kamu, bilang saja
mana yang mau dipertahankan (tinggal ganti detailnya) vs mana yang diganti total.

**Proyek 1:** _____
**Proyek 2:** _____
**Proyek 3:** _____
**Proyek 4:** _____
**Proyek 5:** _____
**Proyek 6:** _____
(tambah baris kalau lebih dari 6)

## 4. Proyek Sedang Berjalan

Untuk tiap proyek aktif saat ini:
- Nama (boleh disamarkan, mis. "Klien B — Dasbor Inventaris")
- Kategori (sama daftar seperti di atas)
- Anonim? kalau ya, catatan singkat kenapa (mis. "terikat NDA")
- Tahapan: daftar label tahap + status tiap tahap (selesai / jalan / belum) —
  bebas jumlah & nama tahapnya, tidak harus sama seperti draf yang ada
- Tanggal pembaruan terakhir

**Proyek berjalan 1:** _____
**Proyek berjalan 2:** _____
**Proyek berjalan 3:** _____

## 5. Kerja Sama — Harga

Draf sekarang (`src/features/kerjasama/TabelHarga.tsx`):
- Landing Page / Situs Profil: Rp2.500.000–Rp5.000.000
- Toko Online / Dasbor: Rp6.000.000–Rp12.000.000
- Kerja lepas harian: Rp600.000/hari
- Metode pembayaran: transfer bank. Termin: DP 50% di awal, pelunasan saat serah terima.

Pilihan: [ ] Pakai angka di atas  [ ] Ganti (isi angka & paketmu sendiri di bawah)
_____

(Alur kerja 5 tahap dan ketentuan kontrak di `LiniAlurKerja.tsx` / `KartuKetentuan.tsx`
sudah berupa ketentuan bisnis umum, bukan identitas — boleh dipakai apa adanya kecuali
kamu mau angka/kebijakan yang berbeda. Kalau mau diganti, sebutkan di sini: _____)

## 6. Kontak

- **Surel**: _____
- **WhatsApp** (format internasional, mis. +62 812-xxxx-xxxx): _____
- **LinkedIn** (URL profil): _____

---

Catatan: formulir kontak sendiri (pengiriman pesan) masih simulasi — belum
tersambung ke layanan nyata. Itu topik terpisah (bukan isi konten), bisa kita
bahas setelah bagian ini selesai kalau kamu mau.
