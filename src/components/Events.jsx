import { useEffect, useMemo, useState } from "react";
import { fetchEvents } from "../lib/sheets";
import ContohBanner from "./ContohBanner";
import { MapPin, Clock, ExternalLink, Calendar, CalendarDays, List, ChevronLeft, ChevronRight } from "lucide-react";

const DUMMY_EVENTS = [
  {
    id: "1",
    judul: "Alumni Gathering AIKU",
    kategori: "Gathering",
    tanggal: "2026-06-01",
    waktu: "09.00–14.00",
    lokasi: "Gedung FPIPS Lantai 5",
    deskripsi: "Alumni gathering dalam rangka penyambutan kepengurusan baru IKA IKOM UPI. Mari hadir dan saling terhubung kembali!",
    link_daftar: null,
    contoh: true,
  },
];

const KATEGORI = ["Semua", "Reuni", "Gathering", "Webinar", "Workshop"];

const KATEGORI_COLOR = {
  Reuni: "text-amber-400 bg-amber-500/10 ring-amber-500/20",
  Gathering: "text-orange-400 bg-orange-500/10 ring-orange-500/20",
  Webinar: "text-sky-400 bg-sky-500/10 ring-sky-500/20",
  Workshop: "text-emerald-400 bg-emerald-500/10 ring-emerald-500/20",
  Event: "text-stone-400 bg-stone-500/10 ring-stone-500/20",
};

function DateBadge({ tanggal }) {
  if (!tanggal) return null;
  const d = new Date(tanggal);
  const day = d.toLocaleDateString("id-ID", { day: "2-digit" });
  const month = d.toLocaleDateString("id-ID", { month: "short" });
  const year = d.getFullYear();
  return (
    <div className="flex w-14 shrink-0 flex-col items-center rounded-xl border border-white/8 bg-stone-900 py-2.5 text-center">
      <span className="text-xl font-black leading-none text-white">{day}</span>
      <span className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-amber-400">{month}</span>
      <span className="mt-0.5 text-xs text-stone-600">{year}</span>
    </div>
  );
}

