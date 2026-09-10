# Handoff — Portofolio Interaktif (Neon Noir)

Referensi visual: `Portofolio Neon Noir.dc.html`. Buka di browser untuk melihat semua state hidup.
Kontrak kode: `Docs/CLAUDE.md`. Dokumen ini **tidak** menggantikannya — kalau ada konflik, CLAUDE.md menang.

File HTML itu referensi visual, bukan kode produksi. Jangan port markup-nya apa adanya.

---

## 1. Token

Taruh di `src/styles/tokens.css` sebagai CSS custom properties, lalu map ke `tailwind.config.ts`.
Tidak ada nilai warna/spasi/ukuran huruf yang boleh ditulis literal di komponen (CLAUDE.md §8).

### Warna

| Token | Nilai | Pakai untuk |
|---|---|---|
| `--bg-base` | `#1A1030` | Latar halaman, section ganjil |
| `--bg-alt` | `#1E1836` | Section genap, dasar input |
| `--bg-raised` | `#241844` | Kartu, panel, drawer, form |
| `--bg-inset` | `#2E1F55` | Chip, placeholder gambar |
| `--ink` | `#F4EEFF` | Teks utama |
| `--ink-muted` | `#A99BC7` | Teks sekunder, label |
| `--ink-faint` | `#C6B9E0` | Teks mono di atas `--bg-inset` |
| `--accent-a` | `#FF3E8A` | Magenta — indikator, aksen |
| `--accent-b` | `#FF7A29` | Oranye — ujung gradien |
| `--accent-c` | `#FFC64D` | Kuning — angka harga |
| `--focus` | `#2ED9D0` | Ring fokus, tautan |
| `--ok` | `#3EE08F` | Slot terbuka, langkah selesai |
| `--ok-ink` | `#8FF0BF` | Teks di atas latar `--ok` beralfa |
| `--danger` | `#FF4D5E` | Border kolom invalid |
| `--danger-ink` | `#FF8E97` | Teks pesan galat |
| `--line` | `rgba(255,255,255,.08)` | Pembatas, border kartu |
| `--line-strong` | `rgba(255,255,255,.14)` | Border input, chip nonaktif |

`--grad-accent: linear-gradient(135deg, var(--accent-a), var(--accent-b))`

**Aturan kontras yang tidak boleh dilanggar.** Teks di atas `--grad-accent` wajib `--bg-base`
(gelap), bukan putih — putih di atas magenta hanya 3,33:1. `#7C6E9E` dari arahan awal tidak
dipakai untuk teks (3,92:1, gagal 4,5:1); kalau perlu abu lebih redup, itu hanya untuk
elemen dekoratif non-teks.

### Tipografi

Judul & angka: **Space Grotesk** 500/600/700. Isi: **Inter** 400/500/600.
Label mono kecil: stack sistem `ui-monospace, Menlo, monospace`.

| Token | Nilai |
|---|---|
| `--fs-hero` | `clamp(38px, 8.4vw, 84px)` / lh 1.02 / ls −.04em |
| `--fs-h2` | `clamp(26px, 5vw, 42px)` / lh 1.1 / ls −.03em |
| `--fs-h3` | `19px` / ls −.02em |
| `--fs-body` | `16.5px` / lh 1.72 |
| `--fs-body-sm` | `14.5px` / lh 1.6 |
| `--fs-label` | `11.5px` / ls .07em / weight 600 / uppercase |

Semua angka (harga, persen, tanggal, nomor telepon) wajib `font-variant-numeric: tabular-nums`.

### Spasi, radius, gerakan

Skala spasi: `4 · 8 · 12 · 16 · 20 · 24 · 28 · 40 · 56` px. Padding section:
`clamp(64px, 10vw, 120px)` vertikal, `24px` horizontal. Lebar isi maks `1200px`.

Radius: `--r-sm 8px` · `--r-md 10–12px` (tombol, input) · `--r-lg 14px` (kartu) · `--r-pill 999px`.

| Gerakan | Durasi & easing |
|---|---|
| Hover angkat kartu/tombol | `transform 160–180ms ease-out`, `translateY(-2px)` |
| Indikator nav meluncur | `left/width 200ms cubic-bezier(.2,.8,.2,1)` |
| Garis kemajuan gulir | `transform 120ms linear` |
| Elemen masuk layar | `opacity+translateY(12px) 320ms ease-out`, **sekali** |
| Batang kemajuan | `scaleX 400ms ease-out`, **sekali** |
| Drawer masuk | `translateX 240ms cubic-bezier(.2,.8,.2,1)` |
| Modal masuk | `opacity+translateY(16px)+scale(.98) 280ms cubic-bezier(.2,.8,.2,1)` |
| Latar modal/drawer | `opacity 180–200ms ease-out` |

