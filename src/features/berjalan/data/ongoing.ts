import { proyekBerjalanSchema, type ProyekBerjalan } from "../types";

const PROYEK_BERJALAN_MENTAH: ProyekBerjalan[] = [
  {
    id: "posisi-minisoccer",
    title: "Position & Role Finder Minisoccer",
    category: "Dasbor",
    anonim: false,
    catatanAnonim: null,
    tahap: [
      { label: "Riset & lingkup", status: "selesai" },
      { label: "Desain", status: "selesai" },
      { label: "Pengembangan", status: "jalan" },
      { label: "Rilis", status: "belum" },
    ],
    diperbarui: "2026-09-24",
  },
];

export const ongoingProjects: ProyekBerjalan[] = PROYEK_BERJALAN_MENTAH.map((proyek) =>
  proyekBerjalanSchema.parse(proyek),
);
