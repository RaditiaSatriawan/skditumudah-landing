import Link from "next/link";
import { fotoUrl } from "@/lib/articles";
import { getKategoriList, getTagList, urlKategori, type Topik } from "@/lib/taksonomi";
import { SITUS, sandikanJsonLd } from "../seo";
import TombolAtas from "../components/TombolAtas";

type Props = {
  jenis: "kategori" | "tag";
  topik: Topik;
  judul: string;
  pengantar: string;
  url: string;
};

const tanggal = (iso: string) =>
  iso ? new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Jakarta" }) : "";

/** Halaman daftar artikel per kategori atau tag: dibuat statis, dengan data terstruktur dan tautan ke topik lain. */
export default function HalamanTopik({ jenis, topik, judul, pengantar, url }: Props) {
  const lain = (jenis === "kategori" ? getKategoriList() : getTagList()).filter((t) => t.slug !== topik.slug);
  const label = jenis === "kategori" ? "Kategori" : "Topik";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: judul,
      description: pengantar,
      url,
      inLanguage: "id-ID",
      isPartOf: { "@id": `${SITUS.url}/#situs` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: topik.artikel.length,
        itemListElement: topik.artikel.map((a, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITUS.url}/${a.slug}/`,
          name: a.title,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: `${SITUS.url}/` },
        { "@type": "ListItem", position: 2, name: "Artikel", item: `${SITUS.url}/artikel/` },
        { "@type": "ListItem", position: 3, name: topik.nama, item: url },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[#f6f8ff] text-on-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sandikanJsonLd(jsonLd) }} />

      <nav className="sticky top-0 z-30 border-b border-white/10 bg-[#00236f]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="text-sm font-black text-white">
            skditumudah.com
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/artikel/" className="text-[#c9d4ff] hover:text-white">
              Artikel
            </Link>
            <a href={`${SITUS.aplikasi}/daftar`} className="rounded-full bg-[#ffb95f] px-4 py-1.5 font-bold text-[#00236f] hover:opacity-90">
              Coba Gratis
            </a>
          </div>
        </div>
      </nav>

      <header className="bg-[#00236f] pb-14 pt-10 text-white sm:pt-14">
        <div className="mx-auto max-w-6xl px-4">
          <ol className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-[#c9d4ff]">
            <li>
              <Link href="/" className="hover:text-white">Beranda</Link>
            </li>
            <li aria-hidden>›</li>
            <li>
              <Link href="/artikel/" className="hover:text-white">Artikel</Link>
            </li>
            <li aria-hidden>›</li>
            <li className="font-semibold text-white">{topik.nama}</li>
          </ol>
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#ffb95f]">
            {label} · {topik.artikel.length} artikel
          </span>
          <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">{judul}</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-[#c9d4ff] sm:text-lg">{pengantar}</p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-16">
        <ul className="-mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topik.artikel.map((a, i) => (
            <li key={a.slug}>
              <Link
                href={`/${a.slug}/`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e2e6f3] bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                {/* Foto dilayani CDN Unsplash dalam ukuran yang sesuai; tidak perlu dioptimasi ulang. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={fotoUrl(a.image, 640, 360)}
                  srcSet={`${fotoUrl(a.image, 480, 270)} 480w, ${fotoUrl(a.image, 640, 360)} 640w`}
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                  width={640}
                  height={360}
                  alt={a.imageAlt}
                  loading={i < 3 ? "eager" : "lazy"}
                  decoding="async"
                  className="aspect-video w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#264191]">{a.kategori}</span>
                  <h2 className="mt-2 text-lg font-extrabold leading-snug text-[#00236f] group-hover:text-[#1e3a8a]">{a.title}</h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-on-surface-variant">{a.description}</p>
                  <p className="mt-auto pt-4 text-xs text-on-surface-variant">
                    {tanggal(a.updated)} · {a.menitBaca} menit baca
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {lain.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-extrabold text-[#00236f]">{jenis === "kategori" ? "Kategori lain" : "Topik lain"}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {lain.map((t) => (
                <Link
                  key={t.slug}
                  href={jenis === "kategori" ? urlKategori(t.nama) : `/artikel/tag/${t.slug}/`}
                  className="rounded-full border border-[#d5dcf0] bg-white px-4 py-2 text-sm font-semibold text-[#00236f] hover:border-[#00236f]"
                >
                  {t.nama} <span className="text-on-surface-variant">({t.artikel.length})</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-14 rounded-3xl bg-[#00236f] p-7 text-white sm:p-10">
          <h2 className="text-2xl font-black">Uji pemahamanmu dengan tryout SKD</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#c9d4ff] sm:text-base">
            110 soal format CAT BKN dengan penilaian TWK, TIU, dan TKP seperti ujian aslinya, lengkap dengan pembahasan. Dua sesi pertama gratis.
          </p>
          <a
            href={`${SITUS.aplikasi}/daftar`}
            className="mt-5 inline-block rounded-full bg-[#ffb95f] px-6 py-3 text-sm font-black text-[#00236f] hover:opacity-90"
          >
            Mulai Tryout Gratis
          </a>
        </section>
      </div>

      <footer className="border-t border-[#e2e6f3] bg-white py-6 text-center text-xs text-on-surface-variant">
        © {new Date().getFullYear()} {SITUS.merek} ·{" "}
        <Link href="/artikel/" className="hover:text-primary">Semua artikel</Link>
      </footer>
      <TombolAtas />
    </main>
  );
}
