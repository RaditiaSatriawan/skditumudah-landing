"use client";

import { useEffect, useState } from "react";

/**
 * Tombol anak panah kembali ke atas (muncul setelah halaman digulir) dan, bila diminta, bilah progres baca di atas
 * layar untuk halaman artikel.
 */
export default function TombolAtas({ progres = false }: { progres?: boolean }) {
  const [tampil, setTampil] = useState(false);
  const [persen, setPersen] = useState(0);

  useEffect(() => {
    let antre = false;
    const ukur = () => {
      antre = false;
      const atas = window.scrollY;
      const tinggi = document.documentElement.scrollHeight - window.innerHeight;
      setTampil(atas > 600);
      setPersen(tinggi > 0 ? Math.min(100, (atas / tinggi) * 100) : 0);
    };
    const gulir = () => {
      if (!antre) {
        antre = true;
        requestAnimationFrame(ukur);
      }
    };
    ukur();
    window.addEventListener("scroll", gulir, { passive: true });
    return () => window.removeEventListener("scroll", gulir);
  }, []);

  return (
    <>
      {progres && (
        <div aria-hidden className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
          <div className="h-full bg-gradient-to-r from-[#ffb95f] to-[#ef9900] transition-[width] duration-150" style={{ width: `${persen}%` }} />
        </div>
      )}
      <button
        type="button"
        aria-label="Kembali ke atas"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#00236f] text-white shadow-xl shadow-blue-900/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1e3a8a] sm:bottom-8 sm:right-8 ${
          tampil ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <svg viewBox="0 0 20 20" fill="none" aria-hidden className="h-5 w-5">
          <path d="M10 16V4m0 0L5 9m5-5 5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  );
}
