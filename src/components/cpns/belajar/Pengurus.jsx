import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ChevronLeft, BarChart3 } from "lucide-react";
import { useLms, useKonten, semuaBab } from "../../../lib/lms";
import { supabase } from "../../../lib/supabase";
import { Section, Memuat, Stat } from "../ui";

// Statistik pemakaian untuk pengurus IKA (app_metadata.role = 'pengurus').
// Data diambil lewat RLS khusus pengurus; tidak menampilkan email peserta.
export default function Pengurus() {
  const { siap, pengurus } = useLms();
  const konten = useKonten();
  const [s, setS] = useState(null);

  useEffect(() => {
    if (!pengurus) return;
    const seminggu = new Date(Date.now() - 7 * 86400000).toISOString();
    Promise.all([
      supabase.from("profil").select("id", { count: "exact", head: true }),
      supabase.from("percobaan").select("user_id, jenis, skor, dibuat_at").gte("dibuat_at", seminggu).limit(5000),
      supabase.from("progres_bab").select("bab_id").not("selesai_at", "is", null).limit(10000),
      supabase.from("percobaan").select("skor").eq("jenis", "tryout").limit(10000),
    ]).then(([p, minggu, bab, tryout]) => {
      const perBab = {};
      (bab.data || []).forEach((r) => (perBab[r.bab_id] = (perBab[r.bab_id] || 0) + 1));
      const skor = (tryout.data || []).map((r) => r.skor);
      setS({
        peserta: p.count ?? 0,
        aktif: new Set((minggu.data || []).map((r) => r.user_id)).size,
        aktivitas: (minggu.data || []).length,
        tryout: skor.length,
        rataTryout: skor.length ? Math.round(skor.reduce((a, b) => a + b, 0) / skor.length) : null,
        perBab,
      });
    });
  }, [pengurus]);

  if (!siap || konten.loading) return <Memuat />;
  if (!pengurus) return <Navigate to="/cpns/belajar" replace />;
  if (!s) return <Memuat />;

  const bab = semuaBab(konten.kurikulum).map((b) => ({ ...b, n: s.perBab[b.id] || 0 }));
  const max = Math.max(1, ...bab.map((b) => b.n));

  return (
    <>
      <Link to="/cpns/belajar" className="mb-4 inline-flex items-center gap-1 text-sm text-stone-400 hover:text-stone-100">
        <ChevronLeft className="h-4 w-4" /> Kembali ke Belajar
      </Link>
      <Section icon={BarChart3} title="Statistik pengurus" desc="Pemakaian LMS KOMpas ASN.">
        <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Peserta terdaftar" value={s.peserta} />
          <Stat label="Aktif 7 hari terakhir" value={s.aktif} />
          <Stat label="Kuis & tryout 7 hari" value={s.aktivitas} />
          <Stat label="Rata-rata tryout" value={s.rataTryout ?? "–"} />
        </div>
        <h3 className="mb-3 text-sm font-semibold text-stone-200">Peserta yang menyelesaikan tiap bab</h3>
        <div className="space-y-1.5 rounded-2xl border border-white/8 bg-stone-900 p-5">
          {bab.map((b) => (
            <div key={b.id} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_40px] items-center gap-3 text-sm">
              <span className="truncate text-stone-400" title={`${b.modul.judul} · ${b.judul}`}>{b.judul}</span>
              <div className="h-2 rounded-full bg-stone-800"><div className="h-2 rounded-full bg-amber-500" style={{ width: `${(b.n / max) * 100}%` }} /></div>
              <span className="text-right tabular-nums text-stone-300">{b.n}</span>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
