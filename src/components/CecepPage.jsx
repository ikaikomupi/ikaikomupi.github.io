import { useState } from "react";
import {
  Target,
  Zap,
  Building2,
  Users,
  CalendarDays,
  Heart,
  Search,
  Database,
  MessageSquare,
  Layers,
  DollarSign,
  FileText,
  Briefcase,
  GraduationCap,
  Globe,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Star,
  TrendingUp,
  Network,
  BookOpen,
  Award,
  Handshake,
} from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────────

const visi =
  "Membangun AIKU sebagai wadah alumni yang relevan, inklusif, dan berdampak nyata — bagi anggotanya, almamater, dan masyarakat luas.";

const misi = [
  "Mendiagnosis akar masalah vakumnya organisasi secara sistematis sebelum menyusun program kerja.",
  "Membangun infrastruktur dasar yang kuat: database alumni, kanal komunikasi terstruktur, keuangan transparan, dan sistem dokumentasi.",
  "Mengeksekusi program unggulan berbasis dampak nyata dengan timeline dan indikator keberhasilan yang terukur.",
  "Mendorong kepemimpinan kolaboratif lintas angkatan yang inklusif dan berkelanjutan.",
  "Memperkuat hubungan strategis antara alumni, mahasiswa aktif, dan almamater.",
];

const points = [
  {
    number: "01",
    icon: Search,
    title: "Diagnosis Sebelum Eksekusi",
    summary: "Pahami akar masalah sebelum menyusun solusi.",
    color: "amber",
    content: [
      "Sebelum menyusun program kerja, kepengurusan baru perlu melakukan diagnosis terlebih dahulu mengenai penyebab vakumnya organisasi selama 6 tahun.",
      "Apakah karena masalah internal kepengurusan, kurangnya manfaat yang dirasakan anggota, kendala pendanaan, atau hilangnya momentum pasca-pandemi — akar masalah ini akan menentukan arah strategi yang tepat.",
      "Salah satu langkah konkret: survei singkat lintas angkatan untuk memetakan kebutuhan dan ekspektasi alumni sebelum program apapun diluncurkan.",
    ],
  },
  {
    number: "02",
    icon: Target,
    title: "Fokus Utama, Bukan Segalanya",
    summary: "Pilih 1–2 fokus utama di periode awal.",
    color: "blue",
    content: [
      "Organisasi alumni yang berhasil punya value proposition yang jelas. Kepengurusan baru sebaiknya memilih 1–2 fokus utama saja di periode awal — apakah networking profesional, mentoring lintas angkatan, kontribusi ke almamater, atau silaturahmi.",
      "Mencoba mengerjakan semuanya sekaligus justru sering menjadi penyebab organisasi alumni mati pelan-pelan. Fokus adalah kunci keberlanjutan.",
    ],
  },
  {
    number: "03",
    icon: Zap,
    title: "Quick Wins dalam 6 Bulan Pertama",
    summary: "Bangun kredibilitas lewat hasil nyata yang cepat.",
    color: "green",
    content: [
      "Antusiasme restart akan cepat turun jika tidak ada hasil nyata. Targetkan 2–3 program kecil yang berhasil dieksekusi dengan baik, daripada satu program besar yang ambisius tapi berisiko gagal.",
      "Contoh quick wins: satu acara reuni yang well-executed, satu sesi sharing karier antar angkatan, atau satu inisiatif kontribusi sederhana ke kampus.",
      "Tujuannya bukan hanya selebrasi — tapi membangun kredibilitas organisasi dan momentum untuk program selanjutnya.",
    ],
  },
  {
    number: "04",
    icon: Building2,
    title: "Infrastruktur Dasar Sejak Hari Pertama",
    summary: "Fondasi yang kuat adalah kunci agar tidak vakum lagi.",
    color: "purple",
    content: [
      "Infrastruktur sering dianggap remeh karena tidak 'terlihat' seperti program kerja — padahal justru ini yang menentukan apakah organisasi bisa bertahan jangka panjang.",
      "Lima komponen infrastruktur wajib: (a) Database alumni ter-update dengan PIC per angkatan, (b) Kanal komunikasi terstruktur mulai dari WA grup hingga Instagram, (c) Kepengurusan ramping dengan PIC jelas, (d) Sistem keuangan transparan dengan laporan berkala, dan (e) Dokumentasi dan arsip digital yang diwariskan antar kepengurusan.",
    ],
  },
  {
    number: "05",
    icon: Handshake,
    title: "Posisi Angkatan 2018",
    summary: "Kolaborator lintas angkatan, bukan dominasi.",
    color: "rose",
    content: [
      "Sebagai angkatan yang relatif muda, angkatan 2018 bisa menawarkan kontribusi spesifik: jembatan antara alumni senior dan mahasiswa aktif, kapasitas digital dan operasional, serta energi untuk eksekusi lapangan.",
      "Calon dari angkatan 2018 harus memposisikan diri sebagai kolaborator lintas angkatan, bukan mendominasi. Kepengurusan yang inklusif akan jauh lebih sustainable daripada yang berpusat pada satu angkatan.",
    ],
  },
  {
    number: "06",
    icon: CalendarDays,
    title: "Timeline & Milestone yang Realistis",
    summary: "Roadmap 12 bulan dengan target terukur.",
    color: "teal",
    content: [
      "Kepengurusan baru perlu menyusun roadmap 12 bulan pertama dengan milestone yang terukur, bukan sekadar daftar program.",
      "Contoh: Bulan 1–2 diagnosis dan konsolidasi → Bulan 3–4 infrastruktur dasar → Bulan 5–8 quick wins program → Bulan 9–12 evaluasi dan scale-up.",
      "Dengan roadmap ini, progres bisa dievaluasi secara berkala dan anggota bisa melihat gambaran besar yang jelas.",
    ],
  },
  {
    number: "07",
    icon: Heart,
    title: "Sense of Belonging & Relevansi Alumni",
    summary: "Program yang menjawab kebutuhan nyata anggota.",
    color: "orange",
    content: [
      "Setiap program harus bisa menjawab dalam satu kalimat: 'Apa manfaat konkret yang didapat alumni dari program ini?' Kalau tidak bisa dijawab, program itu kemungkinan tidak akan menarik partisipan.",
      "Lebih baik sedikit program tapi berdampak, daripada banyak program tapi setengah jalan. Setiap program butuh PIC, timeline, anggaran, dan indikator keberhasilan yang jelas sejak awal.",
      "Bedakan antara program rutin (berjalan terus-menerus) dan program tematik (proyek dengan durasi tertentu) agar manajemen sumber daya lebih efisien.",
    ],
  },
];

