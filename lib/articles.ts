import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content", "artikel");

/** Foto default bila artikel lama belum punya foto sendiri. */
const FOTO_BAWAAN = "photo-1606326608606-aa0b62935f2b";

export type Faq = { tanya: string; jawab: string };

export type Article = {
  slug: string;
  title: string;
  /** Judul ringkas (≤60 karakter) untuk tag title; judul panjang tetap dipakai sebagai H1. */
  seoTitle: string;
  description: string;
  date: string;
  updated: string;
  kategori: string;
  tags: string[];
  keywords: string[];
  /** ID foto Unsplash (tanpa domain), dipakai untuk menyusun alamat berbagai ukuran. */
  image: string;
  imageAlt: string;
  menitBaca: number;
  faq: Faq[];
  content: string;
};

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx > 0) meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim().replace(/^"|"$/g, "");
  }
  return { meta, body: match[2] };
}

const daftar = (s?: string) =>
  (s ?? "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

/**
 * Judul utama ditampilkan oleh templat halaman, jadi baris "# Judul" di awal isi (dan garis
 * pemisah sesudahnya) dibuang agar halaman tidak punya dua H1.
 */
function buangJudulAwal(body: string): string {
  return body
    .trim()
    .replace(/^# .+\n+/, "")
    .replace(/^(---\s*\n+)+/, "")
    .trim();
}

/** Mengambil pasangan tanya-jawab dari bagian "## Pertanyaan yang Sering Diajukan" untuk data terstruktur FAQ. */
function ambilFaq(body: string): Faq[] {
  const bagian = body.split(/^## /m).find((b) => /^Pertanyaan yang Sering Diajukan/i.test(b));
  if (!bagian) return [];
  return bagian
    .split(/^### /m)
    .slice(1)
    .map((blok) => {
      const [tanya, ...sisa] = blok.split("\n");
      const jawab = sisa
        .join(" ")
        .replace(/\*\*|\*|`/g, "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/\s+/g, " ")
        .trim();
      return { tanya: tanya.trim(), jawab };
    })
    .filter((f) => f.tanya && f.jawab);
}

export function fotoUrl(id: string, lebar: number, tinggi?: number): string {
  const ukuran = tinggi ? `&h=${tinggi}&fit=crop&crop=entropy` : "";
  return `https://images.unsplash.com/${id}?auto=format&q=70&w=${lebar}${ukuran}`;
}

export function getAllArticleSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getArticle(slug: string): Article | null {
  const file = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { meta, body } = parseFrontmatter(fs.readFileSync(file, "utf8"));
  const content = buangJudulAwal(body);
  const kata = content.split(/\s+/).length;
  return {
    slug: meta.slug || slug,
    title: meta.title || slug,
    seoTitle: meta.seoTitle || meta.title || slug,
    description: meta.description || "",
    date: meta.date || "",
    updated: meta.updated || meta.date || "",
    kategori: meta.kategori || "Panduan CPNS",
    tags: daftar(meta.tags),
    keywords: daftar(meta.keywords || meta.tags),
    image: meta.image || FOTO_BAWAAN,
    imageAlt: meta.imageAlt || meta.title || slug,
    menitBaca: Math.max(1, Math.round(kata / 200)),
    faq: ambilFaq(content),
    content,
  };
}

/** Semua artikel, terbaru lebih dulu. */
export function getAllArticles(): Article[] {
  return getAllArticleSlugs()
    .map((s) => getArticle(s))
    .filter((a): a is Article => a !== null)
    .sort((a, b) => (b.date + b.slug).localeCompare(a.date + a.slug));
}

/** Artikel terkait: yang berbagi tag atau kategori paling banyak. */
export function getRelated(article: Article, jumlah = 3): Article[] {
  return getAllArticles()
    .filter((a) => a.slug !== article.slug)
    .map((a) => ({
      a,
      skor: a.tags.filter((t) => article.tags.includes(t)).length * 2 + (a.kategori === article.kategori ? 1 : 0),
    }))
    .sort((x, y) => y.skor - x.skor || y.a.date.localeCompare(x.a.date))
    .slice(0, jumlah)
    .map((x) => x.a);
}
