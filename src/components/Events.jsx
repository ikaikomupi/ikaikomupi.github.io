import { useState, useEffect } from "react";
import { fetchEvents } from "../lib/sheets";
import { MapPin, Clock, ExternalLink, Calendar } from "lucide-react";

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
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-stone-950 hover:bg-amber-400 transition-colors"
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

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/8 bg-stone-900 p-6">
      <div className="flex items-start gap-5">
        <div className="h-16 w-14 animate-pulse rounded-xl bg-stone-800" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-16 animate-pulse rounded bg-stone-800" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-stone-800" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-stone-800" />
        </div>
      </div>
    </div>
  );
}

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Semua");
  const [tab, setTab] = useState("upcoming");

  useEffect(() => {
    fetchEvents().then((data) => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  const today = new Date(new Date().toDateString());

  const sorted = [...events].sort(
    (a, b) => new Date(a.tanggal) - new Date(b.tanggal)
  );

  const upcoming = sorted.filter((e) => new Date(e.tanggal) >= today);
  const past = sorted
    .filter((e) => new Date(e.tanggal) < today)
    .reverse();

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
            AIKU 2018
          </span>
          <h1 className="mb-4 text-4xl font-bold text-stone-100">Event & Agenda</h1>
          <p className="text-base leading-relaxed text-stone-400">
            Jadwal kumpul, reunian, webinar, dan kegiatan angkatan Ilmu Komunikasi 2018.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10">
        {/* Upcoming / Selesai tabs */}
        <div className="mb-6 flex rounded-xl border border-white/8 bg-stone-900 p-1">
          {[
            { key: "upcoming", label: `Akan Datang${!loading ? ` (${upcoming.length})` : ""}` },
            { key: "past", label: `Selesai${!loading ? ` (${past.length})` : ""}` },
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

        {/* Kategori filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {KATEGORI.map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                filter === k
                  ? "bg-amber-500 text-stone-950"
                  : "bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-white"
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
          </div>
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
