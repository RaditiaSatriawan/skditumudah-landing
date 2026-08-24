import type { MetadataRoute } from "next";
import { SITE } from "./lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Alamat admin hanya diteruskan ke aplikasi utama, tidak ada isi yang
      // pantas masuk indeks pencarian.
      disallow: ["/admin/"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
