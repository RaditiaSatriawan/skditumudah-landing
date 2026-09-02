/**
 * Tetapan SEO untuk halaman muka.
 *
 * Dipisahkan supaya alamat situs, nama, dan gambar bagikan tidak ditulis ulang
 * di beberapa berkas sekaligus lalu berbeda satu sama lain.
 *
 * Alamatnya memakai awalan www sebab bentuk tanpa www dijawab pengalihan 307
 * menuju www. Menuliskan bentuk tanpa www di sini membuat seluruh tautan
 * kanonis dan isi peta situs menunjuk alamat yang mengalihkan, dan sinyal
 * pencariannya terpecah antara dua bentuk alamat yang sama.
 */

export const SITUS = {
  url: "https://www.skditumudah.com",
  aplikasi: "https://app.skditumudah.com",
  nama: "SKD Itu Mudah",
  merek: "skditumudah.com",
  deskripsi:
    "Latihan SKD online untuk CPNS dan Sekolah Kedinasan: TWK, TIU, dan TKP " +
    "dengan penilaian seperti ujian sesungguhnya, pembahasan tiap soal, dan " +
    "analitik kelemahan per subtes. Gratis dua sesi tryout pertama.",
  gambar: "/og-image.png",
} as const;

/**
 * Keterangan organisasi dan situs untuk mesin pencari.
 *
 * Organization menghubungkan situs ini dengan satu badan yang sama, sehingga
 * penyebutan merek di tempat lain dapat dikaitkan kembali ke sini. WebSite
 * memberi tahu Google nama resmi situsnya, menggantikan tebakan dari nama
 * domain pada hasil pencarian.
 */
export const KETERANGAN_SITUS = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITUS.url}/#organisasi`,
    name: SITUS.nama,
    alternateName: SITUS.merek,
    url: SITUS.url,
    logo: { "@type": "ImageObject", url: `${SITUS.url}/logo.png` },
    description: SITUS.deskripsi,
    areaServed: { "@type": "Country", name: "Indonesia" },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITUS.url}/#situs`,
    url: SITUS.url,
    name: SITUS.nama,
    inLanguage: "id-ID",
    publisher: { "@id": `${SITUS.url}/#organisasi` },
  },
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Persiapan Seleksi Kompetensi Dasar CPNS dan Sekolah Kedinasan",
    description: SITUS.deskripsi,
    url: SITUS.url,
    provider: { "@id": `${SITUS.url}/#organisasi` },
    inLanguage: "id-ID",
    teaches: [
      "Tes Wawasan Kebangsaan",
      "Tes Intelegensia Umum",
      "Tes Karakteristik Pribadi",
    ],
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT100M",
    },
  },
];

/**
 * Menyandikan data terstruktur menjadi teks yang aman ditaruh di dalam tag
 * script.
 *
 * Data terstruktur wajib berupa JSON mentah, sehingga tidak dapat disisipkan
 * sebagai teks biasa yang aksaranya disulih React. Yang membuatnya tetap aman
 * adalah penyandian di bawah: kurung sudut menutup pelarian `</script>`,
 * sedangkan U+2028 dan U+2029 adalah pemisah baris yang sah dalam JSON tetapi
 * memutus sintaks JavaScript. Sesudah keempatnya disandikan, isi apa pun tidak
 * dapat lagi keluar dari tag script.
 */
export function sandikanJsonLd(isi: unknown): string {
  return JSON.stringify(isi)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
