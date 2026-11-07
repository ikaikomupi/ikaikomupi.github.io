import { useMemo, useState } from "react";
import {
  Search,
  Target,
  MapPin,
  Users,
  Building2,
  TrendingDown,
  Calculator,
  MessageCircle,
  Database,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  GraduationCap,
} from "lucide-react";
import { PROVINSI, PETA_W, PETA_H } from "../data/petaProvinsi";

const DIPERBARUI = "8 November 2026";

const SUMBER_JABAR =
  "Rekap SKD & integrasi SKD-SKB CPNS 2024 Pemprov Jabar (BKN, via bkd.jabarprov.go.id)";

// asli: true  = data asli dengan sumber.
// asli: false = DATA CONTOH untuk prototipe; nama instansi sengaja disamarkan.
// skdMin = nilai SKD terendah yang lolos ke tahap SKB (bukan lolos akhir).
// lolosPG = jumlah peserta yang lolos ambang batas (null kalau belum ada datanya).
const FORMASI = [
  { id: "jb1", asli: true, tahun: 2024, instansi: "Pemprov Jawa Barat · Dinas Sosial (Bidang Rehabilitasi Sosial)", jenisInstansi: "Daerah", provinsi: "Jawa Barat", jabatan: "Fasilitator Pemerintahan", pendidikan: "S-1", jurusan: ["S-1 Ilmu Komunikasi"], jenisFormasi: "Umum", kuota: 9, pelamar: 1253, lolosPG: null, skdMin: 416, sumber: SUMBER_JABAR },
  { id: "jb2", asli: true, tahun: 2024, instansi: "Pemprov Jawa Barat · Badan Kepegawaian Daerah", jenisInstansi: "Daerah", provinsi: "Jawa Barat", jabatan: "Pranata Humas Ahli Pertama", pendidikan: "S-1", jurusan: ["S-1 Ilmu Komunikasi"], jenisFormasi: "Umum", kuota: 1, pelamar: 135, lolosPG: null, skdMin: 416, sumber: SUMBER_JABAR },
  { id: "jb3", asli: true, tahun: 2024, instansi: "Pemprov Jawa Barat · Dinas Pendidikan", jenisInstansi: "Daerah", provinsi: "Jawa Barat", jabatan: "Pranata Humas Ahli Pertama", pendidikan: "S-1", jurusan: ["S-1 Ilmu Komunikasi"], jenisFormasi: "Umum", kuota: 1, pelamar: 84, lolosPG: null, skdMin: 429, sumber: SUMBER_JABAR },
  { id: "jb4", asli: true, tahun: 2024, instansi: "Pemprov Jawa Barat · Dinas ESDM", jenisInstansi: "Daerah", provinsi: "Jawa Barat", jabatan: "Arsiparis Ahli Pertama", pendidikan: "S-1", jurusan: ["S-1 Ilmu Komunikasi"], jenisFormasi: "Umum", kuota: 1, pelamar: 125, lolosPG: null, skdMin: 431, sumber: SUMBER_JABAR },
  { id: "jb5", asli: true, tahun: 2024, instansi: "Pemprov Jawa Barat · 11 OPD", jenisInstansi: "Daerah", provinsi: "Jawa Barat", jabatan: "Pranata Humas Terampil", pendidikan: "D-III", jurusan: ["D-III Hubungan Masyarakat", "D-III Komunikasi", "D-III Jurnalistik", "D-III Desain Komunikasi Visual"], jenisFormasi: "Umum", kuota: 14, pelamar: 86, lolosPG: null, skdMin: null, sumber: SUMBER_JABAR },

  { id: "c1", asli: false, tahun: 2024, instansi: "Contoh Kementerian A", jenisInstansi: "Pusat", provinsi: "DKI Jakarta", jabatan: "Pranata Humas Ahli Pertama", pendidikan: "S-1", jurusan: ["S-1 Ilmu Komunikasi", "S-1 Hubungan Masyarakat"], jenisFormasi: "Umum", kuota: 12, pelamar: 2140, lolosPG: 610, skdMin: 412 },
  { id: "c2", asli: false, tahun: 2024, instansi: "Contoh Kementerian A", jenisInstansi: "Pusat", provinsi: "DKI Jakarta", jabatan: "Pranata Humas Ahli Pertama", pendidikan: "S-1", jurusan: ["S-1 Ilmu Komunikasi", "S-1 Hubungan Masyarakat"], jenisFormasi: "Cumlaude", kuota: 2, pelamar: 190, lolosPG: 58, skdMin: 421 },
  { id: "c3", asli: false, tahun: 2024, instansi: "Contoh Badan B", jenisInstansi: "Pusat", provinsi: "DKI Jakarta", jabatan: "Analis Kebijakan Ahli Pertama", pendidikan: "S-1", jurusan: ["S-1 Ilmu Komunikasi", "S-1 Ilmu Politik", "S-1 Administrasi Publik"], jenisFormasi: "Umum", kuota: 4, pelamar: 760, lolosPG: 205, skdMin: 415 },
  { id: "c4", asli: false, tahun: 2024, instansi: "Contoh Pemprov C", jenisInstansi: "Daerah", provinsi: "Jawa Tengah", jabatan: "Pranata Humas Ahli Pertama", pendidikan: "S-1", jurusan: ["S-1 Ilmu Komunikasi"], jenisFormasi: "Umum", kuota: 4, pelamar: 410, lolosPG: 96, skdMin: 389 },
  { id: "c5", asli: false, tahun: 2024, instansi: "Contoh Pemprov D", jenisInstansi: "Daerah", provinsi: "Kalimantan Timur", jabatan: "Pranata Humas Ahli Pertama", pendidikan: "S-1", jurusan: ["S-1 Ilmu Komunikasi", "S-1 Jurnalistik"], jenisFormasi: "Umum", kuota: 3, pelamar: 118, lolosPG: 31, skdMin: 366 },
  { id: "c6", asli: false, tahun: 2024, instansi: "Contoh Pemprov E", jenisInstansi: "Daerah", provinsi: "Sulawesi Selatan", jabatan: "Pranata Humas Ahli Pertama", pendidikan: "S-1", jurusan: ["S-1 Ilmu Komunikasi"], jenisFormasi: "Umum", kuota: 3, pelamar: 204, lolosPG: 49, skdMin: 378 },
  { id: "c7", asli: false, tahun: 2024, instansi: "Contoh Pemprov F", jenisInstansi: "Daerah", provinsi: "Papua", jabatan: "Pranata Humas Ahli Pertama", pendidikan: "S-1", jurusan: ["S-1 Ilmu Komunikasi"], jenisFormasi: "Putra/Putri Papua", kuota: 4, pelamar: 52, lolosPG: 14, skdMin: 331 },
  { id: "c8", asli: false, tahun: 2024, instansi: "Contoh Pemkab G", jenisInstansi: "Daerah", provinsi: "Jawa Timur", jabatan: "Pranata Humas Ahli Pertama", pendidikan: "S-1", jurusan: ["S-1 Ilmu Komunikasi", "S-1 Hubungan Masyarakat"], jenisFormasi: "Disabilitas", kuota: 1, pelamar: 9, lolosPG: 3, skdMin: 302 },
  { id: "c9", asli: false, tahun: 2024, instansi: "Contoh Pemprov H", jenisInstansi: "Daerah", provinsi: "Sumatera Utara", jabatan: "Pranata Humas Ahli Pertama", pendidikan: "S-1", jurusan: ["S-1 Ilmu Komunikasi"], jenisFormasi: "Umum", kuota: 3, pelamar: 260, lolosPG: 70, skdMin: 384 },
  { id: "c10", asli: false, tahun: 2024, instansi: "Contoh Pemprov I", jenisInstansi: "Daerah", provinsi: "Nusa Tenggara Timur", jabatan: "Pranata Humas Terampil", pendidikan: "D-III", jurusan: ["D-III Hubungan Masyarakat"], jenisFormasi: "Umum", kuota: 2, pelamar: 23, lolosPG: 7, skdMin: 318 },
  { id: "c11", asli: false, tahun: 2023, instansi: "Contoh Kementerian A", jenisInstansi: "Pusat", provinsi: "DKI Jakarta", jabatan: "Pranata Humas Ahli Pertama", pendidikan: "S-1", jurusan: ["S-1 Ilmu Komunikasi", "S-1 Hubungan Masyarakat"], jenisFormasi: "Umum", kuota: 9, pelamar: 1880, lolosPG: 540, skdMin: 409 },
  { id: "c12", asli: false, tahun: 2023, instansi: "Contoh Pemprov J", jenisInstansi: "Daerah", provinsi: "Kalimantan Barat", jabatan: "Arsiparis Ahli Pertama", pendidikan: "S-1", jurusan: ["S-1 Ilmu Komunikasi", "S-1 Ilmu Perpustakaan"], jenisFormasi: "Umum", kuota: 2, pelamar: 74, lolosPG: 22, skdMin: 371 },
  { id: "c13", asli: false, tahun: 2023, instansi: "Contoh Pemprov K", jenisInstansi: "Daerah", provinsi: "Aceh", jabatan: "Pranata Humas Ahli Pertama", pendidikan: "S-1", jurusan: ["S-1 Ilmu Komunikasi"], jenisFormasi: "Umum", kuota: 2, pelamar: 140, lolosPG: 35, skdMin: 380 },
  { id: "c14", asli: false, tahun: 2023, instansi: "Contoh Pemprov L", jenisInstansi: "Daerah", provinsi: "Papua Barat", jabatan: "Pranata Humas Ahli Pertama", pendidikan: "S-1", jurusan: ["S-1 Ilmu Komunikasi"], jenisFormasi: "Umum", kuota: 2, pelamar: 41, lolosPG: 12, skdMin: 342 },
];

