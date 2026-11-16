import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import TemaToggle from "./TemaToggle";

// Halaman yang desainnya dikunci gelap: navbar ikut gelap supaya menyatu.
const HALAMAN_GELAP = ["/ad-art", "/calon-ketua"];

// Navbar gaya Chevening: putih + logo berwarna di mode terang, gelap + logo putih di mode gelap, logo + garis emas + nama 3 baris,
// menu dikelompokkan dengan dropdown, menu aktif ditandai huruf tebal.
// Warna memakai token ika-* (src/index.css) yang ikut tema.
const menu = [
  {
    label: "Tentang Kami",
    items: [
      { to: "/organisasi", label: "Organisasi", desc: "Struktur dan kepengurusan" },
      { to: "/ad-art", label: "AD/ART", desc: "Anggaran Dasar & Rumah Tangga" },
    ],
  },
  { to: "/directory", label: "Alumni Kami" },
  {
    label: "Program",
    items: [
      { to: "/events", label: "Event & Agenda", desc: "Kalender kegiatan alumni" },
      { to: "/karir", label: "Karir", desc: "Lowongan dari jejaring alumni" },
      { to: "/cpns", label: "KOMpas ASN", desc: "Belajar & tryout CPNS", startsWith: true },
      { to: "/ttd", label: "TTD Online", desc: "Tanda tangan dokumen PDF", startsWith: true },
    ],
  },
  { to: "/setelah-toga", label: "Setelah Toga", startsWith: true },
];
const CTA = { to: "/register", label: "Daftar" };

const cocok = (pathname, { to, startsWith: sw }) => (sw ? pathname.startsWith(to) : pathname === to);
const grupAktif = (pathname, m) => (m.items ? m.items.some((i) => cocok(pathname, i)) : cocok(pathname, m));

const TEKS = "text-ika-ink";
const REDUP = "text-ika-muted hover:text-ika-ink";

function Logo() {
  return (
    <Link to="/" aria-label="IKOM UPI Alumni Association, ke beranda" className="flex min-w-0 shrink items-center gap-2.5 sm:gap-3">
      <picture className="logo-warna shrink-0">
        <source type="image/webp" srcSet="/img/logo-ikom.webp" />
        <img src="/img/logo-ikom.png" alt="" width="65" height="40" className="h-8 w-auto sm:h-10" />
      </picture>
      <img
        src="/img/logo-ikom-putih-240.png"
        srcSet="/img/logo-ikom-putih-240.png 1x, /img/logo-ikom-putih-480.png 2x"
        alt=""
        width="65"
        height="40"
        className="logo-putih h-8 w-auto shrink-0 sm:h-10"
      />
      <span className="h-9 w-px shrink-0 bg-ika-emas sm:h-10" aria-hidden="true" />
      <span className={`flex min-w-0 flex-col text-[11.5px] font-light leading-[1.15] tracking-[0.01em] ${TEKS} sm:text-[13.5px]`}>
        <span>Communication</span>
        <span>Alumni Association</span>
        <span className="truncate">Universitas Pendidikan Indonesia</span>
      </span>
    </Link>
  );
}

