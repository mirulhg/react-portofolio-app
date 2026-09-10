import { z } from "zod";
import { KATEGORI } from "../proyek";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WHATSAPP_REGEX = /^\+?\d{9,15}$/;

function isKontakValid(nilai: string): boolean {
  return EMAIL_REGEX.test(nilai) || WHATSAPP_REGEX.test(nilai.replace(/[\s-]/g, ""));
}

export const kontakFormSchema = z
  .object({
    nama: z.string().min(1, "Nama perlu diisi supaya saya tahu harus memanggil siapa."),
    kontak: z.string().min(1, "Tanpa ini saya tidak bisa membalas."),
    jenisProyek: z.enum(KATEGORI, { message: "Pilih salah satu jenis proyek." }),
    rentangAnggaran: z.string().optional(),
    pesan: z
      .string()
      .min(20, "Ceritakan sedikit lebih banyak — minimal 20 karakter supaya saya paham kebutuhannya."),
    // Honeypot: field ini disembunyikan dari pengguna asli lewat CSS + tabIndex di form.
    // Bot pengisi form otomatis biasanya tetap mengisinya.
    situsWeb: z.string().optional(),
  })
  .refine((data) => isKontakValid(data.kontak), {
    path: ["kontak"],
    message: "Isi dengan email atau nomor WhatsApp yang valid.",
  });

export type KontakFormValues = z.infer<typeof kontakFormSchema>;
