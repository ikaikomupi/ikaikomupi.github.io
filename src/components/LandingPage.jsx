import { Link } from "react-router-dom";
import {
  Users,
  GraduationCap,
  Briefcase,
  Search,
  Calendar,
  BookOpen,
  Instagram,
  Linkedin,
  ArrowRight,
  Quote,
} from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────────

const stats = [
  { icon: Users, value: "60+", label: "Teman Terhubung" },
  { icon: GraduationCap, value: "IKOM", label: "2018" },
  { icon: Briefcase, value: "15+", label: "Sektor Industri" },
];

const features = [
  {
    icon: Search,
    title: "Direktori Terintegrasi",
    description:
      "Cari dan temukan kontak teman-teman 2018 berdasarkan domisili atau industri.",
    to: "/directory",
  },
  {
    icon: Calendar,
    title: "Event & Networking",
    description:
      "Update jadwal kumpul angkatan dan reuni agar tidak ada yang ketinggalan.",
    to: "/events",
  },
  {
    icon: Briefcase,
    title: "Peluang Karir",
    description:
      "Kolaborasi dan referensi pekerjaan antar sesama alumni lintas industri.",
    to: "/karir",
  },
  {
    icon: BookOpen,
    title: "Setelah Toga",
    description:
      "Cerita, tips, dan pelajaran nyata dari alumni IKOM 2018 tentang hidup setelah wisuda.",
    to: "/setelah-toga",
    featured: true,
  },
];

