import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-stone-950 px-6 pt-16 text-center">
      <Compass className="h-12 w-12 text-stone-600" />
      <h1 className="text-2xl font-bold text-stone-100">Halaman nggak ketemu</h1>
      <p className="max-w-sm text-sm text-stone-400">Alamatnya mungkin salah ketik, atau halamannya sudah dipindah.</p>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        <Link to="/" className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-ink hover:bg-amber-400">Ke beranda</Link>
        <Link to="/directory" className="rounded-lg bg-stone-800 px-4 py-2 text-sm text-stone-300 hover:bg-stone-700">Direktori alumni</Link>
      </div>
    </div>
  );
}
