import { Info } from "lucide-react";

// Penanda konten contoh, supaya pengunjung tidak mengira isinya data asli.
export default function ContohBanner({ children }) {
  return (
    <div className="mb-8 flex items-start gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/5 p-4 text-sm text-amber-200/90">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
      <p>{children}</p>
    </div>
  );
}