const spotlights = [
  {
    name: "Alanis Rani Rayhana",
    role: "Alumni IKOM UPI 2018",
    quote:
      "Jadi alumni IKOM UPI bukan cuma soal gelar — tapi tentang cara berpikir kritis yang dibentuk sejak kelas pertama. Itu yang sampai sekarang paling terasa manfaatnya di dunia kerja.",
    initials: "AR",
  },
  {
    name: "Wanda Putri Rachmalita",
    role: "Alumni IKOM UPI 2018",
    quote:
      "IKOM 2018 ngajarin saya bahwa komunikasi itu bukan cuma bicara — tapi tentang memahami. Pelajaran itu yang bikin saya bertahan dan berkembang di industri yang terus berubah.",
    initials: "WP",
  },
  {
    name: "Den Reza Alfian Farid",
    role: "Alumni IKOM UPI 2018",
    quote:
      "Yang paling berharga dari IKOM bukan hanya ilmunya, tapi orangnya. Angkatan 2018 itu penuh orang-orang yang saling menguatkan — dan energi itu masih terasa sampai sekarang.",
    initials: "DR",
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, value, label }) {
  return (
    <div className="group flex flex-col items-center gap-3 px-3 py-10 text-center sm:px-6 sm:py-12">
      <Icon className="h-4 w-4 text-amber-500/50" />
      <p className="text-3xl font-black tabular-nums tracking-tight text-white sm:text-4xl md:text-5xl">
        {value}
      </p>
      <div className="h-px w-8 bg-amber-500/40" />
      <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">{label}</p>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, to, featured }) {
  if (featured) {
    return (
      <Link
        to={to}
        className="group relative col-span-full overflow-hidden rounded-2xl border border-white/8 bg-stone-900/70 p-8 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/25 hover:bg-stone-900 hover:shadow-2xl hover:shadow-amber-500/5"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="flex items-center gap-6">
          <div className="shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400 transition-all duration-300 group-hover:border-amber-500/40 group-hover:bg-amber-500/15 group-hover:text-amber-300">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="mb-1 text-base font-semibold text-stone-100">{title}</h3>
            <p className="text-sm leading-relaxed text-stone-500">{description}</p>
          </div>
          <ArrowRight className="ml-auto shrink-0 h-5 w-5 text-stone-600 transition-colors group-hover:text-amber-400" />
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={to}
      className="group relative overflow-hidden rounded-2xl border border-white/8 bg-stone-900/70 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-500/25 hover:bg-stone-900 hover:shadow-2xl hover:shadow-amber-500/5"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400 transition-all duration-300 group-hover:border-amber-500/40 group-hover:bg-amber-500/15 group-hover:text-amber-300">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mb-2 text-base font-semibold text-stone-100">{title}</h3>
      <p className="text-sm leading-relaxed text-stone-500">{description}</p>
    </Link>
  );
}

function SpotlightCard({ name, role, quote, initials }) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
      <Quote className="h-8 w-8 text-amber-200" />
      <p className="flex-1 text-base leading-relaxed text-stone-600">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-stone-900">{name}</p>
          <p className="text-xs text-stone-500">{role}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-stone-950 font-sans antialiased">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative flex h-screen items-center justify-center overflow-hidden bg-stone-950 px-6 text-center">
        {/* Cinematic background image */}
        <div
          className="pointer-events-none absolute inset-0 scale-105 bg-cover bg-center"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            filter: "brightness(0.35) saturate(0.6)",
          }}
        />

        {/* Dark gradient overlays for depth */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/20 to-stone-950/80" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-stone-950/50 via-transparent to-stone-950/50" />

        {/* Warm amber tint layer */}
        <div className="pointer-events-none absolute inset-0 bg-amber-950/20 mix-blend-multiply" />

        <div className="relative mx-auto max-w-3xl">
          <span className="mb-6 inline-block rounded-full bg-amber-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 ring-1 ring-amber-500/30">
            IKA IKOM UPI · Angkatan 2018
          </span>

          <h1 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
            Merajut Koneksi,
            <br />
            <span className="text-amber-400">Membangun Kolaborasi.</span>
          </h1>

          <div className="mb-8 flex items-center justify-center gap-2">
            <span className="text-xl font-black text-amber-400">#</span>
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-stone-300 sm:text-base">
              Terhubung
            </span>
            <span className="text-amber-500/50">·</span>
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-stone-300 sm:text-base">
              Tumbuh
            </span>
            <span className="text-amber-500/50">·</span>
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-stone-300 sm:text-base">
              Terdampak
            </span>
          </div>

          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-stone-400 md:text-lg">
            Wadah resmi jaringan IKA IKOM UPI 2018. Tetap terhubung
            dengan teman seangkatan, kembangkan karir, dan bangun sinergi
            bersama.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/directory"
              className="flex items-center gap-2 rounded-xl bg-amber-500 px-7 py-3.5 text-sm font-semibold text-stone-950 shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-amber-400/30 active:translate-y-0"
            >
              Eksplor Direktori
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/register"
              className="rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-stone-300 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white"
            >
              Daftar Jejaring
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="relative border-y border-white/6 bg-stone-950 px-6">
        {/* Ambient amber radial glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,rgba(245,158,11,0.06),transparent)]" />
        <div className="relative mx-auto grid max-w-4xl grid-cols-3 divide-x divide-white/8">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-stone-950 px-6 py-24">
        {/* Dot-grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-100"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        {/* Bottom fade-out over grid */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-stone-950 to-transparent" />
        {/* Amber bloom top-center */}
        <div
          className="pointer-events-none absolute -top-32 left-1/2 h-72 w-96 -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "rgba(245,158,11,0.07)" }}
        />

        <div className="relative mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-amber-500">
              Platform
            </span>
            <h2 className="text-3xl font-bold text-stone-100">
              Jangan Sampai Kita Kehilangan Satu Sama Lain
            </h2>
            <p className="mt-3 text-base text-stone-500">
              Setelah wisuda, kehidupan membawa kita ke arah yang berbeda-beda. Platform ini hadir supaya jarak tidak memutus cerita.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Pesan Ketua Angkatan ──────────────────────────────────────────── */}
      <section className="bg-stone-950 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          {/* Section header */}
          <div className="mb-12 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/8" />
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">
              Pesan dari Ketua IKA IKOM UPI 2018
            </span>
            <div className="h-px flex-1 bg-white/8" />
          </div>

          <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-16">
            {/* Photo */}
            <div className="relative shrink-0">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-amber-500/40 to-transparent blur-md" />
              <img
                src="/cecep.jpg"
                alt="Cecep Abdurrohman Malik Ibrahim"
                className="relative h-64 w-52 rounded-2xl object-cover object-top ring-1 ring-white/10"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col justify-center">
              {/* Big opening quote mark */}
              <span className="mb-4 block font-serif text-7xl leading-none text-amber-500/30 select-none">
                "
              </span>
              <blockquote className="-mt-8 text-lg font-medium leading-relaxed text-stone-200 md:text-xl">
                Mari kita bangun IKA IKOM UPI 2018 bersama — bukan sekadar
                reuni, tapi wadah nyata yang relevan, inklusif, dan berdampak.
                Bagi sesama alumni, bagi almamater, dan bagi masyarakat luas.
                Perjalanan kita tidak berhenti di hari wisuda — ini baru
                permulaan.
              </blockquote>

              <div className="mt-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <div className="text-right">
                  <p className="font-semibold text-white">
                    Cecep Abdurrohman Malik Ibrahim
                  </p>
                  <p className="text-sm text-amber-400">
                    Ketua IKA IKOM UPI 2018
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Alumni Spotlight ──────────────────────────────────────────────── */}
      <section className="bg-amber-50 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-stone-900">
              Alumni Bercerita
            </h2>
            <p className="text-base text-stone-500">
              Dengar langsung dari teman-teman yang sudah aktif di komunitas.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {spotlights.map((member) => (
              <SpotlightCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="bg-stone-950 px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-stone-500">
            © 2026 IKA IKOM UPI 2018. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/ikomupi2018/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-stone-600 transition-colors hover:text-amber-500"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
