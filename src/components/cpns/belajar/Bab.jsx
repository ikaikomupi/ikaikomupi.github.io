import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronLeft, Lightbulb, ListChecks, CheckCircle2 } from "lucide-react";
import { useLms, useKonten, semuaBab } from "../../../lib/lms";
import { Kuis, Pembahasan, siapkan, nilaiSoal } from "../Latihan";
import { Section, Memuat } from "../ui";

// Skor kuis bab dalam skala 0–100. TKP: total skor pilihan dibanding maksimal 5 per soal.
function skorKuis(soal, jawab) {
  const dapat = soal.reduce((s, q) => s + nilaiSoal(q, jawab[q.id]), 0);
  return Math.round((dapat / (soal.length * 5)) * 100);
}

export default function Bab() {
  const { babId } = useParams();
  const { data, simpanBab, simpanPercobaan } = useLms();
  const konten = useKonten();
  const [sesi, setSesi] = useState(null);
  const [hasil, setHasil] = useState(null);
  if (konten.loading || konten.error) return <Memuat error={konten.error} />;

  const daftar = semuaBab(konten.kurikulum);
  const i = daftar.findIndex((b) => b.id === babId);
  if (i < 0) return <Navigate to="/cpns/belajar" replace />;
  const bab = daftar[i];
  const berikut = daftar[i + 1];
  const soal = konten.soal.filter((q) => q.bab === bab.id);
  const progres = data.bab[bab.id];

  if (sesi && !hasil)
    return (
      <Kuis
        judul={`Kuis · ${bab.judul}`}
        soal={sesi.soal}
        onBatal={() => setSesi(null)}
        onSelesai={(jawab) => {
          const skor = skorKuis(sesi.soal, jawab);
          setHasil({ jawab, skor });
          simpanBab(bab.id, skor);
          simpanPercobaan({ jenis: "kuis", ref: bab.id, skor, durasi_detik: Math.round((Date.now() - sesi.mulai) / 1000) });
          window.scrollTo(0, 0);
        }}
      />
    );

  return (
    <>
      <Link to="/cpns/belajar" className="mb-4 inline-flex items-center gap-1 text-sm text-stone-400 hover:text-stone-100">
        <ChevronLeft className="h-4 w-4" /> {bab.modul.judul}
      </Link>
      <h2 className="mb-1 text-2xl font-bold text-stone-100">{bab.judul}</h2>
      <p className="mb-8 text-sm text-stone-500">
        Bab {bab.modul.bab.findIndex((b) => b.id === bab.id) + 1} dari {bab.modul.bab.length}
        {progres?.selesai_at && <span className="ml-2 text-emerald-400">· Selesai, skor terbaik {progres.skor}</span>}
      </p>

      {hasil && (
        <Section icon={CheckCircle2} title={`Skor kuis: ${hasil.skor}`} desc={hasil.skor >= 60 ? "Bab ini tercatat selesai." : "Belum mencapai 60. Baca ulang poin kunci lalu coba lagi."}>
          <div className="mb-6 flex flex-wrap gap-2">
            <button type="button" onClick={() => { setHasil(null); setSesi({ soal: siapkan(soal), mulai: Date.now() }); }} className="rounded-lg bg-stone-800 px-4 py-2 text-sm text-stone-300 hover:bg-stone-700">
              Ulangi kuis
            </button>
            {berikut && (
              <Link to={`/cpns/belajar/bab/${berikut.id}`} onClick={() => { setHasil(null); setSesi(null); }} className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-ink hover:bg-amber-400">
                Bab berikutnya: {berikut.judul} →
              </Link>
            )}
          </div>
          <Pembahasan soal={sesi.soal} jawab={hasil.jawab} />
        </Section>
      )}

      {!hasil && (
        <>
          <article className="mb-8 space-y-4 rounded-2xl border border-white/8 bg-stone-900 p-6 text-[15px] leading-relaxed text-stone-300">
            {bab.materi.map((p, k) => <p key={k}>{p}</p>)}
          </article>
          {bab.poin?.length > 0 && (
            <div className="mb-8 rounded-2xl border border-amber-500/25 bg-amber-500/5 p-5">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-stone-100"><Lightbulb className="h-4 w-4 text-amber-400" /> Poin kunci</p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-stone-300">
                {bab.poin.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/8 bg-stone-900 p-5">
            <p className="flex items-center gap-2 text-sm text-stone-300">
              <ListChecks className="h-4 w-4 text-amber-400" /> Kuis bab ini: {soal.length} soal
            </p>
            <button
              type="button"
              disabled={!soal.length}
              onClick={() => { setSesi({ soal: siapkan(soal), mulai: Date.now() }); window.scrollTo(0, 0); }}
              className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-amber-400 disabled:opacity-40"
            >
              Mulai kuis
            </button>
          </div>
        </>
      )}
    </>
  );
}
