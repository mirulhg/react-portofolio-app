// Menulis public/sitemap.xml dari beranda + tiap slug proyek. Dijalankan
// sebelum build (lihat package.json).
//
// Sumber data utama: tabel `projects` di Supabase (data proyek sekarang
// ditambah lewat Table Editor Supabase, bukan file ini lagi). Kalau env
// Supabase belum diisi atau fetch-nya gagal (mis. build lokal tanpa .env),
// skrip jatuh ke fallback: baca slug dari data/projects.ts lewat regex,
// supaya `npm run build` tetap jalan.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const SITE_URL = "https://mirulhg.github.io/react-portofolio-app";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsFile = path.join(__dirname, "../src/features/proyek/data/projects.ts");
const outFile = path.join(__dirname, "../public/sitemap.xml");

function fallbackSlugsFromFile() {
  const source = readFileSync(projectsFile, "utf-8");
  const slugPattern = /slug:\s*"([^"]+)"/g;
  return [...source.matchAll(slugPattern)].map((match) => match[1]);
}

async function getSlugs() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("generate-sitemap: VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY tidak diset, pakai fallback file lokal.");
    return fallbackSlugsFromFile();
  }

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/projects?select=slug`, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    });
    if (!res.ok) throw new Error(`Supabase merespons ${res.status}`);
    const rows = await res.json();
    const slugs = rows.map((row) => row.slug).filter(Boolean);
    if (slugs.length === 0) throw new Error("Tabel projects kosong atau kolom slug tidak ditemukan");
    return slugs;
  } catch (err) {
    console.warn(`generate-sitemap: gagal ambil slug dari Supabase (${err.message}), pakai fallback file lokal.`);
    return fallbackSlugsFromFile();
  }
}

const slugs = await getSlugs();

if (slugs.length === 0) {
  console.warn("generate-sitemap: tidak menemukan slug proyek sama sekali.");
}

const today = new Date().toISOString().slice(0, 10);

const urls = [
  { loc: `${SITE_URL}/`, priority: "1.0" },
  ...slugs.map((slug) => ({ loc: `${SITE_URL}/proyek/${slug}`, priority: "0.7" })),
];

const body = urls
  .map(
    ({ loc, priority }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

writeFileSync(outFile, xml);
console.log(`generate-sitemap: ${urls.length} URL ditulis ke ${path.relative(process.cwd(), outFile)}`);
