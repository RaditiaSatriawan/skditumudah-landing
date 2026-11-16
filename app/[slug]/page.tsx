import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fotoUrl, getAllArticleSlugs, getArticle, getRelated } from "@/lib/articles";
import { SITUS, sandikanJsonLd } from "../seo";
import TombolAtas from "../components/TombolAtas";
import { urlKategori, urlTag } from "@/lib/taksonomi";

const SITE = SITUS.url;
const DAFTAR = `${SITUS.aplikasi}/daftar`;

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const url = `${SITE}/${article.slug}/`;
  const gambar = fotoUrl(article.image, 1200, 630);
  return {
    title: article.seoTitle,
    description: article.description,
    keywords: article.keywords,
    authors: [{ name: "Tim Akademik Skditumudah", url: SITE }],
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      type: "article",
      locale: "id_ID",
      publishedTime: article.date || undefined,
      modifiedTime: article.updated || undefined,
      section: article.kategori,
      tags: article.tags,
      siteName: SITUS.nama,
      images: [{ url: gambar, width: 1200, height: 630, alt: article.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [gambar],
    },
  };
}

const tanggal = (iso: string) =>
  iso ? new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" }) : "";

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const url = `${SITE}/${article.slug}/`;
  const terkait = getRelated(article);

  const jsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      image: [fotoUrl(article.image, 1200, 630), fotoUrl(article.image, 1200, 1200)],
      datePublished: article.date,
      dateModified: article.updated,
      inLanguage: "id-ID",
      articleSection: article.kategori,
      keywords: article.keywords.join(", "),
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: "Tim Akademik Skditumudah", url: SITE },
      publisher: {
        "@type": "Organization",
        "@id": `${SITE}/#organisasi`,
        name: SITUS.nama,
        url: SITE,
        logo: { "@type": "ImageObject", url: `${SITE}/logo-512.png`, width: 512, height: 512 },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Artikel", item: `${SITE}/artikel/` },
        { "@type": "ListItem", position: 3, name: article.kategori, item: `${SITE}${urlKategori(article.kategori)}` },
        { "@type": "ListItem", position: 4, name: article.title, item: url },
      ],
    },
  ];
  if (article.faq.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faq.map((f) => ({
        "@type": "Question",
        name: f.tanya,
        acceptedAnswer: { "@type": "Answer", text: f.jawab },
      })),
    });
  }

  return (
    <main className="min-h-screen bg-background text-on-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sandikanJsonLd(jsonLd) }} />
      <nav className="sticky top-0 z-20 border-b border-outline-variant/60 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="text-sm font-bold text-primary">
            skditumudah.com
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/artikel/" className="text-on-surface-variant hover:text-primary">
              Artikel
            </Link>
            <a href={DAFTAR} className="rounded-full bg-[#ffb95f] px-4 py-1.5 font-bold text-[#00236f]">
              Coba Gratis
            </a>
          </div>
        </div>
      </nav>

      <article className="mx-auto max-w-3xl px-4 pb-12 pt-6">
        <ol className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-on-surface-variant">
          <li>
            <Link href="/" className="hover:text-primary">Beranda</Link>
          </li>
          <li aria-hidden>›</li>
          <li>
            <Link href="/artikel/" className="hover:text-primary">Artikel</Link>
          </li>
          <li aria-hidden>›</li>
          <li>
            <Link href={urlKategori(article.kategori)} className="font-medium text-primary hover:underline">
              {article.kategori}
            </Link>
          </li>
        </ol>

        <header className="mb-6">
          <Link
            href={urlKategori(article.kategori)}
            className="mb-3 inline-block rounded-full bg-[#dce1ff] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#264191] hover:bg-[#c9d1ff]"
          >
            {article.kategori}
          </Link>
          <h1 className="text-[1.75rem] font-extrabold leading-tight text-[#00236f] sm:text-4xl">{article.title}</h1>
          <p className="mt-3 text-base leading-relaxed text-on-surface-variant">{article.description}</p>
          <p className="mt-4 text-sm text-on-surface-variant">
            Tim Akademik Skditumudah · {tanggal(article.updated)} · {article.menitBaca} menit baca
          </p>
        </header>

        <figure className="mb-8 overflow-hidden rounded-2xl bg-[#dce1ff]">
          {/* Foto dilayani CDN Unsplash dalam format dan ukuran yang sesuai layar; tidak perlu dioptimasi ulang. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fotoUrl(article.image, 960, 540)}
            srcSet={[480, 768, 960, 1440].map((w) => `${fotoUrl(article.image, w, Math.round((w * 9) / 16))} ${w}w`).join(", ")}
            sizes="(max-width: 768px) 100vw, 768px"
            width={960}
            height={540}
            alt={article.imageAlt}
            fetchPriority="high"
            decoding="async"
            className="aspect-video w-full object-cover"
          />
        </figure>

        <div className="article">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
        </div>

        {article.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-outline-variant/60 pt-6">
            <span className="mr-1 text-sm font-semibold text-on-surface-variant">Tag:</span>
            {article.tags.map((t) => {
              const href = urlTag(t);
              const kelas = "rounded-full bg-[#e7eeff] px-3 py-1 text-xs font-medium text-[#00236f]";
              return href ? (
                <Link key={t} href={href} className={`${kelas} hover:bg-[#d5e0ff]`}>
                  #{t}
                </Link>
              ) : (
                <span key={t} className={kelas}>
                  #{t}
                </span>
              );
            })}
          </div>
        )}

        <aside className="mt-10 rounded-2xl bg-[#00236f] p-6 text-white sm:p-8">
          <p className="text-xl font-extrabold">Ukur kesiapanmu sebelum hari ujian</p>
          <p className="mt-2 text-sm leading-relaxed text-[#c9d4ff]">
            Kerjakan tryout SKD dengan format CAT BKN: 110 soal, 100 menit, penilaian TWK, TIU, dan TKP seperti aslinya,
            lengkap dengan pembahasan dan rapor kelemahan per subtes. Dua sesi pertama gratis.
          </p>
          <a
            href={DAFTAR}
            className="mt-5 inline-block rounded-full bg-[#ffb95f] px-6 py-3 text-sm font-bold text-[#00236f] hover:opacity-90"
          >
            Mulai Tryout Gratis
          </a>
        </aside>

        {terkait.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-5 text-xl font-extrabold text-[#00236f]">Baca juga</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {terkait.map((a) => (
                <Link
                  key={a.slug}
                  href={`/${a.slug}/`}
                  className="group overflow-hidden rounded-xl border border-outline-variant/60 bg-white transition-shadow hover:shadow-md"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={fotoUrl(a.image, 480, 270)}
                    width={480}
                    height={270}
                    alt={a.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-video w-full object-cover"
                  />
                  <p className="p-3 text-sm font-bold leading-snug text-on-surface group-hover:text-primary">{a.title}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <footer className="border-t border-outline-variant/60 py-6 text-center text-xs text-on-surface-variant">
        © {new Date().getFullYear()} {SITUS.merek} ·{" "}
        <Link href="/artikel/" className="hover:text-primary">Semua artikel</Link>
      </footer>
      <TombolAtas progres />
    </main>
  );
}
