import type { MetadataRoute } from "next";
import { SITUS } from "./seo";

/**
 * Peta situs halaman muka.
 *
 * Hanya memuat halaman yang benar-benar dilayani domain ini. Seluruh halaman
 * aplikasi berada di app.skditumudah.com dan berpagar akun, sehingga
 * mendaftarkannya di sini hanya akan menghasilkan laporan galat di Search
 * Console berupa alamat yang mengalihkan ke halaman masuk.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITUS.url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
