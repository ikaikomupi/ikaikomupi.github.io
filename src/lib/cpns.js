import { useEffect, useState } from "react";

// ---------- Konfigurasi form "Lapor Hasil" ----------
// URL Web App Google Apps Script khusus CPNS (lihat scripts/cpns/apps-script.gs).
// Selama kosong, form tampil tapi tombol kirim dinonaktifkan.
export const CPNS_FORM_URL = "";
// Spreadsheet PUBLIK yang berisi tab "cpns_publik" (tanpa nama/kontak). Dibaca lewat opensheet.
export const CPNS_PUBLIC_SHEET_ID = "1mFUEZRRmr6cnmQ7Cbqo5WePQb9cuzKgTx7c6MIhw07w";
export const CPNS_PUBLIC_TAB = "cpns_publik";
// Statistik alumni hanya ditampilkan kalau satu kelompok berisi minimal sekian laporan.
export const MIN_LAPORAN = 3;

export const KATEGORI = [
  { id: "Primer", label: "Primer", desc: "Jabatan humas" },
  { id: "Sekunder", label: "Sekunder", desc: "Jabatan campuran: protokol, fasilitator, formasi semua jurusan" },
  { id: "S-2 ke atas", label: "S-2 ke atas", desc: "Dosen, widyaiswara, peneliti" },
];

// Ambang batas SKD 2024 (Kepmenpan-RB No. 321 Tahun 2024).
// Formasi Umum sudah pasti; formasi khusus masih angka sementara, wajib dicek ulang.
export const AMBANG = {
  Umum: { per: { twk: 65, tiu: 80, tkp: 166 }, label: "TWK 65 · TIU 80 · TKP 166", cek: false },
  Cumlaude: { total: 311, tiuMin: 85, label: "Total ≥ 311 dengan TIU ≥ 85", cek: true },
  Disabilitas: { total: 286, tiuMin: 60, label: "Total ≥ 286 dengan TIU ≥ 60", cek: true },
  "Putra/Putri Papua": { total: 286, tiuMin: 60, label: "Total ≥ 286 dengan TIU ≥ 60", cek: true },
};
export const JENIS_FORMASI = Object.keys(AMBANG);

// ---------- Data ----------
let cache = null;
async function load() {
  if (!cache) {
    cache = Promise.all([
      fetch("/data/cpns/formasi.json").then((r) => r.json()),
      fetch("/data/cpns/referensi.json").then((r) => r.json()).catch(() => ({ instansi: {}, provinsi: {} })),
    ]).catch((e) => {
      cache = null;
      throw e;
    });
  }
  return cache;
}

export function useCpnsData() {
  const [state, setState] = useState({ loading: true, error: null, formasi: [], referensi: { instansi: {}, provinsi: {} }, diperbarui: "" });
  useEffect(() => {
    let alive = true;
    load()
      .then(([f, ref]) => alive && setState({ loading: false, error: null, formasi: f.formasi, referensi: ref, diperbarui: f.diperbarui }))
      .catch(() => alive && setState((s) => ({ ...s, loading: false, error: "Data formasi gagal dimuat. Coba muat ulang halaman." })));
    return () => {
      alive = false;
    };
  }, []);
  return state;
}

