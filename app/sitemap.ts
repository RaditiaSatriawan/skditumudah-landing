import type { MetadataRoute } from "next";
import { SITUS } from "./seo";
import { getAllArticles } from "@/lib/articles";

/**
 * Peta situs halaman muka.
 *
 * Hanya memuat halaman yang benar-benar dilayani domain ini. Seluruh halaman
 * aplikasi berada di app.skditumudah.com dan berpagar akun, sehingga
 * mendaftarkannya di sini hanya akan menghasilkan laporan galat di Search
 * Console berupa alamat yang mengalihkan ke halaman masuk.
 *
 * Artikel ikut didaftarkan karena halamannya memang dilayani domain ini dan
 * terbuka tanpa akun.
 *
 * Tanggalnya sengaja tetap, bukan tanggal hari ini. Memakai tanggal hari ini
 * membuat setiap penerbitan ulang mengaku seluruh halaman baru berubah,
 * padahal isinya sama — sinyal yang lama-lama tidak lagi dipercaya perayap.
 */
const DIUBAH = new Date("2026-09-01");

export default function sitemap(): MetadataRoute.Sitemap {
  // Tanggal tiap artikel diambil dari kolom updated di berkasnya sendiri, jadi hanya berubah saat isinya berubah.
  const artikel = getAllArticles().map((a) => ({
    url: `${SITUS.url}/${a.slug}/`,
    lastModified: a.updated ? new Date(a.updated) : DIUBAH,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITUS.url,
      lastModified: DIUBAH,
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${SITUS.url}/artikel/`,
      lastModified: artikel.reduce((t, a) => (a.lastModified > t ? a.lastModified : t), DIUBAH),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...artikel,
  ];
}
