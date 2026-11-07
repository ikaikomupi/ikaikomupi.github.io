import { useMemo, useState } from "react";
import { ClipboardList, BarChart3, ShieldCheck, CheckCircle2 } from "lucide-react";
import { CPNS_FORM_URL, MIN_LAPORAN, JENIS_FORMASI, useLaporanAlumni } from "../../lib/cpns";
import { Section, Field, Pilih, inputCls, Pill } from "./ui";

export const HASIL = [
  "Lolos akhir",
  "Ikut SKB, tidak lolos akhir",
  "Lolos ambang SKD, tidak masuk SKB",
  "Tidak lolos ambang SKD",
  "Masih proses",
];

const KOSONG = {
  tahun: String(new Date().getFullYear()), kategori: "Primer", jabatan: "", instansi: "", jenis_formasi: "Umum", provinsi: "",
  twk: "", tiu: "", tkp: "", skb: "", hasil: HASIL[0], tips: "",
  boleh_statistik: false, bersedia_dihubungi: false, nama: "", kontak: "",
};

const median = (v) => {
  const s = [...v].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2);
};

export function PatokanAlumni() {
  const { loading, rows, aktif } = useLaporanAlumni();
  const grup = useMemo(() => {
    const m = {};
    rows.forEach((r) => {
      const k = (r.jabatan || "").trim();
      if (!k) return;
      (m[k] ||= []).push(r);
    });
    return Object.entries(m)
      .filter(([, v]) => v.length >= MIN_LAPORAN)
      .map(([jabatan, v]) => {
        const lolos = v.filter((r) => r.hasil === "Lolos akhir");
        const skd = lolos.map((r) => Number(r.twk) + Number(r.tiu) + Number(r.tkp)).filter((x) => x > 0);
        return { jabatan, n: v.length, lolos: lolos.length, medianSkd: skd.length ? median(skd) : null };
      })
      .sort((a, b) => b.n - a.n);
  }, [rows]);

  if (loading) return <p className="text-sm text-stone-500">Memuat laporan alumni…</p>;
  if (!aktif || !grup.length)
    return (
      <p className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-stone-500">
        Belum cukup laporan. Statistik per jabatan muncul setelah ada minimal {MIN_LAPORAN} laporan untuk jabatan yang sama.
      </p>
    );
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/8">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="bg-stone-900 text-xs text-stone-500">
          <tr>
            <th className="px-4 py-3 font-medium">Jabatan</th>
            <th className="px-4 py-3 text-right font-medium">Laporan</th>
            <th className="px-4 py-3 text-right font-medium">Lolos akhir</th>
            <th className="px-4 py-3 text-right font-medium">Median SKD yang lolos</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {grup.map((g) => (
            <tr key={g.jabatan}>
              <td className="px-4 py-3 text-stone-200">{g.jabatan}</td>
              <td className="px-4 py-3 text-right tabular-nums text-stone-300">{g.n}</td>
              <td className="px-4 py-3 text-right tabular-nums text-stone-300">{g.lolos} ({Math.round((g.lolos / g.n) * 100)}%)</td>
              <td className="px-4 py-3 text-right tabular-nums text-stone-300">{g.medianSkd ?? "–"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Lapor() {
  const [f, setF] = useState(KOSONG);
  const [status, setStatus] = useState("idle");
  const [err, setErr] = useState("");
  const set = (k) => (v) => setF((s) => ({ ...s, [k]: v }));
  const setE = (k) => (e) => set(k)(e.target.type === "checkbox" ? e.target.checked : e.target.value);

  async function kirim(e) {
    e.preventDefault();
    if (!f.jabatan.trim() || !f.instansi.trim()) return setErr("Isi jabatan dan instansi.");
    if (!f.boleh_statistik) return setErr("Centang persetujuan statistik dulu, ya.");
    if (f.bersedia_dihubungi && (!f.nama.trim() || !f.kontak.trim())) return setErr("Isi nama dan kontak kalau bersedia dihubungi.");
    setErr("");
    setStatus("kirim");
    const publik = {
      tahun: f.tahun, kategori: f.kategori, jabatan: f.jabatan.trim(), instansi: f.instansi.trim(), jenis_formasi: f.jenis_formasi,
      provinsi: f.provinsi.trim(), twk: f.twk, tiu: f.tiu, tkp: f.tkp, skb: f.skb, hasil: f.hasil, tips: f.tips.trim(), boleh_statistik: "ya",
    };
    const kontak = f.bersedia_dihubungi ? { nama: f.nama.trim(), kontak: f.kontak.trim(), jabatan: publik.jabatan, instansi: publik.instansi, tahun: f.tahun } : null;
    try {
      await fetch(CPNS_FORM_URL, { method: "POST", mode: "no-cors", body: JSON.stringify({ tipe: "cpns", publik, kontak }) });
      setStatus("ok");
      setF(KOSONG);
    } catch {
      setStatus("idle");
      setErr("Gagal mengirim. Coba lagi.");
    }
  }

  return (
    <>
      <Section icon={BarChart3} title="Patokan dari alumni Ikom UPI" desc="Dihitung dari laporan alumni yang setuju datanya dipakai untuk statistik. Tanpa nama, dan hanya jabatan dengan cukup laporan yang ditampilkan.">
        <PatokanAlumni />
      </Section>

      <Section icon={ClipboardList} title="Lapor hasil seleksimu" desc="Lolos atau belum, laporanmu bikin patokan ini makin akurat buat adik tingkat. Butuh 2 menit.">
        {status === "ok" ? (
          <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-sm text-emerald-200">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
            <div>
              <p className="font-semibold">Makasih, laporanmu udah terkirim.</p>
              <button onClick={() => setStatus("idle")} className="mt-2 text-emerald-400 underline">Kirim laporan lain</button>
            </div>
          </div>
        ) : (
          <form onSubmit={kirim} className="space-y-5 rounded-2xl border border-white/8 bg-stone-900 p-5">
            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="Tahun seleksi"><input value={f.tahun} onChange={setE("tahun")} inputMode="numeric" className={inputCls} /></Field>
              <Field label="Kategori jabatan">
                <Pilih label="Kategori" value={f.kategori} onChange={set("kategori")} options={[{ value: "Primer", label: "Primer · humas" }, { value: "Sekunder", label: "Sekunder · campuran" }, { value: "S-2 ke atas", label: "S-2 ke atas" }]} />
              </Field>
              <Field label="Jenis formasi">
                <Pilih label="Jenis formasi" value={f.jenis_formasi} onChange={set("jenis_formasi")} options={JENIS_FORMASI.map((j) => ({ value: j, label: j }))} />
              </Field>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="Jabatan *"><input value={f.jabatan} onChange={setE("jabatan")} placeholder="Pranata Humas Ahli Pertama" className={inputCls} /></Field>
              <Field label="Instansi *"><input value={f.instansi} onChange={setE("instansi")} placeholder="Kementerian Agama" className={inputCls} /></Field>
              <Field label="Provinsi penempatan"><input value={f.provinsi} onChange={setE("provinsi")} placeholder="Jawa Barat" className={inputCls} /></Field>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["twk", "tiu", "tkp"].map((k) => (
                <Field key={k} label={`Skor ${k.toUpperCase()}`}><input value={f[k]} onChange={setE(k)} type="number" inputMode="numeric" className={`${inputCls} tabular-nums`} /></Field>
              ))}
              <Field label="Nilai SKB" hint="opsional"><input value={f.skb} onChange={setE("skb")} type="number" inputMode="decimal" className={`${inputCls} tabular-nums`} /></Field>
            </div>
            <Field label="Hasil">
              <Pilih label="Hasil" value={f.hasil} onChange={set("hasil")} options={HASIL.map((h) => ({ value: h, label: h }))} />
            </Field>
            <Field label="Tips buat adik tingkat" hint="opsional, tampil tanpa nama">
              <textarea value={f.tips} onChange={setE("tips")} rows={3} placeholder="Materi SKB yang keluar, cara belajar, alasan milih formasi ini…" className={inputCls} />
            </Field>

            <div className="space-y-3 rounded-xl bg-stone-950 p-4 text-sm">
              <label className="flex items-start gap-2 text-stone-300">
                <input type="checkbox" checked={f.boleh_statistik} onChange={setE("boleh_statistik")} className="mt-1 accent-amber-500" />
                <span>Saya setuju data di atas (tanpa nama) dipakai untuk statistik dan tips di KOMpas ASN. *</span>
              </label>
              <label className="flex items-start gap-2 text-stone-300">
                <input type="checkbox" checked={f.bersedia_dihubungi} onChange={setE("bersedia_dihubungi")} className="mt-1 accent-amber-500" />
                <span>Saya bersedia dihubungi alumni lain lewat admin IKA untuk konsultasi.</span>
              </label>
              {f.bersedia_dihubungi && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Nama"><input value={f.nama} onChange={setE("nama")} className={inputCls} /></Field>
                  <Field label="No. WA atau email"><input value={f.kontak} onChange={setE("kontak")} className={inputCls} /></Field>
                  <p className="flex items-start gap-1.5 text-xs text-stone-500 sm:col-span-2">
                    <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    Nama dan kontak disimpan terpisah di tempat privat, cuma bisa dilihat admin IKA, dan nggak pernah tampil di website.
                  </p>
                </div>
              )}
            </div>

            {err && <p className="text-sm text-rose-400">{err}</p>}
            {!CPNS_FORM_URL && <Pill cls="text-amber-400 bg-amber-500/10 ring-amber-500/20">Form belum aktif: penyimpanan datanya belum disambungkan</Pill>}
            <button
              type="submit"
              disabled={!CPNS_FORM_URL || status === "kirim"}
              className="block rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {status === "kirim" ? "Mengirim…" : "Kirim laporan"}
            </button>
          </form>
        )}
      </Section>
    </>
  );
}
