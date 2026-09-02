import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllArticleSlugs, getArticle } from "@/lib/articles";

const SITE = "https://skditumudah.com";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `${SITE}/${article.slug}/` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${SITE}/${article.slug}/`,
      type: "article",
      publishedTime: article.date || undefined,
      siteName: "Skditumudah",
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <main className="min-h-screen bg-background text-on-background">
      <nav className="border-b border-outline-variant/60 bg-surface-container-low">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-semibold text-primary hover:underline">
            ← skditumudah.com
          </Link>
          <span className="text-xs text-on-surface-variant">Tryout SKD CPNS</span>
        </div>
      </nav>

      <article className="article mx-auto max-w-3xl px-4 py-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: article.title,
              description: article.description,
              datePublished: article.date,
              dateModified: article.date,
              inLanguage: "id-ID",
              mainEntityOfPage: `${SITE}/${article.slug}/`,
              author: { "@type": "Organization", name: "Skditumudah", url: SITE },
              publisher: {
                "@type": "Organization",
                name: "Skditumudah",
                url: SITE,
                logo: { "@type": "ImageObject", url: `${SITE}/favicon.ico` },
              },
            }),
          }}
        />
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
        <footer className="mt-10 border-t border-outline-variant/60 pt-6 text-sm text-on-surface-variant">
          Siap ujian? Coba{" "}
          <Link href="/tryout" className="font-medium text-primary hover:underline">
            Try Out SKD CPNS
          </Link>{" "}
          di Skditumudah. —{" "}
          <Link href="/" className="font-medium text-primary hover:underline">
            Kembali ke beranda
          </Link>
        </footer>
      </article>
    </main>
  );
}
