import { Button } from "../../shared/ui/Button";

export function ProfilPage() {
  return (
    <main className="px-section-px py-section-py">
      <div className="mx-auto flex max-w-content flex-col items-start gap-6">
        <Button to="/" variant="ghost">
          ← Kembali ke Beranda
        </Button>
        <div className="flex flex-col gap-3">
          <h1 className="font-heading text-h2 font-semibold text-ink">Detail Profil</h1>
          <p className="text-body text-ink-muted">
            Halaman ini masih rencana dan belum berisi konten. Info singkat untuk sekarang bisa
            dilihat di bagian Tentang pada beranda.
          </p>
        </div>
      </div>
    </main>
  );
}