const infra = [
  {
    icon: Database,
    title: "Database Alumni",
    desc: "Tim pendataan per angkatan dengan update minimal 1 tahun sekali. Data minimum: nama, kontak, domisili, bidang kerja. Tools: Google Form & Sheets.",
  },
  {
    icon: MessageSquare,
    title: "Kanal Komunikasi",
    desc: "WA grup per angkatan (informal) → WA grup utama lintas angkatan (admin-only) → Instagram untuk komunikasi eksternal dan branding.",
  },
  {
    icon: Layers,
    title: "Struktur Kepengurusan",
    desc: "Ramping dan fungsional: Ketua-Wakil, Sekretaris, Bendahara, Koordinator Program, Koordinator Komunikasi, Koordinator Hubungan Angkatan.",
  },
  {
    icon: DollarSign,
    title: "Keuangan Transparan",
    desc: "Spreadsheet terbuka untuk semua pengurus, laporan per kegiatan dan per kuartal dibagikan ke seluruh anggota, SOP pengelolaan dana yang jelas.",
  },
  {
    icon: FileText,
    title: "Dokumentasi & Arsip",
    desc: "Notulensi rapat, laporan kegiatan, AD/ART, dan foto tersimpan di Google Drive bersama — aksesnya diwariskan ke kepengurusan berikutnya.",
  },
];