// Ambang batas SKD 2024 (Kepmenpan-RB No. 321 Tahun 2024).
// Formasi Umum sudah pasti; formasi khusus masih angka sementara, wajib dicek ulang ke Kepmenpan-RB.
const AMBANG = {
  Umum: { per: { twk: 65, tiu: 80, tkp: 166 }, label: "TWK 65 · TIU 80 · TKP 166", cek: false },
  Cumlaude: { total: 311, tiuMin: 85, label: "Total ≥ 311 dengan TIU ≥ 85", cek: true },
  Disabilitas: { total: 286, tiuMin: 60, label: "Total ≥ 286 dengan TIU ≥ 60", cek: true },
  "Putra/Putri Papua": { total: 286, tiuMin: 60, label: "Total ≥ 286 dengan TIU ≥ 60", cek: true },
};
const JENIS_FORMASI = Object.keys(AMBANG);

const JABAR_2024 = [
  { kursi: 17, jabatan: "Fasilitator Pemerintahan · Dinas Sosial", detail: "Bidang Rehabilitasi Sosial: 9 kursi, 1.253 pelamar, skor min. 416. 8 kursi lain di bidang, UPTD Griya, dan Sekretariat: 4–119 pelamar per lokasi, skor min. 289–382." },
  { kursi: 2, jabatan: "Pranata Humas Ahli Pertama", detail: "Dinas Pendidikan dan BKD: 219 pelamar, skor min. ke SKB 416–429." },
  { kursi: 1, jabatan: "Arsiparis Ahli Pertama · Dinas ESDM", detail: "125 pelamar, skor min. ke SKB 431." },
];

