import type { Metadata } from "next";
import Link from "next/link";
import { fotoUrl, getAllArticles } from "@/lib/articles";
import { SITUS, sandikanJsonLd } from "../seo";
import DaftarArtikel, { type KartuArtikel } from "./DaftarArtikel";
import TombolAtas from "../components/TombolAtas";
import { getKategoriList, getTagList, urlKategori } from "@/lib/taksonomi";

const JUDUL = "Artikel & Panduan SKD CPNS dan Sekolah Kedinasan";
const DESKRIPSI =
  "Kumpulan panduan SKD terbaru 2026: passing grade, contoh soal TWK, TIU, TKP beserta pembahasan, jadwal CPNS dan sekolah kedinasan, tes Pauli dan Kraepelin, serta strategi ujian CAT BKN.";

export const metadata: Metadata = {
  title: JUDUL,
  description: DESKRIPSI,
  keywords: ["artikel cpns", "tips skd", "panduan sekolah kedinasan", "contoh soal skd", "passing grade skd", "tes pauli"],
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

export default function HalamanArtikel() {
  const semua = getAllArticles();
  const kartu: KartuArtikel[] = semua.map((a) => ({
    slug: a.slug,
    title: a.title,
    description: a.description,
    kategori: a.kategori,
    tags: a.tags,
    updated: a.updated,
    menitBaca: a.menitBaca,
    foto: fotoUrl(a.image, 640, 400),
    fotoBesar: fotoUrl(a.image, 960, 600),
    imageAlt: a.imageAlt,
  }));
  const jumlahKategori = new Set(semua.map((a) => a.kategori)).size;
  const totalMenit = semua.reduce((t, a) => t + a.menitBaca, 0);

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
    <main className="min-h-screen bg-[#f6f8ff] text-on-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sandikanJsonLd(jsonLd) }} />

      <nav className="sticky top-0 z-30 border-b border-white/10 bg-[#00236f]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-black text-white">
            skditumudah.com
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" className="hidden text-[#c9d4ff] hover:text-white sm:inline">
              Beranda
            </Link>
            <a href={`${SITUS.aplikasi}/daftar`} className="rounded-full bg-[#ffb95f] px-4 py-1.5 font-bold text-[#00236f] hover:opacity-90">
              Coba Gratis
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden bg-[#00236f] pb-20 pt-12 text-white sm:pt-16">
        <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#1e3a8a] blur-2xl" />
        <div aria-hidden className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#ffb95f]/20 blur-3xl" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "22px 22px" }}
        />
        <div className="relative mx-auto max-w-6xl px-4">
          <ol className="mb-5 flex items-center gap-1.5 text-xs text-[#c9d4ff]">
            <li>
              <Link href="/" className="hover:text-white">
                Beranda
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li className="font-semibold text-white">Artikel</li>
          </ol>
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#ffb95f]">
            Pusat Belajar 2026
          </span>
          <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-5xl">{JUDUL}</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-[#c9d4ff] sm:text-lg">{DESKRIPSI}</p>
          <dl className="mt-8 flex flex-wrap gap-3">
            {[
              [String(semua.length), "artikel"],
              [String(jumlahKategori), "kategori"],
              [`${totalMenit}+`, "menit bacaan"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
                <dt className="sr-only">{l}</dt>
                <dd>
                  <span className="text-2xl font-black text-white">{n}</span> <span className="text-sm text-[#c9d4ff]">{l}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-16">
        <DaftarArtikel artikel={kartu} />

        {/* Tautan biasa ke halaman kategori dan topik, supaya perayap menemukan halaman-halaman itu dari sini. */}
        <section className="mt-14 grid gap-8 md:grid-cols-2">
          {[
            ["Jelajahi per kategori", getKategoriList().map((t) => [t.nama, urlKategori(t.nama), t.artikel.length] as const)],
            ["Topik populer", getTagList().map((t) => [t.nama, `/artikel/tag/${t.slug}/`, t.artikel.length] as const)],
          ].map(([judul, daftar]) =>
            (daftar as readonly (readonly [string, string, number])[]).length === 0 ? null : (
              <div key={judul as string}>
                <h2 className="text-lg font-extrabold text-[#00236f]">{judul as string}</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(daftar as readonly (readonly [string, string, number])[]).map(([nama, href, n]) => (
                    <Link
                      key={href}
                      href={href}
                      className="rounded-full border border-[#d5dcf0] bg-white px-4 py-2 text-sm font-semibold text-[#00236f] hover:border-[#00236f]"
                    >
                      {nama} <span className="text-on-surface-variant">({n})</span>
                    </Link>
                  ))}
                </div>
              </div>
            ),
          )}
        </section>

        {/* Ajakan */}
        <section className="relative mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-[#ffb95f] to-[#ef9900] p-8 sm:p-10">
          <div aria-hidden className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/20" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-2xl font-black text-[#2a1700] sm:text-3xl">Sudah baca teorinya? Saatnya uji diri.</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#5c3800] sm:text-base">
                Tryout SKD format CAT BKN, Tes Koran Pauli dan Kraepelin, serta rapor kelemahan per subtes. Dua sesi pertama gratis.
              </p>
            </div>
            <a
              href={`${SITUS.aplikasi}/daftar`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00236f] px-7 py-4 text-sm font-black text-white shadow-xl transition hover:gap-3"
            >
              Mulai Tryout Gratis
              <svg viewBox="0 0 20 20" fill="none" aria-hidden className="h-4 w-4">
                <path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </section>
      </div>

      <footer className="border-t border-[#e2e6f3] bg-white py-6 text-center text-xs text-on-surface-variant">
        © {new Date().getFullYear()} {SITUS.merek} ·{" "}
        <Link href="/" className="hover:text-primary">
          Beranda
        </Link>
      </footer>
      <TombolAtas />
    </main>
  );
}
