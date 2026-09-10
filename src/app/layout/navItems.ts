export const NAV_ITEMS = [
  { id: "beranda", label: "Beranda" },
  { id: "tentang", label: "Tentang" },
  { id: "proyek", label: "Proyek" },
  { id: "berjalan", label: "Sedang Berjalan" },
  { id: "kerjasama", label: "Kerja Sama" },
  { id: "kontak", label: "Kontak" },
] as const;

export const SECTION_IDS = NAV_ITEMS.map((item) => item.id);