const pillars = [
  {
    number: "01",
    icon: Network,
    title: "Networking & Silaturahmi",
    color: "amber",
    programs: [
      "Reuni akbar tahunan (hybrid, inklusif luar kota)",
      "Gathering regional di kota dengan konsentrasi alumni tinggi",
      "Halal bihalal sebagai tradisi tahunan yang dipertahankan",
    ],
    note: "Program paling mudah dijalankan — tapi jangan berhenti di sini.",
  },
  {
    number: "02",
    icon: TrendingUp,
    title: "Pengembangan Profesional",
    color: "blue",
    programs: [
      "Sesi sharing karier rutin (bulanan/dua bulanan)",
      "Program mentoring terstruktur: alumni senior bimbing junior (3 bulan)",
      "Job board & info lowongan dari sesama alumni",
      "Workshop skill praktis: personal branding, financial planning, dll",
    ],
    note: "Pilar pembeda antara organisasi yang 'hidup' dan yang sekadar ada.",
  },
  {
    number: "03",
    icon: GraduationCap,
    title: "Kontribusi ke Almamater",
    color: "green",
    programs: [
      "Beasiswa alumni untuk mahasiswa aktif (mulai 1–2 penerima/semester)",
      "Kuliah tamu & career talk dari alumni ke mahasiswa",
      "Mentoring akademik dan prioritas magang di tempat kerja alumni",
      "Donasi buku, alat lab, atau fasilitas kampus yang dibutuhkan",
    ],
    note: "Perkuat hubungan dengan kampus sebagai mitra strategis jangka panjang.",
  },
  {
    number: "04",
    icon: Globe,
    title: "Kontribusi Sosial",
    color: "rose",
    programs: [
      "Aksi sosial tematik (bantuan bencana, edukasi, kegiatan lingkungan)",
      "Pemberdayaan komunitas di sekitar kampus",
      "Kolaborasi dengan organisasi alumni kampus lain",
    ],
    note: "Pilar lebih fleksibel — bisa dimulai setelah organisasi lebih stabil.",
  },
];

const roadmap = [
  {
    phase: "Bulan 1–2",
    title: "Diagnosis & Konsolidasi",
    icon: Search,
    tasks: [
      "Survei lintas angkatan untuk memetakan kebutuhan",
      "Identifikasi akar masalah vakum 6 tahun",
      "Konsolidasi pengurus dan penetapan PIC",
      "Penyusunan kalender program tahunan",
    ],
  },
  {
    phase: "Bulan 3–4",
    title: "Bangun Infrastruktur",
    icon: Building2,
    tasks: [
      "Pendataan ulang database alumni",
      "Aktivasi kanal komunikasi terstruktur",
      "Setup sistem keuangan transparan",
      "Buat folder arsip Google Drive bersama",
    ],
  },
  {
    phase: "Bulan 5–8",
    title: "Eksekusi Quick Wins",
    icon: Zap,
    tasks: [
      "Gelar acara reuni atau gathering pertama",
      "Mulai sesi sharing karier bulanan",
      "Inisiasi kontribusi ke kampus (kuliah tamu)",
      "Publikasi laporan keuangan pertama",
    ],
  },
  {
    phase: "Bulan 9–12",
    title: "Evaluasi & Scale-Up",
    icon: BarChart3,
    tasks: [
      "Evaluasi seluruh program berdasarkan indikator",
      "Survei kepuasan anggota",
      "Scale-up program yang berhasil",
      "Siapkan transisi ke kepengurusan berikutnya",
    ],
  },
];

const colorMap = {
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    icon: "text-amber-400",
    badge: "bg-amber-500/15 text-amber-300 ring-amber-500/25",
    dot: "bg-amber-500",
    num: "text-amber-500/30",
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    icon: "text-blue-400",
    badge: "bg-blue-500/15 text-blue-300 ring-blue-500/25",
    dot: "bg-blue-500",
    num: "text-blue-500/30",
  },
  green: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    icon: "text-emerald-400",
    badge: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/25",
    dot: "bg-emerald-500",
    num: "text-emerald-500/30",
  },
  purple: {
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    icon: "text-violet-400",
    badge: "bg-violet-500/15 text-violet-300 ring-violet-500/25",
    dot: "bg-violet-500",
    num: "text-violet-500/30",
  },
  rose: {
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    icon: "text-rose-400",
    badge: "bg-rose-500/15 text-rose-300 ring-rose-500/25",
    dot: "bg-rose-500",
    num: "text-rose-500/30",
  },
  teal: {
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    icon: "text-teal-400",
    badge: "bg-teal-500/15 text-teal-300 ring-teal-500/25",
    dot: "bg-teal-500",
    num: "text-teal-500/30",
  },
  orange: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    icon: "text-orange-400",
    badge: "bg-orange-500/15 text-orange-300 ring-orange-500/25",
    dot: "bg-orange-500",
    num: "text-orange-500/30",
  },
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-amber-500">
      {children}
    </p>
  );
}

