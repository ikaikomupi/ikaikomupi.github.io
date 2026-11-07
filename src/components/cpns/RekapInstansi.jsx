import { useEffect, useMemo, useState } from "react";
import { Trophy } from "lucide-react";
import { Section, Badge, Pilih } from "./ui";

const pct = (a, b) => (b ? (a / b) * 100 : 0);
const fmtPct = (v) => `${v.toLocaleString("id-ID", { maximumFractionDigits: 0 })}%`;

export default function RekapInstansi() {
  const [d, setD] = useState(null);
  const [urut, setUrut] = useState("lulus");
  useEffect(() => {
    let alive = true;
    fetch("/data/cpns/rekap-instansi-2024.json")
      .then((r) => r.json())
      .then((x) => alive && setD(x))
      .catch(() => alive && setD(false));
    return () => {
      alive = false;
    };
  }, []);

  const rows = useMemo(() => {
    if (!d) return [];
    return d.instansi
      .map((x) => ({ ...x, pLulus: pct(x.lulus, x.peserta), pGugur: pct(x.gugur_lainnya, x.peserta) }))
      .sort((a, b) =>
        urut === "lulus" ? b.pLulus - a.pLulus
        : urut === "min" ? a.nilai_akhir_min_lulus - b.nilai_akhir_min_lulus
        : urut === "skd" ? a.skd_rata - b.skd_rata
        : urut === "gugur" ? b.pGugur - a.pGugur
        : b.peserta - a.peserta
      );
  }, [d, urut]);

  if (d === false) return null;
  if (!d) return null;

  const total = d.instansi.reduce((s, x) => ({ peserta: s.peserta + x.peserta, lulus: s.lulus + x.lulus }), { peserta: 0, lulus: 0 });
  const maxLulus = Math.max(...rows.map((r) => r.pLulus));
  const gugurTinggi = rows.filter((r) => r.pGugur >= 20).sort((a, b) => b.pGugur - a.pGugur);

  return (
    <Section
      icon={Trophy}
      title={`Hasil akhir CPNS ${d.tahun} per kementerian/lembaga`}
      desc={`${d.instansi.length} K/L, ${total.peserta.toLocaleString("id-ID")} peserta SKB. Rata-rata ${fmtPct(pct(total.lulus, total.peserta))} lulus. ${d.cakupan}`}
      foot={`Sumber: ${d.sumber}. ${d.keterangan}`}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <Badge asli />
        <div className="w-full sm:w-64">
          <Pilih
            label="Urutkan"
            value={urut}
            onChange={setUrut}
            options={[
              { value: "lulus", label: "Urut: tingkat lulus tertinggi" },
              { value: "min", label: "Urut: nilai akhir min. terendah" },
              { value: "skd", label: "Urut: rata-rata SKD terendah" },
              { value: "gugur", label: "Urut: paling banyak gugur di SKB" },
              { value: "peserta", label: "Urut: peserta terbanyak" },
            ]}
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/8">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-stone-900 text-xs text-stone-500">
            <tr>
              <th className="px-4 py-3 font-medium">Instansi</th>
              <th className="px-4 py-3 text-right font-medium">Peserta</th>
              <th className="px-4 py-3 font-medium">Tingkat lulus</th>
              <th className="px-4 py-3 text-right font-medium">Gugur syarat SKB</th>
              <th className="px-4 py-3 text-right font-medium">Rata-rata SKD</th>
              <th className="px-4 py-3 text-right font-medium">Nilai akhir min. lulus</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((r) => (
              <tr key={r.instansi} className="hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <p className="font-medium text-stone-200">{r.singkat}</p>
                  <p className="text-xs text-stone-500">{r.instansi}</p>
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-stone-300">{r.peserta.toLocaleString("id-ID")}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 rounded-full bg-stone-800">
                      <div className="h-2 rounded-full bg-amber-500" style={{ width: `${(r.pLulus / maxLulus) * 100}%` }} />
                    </div>
                    <span className="tabular-nums text-stone-200">{fmtPct(r.pLulus)}</span>
                  </div>
                </td>
                <td className={`px-4 py-3 text-right tabular-nums ${r.pGugur >= 20 ? "text-rose-400" : "text-stone-400"}`}>{fmtPct(r.pGugur)}</td>
                <td className="px-4 py-3 text-right tabular-nums text-stone-300">{r.skd_rata.toLocaleString("id-ID")}</td>
                <td className="px-4 py-3 text-right tabular-nums text-stone-300">{r.nilai_akhir_min_lulus.toLocaleString("id-ID")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {gugurTinggi.length > 0 && (
        <p className="mt-3 text-sm text-stone-400">
          <strong className="text-stone-200">Perhatikan:</strong>{" "}
          {gugurTinggi.map((r) => `${r.singkat} (${fmtPct(r.pGugur)})`).join(", ")} punya banyak peserta yang gugur karena tidak memenuhi syarat tahapan SKB
          atau mengundurkan diri, bukan karena kalah peringkat. Cek tes tambahan instansi ini, misalnya psikotes, sebelum mendaftar.
        </p>
      )}
    </Section>
  );
}
