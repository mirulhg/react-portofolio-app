# Prompt perbaikan — selaraskan animasi dengan prinsip Emil Kowalski

Prompt ini ditulis untuk ditempel ke sesi Claude Code baru (tidak punya memori percakapan
sebelumnya). Baca `Docs/CLAUDE.md` §7 dan §10 dulu — perbaikan ini soal performa & kualitas
gerakan, bukan fitur baru.

## Latar belakang

Amirul menanyakan apakah animasi situs ini sejalan dengan prinsip Emil Kowalski
(emilkowal.ski/ui/7-practical-animation-tips). Hasil tinjauannya: sebagian besar sudah sejalan
(pakai `transform`/`opacity`, `ease-out` untuk elemen masuk, animasi sekali bukan berulang,
hormat `prefers-reduced-motion`). Ditemukan dua penyimpangan konkret yang disepakati untuk
diperbaiki sekarang:

1. State `:active` (ditekan) pakai `translate-y`, bukan `scale(0.97)` seperti tip #1 Kowalski
   yang paling ditekankan ("Scale Buttons on Interaction").
2. Indikator garis navigasi (`DesktopNav.tsx`) menganimasikan properti `left`/`width` langsung
   — ini melanggar prinsip performa inti Kowalski: animasikan HANYA `transform`/`opacity`,
   karena `left`/`width` memicu reflow tata letak browser, sedangkan `transform` berjalan di GPU
   tanpa reflow.

Jangan ubah apa pun di luar dua hal ini — bukan tugas menambah animasi baru, cuma memperbaiki
teknik pada animasi yang sudah ada.

---

## 1. Tambahkan `active:scale-[0.97]` di elemen yang sudah punya pola tekan

Untuk elemen yang sudah punya `hover:-translate-y-0.5 active:translate-y-0` (tombol "naik" saat
hover, "turun ke posisi semula" saat ditekan): **pertahankan** `active:translate-y-0` (supaya
efek naik-nya batal saat ditekan) dan **tambahkan** `active:scale-[0.97]` di sampingnya — jadi
saat ditekan, elemen kembali ke posisi semula DAN mengecil tipis, memberi kesan benar-benar
tertekan secara fisik.

Terapkan di 4 file ini — cukup ubah `active:translate-y-0` menjadi
`active:translate-y-0 active:scale-[0.97]` di className masing-masing:

- `src/shared/ui/Button.tsx` (di konstanta `BASE_CLASS`)
- `src/features/proyek/KartuProyek.tsx`
- `src/features/kontak/KartuKanalKontak.tsx`
- `src/features/kontak/KontakForm.tsx` (tombol submit)

Untuk elemen yang TIDAK punya hover-lift dan cuma punya `active:translate-y-0.5` (chip filter,
tidak ada gerakan naik saat hover): **ganti** `active:translate-y-0.5` menjadi
`active:scale-[0.97]` (bukan ditambah, diganti) — di:

- `src/features/proyek/FilterKategori.tsx`

Setelah ini, `grep -rn "translate-y-0\.5\b" src --include='*.tsx'` seharusnya tidak lagi
menunjukkan penggunaan sebagai state `:active` (boleh masih ada di tempat lain kalau memang
bukan soal `:active`).

---

## 2. Ganti indikator nav dari `left`/`width` ke `transform`

File: `src/app/layout/DesktopNav.tsx`.

Logika pengukuran (`measureIndicator`, `useEffect`, state `indicator`) **tidak berubah** — tetap
hitung `left` dan `width` dalam piksel seperti sekarang. Yang berubah cuma cara menerapkannya:
alih-alih mengatur CSS `left`/`width` langsung, gunakan elemen dasar selebar 1px yang
digeser+diskalakan lewat `transform`, dengan `transform-origin` di kiri supaya sisi kirinya
tetap jadi jangkar (perilaku visualnya identik dengan versi lama, cuma tekniknya beda).

Ganti elemen indikator dari:

```tsx
<span
  aria-hidden="true"
  className="absolute -bottom-2 h-0.5 bg-accent-a transition-[left,width] duration-200 ease-standard"
  style={{ left: indicator.left, width: indicator.width }}
/>
```

menjadi:

```tsx
{/* Indikator lebar 1px yang di-translate+scale dari titik jangkar kiri (bukan animasi
    `left`/`width` langsung) — `left`/`width` memicu reflow tata letak, `transform` tidak.
    Prinsip performa dari Emil Kowalski: animasikan hanya transform/opacity. */}
<span
  aria-hidden="true"
  className="absolute -bottom-2 left-0 h-0.5 w-px origin-left bg-accent-a transition-transform duration-200 ease-standard"
  style={{ transform: `translateX(${indicator.left}px) scaleX(${indicator.width})` }}
/>
```

Catatan: `scaleX(indicator.width)` benar karena elemen dasarnya `w-px` (1px) — skala 1 = 1px,
jadi `scaleX(indicator.width)` menghasilkan lebar akhir persis `indicator.width` piksel, sama
seperti versi lama yang pakai `width: indicator.width`.

---

## Sebelum lapor selesai

- Jalankan `tsc -b --noEmit`, `npm run lint`, `npm run build` — semua harus bersih.
- Uji manual: klik-tahan (mousedown, bukan cuma hover) di tombol, kartu proyek, kartu kanal
  kontak, dan chip filter — harus terasa sedikit mengecil saat ditekan, bukan cuma
  naik-turun posisi.
- Uji manual: klik tautan nav berbeda-beda dan lihat garis indikator meluncur — hasil visualnya
  harus terlihat identik dengan sebelumnya (posisi & lebar akhir sama persis), cuma sekarang
  lewat `transform`.
- Nyalakan "reduce motion" di OS dan pastikan kedua animasi ini tetap mati total seperti animasi
  lain di situs (sudah tertangani otomatis lewat aturan CSS global — pastikan tidak berubah).
- Ringkasan akhir maksimal 5 baris.
