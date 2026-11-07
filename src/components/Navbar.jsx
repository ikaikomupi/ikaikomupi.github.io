import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import TemaToggle from "./TemaToggle";

const links = [
  { to: "/", label: "Beranda" },
  { to: "/directory", label: "Direktori" },
  // { to: "/organisasi", label: "Organisasi" },
  // { to: "/calon-ketua", label: "Calon Ketua" },
  { to: "/events", label: "Event" },
  { to: "/setelah-toga", label: "Setelah Toga", startsWith: true },
  { to: "/karir", label: "Karir" },
  { to: "/cpns", label: "KOMpas ASN", startsWith: true },
];
const CTA = { to: "/register", label: "Daftar" };
const aktif = (pathname, { to, startsWith: sw }) => (sw ? pathname.startsWith(to) : pathname === to);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/8 bg-stone-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3.5">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff] p-1 ring-1 ring-white/10">
            <img src="/logo-upi.png" alt="IKA IKOM UPI" className="h-full w-auto" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-bold tracking-widest text-stone-200">IKA ILMU KOMUNIKASI</span>
            <span className="text-[10px] font-semibold tracking-widest text-amber-400">UNIVERSITAS PENDIDIKAN INDONESIA</span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center lg:flex">
          {links.map((l) => {
            const on = aktif(pathname, l);
            return (
              <Link
                key={l.to}
                to={l.to}
                aria-current={on ? "page" : undefined}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  on ? "text-stone-100" : "text-stone-400 hover:text-stone-100"
                }`}
              >
                {l.label}
                <span
                  className={`absolute inset-x-3 -bottom-[15px] h-0.5 rounded-full bg-amber-500 transition-opacity ${on ? "opacity-100" : "opacity-0"}`}
                />
              </Link>
            );
          })}
          <span className="mx-3 h-5 w-px bg-white/10" aria-hidden="true" />
          <TemaToggle />
          <Link
            to={CTA.to}
            className={`ml-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              aktif(pathname, CTA) ? "bg-amber-400 text-ink" : "bg-amber-500 text-ink hover:bg-amber-400"
            }`}
          >
            {CTA.label}
          </Link>
        </div>

        {/* Mobile: tema + hamburger */}
        <div className="flex items-center gap-1 lg:hidden">
        <TemaToggle />
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-400 hover:bg-white/5 hover:text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-white/8 bg-stone-950 px-6 pb-5 pt-2 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              aria-current={aktif(pathname, l) ? "page" : undefined}
              className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                aktif(pathname, l) ? "bg-amber-500/10 text-amber-400" : "text-stone-400 hover:text-stone-100"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to={CTA.to}
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-lg bg-amber-500 px-4 py-3 text-center text-sm font-semibold text-ink hover:bg-amber-400"
          >
            {CTA.label} ke jejaring alumni
          </Link>
        </div>
      )}
    </nav>
  );
}
