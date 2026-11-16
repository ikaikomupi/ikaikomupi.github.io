import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import TemaToggle from "./TemaToggle";

// Navbar gaya Chevening: latar putih di dua tema, logo + garis emas + nama 3 baris,
// menu dikelompokkan dengan dropdown, menu aktif ditandai huruf tebal.
// Warna ditulis hex (bukan stone-*/white) karena mode terang membalik skala stone.
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

const TEKS = "text-[#1f1d1a]";
const REDUP = "text-[#4a4540] hover:text-[#1f1d1a]";

function Logo() {
  return (
    <Link to="/" aria-label="IKA IKOM UPI, ke beranda" className="flex shrink-0 items-center gap-3">
      <img src="/logo-upi.png" alt="" width="40" height="40" className="h-10 w-10 object-contain" />
      <span className="h-10 w-px bg-[#b8913a]" aria-hidden="true" />
      <span className={`flex flex-col text-[12.5px] font-light leading-[1.15] tracking-[0.01em] ${TEKS} sm:text-[13.5px]`}>
        <span>IKA Ilmu Komunikasi</span>
        <span>Universitas Pendidikan</span>
        <span>Indonesia</span>
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
          <div className="overflow-hidden rounded-lg border border-[#e7e2d9] bg-[#fff] py-2 shadow-[0_12px_32px_-8px_rgba(28,25,23,0.25)]">
            {m.items.map((i) => {
              const ia = cocok(pathname, i);
              return (
                <Link
                  key={i.to}
                  to={i.to}
                  aria-current={ia ? "page" : undefined}
                  className={`block border-l-2 px-4 py-2.5 transition-colors hover:bg-[#f7f4ee] ${ia ? "border-[#b8913a] bg-[#faf7f1]" : "border-transparent"}`}
                >
                  <span className={`block text-sm ${ia ? "font-semibold" : "font-medium"} ${TEKS}`}>{i.label}</span>
                  <span className="block text-xs text-[#7a736b]">{i.desc}</span>
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
    <nav className="fixed top-0 z-50 w-full border-b border-[#ece7de] bg-[#fff] shadow-[0_6px_18px_-12px_rgba(28,25,23,0.35)]">
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
          <span className="mx-2 h-6 w-px bg-[#e7e2d9]" aria-hidden="true" />
          <TemaToggle terang />
          <Link
            to={CTA.to}
            className="ml-2 rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-amber-400"
          >
            {CTA.label}
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-1 lg:hidden">
          <TemaToggle terang />
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md text-[#4a4540] hover:bg-[#f3efe8] hover:text-[#1f1d1a]"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-[#ece7de] bg-[#fff] px-4 pb-5 pt-2 lg:hidden">
          {menu.map((m) =>
            m.items ? (
              <div key={m.label} className="py-2">
                <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b8913a]">{m.label}</p>
                {m.items.map((i) => (
                  <Link
                    key={i.to}
                    to={i.to}
                    aria-current={cocok(pathname, i) ? "page" : undefined}
                    className={`block rounded-md px-3 py-2.5 text-[15px] ${cocok(pathname, i) ? `bg-[#faf7f1] font-semibold ${TEKS}` : "text-[#4a4540]"}`}
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
                className={`block rounded-md px-3 py-3 text-[15px] ${cocok(pathname, m) ? `bg-[#faf7f1] font-semibold ${TEKS}` : "text-[#4a4540]"}`}
              >
                {m.label}
              </Link>
            )
          )}
          <Link
            to={CTA.to}
            className="mt-3 block rounded-md bg-amber-500 px-4 py-3 text-center text-sm font-semibold text-ink hover:bg-amber-400"
          >
            {CTA.label} ke jejaring alumni
          </Link>
        </div>
      )}
    </nav>
  );
}
