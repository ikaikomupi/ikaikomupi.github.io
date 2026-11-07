import { BookMarked, Calculator, Database, AlertTriangle, ShieldCheck } from "lucide-react";
import { AMBANG, MARGIN, MIN_LAPORAN, KATEGORI } from "../../lib/cpns";
import { Section } from "./ui";

const SUMBER = [
  { judul: "Data formasi", sumber: "SSCASN (sscasn.bkn.go.id)", isi: "Instansi, unit, jabatan, jenis formasi, lokasi, kuota, dan daftar jurusan yang diterima.", status: "Scraping" },
  { judul: "Pelamar, peserta, dan yang lolos ambang", sumber: "SSCASN + rekap SKD instansi", isi: "Dasar hitung persaingan per kursi.", status: "Scraping" },
  { judul: "Hasil SKD & SKB", sumber: "Pengumuman tiap instansi (PDF)", isi: "Skor terendah ke SKB, nilai akhir pemenang, kursi terisi, peserta gugur psikotes. Diunduh manual.", status: "Manual" },
  { judul: "Laporan alumni", sumber: "Form Lapor Hasil di KOMpas ASN", isi: "Formasi yang dipilih, skor, hasil, dan tips dari alumni Ikom UPI.", status: "Form" },
];

function Def({ istilah, children }) {
  return (
    <div className="border-b border-white/6 py-3 last:border-0">
      <dt className="font-semibold text-stone-100">{istilah}</dt>
      <dd className="mt-1 text-sm text-stone-400">{children}</dd>
    </div>
  );
}

