// Menulis public/sitemap.xml dari beranda + tiap slug proyek di
// src/features/proyek/data/projects.ts. Dijalankan sebelum build (lihat package.json).
//
// Catatan: file sumbernya TypeScript, jadi kita ambil nilai `slug: "..."` lewat
// regex sederhana alih-alih menjalankan/mengimpor modul TS-nya — supaya skrip ini
// tetap plain Node tanpa dependency tambahan (CLAUDE.md §0.5).
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const SITE_URL = "https://mirulhg.github.io/react-portofolio-app";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsFile = path.join(__dirname, "../src/features/proyek/data/projects.ts");
const outFile = path.join(__dirname, "../public/sitemap.xml");

const source = readFileSync(projectsFile, "utf-8");
const slugPattern = /slug:\s*"([^"]+)"/g;
const slugs = [...source.matchAll(slugPattern)].map((match) => match[1]);

if (slugs.length === 0) {
  console.warn("generate-sitemap: tidak menemukan slug proyek, cek pola regex vs projects.ts");
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
