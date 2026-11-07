import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Timer, PlayCircle, BookOpen, CheckCircle2, XCircle, RotateCcw, ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { useCpnsData, lolosAmbang, AMBANG, useJson } from "../../lib/cpns";
import { JABATAN, SUMBER_MATERI_SKB } from "../../data/cpnsJabatan";
import { Section, Memuat, Pill, Peringatan } from "./ui";

// Skala SKD resmi: TWK 30 soal (maks 150), TIU 35 soal (maks 175), TKP 45 soal (maks 225).
export const MAKS = { TWK: 150, TIU: 175, TKP: 225 };
export const DETIK_PER_SOAL = 55; // 100 menit untuk 110 soal SKD
const KEY = "kompas-latihan";

function useBankSoal() {
  const [s, setS] = useState({ loading: true, error: null, soal: [] });
  useEffect(() => {
    let alive = true;
    fetch("/data/cpns/latihan.json")
      .then((r) => r.json())
      .then((d) => alive && setS({ loading: false, error: null, soal: d.soal }))
      .catch(() => alive && setS({ loading: false, error: "Bank soal gagal dimuat. Coba muat ulang halaman.", soal: [] }));
    return () => {
      alive = false;
    };
  }, []);
  return s;
}

const bacaRiwayat = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
};
const simpanRiwayat = (mode, nilai) => {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...bacaRiwayat(), [mode]: { nilai, tanggal: new Date().toLocaleDateString("id-ID") } }));
  } catch {
    /* penyimpanan diblokir: riwayat nggak disimpan */
  }
};

// Acak urutan soal per bagian dan urutan pilihan jawaban, supaya posisi kunci nggak bisa ditebak.
function acak(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function acakSoal(q) {
  const urut = acak(q.opsi.map((_, k) => k));
  return {
    ...q,
    opsi: urut.map((k) => q.opsi[k]),
    ...(q.skor ? { skor: urut.map((k) => q.skor[k]) } : { kunci: urut.indexOf(q.kunci) }),
  };
}
export const siapkan = (soal) => {
  const bagian = [...new Set(soal.map((q) => q.bagian))];
  return bagian.flatMap((b) => acak(soal.filter((q) => q.bagian === b))).map(acakSoal);
};

const fmtWaktu = (d) => `${String(Math.floor(d / 60)).padStart(2, "0")}:${String(d % 60).padStart(2, "0")}`;
const median = (v) => {
  const s = [...v].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length ? (s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2)) : null;
};

export function nilaiSoal(q, jawab) {
  if (jawab == null) return 0;
  return q.bagian === "TKP" ? q.skor[jawab] : jawab === q.kunci ? 5 : 0;
}

