# Prompt refactor — keluarkan logika transisi modal jadi hook `useDialogTransition`

Prompt ini ditulis untuk ditempel ke sesi Claude Code baru (tidak punya memori percakapan
sebelumnya). Baca `Docs/CLAUDE.md` §1 dan §3 dulu — ini murni refactor (pecah komponen yang
kelewat panjang), bukan perubahan perilaku.

## Kenapa

`src/features/proyek/DetailProyekModal.tsx` sekarang 168 baris, melewati batas 150 di
CLAUDE.md §3, gara-gara logika siklus fase masuk/keluar (`entering`/`open`/`exiting`) yang
ditambahkan untuk animasi modal ditulis langsung di dalam komponen. Keluarkan logika itu jadi
hook baru `useDialogTransition`, mengikuti pola yang sudah ada dengan `useDialogA11y` di file
yang sama (satu hook = satu tanggung jawab, bisa dipakai ulang kalau nanti ada dialog lain).
**Perilaku, animasi, dan tampilan TIDAK BOLEH berubah sama sekali** — ini cuma pemindahan kode.

## 1. Buat `src/shared/hooks/useDialogTransition.ts`

```ts
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export type DialogPhase = "entering" | "open" | "exiting";

/**
 * Siklus fase masuk/keluar untuk dialog yang dianimasikan (entering -> open -> exiting), dan
 * menunda `onClose` sungguhan sampai durasi transisi keluar selesai supaya animasinya sempat
 * diputar. `onClose` disimpan lewat ref (bukan dependency effect) supaya identitas fungsi baru
 * di tiap render induk tidak mereset timer yang sedang berjalan — pola sama seperti
 * `useDialogA11y`. Kalau prefers-reduced-motion aktif, langsung ke "open" dan `onClose`
 * dipanggil instan tanpa jeda buatan.
 */
export function useDialogTransition(isOpen: boolean, onClose: () => void, durationMs: number) {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<DialogPhase>(!isOpen || prefersReducedMotion ? "open" : "entering");

  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!isOpen || prefersReducedMotion) return;
    const id = requestAnimationFrame(() => setPhase("open"));
    return () => cancelAnimationFrame(id);
  }, [isOpen, prefersReducedMotion]);

  useEffect(() => {
    if (phase !== "exiting") return;
    const timer = setTimeout(() => onCloseRef.current(), durationMs);
    return () => clearTimeout(timer);
  }, [phase, durationMs]);

  function requestClose() {
    if (prefersReducedMotion) {
      onCloseRef.current();
      return;
    }
    setPhase("exiting");
  }

  return { phase, requestClose };
}
```

Catatan: versi ini sedikit lebih kuat dari kode yang dipindahkan — `onClose` disimpan lewat
`onCloseRef` (bukan langsung jadi dependency `useEffect`), supaya kalau komponen induk
(`ProyekDetailModalRoute`) re-render saat fase "exiting" sedang berjalan (fungsi `onClose`
barunya beda identitas tiap render karena arrow function inline), timer penutupan tidak
ke-reset terus-menerus dan gagal pernah selesai. Ini perbaikan kecil yang sejalan, bukan
perubahan perilaku yang terlihat.

## 2. Sederhanakan `src/features/proyek/DetailProyekModal.tsx`

Ganti import di bagian atas dari:

```tsx
import { useEffect, useRef, useState } from "react";
import { useDialogA11y } from "../../shared/hooks/useDialogA11y";
import { useReducedMotion } from "../../shared/hooks/useReducedMotion";
import type { Proyek } from "./types";
```

menjadi:

```tsx
import { useRef } from "react";
import { useDialogA11y } from "../../shared/hooks/useDialogA11y";
import { useDialogTransition } from "../../shared/hooks/useDialogTransition";
import type { Proyek } from "./types";
```

Ganti seluruh blok dari awal fungsi komponen sampai baris `useDialogA11y(...)`:

```tsx
export function ProyekDetail(props: ProyekDetailProps) {
  const { proyek } = props;
  const isModal = props.presentation === "modal";
  const panelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<"entering" | "open" | "exiting">(
    !isModal || prefersReducedMotion ? "open" : "entering",
  );
  const onCloseProp = props.presentation === "modal" ? props.onClose : undefined;

  useEffect(() => {
    if (!isModal || prefersReducedMotion) return;
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

  useEffect(() => {
    if (phase !== "exiting" || !onCloseProp) return;
    const timer = setTimeout(onCloseProp, MODAL_TRANSITION_MS);
    return () => clearTimeout(timer);
  }, [phase, onCloseProp]);

  useDialogA11y(panelRef, isModal, handleClose);
```

menjadi:

```tsx
export function ProyekDetail(props: ProyekDetailProps) {
  const { proyek } = props;
  const isModal = props.presentation === "modal";
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseProp = props.presentation === "modal" ? props.onClose : undefined;
  const { phase, requestClose } = useDialogTransition(isModal, onCloseProp ?? (() => {}), MODAL_TRANSITION_MS);

  useDialogA11y(panelRef, isModal, requestClose);
```

Konstanta `MODAL_TRANSITION_MS` di atas komponen **tetap ada, tidak dipindah** ke hook (biar hook
tetap generik, durasinya tetap keputusan si pemanggil).

Lalu **ganti semua pemakaian `handleClose` di JSX bagian modal** (backdrop, wrapper pemusat
panel, tombol tutup) **menjadi `requestClose`** — cuma ganti nama, logikanya sudah pindah ke
hook. Bagian `konten` (JSX ringkasan proyek) dan struktur backdrop/wrapper/panel/tombol tutup
lainnya TIDAK berubah sama sekali.

---

## Sebelum lapor selesai

- Jalankan `tsc -b --noEmit`, `npm run lint`, `npm run build` — semua harus bersih.
- Cek `wc -l src/features/proyek/DetailProyekModal.tsx` — harus di bawah 150 baris sekarang.
- Uji manual: ulangi semua yang sudah dites sebelumnya (buka dari kartu, tutup lewat tombol X,
  klik backdrop, Esc, dengan dan tanpa "reduce motion") — hasilnya harus **identik** dengan
  sebelum refactor. Ini murni pemindahan kode, bukan perubahan perilaku.
- Ringkasan akhir maksimal 5 baris.
