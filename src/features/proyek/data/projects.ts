import { proyekSchema, type Proyek } from "../types";

const PROSES_STANDAR = [
  { no: "01", teks: "Riset kebutuhan dan susun lingkup bersama klien." },
  { no: "02", teks: "Rancang alur & wireframe, revisi sampai disetujui." },
  { no: "03", teks: "Bangun front-end + integrasi, uji di perangkat nyata." },
  { no: "04", teks: "Rilis, pantau performa, serah terima dokumentasi." },
];

// Placeholder — karangan yang masuk akal, bukan proyek nyata. Ganti sebelum tayang
// (HANDOFF §7.2). Semua `sampul: null` sampai ada aset asli (HANDOFF §7.3).
const PROYEK_MENTAH: Proyek[] = [
  {
    slug: "toko-kopi-nusantara",
    title: "Toko Kopi Nusantara",
    category: "Toko Online",
    blurb: "Katalog produk kopi + checkout, dari toko fisik yang baru pertama kali jualan online.",
    sampul: null,
    masalah: "Pemilik toko kopi jualan lewat chat WhatsApp manual, sering kehilangan pesanan saat ramai.",
    peran: "Front-end penuh: katalog, keranjang, dan integrasi pembayaran.",
    proses: PROSES_STANDAR,
    hasil: "Pesanan tercatat otomatis, waktu proses order turun dari ~15 menit ke di bawah 2 menit.",
    tautan: "https://example.com/toko-kopi-nusantara",
    anonim: false,
    mandiri: false,
  },
  {
    slug: "klien-a-butik",
    title: "Klien A — Toko Online Butik",
    category: "Toko Online",
    blurb: "Situs belanja pakaian dengan filter ukuran & warna, identitas klien dirahasiakan atas permintaan.",
    sampul: null,
    masalah: "Katalog lama sulit dicari, pelanggan sering salah pesan ukuran.",
    peran: "Front-end + desain sistem filter produk.",
    proses: PROSES_STANDAR,
    hasil: "Tingkat retur karena salah ukuran turun signifikan setelah filter diperjelas.",
    tautan: "https://example.com/klien-a-butik",
    anonim: true,
    mandiri: false,
  },
  {
    slug: "profil-studio-ares",
    title: "Profil Studio Ares",
    category: "Situs Profil",
    blurb: "Situs portofolio studio desain interior, fokus galeri foto proyek dan formulir konsultasi.",
    sampul: null,
    masalah: "Studio belum punya kehadiran online, calon klien cuma bisa lihat portofolio via Instagram.",
    peran: "Front-end + optimasi galeri gambar untuk perangkat seluler.",
    proses: PROSES_STANDAR,
    hasil: "Permintaan konsultasi via formulir jadi kanal masuk kedua terbesar setelah rujukan.",
    tautan: "https://example.com/profil-studio-ares",
    anonim: false,
    mandiri: false,
  },
  {
    slug: "dasbor-operasional-gudang",
    title: "Dasbor Operasional Gudang",
    category: "Dasbor",
    blurb: "Dasbor pemantauan stok & pengiriman real-time untuk tim gudang skala menengah.",
    sampul: null,
    masalah: "Tim gudang pantau stok lewat spreadsheet yang sering telat diperbarui.",
    peran: "Front-end dasbor: tabel data besar, filter, dan grafik ringkas.",
    proses: PROSES_STANDAR,
    hasil: "Waktu deteksi stok menipis turun dari harian jadi real-time.",
    tautan: "https://example.com/dasbor-operasional-gudang",
    anonim: false,
    mandiri: false,
  },
  {
    slug: "dasbor-keuangan-internal",
    title: "Dasbor Keuangan Internal",
    category: "Dasbor",
    blurb: "Ringkasan arus kas & anggaran tim untuk kebutuhan internal perusahaan kecil.",
    sampul: null,
    masalah: "Laporan keuangan tersebar di banyak file, sulit dibaca cepat oleh pemilik usaha.",
    peran: "Front-end dasbor + kerja sama dengan akuntan untuk struktur data.",
    proses: PROSES_STANDAR,
    hasil: "Proyek internal, situs sudah tidak dioperasikan lagi setelah kontrak selesai.",
    tautan: null,
    anonim: false,
    mandiri: false,
  },
  {
    slug: "landing-page-tabungan-digital",
    title: "Landing Page Tabungan Digital",
    category: "Landing Page",
    blurb: "Halaman peluncuran aplikasi tabungan digital, fokus konversi unduhan aplikasi.",
    sampul: null,
    masalah: "Peluncuran aplikasi butuh satu halaman cepat yang menjelaskan manfaat dalam hitungan detik.",
    peran: "Front-end + kolaborasi dengan tim pemasaran untuk salinan halaman.",
    proses: PROSES_STANDAR,
    hasil: "Halaman termuat di bawah 1,5 detik di seluler, jadi rujukan utama kampanye iklan.",
    tautan: "https://example.com/landing-tabungan-digital",
    anonim: false,
    mandiri: false,
  },
  {
    slug: "pelacak-langganan-digital",
    title: "Pelacak Langganan Digital",
    category: "Dasbor",
    blurb: "Aplikasi pencatat & penghitung biaya langganan digital, konversi mata uang & tanggal tagih otomatis.",
    sampul: null,
    masalah:
      "Biaya langganan digital terfragmentasi ke banyak transaksi kecil, penagihannya pasif/otomatis " +
      "jadi jarang dievaluasi, dan satuannya tidak seragam (bulanan vs tahunan, macam-macam mata uang) " +
      "— sehingga total pengeluaran sulit disadari pemiliknya sendiri.",
    peran:
      "Merancang & membangun sendiri dari nol: model data, algoritma tanggal penagihan berulang " +
      "(termasuk kasus akhir bulan & tahun kabisat), normalisasi biaya lintas siklus & mata uang, " +
      "integrasi API kurs eksternal, sampai pengujian unit.",
    proses: [
      { no: "01", teks: "Rancang model data & algoritma sebelum menulis UI." },
      { no: "02", teks: "Bangun inti minimal: tambah/ubah/hapus/arsip, total bulanan-tahunan, simpan lokal." },
      { no: "03", teks: "Tambah penyaringan & pengurutan, status tersimpan di URL." },
      { no: "04", teks: "Integrasikan konversi mata uang dengan keadaan async lengkap (memuat/gagal/kosong/berhasil)." },
      { no: "05", teks: "Tambah penanda \"segera ditagih\", ekspor/impor JSON, audit aksesibilitas WCAG 2.1 AA." },
    ],
    hasil:
      "Lima tahap pengembangan selesai, 12 kebutuhan fungsional terpenuhi, logika perhitungan diuji " +
      "unit (fungsi murni tanpa dependency React), dan audit aksesibilitas menemukan + memperbaiki " +
      "satu isu nyata (animasi tidak menghormati prefers-reduced-motion).",
    tautan: "https://subscribe-tracker.netlify.app/",
    anonim: false,
    mandiri: true,
  },
];

export const projects: Proyek[] = PROYEK_MENTAH.map((proyek) => proyekSchema.parse(proyek));