export function Kuis({ judul, soal, mode, onSelesai, onBatal }) {
  const [i, setI] = useState(0);
  const [jawab, setJawab] = useState({});
  const [sisa, setSisa] = useState(soal.length * DETIK_PER_SOAL);
  useEffect(() => {
    if (sisa <= 0) return onSelesai(jawab);
    const t = setTimeout(() => setSisa((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [sisa]); // eslint-disable-line react-hooks/exhaustive-deps
  const q = soal[i];
  const terjawab = Object.keys(jawab).length;
  return (
    <div className="rounded-2xl border border-white/8 bg-stone-900 p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs text-stone-500">{judul}</p>
          <p className="text-sm font-medium text-stone-300">
            Soal {i + 1} dari {soal.length} · <span className="text-stone-500">{q.bagian === "SKB" ? q.materi : `${q.bagian} · ${q.materi}`}</span>
          </p>
        </div>
        <span className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold tabular-nums ${sisa < 60 ? "bg-rose-500/10 text-rose-400" : "bg-stone-800 text-stone-200"}`}>
          <Timer className="h-4 w-4" /> {fmtWaktu(sisa)}
        </span>
      </div>

      <p className="mb-4 whitespace-pre-line text-base leading-relaxed text-stone-100">{q.soal}</p>
      <div className="space-y-2" role="radiogroup" aria-label={`Pilihan jawaban soal ${i + 1}`}>
        {q.opsi.map((o, k) => {
          const dipilih = jawab[q.id] === k;
          return (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={dipilih}
              onClick={() => setJawab((j) => ({ ...j, [q.id]: k }))}
              className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                dipilih ? "border-amber-500 bg-amber-500/10 text-stone-100" : "border-white/10 text-stone-300 hover:border-white/20 hover:bg-white/5"
              }`}
            >
              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${dipilih ? "bg-amber-500 text-ink" : "bg-stone-800 text-stone-400"}`}>
                {"ABCDE"[k]}
              </span>
              <span className="pt-0.5">{o}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <button type="button" disabled={i === 0} onClick={() => setI(i - 1)} className="flex items-center gap-1 rounded-lg bg-stone-800 px-3 py-2 text-sm text-stone-300 hover:bg-stone-700 disabled:opacity-40">
            <ChevronLeft className="h-4 w-4" /> Sebelumnya
          </button>
          {i < soal.length - 1 && (
            <button type="button" onClick={() => setI(i + 1)} className="flex items-center gap-1 rounded-lg bg-stone-800 px-3 py-2 text-sm text-stone-300 hover:bg-stone-700">
              Berikutnya <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={onBatal} className="rounded-lg px-3 py-2 text-sm text-stone-500 hover:text-stone-300">Batal</button>
          <button type="button" onClick={() => onSelesai(jawab)} className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-ink hover:bg-amber-400">
            <Flag className="h-4 w-4" /> Selesai ({terjawab}/{soal.length})
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/6 pt-4" aria-label="Navigasi soal">
        {soal.map((s, k) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setI(k)}
            aria-label={`Ke soal ${k + 1}${jawab[s.id] != null ? ", sudah dijawab" : ""}`}
            className={`h-8 w-8 rounded-md text-xs font-semibold tabular-nums ${
              k === i ? "bg-amber-500 text-ink" : jawab[s.id] != null ? "bg-stone-700 text-stone-200" : "bg-stone-800 text-stone-500"
            }`}
          >
            {k + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Pembahasan({ soal, jawab }) {
  return (
    <ol className="space-y-3">
      {soal.map((q, k) => {
        const j = jawab[q.id];
        const benar = q.bagian === "TKP" ? null : j === q.kunci;
        return (
          <li key={q.id} className="rounded-2xl border border-white/8 bg-stone-900 p-5 text-sm">
            <div className="mb-2 flex items-start gap-2">
              {benar === true && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />}
              {benar === false && <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />}
              <p className="text-stone-200"><span className="text-stone-500">{k + 1}.</span> {q.soal}</p>
            </div>
            <p className="text-stone-400">
              Jawabanmu: <strong className="text-stone-200">{j == null ? "kosong" : `${"ABCDE"[j]}. ${q.opsi[j]}`}</strong>
              {q.bagian === "TKP" && j != null && <span className="text-stone-500"> (skor {q.skor[j]} dari 5)</span>}
            </p>
            {q.bagian !== "TKP" ? (
              <p className="text-stone-400">Kunci: <strong className="text-emerald-400">{"ABCDE"[q.kunci]}. {q.opsi[q.kunci]}</strong></p>
            ) : (
              <p className="text-stone-400">Skor tertinggi: <strong className="text-emerald-400">{q.opsi[q.skor.indexOf(5)]}</strong></p>
            )}
            <p className="mt-2 border-t border-white/6 pt-2 text-stone-400">{q.pembahasan}</p>
          </li>
        );
      })}
    </ol>
  );
}

export function hitungSkd(soal, jawab) {
  const bagian = ["TWK", "TIU", "TKP"].map((b) => {
    const qs = soal.filter((q) => q.bagian === b);
    const dapat = qs.reduce((s, q) => s + nilaiSoal(q, jawab[q.id]), 0);
    return { b, dapat, maksLatihan: qs.length * 5, perkiraan: qs.length ? Math.round((dapat / (qs.length * 5)) * MAKS[b]) : 0 };
  });
  const n = Object.fromEntries(bagian.map((x) => [x.b.toLowerCase(), x.perkiraan]));
  return { bagian, n, total: n.twk + n.tiu + n.tkp };
}

export function hitungBenar(soal, jawab) {
  const benar = soal.filter((q) => jawab[q.id] === q.kunci).length;
  return { benar, nilai: soal.length ? Math.round((benar / soal.length) * 100) : 0 };
}

export function HasilSkd({ soal, jawab, formasi }) {
  const { bagian, n, total } = hitungSkd(soal, jawab);
  const ambang = lolosAmbang("Umum", n);

  const target = useJson("/data/cpns/target-2024.json").data;
  const LABEL = { "Pusat (Jakarta)": "Pusat Jakarta", "Daerah - Jawa": "Daerah di Jawa", "Daerah - Luar Jawa": "Luar Jawa" };
  const baris = (target?.per_wilayah || []).filter((w) => LABEL[w.nama] && ["Primer", "Sekunder"].includes(w.kategori));
  const status = (w) =>
    total >= w.skd_rata_pemenang
      ? { t: "Aman", cls: "text-emerald-400" }
      : total >= w.skd_min_pemenang
      ? { t: "Di zona menang", cls: "text-amber-400" }
      : { t: "Di bawah pemenang terendah", cls: "text-rose-400" };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-4">
        {bagian.map((x) => (
          <div key={x.b} className="rounded-2xl border border-white/8 bg-stone-900 p-5">
            <p className="text-xs text-stone-500">{x.b} · ambang {AMBANG.Umum.per[x.b.toLowerCase()]}</p>
            <p className={`mt-1 text-2xl font-bold tabular-nums ${x.perkiraan >= AMBANG.Umum.per[x.b.toLowerCase()] ? "text-stone-100" : "text-rose-400"}`}>{x.perkiraan}</p>
            <p className="text-xs text-stone-600">dari {MAKS[x.b]} · latihan {x.dapat}/{x.maksLatihan}</p>
          </div>
        ))}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
          <p className="text-xs text-stone-500">Perkiraan total SKD</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-amber-400">{total}</p>
          <p className="text-xs text-stone-600">dari 550</p>
        </div>
      </div>
      <p className={`text-sm ${ambang.ok ? "text-emerald-400" : "text-rose-400"}`}>{ambang.ok ? "Perkiraanmu lolos ambang batas formasi umum." : ambang.alasan}</p>

      <div className="rounded-2xl border border-white/8 bg-stone-900 p-5">
        <h3 className="mb-1 font-semibold text-stone-100">Dibandingkan pemenang CPNS 2024</h3>
        <p className="mb-4 text-sm text-stone-500">Formasi yang menerima Ilmu Komunikasi. Target aman = rata-rata SKD pemenang, minimum = SKD pemenang terendah.</p>
        {baris.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="text-xs text-stone-500">
                <tr><th className="py-2 font-medium">Kategori · wilayah</th><th className="py-2 text-right font-medium">Minimum</th><th className="py-2 text-right font-medium">Target aman</th><th className="py-2 text-right font-medium">Skormu</th></tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {baris.map((w) => {
                  const st = status(w);
                  return (
                    <tr key={w.kategori + w.nama}>
                      <td className="py-2 text-stone-300">{w.kategori === "Primer" ? "Humas" : "Sekunder"} · {LABEL[w.nama]}</td>
                      <td className="py-2 text-right tabular-nums text-stone-400">{w.skd_min_pemenang}</td>
                      <td className="py-2 text-right tabular-nums text-stone-200">{w.skd_rata_pemenang}</td>
                      <td className={`py-2 text-right text-xs font-semibold ${st.cls}`}>{st.t}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-stone-500">Memuat data pembanding…</p>
        )}
        <p className="mt-3 text-sm text-stone-400">
          Lihat formasi mana aja yang cocok di <Link to="/cpns/rekomendasi" className="font-medium text-amber-400 hover:text-amber-300">Rekomendasi →</Link>
        </p>
      </div>
    </div>
  );
}

export function HasilSkb({ soal, jawab, jabatan }) {
  const { benar, nilai } = hitungBenar(soal, jawab);
  return (
    <div className="grid gap-3 sm:grid-cols-[200px_1fr]">
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
        <p className="text-xs text-stone-500">Nilai latihan SKB</p>
        <p className="mt-1 text-3xl font-bold tabular-nums text-amber-400">{nilai}</p>
        <p className="text-xs text-stone-600">{benar} dari {soal.length} benar</p>
      </div>
      <div className="rounded-2xl border border-white/8 bg-stone-900 p-5 text-sm text-stone-300">
        <p className="font-semibold text-stone-100">Patokan dari seleksi 2024</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-stone-400">
          <li>Lulusan Ilkom yang menang di Pemprov Jabar dapat SKB 62–81. Yang kalah kebanyakan di 51–65.</li>
          <li>Targetkan SKB minimal 70. Dengan SKB sekitar 65, peluangnya hampir untung-untungan.</li>
        </ul>
        <p className="mt-3 text-xs text-stone-600">Sumber: analisis tim IKA atas rekap integrasi SKD-SKB Pemprov Jabar 2024. Nilai latihan di sini cuma gambaran penguasaan materi.</p>
      </div>
    </div>
  );
}

export default function Latihan() {
  const bank = useBankSoal();
  const { formasi } = useCpnsData();
  const [sesi, setSesi] = useState(null); // { mode: "SKD" | "SKB", jabatan?, soal }
  const [hasil, setHasil] = useState(null);
  const riwayat = useMemo(bacaRiwayat, [hasil]); // eslint-disable-line react-hooks/exhaustive-deps

  if (bank.loading || bank.error) return <Memuat error={bank.error} />;

  const skd = ["TWK", "TIU", "TKP"].flatMap((b) => bank.soal.filter((q) => q.bagian === b));
  const jabatanSkb = JABATAN.filter((j) => j.latihan && bank.soal.some((q) => q.jabatan === j.latihan));
  const mulai = (s) => {
    setHasil(null);
    setSesi({ ...s, soal: siapkan(s.soal) });
    window.scrollTo(0, 0);
  };

  if (sesi && !hasil)
    return (
      <Kuis
        judul={sesi.mode === "SKD" ? "Simulasi SKD" : `Latihan SKB · ${sesi.jabatan}`}
        soal={sesi.soal}
        mode={sesi.mode}
        onBatal={() => setSesi(null)}
        onSelesai={(jawab) => {
          setHasil(jawab);
          window.scrollTo(0, 0);
        }}
      />
    );

  if (sesi && hasil)
    return (
      <>
        <Section icon={CheckCircle2} title={sesi.mode === "SKD" ? "Hasil simulasi SKD" : `Hasil latihan SKB · ${sesi.jabatan}`}>
          {sesi.mode === "SKD" ? (
            <HasilSkd soal={sesi.soal} jawab={hasil} formasi={formasi} />
          ) : (
            <HasilSkb soal={sesi.soal} jawab={hasil} jabatan={sesi.jabatan} />
          )}
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => mulai({ ...sesi })} className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-ink hover:bg-amber-400">
              <RotateCcw className="h-4 w-4" /> Ulangi
            </button>
            <button type="button" onClick={() => { setSesi(null); setHasil(null); }} className="rounded-lg bg-stone-800 px-4 py-2 text-sm text-stone-300 hover:bg-stone-700">
              Pilih latihan lain
            </button>
          </div>
        </Section>
        <Section icon={BookOpen} title="Pembahasan">
          <Pembahasan soal={sesi.soal} jawab={hasil} />
        </Section>
      </>
    );

  return (
    <>
      <Peringatan>
        Soal latihan disusun tim KOMpas ASN, bukan soal resmi. Topik SKB mengikuti materi pokok resmi dari KemenPAN-RB. Skor SKD dari latihan singkat ini
        diproyeksikan ke skala penuh, jadi anggap sebagai perkiraan kasar.
      </Peringatan>

      <Section icon={PlayCircle} title="Simulasi SKD" desc={`TWK, TIU, dan TKP dengan waktu ${DETIK_PER_SOAL} detik per soal, setara 100 menit untuk 110 soal di tes asli.`}>
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/8 bg-stone-900 p-5">
          <div className="text-sm text-stone-400">
            <p className="text-stone-200">
              {skd.length} soal · {fmtWaktu(skd.length * DETIK_PER_SOAL)} menit
            </p>
            <p>Hasilnya dibandingkan dengan skor terendah ke SKB di Jakarta dan luar Jakarta.</p>
            {riwayat.SKD && <p className="mt-1 text-xs text-stone-500">Terakhir: perkiraan {riwayat.SKD.nilai} ({riwayat.SKD.tanggal})</p>}
          </div>
          <button type="button" onClick={() => mulai({ mode: "SKD", soal: skd })} className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-amber-400">
            <PlayCircle className="h-4 w-4" /> Mulai simulasi
          </button>
        </div>
      </Section>

      <Section icon={BookOpen} title="Latihan SKB per jabatan" desc="SKB menyumbang 60% nilai akhir. Pilih jabatan yang mau kamu lamar.">
        <div className="grid gap-3 sm:grid-cols-2">
          {jabatanSkb.map((j) => {
            const soal = bank.soal.filter((q) => q.jabatan === j.latihan);
            const r = riwayat[`SKB:${j.latihan}`];
            return (
              <div key={j.id} className="flex flex-col rounded-2xl border border-white/8 bg-stone-900 p-5">
                <div className="mb-1 flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-stone-100">{j.nama}</h3>
                  <Pill cls="text-stone-400 bg-stone-800 ring-white/8">{j.kategori}</Pill>
                </div>
                <p className="mb-4 flex-1 text-sm text-stone-500">
                  {soal.length} soal · {[...new Set(soal.map((q) => q.materi))].slice(0, 3).join(", ")}
                  {r && <span className="mt-1 block text-xs">Terakhir: {r.nilai} ({r.tanggal})</span>}
                </p>
                <button type="button" onClick={() => mulai({ mode: "SKB", jabatan: j.latihan, soal })} className="self-start rounded-lg bg-stone-800 px-4 py-2 text-sm font-medium text-stone-200 hover:bg-stone-700">
                  Mulai latihan
                </button>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-stone-600">
          Daftar lengkap materi tiap jabatan ada di <Link to="/cpns/skb" className="underline">Persiapan SKB</Link>. Sumber: {SUMBER_MATERI_SKB}.
        </p>
      </Section>
    </>
  );
}
