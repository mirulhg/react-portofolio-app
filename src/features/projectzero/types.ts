import { z } from "zod";

// Progres di sini angka langsung dari Amirul (bukan dihitung dari tahap seperti
// proyekBerjalanSchema), karena proyek game pribadi ini belum dipecah per tahap kerja.
export const proyekGameSchema = z.object({
  id: z.string(),
  judul: z.string().min(1),
  persen: z.number().min(0).max(100),
});

export type ProyekGame = z.infer<typeof proyekGameSchema>;
