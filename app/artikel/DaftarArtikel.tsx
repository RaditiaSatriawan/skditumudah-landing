"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type KartuArtikel = {
  slug: string;
  title: string;
  description: string;
  kategori: string;
  tags: string[];
  updated: string;
  menitBaca: number;
  foto: string;
  fotoBesar: string;
  imageAlt: string;
};


function Panah({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className={className}>
      <path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Daftar artikel dengan pencarian dan filter kategori; artikel teratas tampil sebagai sorotan. */
export default function DaftarArtikel({ artikel }: { artikel: KartuArtikel[] }) {
  const [kategori, setKategori] = useState("Semua");
  const [cari, setCari] = useState("");

  const kategoriAda = useMemo(() => {
    const hitung = new Map<string, number>();
    for (const a of artikel) hitung.set(a.kategori, (hitung.get(a.kategori) ?? 0) + 1);
    return [["Semua", artikel.length] as const, ...[...hitung.entries()].sort((a, b) => b[1] - a[1])];
  }, [artikel]);

  const tersaring = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return artikel.filter(
      (a) =>
        (kategori === "Semua" || a.kategori === kategori) &&
        (!q || `${a.title} ${a.description} ${a.tags.join(" ")}`.toLowerCase().includes(q)),
    );
  }, [artikel, kategori, cari]);

  const sorotan = kategori === "Semua" && !cari ? tersaring[0] : undefined;
  const sisa = sorotan ? tersaring.slice(1) : tersaring;

  return (
    <>
      {/* Pencarian dan kategori */}
      <div className="relative z-10 -mt-8 rounded-2xl border border-[#dce1ff] bg-white p-4 shadow-xl shadow-blue-900/5 sm:p-5">
        <label className="relative block">
          <span className="sr-only">Cari artikel</span>
          <svg viewBox="0 0 20 20" aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#54647a]">
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="m14 14 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            placeholder="Cari: passing grade, TIU, tes Pauli, kedinasan…"
            className="w-full rounded-xl border border-[#c5c5d3] bg-[#f9f9ff] py-3 pl-12 pr-4 text-sm text-[#111c2d] outline-none transition focus:border-[#00236f] focus:bg-white focus:ring-4 focus:ring-[#dce1ff]"
          />
        </label>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {kategoriAda.map(([nama, jumlah]) => {
            const aktif = kategori === nama;
            return (
              <button
                key={nama}
                type="button"
                onClick={() => setKategori(nama)}
                aria-pressed={aktif}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${
                  aktif ? "bg-[#00236f] text-white shadow-md shadow-blue-900/20" : "bg-[#f0f3ff] text-[#264191] hover:bg-[#dce1ff]"
                }`}
              >
                {nama}
                <span className={`rounded-full px-2 py-0.5 text-[11px] ${aktif ? "bg-white/20" : "bg-white"}`}>{jumlah}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sorotan */}
      {sorotan && (
        <Link
          href={`/${sorotan.slug}/`}
          className="group relative mt-10 grid overflow-hidden rounded-3xl bg-[#00236f] shadow-2xl shadow-blue-900/20 lg:grid-cols-[1.25fr_1fr]"
        >
          <div className="relative aspect-video overflow-hidden lg:aspect-auto lg:min-h-[340px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sorotan.fotoBesar}
              alt={sorotan.imageAlt}
              width={960}
              height={540}
              fetchPriority="high"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00236f]/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#00236f]" />
            <span className="absolute left-4 top-4 rounded-full bg-[#ffb95f] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#2a1700]">
              Terbaru
            </span>
          </div>
          <div className="flex flex-col justify-center p-6 text-white sm:p-8 lg:p-10">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffb95f]">{sorotan.kategori}</span>
            <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">{sorotan.title}</h2>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#c9d4ff] sm:text-base">{sorotan.description}</p>
            <div className="mt-6 flex items-center justify-between gap-4">
              <span className="text-xs text-[#c9d4ff]">
                {sorotan.menitBaca} menit baca
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-black text-[#00236f] transition group-hover:gap-3">
                Baca
                <Panah className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>
      )}

      {/* Kisi artikel */}
      {sisa.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sisa.map((a, i) => (
            <Link
              key={a.slug}
              href={`/${a.slug}/`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#e2e6f3] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#b6c4ff] hover:shadow-xl hover:shadow-blue-900/10"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#dce1ff]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.foto}
                  alt={a.imageAlt}
                  width={640}
                  height={400}
                  loading={i < 3 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-black text-[#00236f] shadow">
                  {a.kategori}
                </span>
                <span className="absolute bottom-3 left-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                  {a.menitBaca} menit baca
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-extrabold leading-snug text-[#111c2d] transition group-hover:text-[#00236f]">{a.title}</h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[#54647a]">{a.description}</p>
                <div className="mt-5 flex items-center justify-between border-t border-[#eef0f6] pt-4">
                  <span className="text-xs font-semibold text-[#54647a]">Baca selengkapnya</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-black text-[#00236f]">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f3ff] transition group-hover:translate-x-1 group-hover:bg-[#00236f] group-hover:text-white">
                      <Panah className="h-4 w-4" />
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        !sorotan && (
          <div className="mt-10 rounded-2xl border border-dashed border-[#c5c5d3] bg-white p-10 text-center text-[#54647a]">
            Tidak ada artikel yang cocok.{" "}
            <button
              type="button"
              className="font-bold text-[#00236f] underline"
              onClick={() => {
                setCari("");
                setKategori("Semua");
              }}
            >
              Tampilkan semua
            </button>
          </div>
        )
      )}
    </>
  );
}
