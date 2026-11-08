import { useEffect, useMemo, useState } from "react";
import { Wallet, Landmark, Calculator, Search, Download, ExternalLink } from "lucide-react";
import { Section, Memuat, Peringatan } from "./ui";

const rupiah = (n) => "Rp" + Math.round(n).toLocaleString("id-ID");

const JENIS = ["Semua", "Kementerian", "Lembaga", "Setjen lembaga"];
const TABEL_LABEL = { BPK: "Tabel BPK", T5: "Tabel 5", T4: "Tabel 4", T3: "Tabel 3", T2: "Tabel 2" };

function Toggle({ options, value, onChange, label }) {
  return (
    <div className="inline-flex rounded-full bg-stone-800 p-1" role="group" aria-label={label}>
      {options.map(([key, text]) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
            value === key ? "bg-amber-500 text-ink" : "text-stone-400 hover:text-stone-100"
          }`}
        >
          {text}
        </button>
      ))}
    </div>
  );
}

function PeringkatTable({ title, note, rows, showJabatan }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/8 bg-stone-900">
      <div className="border-b border-white/8 px-5 py-4">
        <h3 className="text-sm font-semibold text-stone-100">{title}</h3>
        <p className="mt-1 text-xs text-stone-500">{note}</p>
      </div>
      <div className="max-h-96 overflow-y-auto">
        <table className="w-full text-left text-xs">
          <thead className="sticky top-0 bg-stone-900 text-stone-500">
            <tr>
              <th className="px-5 py-2 font-medium">Peringkat</th>
              {showJabatan && <th className="hidden px-2 py-2 font-medium sm:table-cell">Jabatan</th>}
              <th className="px-2 py-2 text-right font-medium">CPNS</th>
              <th className="px-5 py-2 text-right font-medium">PNS</th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {rows.map((r) => (
              <tr key={r.peringkat} className="border-t border-white/5">
                <td className="px-5 py-2 text-stone-300">{r.peringkat}</td>
                {showJabatan && <td className="hidden px-2 py-2 text-stone-500 sm:table-cell">{r.jabatan}</td>}
                <td className="px-2 py-2 text-right text-stone-300">{rupiah(r.cpns)}</td>
                <td className="px-5 py-2 text-right text-stone-100">{rupiah(r.pns)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Gaji() {
  const [d, setD] = useState(null);
  const [q, setQ] = useState("");
  const [jenis, setJenis] = useState("Semua");
  const [status, setStatus] = useState("cpns");
  const [jabatan, setJabatan] = useState("Pelaksana");

  useEffect(() => {
    let alive = true;
    fetch("/data/cpns/gaji-2026.json")
      .then((r) => r.json())
      .then((x) => alive && setD(x))
      .catch(() => alive && setD(false));
    return () => {
      alive = false;
    };
  }, []);

  const key = status + jabatan;

  const rows = useMemo(() => {
    if (!d) return [];
    const term = q.trim().toLowerCase();
    return d.instansi
      .filter((i) => (jenis === "Semua" || i.jenis === jenis) && (!term || i.nama.toLowerCase().includes(term)))
      .sort((a, b) => b[key] - a[key]);
  }, [d, q, jenis, key]);

  if (d === false) return <Memuat error="Data gaji gagal dimuat." />;
  if (!d) return <Memuat />;

  const max = Math.max(...d.instansi.map((i) => i[key]));

  return (
    <>
      <Peringatan>
        Ini estimasi penghasilan kotor per bulan, bukan angka resmi. Belum dipotong iuran pensiun dan BPJS, belum
        termasuk tunjangan keluarga, uang makan, THR, dan gaji ke-13.
      </Peringatan>

      <Section
        icon={Wallet}
        title="Estimasi penghasilan CPNS 2026 per K/L"
        desc={`Lulusan S-1 golongan III/a di ${d.instansi.length} kementerian dan lembaga pusat. Klik instansi untuk lihat keempat skenario.`}
      >
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Toggle label="Status" options={[["cpns", "CPNS"], ["pns", "PNS"]]} value={status} onChange={setStatus} />
          <Toggle
            label="Jabatan"
            options={[["Pelaksana", "Pelaksana S-1"], ["JF", "JF Ahli Pertama"]]}
            value={jabatan}
            onChange={setJabatan}
          />
          <a
            href="/data/cpns/estimasi-penghasilan-cpns-2026.xlsx"
            download
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-stone-300 hover:border-amber-500/40 hover:text-amber-400"
          >
            <Download className="h-3.5 w-3.5" /> Unduh Excel
          </a>
        </div>

        <div className="relative mb-3">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari instansi, mis. Komdigi, BPS, Kemenkes"
            aria-label="Cari instansi"
            className="w-full rounded-xl border border-white/8 bg-stone-900 py-3 pl-10 pr-4 text-sm text-stone-100 placeholder:text-stone-600 focus:border-amber-500/40 focus:outline-none"
          />
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {JENIS.map((j) => (
            <button
              key={j}
              type="button"
              onClick={() => setJenis(j)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                jenis === j ? "bg-stone-100 text-stone-950" : "bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-stone-100"
              }`}
            >
              {j}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/8 bg-stone-900">
          {rows.length === 0 ? (
            <p className="px-5 py-12 text-center text-sm text-stone-500">
              Instansi tidak ditemukan. Kemenkeu dan DJP ada di tabel terpisah di bawah.
            </p>
          ) : (
            rows.map((i) => (
              <details key={i.nama} className="border-b border-white/5 last:border-0">
                <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02]">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-stone-200">{i.nama}</p>
                    <div className="mt-1.5 h-1 rounded-full bg-stone-800">
                      <div className="h-1 rounded-full bg-amber-500/70" style={{ width: `${(i[key] / max) * 100}%` }} />
                    </div>
                  </div>
                  <span className="shrink-0 text-sm font-semibold tabular-nums text-stone-100">{rupiah(i[key])}</span>
                </summary>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 px-5 pb-4 text-xs tabular-nums sm:grid-cols-4">
                  {[
                    ["CPNS · Pelaksana", i.cpnsPelaksana],
                    ["CPNS · JF", i.cpnsJF],
                    ["PNS · Pelaksana", i.pnsPelaksana],
                    ["PNS · JF", i.pnsJF],
                  ].map(([l, v]) => (
                    <div key={l}>
                      <p className="text-stone-500">{l}</p>
                      <p className="text-stone-300">{rupiah(v)}</p>
                    </div>
                  ))}
                  <p className="col-span-2 text-stone-500 sm:col-span-4">
                    {i.jenis} · {TABEL_LABEL[i.tabel]} · {i.dasar}
                  </p>
                </div>
              </details>
            ))
          )}
        </div>
      </Section>

      <Section
        icon={Landmark}
        title="Kemenkeu & Ditjen Pajak"
        desc="Kemenkeu memakai 27 peringkat jabatan, bukan 17 kelas. Peringkat formasi CPNS ditetapkan Menteri Keuangan, jadi cek peringkat formasi yang kamu lamar."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <PeringkatTable title="Kemenkeu (selain DJP)" note="Perpres 156/2014 jo. 111/2017" rows={d.kemenkeu} />
          <PeringkatTable title="Ditjen Pajak" note="Perpres 37/2015" rows={d.djp} showJabatan />
        </div>
      </Section>

      <Section icon={Calculator} title="Cara hitungnya">
        <div className="space-y-3 rounded-2xl border border-white/8 bg-stone-900 p-5 text-sm leading-relaxed text-stone-400">
          <p className="rounded-lg bg-stone-950 px-4 py-3 font-mono text-xs text-stone-300">
            CPNS = gaji pokok × 80% + tunjangan umum + tunjangan pangan + tukin × 80%
            <br />
            PNS = gaji pokok + tunjangan umum + tunjangan pangan + tukin
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>Gaji pokok III/a masa kerja 0 tahun: Rp2.785.700 (PP 5/2024).</li>
            <li>Tunjangan umum golongan III: Rp185.000. Tunjangan pangan: Rp72.420 (lajang).</li>
            <li>Tukin pelaksana S-1 dihitung di kelas jabatan 7, JF Ahli Pertama di kelas 8.</li>
            <li>Tukin riil bisa terpotong kalau capaian kinerja atau kehadiran kurang.</li>
            <li>
              Tidak termasuk: Mahkamah Agung & badan peradilan, Sekretariat Kabinet, dan pemda (pemda memakai TPP yang
              besarnya ditetapkan tiap daerah).
            </li>
            <li>
              Data berlabel "Agregator" berasal dari situs pihak ketiga. Cocokkan dengan Perpres tukin instansi sebelum
              memilih formasi.
            </li>
          </ul>
        </div>
        <h3 className="mb-3 mt-8 text-sm font-semibold text-stone-100">Sumber</h3>
        <ul className="space-y-2 text-sm">
          {d.sumber.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-1.5 text-stone-400 hover:text-amber-400"
              >
                <ExternalLink className="mt-1 h-3 w-3 shrink-0" />
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-stone-600">Disusun 8 November 2026.</p>
      </Section>
    </>
  );
}
