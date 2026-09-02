import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const SITE = "https://skditumudah.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Skditumudah — Tryout & Latihan Soal SKD CPNS Online",
    template: "%s | Skditumudah",
  },
  description:
    "Tryout dan latihan soal SKD CPNS (TWK, TIU, TKP) online bergaya CAT BKN, plus artikel panduan pendaftaran CPNS, passing grade, dan kisi-kisi materi terbaru.",
  applicationName: "Skditumudah",
  keywords: [
    "tryout SKD CPNS",
    "latihan soal CPNS",
    "soal TWK TIU TKP",
    "passing grade SKD CPNS",
    "pendaftaran CPNS",
    "skditumudah",
  ],
  alternates: { canonical: SITE },
  openGraph: {
    type: "website",
    siteName: "Skditumudah",
    url: SITE,
    title: "Skditumudah — Tryout & Latihan Soal SKD CPNS Online",
    description:
      "Tryout dan latihan soal SKD CPNS (TWK, TIU, TKP) online bergaya CAT BKN, plus artikel panduan CPNS terbaru.",
    locale: "id_ID",
  },
  twitter: {
    card: "summary",
    title: "Skditumudah — Tryout & Latihan Soal SKD CPNS Online",
    description:
      "Tryout dan latihan soal SKD CPNS (TWK, TIU, TKP) online bergaya CAT BKN.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        {children}
      </body>
    </html>
  );
}
