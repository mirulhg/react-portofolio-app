// Konten modal saat slug di /proyek/:slug tidak cocok dengan proyek mana pun
// (tautan lama/typo) — dipecah dari DetailProyekModal.tsx supaya file itu
// tidak lewat batas 150 baris (CLAUDE.md).
export function ProyekTidakDitemukan() {
  return (
    <div className="flex flex-col gap-3">
      <h2 id="detail-proyek-judul" className="font-heading text-h2 font-semibold text-ink">
        Proyek tidak ditemukan
      </h2>
      <p className="text-body text-ink-muted">
        Tautan ini mungkin sudah tidak berlaku atau proyeknya sudah dihapus.
      </p>
    </div>
  );
}