`prefers-reduced-motion: reduce` → matikan **semua** animasi dan transisi, dan set
`scroll-behavior: auto`. Batang kemajuan langsung di nilai akhir, bukan dianimasikan.

---

## 2. Struktur berkas

Feature-first sesuai CLAUDE.md §3. Satu halaman gulir + rute detail proyek.

```
src/
  app/
    routes.tsx                    # / dan /proyek/:slug
    layout/
      SiteHeader.tsx              # nav + drawer + garis kemajuan
      SiteFooter.tsx
  features/
    beranda/
      Hero.tsx
      KapasitasBadge.tsx
    tentang/
      TentangSection.tsx
    proyek/
      ProyekSection.tsx           # judul + filter + grid + empty state
      FilterKategori.tsx
      KartuProyek.tsx
      DetailProyekModal.tsx
      data/projects.ts            # + schema Zod
      types.ts
    berjalan/
      BerjalanSection.tsx
      KartuBerjalan.tsx
      BatangKemajuan.tsx
      data/ongoing.ts
    kerjasama/
      KerjasamaSection.tsx
      LiniAlurKerja.tsx
      TabelHarga.tsx
      KartuKetentuan.tsx
    kontak/
      KontakSection.tsx
      KontakForm.tsx              # RHF + Zod
      KontakForm.schema.ts
      KartuKanalKontak.tsx
  shared/
    ui/                           # Tombol, Chip, Kolom, Modal, Ring fokus
    hooks/
      useScrollProgress.ts
      useSectionAktif.ts
      useReducedMotion.ts
      useRevealOnce.ts
    lib/
      format.ts                   # rupiah, tanggal Indonesia
  styles/
    tokens.css
```

---

## 3. Model data

Semua data divalidasi Zod di batas (CLAUDE.md §7). Sumbernya berkas TS statis dulu — lihat §6.

```ts
// features/proyek/types.ts
export const KATEGORI = [
  'Toko Online', 'Situs Profil', 'Dasbor', 'Landing Page', 'Aplikasi Mobile',
] as const;

export const langkahProsesSchema = z.object({
  no: z.string(),                       // '01'
  teks: z.string().min(1),
});

export const proyekSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  category: z.enum(KATEGORI),
  blurb: z.string().min(1).max(120),
  sampul: z.object({ src: z.string(), alt: z.string().min(1) }).nullable(),
  masalah: z.string().min(1),
  peran: z.string().min(1),
  proses: z.array(langkahProsesSchema).min(1),
  hasil: z.string().min(1),
  tautan: z.string().url().nullable(),  // null = situs sudah tidak tayang
  anonim: z.boolean().default(false),   // true → tampilkan label NDA
});

export type Proyek = z.infer<typeof proyekSchema>;
```

```ts
// features/berjalan/data/ongoing.ts
export const tahapSchema = z.object({
  label: z.string().min(1),
  status: z.enum(['selesai', 'jalan', 'belum']),
});

export const proyekBerjalanSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  category: z.enum(KATEGORI),
  anonim: z.boolean().default(false),
  catatanAnonim: z.string().nullable(),   // muncul hanya kalau anonim
  persen: z.number().int().min(0).max(100),
  tahap: z.array(tahapSchema).min(1),
  diperbarui: z.string().date(),          // ISO, dirender 'Diperbarui 5 September 2026'
});
```

Turunkan, jangan simpan (CLAUDE.md §5): `persen` boleh dihitung dari rasio `tahap` berstatus
`selesai` kalau kamu mau satu sumber kebenaran — putuskan satu, jangan dua-duanya.
`tahapSekarang` = `tahap.find(t => t.status === 'jalan')`.

**Kemajuan basi.** Kalau `diperbarui` lebih dari 30 hari lalu, render batang dengan
`--ink-muted` alih-alih `--grad-accent` dan tambahkan teks "belum diperbarui". Jangan
tampilkan angka yang tidak bisa dipercaya sebagai kabar baik.

---

