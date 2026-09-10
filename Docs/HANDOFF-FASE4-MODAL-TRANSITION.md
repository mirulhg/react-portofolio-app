# Prompt tambahan — animasi muncul/keluar modal detail proyek

Prompt ini ditulis untuk ditempel ke sesi Claude Code baru (tidak punya memori percakapan
sebelumnya). Baca `Docs/CLAUDE.md` §4 (`useEffect` hanya untuk sinkronisasi sistem eksternal)
dan §7 sebelum mengerjakan.

## Konteks

Amirul minta animasi transisi nyata untuk modal detail proyek (`ProyekDetail` dengan
`presentation="modal"`, dibuka dengan mengetuk kartu di `ProyekSection`): **ease-out saat
muncul, ease-in saat keluar** — ini konvensi motion-design standar (elemen masuk melambat saat
"mendarat", elemen keluar makin cepat saat "terlempar pergi"), bukan kebalikannya.

**Masalah saat ini**: `DetailProyekModal.tsx` (komponen `ProyekDetail`) sudah punya class
`transition-[opacity,transform] duration-[280ms] ease-standard` di panel dan
`transition-opacity duration-200 ease-out` di backdrop, TAPI keduanya tidak pernah benar-benar
mengalami perubahan state — komponen langsung mount dalam kondisi visual final (opacity
penuh), jadi transisinya tidak pernah terpicu. Saat ditutup, `onClose` (yang berujung
`navigate(-1)` di `ProyekDetailModalRoute.tsx`) langsung meng-unmount komponen dari rute React
Router — tidak ada waktu untuk animasi keluar diputar.

## Yang harus dibangun

Ubah `ProyekDetail` (di `src/features/proyek/DetailProyekModal.tsx`) supaya modal punya siklus
3 fase: `entering` (baru mount, kondisi belum terlihat) → `open` (kondisi final, terlihat penuh)
→ `exiting` (kondisi belum terlihat lagi, dipicu saat pengguna menutup) — dan **tunda**
pemanggilan `onClose` sungguhan (yang men-trigger `navigate(-1)`) sampai animasi keluar selesai
diputar, bukan langsung.

Ganti isi file `src/features/proyek/DetailProyekModal.tsx` — **hanya bagian di bawah ini yang
berubah, isi `konten` (JSX ringkasan proyek: Masalahnya/Peran saya/Prosesnya/dst) TETAP SAMA
PERSIS, jangan disentuh**:

### Import & state baru (di bagian atas komponen)

```tsx
import { useEffect, useRef, useState } from "react";
import { useDialogA11y } from "../../shared/hooks/useDialogA11y";
import { useReducedMotion } from "../../shared/hooks/useReducedMotion";
import type { Proyek } from "./types";

type ProyekDetailProps =
  | { proyek: Proyek; presentation: "page" }
  | { proyek: Proyek; presentation: "modal"; onClose: () => void };

const SAMPUL_PLACEHOLDER_CLASS =
  "bg-[repeating-linear-gradient(135deg,var(--line-strong)_0px,var(--line-strong)_1px,transparent_1px,transparent_12px)]";

// Durasi transisi masuk/keluar modal (HANDOFF §1 "Modal masuk": 280ms). Dipakai juga sebagai
// jeda sebelum benar-benar menutup (navigate), supaya animasi keluar sempat diputar penuh
// sebelum route-nya di-unmount.
const MODAL_TRANSITION_MS = 280;

export function ProyekDetail(props: ProyekDetailProps) {
  const { proyek } = props;
  const isModal = props.presentation === "modal";
  const panelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<"entering" | "open" | "exiting">("entering");
  const onCloseProp = props.presentation === "modal" ? props.onClose : undefined;

  // Masuk: pindah ke fase "open" satu frame setelah mount, supaya transisi CSS
  // entering->open benar-benar sempat diputar (bukan langsung tampil di kondisi akhir).
  useEffect(() => {
    if (!isModal || prefersReducedMotion) {
      setPhase("open");
      return;
    }
    const id = requestAnimationFrame(() => setPhase("open"));
    return () => cancelAnimationFrame(id);
  }, [isModal, prefersReducedMotion]);

  function handleClose() {
    if (!onCloseProp) return;
    if (prefersReducedMotion) {
      onCloseProp();
      return;
    }
    setPhase("exiting");
  }

  // Keluar: baru panggil onClose sungguhan (navigate keluar dari rute modal) setelah durasi
  // transisi selesai, supaya animasi ease-in-nya sempat kelihatan sebelum panel hilang.
  useEffect(() => {
    if (phase !== "exiting" || !onCloseProp) return;
    const timer = setTimeout(onCloseProp, MODAL_TRANSITION_MS);
    return () => clearTimeout(timer);
  }, [phase, onCloseProp]);

  useDialogA11y(panelRef, isModal, handleClose);
```