const KEBUTUHAN_DATA = [
  { judul: "Data formasi", sumber: "SSCASN (sscasn.bkn.go.id)", isi: "Instansi, jabatan, jenis formasi, lokasi, kuota, dan daftar jurusan yang diterima persis seperti tertulis di lampiran.", status: "Bisa di-scrape" },
  { judul: "Sebaran formasi", sumber: "Diturunkan dari data formasi", isi: "Rekap per provinsi, jenis instansi, dan jabatan. Ini yang ngisi peta.", status: "Otomatis" },
  { judul: "Pelamar & yang lolos ambang batas", sumber: "SSCASN + rekap SKD instansi", isi: "Buat ngitung keketatan yang jujur: peserta lolos ambang batas dibagi kuota.", status: "Bisa di-scrape" },
  { judul: "Hasil SKD & SKB", sumber: "Pengumuman tiap instansi (PDF)", isi: "Nilai terendah yang lolos ke SKB dan nilai akhir per formasi. Diblok, jadi harus diunduh manual.", status: "Manual" },
  { judul: "Data alumni yang lolos", sumber: "Konsultasi Ratisa + form alumni", isi: "Formasi yang dipilih, skor, tips, dan apakah bersedia dihubungi.", status: "Sebagian ada" },
];

const STATUS_COLOR = {
  "Bisa di-scrape": "text-sky-400 bg-sky-500/10 ring-sky-500/20",
  Otomatis: "text-emerald-400 bg-emerald-500/10 ring-emerald-500/20",
  Manual: "text-rose-400 bg-rose-500/10 ring-rose-500/20",
  "Sebagian ada": "text-amber-400 bg-amber-500/10 ring-amber-500/20",
};

