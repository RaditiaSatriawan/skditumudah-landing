import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getKategori, getKategoriList, urlKategori } from "@/lib/taksonomi";
import { SITUS } from "../../../seo";
import HalamanTopik from "../../HalamanTopik";

type PageProps = { params: Promise<{ kategori: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getKategoriList().map((t) => ({ kategori: t.slug }));
}

/** Pengantar tiap kategori; kategori baru yang belum terdaftar memakai pengantar umum di bawah. */
const PENGANTAR: Record<string, string> = {
  "panduan-skd":
    "Dasar-dasar Seleksi Kompetensi Dasar: apa itu SKD, cara penilaian TWK, TIU, dan TKP, nilai ambang batas, sampai cara kerja ujian CAT BKN.",
  "panduan-cpns":
    "Langkah demi langkah seleksi CPNS: pendaftaran di SSCASN, dokumen yang disiapkan, jadwal, hingga tahapan setelah SKD.",
  "strategi-skd":
    "Strategi belajar dan mengerjakan SKD: jadwal latihan, manajemen waktu 100 menit, kesalahan yang sering terjadi, dan cara menaikkan skor.",
  "contoh-soal":
    "Contoh soal SKD beserta kunci dan pembahasannya, disusun per subtes dan per jenis soal supaya mudah dipelajari bertahap.",
  "materi-skd":
    "Ringkasan materi SKD per subtes, dilengkapi contoh soal dan pembahasan untuk latihan mandiri.",
  kedinasan:
    "Seputar seleksi sekolah kedinasan: syarat, tahapan, nilai ambang batas SKD, tes kesamaptaan, dan persiapan tiap sekolah.",
  "berita-cpns": "Kabar terbaru seputar seleksi CPNS dan sekolah kedinasan, dirangkum dari sumber resmi.",
  psikotes: "Panduan psikotes yang sering dipakai dalam seleksi, seperti tes Pauli dan Kraepelin (tes koran).",
};

const pengantar = (nama: string, slug: string, jumlah: number) =>
  PENGANTAR[slug] ?? `Kumpulan ${jumlah} artikel kategori ${nama} untuk persiapan SKD CPNS dan sekolah kedinasan.`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const t = getKategori((await params).kategori);
  if (!t) return {};
  const url = `${SITUS.url}${urlKategori(t.nama)}`;
  const judul = `${t.nama}: Artikel SKD CPNS & Kedinasan`;
  const deskripsi = pengantar(t.nama, t.slug, t.artikel.length);
  return {
    title: judul,
    description: deskripsi,
    alternates: { canonical: url },
    openGraph: { title: judul, description: deskripsi, url, type: "website", locale: "id_ID", siteName: SITUS.nama },
  };
}

export default async function HalamanKategori({ params }: PageProps) {
  const t = getKategori((await params).kategori);
  if (!t) notFound();
  return (
    <HalamanTopik
      jenis="kategori"
      topik={t}
      judul={t.nama}
      pengantar={pengantar(t.nama, t.slug, t.artikel.length)}
      url={`${SITUS.url}${urlKategori(t.nama)}`}
    />
  );
}
