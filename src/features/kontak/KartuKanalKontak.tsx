interface Kanal {
  label: string;
  nilai: string;
  href: string;
}

// Placeholder — ganti dengan kontak asli sebelum tayang (pola sama seperti "Nama Anda" di
// features/beranda/Hero.tsx).
const KANAL: Kanal[] = [
  { label: "Surel", nilai: "halo@contoh-email.com", href: "mailto:halo@contoh-email.com" },
  // WhatsApp sengaja disembunyikan dulu (belum siap ditampilkan). Tambahkan kembali ke
  // array ini saat sudah siap: { label: "WhatsApp", nilai: "...", href: "https://wa.me/..." }.
  { label: "LinkedIn", nilai: "linkedin.com/in/nama-anda", href: "https://linkedin.com/in/nama-anda" },
];

export function KartuKanalKontak() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {KANAL.map((kanal) => (
        <a
          key={kanal.label}
          href={kanal.href}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col gap-1 rounded-lg border border-line bg-bg-raised p-5 transition-transform duration-[170ms] ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]"
        >
          <span className="text-label uppercase text-ink-faint">{kanal.label}</span>
          <span className="text-body text-ink">{kanal.nilai}</span>
        </a>
      ))}
    </div>
  );
}
