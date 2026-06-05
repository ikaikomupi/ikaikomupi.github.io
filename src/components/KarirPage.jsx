import { useState } from "react";
import { Briefcase, MapPin, MessageCircle, Clock, User } from "lucide-react";

const DUMMY_LOWONGAN = [
  {
    id: "1",
    tipe: "Full-time",
    industri: "Komunikasi",
    judul: "Contoh: Content Creator",
    perusahaan: "Perusahaan Alumni",
    kota: "Bandung",
    poster_nama: "Alumni IKOM UPI",
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    deskripsi: "Ini adalah contoh tampilan lowongan. Fitur ini akan segera aktif — lowongan nyata akan dibagikan langsung oleh alumni IKOM UPI.",
    kontak: null,
    created_at: new Date().toISOString(),
  },
];

const TIPE = ["Semua", "Full-time", "Part-time", "Magang", "Freelance"];

const TIPE_COLOR = {
  "Full-time": "text-amber-400 bg-amber-500/10 ring-amber-500/20",
  "Part-time": "text-sky-400 bg-sky-500/10 ring-sky-500/20",
  "Magang": "text-emerald-400 bg-emerald-500/10 ring-emerald-500/20",
  "Freelance": "text-purple-400 bg-purple-500/10 ring-purple-500/20",
};

function DeadlineBadge({ deadline }) {
  if (!deadline) return null;
  const d = new Date(deadline);
  const now = new Date();
  const daysLeft = Math.ceil((d - now) / (1000 * 60 * 60 * 24));
  const isExpired = daysLeft < 0;
  const isUrgent = daysLeft >= 0 && daysLeft <= 7;

  const label = isExpired
    ? "Ditutup"
    : daysLeft === 0
    ? "Hari ini"
    : `${daysLeft} hari lagi`;

  return (
    <span
      className={`flex items-center gap-1 text-xs ${
        isExpired
          ? "text-stone-600"
          : isUrgent
          ? "text-rose-400"
          : "text-stone-500"
      }`}
    >
      <Clock className="h-3.5 w-3.5" />
      Deadline: {label}
    </span>
  );
}

function LowonganCard({ item }) {
  const [expanded, setExpanded] = useState(false);
  const tipeClass = TIPE_COLOR[item.tipe] || "text-stone-400 bg-stone-500/10 ring-stone-500/20";
  const isExpired = item.deadline ? new Date(item.deadline) < new Date() : false;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border bg-stone-900 transition-all duration-300 ${
        isExpired
          ? "border-white/5 opacity-60"
          : "border-white/8 hover:border-amber-500/20 hover:shadow-lg hover:shadow-amber-500/5"
      }`}
    >
      {!isExpired && (
        <div className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-amber-500/60 via-amber-500/20 to-transparent" />
      )}

      <div className="p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${tipeClass}`}>
            {item.tipe}
          </span>
          {item.industri && (
            <span className="rounded-full bg-stone-800 px-2.5 py-0.5 text-xs text-stone-400 ring-1 ring-white/8">
              {item.industri}
            </span>
          )}
          {isExpired && (
            <span className="rounded-full bg-stone-800 px-2.5 py-0.5 text-xs text-stone-500 ring-1 ring-white/5">
              Ditutup
            </span>
          )}
        </div>

        <h3 className="mb-1 text-base font-semibold text-stone-100 leading-snug">
          {item.judul}
        </h3>
        <p className="mb-3 text-sm font-medium text-amber-400/80">{item.perusahaan}</p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500">
          {item.kota && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {item.kota}
            </span>
          )}
          {item.poster_nama && (
            <span className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              Dibagikan oleh {item.poster_nama}
            </span>
          )}
          <DeadlineBadge deadline={item.deadline} />
        </div>

        {item.deskripsi && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-3 text-xs font-medium text-amber-500/70 hover:text-amber-400 transition-colors"
          >
            {expanded ? "Sembunyikan ↑" : "Lihat detail ↓"}
          </button>
        )}

        {expanded && (
          <p className="mt-3 border-t border-white/6 pt-3 text-sm leading-relaxed text-stone-400">
            {item.deskripsi}
          </p>
        )}

        {expanded && item.kontak && !isExpired && (
          <a
            href={`https://wa.me/${item.kontak.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-stone-950 hover:bg-amber-400 transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Hubungi via WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}


export default function KarirPage() {
  const [filter, setFilter] = useState("Semua");

  const filtered =
    filter === "Semua"
      ? DUMMY_LOWONGAN
      : DUMMY_LOWONGAN.filter((l) => l.tipe === filter);

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
          <h1 className="mb-4 text-4xl font-bold text-stone-100">Karir & Referral</h1>
          <p className="text-base leading-relaxed text-stone-400">
            Lowongan kerja dan referral peluang yang dibagikan antar alumni IKOM UPI.
            Saling bantu, saling tumbuh.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10">
        {/* Filter tipe */}
        <div className="mb-8 flex flex-wrap gap-2">
          {TIPE.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                filter === t
                  ? "bg-amber-500 text-stone-950"
                  : "bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <Briefcase className="mx-auto mb-4 h-12 w-12 text-stone-700" />
            <p className="text-stone-500">Belum ada lowongan untuk kategori ini.</p>
            <p className="mt-2 text-sm text-stone-600">
              Punya lowongan atau referral? Bagikan ke grup WA angkatan.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((item) => (
              <LowonganCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
