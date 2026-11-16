import type { Metadata } from "next";
import HalamanTryout, { ambilPaket } from "../components/HalamanTryout";
import { SITUS } from "../seo";

const JUDUL = "Tryout SKD CPNS 2026 Online, Format CAT BKN";
const PENGANTAR =
  "Latihan tryout SKD CPNS online dengan 110 soal TWK, TIU, dan TKP, waktu 100 menit, dan penilaian persis aturan CAT BKN. Skor keluar langsung, lengkap dengan pembahasan dan rapor kelemahan. Dua sesi pertama gratis.";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Tryout SKD CPNS 2026 Online Gratis, Format CAT BKN" },
  description:
    "Tryout SKD CPNS 2026 online: 110 soal TWK, TIU, TKP, 100 menit, penilaian sesuai CAT BKN, pembahasan dan rapor kelemahan. Coba 2 sesi gratis sekarang.",
  keywords: ["tryout skd cpns", "tryout cpns 2026", "tryout skd cpns gratis", "simulasi cat cpns", "latihan soal skd cpns", "try out cpns online"],
  alternates: { canonical: `${SITUS.url}/tryout-skd-cpns/` },
  openGraph: {
    title: "Tryout SKD CPNS 2026 Online Gratis",
    description: PENGANTAR,
    url: `${SITUS.url}/tryout-skd-cpns/`,
    type: "website",
    locale: "id_ID",
    siteName: SITUS.nama,
    images: [{ url: SITUS.gambar, width: 1200, height: 630, alt: "Tryout SKD CPNS online" }],
  },
};

export default async function Page() {
  const paket = await ambilPaket("CPNS");
  return (
    <HalamanTryout
      paket={paket}
      k={{
        jenis: "CPNS",
        path: "/tryout-skd-cpns/",
        judul: JUDUL,
        pengantar: PENGANTAR,
        ambangTkp: 166,
        dasarAmbang: "KepmenPANRB Nomor 321 Tahun 2024 (formasi umum), acuan resmi CPNS terakhir",
        halamanLain: { label: "Tryout SKD Kedinasan", href: "/tryout-skd-kedinasan/" },
        artikelTerkait: [
          "cpns-2026-dibuka-info-terbaru",
          "passing-grade-skd-cpns",
          "kisi-kisi-materi-skd-cpns-2026",
          "latihan-soal-skd-online-dan-pembahasan",
          "simulasi-cat-bkn",
          "strategi-lolos-skd-cpns-2026",
        ],
        faq: [
          {
            tanya: "Apakah tryout SKD CPNS di skditumudah gratis?",
            jawab: "Ya. Setiap akun baru mendapat dua sesi tryout gratis tanpa kartu kredit. Untuk akses tanpa batas ke semua paket tersedia paket Premium mulai Rp49.000 per bulan.",
          },
          {
            tanya: "Berapa jumlah soal dan waktu tryout SKD CPNS?",
            jawab: "Sama seperti SKD resmi: 110 soal (TWK 30, TIU 35, TKP 45) yang dikerjakan dalam 100 menit.",
          },
          {
            tanya: "Bagaimana cara penilaian tryout SKD CPNS?",
            jawab: "TWK dan TIU bernilai 5 untuk jawaban benar dan 0 untuk jawaban salah atau kosong. Setiap opsi TKP berbobot 1 sampai 5 dan soal kosong bernilai 0. Nilai maksimal 550.",
          },
          {
            tanya: "Berapa passing grade SKD CPNS?",
            jawab: "Acuan resmi terakhir adalah KepmenPANRB Nomor 321 Tahun 2024: TWK 65, TIU 80, dan TKP 166 untuk formasi umum. Nilai untuk seleksi 2026 mengikuti keputusan resmi yang berlaku saat seleksi dibuka.",
          },
          {
            tanya: "Apakah tryout bisa dikerjakan lewat HP?",
            jawab: "Bisa. Tryout berjalan di browser HP, tablet, maupun laptop tanpa perlu memasang aplikasi.",
          },
        ],
      }}
    />
  );
}