function Dropdown({ m, pathname }) {
  const [buka, setBuka] = useState(false);
  const ref = useRef(null);
  const on = grupAktif(pathname, m);

  useEffect(() => setBuka(false), [pathname]);
  useEffect(() => {
    if (!buka) return;
    const luar = (e) => !ref.current?.contains(e.target) && setBuka(false);
    const esc = (e) => e.key === "Escape" && setBuka(false);
    document.addEventListener("pointerdown", luar);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", luar);
      document.removeEventListener("keydown", esc);
    };
  }, [buka]);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setBuka(true)} onMouseLeave={() => setBuka(false)}>
      <button
        type="button"
        aria-expanded={buka}
        aria-haspopup="true"
        onClick={() => setBuka((v) => !v)}
        className={`flex items-center gap-1.5 px-3.5 py-2 text-[15px] transition-colors ${on ? `font-semibold ${TEKS}` : REDUP}`}
      >
        {m.label}
        <ChevronDown className={`h-4 w-4 stroke-[1.5] transition-transform ${buka ? "rotate-180" : ""}`} />
      </button>
      {buka && (
        <div className="absolute left-1/2 top-full z-10 w-72 -translate-x-1/2 pt-2">
          <div className="overflow-hidden rounded-lg border border-ika-line bg-ika-bg py-2 shadow-[0_12px_32px_-8px_rgba(28,25,23,0.25)]">
            {m.items.map((i) => {
              const ia = cocok(pathname, i);
              return (
                <Link
                  key={i.to}
                  to={i.to}
                  aria-current={ia ? "page" : undefined}
                  className={`block border-l-2 px-4 py-2.5 transition-colors hover:bg-ika-surface ${ia ? "border-ika-emas bg-ika-surface" : "border-transparent"}`}
                >
                  <span className={`block text-sm ${ia ? "font-semibold" : "font-medium"} ${TEKS}`}>{i.label}</span>
                  <span className="block text-xs text-ika-muted">{i.desc}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <nav
      data-theme={HALAMAN_GELAP.some((h) => pathname.startsWith(h)) ? "dark" : undefined}
      className="fixed top-0 z-50 w-full border-b border-ika-line bg-ika-bg shadow-[0_6px_18px_-12px_rgba(28,25,23,0.35)]"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Logo />

        {/* Desktop */}
        <div className="hidden items-center lg:flex">
          {menu.map((m) =>
            m.items ? (
              <Dropdown key={m.label} m={m} pathname={pathname} />
            ) : (
              <Link
                key={m.to}
                to={m.to}
                aria-current={cocok(pathname, m) ? "page" : undefined}
                className={`px-3.5 py-2 text-[15px] transition-colors ${cocok(pathname, m) ? `font-semibold ${TEKS}` : REDUP}`}
              >
                {m.label}
              </Link>
            )
          )}
          <span className="mx-2 h-6 w-px bg-ika-line" aria-hidden="true" />
          <TemaToggle terang />
          <Link
            to={CTA.to}
            className="ml-2 rounded-md bg-ika-merah px-4 py-2 text-sm font-semibold text-[#fff] transition hover:brightness-110"
          >
            {CTA.label}
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex shrink-0 items-center lg:hidden">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md text-ika-muted hover:bg-ika-surface hover:text-ika-ink"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-ika-line bg-ika-bg px-4 pb-5 pt-2 lg:hidden">
          {menu.map((m) =>
            m.items ? (
              <div key={m.label} className="py-2">
                <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ika-emas">{m.label}</p>
                {m.items.map((i) => (
                  <Link
                    key={i.to}
                    to={i.to}
                    aria-current={cocok(pathname, i) ? "page" : undefined}
                    className={`block rounded-md px-3 py-2.5 text-[15px] ${cocok(pathname, i) ? `bg-ika-surface font-semibold ${TEKS}` : "text-ika-muted"}`}
                  >
                    {i.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={m.to}
                to={m.to}
                aria-current={cocok(pathname, m) ? "page" : undefined}
                className={`block rounded-md px-3 py-3 text-[15px] ${cocok(pathname, m) ? `bg-ika-surface font-semibold ${TEKS}` : "text-ika-muted"}`}
              >
                {m.label}
              </Link>
            )
          )}
          <div className="mt-2 flex items-center justify-between border-t border-ika-line px-3 pt-3">
            <span className="text-sm text-ika-muted">Tema tampilan</span>
            <TemaToggle terang />
          </div>
          <Link
            to={CTA.to}
            className="mt-3 block rounded-md bg-ika-merah px-4 py-3 text-center text-sm font-semibold text-[#fff] hover:brightness-110"
          >
            {CTA.label} ke jejaring alumni
          </Link>
        </div>
      )}
    </nav>
  );
}
