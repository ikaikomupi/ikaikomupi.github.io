import { BookOpen, Brain, MessageSquareQuote, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { JABATAN, SUMBER_MATERI_SKB } from "../../data/cpnsJabatan";
import { useLaporanAlumni, MIN_LAPORAN } from "../../lib/cpns";
import { Section } from "./ui";

function TipsAlumni() {
  const { loading, rows } = useLaporanAlumni();
  const tips = rows.filter((r) => (r.tips || "").trim().length > 20).slice(-8).reverse();
  if (loading) return <p className="text-sm text-stone-500">Memuat tips…</p>;
  if (tips.length < MIN_LAPORAN)
    return (
      <p className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-stone-500">
        Tips dari alumni bakal muncul di sini setelah ada laporan yang masuk lewat tab Lapor Hasil.
      </p>
    );
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {tips.map((t, i) => (
        <li key={i} className="rounded-2xl border border-white/8 bg-stone-900 p-5 text-sm">
          <p className="leading-relaxed text-stone-300">“{t.tips}”</p>
          <p className="mt-3 text-xs text-stone-500">{t.jabatan} · seleksi {t.tahun} · {t.hasil}</p>
        </li>
      ))}
    </ul>
  );
}

export default function Skb() {
  return (
    <>
      <Section icon={Scale} title="Kenapa SKB menentukan" desc="Nilai akhir = SKD 40% + SKB 60%. Skor SKD tinggi cuma tiket masuk ke tahap SKB.">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/8 bg-stone-900 p-5">
            <p className="text-3xl font-bold text-amber-400">60%</p>
            <p className="mt-1 text-sm text-stone-400">bobot SKB di nilai akhir integrasi SKD-SKB.</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-stone-900 p-5 sm:col-span-2">
            <p className="text-sm font-semibold text-stone-100">Isi SKB beda-beda tiap instansi</p>
            <p className="mt-1 text-sm text-stone-400">
              Umumnya ada tes kompetensi bidang pakai CAT. Instansi boleh menambah tes lain: psikotes, wawancara, praktik kerja,
              atau kesamaptaan. Cek pengumuman instansi buat komposisi dan bobot pastinya.
            </p>
          </div>
        </div>
      </Section>

      <Section
        icon={Brain}
        title="Psikotes sering jadi penentu"
        desc="Dari analisis tim IKA atas data Kementerian PU: di tiap unit eselon I, 24–60% peserta SKB gugur di psikotes."
      >
        <div className="rounded-2xl border border-white/8 bg-stone-900 p-5 text-sm text-stone-300">
          <ul className="list-disc space-y-2 pl-5">
            <li>Di beberapa balai, peserta tunggal dengan nilai akhir 68–72 tetap gugur karena psikotes, dan kursinya jadi kosong.</li>
            <li>Di balai daerah, SKD sekitar 400 dan SKB sekitar 65 sudah bisa menang, asalkan lolos psikotes.</li>
            <li>Artinya, kalau instansi incaranmu pakai psikotes, latihan psikotes sama pentingnya dengan latihan SKD.</li>
          </ul>
        </div>
      </Section>

      <Section icon={BookOpen} title="Materi pokok SKB per jabatan" desc="Materi resmi SKB dengan CAT dari KemenPAN-RB. Instansi bisa menambah tes lain di luar CAT." foot={`Sumber: ${SUMBER_MATERI_SKB}.`}>
        <div className="grid gap-3 sm:grid-cols-2">
          {JABATAN.map((j) => (
            <div key={j.id} className="rounded-2xl border border-white/8 bg-stone-900 p-5">
              <div className="mb-2 flex items-start justify-between gap-2">
                <h3 className="font-semibold text-stone-100">{j.nama}</h3>
                <span className="shrink-0 text-xs text-stone-500">{j.kategori}</span>
              </div>
              <p className="mb-3 text-sm text-stone-400">{j.kerja}</p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-stone-300">
                {j.skb.map((m) => <li key={m}>{m}</li>)}
              </ul>
              {j.latihan && (
                <Link to="/cpns/latihan" className="mt-3 inline-block text-sm font-medium text-amber-400 hover:text-amber-300">Latihan soal {j.latihan} →</Link>
              )}
              {(j.pembina || j.jenjang) && (
                <p className="mt-3 text-xs text-stone-500">
                  {j.jenjang && <>Jenjang: {j.jenjang}. </>}
                  {j.pembina && <>Instansi pembina: {j.pembina}.</>}
                </p>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section icon={MessageSquareQuote} title="Tips dari alumni" desc="Diambil dari laporan alumni yang setuju tipsnya ditampilkan tanpa nama.">
        <TipsAlumni />
      </Section>
    </>
  );
}
