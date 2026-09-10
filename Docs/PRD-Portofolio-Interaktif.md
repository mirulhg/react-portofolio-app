# PRD — Portofolio Interaktif

| | |
|---|---|
| **Produk** | Portofolio Interaktif |
| **Status** | Perencanaan |
| **Versi dokumen** | 0.1 (draf) |
| **Tanggal** | 8 September 2026 |
| **Sumber** | Peta fitur (8 fitur utama, 4 fase) |

---

## 1. Ringkasan

Portofolio Interaktif adalah situs web personal satu-halaman (atau multi-bagian) yang menampilkan identitas, keahlian, dan hasil kerja pemilik kepada calon klien. Berbeda dari portofolio statis pada umumnya, produk ini menampilkan **proyek yang sedang berjalan** beserta kemajuannya, serta menjelaskan **cara kerja sama** secara terbuka — sehingga calon klien bisa menilai kapasitas dan kecocokan sebelum menghubungi.

Lapisan interaksi (animasi, transisi, respons tombol) menjadi bukti kemampuan itu sendiri, bukan sekadar hiasan.

## 2. Masalah yang diselesaikan

1. Calon klien sulit menilai apakah pemilik portofolio sedang punya kapasitas untuk proyek baru.
2. Portofolio statis hanya menampilkan hasil akhir, tidak menunjukkan proses dan cara bekerja.
3. Pertanyaan soal alur kerja, kontrak, dan biaya biasanya baru terjawab setelah beberapa kali bolak-balik pesan — memperlambat konversi.

## 3. Tujuan dan metrik keberhasilan

| Tujuan | Metrik | Target awal |
|---|---|---|
| Mengubah pengunjung menjadi prospek | Rasio pengiriman formulir kontak | ≥ 3% dari pengunjung unik |
| Menyaring prospek yang cocok | Persentase pesan masuk yang menyebut anggaran/lingkup | ≥ 50% |
| Membuktikan kualitas kerja | Rata-rata durasi kunjungan | ≥ 90 detik |
| Menjaga kedalaman kunjungan | Pengunjung yang membuka minimal 1 detail proyek | ≥ 40% |
| Menjaga performa | Largest Contentful Paint di perangkat seluler | ≤ 2,5 detik |

## 4. Target pengguna

**Persona utama — Calon klien.** Datang dari rujukan atau media sosial. Ingin cepat tahu: apa yang dikerjakan, apakah hasilnya bagus, berapa biayanya, dan apakah orangnya bisa dihubungi. Rentang perhatian pendek, sering mengakses lewat ponsel.

**Persona sekunder — Rekan atau perekrut.** Mencari bukti keahlian teknis spesifik dan konsistensi kualitas lintas proyek.

**Persona tersier — Pemilik portofolio (admin).** Perlu memperbarui daftar proyek dan status kemajuan tanpa menyentuh kode setiap kali.

## 5. Ruang lingkup dan roadmap

| Fase | Fitur | Tujuan fase |
|---|---|---|
| **Fase 1** | Beranda Utama, Navigasi Halaman | Kerangka situs bisa diakses dan dijelajahi |
| **Fase 2** | Pengenalan Diri, Hasil Proyek Selesai, Proyek Sedang Berjalan | Isi utama — nilai inti produk |
| **Fase 3** | Cara Kerja Sama, Kontak Pribadi | Jalur konversi tertutup |
| **Fase 4** | Gerakan & Interaksi | Pemolesan dan pembeda |

Fase 1–3 membentuk versi yang layak rilis. Fase 4 memperkaya, bukan memblokir peluncuran.

---

## 6. Rincian fitur

### F1 — Beranda Utama · Fase 1

Kesan pertama. Harus menjawab "siapa ini dan kenapa saya harus lanjut membaca" dalam lima detik.

**Sub-fitur:** Profil mini · Tagline penarik · Tombol ajakan

**Kriteria penerimaan**
- Nama, foto/avatar, dan peran tampil tanpa perlu menggulir di layar 360 × 640 px.
- Tagline maksimal dua baris pada layar seluler.
- Tombol ajakan mengarah ke bagian Kontak atau Hasil Proyek; keduanya terlacak sebagai peristiwa analitik terpisah.
- Bagian ini termuat penuh tanpa bergantung pada skrip animasi.

### F2 — Navigasi Halaman · Fase 1

**Sub-fitur:** Menu utama · Menu responsif · Indikator posisi

