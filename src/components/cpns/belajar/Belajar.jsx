import { Link } from "react-router-dom";
import { CheckCircle2, Circle, PlayCircle, Target, Trophy, UserRound, BarChart3, LogIn, TrendingDown, BookOpen } from "lucide-react";
import { useLms, useKonten, semuaBab, loginTersedia } from "../../../lib/lms";
import { Section, Memuat, Pill } from "../ui";

const fmtTgl = (iso) => new Date(iso + "T00:00:00").toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

function KartuStat({ label, nilai, sub }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-stone-900 p-5">
      <p className="text-xs text-stone-500">{label}</p>
      <p className="mt-1 text-2xl font-bold tabular-nums text-stone-100">{nilai}</p>
      {sub && <p className="mt-0.5 text-xs text-stone-500">{sub}</p>}
    </div>
  );
}

export default function Belajar() {
  const { user, siap, data, error, pengurus } = useLms();
  const konten = useKonten();
  if (konten.loading || konten.error || !siap) return <Memuat error={konten.error} />;

  const bab = semuaBab(konten.kurikulum);
  const selesai = bab.filter((b) => data.bab[b.id]?.selesai_at);
  const tryout = data.percobaan.filter((p) => p.jenis === "tryout");
  const tryoutTerbaik = tryout.length ? Math.max(...tryout.map((t) => t.skor)) : null;
  const lemah = bab
    .filter((b) => data.bab[b.id] && data.bab[b.id].skor < 70)
    .sort((a, b) => data.bab[a.id].skor - data.bab[b.id].skor)
    .slice(0, 3);

  const { target_tanggal, target_skd } = data.profil || {};
  const sisaHari = target_tanggal ? Math.ceil((new Date(target_tanggal + "T00:00:00") - new Date()) / 86400000) : null;
  const sisaBab = bab.length - selesai.length;
  const perMinggu = sisaHari > 0 ? Math.ceil(sisaBab / Math.max(1, sisaHari / 7)) : null;

  return (
    <>
      {error && <p className="mb-6 rounded-xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p>}

      {!user && (
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/5 p-4 text-sm text-amber-200/90">
          <p>
            {loginTersedia
              ? "Kamu belum masuk. Progres disimpan di browser ini saja. Masuk supaya progres tersimpan di semua perangkat dan bisa ikut peringkat."
              : "Login belum diaktifkan. Untuk sementara progres disimpan di browser ini."}
          </p>
          {loginTersedia && (
            <Link to="/cpns/belajar/akun" className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 font-semibold text-ink hover:bg-amber-400">
              <LogIn className="h-4 w-4" /> Masuk
            </Link>
          )}
        </div>
      )}

      <div className="mb-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KartuStat label="Bab selesai" nilai={`${selesai.length}/${bab.length}`} sub={`${Math.round((selesai.length / bab.length) * 100)}% materi`} />
        <KartuStat label="Tryout terbaik" nilai={tryoutTerbaik ?? "–"} sub={tryout.length ? `${tryout.length} kali tryout` : "belum pernah"} />
        <KartuStat label="Target SKD" nilai={target_skd ?? "–"} sub={target_skd && tryoutTerbaik != null ? (tryoutTerbaik >= target_skd ? "sudah tercapai" : `kurang ${target_skd - tryoutTerbaik}`) : "atur di Akun"} />
        <KartuStat label="Hari menuju seleksi" nilai={sisaHari != null ? Math.max(0, sisaHari) : "–"} sub={target_tanggal ? fmtTgl(target_tanggal) : "atur di Akun"} />
      </div>

      <div className="mb-14 grid gap-3 lg:grid-cols-3">
        <Link to="/cpns/belajar/tryout" className="group flex flex-col justify-between rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 hover:bg-amber-500/10">
          <div>
            <PlayCircle className="mb-2 h-6 w-6 text-amber-400" />
            <h3 className="font-semibold text-stone-100">Tryout SKD</h3>
            <p className="mt-1 text-sm text-stone-400">TWK, TIU, TKP bertimer. Skor masuk riwayat dan peringkat.</p>
          </div>
          <span className="mt-3 text-sm font-medium text-amber-400 group-hover:text-amber-300">Mulai tryout →</span>
        </Link>
        <div className="rounded-2xl border border-white/8 bg-stone-900 p-5">
          <Target className="mb-2 h-6 w-6 text-amber-400" />
          <h3 className="font-semibold text-stone-100">Rencana belajar</h3>
          <p className="mt-1 text-sm text-stone-400">
            {sisaBab === 0
              ? "Semua bab selesai. Fokus ke tryout dan bab yang skornya masih rendah."
              : perMinggu
              ? `Selesaikan sekitar ${perMinggu} bab per minggu supaya ${sisaBab} bab tersisa tuntas sebelum seleksi.`
              : `${sisaBab} bab tersisa. Atur tanggal seleksi di Akun untuk dapat target mingguan.`}
          </p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-stone-900 p-5">
          <TrendingDown className="mb-2 h-6 w-6 text-amber-400" />
          <h3 className="font-semibold text-stone-100">Topik terlemah</h3>
          {lemah.length ? (
            <ul className="mt-1 space-y-1 text-sm">
              {lemah.map((b) => (
                <li key={b.id}>
                  <Link to={`/cpns/belajar/bab/${b.id}`} className="text-stone-300 hover:text-amber-400">
                    {b.judul} <span className="tabular-nums text-rose-400">({data.bab[b.id].skor})</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-sm text-stone-400">Belum ada. Kerjakan kuis tiap bab supaya kelihatan topik yang perlu diulang.</p>
          )}
        </div>
      </div>

      {tryout.length > 0 && (
        <Section icon={BarChart3} title="Riwayat tryout" desc="10 tryout terakhir, perkiraan skor SKD dari 550.">
          <div className="flex h-40 items-end gap-2 rounded-2xl border border-white/8 bg-stone-900 p-5">
            {tryout.slice(-10).map((t, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[11px] tabular-nums text-stone-400">{t.skor}</span>
                <div className="w-full rounded-t bg-amber-500" style={{ height: `${(t.skor / 550) * 100}px` }} />
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section icon={BookOpen} title="Modul belajar" desc="Bab dianggap selesai kalau skor kuisnya minimal 60.">
        <div className="grid gap-4 lg:grid-cols-2">
          {konten.kurikulum.modul.map((m) => {
            const done = m.bab.filter((b) => data.bab[b.id]?.selesai_at).length;
            return (
              <div key={m.id} className="rounded-2xl border border-white/8 bg-stone-900 p-5">
                <div className="mb-1 flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-stone-100">{m.judul}</h3>
                  <Pill cls="text-stone-400 bg-stone-800 ring-white/8">{m.jenis}</Pill>
                </div>
                <p className="mb-3 text-xs text-stone-500">{m.deskripsi}</p>
                <div className="mb-3 h-1.5 rounded-full bg-stone-800">
                  <div className="h-1.5 rounded-full bg-amber-500" style={{ width: `${(done / m.bab.length) * 100}%` }} />
                </div>
                <ul className="space-y-1">
                  {m.bab.map((b) => {
                    const p = data.bab[b.id];
                    return (
                      <li key={b.id}>
                        <Link to={`/cpns/belajar/bab/${b.id}`} className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-white/5">
                          <span className="flex items-center gap-2 text-stone-300">
                            {p?.selesai_at ? <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" /> : <Circle className="h-4 w-4 shrink-0 text-stone-600" />}
                            {b.judul}
                          </span>
                          {p && <span className="text-xs tabular-nums text-stone-500">{p.skor}</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                {m.jenis === "SKB" && (
                  <Link to={`/cpns/belajar/latihan/${m.id}`} className="mt-3 inline-block text-sm font-medium text-amber-400 hover:text-amber-300">
                    Latihan semua soal modul →
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      <div className="flex flex-wrap gap-2">
        <Link to="/cpns/belajar/peringkat" className="flex items-center gap-1.5 rounded-lg bg-stone-800 px-4 py-2 text-sm text-stone-300 hover:bg-stone-700">
          <Trophy className="h-4 w-4" /> Peringkat
        </Link>
        <Link to="/cpns/belajar/akun" className="flex items-center gap-1.5 rounded-lg bg-stone-800 px-4 py-2 text-sm text-stone-300 hover:bg-stone-700">
          <UserRound className="h-4 w-4" /> {user ? "Akun & target" : "Masuk & target"}
        </Link>
        {pengurus && (
          <Link to="/cpns/belajar/pengurus" className="flex items-center gap-1.5 rounded-lg bg-stone-800 px-4 py-2 text-sm text-stone-300 hover:bg-stone-700">
            <BarChart3 className="h-4 w-4" /> Statistik pengurus
          </Link>
        )}
      </div>
    </>
  );
}
