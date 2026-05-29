"use client";
/* eslint-disable */
import { useState, useEffect, useRef } from "react";
import { PAKET_LIST, formatRp } from "./constants/paket";


export const links = () => [
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
  },
];


const faqData = [
  {
    question: "Apakah materi soal sesuai kisi-kisi terbaru?",
    answer:
      "Tentu saja! Tim kami selalu memperbarui bank soal setiap kali ada update resmi dari BKN mengenai kisi-kisi SKD CPNS maupun Sekolah Kedinasan tahun 2024.",
  },
  {
    question: "Berapa lama masa aktif paket premium?",
    answer:
      "Masa aktif paket Premium adalah 1 bulan, Premium Plus 3 bulan, dan Premium Sultan 12 bulan sejak tanggal aktivasi.",
  },
  {
    question: "Apakah bisa diakses lewat smartphone?",
    answer:
      "Tentu! Platform kami sepenuhnya responsif dan bisa diakses dari HP, tablet, maupun laptop dengan nyaman.",
  },
  {
    question: "Metode pembayaran apa saja yang tersedia?",
    answer:
      "Kami menerima transfer bank, QRIS, GoPay, OVO, Dana, dan berbagai metode pembayaran digital lainnya.",
  },
  {
    question: "Apakah ada garansi uang kembali?",
    answer:
      "Ya! Kami memberikan garansi uang kembali 7 hari jika kamu tidak puas dengan layanan kami.",
  },
];

const FILL_1 = { fontVariationSettings: "'FILL' 1" };