function SectionHeading({ children }) {
  return (
    <h2 className="mb-4 text-center text-3xl font-bold text-white md:text-4xl">
      {children}
    </h2>
  );
}

function SectionSub({ children }) {
  return (
    <p className="text-center text-base text-stone-400 md:text-lg">
      {children}
    </p>
  );
}

function PointAccordion({ point }) {
  const [open, setOpen] = useState(false);
  const c = colorMap[point.color];

  return (
    <div
      className={`rounded-2xl border ${c.border} ${c.bg} overflow-hidden transition-all`}
    >
      <button
        className="flex w-full items-center gap-5 p-6 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`text-5xl font-black leading-none ${c.num} select-none hidden sm:block`}>
          {point.number}
        </span>
        <div
          className={`shrink-0 flex h-11 w-11 items-center justify-center rounded-xl ${c.bg} border ${c.border}`}
        >
          <point.icon className={`h-5 w-5 ${c.icon}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white text-base">{point.title}</p>
          <p className="text-sm text-stone-400 mt-0.5">{point.summary}</p>
        </div>
        {open ? (
          <ChevronUp className="h-5 w-5 text-stone-500 shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-stone-500 shrink-0" />
        )}
      </button>

      {open && (
        <div className="border-t border-white/5 px-6 pb-6 pt-4 space-y-3">
          {point.content.map((para, i) => (
            <p key={i} className="text-sm leading-relaxed text-stone-300">
              {para}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function InfraCard({ icon: Icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
        <Icon className="h-5 w-5" />
      </div>
      <h4 className="mb-2 font-semibold text-white">{title}</h4>
      <p className="text-sm leading-relaxed text-stone-400">{desc}</p>
    </div>
  );
}

function PillarCard({ pillar }) {
  const c = colorMap[pillar.color];
  return (
    <div className={`rounded-2xl border ${c.border} bg-stone-900 p-7 flex flex-col gap-5`}>
      <div className="flex items-start gap-4">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${c.bg} border ${c.border}`}>
          <pillar.icon className={`h-5 w-5 ${c.icon}`} />
        </div>
        <div>
          <span className={`text-xs font-semibold uppercase tracking-wider ${c.icon}`}>
            Pilar {pillar.number}
          </span>
          <h4 className="mt-0.5 font-semibold text-white text-base">{pillar.title}</h4>
        </div>
      </div>

      <ul className="space-y-2.5">
        {pillar.programs.map((p, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-stone-300">
            <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${c.icon}`} />
            {p}
          </li>
        ))}
      </ul>

      <p className={`mt-auto rounded-lg ${c.bg} border ${c.border} px-4 py-2.5 text-xs leading-relaxed ${c.icon} italic`}>
        {pillar.note}
      </p>
    </div>
  );
}

function RoadmapCard({ phase, title, icon: Icon, tasks, index }) {
  return (
    <div className="relative flex gap-5">
      {/* Connector line */}
      {index < roadmap.length - 1 && (
        <div className="absolute left-[22px] top-14 h-full w-px bg-gradient-to-b from-amber-500/30 to-transparent" />
      )}
      {/* Icon */}
      <div className="relative shrink-0 flex h-11 w-11 items-center justify-center rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 z-10">
        <Icon className="h-5 w-5" />
      </div>
      {/* Content */}
      <div className="pb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">{phase}</span>
        <h4 className="mt-1 mb-3 text-base font-semibold text-white">{title}</h4>
        <ul className="space-y-2">
          {tasks.map((t, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-stone-400">
              <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500/60" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function CecepPage() {
  return (
    <div className="min-h-screen bg-stone-950 font-sans antialiased pt-16">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-stone-950 px-6 py-24 md:py-32">
        {/* Group photo background */}
        <div
          className="pointer-events-none absolute inset-0 scale-105 bg-cover bg-center"
          style={{
            backgroundImage: "url('/group-bg.jpg')",
            filter: "brightness(0.18) saturate(0.5)",
          }}
        />
        {/* Dark gradient overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/10 to-stone-950/90" />
        <div className="pointer-events-none absolute inset-0 bg-amber-950/15 mix-blend-multiply" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="mb-6 inline-block rounded-full bg-amber-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 ring-1 ring-amber-500/30">
            Pencalonan Ketua AIKU · Angkatan 2018
          </span>

          {/* Photo */}
          <div className="relative mx-auto mb-8 h-32 w-32">
            <div className="pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-br from-amber-500/50 to-transparent blur-md" />
            <img
              src="/cecep.jpg"
              alt="Cecep Abdurrahman Malik Ibrahim"
              className="relative h-32 w-32 rounded-full object-cover object-top ring-2 ring-amber-500/40 ring-offset-2 ring-offset-stone-950"
            />
          </div>

          <h1 className="mb-3 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
            Cecep Abdurrahman
            <br />
            <span className="text-amber-400">Malik Ibrahim</span>
          </h1>

          <p className="mb-2 text-base font-medium text-stone-400">
            Ilmu Komunikasi UPI · Angkatan 2018
          </p>

          <div className="mx-auto mt-8 mb-10 max-w-2xl">
            <p className="text-base leading-relaxed text-stone-400 md:text-lg">
              Calon Ketua AIKU (Alumni Ikatan Komunikasi UPI) yang membawa
              pendekatan berbasis diagnosis, infrastruktur yang kuat, dan
              kepemimpinan kolaboratif lintas angkatan.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {["7 Poin Pengembangan", "4 Pilar Program", "Roadmap 12 Bulan"].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-stone-300 ring-1 ring-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visi & Misi ───────────────────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-stone-950 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionLabel>Visi & Misi</SectionLabel>
          <SectionHeading>Arah yang Jelas,<br />Langkah yang Terukur</SectionHeading>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Visi */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/10 to-amber-800/5 border border-amber-500/20 p-8">
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl" />
              <div className="relative">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400">
                  <Star className="h-6 w-6" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-white">Visi</h3>
                <p className="text-base leading-relaxed text-stone-300 italic">
                  "{visi}"
                </p>
              </div>
            </div>

            {/* Misi */}
            <div className="rounded-3xl border border-white/8 bg-white/3 p-8">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8 text-stone-300">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="mb-5 text-xl font-bold text-white">Misi</h3>
              <ul className="space-y-3">
                {misi.map((m, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-stone-300">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
                      {i + 1}
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7 Poin Pengembangan ───────────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-stone-900 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <SectionLabel>Masukan dari Angkatan 2018</SectionLabel>
          <SectionHeading>7 Poin Pengembangan</SectionHeading>
          <SectionSub>
            Pemikiran strategis yang ingin dibawa sebagai bahan diskusi dan pertimbangan bersama.
          </SectionSub>

          <div className="mt-12 space-y-4">
            {points.map((point) => (
              <PointAccordion key={point.number} point={point} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Infrastruktur Dasar ───────────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-stone-950 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionLabel>Fondasi Organisasi</SectionLabel>
          <SectionHeading>5 Komponen Infrastruktur Dasar</SectionHeading>
          <SectionSub>
            Yang sering dianggap remeh — padahal inilah yang menentukan apakah organisasi bertahan atau vakum lagi.
          </SectionSub>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {infra.map((item) => (
              <InfraCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 Pilar Program ───────────────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-stone-900 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionLabel>Rencana Program Kerja</SectionLabel>
          <SectionHeading>4 Pilar Program</SectionHeading>
          <SectionSub>
            Kerangka program yang seimbang — dari silaturahmi hingga kontribusi sosial.
          </SectionSub>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <PillarCard key={pillar.number} pillar={pillar} />
            ))}
          </div>

          {/* Rekomendasi tahun pertama */}
          <div className="mt-10 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h4 className="mb-3 font-semibold text-white">
                  Rekomendasi Program Tahun Pertama
                </h4>
                <ul className="space-y-2">
                  {[
                    "1 program flagship (reuni akbar) sebagai pembuktian organisasi aktif kembali",
                    "1–2 program rutin dari Pilar 2 — sharing karier bulanan karena paling berkelanjutan",
                    "1 program kontribusi dari Pilar 3 (kuliah tamu atau beasiswa skala kecil)",
                    "Pilar 4 menunggu hingga organisasi lebih stabil",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-stone-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-amber-400/80 italic">
                  Total 4–5 program di tahun pertama sudah cukup. Lebih dari itu berisiko burnout pengurus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Roadmap 12 Bulan ──────────────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-stone-950 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>Timeline</SectionLabel>
          <SectionHeading>Roadmap 12 Bulan Pertama</SectionHeading>
          <SectionSub>
            Milestone yang realistis dan terukur — bukan sekadar daftar program.
          </SectionSub>

          <div className="mt-12">
            {roadmap.map((item, i) => (
              <RoadmapCard key={item.phase} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Indikator Keberhasilan ────────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-stone-900 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <SectionLabel>Akuntabilitas</SectionLabel>
          <SectionHeading>Indikator Keberhasilan</SectionHeading>
          <SectionSub>
            Setiap program butuh tolok ukur yang nyata — bukan sekadar "berhasil dilaksanakan".
          </SectionSub>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {[
              {
                icon: Users,
                title: "Tingkat Partisipasi",
                desc: "Jumlah hadir dibandingkan target per kegiatan. Evaluasi per program.",
              },
              {
                icon: Star,
                title: "Kepuasan Peserta",
                desc: "Survei singkat pasca-event untuk mengukur kualitas dan relevansi program.",
              },
              {
                icon: TrendingUp,
                title: "Repeat Participation",
                desc: "Apakah orang yang sama datang lagi di acara berikutnya — indikator kuat program bermanfaat.",
              },
              {
                icon: Award,
                title: "Dampak Konkret",
                desc: "Untuk program mentoring/beasiswa: dampak terukur pada penerima manfaat.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-2xl border border-white/8 bg-white/3 p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="mb-1.5 font-semibold text-white">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-stone-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-stone-500">
            Evaluasi dilakukan per program dan per kuartal — hasilnya dibagikan ke seluruh anggota sebagai bentuk akuntabilitas.
          </p>
        </div>
      </section>

      {/* ── Penutup ───────────────────────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-stone-950 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="relative inline-block mb-8">
            <div className="pointer-events-none absolute -inset-1 rounded-full bg-amber-500/20 blur-2xl" />
            <img
              src="/cecep.jpg"
              alt="Cecep Abdurrahman Malik Ibrahim"
              className="relative h-20 w-20 rounded-full object-cover object-top ring-2 ring-amber-500/30 ring-offset-2 ring-offset-stone-950"
            />
          </div>

          <blockquote className="mb-8 text-lg leading-relaxed text-stone-300 italic md:text-xl">
            "Demikian masukan dan gagasan ini. Silakan disesuaikan dengan
            dinamika diskusi di lapangan. Mari kita bangun AIKU bersama —
            bukan untuk satu angkatan, tapi untuk semua alumni."
          </blockquote>

          <div className="inline-block rounded-2xl border border-amber-500/20 bg-amber-500/5 px-8 py-5">
            <p className="font-bold text-white text-lg">Cecep Abdurrahman Malik Ibrahim</p>
            <p className="text-sm text-amber-400 mt-1">
              Calon Ketua AIKU · Ilmu Komunikasi UPI 2018
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 bg-stone-950 px-6 py-6">
        <p className="text-center text-sm text-stone-600">
          © 2026 IKOM UPI 2018. All rights reserved.
        </p>
      </footer>

    </div>
  );
}
