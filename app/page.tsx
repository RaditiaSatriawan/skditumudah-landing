import LandingUI from "./LandingUI";

// SEO Metadata
export const metadata = {
  title: "skditumudah.com — Platform Tryout SKD Terlengkap untuk CPNS & Kedinasan",
  description: "Latihan SKD online dengan analitik AI personal, pembahasan mendalam tiap soal, dan komunitas Discord premium. Gratis 2 sesi tryout pertama.",
  openGraph: {
    title: "skditumudah.com — Tryout SKD Terlengkap",
  }
};

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
    // Menarik data langsung dari API Publik VPS Anda
    // Menggunakan ISR (Incremental Static Regeneration)
    // Next.js akan men-cache data ini dan memperbaruinya di background setiap 60 detik.
    // Ini membuat Vercel sangat cepat tapi datanya tetap "real-time" dengan Admin Panel Anda.
    const res = await fetch("https://skditumudah.com/api/public/landing", { 
      next: { revalidate: 60 } 
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
      <LandingUI data={landingData} />
    </>
  );
}
