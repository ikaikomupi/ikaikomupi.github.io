import { useState } from "react";
import { Sun, Moon } from "lucide-react";

const sekarang = () => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

export default function TemaToggle({ className = "" }) {
  const [tema, setTema] = useState(sekarang);
  const ganti = () => {
    const baru = tema === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = baru;
    try {
      localStorage.setItem("tema", baru);
    } catch {
      /* penyimpanan diblokir: tema tetap berlaku sampai halaman ditutup */
    }
    setTema(baru);
  };
  const keGelap = tema === "light";
  return (
    <button
      type="button"
      onClick={ganti}
      aria-label={keGelap ? "Ganti ke mode gelap" : "Ganti ke mode terang"}
      title={keGelap ? "Mode gelap" : "Mode terang"}
      className={`flex h-9 w-9 items-center justify-center rounded-lg text-stone-400 transition-colors hover:bg-white/5 hover:text-stone-100 ${className}`}
    >
      {keGelap ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </button>
  );
}