**Kriteria penerimaan**
- Menu memuat tautan ke seluruh bagian utama dan tetap terlihat saat menggulir.
- Di bawah 768 px menu beralih ke bentuk ringkas (drawer/hamburger) yang bisa dibuka-tutup dengan papan ketik.
- Indikator posisi menandai bagian aktif saat pengguna menggulir, dengan jeda pembaruan ≤ 200 ms.
- Seluruh butir menu dapat dijangkau dengan tombol Tab dan memiliki penanda fokus yang terlihat.

### F3 — Pengenalan Diri · Fase 2

**Sub-fitur:** Kisah singkat · Keahlian utama · Prinsip kerja

**Kriteria penerimaan**
- Kisah singkat maksimal 150 kata.
- Keahlian ditampilkan sebagai daftar terkelompok, bukan bilah persentase (persentase keahlian sulit diverifikasi dan menurunkan kredibilitas).
- Prinsip kerja berupa 3–5 poin, masing-masing satu kalimat.

### F4 — Hasil Proyek Selesai · Fase 2

Etalase utama. Bagian yang paling menentukan penilaian kualitas.

**Sub-fitur:** Galeri visual · Detail proyek · Filter kategori · *(satu sub-fitur belum terbaca — lihat §9)*

**Kriteria penerimaan**
- Galeri menampilkan minimal 6 proyek dengan gambar sampul, judul, dan kategori.
- Halaman/panel detail memuat: ringkasan masalah, peran yang diambil, proses, hasil, dan tautan langsung bila ada.
- Filter kategori bekerja tanpa memuat ulang halaman dan status filter tercermin di URL agar bisa dibagikan.
- Gambar dimuat secara bertahap (*lazy load*) dan disajikan dalam format modern (WebP/AVIF) dengan cadangan.
- Kondisi kosong ditangani: bila filter tidak menghasilkan apa pun, tampil pesan dan tombol reset.

### F5 — Proyek Sedang Berjalan · Fase 2

Pembeda utama produk ini. Menunjukkan bahwa pemilik aktif bekerja sekaligus memberi sinyal kapasitas.

**Sub-fitur:** Daftar proyek aktif · Batang kemajuan · Tahap terselesaikan · *(satu sub-fitur belum terbaca)*

**Kriteria penerimaan**
- Setiap proyek aktif menampilkan nama (boleh disamarkan), jenis pekerjaan, dan persentase kemajuan.
- Batang kemajuan disertai label teks (mis. "60%") agar tidak bergantung pada warna semata.
- Daftar tahap menunjukkan mana yang sudah selesai dan mana yang sedang dikerjakan.
- Ada tanggal pembaruan terakhir di setiap kartu. Data yang tidak diperbarui lebih dari 30 hari ditandai sebagai basi di sisi admin.
- Nama klien yang terikat NDA tidak boleh muncul; tersedia opsi anonimisasi per proyek.

### F6 — Cara Kerja Sama · Fase 3

Menjawab pertanyaan yang biasanya baru muncul di percakapan pertama.

**Sub-fitur:** Alur kerja · Ketentuan kontrak · Biaya dan pembayaran · *(satu sub-fitur belum terbaca)*

**Kriteria penerimaan**
- Alur kerja dipecah menjadi tahap bernomor dengan perkiraan durasi tiap tahap.
- Ketentuan kontrak menjelaskan: kepemilikan hasil, jumlah revisi, dan kebijakan pembatalan.
- Bagian biaya menampilkan minimal rentang harga atau harga mulai — bukan "hubungi untuk info". Ini fungsi penyaringan utamanya.
- Metode dan termin pembayaran disebutkan eksplisit.

### F7 — Kontak Pribadi · Fase 3

**Sub-fitur:** Saluran kontak · Formulir pesan

**Kriteria penerimaan**
- Minimal dua saluran alternatif selain formulir (surel, WhatsApp, atau LinkedIn).
- Formulir memuat: nama, kontak balik, jenis proyek, rentang anggaran, dan pesan.
- Validasi berjalan di sisi klien dan server; pesan galat menempel pada kolom yang bermasalah.
- Ada perlindungan spam yang tidak mengganggu (honeypot atau CAPTCHA tak terlihat).
- Setelah kirim: konfirmasi di layar + surel otomatis ke pengirim, dan notifikasi ke pemilik dalam ≤ 1 menit.
- Pengiriman gagal tidak menghapus isi formulir.

### F8 — Gerakan & Interaksi · Fase 4

**Sub-fitur:** Animasi saat membaca · Respons tombol · Peralihan antar bagian · *(satu sub-fitur belum terbaca)*