function EventCard({ event }) {
  const [expanded, setExpanded] = useState(false);
  const isPast = event.tanggal ? new Date(event.tanggal) < new Date(new Date().toDateString()) : false;
  const badgeClass = KATEGORI_COLOR[event.kategori] || KATEGORI_COLOR.Event;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border bg-stone-900 transition-all duration-300 ${
        isPast
          ? "border-white/5 opacity-60"
          : "border-white/8 hover:border-amber-500/20 hover:shadow-lg hover:shadow-amber-500/5"
      }`}
    >
      {/* Upcoming amber left accent */}
      {!isPast && (
        <div className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-amber-500/60 via-amber-500/20 to-transparent" />
      )}

      <div className="flex items-start gap-5 p-6">
        <DateBadge tanggal={event.tanggal} />

        <div className="flex-1 min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${badgeClass}`}>
              {event.kategori}
            </span>
            {isPast && (
              <span className="rounded-full bg-stone-800 px-2.5 py-0.5 text-xs text-stone-500 ring-1 ring-white/5">
                Selesai
              </span>
            )}
          </div>

          <h3 className="mb-2 text-base font-semibold text-stone-100 leading-snug">
            {event.judul}
          </h3>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500">
            {event.waktu && (
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {event.waktu} WIB
              </span>
            )}
            {event.lokasi && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {event.lokasi}
              </span>
            )}
          </div>

          {/* Expand toggle */}
          {event.deskripsi && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-3 text-xs font-medium text-amber-500/70 hover:text-amber-400 transition-colors"
            >
              {expanded ? "Sembunyikan ↑" : "Lihat detail ↓"}
            </button>
          )}

          {expanded && (
            <p className="mt-3 text-sm leading-relaxed text-stone-400 border-t border-white/6 pt-3">
              {event.deskripsi}
            </p>
          )}

          {expanded && event.link_daftar && (
            <a
              href={event.link_daftar}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-ink hover:bg-amber-400 transition-colors"
            >
              Daftar Sekarang
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

const TITIK_COLOR = {
  Reuni: "bg-amber-400",
  Gathering: "bg-orange-400",
  Webinar: "bg-sky-400",
  Workshop: "bg-emerald-400",
  Event: "bg-stone-400",
};

// Tanggal dari Sheets bisa "2026-06-01" atau format lain; dibaca sebagai tanggal lokal.
function bacaTanggal(t) {
  if (!t) return null;
  const m = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(t);
  const d = m ? new Date(+m[1], +m[2] - 1, +m[3]) : new Date(t);
  return isNaN(d) ? null : new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
const urutWaktu = (a, b) => bacaTanggal(a.tanggal) - bacaTanggal(b.tanggal) || (a.waktu || "").localeCompare(b.waktu || "");
const kunci = (d) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
const HARI = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

function Kalender({ events }) {
  const today = new Date(new Date().toDateString());
  const [bulan, setBulan] = useState(() => {
    const berikut = events.map((e) => bacaTanggal(e.tanggal)).filter((d) => d && d >= today).sort((a, b) => a - b)[0];
    const d = berikut || today;
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [dipilih, setDipilih] = useState(null);

  const perHari = useMemo(() => {
    const m = new Map();
    for (const e of events) {
      const d = bacaTanggal(e.tanggal);
      if (!d) continue;
      const k = kunci(d);
      m.set(k, [...(m.get(k) || []), e]);
    }
    for (const list of m.values()) list.sort(urutWaktu);
    return m;
  }, [events]);

  const y = bulan.getFullYear(), mo = bulan.getMonth();
  const offset = (new Date(y, mo, 1).getDay() + 6) % 7; // minggu mulai Senin
  const jmlHari = new Date(y, mo + 1, 0).getDate();
  const sel = Array.from({ length: Math.ceil((offset + jmlHari) / 7) * 7 }, (_, i) => {
    const n = i - offset + 1;
    return n >= 1 && n <= jmlHari ? new Date(y, mo, n) : null;
  });

  const geser = (n) => { setBulan(new Date(y, mo + n, 1)); setDipilih(null); };
  const daftar = dipilih
    ? perHari.get(kunci(dipilih)) || []
    : events.filter((e) => { const d = bacaTanggal(e.tanggal); return d && d.getFullYear() === y && d.getMonth() === mo; })
        .sort(urutWaktu);

  return (
    <div>
      <div className="rounded-2xl border border-white/8 bg-stone-900 p-3 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <button onClick={() => geser(-1)} aria-label="Bulan sebelumnya" className="rounded-lg p-2 text-stone-400 hover:bg-stone-800 hover:text-stone-100">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="text-center">
            <p className="text-base font-semibold capitalize text-stone-100">
              {bulan.toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
            </p>
            {(y !== today.getFullYear() || mo !== today.getMonth()) && (
              <button onClick={() => { setBulan(new Date(today.getFullYear(), today.getMonth(), 1)); setDipilih(null); }} className="text-xs text-amber-500/80 hover:text-amber-400">
                Ke bulan ini
              </button>
            )}
          </div>
          <button onClick={() => geser(1)} aria-label="Bulan berikutnya" className="rounded-lg p-2 text-stone-400 hover:bg-stone-800 hover:text-stone-100">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wide text-stone-500">
          {HARI.map((h) => <div key={h} className="pb-2">{h}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {sel.map((d, i) => {
            if (!d) return <div key={i} />;
            const ev = perHari.get(kunci(d)) || [];
            const isToday = +d === +today;
            const isSel = dipilih && +d === +dipilih;
            const lewat = d < today;
            return (
              <button
                key={i}
                onClick={() => setDipilih(isSel ? null : d)}
                className={`flex min-h-14 flex-col items-stretch rounded-lg border p-1 text-left transition-colors sm:min-h-20 sm:p-1.5 ${
                  isSel ? "border-amber-500/60 bg-amber-500/10" : ev.length ? "border-white/10 bg-stone-800/60 hover:border-amber-500/30" : "border-transparent hover:bg-stone-800/40"
                }`}
              >
                <span className={`mx-auto flex h-6 w-6 items-center justify-center rounded-full text-xs sm:mx-0 ${
                  isToday ? "bg-amber-500 font-bold text-ink" : lewat ? "text-stone-600" : "text-stone-300"
                }`}>
                  {d.getDate()}
                </span>
                {ev.length > 0 && (
                  <>
                    <span className="mt-1 flex justify-center gap-0.5 sm:hidden">
                      {ev.slice(0, 3).map((e) => <span key={e.id} className={`h-1.5 w-1.5 rounded-full ${TITIK_COLOR[e.kategori] || TITIK_COLOR.Event}`} />)}
                    </span>
                    <span className="mt-1 hidden space-y-0.5 sm:block">
                      {ev.slice(0, 2).map((e) => (
                        <span key={e.id} className={`block truncate rounded px-1 py-0.5 text-[10px] font-medium ring-1 ${KATEGORI_COLOR[e.kategori] || KATEGORI_COLOR.Event} ${lewat ? "opacity-60" : ""}`}>
                          {e.judul}
                        </span>
                      ))}
                      {ev.length > 2 && <span className="block px-1 text-[10px] text-stone-500">+{ev.length - 2} lagi</span>}
                    </span>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-baseline justify-between gap-3">
          <h2 className="text-sm font-semibold text-stone-300">
            {dipilih
              ? dipilih.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
              : `Semua kegiatan ${bulan.toLocaleDateString("id-ID", { month: "long" })}`}
          </h2>
          {dipilih && <button onClick={() => setDipilih(null)} className="text-xs text-stone-500 hover:text-stone-300">Lihat sebulan</button>}
        </div>
        {daftar.length === 0 ? (
          <p className="rounded-2xl border border-white/5 py-10 text-center text-sm text-stone-500">
            {dipilih ? "Tidak ada kegiatan di tanggal ini." : "Tidak ada kegiatan di bulan ini."}
          </p>
        ) : (
          <div className="space-y-4">
            {daftar.map((event) => <EventCard key={event.id} event={event} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Events() {
  const [filter, setFilter] = useState("Semua");
  const [tab, setTab] = useState("upcoming");
  const [tampilan, setTampilanState] = useState(() =>
    new URLSearchParams(location.search).get("tampilan") === "kalender" ? "kalender" : "daftar"
  );
  // Simpan pilihan di URL supaya link /events?tampilan=kalender bisa dibagikan.
  const setTampilan = (t) => {
    setTampilanState(t);
    const u = new URL(location.href);
    if (t === "kalender") u.searchParams.set("tampilan", "kalender");
    else u.searchParams.delete("tampilan");
    history.replaceState(history.state, "", u);
  };

  const [events, setEvents] = useState(null);
  useEffect(() => {
    fetchEvents().then((data) => setEvents(data.every((e) => e.contoh) ? DUMMY_EVENTS : data));
  }, []);
  const semua = events || [];
  const isContoh = semua.length > 0 && semua.every((e) => e.contoh);

  const today = new Date(new Date().toDateString());

  const upcoming = semua.filter((e) => new Date(e.tanggal) >= today);
  const past = semua.filter((e) => new Date(e.tanggal) < today);

  const base = tab === "upcoming" ? upcoming : past;

  const filtered =
    filter === "Semua" ? base : base.filter((e) => e.kategori === filter);

  return (
    <div className="min-h-screen bg-stone-950 pt-16">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/8 bg-stone-950 px-6 py-16 text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div
          className="pointer-events-none absolute -top-20 left-1/2 h-60 w-80 -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "rgba(245,158,11,0.08)" }}
        />
        <div className="relative mx-auto max-w-2xl">
          <span className="mb-4 inline-block rounded-full bg-amber-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400">
            IKA IKOM UPI
          </span>
          <h1 className="mb-4 text-4xl font-bold text-stone-100">Event & Agenda</h1>
          <p className="text-base leading-relaxed text-stone-400">
            Jadwal kumpul, reunian, webinar, dan kegiatan IKA IKOM UPI.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {/* Daftar / Kalender */}
        <div className="mb-4 flex justify-end">
          <div className="inline-flex rounded-lg border border-white/8 bg-stone-900 p-0.5">
            {[
              { key: "daftar", label: "Daftar", Icon: List },
              { key: "kalender", label: "Kalender", Icon: CalendarDays },
            ].map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setTampilan(key)}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  tampilan === key ? "bg-stone-800 text-stone-100" : "text-stone-500 hover:text-stone-300"
                }`}
              >
                <Icon className="h-3.5 w-3.5" /> {label}
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming / Selesai tabs */}
        {tampilan === "daftar" && (
        <div className="mb-6 flex rounded-xl border border-white/8 bg-stone-900 p-1">
          {[
            { key: "upcoming", label: `Akan Datang (${upcoming.length})` },
            { key: "past", label: `Selesai (${past.length})` },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { setTab(key); setFilter("Semua"); }}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
                tab === key
                  ? "bg-stone-800 text-stone-100 shadow-sm"
                  : "text-stone-500 hover:text-stone-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        )}

        {/* Kategori filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {KATEGORI.map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                filter === k
                  ? "bg-amber-500 text-ink"
                  : "bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-white"
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        {isContoh && <ContohBanner>Belum ada event yang dipublikasikan. Kartu di bawah ini contoh tampilan.</ContohBanner>}

        {/* List */}
        {events === null ? (
          <p className="py-20 text-center text-sm text-stone-500">Memuat event…</p>
        ) : tampilan === "kalender" ? (
          <Kalender events={filter === "Semua" ? semua : semua.filter((e) => e.kategori === filter)} />
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <Calendar className="mx-auto mb-4 h-12 w-12 text-stone-700" />
            <p className="text-stone-500">
              {tab === "upcoming"
                ? "Belum ada event mendatang."
                : "Belum ada event yang selesai."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