// Keketatan: pakai peserta lolos ambang batas kalau ada, kalau belum ada pakai jumlah pelamar.
const persaingan = (f) =>
  f.lolosPG != null
    ? { nilai: Math.round(f.lolosPG / f.kuota), basis: "lolos ambang" }
    : { nilai: Math.round(f.pelamar / f.kuota), basis: "pelamar" };

// Data contoh untuk scatter SKD vs SKB (generator deterministik).
const PESERTA = (() => {
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: 140 }, () => {
    const skd = Math.round(325 + rnd() * 125);
    const skb = Math.round(Math.min(85, Math.max(8, 45 + (skd - 325) * 0.12 + (rnd() - 0.5) * 34)));
    const nilaiAkhir = (skd / 550) * 100 * 0.4 + skb * 0.6;
    return { skd, skb, lolos: nilaiAkhir >= 67 };
  });
})();

function Section({ icon: Icon, title, desc, children, foot }) {
  return (
    <section className="mb-14">
      <div className="mb-5 flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
          <Icon className="h-5 w-5" />
        </div>
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

function Badge({ asli }) {
  return asli ? (
    <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-400 ring-1 ring-emerald-500/20">Data asli</span>
  ) : (
    <span className="rounded bg-stone-800 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-stone-500 ring-1 ring-white/8">Contoh</span>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-stone-900 p-5">
      <p className="text-xs text-stone-500">{label}</p>
      <p className="mt-1 text-2xl font-bold tabular-nums text-stone-100">{value}</p>
    </div>
  );
}

function Pilih({ value, onChange, options, label }) {
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

function SkorInput({ label, value, onChange, hint }) {
  return (
    <label className="block">
      <span className="mb-1 flex justify-between text-xs text-stone-400">
        <span>{label}</span>
        {hint && <span className="text-stone-600">{hint}</span>}
      </span>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-stone-950 px-3 py-2 tabular-nums text-stone-100 focus:border-amber-500/50 focus:outline-none"
      />
    </label>
  );
}

function Peta({ data }) {
  const [hover, setHover] = useState(null);
  const max = Math.max(1, ...Object.values(data));
  const warna = (v) => {
    if (!v) return "#292524";
    const t = Math.sqrt(v / max);
    return `rgba(245,158,11,${(0.22 + t * 0.78).toFixed(2)})`;
  };
  return (
    <div className="relative">
      <svg viewBox={`0 0 ${PETA_W} ${PETA_H}`} className="w-full" role="img" aria-label="Peta sebaran kursi per provinsi">
        {PROVINSI.map((p) => (
          <path
            key={p.nama}
            d={p.d}
            fill={warna(data[p.nama])}
            stroke="#0c0a09"
            strokeWidth="0.8"
            onMouseEnter={() => setHover(p.nama)}
            onMouseLeave={() => setHover(null)}
            className="cursor-default transition-opacity hover:opacity-80"
          >
            <title>{`${p.nama}: ${data[p.nama] || 0} kursi`}</title>
          </path>
        ))}
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
        {hover ? `${hover}: ${data[hover] || 0} kursi` : "Arahkan kursor ke provinsi buat lihat detail"}
      </p>
    </div>
  );
}

function Scatter({ data }) {
  const W = 640, H = 300, P = { l: 40, r: 12, t: 12, b: 34 };
  const x = (v) => P.l + ((v - 320) / (460 - 320)) * (W - P.l - P.r);
  const y = (v) => H - P.b - (v / 100) * (H - P.t - P.b);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Sebaran nilai SKD dan SKB peserta">
      {[0, 25, 50, 75, 100].map((t) => (
        <g key={t}>
          <line x1={P.l} x2={W - P.r} y1={y(t)} y2={y(t)} stroke="rgba(255,255,255,0.06)" />
          <text x={P.l - 6} y={y(t) + 4} textAnchor="end" fontSize="10" fill="#78716c">{t}</text>
        </g>
      ))}
      {[340, 380, 420, 460].map((t) => (
        <text key={t} x={x(t)} y={H - P.b + 16} textAnchor="middle" fontSize="10" fill="#78716c">{t}</text>
      ))}
      <text x={(W + P.l) / 2} y={H - 4} textAnchor="middle" fontSize="10" fill="#a8a29e">Nilai SKD (maks 550)</text>
      {data.map((d, i) =>
        d.lolos ? (
          <circle key={i} cx={x(d.skd)} cy={y(d.skb)} r="4" fill="#f59e0b" fillOpacity="0.85" />
        ) : (
          <circle key={i} cx={x(d.skd)} cy={y(d.skb)} r="3.5" fill="none" stroke="#78716c" strokeWidth="1.3" />
        )
      )}
    </svg>
  );
}

function lolosAmbang(jenis, n) {
  const a = AMBANG[jenis];
  if (a.per) {
    const kurang = ["twk", "tiu", "tkp"].filter((k) => n[k] < a.per[k]);
    return { ok: kurang.length === 0, alasan: kurang.length ? `Belum lolos ambang batas ${kurang.map((k) => k.toUpperCase()).join(", ")}.` : "" };
  }
  const total = n.twk + n.tiu + n.tkp;
  const alasan = [];
  if (total < a.total) alasan.push(`total ${total} masih di bawah ${a.total}`);
  if (n.tiu < a.tiuMin) alasan.push(`TIU ${n.tiu} masih di bawah ${a.tiuMin}`);
  return { ok: alasan.length === 0, alasan: alasan.length ? `Belum lolos ambang batas: ${alasan.join(", ")}.` : "" };
}

export default function CpnsPage() {
  const [q, setQ] = useState("");
  const [tahun, setTahun] = useState("Semua");
  const [jurusan, setJurusan] = useState("Semua");
  const [jenisFormasi, setJenisFormasi] = useState("Semua");
  const [jenisInstansi, setJenisInstansi] = useState("Semua");
  const [provinsi, setProvinsi] = useState("Semua");
  const [hanyaAsli, setHanyaAsli] = useState(false);
  const [sort, setSort] = useState("longgar");
  const [skor, setSkor] = useState({ twk: "", tiu: "", tkp: "" });
  const [jenisKalk, setJenisKalk] = useState("Umum");

  const opsi = (arr, semua) => [{ value: "Semua", label: semua }, ...arr.map((v) => ({ value: String(v), label: String(v) }))];
  const uniq = (fn) => Array.from(new Set(FORMASI.flatMap(fn))).sort();

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return FORMASI.filter(
      (f) =>
        (!hanyaAsli || f.asli) &&
        (tahun === "Semua" || String(f.tahun) === tahun) &&
        (jurusan === "Semua" || f.jurusan.includes(jurusan)) &&
        (jenisFormasi === "Semua" || f.jenisFormasi === jenisFormasi) &&
        (jenisInstansi === "Semua" || f.jenisInstansi === jenisInstansi) &&
        (provinsi === "Semua" || f.provinsi === provinsi) &&
        (!term || `${f.instansi} ${f.jabatan}`.toLowerCase().includes(term))
    ).sort((a, b) =>
      sort === "longgar"
        ? persaingan(a).nilai - persaingan(b).nilai
        : sort === "kuota"
        ? b.kuota - a.kuota
        : (a.skdMin ?? 999) - (b.skdMin ?? 999)
    );
  }, [q, tahun, jurusan, jenisFormasi, jenisInstansi, provinsi, hanyaAsli, sort]);

  // Label keketatan relatif terhadap formasi yang sedang tampil (sepertiga terbawah / tengah / teratas).
  const tingkat = useMemo(() => {
    const v = rows.map((f) => persaingan(f).nilai).sort((a, b) => a - b);
    const t1 = v[Math.floor(v.length / 3)] ?? 0;
    const t2 = v[Math.floor((2 * v.length) / 3)] ?? 0;
    return (n) =>
      v.length < 3
        ? null
        : n < t1
        ? { label: "Relatif longgar", cls: "text-emerald-400 bg-emerald-500/10 ring-emerald-500/20" }
        : n < t2
        ? { label: "Sedang", cls: "text-amber-400 bg-amber-500/10 ring-amber-500/20" }
        : { label: "Relatif ketat", cls: "text-rose-400 bg-rose-500/10 ring-rose-500/20" };
  }, [rows]);

  const kursiPerProvinsi = useMemo(() => {
    const m = {};
    rows.forEach((f) => (m[f.provinsi] = (m[f.provinsi] || 0) + f.kuota));
    return m;
  }, [rows]);

  const totalKuota = rows.reduce((s, f) => s + f.kuota, 0);
  const totalPelamar = rows.reduce((s, f) => s + f.pelamar, 0);
  const jmlAsli = rows.filter((f) => f.asli).length;

  const n = { twk: Number(skor.twk), tiu: Number(skor.tiu), tkp: Number(skor.tkp) };
  const terisi = skor.twk !== "" && skor.tiu !== "" && skor.tkp !== "";
  const total = n.twk + n.tiu + n.tkp;
  const cekAmbang = terisi ? lolosAmbang(jenisKalk, n) : null;
  const jangkauan =
    cekAmbang?.ok
      ? FORMASI.filter(
          (f) =>
            f.jenisFormasi === jenisKalk &&
            f.skdMin != null &&
            total >= f.skdMin &&
            (!hanyaAsli || f.asli) &&
            (jurusan === "Semua" || f.jurusan.includes(jurusan))
        ).sort((a, b) => persaingan(a).nilai - persaingan(b).nilai)
      : [];
  const ambangKalk = AMBANG[jenisKalk];

  return (
    <div className="min-h-screen bg-stone-950 pt-16">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/8 px-6 py-16 text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />
        <div className="relative mx-auto max-w-2xl">
          <span className="mb-4 inline-block rounded-full bg-amber-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400">
            IKA IKOM UPI
          </span>
          <h1 className="mb-4 text-4xl font-bold text-stone-100"><span className="text-amber-400">KOM</span>pas ASN</h1>
          <p className="text-base leading-relaxed text-stone-400">
            Penunjuk arah alumni Ilmu Komunikasi UPI milih formasi CPNS pakai data: jurusan yang
            diterima, kuota, persaingan, dan nilai SKD yang biasanya lolos ke SKB.
          </p>
          <p className="mt-4 text-xs text-stone-600">Diperbarui {DIPERBARUI}</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-10 flex items-start gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/5 p-4 text-sm text-amber-200/90">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
          <p>
            <strong>Prototipe.</strong> Baris bertanda <Badge asli /> diambil dari rekap resmi Pemprov Jawa Barat 2024.
            Baris bertanda <Badge /> cuma contoh buat nunjukin fitur, dan nama instansinya sengaja disamarkan.
          </p>
        </div>

        {/* Filter global */}
        <div className="mb-6 rounded-2xl border border-white/8 bg-stone-900/60 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-stone-300">
            <GraduationCap className="h-4 w-4 text-amber-400" /> Jurusanmu bisa masuk formasi apa aja?
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <Pilih label="Jurusan" value={jurusan} onChange={setJurusan} options={opsi(uniq((f) => f.jurusan), "Semua jurusan")} />
            <Pilih label="Tahun" value={tahun} onChange={setTahun} options={opsi(uniq((f) => [f.tahun]).reverse(), "Semua tahun")} />
            <Pilih label="Jenis formasi" value={jenisFormasi} onChange={setJenisFormasi} options={opsi(JENIS_FORMASI, "Semua jenis formasi")} />
            <Pilih label="Jenis instansi" value={jenisInstansi} onChange={setJenisInstansi} options={[{ value: "Semua", label: "Pusat & daerah" }, { value: "Pusat", label: "Instansi pusat" }, { value: "Daerah", label: "Instansi daerah" }]} />
            <Pilih label="Provinsi" value={provinsi} onChange={setProvinsi} options={opsi(uniq((f) => [f.provinsi]), "Semua provinsi")} />
            <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-stone-900 px-3 py-2 text-sm text-stone-300">
              <input type="checkbox" checked={hanyaAsli} onChange={(e) => setHanyaAsli(e.target.checked)} className="accent-amber-500" />
              Tampilkan data asli saja
            </label>
          </div>
          <p className="mt-3 text-xs text-stone-500">
            Nama jurusan di ijazah harus persis sama dengan yang tertulis di lampiran formasi. "Ilmu Komunikasi" dan "Komunikasi" bisa dianggap beda.
          </p>
        </div>

        <div className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Formasi tampil" value={rows.length} />
          <Stat label="Total kursi" value={totalKuota} />
          <Stat label="Total pelamar" value={totalPelamar.toLocaleString("id-ID")} />
          <Stat label="Baris data asli" value={`${jmlAsli}/${rows.length}`} />
        </div>

        {/* Cari formasi */}
        <Section
          icon={Search}
          title="Daftar formasi"
          desc="Persaingan = peserta lolos ambang batas per kursi. Kalau datanya belum ada, sementara pakai pelamar per kursi. Label longgar/ketat dibandingkan dengan formasi lain yang sedang tampil."
          foot={`Sumber data asli: ${SUMBER_JABAR}. Diperbarui ${DIPERBARUI}.`}
        >
          <div className="mb-3 grid gap-2 sm:grid-cols-[1fr_220px]">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari instansi atau jabatan"
              className="rounded-lg border border-white/10 bg-stone-900 px-3 py-2 text-sm text-stone-100 placeholder:text-stone-600 focus:border-amber-500/50 focus:outline-none"
            />
            <Pilih label="Urutkan" value={sort} onChange={setSort} options={[{ value: "longgar", label: "Urut: paling longgar" }, { value: "kuota", label: "Urut: kuota terbanyak" }, { value: "skd", label: "Urut: skor min. ke SKB terendah" }]} />
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/8">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-stone-900 text-xs text-stone-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Instansi & jabatan</th>
                  <th className="px-4 py-3 text-right font-medium">Kuota</th>
                  <th className="px-4 py-3 text-right font-medium">Pelamar</th>
                  <th className="px-4 py-3 text-right font-medium">Persaingan per kursi</th>
                  <th className="px-4 py-3 text-right font-medium">Skor min. ke SKB</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rows.map((f) => {
                  const p = persaingan(f);
                  const k = tingkat(p.nilai);
                  return (
                    <tr key={f.id} className="align-top hover:bg-white/[0.02]">
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-medium text-stone-200">{f.jabatan}</p>
                          <Badge asli={f.asli} />
                        </div>
                        <p className="mt-0.5 text-xs text-stone-400">{f.instansi}</p>
                        <p className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-stone-500">
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {f.provinsi}</span>
                          <span>· {f.tahun}</span>
                          <span>· {f.jenisFormasi}</span>
                          <span>· {f.jurusan.join(", ")}</span>
                        </p>
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-stone-300">{f.kuota}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-stone-300">{f.pelamar.toLocaleString("id-ID")}</td>
                      <td className="px-4 py-3 text-right">
                        <span className="tabular-nums text-stone-200">{p.nilai}</span>
                        <p className="text-[11px] text-stone-600">dari {p.basis}</p>
                        {k && <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${k.cls}`}>{k.label}</span>}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-stone-300">{f.skdMin ?? <span className="text-stone-600">belum ada</span>}</td>
                    </tr>
                  );
                })}
                {rows.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-10 text-center text-stone-500">Nggak ada formasi yang cocok sama filternya.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Peta */}
        <Section
          icon={Building2}
          title="Peta sebaran kursi per provinsi"
          desc="Ikut filter di atas. Makin pekat warnanya, makin banyak kursinya. Skalanya akar kuadrat biar Jakarta nggak bikin provinsi lain kelihatan kosong."
          foot="Peta dasar 34 provinsi (BAKOSURTANAL 1:250.000), belum memuat provinsi hasil pemekaran 2022; formasi di provinsi baru dihitung ke provinsi induknya."
        >
          <div className="rounded-2xl border border-white/8 bg-stone-900 p-4">
            <Peta data={kursiPerProvinsi} />
          </div>
        </Section>

        {/* Kalkulator */}
        <Section
          icon={Calculator}
          title="Cek jangkauan dari skor tryout"
          desc="Masukin skor SKD tryout. Dicek dulu ke ambang batas, lalu dibandingkan dengan skor terendah yang lolos ke SKB di tiap formasi. Ikut filter jurusan di atas."
        >
          <div className="grid gap-6 rounded-2xl border border-white/8 bg-stone-900 p-5 md:grid-cols-[240px_1fr]">
            <div className="space-y-3">
              <Pilih label="Jenis formasi" value={jenisKalk} onChange={setJenisKalk} options={JENIS_FORMASI.map((j) => ({ value: j, label: `Formasi ${j}` }))} />
              <p className="text-xs text-stone-500">
                Ambang: {ambangKalk.label}
                {ambangKalk.cek && <span className="block text-amber-400/80">Angka sementara, cek ulang ke Kepmenpan-RB.</span>}
              </p>
              <SkorInput label="TWK" value={skor.twk} hint={ambangKalk.per && `min ${ambangKalk.per.twk}`} onChange={(v) => setSkor((s) => ({ ...s, twk: v }))} />
              <SkorInput label="TIU" value={skor.tiu} hint={ambangKalk.per ? `min ${ambangKalk.per.tiu}` : `min ${ambangKalk.tiuMin}`} onChange={(v) => setSkor((s) => ({ ...s, tiu: v }))} />
              <SkorInput label="TKP" value={skor.tkp} hint={ambangKalk.per && `min ${ambangKalk.per.tkp}`} onChange={(v) => setSkor((s) => ({ ...s, tkp: v }))} />
              {terisi && <p className="pt-1 text-sm text-stone-400">Total: <span className="font-semibold tabular-nums text-stone-100">{total}</span></p>}
            </div>
            <div>
              {!terisi ? (
                <p className="text-sm text-stone-500">Isi ketiga skor buat lihat formasi yang masuk jangkauan SKB.</p>
              ) : !cekAmbang.ok ? (
                <div className="flex items-start gap-2 text-sm text-rose-300">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>{cekAmbang.alasan} Fokus naikin bagian itu dulu.</p>
                </div>
              ) : jangkauan.length === 0 ? (
                <p className="text-sm text-stone-400">Lolos ambang batas, tapi total {total} masih di bawah skor terendah yang lolos ke SKB di formasi {jenisKalk} yang ada datanya.</p>
              ) : (
                <>
                  <p className="mb-3 flex items-start gap-2 text-sm text-emerald-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    {jangkauan.length} formasi pernah meloloskan skor setara atau di bawah kamu ke tahap SKB:
                  </p>
                  <ul className="space-y-2">
                    {jangkauan.map((f) => (
                      <li key={f.id} className="flex items-center justify-between gap-3 rounded-lg bg-stone-950 px-3 py-2 text-sm">
                        <span className="text-stone-300">
                          {f.jabatan} <span className="text-stone-500">· {f.instansi} · {f.tahun}</span> <Badge asli={f.asli} />
                        </span>
                        <span className="shrink-0 text-xs tabular-nums text-stone-500">+{total - f.skdMin} poin</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-stone-500">
                    Ini baru jangkauan ke tahap SKB, belum lolos akhir. Nilai akhir dihitung dari SKD 40% dan SKB 60%, jadi persiapan SKB sama pentingnya.
                  </p>
                </>
              )}
            </div>
          </div>
        </Section>

        {/* Studi kasus Jabar */}
        <Section
          icon={Target}
          title="Studi kasus: Pemprov Jawa Barat 2024"
          desc="Data asli. Jabatan untuk S-1 Ilmu Komunikasi bukan cuma humas: ada 20 kursi."
          foot={`Sumber: ${SUMBER_JABAR}. Jumlah jabatan adalah batas bawah karena sebagian daftar jurusan di rekap terpotong.`}
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
            <div className="grid gap-4 rounded-2xl bg-emerald-900/40 p-5 ring-1 ring-emerald-500/20 sm:grid-cols-2">
              <div>
                <p className="text-2xl font-bold text-emerald-300">≥ 420</p>
                <p className="text-sm text-stone-300">Target skor SKD buat formasi S-1 favorit (maks. 550).</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-100">Lirik unit yang sepi</p>
                <p className="text-sm text-stone-300">UPTD dan unit di kabupaten yang jauh sering cuma diperebutkan belasan orang.</p>
              </div>
            </div>
          </div>
        </Section>

        {/* SKD vs SKB */}
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
            <Scatter data={PESERTA} />
            <p className="mt-2 text-center text-xs text-stone-600">Sumbu tegak: nilai SKB (skala 100)</p>
          </div>
        </Section>

        {/* Tanya alumni */}
        <Section icon={MessageCircle} title="Tanya alumni yang udah lolos" desc="Nyambung ke konsultasi Ratisa: cerita formasi yang dipilih, skor, dan strategi belajar.">
          <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-stone-500">
            <Users className="mx-auto mb-3 h-8 w-8 text-stone-700" />
            Daftar alumni ASN yang bersedia dihubungi bakal muncul di sini.
          </div>
        </Section>

        {/* Kebutuhan data */}
        <Section icon={Database} title="Data yang dibutuhkan" desc="Bahan diskusi: apa yang harus dikumpulin biar dashboard ini jalan penuh pakai data asli.">
          <div className="grid gap-3 sm:grid-cols-2">
            {KEBUTUHAN_DATA.map((d) => (
              <div key={d.judul} className="rounded-2xl border border-white/8 bg-stone-900 p-5">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-stone-100">{d.judul}</h3>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${STATUS_COLOR[d.status]}`}>{d.status}</span>
                </div>
                <p className="text-sm text-stone-400">{d.isi}</p>
                <p className="mt-2 text-xs text-stone-600">Sumber: {d.sumber}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
