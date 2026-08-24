import LandingUI from "./LandingUI";

// Keterangan halaman untuk mesin pencari seluruhnya disusun di app/layout.tsx
// supaya hanya ada satu sumber. Menuliskannya kembali di sini justru menimpa
// bagian yang lebih lengkap di sana, misalnya alamat kanonik dan gambar
// bagikan, sehingga sengaja tidak dilakukan.

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

  return <LandingUI data={landingData} />;
}
