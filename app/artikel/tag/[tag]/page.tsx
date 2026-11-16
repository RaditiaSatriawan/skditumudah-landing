import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTag, getTagList } from "@/lib/taksonomi";
import { SITUS } from "../../../seo";
import HalamanTopik from "../../HalamanTopik";

type PageProps = { params: Promise<{ tag: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getTagList().map((t) => ({ tag: t.slug }));
}

/** Pengantar disusun dari judul artikelnya sendiri, supaya tiap halaman tag punya teks yang khas. */
function pengantar(nama: string, judul: string[]): string {
  const contoh = judul.slice(0, 2).map((j) => `“${j.split(":")[0].trim()}”`).join(" dan ");
  return `${judul.length} artikel tentang ${nama}, termasuk ${contoh}. Semua ditulis untuk persiapan SKD CPNS dan sekolah kedinasan.`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const t = getTag((await params).tag);
  if (!t) return {};
  const url = `${SITUS.url}/artikel/tag/${t.slug}/`;
  const judul = `Artikel ${t.nama}: Panduan dan Contoh Soal`;
  const deskripsi = pengantar(t.nama, t.artikel.map((a) => a.title));
  return {
    title: judul,
    description: deskripsi.slice(0, 158),
    alternates: { canonical: url },
    openGraph: { title: judul, description: deskripsi, url, type: "website", locale: "id_ID", siteName: SITUS.nama },
  };
}

export default async function HalamanTag({ params }: PageProps) {
  const t = getTag((await params).tag);
  if (!t) notFound();
  return (
    <HalamanTopik
      jenis="tag"
      topik={t}
      judul={`Artikel ${t.nama}`}
      pengantar={pengantar(t.nama, t.artikel.map((a) => a.title))}
      url={`${SITUS.url}/artikel/tag/${t.slug}/`}
    />
  );
}
