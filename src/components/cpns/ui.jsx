import { NavLink } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export const TABS = [
  { to: "/cpns", label: "Ringkasan", end: true },
  { to: "/cpns/rekomendasi", label: "Rekomendasi" },
  { to: "/cpns/belajar", label: "Belajar" },
  { to: "/cpns/lapor", label: "Lapor Hasil" },
  { to: "/cpns/skb", label: "Persiapan SKB" },
  { to: "/cpns/gaji", label: "Gaji & Tukin" },
  { to: "/cpns/metodologi", label: "Metodologi" },
];

export function CpnsHeader({ diperbarui }) {
  return (
    <>
      <div className="relative overflow-hidden border-b border-white/8 px-6 pb-8 pt-14 text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />
        <div className="relative mx-auto max-w-2xl">
          <span className="mb-4 inline-block rounded-full bg-amber-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400">
            IKA IKOM UPI
          </span>
          <h1 className="mb-4 text-4xl font-bold text-stone-100">
            <span className="text-amber-400">KOM</span>pas ASN
          </h1>
          <p className="text-base leading-relaxed text-stone-400">
            Penunjuk arah alumni S-1 Ilmu Komunikasi UPI milih formasi CPNS pakai data: kuota,
            persaingan, dan skor yang biasanya lolos ke SKB.
          </p>
          {diperbarui && <p className="mt-4 text-xs text-stone-600">Data diperbarui {diperbarui}</p>}
        </div>
      </div>
      <nav className="sticky top-16 z-40 border-b border-white/8 bg-stone-950/90 backdrop-blur-md" aria-label="Menu KOMpas ASN">
        <div className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 sm:px-6">
          {TABS.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              className={({ isActive }) =>
                `shrink-0 border-b-2 px-3 py-3 text-sm font-medium transition-colors ${
                  isActive ? "border-amber-500 text-amber-400" : "border-transparent text-stone-400 hover:text-stone-100"
                }`
              }
            >
              {t.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}

export function Section({ icon: Icon, title, desc, children, foot }) {
  return (
    <section className="mb-14">
      <div className="mb-5 flex items-start gap-3">
        {Icon && (
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold text-stone-100">{title}</h2>
          {desc && <p className="mt-1 text-sm text-stone-500">{desc}</p>}
        </div>
      </div>
      {children}
      {foot && <p className="mt-3 text-xs text-stone-600">{foot}</p>}
    </section>
  );
}

export function Badge({ asli }) {
  return asli ? (
    <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-400 ring-1 ring-emerald-500/20">Data asli</span>
  ) : (
    <span className="rounded bg-stone-800 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-stone-500 ring-1 ring-white/8">Contoh</span>
  );
}

export function Pill({ cls, children }) {
  return <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${cls}`}>{children}</span>;
}

export function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-stone-900 p-5">
      <p className="text-xs text-stone-500">{label}</p>
      <p className="mt-1 text-2xl font-bold tabular-nums text-stone-100">{value}</p>
    </div>
  );
}

export function Pilih({ value, onChange, options, label }) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-white/10 bg-stone-900 px-3 py-2 text-sm text-stone-300 focus:border-amber-500/50 focus:outline-none"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

export function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="mb-1 flex justify-between gap-2 text-xs text-stone-400">
        <span>{label}</span>
        {hint && <span className="text-stone-600">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

export const inputCls =
  "w-full rounded-lg border border-white/10 bg-stone-950 px-3 py-2 text-sm text-stone-100 placeholder:text-stone-600 focus:border-amber-500/50 focus:outline-none";

export function Peringatan({ children }) {
  return (
    <div className="mb-10 flex items-start gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/5 p-4 text-sm text-amber-200/90">
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
      <div>{children}</div>
    </div>
  );
}

export function Memuat({ error }) {
  return <p className="py-20 text-center text-sm text-stone-500">{error || "Memuat data…"}</p>;
}

export function PilihKategori({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Kategori jabatan">
      {[{ id: "Semua", label: "Semua kategori" }, ...KATEGORI_UI].map((k) => (
        <button
          key={k.id}
          type="button"
          onClick={() => onChange(k.id)}
          title={k.desc}
          className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
            value === k.id ? "bg-amber-500 text-ink" : "bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-white"
          }`}
        >
          {k.label}
        </button>
      ))}
    </div>
  );
}

const KATEGORI_UI = [
  { id: "Primer", label: "Primer · humas", desc: "Jabatan humas" },
  { id: "Sekunder", label: "Sekunder · campuran", desc: "Protokol, fasilitator, formasi semua jurusan" },
  { id: "S-2 ke atas", label: "S-2 ke atas", desc: "Dosen, widyaiswara, peneliti" },
];
