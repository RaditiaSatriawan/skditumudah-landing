import type { Metadata } from "next";
import HalamanTryout, { ambilPaket } from "../components/HalamanTryout";
import { SITUS } from "../seo";

const JUDUL = "Tryout SKD Sekolah Kedinasan Online, Format CAT BKN";
const PENGANTAR =
  "Tryout SKD sekolah kedinasan untuk persiapan PKN STAN, STIS, IPDN, STMKG, dan sekolah kedinasan lain: 110 soal TWK, TIU, TKP dalam 100 menit dengan penilaian CAT BKN, pembahasan, dan rapor kelemahan. Dua sesi pertama gratis.";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Tryout SKD Kedinasan Online Gratis, Format CAT BKN" },
  description:
    "Tryout SKD sekolah kedinasan online: 110 soal TWK, TIU, TKP, 100 menit, penilaian CAT BKN dan ambang batas kedinasan, plus pembahasan. Coba 2 sesi gratis.",
  keywords: ["tryout skd kedinasan", "tryout sekolah kedinasan", "tryout skd stan", "tryout ipdn", "tryout stis", "simulasi skd kedinasan"],
  alternates: { canonical: `${SITUS.url}/tryout-skd-kedinasan/` },
  openGraph: {
    title: "Tryout SKD Sekolah Kedinasan Online Gratis",
    description: PENGANTAR,
    url: `${SITUS.url}/tryout-skd-kedinasan/`,
    type: "website",
    locale: "id_ID",
    siteName: SITUS.nama,
    images: [{ url: SITUS.gambar, width: 1200, height: 630, alt: "Tryout SKD sekolah kedinasan online" }],
  },
};

export default async function Page() {
  const paket = await ambilPaket("KEDINASAN");
  return (
    <HalamanTryout
      paket={paket}
      k={{
        jenis: "KEDINASAN",
        path: "/tryout-skd-kedinasan/",
        judul: JUDUL,
        pengantar: PENGANTAR,
        ambangTkp: 156,
        dasarAmbang: "KepmenPANRB Nomor 406 Tahun 2026 tentang nilai ambang batas SKD sekolah kedinasan",
        halamanLain: { label: "Tryout SKD CPNS", href: "/tryout-skd-cpns/" },
        artikelTerkait: [
          "skd-sekolah-kedinasan",
          "tips-lolos-skd-sekolah-kedinasan",
          "pkn-stan-2026-syarat-dan-tahapan-seleksi",
          "polstat-stis-2026-syarat-dan-tahapan-seleksi",
          "ipdn-2026-syarat-dan-tahapan-seleksi",
          "stmkg-2026-syarat-dan-tahapan-seleksi",
        ],
        faq: [
          {
            tanya: "Apa bedanya tryout SKD kedinasan dengan tryout SKD CPNS?",
            jawab: "Jumlah soal, waktu, dan cara penilaiannya sama. Bedanya ada pada ambang batas: untuk sekolah kedinasan 2026, TKP minimal 156 (KepmenPANRB 406/2026), sedangkan acuan CPNS terakhir 166.",
          },
          {
            tanya: "Berapa passing grade SKD sekolah kedinasan 2026?",
            jawab: "Menurut KepmenPANRB Nomor 406 Tahun 2026: TWK 65, TIU 80, dan TKP 156. Untuk peserta afirmasi berlaku nilai kumulatif 281 dengan TIU minimal 55.",
          },
          {
            tanya: "Apakah tryout ini cocok untuk PKN STAN, STIS, dan IPDN?",
            jawab: "Cocok untuk tahap SKD. Semua sekolah kedinasan memakai SKD dengan format CAT BKN yang sama; tes lanjutan seperti matematika STIS atau kesamaptaan disiapkan terpisah.",
          },
          {
            tanya: "Apakah ada tryout kedinasan gratis?",
            jawab: "Ada. Akun baru mendapat dua sesi tryout gratis. Paket Premium mulai Rp49.000 per bulan membuka semua paket tanpa batas.",
          },
        ],
      }}
    />
  );
}
