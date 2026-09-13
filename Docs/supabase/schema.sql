-- Jalankan file ini di Supabase Dashboard > SQL Editor > New query > Run.
-- Membuat tabel `projects` sesuai bentuk data proyek portofolio, plus
-- Row Level Security supaya situs publik hanya bisa MEMBACA, tidak menulis.

create table if not exists public.projects (
  slug text primary key check (slug ~ '^[a-z0-9-]+$'),
  title text not null,
  category text not null check (
    category in ('Toko Online', 'Situs Profil', 'Dasbor', 'Landing Page', 'Aplikasi Mobile')
  ),
  blurb text not null check (char_length(blurb) <= 120),
  sampul jsonb,               -- null, atau {"src": "...", "alt": "..."}
  masalah text not null,
  peran text not null,
  proses jsonb not null,      -- array [{"no": "01", "teks": "..."}, ...]
  hasil text not null,
  tautan text,
  anonim boolean not null default false,
  mandiri boolean not null default false,
  created_at timestamptz not null default now()
);

-- Aktifkan Row Level Security: tanpa ini, tabel baru otomatis TERKUNCI TOTAL
-- (bahkan baca pun ditolak) kalau RLS dinyalakan manual nanti tanpa policy.
alter table public.projects enable row level security;

-- Situs (pakai anon key) hanya boleh MEMBACA baris ini.
create policy "Publik bisa membaca proyek"
  on public.projects
  for select
  to anon, authenticated
  using (true);

-- Sengaja TIDAK ada policy insert/update/delete untuk anon/authenticated:
-- artinya situs publik tidak bisa mengubah data sama sekali lewat anon key.
-- Kamu tetap bisa tambah/ubah/hapus baris lewat Table Editor di dashboard,
-- karena dashboard terhubung pakai kredensial pemilik project (service role),
-- yang otomatis melewati RLS.

-- ---------------------------------------------------------------------
-- Seed: pindahkan 7 proyek contoh yang sudah ada di
-- src/features/proyek/data/projects.ts supaya situs tidak kosong.
-- Aman dijalankan berulang (ON CONFLICT DO NOTHING).
-- ---------------------------------------------------------------------

insert into public.projects
  (slug, title, category, blurb, sampul, masalah, peran, proses, hasil, tautan, anonim, mandiri)
