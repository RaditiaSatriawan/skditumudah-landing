import { PAKET_LIST } from "../constants/paket";

/**
 * Satu sumber untuk seluruh keterangan situs.
 *
 * Nilai di sini dipakai metadata, robots, sitemap, gambar bagikan, dan data
 * terstruktur sekaligus. Bila alamat atau kontaknya berubah, cukup ubah di
 * berkas ini dan seluruh bagian ikut menyesuaikan.
 */
export const SITE = {
  url: "https://skditumudah.com",
  appUrl: "https://app.skditumudah.com",
  nama: "skditumudah.com",
  namaPanjang: "skditumudah.com — Belajar SKD itu Mudah",
  judul: "Tryout SKD CPNS & Kedinasan Online — skditumudah.com",
  deskripsi:
    "Latihan SKD CPNS & Kedinasan online: simulasi CAT, 10.000+ soal TWK/TIU/TKP, pembahasan lengkap, dan analitik personal. Gratis 2 sesi tryout pertama.",
  bahasa: "id-ID",
  email: "skditumudah02@gmail.com",
  whatsapp: "+6282339363042",
  whatsappUrl: "https://wa.me/6282339363042",
  logo: "/logo.png",
} as const;

/**
 * Tautan media sosial resmi.
 *
 * Hanya yang alamatnya benar-benar diketahui yang boleh masuk daftar ini.
 * Ikon tanpa alamat sebelumnya mengarah ke pagar kosong, dan tautan buntu
 * merugikan dua kali: pengunjung menekan tanpa hasil, mesin pencari mencatat
 * halaman yang tidak ada. Tambahkan alamat Instagram dan YouTube di sini
 * begitu tersedia, ikonnya akan muncul dengan sendirinya.
 */
export const SOSIAL: { ikon: string; label: string; url: string }[] = [
  { ikon: "chat", label: "WhatsApp", url: SITE.whatsappUrl },
];

/**
 * Kata kunci pencarian yang benar-benar dipakai calon peserta ketika mencari
 * latihan SKD. Ditulis apa adanya, tanpa penumpukan kata yang tidak wajar.
 */
export const KATA_KUNCI = [
  "tryout SKD",
  "tryout SKD CPNS",
  "simulasi CAT BKN",
  "latihan soal TWK TIU TKP",
  "tryout sekolah kedinasan",
  "bank soal SKD",
  "passing grade SKD",
  "persiapan CPNS",
];

/**
 * Pertanyaan yang sering masuk. Dipakai dua tempat sekaligus, yaitu bagian
 * pertanyaan populer di halaman dan data terstruktur FAQPage, sehingga
 * jawabannya tidak pernah berbeda antara yang dibaca orang dan yang dibaca
 * mesin pencari.
 */
export const FAQ = [
  {
    question: "Apakah materi soal sesuai kisi-kisi terbaru?",
    answer:
      "Tentu saja! Tim kami selalu memperbarui bank soal setiap kali ada update resmi dari BKN mengenai kisi-kisi SKD CPNS maupun Sekolah Kedinasan tahun 2024.",
  },
  {
    question: "Berapa lama masa aktif paket premium?",
    answer:
      "Masa aktif paket Premium adalah 1 bulan, Premium Plus 3 bulan, dan Premium Sultan 12 bulan sejak tanggal aktivasi.",
  },
  {
    question: "Apakah bisa diakses lewat smartphone?",
    answer:
      "Tentu! Platform kami sepenuhnya responsif dan bisa diakses dari HP, tablet, maupun laptop dengan nyaman.",
  },
  {
    question: "Metode pembayaran apa saja yang tersedia?",
    answer:
      "Kami menerima transfer bank, QRIS, GoPay, OVO, Dana, dan berbagai metode pembayaran digital lainnya.",
  },
  {
    question: "Apakah ada garansi uang kembali?",
    answer:
      "Ya! Kami memberikan garansi uang kembali 7 hari jika kamu tidak puas dengan layanan kami.",
  },
];

/**
 * Menyusun data terstruktur schema.org untuk halaman utama.
 *
 * Hanya memuat keterangan yang benar-benar diketahui. Tautan media sosial dan
 * penilaian bintang sengaja tidak dicantumkan selama datanya belum ada, sebab
 * data terstruktur yang mengarang justru berisiko dijatuhi sanksi mesin
 * pencari.
 */
export function dataTerstruktur() {
  const organisasi = {
    "@type": "Organization",
    "@id": `${SITE.url}/#organisasi`,
    name: SITE.nama,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}${SITE.logo}`,
      width: 2000,
      height: 2000,
    },
    email: SITE.email,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.whatsapp,
      contactType: "customer support",
      areaServed: "ID",
      availableLanguage: ["Indonesian"],
    },
  };

  const situs = {
    "@type": "WebSite",
    "@id": `${SITE.url}/#situs`,
    url: SITE.url,
    name: SITE.nama,
    description: SITE.deskripsi,
    inLanguage: SITE.bahasa,
    publisher: { "@id": `${SITE.url}/#organisasi` },
  };

  const pertanyaan = {
    "@type": "FAQPage",
    "@id": `${SITE.url}/#faq`,
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const paket = {
    "@type": "ItemList",
    "@id": `${SITE.url}/#paket`,
    name: "Paket berlangganan skditumudah.com",
    itemListElement: PAKET_LIST.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: `${p.nama} — ${p.durasi}`,
        description: p.fitur.join(", "),
        brand: { "@id": `${SITE.url}/#organisasi` },
        offers: {
          "@type": "Offer",
          price: p.harga,
          priceCurrency: "IDR",
          availability: "https://schema.org/InStock",
          url: `${SITE.url}/#pricing`,
        },
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organisasi, situs, pertanyaan, paket],
  };
}

/**
 * Menyiapkan data terstruktur agar aman ditanam ke dalam halaman.
 *
 * Tanda kurung siku pembuka diganti padanan unicode-nya supaya isi data tidak
 * dapat menutup tag script dan menyisipkan skrip asing.
 */
export function dataTerstrukturAman() {
  return JSON.stringify(dataTerstruktur()).replace(/</g, "\\u003c");
}
