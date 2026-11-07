import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { UserRound, ListChecks, XCircle, MapPin, Briefcase, Wallet, Info } from "lucide-react";
import {
  useCpnsData, tahunTerbaru, lolosAmbang, riwayat, rentang, teksRentang, peluang, persaingan, persentilLonggar,
  fmtRasio, namaProvinsi, AMBANG, LABEL, infoKosong,
} from "../../lib/cpns";
import { cariJabatan } from "../../data/cpnsJabatan";
import { Section, Badge, Pill, Pilih, Field, inputCls, Memuat, Peringatan } from "./ui";

const JAWA = new Set(["DKI Jakarta", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur", "Banten"]);
const KHUSUS = ["Cumlaude", "Disabilitas", "Putra/Putri Papua"];

function Kartu({ f, info, referensi }) {
  const jab = cariJabatan(f.jabatan);
  const ref = referensi.instansi?.[f.instansi] || {};
  const wilayah = !f.provinsi ? "lokasi belum terpetakan" : JAWA.has(f.provinsi) ? "Pulau Jawa" : "luar Jawa";
  return (
    <li className="rounded-2xl border border-white/8 bg-stone-900 p-5">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <Pill cls={info.label.cls}>{info.label.label}</Pill>
        <span className="text-xs text-stone-500">{f.kategori}</span>
        <Badge asli={f.asli} />
      </div>
      <h3 className="font-semibold text-stone-100">{f.jabatan}</h3>
      <p className="text-sm text-stone-400">{f.instansi}{f.unit && ` · ${f.unit}`}</p>

      <ul className="mt-3 space-y-1.5 text-sm text-stone-300">
        <li>
          Skormu <strong className="tabular-nums">{info.total}</strong>, skor terendah yang lolos ke SKB {teksRentang(info.r)}.
          {info.r.n === 1 && <span className="text-stone-500"> Baru 1 tahun data, jadi rentangnya belum bisa dihitung.</span>}
        </li>
        <li>
          Persaingan <strong className="tabular-nums">{fmtRasio(info.p.nilai)}</strong> {info.p.basis} per kursi
          {info.p.nilai < 1 && <span className="text-emerald-400"> (kursinya lebih banyak dari pesaing)</span>}
          {info.persentil != null && <span className="text-stone-500">, lebih longgar dari {info.persentil}% formasi lain di daftar ini</span>}.
        </li>
        <li>Kuota {f.kuota} kursi di seleksi {f.tahun}.</li>
        {infoKosong(f) && <li className="text-emerald-300">{infoKosong(f)}: kursinya nggak terisi karena peserta gugur atau nggak ada pesaing.</li>}
        {f.nilai_akhir_median != null && <li>Median nilai akhir pemenang: <strong className="tabular-nums">{f.nilai_akhir_median.toLocaleString("id-ID")}</strong>.</li>}
        {f.gagal_psikotes != null && f.peserta_skb > 0 && <li>{Math.round((f.gagal_psikotes / f.peserta_skb) * 100)}% peserta SKB di sini gugur psikotes.</li>}
      </ul>

      <div className="mt-4 grid gap-3 border-t border-white/6 pt-4 text-xs text-stone-400 sm:grid-cols-3">
        <div className="flex gap-2">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-stone-500" />
          <span><span className="block text-stone-300">{namaProvinsi(f)}</span>{wilayah}</span>
        </div>
        <div className="flex gap-2">
          <Briefcase className="mt-0.5 h-3.5 w-3.5 shrink-0 text-stone-500" />
          <span>
            {jab ? (
              <>
                <span className="block text-stone-300">{jab.jenjang || "Jenjang: cek pengumuman"}</span>
                {jab.pembina ? `Pembina: ${jab.pembina}` : jab.kerja}
              </>
            ) : (
              "Info karier jabatan ini belum ada"
            )}
          </span>
        </div>
        <div className="flex gap-2">
          <Wallet className="mt-0.5 h-3.5 w-3.5 shrink-0 text-stone-500" />
          <span>
            <span className="block text-stone-300">Tukin: {ref.tukin || "belum ada data"}</span>
            Aturan pindah: {ref.aturan_pindah || "cek pengumuman instansi"}
          </span>
        </div>
      </div>
    </li>
  );
}

export default function Rekomendasi() {
  const { loading, error, formasi, referensi } = useCpnsData();
  const [pendidikan, setPendidikan] = useState("S-1");
  const [skor, setSkor] = useState({ twk: "", tiu: "", tkp: "" });
  const [khusus, setKhusus] = useState([]);
  const [wilayah, setWilayah] = useState("Semua");
  const [instansi, setInstansi] = useState("Semua");
  const [kategori, setKategori] = useState("Semua");

  const n = { twk: Number(skor.twk), tiu: Number(skor.tiu), tkp: Number(skor.tkp) };
  const terisi = skor.twk !== "" && skor.tiu !== "" && skor.tkp !== "";
  const total = n.twk + n.tiu + n.tkp;

  const hasil = useMemo(() => {
    if (!terisi || !formasi.length) return null;
    const th = tahunTerbaru(formasi);
    const jenisBoleh = new Set(["Umum", ...khusus]);
    const kandidat = formasi.filter(
      (f) =>
        f.tahun === th &&
        jenisBoleh.has(f.jenis_formasi) &&
        (pendidikan === "S-2" || f.kategori !== "S-2 ke atas") &&
        (kategori === "Semua" || f.kategori === kategori) &&
        (instansi === "Semua" || f.jenis_instansi === instansi) &&
        (wilayah === "Semua" || (wilayah === "Jawa" ? JAWA.has(f.provinsi) : f.provinsi && !JAWA.has(f.provinsi)))
    );
    const ambangGagal = new Set();
    let tanpaData = 0;
    let jauh = 0;
    const cocok = [];
    kandidat.forEach((f) => {
      const a = lolosAmbang(f.jenis_formasi, n);
      if (!a.ok) return ambangGagal.add(f.jenis_formasi);
      const r = rentang(riwayat(formasi, f));
      if (!r) return tanpaData++;
      const label = peluang(total, r);
      if (!label) return jauh++;
      cocok.push({ f, info: { total, r, label, p: persaingan(f), persentil: persentilLonggar(f, kandidat) } });
    });
    cocok.sort((a, b) => a.info.label.urut - b.info.label.urut || a.info.p.nilai - b.info.p.nilai);
    return { th, kandidat: kandidat.length, cocok, ambangGagal: [...ambangGagal], tanpaData, jauh };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terisi, formasi, total, skor, khusus, pendidikan, kategori, instansi, wilayah]);

  if (loading || error) return <Memuat error={error} />;

  const toggleKhusus = (j) => setKhusus((k) => (k.includes(j) ? k.filter((x) => x !== j) : [...k, j]));
  const umumGagal = terisi ? lolosAmbang("Umum", n) : null;

  return (
    <>
      <Peringatan>
        Rekomendasi ini memakai data contoh selama hasil scrape belum masuk. Labelnya cuma soal peluang <strong>lolos ke tahap SKB</strong>,
        belum lolos akhir. Cara hitungnya ada di <Link to="/cpns/metodologi" className="underline">Metodologi</Link>.
      </Peringatan>

      <Section icon={UserRound} title="Profil kamu" desc="Jurusan dikunci ke S-1 Ilmu Komunikasi. Data ini nggak disimpan ke mana pun.">
        <div className="grid gap-5 rounded-2xl border border-white/8 bg-stone-900 p-5 lg:grid-cols-2">
          <div className="space-y-3">
            <Field label="Pendidikan terakhir">
              <Pilih label="Pendidikan" value={pendidikan} onChange={setPendidikan} options={[{ value: "S-1", label: "S-1 Ilmu Komunikasi" }, { value: "S-2", label: "S-2 ke atas (bisa lihat formasi dosen, widyaiswara, peneliti)" }]} />
            </Field>
            <div className="grid grid-cols-3 gap-2">
              {["twk", "tiu", "tkp"].map((k) => (
                <Field key={k} label={`Skor ${k.toUpperCase()}`} hint={`min ${AMBANG.Umum.per[k]}`}>
                  <input type="number" inputMode="numeric" value={skor[k]} onChange={(e) => setSkor((s) => ({ ...s, [k]: e.target.value }))} className={`${inputCls} tabular-nums`} />
                </Field>
              ))}
            </div>
            {terisi && <p className="text-sm text-stone-400">Total SKD: <strong className="tabular-nums text-stone-100">{total}</strong> dari 550</p>}
          </div>
          <div className="space-y-3">
            <Field label="Mau ditempatkan di mana?">
              <Pilih label="Wilayah" value={wilayah} onChange={setWilayah} options={[{ value: "Semua", label: "Di mana aja" }, { value: "Jawa", label: "Pulau Jawa saja" }, { value: "Luar", label: "Luar Jawa saja" }]} />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Instansi">
                <Pilih label="Instansi" value={instansi} onChange={setInstansi} options={[{ value: "Semua", label: "K/L & pemda" }, { value: "Pusat", label: "Kementerian/Lembaga" }, { value: "Daerah", label: "Pemda" }]} />
              </Field>
              <Field label="Kategori jabatan">
                <Pilih label="Kategori" value={kategori} onChange={setKategori} options={[{ value: "Semua", label: "Semua" }, { value: "Primer", label: "Primer · humas" }, { value: "Sekunder", label: "Sekunder · campuran" }, ...(pendidikan === "S-2" ? [{ value: "S-2 ke atas", label: "S-2 ke atas" }] : [])]} />
              </Field>
            </div>
            <fieldset>
              <legend className="mb-1 text-xs text-stone-400">Kamu memenuhi syarat formasi khusus? (opsional)</legend>
              <div className="flex flex-wrap gap-2">
                {KHUSUS.map((j) => (
                  <label key={j} className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-stone-950 px-2.5 py-1.5 text-xs text-stone-300">
                    <input type="checkbox" checked={khusus.includes(j)} onChange={() => toggleKhusus(j)} className="accent-amber-500" />
                    {j}
                  </label>
                ))}
              </div>
              <p className="mt-1 text-[11px] text-stone-600">Syarat tiap formasi khusus (misalnya IPK dan akreditasi untuk cumlaude) ikut pengumuman resmi.</p>
            </fieldset>
          </div>
        </div>
      </Section>

      <Section icon={ListChecks} title="Formasi yang disarankan" desc="Diurutkan dari Aman → Realistis → Spekulatif, lalu dari persaingan paling longgar.">
        {!terisi ? (
          <p className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-stone-500">Isi skor TWK, TIU, dan TKP buat lihat rekomendasi.</p>
        ) : umumGagal && !umumGagal.ok && !khusus.length ? (
          <div className="flex items-start gap-2 rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5 text-sm text-rose-300">
            <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{umumGagal.alasan} Semua formasi umum mensyaratkan ambang ini, jadi fokus naikin bagian itu dulu.</p>
          </div>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap gap-2 text-xs">
              {Object.values(LABEL).map((l) => (
                <Pill key={l.id} cls={l.cls}>{hasil.cocok.filter((c) => c.info.label.id === l.id).length} {l.label}</Pill>
              ))}
              <span className="text-stone-500">dari {hasil.kandidat} formasi seleksi {hasil.th} yang sesuai profilmu</span>
            </div>
            {hasil.cocok.length ? (
              <ul className="space-y-3">
                {hasil.cocok.map(({ f, info }) => <Kartu key={f.id} f={f} info={info} referensi={referensi} />)}
              </ul>
            ) : (
              <p className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-stone-500">Belum ada formasi yang masuk jangkauan skormu. Coba longgarkan pilihan wilayah atau instansi.</p>
            )}
            <div className="mt-4 space-y-1 text-xs text-stone-500">
              {hasil.jauh > 0 && <p>{hasil.jauh} formasi lain skornya masih jauh di bawah rentang yang lolos ke SKB.</p>}
              {hasil.tanpaData > 0 && <p>{hasil.tanpaData} formasi belum punya data skor SKD, jadi belum bisa dinilai.</p>}
              {hasil.ambangGagal.length > 0 && <p>Skormu belum lolos ambang batas formasi: {hasil.ambangGagal.join(", ")}.</p>}
            </div>
            <div className="mt-6 flex gap-3 rounded-2xl bg-stone-900 p-5 text-sm text-stone-300 ring-1 ring-white/8">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <p>
                Tiap seleksi cuma bisa daftar satu formasi. Strategi umumnya: pilih dari kelompok <strong>Realistis</strong> yang persaingannya paling longgar,
                dan pakai <strong>Aman</strong> kalau kamu nggak mau ambil risiko. Jangan lupa siapin SKB, karena bobotnya 60% nilai akhir.{" "}
                <Link to="/cpns/skb" className="text-amber-400 hover:text-amber-300">Persiapan SKB →</Link>
              </p>
            </div>
          </>
        )}
      </Section>
    </>
  );
}
