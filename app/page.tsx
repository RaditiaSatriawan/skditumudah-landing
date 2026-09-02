import LandingUI from "./LandingUI";
import { KETERANGAN_SITUS, sandikanJsonLd } from "./seo";


export default async function Page() {
  // Fallback data kosong agar UI tidak crash jika API gagal
  let landingData = {
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

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      {/* Keterangan organisasi, situs, dan bidang yang diajarkan, supaya mesin
          pencari mengenali situs ini sebagai satu badan yang sama dan dapat
          menampilkan nama resminya alih-alih menebak dari nama domain. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sandikanJsonLd(KETERANGAN_SITUS) }}
      />
      <LandingUI data={landingData} />
    </>
  );
}