export function useLaporanAlumni() {
  const [state, setState] = useState({ loading: true, rows: [], aktif: Boolean(CPNS_PUBLIC_SHEET_ID) });
  useEffect(() => {
    if (!CPNS_PUBLIC_SHEET_ID) return setState({ loading: false, rows: [], aktif: false });
    let alive = true;
    fetch(`https://opensheet.elk.sh/${CPNS_PUBLIC_SHEET_ID}/${CPNS_PUBLIC_TAB}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((rows) => alive && setState({ loading: false, rows: Array.isArray(rows) ? rows.filter((r) => r.boleh_statistik === "ya") : [], aktif: true }))
      .catch(() => alive && setState({ loading: false, rows: [], aktif: true }));
    return () => {
      alive = false;
    };
  }, []);
  return state;
}

export const tahunTerbaru = (formasi) => Math.max(...formasi.map((f) => f.tahun));

export const formatTanggal = (iso) =>
  iso ? new Date(iso + "T00:00:00").toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "";

// ---------- Perhitungan ----------
// Persaingan per kursi. Prioritas dasar hitung: lolos ambang batas → peserta hadir SKD → pelamar.
// Nilai di bawah 1 artinya kursinya lebih banyak dari pesaingnya.
export const persaingan = (f) => {
  const [n, basis] =
    f.lolos_pg != null ? [f.lolos_pg, "lolos ambang"] : f.peserta != null ? [f.peserta, "peserta"] : [f.pelamar, "pelamar"];
  return { nilai: n / f.kuota, basis };
};

export const fmtRasio = (v) =>
  v < 10 ? v.toLocaleString("id-ID", { maximumFractionDigits: 2 }) : Math.round(v).toLocaleString("id-ID");

export const BELUM_TERPETAKAN = "Belum terpetakan";
export const namaProvinsi = (f) => f.provinsi || BELUM_TERPETAKAN;

// Formasi dianggap "sama" antar tahun kalau instansi, unit, jabatan, dan jenis formasinya sama.
export const kunci = (f) => [f.instansi, f.unit || "", f.jabatan, f.jenis_formasi].join("|").toLowerCase();

export function riwayat(semua, f) {
  const k = kunci(f);
  return semua.filter((x) => kunci(x) === k).sort((a, b) => a.tahun - b.tahun);
}

export function rentang(hist) {
  const v = hist.map((h) => h.skd_min).filter((x) => x != null).sort((a, b) => a - b);
  if (!v.length) return null;
  const mid = Math.floor(v.length / 2);
  const median = v.length % 2 ? v[mid] : Math.round((v[mid - 1] + v[mid]) / 2);
  return { min: v[0], max: v[v.length - 1], median, n: v.length };
}

export const teksRentang = (r) => (!r ? "belum ada" : r.n === 1 ? `${r.min} (1 tahun)` : `${r.min}–${r.max} (${r.n} tahun)`);

// Heuristik kategori peluang ke tahap SKB. Dijelaskan di halaman Metodologi.
export const MARGIN = { amanMulti: 5, spekMulti: 10, amanSatu: 20, spekSatu: 15 };
export function peluang(total, r) {
  if (!r) return null;
  if (r.n >= 2) {
    if (total >= r.max + MARGIN.amanMulti) return LABEL.aman;
    if (total >= r.median) return LABEL.realistis;
    if (total >= r.min - MARGIN.spekMulti) return LABEL.spekulatif;
    return null;
  }
  if (total >= r.min + MARGIN.amanSatu) return LABEL.aman;
  if (total >= r.min) return LABEL.realistis;
  if (total >= r.min - MARGIN.spekSatu) return LABEL.spekulatif;
  return null;
}
export const LABEL = {
  aman: { id: "aman", urut: 0, label: "Aman", cls: "text-emerald-400 bg-emerald-500/10 ring-emerald-500/20" },
  realistis: { id: "realistis", urut: 1, label: "Realistis", cls: "text-amber-400 bg-amber-500/10 ring-amber-500/20" },
  spekulatif: { id: "spekulatif", urut: 2, label: "Spekulatif", cls: "text-rose-400 bg-rose-500/10 ring-rose-500/20" },
};

export function lolosAmbang(jenis, n) {
  const a = AMBANG[jenis];
  if (a.per) {
    const kurang = ["twk", "tiu", "tkp"].filter((k) => n[k] < a.per[k]);
    return { ok: !kurang.length, alasan: kurang.length ? `Belum lolos ambang batas ${kurang.map((k) => k.toUpperCase()).join(", ")}.` : "" };
  }
  const total = n.twk + n.tiu + n.tkp;
  const alasan = [];
  if (total < a.total) alasan.push(`total ${total} masih di bawah ${a.total}`);
  if (n.tiu < a.tiuMin) alasan.push(`TIU ${n.tiu} masih di bawah ${a.tiuMin}`);
  return { ok: !alasan.length, alasan: alasan.length ? `Belum lolos ambang batas: ${alasan.join(", ")}.` : "" };
}

// Posisi persaingan relatif: persentase formasi lain yang lebih ketat.
export function persentilLonggar(f, daftar) {
  const v = persaingan(f).nilai;
  const lebihKetat = daftar.filter((x) => persaingan(x).nilai > v).length;
  return daftar.length > 1 ? Math.round((lebihKetat / (daftar.length - 1)) * 100) : null;
}

// ---------- Temuan otomatis dari pola data ----------
// Field opsional per formasi: kursi_terisi, peserta_skb, gagal_psikotes, nilai_akhir_median.
export const REGION = {
  Jawa: ["DKI Jakarta", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur", "Banten"],
  Sumatera: ["Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Kepulauan Riau", "Jambi", "Sumatera Selatan", "Kepulauan Bangka Belitung", "Bengkulu", "Lampung"],
  Kalimantan: ["Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara"],
  Sulawesi: ["Sulawesi Utara", "Gorontalo", "Sulawesi Tengah", "Sulawesi Barat", "Sulawesi Selatan", "Sulawesi Tenggara"],
  "Bali–Nusa Tenggara": ["Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur"],
  "Maluku–Papua": ["Maluku", "Maluku Utara", "Papua", "Papua Barat"],
};
export const regionOf = (prov) => Object.keys(REGION).find((r) => REGION[r].includes(prov)) || null;

const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
const med = (v) => {
  const s = v.filter((x) => x != null).sort((a, b) => a - b);
  if (!s.length) return null;
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

function kosongPer(rows, keyFn) {
  const m = {};
  rows.forEach((f) => {
    const k = keyFn(f);
    if (!k) return;
    const x = (m[k] ||= { kursi: 0, kosong: 0, nilai: [] });
    x.kursi += f.kuota;
    x.kosong += Math.max(0, f.kuota - f.kursi_terisi);
    if (f.nilai_akhir_median != null) x.nilai.push(f.nilai_akhir_median);
  });
  return Object.entries(m).map(([k, v]) => ({ k, kursi: v.kursi, kosongPct: pct(v.kosong, v.kursi), nilai: med(v.nilai) }));
}

export function temuan(rows) {
  const out = [];
  const adaIsi = rows.filter((f) => f.kursi_terisi != null);
  if (adaIsi.length >= 5) {
    const reg = kosongPer(adaIsi, (f) => regionOf(f.provinsi)).sort((a, b) => b.kosongPct - a.kosongPct);
    const jawa = reg.find((r) => r.k === "Jawa");
    const sepi = reg.filter((r) => r.k !== "Jawa" && r.kosongPct >= 30);
    if (sepi.length) {
      out.push({
        judul: "Luar Jawa banyak kursi kosong",
        isi: `${sepi.map((r) => `${r.k}: ${r.kursi} kursi, ${r.kosongPct}% kosong`).join(" · ")}${jawa ? `. Bandingkan Jawa: ${jawa.kosongPct}% kosong` : ""}.`,
        saran: "Kalau siap ditempatkan di luar Jawa, peluangmu jauh lebih besar. Banyak kursi di sana kosong karena nggak ada pelamar yang memenuhi syarat.",
      });
    }
    const pusat = adaIsi.filter((f) => f.jenis_instansi === "Pusat");
    const kantorPusat = kosongPer(pusat.filter((f) => f.provinsi === "DKI Jakarta"), () => "x")[0];
    const balai = kosongPer(pusat.filter((f) => f.provinsi && f.provinsi !== "DKI Jakarta"), () => "x")[0];
    if (kantorPusat && balai && balai.kosongPct - kantorPusat.kosongPct >= 15) {
      out.push({
        judul: "Kantor pusat ketat, unit daerah longgar",
        isi: `Di K/L, unit di Jakarta ${kantorPusat.kosongPct}% kosong${kantorPusat.nilai ? ` dengan median nilai akhir pemenang ${kantorPusat.nilai.toFixed(1)}` : ""}. Unit/balai di daerah ${balai.kosongPct}% kosong${balai.nilai ? ` dengan median ${balai.nilai.toFixed(1)}` : ""}.`,
        saran: "Kalau incaranmu kementerian, lirik balai atau kantor wilayahnya di daerah. Nilai yang dibutuhkan biasanya lebih rendah.",
      });
    }
  }
  const adaPsi = rows.filter((f) => f.gagal_psikotes != null && f.peserta_skb);
  if (adaPsi.length >= 3) {
    const gagal = adaPsi.reduce((s, f) => s + f.gagal_psikotes, 0);
    const ikut = adaPsi.reduce((s, f) => s + f.peserta_skb, 0);
    if (pct(gagal, ikut) >= 20) {
      out.push({
        judul: "Psikotes jadi penyaring besar",
        isi: `${pct(gagal, ikut)}% peserta SKB di formasi yang ada datanya gugur di psikotes.`,
        saran: "Latih psikotes sejak awal. Di banyak unit, SKD dan SKB pas-pasan pun cukup asal lolos psikotes.",
      });
    }
  }
  const satuKursi = rows.filter((f) => f.kuota === 1).length;
  if (rows.length >= 5 && pct(satuKursi, rows.length) >= 40) {
    out.push({
      judul: "Banyak formasi cuma 1 kursi",
      isi: `${pct(satuKursi, rows.length)}% formasi di daftar ini cuma membuka 1 kursi.`,
      saran: "Di formasi 1 kursi, satu pesaing bernilai tinggi bisa langsung menentukan. Cek juga riwayat skornya sebelum memilih.",
    });
  }
  return out;
}

export const infoKosong = (f) =>
  f.kursi_terisi != null && f.kursi_terisi < f.kuota ? `${f.kuota - f.kursi_terisi} dari ${f.kuota} kursi kosong di seleksi ${f.tahun}` : null;
