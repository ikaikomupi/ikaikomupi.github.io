import { useMemo, useState } from "react";
import { Crosshair } from "lucide-react";
import { useJson } from "../../lib/cpns";
import { Section, Badge, Pilih } from "./ui";

const LABEL_WILAYAH = { "Pusat (Jakarta)": "Pusat Jakarta", "Daerah - Jawa": "Daerah di Jawa", "Daerah - Luar Jawa": "Luar Jawa", Nasional: "Nasional" };

export default function TargetSkd({ kategori }) {
  const { data } = useJson("/data/cpns/target-2024.json");
  const [urut, setUrut] = useState("kursi");
  const kat = kategori === "Semua" ? "Primer" : kategori;

  const kl = useMemo(
    () =>
      (data?.per_kl || [])
        .filter((r) => r.kategori === kat)
        .sort((a, b) =>
          urut === "kursi" ? b.kursi - a.kursi : urut === "target" ? a.skd_rata_pemenang - b.skd_rata_pemenang : b.pct_kosong - a.pct_kosong
        ),
    [data, kat, urut]
  );
  const wilayah = (data?.per_wilayah || []).filter((r) => r.kategori === kat && r.nama !== "Nasional");

  if (!data || !kl.length) return null;

  return (
    <Section
      icon={Crosshair}
      title={`Target SKD per instansi · ${kat === "S-2 ke atas" ? "Akademik (S-2 ke atas)" : kat}`}
      desc="Batas minimum = SKD terendah yang pernah menang. Target aman = rata-rata SKD pemenang. Seleksi 2024."
      foot={`Sumber: ${data.sumber}.${kategori === "Semua" ? " Pilih kategori di atas untuk melihat target kategori lain." : ""}`}
    >
      {wilayah.length > 0 && (
        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          {wilayah.map((w) => (
            <div key={w.nama} className="rounded-2xl border border-white/8 bg-stone-900 p-4">
              <p className="text-xs text-stone-500">{LABEL_WILAYAH[w.nama] || w.nama}</p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-amber-400">{w.skd_rata_pemenang}</p>
              <p className="text-xs text-stone-500">target aman · minimum {w.skd_min_pemenang} · {w.pct_kosong}% kursi kosong</p>
            </div>
          ))}
        </div>
      )}

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <Badge asli />
        <div className="w-full sm:w-64">
          <Pilih
            label="Urutkan"
            value={urut}
            onChange={setUrut}
            options={[
              { value: "kursi", label: "Urut: kursi terbanyak" },
              { value: "target", label: "Urut: target SKD terendah" },
              { value: "kosong", label: "Urut: paling banyak kosong" },
            ]}
          />
        </div>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-white/8">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-stone-900 text-xs text-stone-500">
            <tr>
              <th className="px-4 py-3 font-medium">Instansi</th>
              <th className="px-4 py-3 text-right font-medium">Kursi</th>
              <th className="px-4 py-3 text-right font-medium">Kosong</th>
              <th className="px-4 py-3 text-right font-medium">Gugur di SKB</th>
              <th className="px-4 py-3 text-right font-medium">Batas minimum</th>
              <th className="px-4 py-3 text-right font-medium">Target aman</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {kl.map((r) => (
              <tr key={r.nama} className="hover:bg-white/[0.02]">
                <td className="px-4 py-3 font-medium text-stone-200">{r.nama}</td>
                <td className="px-4 py-3 text-right tabular-nums text-stone-300">{r.kursi}</td>
                <td className={`px-4 py-3 text-right tabular-nums ${r.pct_kosong >= 20 ? "text-emerald-400" : "text-stone-400"}`}>{r.pct_kosong}%</td>
                <td className={`px-4 py-3 text-right tabular-nums ${r.pct_gugur >= 20 ? "text-rose-400" : "text-stone-400"}`}>{r.pct_gugur}%</td>
                <td className="px-4 py-3 text-right tabular-nums text-stone-300">{r.skd_min_pemenang}</td>
                <td className="px-4 py-3 text-right font-semibold tabular-nums text-stone-100">{r.skd_rata_pemenang}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-stone-500">Instansi dengan 1–3 kursi punya angka yang sangat dipengaruhi satu-dua orang. Baca bersama jumlah kursinya.</p>
    </Section>
  );
}
