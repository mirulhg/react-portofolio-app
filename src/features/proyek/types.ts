import { z } from "zod";

export const KATEGORI = ["Toko Online", "Situs Profil", "Dasbor", "Landing Page", "Aplikasi Mobile"] as const;

export const langkahProsesSchema = z.object({
  no: z.string(),
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
  tautan: z.string().url().nullable(),
  anonim: z.boolean().default(false),
  // Proyek inisiatif sendiri (bukan pesanan klien) — ditandai jujur di kartu & detail,
  // bukan disembunyikan atau dibaurkan seolah proyek klien (kesepakatan Amirul).
  mandiri: z.boolean().default(false),
});

export type Proyek = z.infer<typeof proyekSchema>;
export type LangkahProses = z.infer<typeof langkahProsesSchema>;

export function getKategoriAktif(searchParams: URLSearchParams): string {
  return searchParams.get("kategori") ?? "Semua";
}