export default function LandingUI({ data }: { data: any }) {
  const { cfg, testimonis, fiturs, banner, latestArtikels } = data;
  const [bannerVisible, setBannerVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo =
    (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;
      const navbarHeight = navbarRef.current?.offsetHeight ?? 72;
      const top =
        el.getBoundingClientRect().top + window.scrollY - navbarHeight - 8;
      window.scrollTo({ top, behavior: "smooth" });
      setMenuOpen(false);
    };

  return (
    <div className="bg-background font-sans text-on-surface">
      {/* ── Fixed Header ── */}
      <header className="fixed left-0 w-full z-50 top-0">
        {/* Announcement Banner */}
        {banner && bannerVisible && (
          <div className={`text-sm font-semibold text-center py-2 px-10 flex items-center justify-center relative ${
            banner.warna === "amber"
              ? "bg-[#ffb95f] text-[#2a1700]"
              : banner.warna === "blue"
              ? "bg-blue-600 text-white"
              : banner.warna === "green"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}>
            <span className="leading-snug">{banner.teks}</span>
            <button
              onClick={() => setBannerVisible(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity text-base font-bold leading-none p-1"
              aria-label="Dismiss banner"
            >
              ✕
            </button>
          </div>
        )}

        {/* Navbar */}
        <nav
          ref={navbarRef}
          id="navbar"
          className={`bg-white bg-opacity-95 backdrop-blur-md flex justify-between items-center px-6 py-3 max-w-7xl mx-auto w-full rounded-2xl mt-2 border border-outline-variant/20 transition-shadow duration-300 ${
            scrolled ? "shadow-lg shadow-blue-900/20" : "shadow-sm"
          }`}
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="skditumudah logo"
              className="h-12 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span className="text-on-surface font-black text-xl tracking-tight hidden sm:block">
              SKD ITU MUDAH
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {(
              [
                ["Fitur", "fitur"],
                ["Cara Kerja", "cara-kerja"],
                ["Pricing", "pricing"],
                ["Testimoni", "testimoni"],
                ["FAQ", "faq"],
              ] as [string, string][]
            ).map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={scrollTo(id)}
                className="text-on-secondary-container hover:text-primary font-medium transition-colors duration-200"
              >
                {label}
              </a>
            ))}
            <a
              href="https://app.skditumudah.com/blog"
              className="text-on-secondary-container hover:text-primary font-medium transition-colors duration-200"
            >
              Artikel
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="https://app.skditumudah.com/login"
              className="hidden sm:block px-5 py-2 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary-fixed transition-all active:scale-95"
            >
              Masuk
            </a>
            <a
              href="https://app.skditumudah.com/daftar"
              className="px-5 py-2.5 rounded-xl bg-tertiary-fixed-dim text-on-tertiary-fixed font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
              Daftar Gratis
              <span className="material-symbols-outlined text-base leading-none">
                arrow_forward
              </span>
            </a>
            <button
              className="md:hidden p-2 text-on-surface text-xl"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white mx-2 mt-1 rounded-2xl border border-outline-variant/20 shadow-xl p-4 flex flex-col gap-1">
            {(
              [
                ["Fitur", "fitur"],
                ["Cara Kerja", "cara-kerja"],
                ["Pricing", "pricing"],
                ["Testimoni", "testimoni"],
                ["FAQ", "faq"],
              ] as [string, string][]
            ).map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={scrollTo(id)}
                className="text-on-secondary-container hover:text-primary font-medium py-3 px-3 rounded-lg hover:bg-surface-container-low transition-colors"
              >
                {label}
              </a>
            ))}
            <a
              href="https://app.skditumudah.com/blog"
              className="text-on-secondary-container hover:text-primary font-medium py-3 px-3 rounded-lg hover:bg-surface-container-low transition-colors"
            >
              Artikel
            </a>
            <div className="border-t border-outline-variant/20 pt-3 mt-2 flex flex-col gap-2">
              <a
                href="https://app.skditumudah.com/login"
                className="w-full py-2.5 rounded-xl border-2 border-primary text-primary font-bold text-center hover:bg-primary-fixed transition-all"
              >
                Masuk
              </a>
              <a
                href="https://app.skditumudah.com/daftar"
                className="w-full py-2.5 rounded-xl bg-tertiary-fixed-dim text-on-tertiary-fixed font-bold text-center"
              >
                Daftar Gratis
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero Section ── */}
      <section
        id="hero"
        className="relative bg-primary flex items-center pt-24 pb-14 md:pt-28 md:pb-32 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-container/30 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-fixed/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
          {/* Left */}
          <div className="space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/20">
              <span
                className="material-symbols-outlined text-tertiary-fixed-dim text-sm leading-none"
                style={FILL_1}
              >
                stars
              </span>
              <span className="text-white text-[11px] md:text-sm font-semibold tracking-wide">
                🎯 PLATFORM SKD TERPERCAYA #1 DI INDONESIA
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
                {cfg.hero_title_1 || "Siapkan Diri"}{" "}
                <span className="text-tertiary-fixed-dim">{cfg.hero_title_2 || "Menjadi ASN"}</span>
              </h1>
              <div className="space-y-1">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white/90">
                  {cfg.hero_subtitle || "Belajar SKD itu Mudah"}
                </p>
                <p className="text-base md:text-xl text-white/70 italic">{cfg.hero_tagline || "Iya, semudah itu"}</p>
              </div>
            </div>

            <p className="text-sm md:text-lg text-white/75 max-w-xl leading-relaxed">
              {cfg.hero_desc || "Akses ribuan soal latihan, simulasi CAT real-time, dan modul pembelajaran terkini yang didesain khusus untuk meloloskanmu di seleksi CPNS & Kedinasan."}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <a
                href="https://app.skditumudah.com/daftar"
                className="px-6 py-3.5 md:px-8 md:py-4 bg-tertiary-fixed-dim text-on-tertiary-fixed rounded-xl font-bold text-base md:text-lg shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                {cfg.hero_cta_primary || "Mulai Latihan Sekarang"}
                <span className="material-symbols-outlined text-xl">rocket_launch</span>
              </a>
              <a
                href="#pricing"
                onClick={scrollTo("pricing")}
                className="px-6 py-3.5 md:px-8 md:py-4 border-2 border-white/30 text-white rounded-xl font-bold text-base md:text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                {cfg.hero_cta_secondary || "Lihat Paket"}
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-5 md:gap-8 opacity-60 hover:opacity-100 transition-all duration-500">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <span className="material-symbols-outlined text-xl">security</span>
                <span>Aman &amp; Terpercaya</span>
              </div>
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <span className="material-symbols-outlined text-xl">verified_user</span>
                <span>Kurikulum Terbaru</span>
              </div>
            </div>
          </div>

          {/* Right – Hero Image */}
          <div className="relative flex justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-xl px-4 sm:px-0">
              {/* Main hero image */}
              <div className="relative bg-primary-container rounded-3xl lg:rounded-[3rem] overflow-hidden shadow-2xl rotate-1 lg:rotate-2">
                <img
                  src="/images/hero.jpg"
                  alt="Student studying for SKD exam"
                  className="w-full h-auto object-cover block"
                  onError={(e) => {
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="flex flex-col items-center justify-center gap-4 p-12 min-h-64">
                          <span class="text-7xl">📚</span>
                          <div class="text-center">
                            <p class="text-white font-black text-xl">TWK · TIU · TKP</p>
                            <p class="text-white/60 text-sm mt-1">10.000+ soal terkurasi</p>
                          </div>
                        </div>`;
                    }
                  }}
                />
              </div>

              {/* Floating: Rank */}
              <div className="hidden md:flex absolute -top-8 -left-6 glass-card p-4 rounded-2xl shadow-xl items-center gap-3 animate-bounce z-20">
                <div className="bg-green-500 p-2 rounded-full">
                  <span
                    className="material-symbols-outlined text-white text-sm leading-none"
                    style={FILL_1}
                  >
                    check
                  </span>
                </div>
                <div>
                  <p className="text-white text-xs font-bold">Top 10 Rank</p>
                  <p className="text-white/60 text-[10px]">Tryout Akbar #4</p>
                </div>
              </div>

              {/* Floating: Timer */}
              <div className="hidden md:flex absolute bottom-12 -right-6 lg:-right-8 glass-card p-4 rounded-2xl shadow-2xl z-20 flex-col items-center">
                <span className="text-tertiary-fixed-dim text-2xl lg:text-3xl font-black font-mono tracking-widest">
                  42:18
                </span>
                <span className="text-white/60 text-[10px] uppercase font-bold tracking-tighter">
                  Waktu Tersisa
                </span>
              </div>

              {/* Floating: Progress */}
              <div className="hidden md:block absolute -bottom-6 left-1/4 glass-card p-4 rounded-2xl shadow-xl w-44 space-y-3 z-20">
                <div className="flex justify-between items-center">
                  <span className="text-white text-xs font-bold">
                    Progress Belajar
                  </span>
                  <span className="text-green-400 text-xs font-bold">88%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: "88%" }}
                  />
                </div>
                <div className="flex -space-x-2">
                  {["bg-slate-300", "bg-slate-400", "bg-slate-500"].map(
                    (c, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded-full border-2 border-primary ${c}`}
                      />
                    )
                  )}
                  <div className="w-6 h-6 rounded-full border-2 border-primary bg-primary-container flex items-center justify-center">
                    <span className="text-[8px] text-white">+12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Statistics Section ── */}
      <section id="statistik" className="py-12 md:py-20 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {(
              [
                ["10.000+", "Bank Soal", "menu_book"],
                ["5.000+", "Pejuang ASN", "people"],
                ["4.9★", "Rating User", "star"],
                ["2x", "Update Mingguan", "autorenew"],
              ] as [string, string, string][]
            ).map(([value, label, icon]) => (
              <div
                key={label}
                className="p-5 md:p-8 rounded-2xl md:rounded-3xl bg-surface-container-low text-center space-y-1 md:space-y-2 hover:-translate-y-1 transition-transform shadow-sm"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-fixed rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
                  <span className="material-symbols-outlined text-primary text-xl">
                    {icon}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-primary">{value}</h3>
                <p className="text-on-secondary-container font-medium text-xs md:text-base">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="cara-kerja" className="py-16 md:py-24 bg-surface-container">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-10 md:mb-16 space-y-3">
            <h2 className="text-3xl md:text-4xl font-black text-on-surface">
              Mulai dalam 3 Langkah
            </h2>
            <p className="text-on-secondary-container max-w-2xl mx-auto text-sm md:text-base">
              Sistem kami dirancang sesimpel mungkin agar kamu bisa fokus 100%
              pada persiapan ujian tanpa ribet urusan teknis.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
            {(
              [
                [
                  "01",
                  "person_add",
                  "Daftar Akun",
                  "Buat akun gratis dalam 30 detik. Kamu langsung dapat akses ke materi perkenalan dan 2 tryout gratis.",
                ],
                [
                  "02",
                  "edit_note",
                  "Pilih Paket & Latihan",
                  "Pilih paket yang sesuai kebutuhanmu dan mulai kerjakan bank soal yang sudah dikategorikan per sub-materi.",
                ],
                [
                  "03",
                  "analytics",
                  "Pantau Progress",
                  "Lihat perkembangan skormu melalui dashboard analitik AI. Ketahui kelemahanmu sebelum hari H ujian.",
                ],
              ] as [string, string, string, string][]
            ).map(([num, icon, title, desc]) => (
              <div key={num} className="relative group">
                <div className="absolute -top-4 -left-3 md:-top-6 md:-left-6 text-7xl md:text-8xl font-black text-primary/5 select-none leading-none">
                  {num}
                </div>
                <div className="relative bg-surface-container-lowest p-7 md:p-10 rounded-3xl shadow-sm space-y-4 md:space-y-6">
                  <div className="w-14 h-14 bg-primary-fixed rounded-2xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-2xl md:text-3xl">
                      {icon}
                    </span>
                  </div>
                  <h4 className="text-lg md:text-xl font-bold">{title}</h4>
                  <p className="text-on-secondary-container text-sm md:text-base leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section id="fitur" className="py-16 md:py-24 bg-surface-container-lowest overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          {/* Featured AI Card */}
          <div className="bg-primary rounded-3xl md:rounded-[3rem] p-7 md:p-16 flex flex-col lg:flex-row items-center gap-8 md:gap-12 mb-8 md:mb-12 shadow-2xl">
            <div className="flex-1 space-y-5 md:space-y-6">
              <div className="inline-block bg-white/20 px-4 py-1 rounded-full text-white text-xs font-bold uppercase tracking-widest">
                Kecerdasan Buatan
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white">
                Analitik AI Personal
              </h2>
              <p className="text-white/70 text-lg">
                Platform kami menganalisis setiap jawabanmu untuk memberikan
                rekomendasi belajar yang dipersonalisasi. Tidak ada lagi belajar
                buta, fokus hanya pada apa yang perlu ditingkatkan.
              </p>
              <ul className="space-y-3">
                {[
                  "Deteksi Kelemahan Per Sub-Bab",
                  "Prediksi Kelulusan (Passing Grade)",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-white font-medium"
                  >
                    <span
                      className="material-symbols-outlined text-tertiary-fixed-dim"
                      style={FILL_1}
                    >
                      check_circle
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Analysis mockup */}
            <div className="flex-1 w-full max-w-sm md:max-w-md">
              <div className="bg-white rounded-3xl p-5 md:p-6 shadow-2xl rotate-1 md:rotate-2">
                <div className="flex justify-between items-center mb-6">
                  <h5 className="font-bold">Analisis TWK</h5>
                  <span className="text-xs bg-primary-fixed text-primary px-2 py-1 rounded-lg font-bold">
                    Butuh Perbaikan
                  </span>
                </div>
                <div className="space-y-4">
                  {(
                    [
                      ["Pancasila", 92, "bg-green-500"],
                      ["Nasionalisme", 45, "bg-error"],
                    ] as [string, number, string][]
                  ).map(([label, pct, color]) => (
                    <div key={label} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span>{label}</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full">
                        <div
                          className={`h-full ${color} rounded-full`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="mt-6 p-4 bg-primary-fixed/50 rounded-xl">
                    <p className="text-[10px] leading-relaxed text-primary">
                      <strong>Saran AI:</strong> Pelajari lebih dalam bab
                      Sejarah Pergerakan Nasional untuk meningkatkan skor TWK
                      Anda.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {fiturs.map((fitur: any) => (
              <div
                key={fitur.id}
                className="bg-surface-container-low p-6 md:p-8 rounded-3xl hover:bg-surface-container-high transition-colors group relative overflow-hidden"
              >
                {fitur.badge && (
                  <div className="absolute top-4 right-4 bg-tertiary-container text-tertiary-fixed px-3 py-1 rounded-full text-[10px] font-bold">
                    {fitur.badge}
                  </div>
                )}
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary text-xl md:text-2xl">
                    {fitur.icon}
                  </span>
                </div>
                <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{fitur.judul}</h4>
                <p className="text-on-secondary-container text-sm leading-relaxed">
                  {fitur.deskripsi}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Section ── */}
      <section id="pricing" className="py-14 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#00236f] mb-3">
              Pilih Paket Belajarmu
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm md:text-base">
              Investasi kecil untuk masa depan cerah sebagai ASN
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-6xl mx-auto mt-6 md:mt-10">
            {PAKET_LIST.map((paket) => {
              const hasBadge = paket.popular || paket.badge;
              return (
                <div
                  key={paket.id}
                  className="relative flex flex-col bg-white rounded-3xl overflow-visible shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Floating badges */}
                  {paket.popular && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full text-white text-[11px] font-black uppercase tracking-wider shadow-lg whitespace-nowrap"
                      style={{ background: paket.color }}
                    >
                      ⭐ PALING POPULER
                    </div>
                  )}
                  {paket.badge && (
                    <div
                      className="absolute -top-3 right-4 z-10 px-3 py-1.5 rounded-full text-white text-[10px] font-black uppercase tracking-wider shadow-lg whitespace-nowrap"
                      style={{ background: paket.color }}
                    >
                      BEST VALUE
                    </div>
                  )}

                  {/* Colored header with price */}
                  <div
                    className={`px-6 text-white text-center rounded-t-3xl ${hasBadge ? "pt-8 pb-5" : "pt-6 pb-5"}`}
                    style={{ background: paket.color }}
                  >
                    <p className="text-white/70 text-[11px] font-bold uppercase tracking-widest mb-1">
                      {paket.durasi}
                    </p>
                    <h3 className="text-2xl font-black leading-tight mb-3">{paket.nama}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-base font-semibold opacity-80">Rp</span>
                      <span className="text-4xl font-black">
                        {paket.harga.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <p className="text-white/60 text-xs mt-1">
                      ≈ Rp {paket.hargaPerBulan.toLocaleString("id-ID")}/bulan
                    </p>
                  </div>

                  {/* Features */}
                  <div className="px-5 py-5 flex-1">
                    <ul className="space-y-3">
                      {paket.fitur.map((f, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: paket.colorLight }}
                          >
                            <span
                              className="material-symbols-outlined"
                              style={{
                                color: paket.color,
                                fontVariationSettings: "'FILL' 1",
                                fontSize: "14px",
                              }}
                            >
                              check
                            </span>
                          </div>
                          <span
                            className={
                              i === 0 && paket.id !== "PREMIUM_1BLN"
                                ? "font-semibold text-gray-900"
                                : ""
                            }
                          >
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="px-5 pb-6">
                    <a
                      href="https://app.skditumudah.com/daftar"
                      className="block w-full py-3.5 rounded-2xl font-black text-white text-sm text-center transition-all hover:opacity-90 active:scale-95"
                      style={{ background: paket.color }}
                    >
                      Pilih {paket.nama}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-gray-400 text-sm mt-8">
            Daftar gratis dan langsung dapat{" "}
            <strong className="text-[#00236f]">2 sesi tryout penuh</strong> — tanpa kartu kredit.
          </p>
        </div>
      </section>

      {/* ── Testimonials Section ── */}
      <section
        id="testimoni"
        className="py-16 md:py-24 bg-primary text-white overflow-hidden relative"
      >
        <div
          className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
          {testimonis.filter((t: any) => t.isFeatured).map((t: any) => (
            <div key={t.id} className="max-w-4xl mx-auto text-center space-y-6 md:space-y-10">
              <span className="material-symbols-outlined text-5xl md:text-6xl text-tertiary-fixed-dim/40">
                format_quote
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black italic leading-tight">
                "{t.isi}"
              </h2>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-white/20 bg-slate-500 flex items-center justify-center">
                  <span className="text-white text-xl md:text-2xl font-bold">{t.nama[0]}</span>
                </div>
                <div>
                  <p className="font-bold text-base md:text-lg">{t.nama}</p>
                  <p className="text-white/60 text-sm">{t.jabatan}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-10 md:mt-16">
            {testimonis.filter((t: any) => !t.isFeatured).map((t: any) => (
              <div key={t.id} className="glass-card p-6 md:p-8 rounded-3xl">
                <p className="text-sm italic mb-5">"{t.isi}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-500 flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                    {t.nama[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold">{t.nama}</p>
                    <p className="text-[10px] text-white/50">{t.jabatan}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog Section ── */}
      {latestArtikels.length > 0 && (
        <section className="py-16 md:py-24 bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <div className="flex items-center justify-between mb-8 md:mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-on-surface">
                  Artikel & Tips SKD
                </h2>
                <p className="text-on-secondary-container text-sm md:text-base mt-2">
                  Baca panduan dan tips terbaru untuk lolos seleksi
                </p>
              </div>
              <a
                href="https://app.skditumudah.com/blog"
                className="hidden md:flex items-center gap-2 px-5 py-2.5 border-2 border-[#00236f] text-[#00236f] rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors"
              >
                Semua Artikel
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestArtikels.map((a: any) => (
                <a
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  <div className="aspect-video bg-[#dce1ff] overflow-hidden relative">
                    {a.thumbnail ? (
                      <img
                        src={a.thumbnail}
                        alt={a.judul}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#00236f] to-[#1e3a8a] flex items-center justify-center">
                        <span className="material-symbols-outlined text-white/30 text-5xl">
                          article
                        </span>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-white/90 text-[#00236f] text-[10px] font-black px-2.5 py-1 rounded-full">
                      {a.kategori}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-black text-gray-900 text-base leading-tight mb-2 line-clamp-2 group-hover:text-[#00236f] transition-colors">
                      {a.judul}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">
                      {a.ringkasan}
                    </p>
                    {a.publishedAt && (
                      <p className="text-xs text-gray-400 mt-3">
                        {new Date(a.publishedAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
            <div className="text-center mt-8 md:hidden">
              <a
                href="https://app.skditumudah.com/blog"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#00236f] text-[#00236f] rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors"
              >
                Semua Artikel
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ Section ── */}
      <section id="faq" className="py-16 md:py-24 bg-surface-container">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-3xl md:text-4xl font-black">Pertanyaan Populer</h2>
            <p className="text-on-secondary-container text-sm md:text-lg">
              Punya pertanyaan lain? Jangan ragu untuk menghubungi tim support
              kami melalui WhatsApp yang tersedia 24/7.
            </p>
            <div className="pt-2">
              <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-white rounded-xl border border-outline-variant/30 font-bold hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined text-green-500">
                  chat
                </span>
                Hubungi Support via WhatsApp
              </button>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            {faqData.map((item, i) => (
              <div
                key={i}
                className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden border border-outline-variant/10"
              >
                <button
                  className="w-full p-4 md:p-6 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span
                    className={`font-bold text-sm md:text-base pr-2 ${
                      openFaq === i ? "text-primary" : ""
                    }`}
                  >
                    {item.question}
                  </span>
                  <span className="material-symbols-outlined text-primary flex-shrink-0">
                    {openFaq === i ? "expand_less" : "expand_more"}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 md:px-6 md:pb-6 text-on-secondary-container text-sm leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-primary to-primary-container rounded-3xl md:rounded-[3rem] p-8 sm:p-12 md:p-24 text-center space-y-5 md:space-y-8 relative overflow-hidden shadow-2xl">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-tertiary-fixed-dim/5 rounded-full blur-3xl" />
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-tight relative z-10">
              Siapkan Diri, Menjadi ASN
            </h2>
            <p className="text-white/70 text-sm md:text-lg max-w-2xl mx-auto relative z-10">
              Jangan tunda lagi persiapanmu. Mulai sekarang dan jadilah salah
              satu dari ribuan alumni kami yang sukses lolos seleksi.
            </p>
            <div className="pt-4 md:pt-8 relative z-10">
              <a
                href="https://app.skditumudah.com/daftar"
                className="px-7 py-4 md:px-10 md:py-5 bg-tertiary-fixed-dim text-on-tertiary-fixed rounded-2xl font-black text-base md:text-xl shadow-2xl hover:scale-105 transition-all flex items-center gap-3 mx-auto w-fit"
              >
                Mulai Latihan Gratis Sekarang
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-on-background w-full pt-12 md:pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 px-5 sm:px-8 max-w-7xl mx-auto mb-10 md:mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="skditumudah logo"
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Platform belajar SKD CPNS &amp; Kedinasan paling interaktif dan
              terpercaya di Indonesia. Bantu kamu raih mimpi jadi ASN dengan
              cara yang mudah.
            </p>
          </div>

          {/* Layanan */}
          <div className="space-y-6">
            <h5 className="text-white font-bold">Layanan Kami</h5>
            <ul className="space-y-4">
              {[
                "Tryout SKD CPNS",
                "Simulasi CAT Kedinasan",
                "Bank Soal Terupdate",
                "Video Pembahasan",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-slate-400 hover:text-tertiary-fixed-dim transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Perusahaan */}
          <div className="space-y-6">
            <h5 className="text-white font-bold">Perusahaan</h5>
            <ul className="space-y-4">
              {[
                "Tentang Kami",
                "Kebijakan Privasi",
                "Syarat & Ketentuan",
                "Hubungi Kami",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-slate-400 hover:text-tertiary-fixed-dim transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h5 className="text-white font-bold">Berlangganan Tips</h5>
            <p className="text-sm text-slate-400">
              Dapatkan tips &amp; trik lolos SKD langsung ke email kamu.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email kamu"
                className="bg-white/10 border-0 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-tertiary-fixed-dim w-full min-w-0"
              />
              <button className="bg-tertiary-fixed-dim text-on-tertiary-fixed p-2.5 rounded-xl hover:opacity-90 transition-opacity flex-shrink-0">
                <span className="material-symbols-outlined text-xl">send</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-6 md:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <p className="text-sm text-slate-300">
            © 2024 skditumudah.com - Teman Belajar SKD Terpercaya
          </p>
          <div className="flex items-center gap-6">
            {(
              [
                ["social_leaderboard", "Instagram"],
                ["play_circle", "YouTube"],
                ["language", "Website"],
              ] as [string, string][]
            ).map(([icon, label]) => (
              <a
                key={icon}
                href="#"
                aria-label={label}
                className="text-slate-400 hover:text-white transition-colors opacity-80 hover:opacity-100"
              >
                <span className="material-symbols-outlined">{icon}</span>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
