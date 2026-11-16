import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

// Footer situs (gelap di dua tema) dengan logo putih dan pita warna logo IKOM.
export default function Footer() {
  return (
  <footer className="bg-[#110f0d] px-4 pb-10 pt-14 text-[#d9d4cc] sm:px-6">
    <div className="mx-auto max-w-6xl">
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <img
            src="/img/logo-ikom-putih-240.png"
            srcSet="/img/logo-ikom-putih-240.png 1x, /img/logo-ikom-putih-480.png 2x"
            alt="Alumni IKOM Universitas Pendidikan Indonesia"
            width="140"
            height="86"
            loading="lazy"
            className="h-auto w-32"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#a39c92]">
            Ikatan Keluarga Alumni Ilmu Komunikasi Universitas Pendidikan Indonesia. Berkedudukan di Kota Bandung.
          </p>
        </div>
        <nav aria-label="Tentang kami">
          <p className="text-sm font-semibold text-[#fff]">Tentang kami</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/tentang" className="hover:text-[#fff]">Tentang IKA IKOM UPI</Link></li>
            <li><Link to="/organisasi" className="hover:text-[#fff]">Susunan pengurus</Link></li>
            <li><Link to="/ad-art" className="hover:text-[#fff]">AD/ART</Link></li>
            <li><Link to="/directory" className="hover:text-[#fff]">Direktori alumni</Link></li>
          </ul>
        </nav>
        <nav aria-label="Program">
          <p className="text-sm font-semibold text-[#fff]">Program</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/events" className="hover:text-[#fff]">Event & agenda</Link></li>
            <li><Link to="/karir" className="hover:text-[#fff]">Karir</Link></li>
            <li><Link to="/cpns" className="hover:text-[#fff]">KOMpas ASN</Link></li>
            <li><Link to="/setelah-toga" className="hover:text-[#fff]">Setelah Toga</Link></li>
          </ul>
        </nav>
      </div>
      <div className="mt-12 flex h-1.5" aria-hidden="true">
        <span className="flex-[5] bg-[#b5272d]" />
        <span className="flex-[1] bg-[#e0601f]" />
        <span className="flex-[5] bg-[#f0b90b]" />
      </div>
      <div className="mt-6 flex flex-col items-start justify-between gap-4 text-sm text-[#a39c92] sm:flex-row sm:items-center">
        <p>© 2026 IKA IKOM UPI</p>
        <a href="https://www.instagram.com/ikaikomupi/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#fff]">
          <Instagram className="h-4 w-4" /> @ikaikomupi
        </a>
      </div>
    </div>
  </footer>
  );
}
