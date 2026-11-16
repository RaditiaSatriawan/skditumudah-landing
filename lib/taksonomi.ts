import { getAllArticles, type Article } from "./articles";

/**
 * Kategori dan tag artikel sebagai halaman tersendiri (/artikel/kategori/… dan /artikel/tag/…).
 *
 * Halaman-halaman ini memberi perayap jalur ke setiap artikel lewat topiknya dan mengumpulkan artikel sejenis
 * dalam satu alamat. Tag yang hanya dipakai satu-dua artikel sengaja tidak dibuatkan halaman: isinya akan tipis
 * dan nyaris sama dengan artikelnya sendiri, jenis halaman yang justru merugikan di mata mesin pencari.
 */
export const MIN_ARTIKEL_TAG = 3;

export function slugTopik(nama: string): string {
  return nama
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " dan ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type Topik = { nama: string; slug: string; artikel: Article[] };

function kelompokkan(ambil: (a: Article) => string[]): Topik[] {
  const peta = new Map<string, Topik>();
  for (const a of getAllArticles()) {
    for (const nama of ambil(a)) {
      const slug = slugTopik(nama);
      if (!slug) continue;
      const t = peta.get(slug) ?? { nama, slug, artikel: [] };
      if (!t.artikel.includes(a)) t.artikel.push(a);
      peta.set(slug, t);
    }
  }
  return [...peta.values()].sort((x, y) => y.artikel.length - x.artikel.length || x.nama.localeCompare(y.nama, "id"));
}

export function getKategoriList(): Topik[] {
  return kelompokkan((a) => [a.kategori]);
}

/** Hanya tag yang cukup banyak artikelnya untuk layak menjadi halaman sendiri. */
export function getTagList(): Topik[] {
  return kelompokkan((a) => a.tags).filter((t) => t.artikel.length >= MIN_ARTIKEL_TAG);
}

export function getKategori(slug: string): Topik | undefined {
  return getKategoriList().find((t) => t.slug === slug);
}

export function getTag(slug: string): Topik | undefined {
  return getTagList().find((t) => t.slug === slug);
}

/** Alamat halaman tag, atau null bila tag itu belum punya halaman. */
export function urlTag(nama: string): string | null {
  const slug = slugTopik(nama);
  return getTagList().some((t) => t.slug === slug) ? `/artikel/tag/${slug}/` : null;
}

export const urlKategori = (nama: string) => `/artikel/kategori/${slugTopik(nama)}/`;
