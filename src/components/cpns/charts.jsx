import { useState } from "react";
import { PROVINSI, PETA_W, PETA_H } from "../../data/petaProvinsi";

export function Peta({ data, pilih, onPilih }) {
  const [hover, setHover] = useState(null);
  const max = Math.max(1, ...Object.values(data));
  const warna = (v) => (v ? `rgba(245,158,11,${(0.22 + Math.sqrt(v / max) * 0.78).toFixed(2)})` : "var(--color-stone-700)");
  return (
    <div>
      <svg viewBox={`0 0 ${PETA_W} ${PETA_H}`} className="w-full" role="img" aria-label="Peta sebaran kursi per provinsi">
        {PROVINSI.map((p) => {
          const bisa = Boolean(onPilih && data[p.nama]);
          const dipilih = pilih === p.nama;
          return (
            <path
              key={p.nama}
              d={p.d}
              style={{ fill: warna(data[p.nama]), stroke: dipilih ? "#f59e0b" : "var(--color-stone-950)" }}
              strokeWidth={dipilih ? 2.5 : 0.8}
              onMouseEnter={() => setHover(p.nama)}
              onMouseLeave={() => setHover(null)}
              onClick={bisa ? () => onPilih(p.nama) : undefined}
              onKeyDown={bisa ? (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onPilih(p.nama)) : undefined}
              role={bisa ? "button" : undefined}
              tabIndex={bisa ? 0 : undefined}
              aria-label={bisa ? `${p.nama}, ${data[p.nama]} kursi. ${dipilih ? "Batalkan pilihan" : "Lihat formasi"}` : undefined}
              aria-pressed={bisa ? dipilih : undefined}
              className={`transition-opacity focus:outline-none ${bisa ? "cursor-pointer hover:opacity-80 focus-visible:opacity-70" : ""}`}
            >
              <title>{`${p.nama}: ${data[p.nama] || 0} kursi`}</title>
            </path>
          );
        })}
        {PROVINSI.filter((p) => data[p.nama]).map((p) => {
          const jkt = p.nama === "DKI Jakarta";
          const ly = jkt ? p.cy - 34 : p.cy;
          const gelap = Math.sqrt(data[p.nama] / max) > 0.55 && !jkt;
          return (
            <g key={p.nama} pointerEvents="none">
              {jkt && <line x1={p.cx} y1={p.cy} x2={p.cx} y2={ly + 6} stroke="#a8a29e" strokeWidth="1" />}
              <text x={p.cx} y={ly} textAnchor="middle" fontSize="15" fontWeight="700" fill={gelap ? "#1c1917" : "#fafaf9"} stroke={gelap ? "none" : "#0c0a09"} strokeWidth="3" paintOrder="stroke">
                {data[p.nama]}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 h-5 text-center text-sm text-stone-400">
        {hover
          ? `${hover}: ${data[hover] || 0} kursi${onPilih && data[hover] ? " · klik untuk lihat formasinya" : ""}`
          : pilih
          ? `Menampilkan formasi di ${pilih}. Klik provinsi yang sama untuk membatalkan.`
          : onPilih
          ? "Klik provinsi untuk lihat daftar formasinya"
          : "Arahkan kursor ke provinsi buat lihat detail"}
      </p>
    </div>
  );
}

export function Batang({ rows, satuan = "kursi" }) {
  const max = Math.max(1, ...rows.map((r) => r.nilai));
  return (
    <div className="space-y-2">
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto] items-center gap-3 text-sm">
          <span className="truncate text-stone-300" title={r.label}>{r.label}</span>
          <div className="h-2.5 rounded-full bg-stone-800">
            <div className="h-2.5 rounded-full bg-amber-500" style={{ width: `${(r.nilai / max) * 100}%` }} />
          </div>
          <span className="whitespace-nowrap text-right text-xs tabular-nums text-stone-400">
            <span className="text-sm text-stone-200">{r.nilai}</span> {satuan}
            {r.sub && <span className="block text-[11px] text-stone-600">{r.sub}</span>}
          </span>
        </div>
      ))}
    </div>
  );
}

export function Scatter({ data }) {
  const W = 640, H = 300, P = { l: 40, r: 12, t: 12, b: 34 };
  const lo = Math.floor(Math.min(...data.map((d) => d.skd)) / 20) * 20;
  const hi = Math.ceil(Math.max(...data.map((d) => d.skd)) / 20) * 20;
  const x = (v) => P.l + ((v - lo) / (hi - lo || 1)) * (W - P.l - P.r);
  const ticks = Array.from({ length: Math.floor((hi - lo) / 40) + 1 }, (_, i) => lo + i * 40);
  const y = (v) => H - P.b - (v / 100) * (H - P.t - P.b);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Sebaran nilai SKD dan SKB peserta">
      {[0, 25, 50, 75, 100].map((t) => (
        <g key={t}>
          <line x1={P.l} x2={W - P.r} y1={y(t)} y2={y(t)} style={{ stroke: "var(--color-white)" }} strokeOpacity="0.08" />
          <text x={P.l - 6} y={y(t) + 4} textAnchor="end" fontSize="10" fill="#78716c">{t}</text>
        </g>
      ))}
      {ticks.map((t) => (
        <text key={t} x={x(t)} y={H - P.b + 16} textAnchor="middle" fontSize="10" fill="#78716c">{t}</text>
      ))}
      <text x={(W + P.l) / 2} y={H - 4} textAnchor="middle" fontSize="10" fill="#a8a29e">Nilai SKD (maks 550)</text>
      {data.map((d, i) =>
        d.lolos ? (
          <circle key={i} cx={x(d.skd)} cy={y(d.skb)} r="3" fill="#f59e0b" fillOpacity="0.75" />
        ) : (
          <circle key={i} cx={x(d.skd)} cy={y(d.skb)} r="2.6" fill="none" stroke="#78716c" strokeWidth="1" strokeOpacity="0.7" />
        )
      )}
    </svg>
  );
}

// Data contoh scatter SKD vs SKB (generator deterministik).
export const PESERTA_CONTOH = (() => {
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: 140 }, () => {
    const skd = Math.round(325 + rnd() * 125);
    const skb = Math.round(Math.min(85, Math.max(8, 45 + (skd - 325) * 0.12 + (rnd() - 0.5) * 34)));
    return { skd, skb, lolos: (skd / 550) * 100 * 0.4 + skb * 0.6 >= 67 };
  });
})();