values
  (
    'toko-kopi-nusantara',
    'Toko Kopi Nusantara',
    'Toko Online',
    'Katalog produk kopi + checkout, dari toko fisik yang baru pertama kali jualan online.',
    null,
    'Pemilik toko kopi jualan lewat chat WhatsApp manual, sering kehilangan pesanan saat ramai.',
    'Front-end penuh: katalog, keranjang, dan integrasi pembayaran.',
    '[{"no":"01","teks":"Riset kebutuhan dan susun lingkup bersama klien."},{"no":"02","teks":"Rancang alur & wireframe, revisi sampai disetujui."},{"no":"03","teks":"Bangun front-end + integrasi, uji di perangkat nyata."},{"no":"04","teks":"Rilis, pantau performa, serah terima dokumentasi."}]',
    'Pesanan tercatat otomatis, waktu proses order turun dari ~15 menit ke di bawah 2 menit.',
    'https://example.com/toko-kopi-nusantara',
    false,
    false
  ),
  (
    'klien-a-butik',
    'Klien A — Toko Online Butik',
    'Toko Online',
    'Situs belanja pakaian dengan filter ukuran & warna, identitas klien dirahasiakan atas permintaan.',
    null,
    'Katalog lama sulit dicari, pelanggan sering salah pesan ukuran.',
    'Front-end + desain sistem filter produk.',
    '[{"no":"01","teks":"Riset kebutuhan dan susun lingkup bersama klien."},{"no":"02","teks":"Rancang alur & wireframe, revisi sampai disetujui."},{"no":"03","teks":"Bangun front-end + integrasi, uji di perangkat nyata."},{"no":"04","teks":"Rilis, pantau performa, serah terima dokumentasi."}]',
    'Tingkat retur karena salah ukuran turun signifikan setelah filter diperjelas.',
    'https://example.com/klien-a-butik',
    true,
    false
  ),
  (
    'profil-studio-ares',
    'Profil Studio Ares',
    'Situs Profil',
    'Situs portofolio studio desain interior, fokus galeri foto proyek dan formulir konsultasi.',
    null,
    'Studio belum punya kehadiran online, calon klien cuma bisa lihat portofolio via Instagram.',
    'Front-end + optimasi galeri gambar untuk perangkat seluler.',
    '[{"no":"01","teks":"Riset kebutuhan dan susun lingkup bersama klien."},{"no":"02","teks":"Rancang alur & wireframe, revisi sampai disetujui."},{"no":"03","teks":"Bangun front-end + integrasi, uji di perangkat nyata."},{"no":"04","teks":"Rilis, pantau performa, serah terima dokumentasi."}]',
    'Permintaan konsultasi via formulir jadi kanal masuk kedua terbesar setelah rujukan.',
    'https://example.com/profil-studio-ares',
    false,
    false
  ),
  (
    'dasbor-operasional-gudang',
    'Dasbor Operasional Gudang',
    'Dasbor',
    'Dasbor pemantauan stok & pengiriman real-time untuk tim gudang skala menengah.',
    null,
    'Tim gudang pantau stok lewat spreadsheet yang sering telat diperbarui.',
    'Front-end dasbor: tabel data besar, filter, dan grafik ringkas.',
    '[{"no":"01","teks":"Riset kebutuhan dan susun lingkup bersama klien."},{"no":"02","teks":"Rancang alur & wireframe, revisi sampai disetujui."},{"no":"03","teks":"Bangun front-end + integrasi, uji di perangkat nyata."},{"no":"04","teks":"Rilis, pantau performa, serah terima dokumentasi."}]',
    'Waktu deteksi stok menipis turun dari harian jadi real-time.',
    'https://example.com/dasbor-operasional-gudang',
    false,
    false
  ),
  (
    'dasbor-keuangan-internal',
    'Dasbor Keuangan Internal',
    'Dasbor',
    'Ringkasan arus kas & anggaran tim untuk kebutuhan internal perusahaan kecil.',
    null,
    'Laporan keuangan tersebar di banyak file, sulit dibaca cepat oleh pemilik usaha.',
    'Front-end dasbor + kerja sama dengan akuntan untuk struktur data.',
    '[{"no":"01","teks":"Riset kebutuhan dan susun lingkup bersama klien."},{"no":"02","teks":"Rancang alur & wireframe, revisi sampai disetujui."},{"no":"03","teks":"Bangun front-end + integrasi, uji di perangkat nyata."},{"no":"04","teks":"Rilis, pantau performa, serah terima dokumentasi."}]',
    'Proyek internal, situs sudah tidak dioperasikan lagi setelah kontrak selesai.',
    null,
    false,
    false
  ),
  (
    'landing-page-tabungan-digital',
    'Landing Page Tabungan Digital',
    'Landing Page',
    'Halaman peluncuran aplikasi tabungan digital, fokus konversi unduhan aplikasi.',
    null,
    'Peluncuran aplikasi butuh satu halaman cepat yang menjelaskan manfaat dalam hitungan detik.',
    'Front-end + kolaborasi dengan tim pemasaran untuk salinan halaman.',
    '[{"no":"01","teks":"Riset kebutuhan dan susun lingkup bersama klien."},{"no":"02","teks":"Rancang alur & wireframe, revisi sampai disetujui."},{"no":"03","teks":"Bangun front-end + integrasi, uji di perangkat nyata."},{"no":"04","teks":"Rilis, pantau performa, serah terima dokumentasi."}]',
    'Halaman termuat di bawah 1,5 detik di seluler, jadi rujukan utama kampanye iklan.',
    'https://example.com/landing-tabungan-digital',
    false,
    false
  ),
  (
    'pelacak-langganan-digital',
    'Pelacak Langganan Digital',
    'Dasbor',
    'Aplikasi pencatat & penghitung biaya langganan digital, konversi mata uang & tanggal tagih otomatis.',
    null,
    'Biaya langganan digital terfragmentasi ke banyak transaksi kecil, penagihannya pasif/otomatis jadi jarang dievaluasi, dan satuannya tidak seragam (bulanan vs tahunan, macam-macam mata uang) — sehingga total pengeluaran sulit disadari pemiliknya sendiri.',
    'Merancang & membangun sendiri dari nol: model data, algoritma tanggal penagihan berulang (termasuk kasus akhir bulan & tahun kabisat), normalisasi biaya lintas siklus & mata uang, integrasi API kurs eksternal, sampai pengujian unit.',
    '[{"no":"01","teks":"Rancang model data & algoritma sebelum menulis UI."},{"no":"02","teks":"Bangun inti minimal: tambah/ubah/hapus/arsip, total bulanan-tahunan, simpan lokal."},{"no":"03","teks":"Tambah penyaringan & pengurutan, status tersimpan di URL."},{"no":"04","teks":"Integrasikan konversi mata uang dengan keadaan async lengkap (memuat/gagal/kosong/berhasil)."},{"no":"05","teks":"Tambah penanda \\"segera ditagih\\", ekspor/impor JSON, audit aksesibilitas WCAG 2.1 AA."}]',
    'Lima tahap pengembangan selesai, 12 kebutuhan fungsional terpenuhi, logika perhitungan diuji unit (fungsi murni tanpa dependency React), dan audit aksesibilitas menemukan + memperbaiki satu isu nyata (animasi tidak menghormati prefers-reduced-motion).',
    'https://subscribe-tracker.netlify.app/',
    false,
    true
  )
on conflict (slug) do nothing;
