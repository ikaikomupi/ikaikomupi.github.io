// Cek format public/data/cpns/formasi.json. Jalankan: npm run cpns:cek
import fs from "node:fs";
import { PROVINSI } from "../../src/data/petaProvinsi.js";

const file = new URL("../../public/data/cpns/formasi.json", import.meta.url);
const data = JSON.parse(fs.readFileSync(file, "utf8"));
const PROV = new Set(PROVINSI.map((p) => p.nama));
const ENUM = {
  jenis_instansi: ["Pusat", "Daerah"],
  kategori: ["Primer", "Sekunder", "S-2 ke atas"],
  pendidikan: ["S-1", "S-2"],
  jenis_formasi: ["Umum", "Cumlaude", "Disabilitas", "Putra/Putri Papua"],
};
const WAJIB = ["id", "asli", "tahun", "instansi", "jenis_instansi", "jabatan", "kategori", "pendidikan", "jurusan", "jenis_formasi", "kuota", "sumber"];
const ANGKA = ["tahun", "kuota", "pelamar", "peserta", "lolos_pg", "skd_min", "kursi_terisi", "peserta_skb", "gagal_psikotes", "nilai_akhir_median"];

const err = [], warn = [];
if (!Array.isArray(data.formasi)) err.push("Field `formasi` harus array.");
if (!data.diperbarui) warn.push("Field `diperbarui` kosong.");
const ids = new Set();
(data.formasi || []).forEach((f, i) => {
  const at = `baris ${i} (${f.id ?? "tanpa id"})`;
  WAJIB.forEach((k) => (f[k] === undefined || f[k] === "") && err.push(`${at}: field wajib \`${k}\` kosong`));
  ANGKA.forEach((k) => f[k] != null && typeof f[k] !== "number" && err.push(`${at}: \`${k}\` harus angka, bukan ${JSON.stringify(f[k])}`));
  Object.entries(ENUM).forEach(([k, v]) => f[k] != null && !v.includes(f[k]) && err.push(`${at}: \`${k}\` = ${JSON.stringify(f[k])}, harus salah satu dari ${v.join(" / ")}`));
  if (ids.has(f.id)) err.push(`${at}: id dobel`);
  ids.add(f.id);
  if (f.pelamar == null && f.peserta == null && f.lolos_pg == null) err.push(`${at}: isi minimal salah satu dari pelamar / peserta / lolos_pg`);
  if (f.provinsi != null && !PROV.has(f.provinsi)) warn.push(`${at}: provinsi "${f.provinsi}" tidak ada di peta, akan dihitung "belum terpetakan"`);
  if (!Array.isArray(f.jurusan) || !f.jurusan.length) err.push(`${at}: \`jurusan\` harus array berisi minimal 1 nama`);
  if (f.kuota != null && f.kuota < 1) err.push(`${at}: kuota harus ≥ 1`);
  if (f.kursi_terisi != null && f.kursi_terisi > f.kuota) err.push(`${at}: kursi_terisi lebih besar dari kuota`);
  if (f.skd_min != null && (f.skd_min < 0 || f.skd_min > 550)) err.push(`${at}: skd_min di luar 0–550`);
  if (/terampil/i.test(f.jabatan || "") || f.pendidikan === "D-III") warn.push(`${at}: jabatan terampil/D-III sebaiknya tidak dimasukkan`);
});

const n = data.formasi?.length ?? 0;
const asli = (data.formasi || []).filter((f) => f.asli).length;
console.log(`${n} formasi (${asli} data asli, ${n - asli} contoh), tahun: ${[...new Set((data.formasi || []).map((f) => f.tahun))].sort().join(", ")}`);
warn.forEach((w) => console.log("PERINGATAN", w));
err.forEach((e) => console.log("ERROR", e));
if (err.length) {
  console.log(`\n${err.length} error. Perbaiki dulu sebelum push.`);
  process.exit(1);
}
console.log("Format data OK.");