## 4. Perilaku per section

### Header (`SiteHeader`)

- Sticky, `backdrop-filter: blur(14px)`, latar `--bg-base` alfa .82.
- **Section aktif ditentukan dari geometri**, bukan `IntersectionObserver` ratio: dalam satu
  pendengar `scroll` (passive), section aktif = section terakhir yang `top <= 80`. Satu
  pendengar itu juga menghitung kemajuan gulir. Ini penting — dua sumber kebenaran untuk
  "section aktif" sudah pernah gagal di prototipe.
- Indikator: garis 2px `--accent-a` di bawah tautan aktif, posisi diukur dari
  `getBoundingClientRect()` relatif kontainer nav. Ukur ulang saat `resize`.
- Tautan aktif dapat `aria-current="true"`.
- `<768px`: nav diganti tombol menu 44×44 → drawer kanan, `role="dialog"` + `aria-modal`,
  `aria-expanded` di pemicu. Esc menutup. Kunci `body` saat terbuka.
- Bandingkan section aktif lewat ref/field instance, bukan di dalam updater `setState`.

### Beranda

Judul dengan `background-clip: text` di atas `--grad-accent`. **Sertakan `color` fallback
`--accent-a`** — kalau `background-clip` tidak didukung, `-webkit-text-fill-color`
transparan bisa membuat judul hilang total.

Dua glow radial `position: absolute` + `filter: blur()`, `aria-hidden`, `pointer-events: none`,
kontainer `overflow: hidden`.

Badge kapasitas dikendalikan satu flag (`showCapacity`) — sembunyikan seluruh badge saat
jadwal penuh, jangan tulis "0 slot".

### Proyek

- Filter: 6 chip termasuk "Semua". `aria-pressed` mengikuti state. Filter aktif disimpan di
  **URL search param** (`?kategori=`), bukan `useState` — sesuai tangga state CLAUDE.md §5,
  supaya bisa dibagikan dan bertahan saat kembali dari halaman detail.
- Grid: `repeat(auto-fill, minmax(min(100%, 300px), 1fr))`, gap 20px.
- **Empty state wajib.** "Aplikasi Mobile" memang kosong saat rilis — itu bukan bug, itu
  kejujuran. Sertakan tombol reset ke "Semua".
- Kartu adalah `<button>`, bukan `<div onClick>`. Sampul tinggi tetap 176px supaya animasi
  masuk tidak menggeser tata letak.

### Detail proyek

PRD memilih modal, tapi struktur situs memilih halaman detail terpisah. **Kerjakan dua-duanya
dari satu komponen:** rute `/proyek/:slug` adalah sumber kebenaran; dari grid, buka sebagai
modal di atas halaman (`navigate` dengan `state.modal = true`), dan render halaman penuh kalau
rute diakses langsung atau dimuat ulang. Isinya identik. Ini menjaga tautan bisa dibagikan
tanpa mengorbankan alur "klik lalu lanjut menggulir".

Modal: `role="dialog"`, `aria-modal`, `aria-labelledby` ke judul, fokus pindah ke panel saat
buka dan **kembali ke kartu pemicu** saat tutup, Esc dan klik latar menutup, fokus terkunci di
dalam panel, `body` overflow hidden. Header panel sticky supaya tombol tutup selalu terjangkau.
Di seluler panel naik dari bawah (`border-radius` hanya sudut atas).

Urutan isi: sampul → Masalahnya → Peran saya → Prosesnya (list bernomor) → Hasilnya (dalam
kotak `--bg-alt`) → tombol buka situs. Kalau `tautan === null`, ganti tombol dengan teks
"Situs sudah tidak tayang" — jangan tombol mati.

### Sedang berjalan

Kartu per proyek: kategori, judul, batang kemajuan + persen, daftar tahap dengan tiga status
visual berbeda (centang hijau / cincin magenta berisi / cincin abu kosong), tanggal diperbarui.
Proyek anonim: label mono "NDA" di samping kategori + satu baris penjelasan.

Batang kemajuan `role="progressbar"` dengan `aria-valuenow/min/max` dan `aria-label` berisi
nama proyek. Animasi tumbuh sekali saat masuk layar; jangan animasikan ulang saat filter atau
re-render.

### Kerja sama