**Kriteria penerimaan**
- Animasi masuk terpicu saat elemen memasuki layar, berjalan sekali, durasi 200–400 ms.
- Setiap elemen interaktif punya keadaan *hover*, *aktif*, *fokus*, dan *nonaktif* yang berbeda.
- `prefers-reduced-motion: reduce` dihormati — animasi dinonaktifkan, bukan sekadar dipercepat.
- Animasi tidak menyebabkan pergeseran tata letak (CLS ≤ 0,1).
- Konten tetap terbaca penuh bila JavaScript gagal dimuat.

---

## 7. Kebutuhan non-fungsional

**Performa.** LCP ≤ 2,5 s dan CLS ≤ 0,1 pada koneksi 4G seluler. Bobot halaman awal ≤ 1 MB sebelum gambar galeri.

**Responsif.** Titik henti pada 360 px, 768 px, 1024 px, dan 1440 px. Rancang mulai dari layar terkecil.

**Aksesibilitas.** Target WCAG 2.1 AA: kontras teks ≥ 4,5:1, seluruh fungsi dapat dioperasikan dengan papan ketik, area sentuh ≥ 44 × 44 px, struktur judul yang benar.

**SEO.** Judul dan deskripsi meta unik per bagian/halaman detail, data terstruktur `Person` dan `CreativeWork`, peta situs, dan gambar Open Graph.

**Peramban.** Dua versi terakhir Chrome, Safari, Firefox, dan Edge.

**Pengelolaan konten.** Data proyek disimpan terpisah dari kode (berkas JSON/Markdown atau CMS ringan) sehingga pembaruan kemajuan tidak menuntut penerapan ulang oleh pengembang.

**Privasi.** Analitik tanpa kuki pihak ketiga bila memungkinkan. Data formulir hanya disimpan selama diperlukan dan tidak dibagikan.

## 8. Di luar cakupan (versi ini)

- Blog atau publikasi artikel
- Dukungan multibahasa
- Akun pengguna, login, atau area klien
- Pembayaran atau pemesanan langsung di situs
- Mode gelap/terang yang dapat dialihkan (dipertimbangkan setelah Fase 4)

## 9. Asumsi dan pertanyaan terbuka

**Asumsi dari pembacaan peta fitur**
- "Hasil Proyek Sele…" dibaca sebagai **Hasil Proyek Selesai**.
- "Proyek Sedang B…" dibaca sebagai **Proyek Sedang Berjalan**.

**Sub-fitur yang belum terbaca.** Empat fitur menandai jumlah sub-fitur lebih banyak daripada yang tampil di layar (F4, F5, F6, dan F8 masing-masing menunjukkan 4 sub-fitur, tetapi hanya 3 yang terlihat). Perlu dilengkapi sebelum PRD dikunci.

**Pertanyaan yang perlu dijawab**
1. Apakah struktur situs satu halaman panjang atau beberapa halaman terpisah? Ini memengaruhi rancangan Navigasi dan Indikator posisi.
2. Berapa banyak proyek yang siap ditampilkan saat peluncuran? Bila di bawah 4, galeri dengan filter terasa kosong.
3. Seberapa terbuka informasi biaya yang bersedia dipublikasikan — rentang, harga mulai, atau paket tetap?
4. Bagaimana kemajuan proyek berjalan diperbarui: manual, atau ditarik dari alat manajemen proyek yang sudah dipakai?
5. Apakah ada klien dengan NDA yang proyeknya tetap ingin ditampilkan dalam bentuk anonim?

## 10. Risiko

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Proyek berjalan tidak diperbarui rutin sehingga tampak terbengkalai | Kredibilitas turun, lebih buruk daripada tidak ada fitur ini | Tanggal pembaruan terlihat + pengingat berkala; sembunyikan otomatis kartu yang basi > 60 hari |
| Animasi Fase 4 memberatkan perangkat kelas bawah | Pengunjung seluler pergi sebelum konten termuat | Anggaran performa ditetapkan sejak Fase 1; animasi diuji pada perangkat kelas bawah |
| Menampilkan harga menakuti sebagian prospek | Jumlah prospek menurun | Ini disengaja — targetnya kualitas prospek, bukan jumlah. Pantau rasio prospek yang cocok, bukan volume |
| Lingkup melebar di Fase 2 karena isi proyek terus disempurnakan | Peluncuran tertunda | Batasi 6 proyek untuk peluncuran; sisanya menyusul setelah rilis |
