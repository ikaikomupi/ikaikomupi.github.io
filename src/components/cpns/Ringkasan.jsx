import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Lightbulb, Search, MapPin, Building2, Landmark, Target, TrendingDown, Map as MapIcon } from "lucide-react";
import { useCpnsData, persaingan, riwayat, rentang, teksRentang, tahunTerbaru, JENIS_FORMASI, fmtRasio, namaProvinsi, temuan, } from "../../lib/cpns";
import { Section, Badge, Stat, Pilih, Peringatan, Memuat, PilihKategori, Pill } from "./ui";
import { Peta, Batang, Scatter, PESERTA_CONTOH } from "./charts";

const JAWA = new Set(["DKI Jakarta", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur", "Banten"]);

const JABAR_2024 = [
  { kursi: 17, jabatan: "Fasilitator Pemerintahan · Dinas Sosial", detail: "Bidang Rehabilitasi Sosial: 9 kursi, 1.253 pelamar, skor min. 416. 8 kursi lain di bidang, UPTD Griya, dan Sekretariat: 4–119 pelamar per lokasi, skor min. 289–382." },
  { kursi: 2, jabatan: "Pranata Humas Ahli Pertama", detail: "Dinas Pendidikan dan BKD: 219 pelamar, skor min. ke SKB 416–429." },
  { kursi: 1, jabatan: "Arsiparis Ahli Pertama · Dinas ESDM", detail: "125 pelamar, skor min. ke SKB 431." },
];

function rekap(rows) {
  const kursi = rows.reduce((s, f) => s + f.kuota, 0);
  const pelamar = rows.reduce((s, f) => s + (f.pelamar ?? f.peserta ?? 0), 0);
  return { formasi: rows.length, kursi, pelamar, perKursi: kursi ? pelamar / kursi : 0 };
}

function KartuWilayah({ judul, r, total }) {
  const pct = total ? Math.round((r.kursi / total) * 100) : 0;
  return (
    <div className="rounded-2xl border border-white/8 bg-stone-900 p-5">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="font-semibold text-stone-100">{judul}</h3>
        <span className="text-sm tabular-nums text-amber-400">{pct}% kursi</span>
      </div>
      <dl className="grid grid-cols-3 gap-2 text-sm">
        <div><dt className="text-xs text-stone-500">Kursi</dt><dd className="text-lg font-semibold tabular-nums text-stone-100">{r.kursi}</dd></div>
        <div><dt className="text-xs text-stone-500">Pelamar</dt><dd className="text-lg font-semibold tabular-nums text-stone-100">{r.pelamar.toLocaleString("id-ID")}</dd></div>
        <div><dt className="text-xs text-stone-500">Pelamar/kursi</dt><dd className="text-lg font-semibold tabular-nums text-stone-100">{fmtRasio(r.perKursi)}</dd></div>
      </dl>
    </div>
  );
}

function perInstansi(rows) {
  const m = {};
  rows.forEach((f) => {
    const x = (m[f.instansi] ||= { kursi: 0, pelamar: 0 });
    x.kursi += f.kuota;
    x.pelamar += f.pelamar ?? f.peserta ?? 0;
  });
  return Object.entries(m)
    .map(([label, v]) => ({ label, nilai: v.kursi, sub: `${fmtRasio(v.pelamar / v.kursi)} pelamar/kursi` }))
    .sort((a, b) => b.nilai - a.nilai);
}

export default function Ringkasan() {
  const { loading, error, formasi } = useCpnsData();
  const terbaru = formasi.length ? String(tahunTerbaru(formasi)) : "Semua";
  const [kategori, setKategori] = useState("Primer");
  const [tahunPilih, setTahun] = useState(null);
  const tahun = tahunPilih ?? terbaru;
  const [jenisFormasi, setJenisFormasi] = useState("Semua");
  const [jenisInstansi, setJenisInstansi] = useState("Semua");
  const [provinsi, setProvinsi] = useState("Semua");
  const [hanyaAsli, setHanyaAsli] = useState(false);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("longgar");

  const dasar = useMemo(
    () =>
      formasi.filter(
        (f) =>
          (!hanyaAsli || f.asli) &&
          (kategori === "Semua" || f.kategori === kategori) &&
          (tahun === "Semua" || String(f.tahun) === tahun) &&
          (jenisFormasi === "Semua" || f.jenis_formasi === jenisFormasi)
      ),
    [formasi, hanyaAsli, kategori, tahun, jenisFormasi]
  );

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return dasar
      .filter(
        (f) =>
          (jenisInstansi === "Semua" || f.jenis_instansi === jenisInstansi) &&
          (provinsi === "Semua" || namaProvinsi(f) === provinsi) &&
          (!term || `${f.instansi} ${f.unit} ${f.jabatan}`.toLowerCase().includes(term))
      )
      .map((f) => ({ ...f, _r: rentang(riwayat(formasi, f)), _p: persaingan(f) }))
      .sort((a, b) =>
        sort === "longgar" ? a._p.nilai - b._p.nilai : sort === "kuota" ? b.kuota - a.kuota : (a._r?.median ?? 999) - (b._r?.median ?? 999)
      );
  }, [dasar, formasi, jenisInstansi, provinsi, q, sort]);

  const tingkat = useMemo(() => {
    const v = rows.map((f) => f._p.nilai).sort((a, b) => a - b);
    const t1 = v[Math.floor(v.length / 3)];
    const t2 = v[Math.floor((2 * v.length) / 3)];
    return (n) =>
      v.length < 3
        ? null
        : n < t1
        ? { label: "Relatif longgar", cls: "text-emerald-400 bg-emerald-500/10 ring-emerald-500/20" }
        : n < t2
        ? { label: "Sedang", cls: "text-amber-400 bg-amber-500/10 ring-amber-500/20" }
        : { label: "Relatif ketat", cls: "text-rose-400 bg-rose-500/10 ring-rose-500/20" };
  }, [rows]);

  const kursiProv = useMemo(() => {
    const m = {};
    rows.filter((f) => f.provinsi).forEach((f) => (m[f.provinsi] = (m[f.provinsi] || 0) + f.kuota));
    return m;
  }, [rows]);

  if (loading || error) return <Memuat error={error} />;

  const semua = rekap(rows);
  const jawa = rekap(rows.filter((f) => JAWA.has(f.provinsi)));
  const luar = rekap(rows.filter((f) => f.provinsi && !JAWA.has(f.provinsi)));
  const belum = rekap(rows.filter((f) => !f.provinsi));
  const temuanList = temuan(rows);
  const kl = perInstansi(rows.filter((f) => f.jenis_instansi === "Pusat"));
  const pemda = perInstansi(rows.filter((f) => f.jenis_instansi === "Daerah")).slice(0, 10);
  const tahunList = [...new Set(formasi.map((f) => f.tahun))].sort((a, b) => b - a);
  const provList = [...new Set(formasi.map(namaProvinsi))].sort();

  return (
    <>
      <Peringatan>
        <strong>Prototipe.</strong> Baris bertanda <Badge asli /> diambil dari rekap resmi. Baris bertanda <Badge /> cuma contoh
        buat nunjukin fitur, nama instansinya sengaja disamarkan, dan bakal diganti hasil scrape.
      </Peringatan>

      <div className="mb-8 space-y-3 rounded-2xl border border-white/8 bg-stone-900/60 p-4">
        <PilihKategori value={kategori} onChange={setKategori} />
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <Pilih label="Tahun" value={tahun} onChange={setTahun} options={[{ value: "Semua", label: "Semua tahun" }, ...tahunList.map((t) => ({ value: String(t), label: `Seleksi ${t}` }))]} />
          <Pilih label="Jenis formasi" value={jenisFormasi} onChange={setJenisFormasi} options={[{ value: "Semua", label: "Semua jenis formasi" }, ...JENIS_FORMASI.map((j) => ({ value: j, label: `Formasi ${j}` }))]} />
          <Pilih label="Jenis instansi" value={jenisInstansi} onChange={setJenisInstansi} options={[{ value: "Semua", label: "K/L & pemda" }, { value: "Pusat", label: "Kementerian/Lembaga" }, { value: "Daerah", label: "Pemerintah daerah" }]} />
          <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-stone-900 px-3 py-2 text-sm text-stone-300">
            <input type="checkbox" checked={hanyaAsli} onChange={(e) => setHanyaAsli(e.target.checked)} className="accent-amber-500" />
            Data asli saja
          </label>
        </div>
        <p className="text-xs text-stone-500">
          Semua formasi di sini menerima <strong className="text-stone-300">S-1 Ilmu Komunikasi</strong> (kategori S-2 ke atas: lulusan S-2). Nama jurusan di ijazah harus persis sama dengan lampiran formasi.
        </p>
      </div>

      <div className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Formasi" value={semua.formasi} />
        <Stat label="Kursi" value={semua.kursi} />
        <Stat label="Pelamar" value={semua.pelamar.toLocaleString("id-ID")} />
        <Stat label="Pelamar per kursi" value={fmtRasio(semua.perKursi)} />
      </div>

      {temuanList.length > 0 && (
        <Section icon={Lightbulb} title="Temuan & rekomendasi dari data" desc="Dibaca otomatis dari pola data sesuai filter di atas. Berubah sendiri begitu datanya diperbarui.">
          <div className="grid gap-3 sm:grid-cols-2">
            {temuanList.map((t) => (
              <div key={t.judul} className="rounded-2xl border border-white/8 bg-stone-900 p-5">
                <h3 className="font-semibold text-stone-100">{t.judul}</h3>
                <p className="mt-1 text-sm text-stone-400">{t.isi}</p>
                <p className="mt-3 border-t border-white/6 pt-3 text-sm text-amber-200/90">→ {t.saran}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section icon={MapIcon} title="Jawa vs luar Jawa" desc="Kebanyakan pelamar ngincer Jawa. Bandingin kursi dan kepadatan pelamarnya.">
        <div className="grid gap-3 sm:grid-cols-2">
          <KartuWilayah judul="Pulau Jawa" r={jawa} total={semua.kursi} />
          <KartuWilayah judul="Luar Jawa" r={luar} total={semua.kursi} />
        </div>
        {belum.kursi > 0 && (
          <p className="mt-3 text-xs text-stone-500">{belum.kursi} kursi ({belum.formasi} formasi) unitnya belum terpetakan ke provinsi, jadi nggak masuk hitungan Jawa/luar Jawa dan peta.</p>
        )}
      </Section>

      <Section
        icon={Building2}
        title="Peta sebaran kursi per provinsi"
        desc="Ikut filter di atas. Makin pekat, makin banyak kursi. Skalanya akar kuadrat biar Jakarta nggak bikin provinsi lain kelihatan kosong."
        foot="Peta dasar 34 provinsi (BAKOSURTANAL 1:250.000), belum memuat provinsi hasil pemekaran 2022; formasi di provinsi baru dihitung ke provinsi induknya."
      >
        <div className="rounded-2xl border border-white/8 bg-stone-900 p-4">
          <Peta data={kursiProv} />
        </div>
      </Section>

      <Section icon={Landmark} title="Sebaran antar instansi" desc="Kementerian/lembaga mana yang paling banyak buka kursi, dan seberapa padat pelamarnya.">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-stone-900 p-5">
            <h3 className="mb-4 text-sm font-semibold text-stone-200">Kementerian/Lembaga</h3>
            {kl.length ? <Batang rows={kl} /> : <p className="text-sm text-stone-500">Nggak ada formasi K/L di filter ini.</p>}
          </div>
          <div className="rounded-2xl border border-white/8 bg-stone-900 p-5">
            <h3 className="mb-4 text-sm font-semibold text-stone-200">Pemerintah daerah (10 teratas)</h3>
            {pemda.length ? <Batang rows={pemda} /> : <p className="text-sm text-stone-500">Nggak ada formasi pemda di filter ini.</p>}
          </div>
        </div>
      </Section>

      <Section
        icon={Search}
        title="Daftar formasi"
        desc="Persaingan = peserta lolos ambang batas per kursi (kalau belum ada, pelamar per kursi). Rentang skor diambil dari semua tahun yang ada datanya."
      >
        <div className="mb-3 grid gap-2 sm:grid-cols-[1fr_200px_220px]">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari instansi atau jabatan"
            className="rounded-lg border border-white/10 bg-stone-900 px-3 py-2 text-sm text-stone-100 placeholder:text-stone-600 focus:border-amber-500/50 focus:outline-none"
          />
          <Pilih label="Provinsi" value={provinsi} onChange={setProvinsi} options={[{ value: "Semua", label: "Semua provinsi" }, ...provList.map((p) => ({ value: p, label: p }))]} />
          <Pilih label="Urutkan" value={sort} onChange={setSort} options={[{ value: "longgar", label: "Urut: paling longgar" }, { value: "kuota", label: "Urut: kuota terbanyak" }, { value: "skd", label: "Urut: skor SKB terendah" }]} />
        </div>
        <div className="overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-stone-900 text-xs text-stone-500">
              <tr>
                <th className="px-4 py-3 font-medium">Jabatan & instansi</th>
                <th className="px-4 py-3 text-right font-medium">Kuota</th>
                <th className="px-4 py-3 text-right font-medium">Pelamar</th>
                <th className="px-4 py-3 text-right font-medium">Persaingan/kursi</th>
                <th className="px-4 py-3 text-right font-medium">Skor min. ke SKB</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((f) => {
                const k = tingkat(f._p.nilai);
                return (
                  <tr key={f.id} className="align-top hover:bg-white/[0.02]">
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium text-stone-200">{f.jabatan}</p>
                        <Badge asli={f.asli} />
                      </div>
                      <p className="mt-0.5 text-xs text-stone-400">{f.instansi}{f.unit && ` · ${f.unit}`}</p>
                      <p className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-stone-500">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {namaProvinsi(f)}</span>
                        <span>· {f.tahun}</span>
                        <span>· {f.kategori}</span>
                        {f.jenis_formasi !== "Umum" && <span>· Formasi {f.jenis_formasi}</span>}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-stone-300">{f.kuota}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-stone-300">{(f.pelamar ?? f.peserta)?.toLocaleString("id-ID") ?? "–"}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="tabular-nums text-stone-200">{fmtRasio(f._p.nilai)}</span>
                      <p className="text-[11px] text-stone-600">dari {f._p.basis}</p>
                      {k && <div className="mt-1"><Pill cls={k.cls}>{k.label}</Pill></div>}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-stone-300">
                      {f.skd_min ?? <span className="text-stone-600">belum ada</span>}
                      {f._r && f._r.n > 1 && <p className="text-[11px] text-stone-500">rentang {teksRentang(f._r)}</p>}
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-stone-500">Nggak ada formasi yang cocok sama filternya.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-stone-400">
          Punya skor tryout? <Link to="/cpns/rekomendasi" className="font-medium text-amber-400 hover:text-amber-300">Lihat rekomendasi formasi buat kamu →</Link>
        </p>
      </Section>

      <Section
        icon={Target}
        title="Studi kasus: Pemprov Jawa Barat 2024"
        desc="Data asli. Jabatan untuk S-1 Ilmu Komunikasi bukan cuma humas: ada 20 kursi."
        foot="Sumber: rekap SKD & integrasi SKD-SKB CPNS 2024 Pemprov Jabar (BKN, via bkd.jabarprov.go.id). Jumlah jabatan adalah batas bawah karena sebagian daftar jurusan di rekap terpotong."
      >
        <div className="space-y-3">
          {JABAR_2024.map((j) => (
            <div key={j.jabatan} className="flex gap-5 rounded-2xl border border-white/8 bg-stone-900 p-5">
              <span className="w-12 shrink-0 text-4xl font-bold tabular-nums text-amber-400">{j.kursi}</span>
              <div>
                <h3 className="font-semibold text-stone-100">{j.jabatan}</h3>
                <p className="mt-1 text-sm text-stone-400">{j.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        icon={TrendingDown}
        title="SKD tinggi belum tentu lolos"
        desc="Tiap titik satu peserta. Nilai akhir gabungan SKD 40% dan SKB 60%, jadi SKB yang jeblok bisa ngegugurin SKD yang tinggi."
      >
        <div className="rounded-2xl border border-white/8 bg-stone-900 p-5">
          <div className="mb-3 flex flex-wrap items-center gap-4 text-xs text-stone-400">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Lolos akhir</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full border border-stone-500" /> Tidak lolos</span>
            <span className="ml-auto"><Badge /></span>
          </div>
          <Scatter data={PESERTA_CONTOH} />
          <p className="mt-2 text-center text-xs text-stone-600">Sumbu tegak: nilai SKB (skala 100)</p>
        </div>
      </Section>
    </>
  );
}
