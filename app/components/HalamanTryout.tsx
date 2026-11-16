import Link from "next/link";
import { fotoUrl, getAllArticles } from "@/lib/articles";
import { SITUS, sandikanJsonLd } from "../seo";
import TombolAtas from "./TombolAtas";

export type JenisTryout = "CPNS" | "KEDINASAN";

type PaketPublik = { judul: string; tipe: string; durasiMenit: number; isPremium: boolean; jumlahSoal: number };

type Konfigurasi = {
  jenis: JenisTryout;
  path: string;
  judul: string;
  pengantar: string;
  ambangTkp: number;
  dasarAmbang: string;
  faq: { tanya: string; jawab: string }[];
  artikelTerkait: string[];
  halamanLain: { label: string; href: string };
};

const DAFTAR = `${SITUS.aplikasi}/daftar`;

/** Daftar paket diambil dari API aplikasi; bila gagal, halaman tetap tampil tanpa daftar paket. */
export async function ambilPaket(jenis: JenisTryout): Promise<PaketPublik[]> {
  try {
    const asalApi = process.env.NEXT_PUBLIC_API_URL ?? "https://app.skditumudah.com";
    const res = await fetch(`${asalApi}/api/public/landing`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    return ((json?.data?.paketTryout ?? []) as PaketPublik[]).filter((p) => p.tipe === jenis);
  } catch {
    return [];
  }
}

/** Contoh soal untuk pratinjau. Kuncinya sudah diperiksa; jawaban TKP memakai bobot hasil telaah kami. */
const CONTOH_SOAL = [
  {
    subtes: "TWK",
    soal: "Menurut Pasal 1 ayat (1) UUD NRI Tahun 1945, bentuk negara Indonesia adalah ...",
    opsi: ["Federasi yang berbentuk republik", "Kesatuan yang berbentuk republik", "Republik yang berbentuk kesatuan", "Kesatuan yang berbentuk monarki konstitusional", "Serikat yang berbentuk republik"],
    kunci: 1,
    bahas: "Pasal 1 ayat (1) berbunyi: “Negara Indonesia ialah Negara Kesatuan, yang berbentuk Republik.” Jadi bentuk negaranya kesatuan, bentuk pemerintahannya republik.",
  },
  {
    subtes: "TIU",
    soal: "Lanjutkan deret berikut: 2, 6, 12, 20, 30, ...",
    opsi: ["38", "40", "42", "44", "48"],
    kunci: 2,
    bahas: "Selisih antarsuku bertambah 2: +4, +6, +8, +10, lalu +12. Maka 30 + 12 = 42. Pola lainnya: n × (n + 1) → 6 × 7 = 42.",
  },
  {
    subtes: "TKP",
    soal: "Seorang warga datang mengurus layanan 10 menit sebelum loket tutup, sementara berkasnya masih kurang satu dokumen. Sikap Anda ...",
    opsi: [
      "Meminta warga datang lagi besok tanpa penjelasan",
      "Menerima berkas apa adanya agar warga tidak kecewa",
      "Menjelaskan dokumen yang kurang, mencatatnya, dan memproses berkas yang lengkap begitu dokumen dilengkapi",
      "Menyuruh warga bertanya ke petugas lain",
      "Memproses sebagian berkas dan memberi tahu cara melengkapi dokumen secepatnya, termasuk lewat layanan daring bila tersedia",
    ],
    kunci: 4,
    bobot: [1, 2, 4, 3, 5],
    bahas: "Pilihan E tetap melayani sesuai aturan sekaligus memberi jalan keluar yang paling cepat bagi warga (bobot 5). C juga baik tetapi kurang proaktif (4). Menerima berkas tidak lengkap melanggar prosedur (2), dan menolak tanpa penjelasan paling buruk (1).",
  },
];

export default function HalamanTryout({ k, paket }: { k: Konfigurasi; paket: PaketPublik[] }) {
  const url = `${SITUS.url}${k.path}`;
  const label = k.jenis === "CPNS" ? "CPNS" : "Sekolah Kedinasan";
  const semuaArtikel = getAllArticles();
  const terkait = k.artikelTerkait.map((s) => semuaArtikel.find((a) => a.slug === s)).filter((a) => a !== undefined);
  const jumlahPaket = paket.length;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#halaman`,
      url,
      name: k.judul,
      description: k.pengantar,
      inLanguage: "id-ID",
      isPartOf: { "@id": `${SITUS.url}/#situs` },
      about: { "@type": "Thing", name: `Seleksi Kompetensi Dasar ${label}` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: `${SITUS.url}/` },
        { "@type": "ListItem", position: 2, name: `Tryout SKD ${label}`, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: k.faq.map((f) => ({ "@type": "Question", name: f.tanya, acceptedAnswer: { "@type": "Answer", text: f.jawab } })),
    },
  ];

  return (
    <main className="min-h-screen bg-[#f6f8ff] text-on-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sandikanJsonLd(jsonLd) }} />

      <nav className="sticky top-0 z-30 border-b border-white/10 bg-[#00236f]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="text-sm font-black text-white">
            skditumudah.com
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/artikel/" className="hidden text-[#c9d4ff] hover:text-white sm:inline">
              Artikel
            </Link>
            <a href={DAFTAR} className="rounded-full bg-[#ffb95f] px-4 py-1.5 font-bold text-[#00236f] hover:opacity-90">
              Coba Gratis
            </a>
          </div>
        </div>
      </nav>

      <header className="bg-[#00236f] pb-14 pt-10 text-white sm:pt-14">
        <div className="mx-auto max-w-6xl px-4">
          <ol className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-[#c9d4ff]">
            <li>
              <Link href="/" className="hover:text-white">Beranda</Link>
            </li>
            <li aria-hidden>›</li>
            <li className="font-semibold text-white">Tryout SKD {label}</li>
          </ol>
          <h1 className="max-w-3xl text-3xl font-black leading-tight sm:text-5xl">{k.judul}</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-[#c9d4ff] sm:text-lg">{k.pengantar}</p>
          <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              [jumlahPaket > 0 ? String(jumlahPaket) : "30", "paket tryout"],
              ["110", "soal per paket"],
              ["100", "menit"],
              ["2", "sesi gratis"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <dt className="text-xs text-[#c9d4ff]">{l}</dt>
                <dd className="text-2xl font-black">{n}</dd>
              </div>
            ))}
          </dl>
          <a
            href={DAFTAR}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ffb95f] px-7 py-4 text-sm font-black text-[#00236f] shadow-xl hover:opacity-90"
          >
            Mulai Tryout SKD {label} Gratis
          </a>
          <p className="mt-3 text-xs text-[#c9d4ff]">Daftar dengan email atau akun Google, tanpa kartu kredit.</p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12">
        <section>
          <h2 className="text-2xl font-black text-[#00236f]">Format dan penilaian seperti CAT BKN</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-on-surface-variant">
            Setiap paket berisi 110 soal yang dikerjakan dalam 100 menit, dengan komposisi dan aturan nilai mengikuti SKD resmi.
            Begitu waktu habis atau Anda menyelesaikan ujian, skor tiap subtes langsung keluar dan dibandingkan dengan nilai ambang batas.
          </p>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-[#e2e6f3] bg-white">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-[#eef1fb] text-[#00236f]">
                <tr>
                  <th className="px-4 py-3">Subtes</th>
                  <th className="px-4 py-3">Jumlah soal</th>
                  <th className="px-4 py-3">Nilai per soal</th>
                  <th className="px-4 py-3">Ambang batas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eef0f6]">
                <tr><td className="px-4 py-3 font-semibold">TWK (Tes Wawasan Kebangsaan)</td><td className="px-4 py-3">30</td><td className="px-4 py-3">Benar 5, salah/kosong 0</td><td className="px-4 py-3">65</td></tr>
                <tr><td className="px-4 py-3 font-semibold">TIU (Tes Intelegensia Umum)</td><td className="px-4 py-3">35</td><td className="px-4 py-3">Benar 5, salah/kosong 0</td><td className="px-4 py-3">80</td></tr>
                <tr><td className="px-4 py-3 font-semibold">TKP (Tes Karakteristik Pribadi)</td><td className="px-4 py-3">45</td><td className="px-4 py-3">Bobot 1–5, kosong 0</td><td className="px-4 py-3">{k.ambangTkp}</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-on-surface-variant">Ambang batas mengacu pada {k.dasarAmbang}.</p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-[#00236f]">Yang Anda dapat dari tryout ini</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              ["Simulasi CAT", "Timer berjalan, navigasi nomor soal, dan penanda ragu-ragu, sehingga ritme ujian terasa sejak latihan."],
              ["Skor langsung keluar", "Nilai TWK, TIU, dan TKP dihitung dengan aturan resmi dan dicek terhadap ambang batas."],
              ["Pembahasan tiap soal", "Kunci dan alasan jawaban tersedia untuk dipelajari setelah ujian selesai."],
              ["Rapor kelemahan", "Rapor analitik menunjukkan subtes dan jenis soal yang paling perlu diperbaiki."],
            ].map(([j, d]) => (
              <li key={j} className="rounded-2xl border border-[#e2e6f3] bg-white p-5">
                <p className="font-extrabold text-[#00236f]">{j}</p>
                <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">{d}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-black text-[#00236f]">Contoh soal tryout SKD {label}</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-on-surface-variant">
            Coba tiga soal berikut untuk melihat gaya soalnya. Ketuk “Lihat jawaban” untuk membaca kunci dan pembahasannya.
          </p>
          <div className="mt-5 space-y-4">
            {CONTOH_SOAL.map((s, i) => (
              <article key={s.subtes} className="rounded-2xl border border-[#e2e6f3] bg-white p-5 sm:p-6">
                <p className="text-xs font-black uppercase tracking-wider text-[#264191]">
                  Soal {i + 1} · {s.subtes}
                </p>
                <p className="mt-2 font-semibold leading-relaxed">{s.soal}</p>
                <ol className="mt-3 space-y-1.5 text-sm">
                  {s.opsi.map((o, j) => (
                    <li key={o} className="flex gap-2">
                      <span className="font-bold text-[#00236f]">{"ABCDE"[j]}.</span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ol>
                <details className="mt-4 rounded-xl bg-[#f0f3ff] p-4 text-sm">
                  <summary className="cursor-pointer font-bold text-[#00236f]">Lihat jawaban</summary>
                  <p className="mt-2">
                    <strong>Kunci: {"ABCDE"[s.kunci]}.</strong>{" "}
                    {s.bobot ? `Bobot A–E: ${s.bobot.join(", ")}. ` : ""}
                    {s.bahas}
                  </p>
                </details>
              </article>
            ))}
          </div>
        </section>

        {paket.length > 0 && (
          <section>
            <h2 className="text-2xl font-black text-[#00236f]">Daftar paket tryout SKD {label}</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-on-surface-variant">
              Tersedia {jumlahPaket} paket, masing-masing {paket[0].jumlahSoal} soal dan {paket[0].durasiMenit} menit. Akun gratis
              mendapat dua sesi tryout; paket Premium membuka akses tanpa batas.
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {paket.map((p) => (
                <li key={p.judul} className="flex items-center justify-between gap-2 rounded-xl border border-[#e2e6f3] bg-white px-3 py-2.5 text-sm">
                  <span className="font-semibold">{p.judul}</span>
                  {p.isPremium && <span className="shrink-0 rounded-full bg-[#fff1d6] px-2 py-0.5 text-[11px] font-bold text-[#8a5300]">Premium</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-black text-[#00236f]">Cara mulai</h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-3">
            {[
              ["Daftar gratis", "Buat akun dengan email atau Google dalam satu menit."],
              ["Pilih paket", `Masuk ke menu Tryout SKD ${label} dan pilih paket yang ingin dikerjakan.`],
              ["Kerjakan dan evaluasi", "Selesaikan 110 soal, lalu pelajari skor, pembahasan, dan rapor kelemahanmu."],
            ].map(([j, d], i) => (
              <li key={j} className="rounded-2xl border border-[#e2e6f3] bg-white p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00236f] text-sm font-black text-white">{i + 1}</span>
                <p className="mt-3 font-extrabold text-[#00236f]">{j}</p>
                <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-black text-[#00236f]">Pertanyaan yang sering diajukan</h2>
          <div className="mt-5 space-y-3">
            {k.faq.map((f) => (
              <details key={f.tanya} className="rounded-2xl border border-[#e2e6f3] bg-white p-5">
                <summary className="cursor-pointer font-bold text-[#00236f]">{f.tanya}</summary>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{f.jawab}</p>
              </details>
            ))}
          </div>
        </section>

        {terkait.length > 0 && (
          <section>
            <h2 className="text-2xl font-black text-[#00236f]">Panduan persiapan SKD {label}</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {terkait.map((a) => (
                <li key={a.slug}>
                  <Link href={`/${a.slug}/`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e2e6f3] bg-white hover:shadow-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={fotoUrl(a.image, 480, 270)} width={480} height={270} alt={a.imageAlt} loading="lazy" decoding="async" className="aspect-video w-full object-cover" />
                    <p className="p-4 text-sm font-bold leading-snug group-hover:text-[#00236f]">{a.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-3xl bg-[#00236f] p-7 text-white sm:p-10">
          <h2 className="text-2xl font-black">Siap mengukur skor SKD {label}-mu?</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#c9d4ff] sm:text-base">
            Dua sesi pertama gratis. Kerjakan satu paket sekarang dan lihat seberapa jauh skormu dari ambang batas.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={DAFTAR} className="rounded-full bg-[#ffb95f] px-6 py-3 text-sm font-black text-[#00236f] hover:opacity-90">
              Mulai Tryout Gratis
            </a>
            <Link href={k.halamanLain.href} className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold hover:bg-white/10">
              {k.halamanLain.label}
            </Link>
          </div>
        </section>
      </div>

      <footer className="border-t border-[#e2e6f3] bg-white py-6 text-center text-xs text-on-surface-variant">
        © {new Date().getFullYear()} {SITUS.merek} ·{" "}
        <Link href="/artikel/" className="hover:text-primary">Artikel</Link>
      </footer>
      <TombolAtas />
    </main>
  );
}
