import { proyekBerjalanSchema, type ProyekBerjalan } from "../types";

// Placeholder — karangan yang masuk akal, bukan proyek nyata. Ganti sebelum tayang
// (HANDOFF §7.2). Update progres direncanakan manual per HANDOFF §6.
const PROYEK_BERJALAN_MENTAH: ProyekBerjalan[] = [
  {
    id: "revamp-situs-klinik-sehat",
    title: "Revamp Situs Klinik Sehat",
    category: "Situs Profil",
    anonim: false,
    catatanAnonim: null,
    tahap: [
      { label: "Riset & lingkup", status: "selesai" },
      { label: "Desain", status: "selesai" },
      { label: "Pengembangan", status: "jalan" },
      { label: "Rilis", status: "belum" },
    ],
    diperbarui: "2026-09-05",
  },
  {
    id: "klien-b-dasbor-inventaris",
    title: "Klien B — Dasbor Inventaris",
    category: "Dasbor",
    anonim: true,
    catatanAnonim: "Nama klien dirahasiakan atas permintaan, sesuai kesepakatan kerja sama.",
    tahap: [
      { label: "Riset & lingkup", status: "selesai" },
      { label: "Desain", status: "jalan" },
      { label: "Pengembangan", status: "belum" },
      { label: "Rilis", status: "belum" },
    ],
    diperbarui: "2026-09-02",
  },
  {
    id: "landing-page-kelas-online",
    title: "Landing Page Kelas Online",
    category: "Landing Page",
    anonim: false,
    catatanAnonim: null,
    tahap: [
      { label: "Riset & lingkup", status: "selesai" },
      { label: "Desain", status: "selesai" },
      { label: "Pengembangan", status: "selesai" },
      { label: "Rilis", status: "jalan" },
    ],
    diperbarui: "2026-07-01",
  },
];

export const ongoingProjects: ProyekBerjalan[] = PROYEK_BERJALAN_MENTAH.map((proyek) =>
  proyekBerjalanSchema.parse(proyek),
);
