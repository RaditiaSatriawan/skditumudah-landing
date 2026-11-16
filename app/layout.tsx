import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITUS } from "./seo";

// Variabel --font-inter dipakai token --font-sans Tailwind, jadi kelas font-sans pun memakai Inter.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

/**
 * Penanda untuk seluruh halaman.
 *
 * Sebelumnya isinya hanya judul "skditumudah.com" dan deskripsi "Platform
 * Tryout SKD", tanpa metadataBase, tautan kanonis, gambar bagikan, maupun
 * kartu Twitter. Akibatnya tautan yang dibagikan ke WhatsApp atau media sosial
 * tampil tanpa gambar dan tanpa keterangan, dan satu halaman yang dibuka
 * dengan parameter penjejak berbeda terbaca sebagai beberapa halaman berisi
 * hal yang sama.
 *
 * metadataBase membuat jalur relatif pada openGraph dan alternates disusun
 * menjadi alamat penuh dengan sendirinya, sehingga alamat situsnya cukup
 * ditulis di satu tempat.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITUS.url),
  title: {
    default: "Tryout SKD CPNS & Sekolah Kedinasan Online — Gratis 2 Sesi",
    template: `%s | ${SITUS.merek}`,
  },
  description: SITUS.deskripsi,
  applicationName: SITUS.nama,
  keywords: [
    "tryout skd",
    "tryout cpns",
    "soal skd",
    "latihan skd online",
    "tryout sekolah kedinasan",
    "twk tiu tkp",
    "simulasi cat bkn",
    "tes pauli online",
    "tes kraepelin online",
    "tes koran online",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: SITUS.nama,
    title: "Tryout SKD CPNS & Sekolah Kedinasan Online — Gratis 2 Sesi",
    description: SITUS.deskripsi,
    images: [{ url: SITUS.gambar, width: 1200, height: 630, alt: SITUS.nama }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tryout SKD CPNS & Sekolah Kedinasan Online",
    description: SITUS.deskripsi,
    images: [SITUS.gambar],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: "/favicon.ico" },
  verification: { google: "hNnnoV94910gA6rmG-IorR5kfHin2l-h9sIeDEAVBHA" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        {children}
      </body>
    </html>
  );
}
