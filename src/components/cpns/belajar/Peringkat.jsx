import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Trophy } from "lucide-react";
import { useLms, loginTersedia } from "../../../lib/lms";
import { supabase } from "../../../lib/supabase";
import { Section, Memuat } from "../ui";

export default function Peringkat() {
  const { user, siap, data } = useLms();
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!user) return;
    supabase
      .from("peringkat")
      .select("id, nama_tampil, angkatan, skor_terbaik, jumlah_tryout")
      .order("skor_terbaik", { ascending: false })
      .limit(50)
      .then(({ data: d, error }) => (error ? setErr("Peringkat gagal dimuat.") : setRows(d)));
  }, [user]);

  if (!siap) return <Memuat />;

  return (
    <>
      <Link to="/cpns/belajar" className="mb-4 inline-flex items-center gap-1 text-sm text-stone-400 hover:text-stone-100">
        <ChevronLeft className="h-4 w-4" /> Kembali ke Belajar
      </Link>
      <Section icon={Trophy} title="Peringkat tryout alumni" desc="Skor tryout SKD terbaik dari alumni yang memilih tampil di peringkat. Skor dihitung di perangkat peserta, jadi anggap ini penyemangat, bukan peringkat resmi.">
        {!loginTersedia ? (
          <p className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-stone-500">Peringkat aktif setelah login diaktifkan pengurus.</p>
        ) : !user ? (
          <p className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-stone-500">
            <Link to="/cpns/belajar/akun" className="text-amber-400 hover:text-amber-300">Masuk</Link> untuk melihat dan ikut peringkat.
          </p>
        ) : err ? (
          <p className="text-sm text-rose-400">{err}</p>
        ) : !rows ? (
          <Memuat />
        ) : (
          <>
            {!data.profil?.tampil_di_peringkat && (
              <p className="mb-4 text-sm text-stone-400">
                Kamu belum tampil di peringkat. Aktifkan di <Link to="/cpns/belajar/akun" className="text-amber-400 hover:text-amber-300">Akun</Link>.
              </p>
            )}
            {rows.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-stone-500">Belum ada peserta di peringkat. Jadilah yang pertama.</p>
            ) : (
              <ol className="divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/8">
                {rows.map((r, k) => (
                  <li key={r.id} className={`flex items-center gap-4 px-4 py-3 text-sm ${r.id === user.id ? "bg-amber-500/10" : "bg-stone-900"}`}>
                    <span className={`w-7 text-right font-bold tabular-nums ${k < 3 ? "text-amber-400" : "text-stone-500"}`}>{k + 1}</span>
                    <span className="flex-1 text-stone-200">
                      {r.nama_tampil || "Alumni"} {r.angkatan && <span className="text-stone-500">· {r.angkatan}</span>}
                      {r.id === user.id && <span className="ml-2 text-xs text-amber-400">(kamu)</span>}
                    </span>
                    <span className="text-xs text-stone-500">{r.jumlah_tryout}× tryout</span>
                    <span className="w-12 text-right font-semibold tabular-nums text-stone-100">{r.skor_terbaik}</span>
                  </li>
                ))}
              </ol>
            )}
          </>
        )}
      </Section>
    </>
  );
}
