import { ImageResponse } from "next/og";
import { SITE } from "./lib/seo";

export const alt =
  "skditumudah.com — latihan tryout SKD CPNS dan Sekolah Kedinasan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Gambar yang muncul ketika tautan situs dibagikan di WhatsApp, Facebook, atau
 * X. Dibuat dari kode supaya ukurannya selalu tepat 1200 kali 630 dan isinya
 * ikut berubah bila keterangan situs di app/lib/seo.ts diperbarui.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #00236f 0%, #001542 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#ffb95f",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          TWK · TIU · TKP
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: 82,
              fontWeight: 800,
              lineHeight: 1.05,
            }}
          >
            Tryout SKD CPNS &amp; Kedinasan
          </div>
          <div
            style={{
              display: "flex",
              color: "rgba(255,255,255,0.72)",
              fontSize: 34,
              lineHeight: 1.3,
            }}
          >
            Simulasi CAT, pembahasan tiap soal, dan analisis hasil per kategori
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(255,255,255,0.15)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", color: "#ffffff", fontSize: 34, fontWeight: 700 }}>
            {SITE.nama}
          </div>
          <div
            style={{
              display: "flex",
              color: "#ffb95f",
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            Belajar SKD itu Mudah
          </div>
        </div>
      </div>
    ),
    size,
  );
}