(baris `useDialogA11y(...)` ini MENGGANTIKAN baris lama yang memanggil
`useDialogA11y(panelRef, isModal, props.presentation === "modal" ? props.onClose : () => {});`
— sekarang pakai `handleClose`, bukan `onCloseProp` langsung, supaya Esc juga memicu animasi
keluar dulu.)

### Bagian `konten` (definisi JSX ringkasan proyek)

Tidak berubah sama sekali — biarkan persis seperti sekarang.

### `if (props.presentation === "page") return konten;`

Tidak berubah.

### Return untuk modal — ganti backdrop dan panel

Backdrop, dari:

```tsx
<div
  aria-hidden="true"
  onClick={onClose}
  className="fixed inset-0 z-50 bg-bg-base opacity-70 transition-opacity duration-200 ease-out"
/>
```

menjadi:

```tsx
<div
  aria-hidden="true"
  onClick={handleClose}
  className={`fixed inset-0 z-50 bg-bg-base transition-opacity duration-200 ${
    phase === "exiting" ? "ease-in" : "ease-out"
  } ${phase === "open" ? "opacity-70" : "opacity-0"}`}
/>
```

Panel, dari:

```tsx
<div
  ref={panelRef}
  role="dialog"
  aria-modal="true"
  aria-labelledby="detail-proyek-judul"
  className="flex max-h-[90vh] w-full flex-col overflow-y-auto rounded-t-lg bg-bg-raised shadow-xl transition-[opacity,transform] duration-[280ms] ease-standard md:max-w-[640px] md:rounded-lg"
>
```

menjadi:

```tsx
<div
  ref={panelRef}
  role="dialog"
  aria-modal="true"
  aria-labelledby="detail-proyek-judul"
  className={`flex max-h-[90vh] w-full flex-col overflow-y-auto rounded-t-lg bg-bg-raised shadow-xl transition-[opacity,transform] duration-[280ms] md:max-w-[640px] md:rounded-lg ${
    phase === "exiting" ? "ease-in" : "ease-out"
  } ${
    phase === "open" ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-[.98] opacity-0"
  }`}
>
```

(`translate-y-4` = 16px lewat token `--space-4`, `scale-[.98]` = persis nilai HANDOFF §1 "Modal
masuk: opacity+translateY(16px)+scale(.98)" — cuma sekarang benar-benar dipakai sebagai kondisi
awal/akhir, bukan cuma tertulis di `transition-*` tanpa efek.)

Tombol tutup di header panel: ganti `onClick={onClose}` menjadi `onClick={handleClose}`.

Hapus baris lama `const { onClose } = props;` (sudah digantikan `onCloseProp` di atas).

---

## Sebelum lapor selesai

- Jalankan `tsc -b --noEmit`, `npm run lint`, `npm run build` — semua harus bersih.
- Uji manual: buka modal detail proyek dari kartu — panel harus benar-benar terlihat meluncur
  masuk (fade + sedikit turun + membesar dari 98%), bukan langsung muncul instan.
- Tutup modal lewat tombol X, klik backdrop, DAN tombol Esc — ketiganya harus memicu animasi
  keluar yang sama (fade + sedikit turun + mengecil), baru setelah itu benar-benar hilang dari
  layar / kembali ke halaman utama.
- Nyalakan "reduce motion" di OS, ulangi buka-tutup modal — modal harus muncul/hilang instan
  tanpa animasi sama sekali, dan tidak ada jeda buatan saat menutup (jangan sampai ada delay
  200-an ms yang terasa "macet" padahal animasinya dimatikan).
- Cek dengan keyboard: buka modal dari kartu (Enter), Tab di dalam modal, tutup dengan Esc —
  fokus harus kembali ke kartu pemicu setelah modal benar-benar hilang.
- `src/features/proyek/DetailProyekModal.tsx` kemungkinan mendekati atau melewati batas 150
  baris (CLAUDE.md §3) setelah perubahan ini — cek dengan `wc -l`, dan kalau lewat, laporkan itu
  ke Amirul sebagai catatan (jangan langsung memecah file tanpa bertanya, ini komponen yang
  saling terkait erat).
- Ringkasan akhir maksimal 5 baris.
