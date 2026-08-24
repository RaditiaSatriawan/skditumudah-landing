import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE, KATA_KUNCI, dataTerstrukturAman } from "./lib/seo";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  // Dasar bagi seluruh alamat relatif di bawah ini. Tanpa ini, alamat gambar
  // bagikan dan alamat kanonik tidak pernah menjadi alamat penuh.
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.judul,
    template: `%s — ${SITE.nama}`,
  },
  description: SITE.deskripsi,
  keywords: KATA_KUNCI,
  applicationName: SITE.nama,
  authors: [{ name: SITE.nama, url: SITE.url }],
  creator: SITE.nama,
  publisher: SITE.nama,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE.url,
    siteName: SITE.nama,
    title: SITE.judul,
    description: SITE.deskripsi,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.judul,
    description: SITE.deskripsi,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "education",
  // Nomor telepon di dalam teks jangan diubah sendiri menjadi tautan panggilan
  // oleh peramban, sebab kontak resminya sudah ditulis sebagai tautan.
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#00236f",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* Ikon Material Symbols ditarik dari Google. Peringatan eslint
            no-page-custom-font ditujukan bagi Pages Router, tempat font di satu
            halaman tidak berlaku di halaman lain. Di App Router berkas ini
            adalah tata letak akar, sehingga fontnya memang berlaku menyeluruh.
            Kedua preconnect di bawah memangkas waktu jabat tangan ke peladen
            fontnya. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: dataTerstrukturAman() }}
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        {children}
      </body>
    </html>
  );
}
