import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronLeft, PlayCircle, CheckCircle2, BookOpen, RotateCcw } from "lucide-react";
import { useLms, useKonten } from "../../../lib/lms";
import { useCpnsData } from "../../../lib/cpns";
import { Kuis, Pembahasan, HasilSkd, HasilSkb, siapkan, hitungSkd, hitungBenar, DETIK_PER_SOAL } from "../Latihan";
import { Section, Memuat, Peringatan } from "../ui";

const menit = (n) => Math.round((n * DETIK_PER_SOAL) / 60);

function Kembali() {
  return (
    <Link to="/cpns/belajar" className="mb-4 inline-flex items-center gap-1 text-sm text-stone-400 hover:text-stone-100">
      <ChevronLeft className="h-4 w-4" /> Kembali ke Belajar
    </Link>
  );
}

// Dipakai bersama oleh tryout SKD dan latihan SKB per modul.
function Sesi({ judul, bank, simpan, renderHasil, intro }) {
  const [sesi, setSesi] = useState(null);
  const [jawab, setJawab] = useState(null);
  const mulai = () => {
    setJawab(null);
    setSesi({ soal: siapkan(bank), mulai: Date.now() });
    window.scrollTo(0, 0);
  };

  if (sesi && !jawab)
    return (
      <Kuis
        judul={judul}
        soal={sesi.soal}
        onBatal={() => setSesi(null)}
        onSelesai={(j) => {
          setJawab(j);
          simpan(sesi.soal, j, Math.round((Date.now() - sesi.mulai) / 1000));
          window.scrollTo(0, 0);
        }}
      />
    );

  if (sesi && jawab)
    return (
      <>
        <Kembali />
        <Section icon={CheckCircle2} title={`Hasil ${judul}`}>
          {renderHasil(sesi.soal, jawab)}
          <button type="button" onClick={mulai} className="mt-4 flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-ink hover:bg-amber-400">
            <RotateCcw className="h-4 w-4" /> Ulangi
          </button>
        </Section>
        <Section icon={BookOpen} title="Pembahasan">
          <Pembahasan soal={sesi.soal} jawab={jawab} />
        </Section>
      </>
    );

  return (
    <>
      <Kembali />
      {intro}
      <button type="button" onClick={mulai} className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-amber-400">
        <PlayCircle className="h-4 w-4" /> Mulai
      </button>
    </>
  );
}

export function TryoutSkd() {
  const { simpanPercobaan } = useLms();
  const konten = useKonten();
  const { formasi } = useCpnsData();
  if (konten.loading || konten.error) return <Memuat error={konten.error} />;
  const bank = konten.soal.filter((q) => ["TWK", "TIU", "TKP"].includes(q.bagian));
  const per = (b) => bank.filter((q) => q.bagian === b).length;
  return (
    <Sesi
      judul="Tryout SKD"
      bank={bank}
      simpan={(soal, jawab, durasi_detik) => {
        const { n, total } = hitungSkd(soal, jawab);
        simpanPercobaan({ jenis: "tryout", ref: "skd", skor: total, rincian: n, durasi_detik });
      }}
      renderHasil={(soal, jawab) => <HasilSkd soal={soal} jawab={jawab} formasi={formasi} />}
      intro={
        <>
          <h2 className="mb-2 text-2xl font-bold text-stone-100">Tryout SKD</h2>
          <p className="mb-4 text-sm text-stone-400">
            {bank.length} soal (TWK {per("TWK")}, TIU {per("TIU")}, TKP {per("TKP")}) · {menit(bank.length)} menit. Urutan soal dan pilihan diacak.
          </p>
          <Peringatan>
            Tes asli berisi 110 soal (TWK 30, TIU 35, TKP 45) dalam 100 menit. Bank soal KOMpas ASN masih terus ditambah, jadi skor di sini
            diproyeksikan ke skala 550 dan sebaiknya dibaca sebagai perkiraan.
          </Peringatan>
        </>
      }
    />
  );
}

export function LatihanModul() {
  const { modulId } = useParams();
  const { simpanPercobaan } = useLms();
  const konten = useKonten();
  if (konten.loading || konten.error) return <Memuat error={konten.error} />;
  const modul = konten.kurikulum.modul.find((m) => m.id === modulId && m.jenis === "SKB");
  if (!modul) return <Navigate to="/cpns/belajar" replace />;
  const ids = new Set(modul.bab.map((b) => b.id));
  const bank = konten.soal.filter((q) => ids.has(q.bab));
  return (
    <Sesi
      judul={`Latihan ${modul.judul}`}
      bank={bank}
      simpan={(soal, jawab, durasi_detik) => {
        const { nilai, benar } = hitungBenar(soal, jawab);
        simpanPercobaan({ jenis: "skb", ref: modul.id, skor: nilai, rincian: { benar, jumlah: soal.length }, durasi_detik });
      }}
      renderHasil={(soal, jawab) => <HasilSkb soal={soal} jawab={jawab} jabatan={modul.jabatan} />}
      intro={
        <>
          <h2 className="mb-2 text-2xl font-bold text-stone-100">Latihan {modul.judul}</h2>
          <p className="mb-6 text-sm text-stone-400">{bank.length} soal dari semua bab modul ini · {menit(bank.length)} menit.</p>
        </>
      }
    />
  );
}
