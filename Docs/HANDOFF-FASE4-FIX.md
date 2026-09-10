# Prompt perbaikan — Fase 4: lepas animasi masuk-layar dari 6 tempat

Prompt ini ditulis untuk ditempel ke sesi Claude Code baru (tidak punya memori percakapan
sebelumnya). Baca `Docs/CLAUDE.md` §7 dan §15, serta baris pembuka `Docs/HANDOFF.md`
("kalau ada konflik, CLAUDE.md menang") sebelum mengerjakan — itu dasar perbaikan ini.

## Kenapa

Fase 4 sebelumnya menerapkan `useRevealOnce` (fade+geser masuk-layar, 320ms) ke 8 tempat:
`Hero`, `TentangSection`, `LiniAlurKerja`, `TabelHarga`, `KartuKetentuan`, `ProyekSection`
(header), `KartuProyek`, `KontakSection`. Ini secara literal mengikuti token gerakan di
HANDOFF §1, tapi hasilnya persis pola yang dilarang eksplisit di CLAUDE.md §7: "Animasi
fade-and-slide-up di setiap section" — salah satu penanda paling jelas kode hasil generate.
HANDOFF.md sendiri bilang kalau dua dokumen ini bertabrakan, CLAUDE.md menang.

## Yang harus terjadi

**Pertahankan** animasi masuk-layar HANYA di:
- `Hero.tsx` — sudah jadi ciri khas halaman, jangan diubah.
- `KartuProyek.tsx` — wajar karena tiap kartu muncul bertahap mengikuti grid saat scroll,
  bukan satu blok statis yang tiba-tiba fade. Jangan diubah.
- `BatangKemajuan.tsx` — animasinya fungsional (batang kemajuan bertumbuh), bukan dekoratif.
  Jangan diubah.

**Lepas** animasi masuk-layar (kembalikan ke render statis, tanpa `useRevealOnce`, tanpa
`ref`, tanpa class kondisional) di 6 file berikut. Konten dan struktur JSX lainnya JANGAN
diubah sama sekali — cuma bagian animasi yang dilepas.

### 1. `src/features/tentang/TentangSection.tsx`

Hapus baris `import { useRevealOnce } from "../../shared/hooks/useRevealOnce";` dan baris
`const { ref, isRevealed } = useRevealOnce<HTMLDivElement>();`. Ganti wrapper:

```tsx
<div
  ref={ref}
  className={`mx-auto flex max-w-content flex-col gap-9 transition-[opacity,transform] duration-[320ms] ease-out ${
    isRevealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
  }`}
>
```

menjadi:

```tsx
<div className="mx-auto flex max-w-content flex-col gap-9">
```

### 2. `src/features/kerjasama/LiniAlurKerja.tsx`

Hapus import `useRevealOnce` dan baris pemanggilannya. Ganti wrapper `<ol ref={ref} ...>`
(dengan class kondisional yang sama polanya) menjadi:

```tsx
<ol className="grid gap-6 sm:grid-cols-5">
```

### 3. `src/features/kerjasama/TabelHarga.tsx`

Hapus import `useRevealOnce` (baris `rupiah` dari `shared/lib/format` TETAP dipakai, jangan
dihapus) dan baris pemanggilan hook. Ganti wrapper `<div ref={ref} ...>` menjadi:

```tsx
<div className="flex flex-col gap-6">
```

### 4. `src/features/kerjasama/KartuKetentuan.tsx`

Hapus import `useRevealOnce` dan baris pemanggilannya. Ganti wrapper `<dl ref={ref} ...>`
menjadi:

```tsx
<dl className="grid gap-6 rounded-lg border border-line bg-bg-raised p-6 sm:grid-cols-3">
```

### 5. `src/features/proyek/ProyekSection.tsx`

**Hanya** bagian header (judul + `FilterKategori`) yang perlu diubah — jangan sentuh bagian
grid/`KartuProyek` di bawahnya, animasi di situ tetap dipertahankan. Hapus import
`useRevealOnce` dan baris `const { ref, isRevealed } = useRevealOnce<HTMLDivElement>();`.
Ganti wrapper:

```tsx
<div
  ref={ref}
  className={`flex flex-col gap-6 transition-[opacity,transform] duration-[320ms] ease-out ${
    isRevealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
  }`}
>
```

menjadi:

```tsx
<div className="flex flex-col gap-6">
```

### 6. `src/features/kontak/KontakSection.tsx`

Hapus import `useRevealOnce` dan baris pemanggilannya. Ganti wrapper `<div ref={ref} ...>`
menjadi:

```tsx
<div className="mx-auto flex max-w-content flex-col gap-9">
```

---

## Sebelum lapor selesai

- Jalankan `tsc -b --noEmit`, `npm run lint`, `npm run build` — semua harus bersih (hapus
  import yang tidak dipakai lagi supaya `noUnusedLocals` di `tsconfig.app.json` tidak gagal).
- Verifikasi manual: scroll seluruh halaman — Hero dan kartu Proyek tetap muncul dengan
  animasi masuk-layar, section lain (Tentang, Kerja Sama, Kontak, header Proyek) langsung
  tampil tanpa efek.
- Pastikan tidak ada sisa kode mati (`ref`/`isRevealed` yang tidak dipakai) di enam file itu.
- Ringkasan akhir maksimal 5 baris.
