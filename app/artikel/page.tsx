import type { Metadata } from "next";
import Link from "next/link";
import { fotoUrl, getAllArticles } from "@/lib/articles";
import { SITUS, sandikanJsonLd } from "../seo";

const JUDUL = "Artikel & Panduan SKD CPNS dan Sekolah Kedinasan";
const DESKRIPSI =
  "Kumpulan panduan SKD terbaru: passing grade, contoh soal TWK, TIU, TKP beserta pembahasan, jadwal CPNS dan sekolah kedinasan, strategi belajar, dan manajemen waktu ujian CAT BKN.";

export const metadata: Metadata = {
  title: JUDUL,
  description: DESKRIPSI,
  keywords: ["artikel cpns", "tips skd", "panduan sekolah kedinasan", "contoh soal skd", "passing grade skd"],
  alternates: { canonical: `${SITUS.url}/artikel/` },
  openGraph: {
    title: JUDUL,
    description: DESKRIPSI,
    url: `${SITUS.url}/artikel/`,
    type: "website",
    locale: "id_ID",
    siteName: SITUS.nama,
  },
};

const tanggal = (iso: string) =>
  iso ? new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "";

export default function DaftarArtikel() {
  const semua = getAllArticles();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: JUDUL,
    description: DESKRIPSI,
    url: `${SITUS.url}/artikel/`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: semua.map((a, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITUS.url}/${a.slug}/`, name: a.title })),
    },
  };

  return (
    <main className="min-h-screen bg-background text-on-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sandikanJsonLd(jsonLd) }} />
      <nav className="border-b border-outline-variant/60 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-bold text-primary">
            skditumudah.com
          </Link>
          <a href={`${SITUS.aplikasi}/daftar`} className="rounded-full bg-[#ffb95f] px-4 py-1.5 text-sm font-bold text-[#00236f]">
            Coba Gratis
          </a>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8 max-w-2xl">
          <h1 className="text-3xl font-extrabold leading-tight text-[#00236f] sm:text-4xl">{JUDUL}</h1>
          <p className="mt-3 leading-relaxed text-on-surface-variant">{DESKRIPSI}</p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {semua.map((a, i) => (
            <Link
              key={a.slug}
              href={`/${a.slug}/`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-outline-variant/60 bg-white transition-shadow hover:shadow-lg"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={fotoUrl(a.image, 640, 360)}
                width={640}
                height={360}
                alt={a.imageAlt}
                loading={i < 3 ? "eager" : "lazy"}
                decoding="async"
                className="aspect-video w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#264191]">{a.kategori}</span>
                <h2 className="mt-2 text-lg font-extrabold leading-snug text-on-surface group-hover:text-primary">{a.title}</h2>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-on-surface-variant">{a.description}</p>
                <p className="mt-4 text-xs text-on-surface-variant">
                  {tanggal(a.updated)} · {a.menitBaca} menit baca
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
