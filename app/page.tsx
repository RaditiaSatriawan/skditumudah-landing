import LandingUI from "./LandingUI";
import { faqData } from "./constants/faq";
import { KETERANGAN_SITUS, sandikanJsonLd } from "./seo";
import { fotoUrl, getAllArticles } from "@/lib/articles";


/**
 * Ikon Material Symbols yang dipakai LandingUI. Font ikonnya diminta hanya untuk nama-nama ini (parameter
 * icon_names) dengan sumbu tetap, sehingga ukurannya sekitar 6 KB, bukan 4 MB seperti font lengkapnya — beban
 * terbesar halaman ini di HP. Bila menambah ikon baru di LandingUI, tambahkan namanya di sini; ikon yang tidak
 * terdaftar akan tampil sebagai teks namanya.
 */
const IKON_TETAP = [
  "analytics", "arrow_forward", "article", "autorenew", "chat", "check", "check_circle", "chevron_left",
  "chevron_right", "close", "edit_note", "expand_less", "expand_more", "format_quote", "mail", "menu", "menu_book",
  "people", "person_add", "rocket_launch", "security", "star", "stars", "verified_user",
  // Ikon fitur bawaan; fitur dari panel admin ditambahkan saat halaman dibuat.
  "devices", "leaderboard", "psychology", "quiz", "timer",
];

function urlFontIkon(tambahan: string[]): string {
  const nama = [...new Set([...IKON_TETAP, ...tambahan.filter((n) => /^[a-z0-9_]+$/.test(n))])].sort();
  return (
    "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0" +
    `&icon_names=${nama.join(",")}&display=block`
  );
}

/** Artikel pilar yang ditautkan dari beranda; slug yang belum ada dilewati. */
const PILAR = [
  "tryout-skd-online-gratis",
  "apa-itu-skd",
  "latihan-soal-skd-online-dan-pembahasan",
  "passing-grade-skd-cpns",
  "skd-sekolah-kedinasan",
  "kisi-kisi-materi-skd-cpns-2026",
  "simulasi-cat-bkn",
  "cara-menghitung-nilai-skd-dan-skor-tkp",
];

export default async function Page() {
  // Fallback data kosong agar UI tidak crash jika API gagal
  let landingData: {
    cfg: Record<string, unknown>;
    testimonis: never[];
    fiturs: never[];
    banner: unknown;
    latestArtikels: never[];
    panduan?: { slug: string; judul: string }[];
  } = {
    cfg: {},
    testimonis: [],
    fiturs: [],
    banner: null,
    latestArtikels: []
  };

  try {
    /*
     * Data ditarik dari API publik yang berjalan di VPS.
     *
     * Sebelumnya alamat yang dipanggil adalah https://skditumudah.com, yaitu
     * domain halaman ini sendiri di Vercel, bukan tempat APInya berada.
     * Alamat itu hanya menjawab pengalihan sehingga pemanggilannya selalu
     * gagal dan halaman ini terus menampilkan data cadangan yang kosong —
     * testimoni, fitur, spanduk, dan artikel terbaru yang diatur lewat panel
     * admin tidak pernah muncul, dan judul utamanya jatuh ke teks cadangan
     * di komponen alih-alih memakai yang tersimpan di basis data.
     *
     * Alamatnya dapat ditimpa lewat NEXT_PUBLIC_API_URL bila suatu saat
     * berpindah, tanpa perlu menyunting berkas ini.
     */
    const asalApi = process.env.NEXT_PUBLIC_API_URL ?? "https://app.skditumudah.com";
    const res = await fetch(`${asalApi}/api/public/landing`, {
      // Disimpan sementara lalu diperbarui di latar tiap enam puluh detik,
      // sehingga halaman tetap cepat namun isinya mengikuti panel admin.
      next: { revalidate: 60 },
    });
    
    if (res.ok) {
      const json = await res.json();
      if (json.success) {
        landingData = json.data;
      }
    } else {
      console.warn("API Server membalas dengan status:", res.status);
    }
  } catch (error) {
    console.error("Gagal menarik data dari VPS:", error);
  }

  // Artikel dilayani halaman ini sendiri (statis dan terindeks), bukan blog di aplikasi.
  // Tautan tetap dari halaman utama ke artikel pilar, supaya halaman-halaman terpenting selalu dekat dari beranda.
  const semuaArtikel = getAllArticles();
  const panduan = PILAR.map((slug) => semuaArtikel.find((a) => a.slug === slug))
    .filter((a) => a !== undefined)
    .map((a) => ({ slug: a.slug, judul: a.seoTitle }));

  landingData = {
    ...landingData,
    panduan,
    latestArtikels: getAllArticles()
      .slice(0, 3)
      .map((a) => ({
        slug: a.slug,
        judul: a.title,
        ringkasan: a.description,
        thumbnail: fotoUrl(a.image, 640, 360),
        kategori: a.kategori,
        publishedAt: a.updated,
      })) as never[],
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href={urlFontIkon(((landingData.fiturs ?? []) as { icon?: string }[]).map((f) => f.icon ?? ""))}
      />
      {/* Keterangan organisasi, situs, dan bidang yang diajarkan, supaya mesin
          pencari mengenali situs ini sebagai satu badan yang sama dan dapat
          menampilkan nama resminya alih-alih menebak dari nama domain. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sandikanJsonLd(KETERANGAN_SITUS) }}
      />
      {/* Tanya-jawab di bagian FAQ, supaya mesin pencari dapat menampilkannya sebagai hasil kaya. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sandikanJsonLd({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }),
        }}
      />
      <LandingUI data={landingData} />
    </>
  );
}
