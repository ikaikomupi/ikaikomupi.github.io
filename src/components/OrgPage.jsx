import FotoLatar from "./FotoLatar";

import { PERIODE, pembina, inti, bidang as dataBidang } from "../data/pengurus";

const warnaBidang = { A: "amber", B: "orange", C: "red" };
const bidang = dataBidang.map((b) => ({ ...b, warna: warnaBidang[b.kode] }));

const warna = {
  amber: { label: "bg-amber-500/15 text-amber-400 ring-amber-500/30", avatar: "bg-amber-600", garis: "bg-amber-500" },
  orange: { label: "bg-orange-500/15 text-orange-400 ring-orange-500/30", avatar: "bg-orange-600", garis: "bg-orange-500" },
  red: { label: "bg-red-500/15 text-red-400 ring-red-500/30", avatar: "bg-red-700", garis: "bg-red-500" },
};

// Inisial dari 2 kata pertama yang bukan singkatan (mis. "M." dilewati kalau ada kata lain).
function inisial(nama) {
  const kata = nama.replace(/[^\p{L}\s]/gu, " ").split(/\s+/).filter(Boolean);
  const penuh = kata.filter((k) => k.length > 1);
  const pakai = penuh.length >= 2 ? penuh : kata;
  return (pakai[0][0] + (pakai[1]?.[0] || "")).toUpperCase();
}

function Avatar({ nama, cls = "bg-stone-600", size = "md" }) {
  const sz = size === "lg" ? "h-16 w-16 text-lg" : size === "sm" ? "h-9 w-9 text-xs" : "h-12 w-12 text-sm";
  return (
    <div className={`flex shrink-0 items-center justify-center rounded-full font-bold text-[#fff] ${sz} ${cls}`} aria-hidden="true">
      {inisial(nama)}
    </div>
  );
}

function Orang({ jabatan, nama, avatarCls }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/8">
      <Avatar nama={nama} cls={avatarCls} size="sm" />
      <div className="min-w-0">
        {jabatan && <p className="text-xs font-medium text-stone-400">{jabatan}</p>}
        <p className="text-sm font-semibold text-stone-100">{nama}</p>
      </div>
    </div>
  );
}

function JudulBagian({ no, children }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span className="font-display text-sm font-semibold text-amber-400">{no}</span>
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">{children}</h2>
      <div className="h-px flex-1 bg-white/8" />
    </div>
  );
}

export default function OrgPage() {
  const [ketua, ...lainnya] = inti;
  return (
    <div className="min-h-screen bg-stone-950">
      {/* Header */}
      <div className="relative overflow-hidden px-6 pb-20 pt-36 text-center">
        <FotoLatar nama="directory-bg" prioritas className="scale-105" style={{ "--redup": 0.2, "--jenuh": 0.4 }} />
        <div className="sorot-hero pointer-events-none absolute inset-0" />
        <div className="veil-hero pointer-events-none absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/10 to-stone-950" />
        <div className="panel-hero relative mx-auto max-w-2xl">
          <span className="mb-4 inline-block rounded-full bg-amber-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 ring-1 ring-amber-500/30">
            Periode {PERIODE}
          </span>
          <h1 className="mb-3 text-3xl font-extrabold text-white md:text-5xl">Susunan Pengurus</h1>
          <p className="text-stone-400">Ikatan Keluarga Alumni Ilmu Komunikasi Universitas Pendidikan Indonesia</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-16 px-6 pb-20">
        {/* 1. Pengurus Inti */}
        <section>
          <JudulBagian no="01">Pengurus Inti</JudulBagian>
          <div className="flex flex-col items-center gap-4 pb-8 text-center">
            <div className="relative">
              <div className="absolute -inset-1.5 rounded-full bg-amber-500/30 blur-md" />
              <Avatar nama={ketua.nama} cls="relative bg-amber-600" size="lg" />
            </div>
            <div>
              <span className="inline-block rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-400 ring-1 ring-amber-500/30">
                {ketua.jabatan}
              </span>
              <p className="mt-2 text-lg font-bold text-stone-100">{ketua.nama}</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {lainnya.map((o) => (
              <Orang key={o.nama} {...o} avatarCls="bg-amber-700" />
            ))}
          </div>
        </section>

        {/* 2. Koordinator Bidang */}
        <section>
          <JudulBagian no="02">Koordinator Bidang</JudulBagian>
          <div className="grid gap-5 lg:grid-cols-3">
            {bidang.map((b) => {
              const c = warna[b.warna];
              return (
                <div key={b.kode} className="relative flex flex-col overflow-hidden rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                  <div className={`absolute inset-x-0 top-0 h-0.5 ${c.garis}`} />
                  <span className={`mb-3 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${c.label}`}>
                    Bidang {b.kode}
                  </span>
                  <h3 className="text-base font-semibold leading-snug text-stone-100">{b.nama}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-stone-400">{b.tugas}</p>
                  <div className="mt-5 flex flex-col gap-2.5">
                    <Orang jabatan="Koordinator" nama={b.koordinator} avatarCls={c.avatar} />
                    {b.anggota.map((n) => (
                      <Orang key={n} jabatan="Anggota" nama={n} avatarCls="bg-stone-600" />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Dewan Pembina */}
        <section>
          <JudulBagian no="03">Dewan Pembina / Penasihat</JudulBagian>
          <p className="-mt-2 mb-5 text-sm text-stone-400">
            Memberikan arahan strategis dan tidak menjalankan kerja operasional harian.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Orang jabatan="Ketua" nama={pembina.ketua} avatarCls="bg-stone-500" />
            {pembina.anggota.map((n) => (
              <Orang key={n} jabatan="Anggota" nama={n} avatarCls="bg-stone-600" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
