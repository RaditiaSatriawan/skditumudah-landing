import type { MetadataRoute } from "next";
import { SITUS } from "./seo";

/**
 * Aturan perayapan halaman muka.
 *
 * Sebelum berkas ini ada, situs tidak memiliki robots.txt sama sekali,
 * sehingga tidak ada penunjuk menuju peta situs dan perayap harus menemukan
 * halamannya sendiri lewat tautan.
 *
 * Jalur /admin sengaja dilarang karena next.config.ts mengalihkannya ke panel
 * pengurus di app.skditumudah.com — alamat yang tidak ada gunanya dirayapi.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/"],
    },
    sitemap: `${SITUS.url}/sitemap.xml`,
    host: SITUS.url,
  };
}
