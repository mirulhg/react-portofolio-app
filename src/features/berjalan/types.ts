import { z } from "zod";
import { KATEGORI } from "../proyek";

export const tahapSchema = z.object({
  label: z.string().min(1),
  status: z.enum(["selesai", "jalan", "belum"]),
});

// Deviasi dari HANDOFF §3: `persen` TIDAK jadi field skema. HANDOFF sendiri bilang
// "boleh dihitung dari rasio tahap selesai... putuskan satu, jangan dua-duanya" —
// CLAUDE.md §4 tangga state minta turunkan, jangan simpan. Lihat hitungPersenSelesai().
export const proyekBerjalanSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  category: z.enum(KATEGORI),
  anonim: z.boolean().default(false),
  catatanAnonim: z.string().nullable(),
  tahap: z.array(tahapSchema).min(1),
  diperbarui: z.string().date(),
});

export type Tahap = z.infer<typeof tahapSchema>;
export type ProyekBerjalan = z.infer<typeof proyekBerjalanSchema>;

export function hitungPersenSelesai(tahap: Tahap[]): number {
  const selesai = tahap.filter((item) => item.status === "selesai").length;
  return Math.round((selesai / tahap.length) * 100);
}

export function getTahapSekarang(tahap: Tahap[]): Tahap | undefined {
  return tahap.find((item) => item.status === "jalan");
}