export default function Metodologi() {
  return (
    <>
      <Section icon={BookMarked} title="Definisi">
        <dl className="rounded-2xl border border-white/8 bg-stone-900 px-5">
          <Def istilah="Kategori jabatan">
            {KATEGORI.map((k) => `${k.label}: ${k.desc.toLowerCase()}`).join(". ")}. Semua formasi menerima S-1 Ilmu Komunikasi, kecuali kategori S-2 ke atas yang mensyaratkan S-2. Jabatan terampil (D-III) tidak dimasukkan.
          </Def>
          <Def istilah="Persaingan per kursi">
            Jumlah pesaing dibagi kuota. Dasar hitungnya dipilih dari yang paling akurat yang tersedia: peserta lolos ambang batas, lalu peserta hadir SKD, lalu pelamar. Nilai di bawah 1 berarti kursinya lebih banyak dari pesaing.
          </Def>
          <Def istilah="Skor min. ke SKB">Skor SKD terendah yang masih lolos ke tahap SKB di formasi itu. Ini bukan syarat lolos akhir.</Def>
          <Def istilah="Rentang skor">
            Skor min. ke SKB dari semua tahun yang ada datanya untuk formasi yang sama (instansi, unit, jabatan, dan jenis formasi sama).
          </Def>
          <Def istilah="Kursi kosong">Kuota dikurangi kursi yang terisi setelah pengumuman akhir. Kursi bisa kosong karena tidak ada pelamar atau semua peserta gugur, misalnya di psikotes.</Def>
          <Def istilah="Nilai akhir">Integrasi SKD 40% dan SKB 60%.</Def>
          <Def istilah="Jawa vs luar Jawa">Jawa = DKI Jakarta, Jawa Barat, Jawa Tengah, DI Yogyakarta, Jawa Timur, Banten. Unit yang lokasinya belum terpetakan ke provinsi dihitung terpisah.</Def>
        </dl>
      </Section>

      <Section icon={Calculator} title="Cara menghitung rekomendasi" desc="Ini heuristik sederhana yang bisa diperiksa siapa saja, bukan model statistik.">
        <div className="space-y-3 rounded-2xl border border-white/8 bg-stone-900 p-5 text-sm text-stone-300">
          <p>
            <strong className="text-stone-100">1. Ambang batas.</strong> Skor dicek ke ambang SKD tiap jenis formasi.{" "}
            {Object.entries(AMBANG).map(([k, a]) => `${k}: ${a.label}${a.cek ? " (sementara)" : ""}`).join(" · ")}.
          </p>
          <p><strong className="text-stone-100">2. Rentang.</strong> Untuk tiap formasi seleksi terbaru, dihitung rentang skor min. ke SKB dari tahun-tahun sebelumnya.</p>
          <div>
            <p><strong className="text-stone-100">3. Label peluang ke SKB.</strong></p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-stone-400">
              <li>Data ≥ 2 tahun. Aman: skor ≥ batas atas + {MARGIN.amanMulti}. Realistis: skor ≥ median. Spekulatif: skor ≥ batas bawah − {MARGIN.spekMulti}.</li>
              <li>Data 1 tahun (lebih tidak pasti, jadi marginnya lebih lebar). Aman: skor ≥ nilai + {MARGIN.amanSatu}. Realistis: skor ≥ nilai. Spekulatif: skor ≥ nilai − {MARGIN.spekSatu}.</li>
              <li>Di bawah itu formasi tidak ditampilkan.</li>
            </ul>
          </div>
          <p><strong className="text-stone-100">4. Urutan.</strong> Aman → Realistis → Spekulatif, lalu persaingan per kursi paling longgar.</p>
          <p>
            <strong className="text-stone-100">5. Temuan otomatis.</strong> Muncul kalau polanya cukup kuat di data: misalnya luar Jawa ≥ 30% kursi kosong, unit daerah ≥ 15 poin
            persen lebih kosong dari kantor pusat, atau ≥ 20% peserta SKB gugur psikotes.
          </p>
        </div>
      </Section>

      <Section icon={Database} title="Sumber data">
        <div className="grid gap-3 sm:grid-cols-2">
          {SUMBER.map((d) => (
            <div key={d.judul} className="rounded-2xl border border-white/8 bg-stone-900 p-5">
              <div className="mb-2 flex items-start justify-between gap-3">
                <h3 className="font-semibold text-stone-100">{d.judul}</h3>
                <span className="shrink-0 rounded-full bg-stone-800 px-2.5 py-0.5 text-xs text-stone-400 ring-1 ring-white/8">{d.status}</span>
              </div>
              <p className="text-sm text-stone-400">{d.isi}</p>
              <p className="mt-2 text-xs text-stone-600">Sumber: {d.sumber}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section icon={AlertTriangle} title="Keterbatasan">
        <ul className="list-disc space-y-2 rounded-2xl border border-white/8 bg-stone-900 p-5 pl-10 text-sm text-stone-300">
          <li>Formasi dan skor tahun depan bisa berbeda. Rentang tahun lalu adalah petunjuk, bukan jaminan.</li>
          <li>Label peluang hanya untuk tahap SKB. Lolos akhir juga ditentukan SKB (60%) dan tes tambahan instansi.</li>
          <li>Rekap resmi kadang terpotong, terutama daftar jurusan, sehingga sebagian formasi bisa terlewat.</li>
          <li>Ambang batas formasi khusus masih angka sementara dan perlu dicek ulang ke Kepmenpan-RB.</li>
          <li>Nama jurusan di ijazah harus persis sama dengan lampiran formasi. Selalu cek lampiran aslinya sebelum mendaftar.</li>
        </ul>
      </Section>

      <Section icon={ShieldCheck} title="Privasi laporan alumni">
        <p className="rounded-2xl border border-white/8 bg-stone-900 p-5 text-sm text-stone-300">
          Laporan disimpan tanpa nama di lembar publik dan hanya dipakai kalau pelapor setuju. Statistik per jabatan baru tampil setelah ada minimal {MIN_LAPORAN} laporan,
          supaya tidak ada yang bisa dikenali. Nama dan kontak alumni yang bersedia dihubungi disimpan di lembar terpisah yang privat dan hanya bisa diakses admin IKA.
        </p>
      </Section>
    </>
  );
}
