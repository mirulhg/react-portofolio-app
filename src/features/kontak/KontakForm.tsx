import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Kolom } from "../../shared/ui/Kolom";
import { KATEGORI } from "../proyek";
import { kontakFormSchema, type KontakFormValues } from "./KontakForm.schema";

function inputClass(hasError: boolean) {
  const base =
    "min-h-[48px] rounded-md border bg-bg-alt px-4 text-body text-ink placeholder:text-ink-muted focus-visible:border-focus";
  return `${base} ${hasError ? "border-danger" : "border-line-strong"}`;
}

export function KontakForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<KontakFormValues>({ resolver: zodResolver(kontakFormSchema), mode: "onSubmit" });

  async function onSubmit(data: KontakFormValues) {
    if (data.situsWeb) {
      // Honeypot terisi — kemungkinan bot. Tetap tampilkan "berhasil" supaya bot tidak
      // belajar formatnya, tapi jangan proses lebih lanjut.
      setIsSubmitted(true);
      return;
    }

    // Pengiriman disimulasikan — belum ada layanan backend yang disepakati (dilaporkan
    // sebagai gap yang diketahui, bukan pekerjaan yang lupa dikerjakan). `data` sudah
    // divalidasi skema di atas dan siap dikirim; sambungkan ke endpoint nyata (mis.
    // Formspree/Web3Forms/API sendiri) di sini begitu keputusan itu dibuat.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <div role="status" className="flex flex-col gap-4 rounded-lg border border-line bg-bg-raised p-8">
        <p className="text-body text-ink">
          Pesan tersimpan di form ini. Pengiriman sungguhan belum tersambung — untuk respons cepat, hubungi lewat
          salah satu kanal di atas.
        </p>
        <button
          type="button"
          onClick={() => {
            reset();
            setIsSubmitted(false);
          }}
          className="min-h-[48px] w-fit rounded-md border border-line-strong px-5 text-body-sm text-ink hover:border-focus"
        >
          Kirim pesan lain
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <Kolom id="nama" label="Nama" error={errors.nama?.message}>
        <input
          id="nama"
          {...register("nama")}
          aria-invalid={!!errors.nama}
          aria-describedby={errors.nama ? "nama-error" : undefined}
          placeholder="cth: Budi Santoso"
          className={inputClass(!!errors.nama)}
        />
      </Kolom>

      <Kolom id="kontak-input" label="Email atau WhatsApp" error={errors.kontak?.message}>
        <input
          id="kontak-input"
          {...register("kontak")}
          aria-invalid={!!errors.kontak}
          aria-describedby={errors.kontak ? "kontak-input-error" : undefined}
          placeholder="cth: budi@email.com atau 08123456789"
          className={inputClass(!!errors.kontak)}
        />
      </Kolom>

      <Kolom id="jenisProyek" label="Jenis proyek" error={errors.jenisProyek?.message}>
        <select
          id="jenisProyek"
          {...register("jenisProyek")}
          aria-invalid={!!errors.jenisProyek}
          aria-describedby={errors.jenisProyek ? "jenisProyek-error" : undefined}
          defaultValue=""
          className={inputClass(!!errors.jenisProyek)}
        >
          <option value="" disabled>
            Pilih jenis proyek
          </option>
          {KATEGORI.map((kategori) => (
            <option key={kategori} value={kategori}>
              {kategori}
            </option>
          ))}
        </select>
      </Kolom>

      <Kolom id="rentangAnggaran" label="Rentang anggaran" optional>
        <input
          id="rentangAnggaran"
          {...register("rentangAnggaran")}
          placeholder="cth: Rp5–10 juta"
          className={inputClass(false)}
        />
      </Kolom>

      <Kolom id="pesan" label="Pesan" error={errors.pesan?.message}>
        <textarea
          id="pesan"
          {...register("pesan")}
          aria-invalid={!!errors.pesan}
          aria-describedby={errors.pesan ? "pesan-error" : undefined}
          placeholder="cth: Saya butuh situs profil untuk studio saya, target rilis akhir bulan ini."
          rows={5}
          className={`${inputClass(!!errors.pesan)} min-h-[120px] resize-y py-3`}
        />
      </Kolom>

      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="situsWeb">Situs web</label>
        <input id="situsWeb" type="text" tabIndex={-1} autoComplete="off" {...register("situsWeb")} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-disabled={isSubmitting}
        className={`inline-flex min-h-[48px] w-fit items-center justify-center gap-2 rounded-md bg-grad-accent px-6 text-body font-medium text-bg-base transition-transform duration-[170ms] ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-70 ${isSubmitting ? "cursor-progress" : ""}`}
      >
        {isSubmitting && (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 animate-spin">
            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
            <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )}
        {isSubmitting ? "Mengirim…" : "Kirim pesan"}
      </button>
    </form>
  );
}
