import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/directory", label: "Direktori" },
  // { to: "/organisasi", label: "Organisasi" },
  // { to: "/calon-ketua", label: "Calon Ketua" },
  { to: "/events", label: "Event" },
  { to: "/setelah-toga", label: "Setelah Toga", startsWith: true },
  { to: "/karir", label: "Karir" },
  { to: "/register", label: "Daftar" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/8 bg-stone-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src="/logo-upi.png"
            alt="IKA IKOM UPI 2018"
            className="h-9 w-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-bold tracking-widest text-stone-200">IKA IKOM UPI</span>
            <span className="text-xs font-medium tracking-widest text-amber-500">2018</span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 sm:flex">
          {links.map(({ to, label, startsWith: sw }) => (
            <Link
              key={to}
              to={to}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                (sw ? pathname.startsWith(to) : pathname === to)
                  ? "bg-amber-500/15 text-amber-400"
                  : "text-stone-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-400 hover:bg-white/5 hover:text-white sm:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-white/8 bg-stone-950 px-6 pb-4 sm:hidden">
          {links.map(({ to, label, startsWith: sw }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                (sw ? pathname.startsWith(to) : pathname === to)
                  ? "text-amber-400"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