Lini alur 5 langkah dengan estimasi durasi tiap langkah — durasinya bagian dari janji, jangan
dihapus. Tabel harga 3 baris + blok syarat pembayaran. Kartu ketentuan sebagai `<dl>`:
kepemilikan hasil, jumlah revisi, pembatalan.

Harga di data sebagai angka + formatter `rupiah()`, bukan string. Rentang disimpan sebagai
`{ min, max }` atau `{ perHari }`, dirender oleh satu komponen.

### Kontak

Tiga kartu kanal (surel, WhatsApp, LinkedIn) lalu formulir. RHF + Zod, `mode: 'onSubmit'`.

Kolom: nama (wajib), surel-atau-WhatsApp (wajib, valid salah satu), jenis proyek (wajib,
select), rentang anggaran (opsional), pesan (wajib, min 20 karakter).

Empat state wajib ada semua:

1. **Kosong** — placeholder yang menyebut contoh isi, bukan mengulang label.
2. **Galat** — pesan di bawah kolom, border `--danger`, `aria-invalid="true"`,
   `aria-describedby` ke id pesan, fokus pindah ke kolom invalid pertama saat submit gagal.
3. **Mengirim** — tombol nonaktif, spinner, label "Mengirim…", `cursor: progress`.
4. **Berhasil** — ganti seluruh formulir dengan konfirmasi `role="status"` + tombol
   "Kirim pesan lain".

Pesan galat berbahasa manusia dan menjelaskan alasannya. Contoh dari prototipe:
"Tanpa ini saya tidak bisa membalas." Bukan "Field is required".

Tinggi minimum semua kolom dan tombol 48px; semua target sentuh ≥44px.

---

## 5. Aksesibilitas — daftar periksa rilis

- [ ] Ring fokus `--focus` 2px offset 2px di **setiap** elemen interaktif, tidak ada
      `outline: none` tanpa ganti.
- [ ] Urutan Tab wajar; drawer dan modal mengunci fokus lalu memulihkannya.
- [ ] Satu `<h1>` saja (judul hero). Section pakai `<h2>`, isi kartu `<h3>`.
- [ ] Semua glow, garis, dan placeholder dekoratif `aria-hidden="true"`.
- [ ] Semua gambar sampul punya `alt` bermakna; sampul dekoratif `alt=""`.
- [ ] Kontras teks ≥4,5:1 di atas latar sebenarnya, termasuk di atas chip beralfa.
- [ ] Uji seluruh alur dengan keyboard saja, lalu dengan `prefers-reduced-motion` aktif.
- [ ] Tombol nonaktif punya `aria-disabled`, bukan hanya `disabled` visual.

---

## 6. Pembaruan kemajuan — usul

Untuk 4–6 proyek, CMS itu berlebihan. **Berkas TS statis di repo**, bukan JSON:
`features/berjalan/data/ongoing.ts` mengekspor array yang divalidasi Zod saat modul dimuat.
Keuntungannya dibanding JSON: TypeScript menangkap salah ketik saat kamu edit, bukan saat
pengguna membuka situs.

Alurnya: edit berkas → commit → deploy otomatis. Tiap Jumat, satu commit.
Naikkan ke CMS hanya kalau kamu benar-benar berhenti memperbarui karena harus buka editor kode.

Tambahkan uji yang gagal kalau ada `diperbarui` lebih tua dari 30 hari — supaya lupa
memperbarui jadi kesalahan yang terlihat, bukan situs yang diam-diam basi.

---

## 7. Yang masih perlu keputusanmu

1. **NDA.** Prototipe menampilkan proyek anonim sebagai "Klien A" + label NDA. Konfirmasi ini
   boleh, atau proyek NDA sebaiknya tidak muncul sama sekali.
2. **Isi sungguhan.** Semua nama, angka, harga, tautan, dan foto di prototipe adalah
   placeholder yang masuk akal — bukan datamu. Harga terutama: `Rp 2,5–5 jt` / `6–12 jt` /
   `600 rb per hari` itu karanganku, ganti sebelum tayang.
3. **Aset visual.** Belum ada satu pun tangkapan layar. Sampul kartu 1200×800, sampul detail
   1600×900. Sampai ada, placeholder bergaris lebih jujur daripada foto stok.
4. **Fase 4 PRD (Gerakan & Interaksi)** sudah ikut terbangun di prototipe ini. Kalau kamu ingin
   rilis lebih cepat, gerakan masuk-layar dan glow hero adalah yang paling aman dipotong.
