import { proyekGameSchema, type ProyekGame } from "../types";

// Data sementara dari Amirul, diperbarui manual saat progresnya berubah.
const PROYEK_GAME_MENTAH: ProyekGame[] = [
  { id: "antihero", judul: "AntiHero", persen: 10 },
  { id: "goblinslayer", judul: "GoblinSlayer", persen: 20 },
];

export const proyekGame: ProyekGame[] = PROYEK_GAME_MENTAH.map((proyek) =>
  proyekGameSchema.parse(proyek),
);
