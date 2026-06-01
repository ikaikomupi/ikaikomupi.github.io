import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
  ArrowDown,
  ChevronDown,
  ChevronUp,
  Star,
  TrendingUp,
  Network,
  BookOpen,
  Award,
  Handshake,
  Mic2,
  Radio,
  Trophy,
  FolderOpen,
  Mail,
  Linkedin,
  MapPin,
  Monitor,
} from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────────

const heroStats = [
  { value: "6+", label: "Tahun On-Air\nBroadcasting" },
  { value: "20+", label: "Acara MC &\nModerator" },
  { value: "3", label: "Institusi\nMengajar" },
  { value: "4", label: "Penghargaan\n& Juara" },
];

const workExperiences = [
  {
    org: "TVRI Jawa Barat",
    location: "Bandung",
    period: "Jan 2024 – Sekarang",
    role: "Jurnalis & TV Presenter",
    icon: Monitor,
    color: "amber",
    points: [
      "Membawakan program berita: Jawa Barat Hari Ini, Global National News, dan Kalawarta",
      "Menjadi host program Musix Box dan Pesona Desa",
    ],
  },
  {
    org: "Al-Wafa Vocational High School",
    location: "Bandung",
    period: "Agu 2023 – Sekarang",
    role: "Guru Bahasa Inggris, Broadcasting & Film",
    icon: GraduationCap,
    color: "blue",
    points: [
      "Mengajar Bahasa Inggris untuk siswa Tourism",
      "Mengajar Dasar-Dasar Broadcasting dan Film",
      "Menggali potensi siswa dalam akting dan menulis",
    ],
  },
  {
    org: "Armidale English College (AEC)",
    location: "Bandung",
    period: "Sep 2022 – Sekarang",
    role: "Guru Bahasa Inggris & Drama",
    icon: BookOpen,
    color: "green",
    points: [
      "Mengajar Bahasa Inggris untuk siswa SD, SMP, dan SMA",
      "Menggali potensi siswa dalam drama, menulis, storytelling, dan broadcasting",
    ],
  },
  {
    org: "Rumah Belajar Masagi",
    location: "Bandung",
    period: "Apr 2023 – Sep 2024",
    role: "Guru Bahasa Inggris",
    icon: BookOpen,
    color: "teal",
    points: [
      "Mengajar Bahasa Inggris untuk siswa SD",
      "Fokus pada pembangunan karakter siswa",
    ],
  },
  {
    org: "Radio Republik Indonesia (RRI)",
    location: "Bandung",
    period: "Agu 2021 – Agu 2022",
    role: "Announcer & Presenter Pro 1",
    icon: Radio,
    color: "purple",
    points: [
      "Sukses memandu dialog dengan Area Manager PT Pertamina, Executive Manager Bandara Husein Sastranegara, Kepala Dinas Perhubungan Jabar, Kepala Dinas Pendidikan Jabar, Kapolres Tasikmalaya, Kapendam III Siliwangi, Ketua PMI Subang, dan lainnya",
      "Membawakan program musik Indonesia dan Barat era 1980–1990",
      "Memimpin event eksternal: Obrolan Budaya, Dialog Luar Studio, Ulang Tahun RRI, dan lainnya",
    ],
  },
  {
    org: "Studio East Radio",
    location: "Bandung",
    period: "Feb 2019 – Apr 2019",
    role: "Announcer",
    icon: Radio,
    color: "orange",
    points: ["Membawakan program musik"],
  },
  {
    org: "Garuda Visual Radio",
    location: "Bandung",
    period: "Mei 2020 – Agu 2020",
    role: "Announcer",
    icon: Radio,
    color: "rose",
    points: ["Membawakan program musik yang juga di-streaming di Youtube"],
  },
  {
    org: "Tri Indonesia",
    location: "Bandung",
    period: "Agu 2018 – Sep 2018",
    role: "Freelance Marketing Tri Ibadah",
    icon: Briefcase,
    color: "blue",
    points: [
      "Menghubungkan perusahaan dengan 10 KBIH di Kabupaten Bandung",
      "Mempresentasikan produk di hadapan ratusan Jamaah Haji",
    ],
  },
  {
    org: "Pembicara / Speaker",
    location: "Berbagai Kota",
    period: "2019 – Sekarang",
    role: "Public Speaking, English & Ambassador Class",
    icon: Mic2,
    color: "amber",
    points: [
      "Dicofest Telkom University 2025, Weupgrade 2025, Mojang Jajaka Kab. Bandung 2025",
      "Public Speaking Class ASM Ariyanti 2020, Himpunan Matematika UPI 2020",
      "English Class Pretty Digital PR Telkom University, Juri Public Speaking Kalam UPI 2019",
      "Ambassador Class Putera Puteri ASM Ariyanti 2020, dan banyak lainnya",
    ],
  },
  {
    org: "Master of Ceremony / Moderator / Voice Over",
    location: "Berbagai Kota",
    period: "2019 – Sekarang",
    role: "MC, Moderator & Voice Over Professional",
    icon: Mic2,
    color: "green",
    points: [
      "MC: FFBN ISBI 2021–2024, Grand Final Mojang Jajaka Kab. Bandung 2025, GF Mojang Jajaka Kota Cimahi 2022–2023, Padjajaran MUN 2019, Asia Education UPI 2021–2022, Asean Geo-Smart Competition UPI 2019, Gebyar Pariwisata Disbudpar Kab. Bandung 2022, dan lainnya",
      "Moderator: SDGs Week AIESEC Bandung 2020, Literasi Digital & Entrepreneur Millenial UPI 2019, Lingkar Psikologi 2022, AEC's Talk 2022, Kajian KSE UPI 2021, dan lainnya",
      "Voice Over: Ilomata Foundation Jakarta, Dinas DPPKB Kota Bandung, LKP Hedys Bandung, Promosi Pariwisata Kab. Bandung, Penghargaan Disparbud Kota Bandung 2022, dan lainnya",
    ],
  },
];

const formalEducation = [
  {
    school: "Universitas Padjadjaran Bandung",
    degree: "S2 Ilmu Komunikasi",
    period: "Agu 2025 – Sekarang",
    notes: ["Mahasiswa aktif (on-going)"],
  },
  {
    school: "Universitas Pendidikan Indonesia",
    degree: "S1 Ilmu Komunikasi",
    period: "Agu 2018 – Agu 2022",
    notes: [
      "Mahasiswa Berprestasi FPIPS UPI 2021",
      "Local Volunteer I-Care For Disabled AIESEC Bandung 2020",
      "Penerima Beasiswa KSE UPI 2021",
    ],
  },
  {
    school: "SMAN 1 Margahayu",
    degree: "SMA",
    period: "2015 – 2018",
    notes: [
      "Siswa Berprestasi SMAN 1 Margahayu",
      "Juara 3 Taekwondo Poomsae – POPDA Jabar XI 2016",
      "Juara 1 Kompetisi Menyanyi FLS2N Kabupaten Bandung",
    ],
  },
];

const informalEducation = [
  {
    school: "Djarie Public Speaking and Broadcasting School",
    period: "Sep 2018 – Nov 2018",
    desc: "Public speaking profesional dan Radio Announcer & TV Presenter",
  },
  {
    school: "Armidale English College",
    period: "Okt 2014 – Okt 2022",
    desc: "Lulus level Intermediate: Structure, Comprehension, Listening, Composition, dan Conversation",
  },
  {
    school: "Wallstreet English",
    period: "Nov 2019 – Des 2019",
    desc: "Praktik bahasa Inggris dengan native speaker dari Australia",
  },
];

const projects = [
  {
    name: "DeCamps Project",
    period: "Jan 2023 – Sekarang",
    desc: "Sebagai founder, membantu siswa dari desa terpencil di Kab. Bandung meraih mimpi dengan pendidikan lebih baik. Menjalankan kampanye 'Act Locally, Think Globally'.",
    icon: Globe,
  },
  {
    name: "Book Launching Miss Universe 2005 – Natalie Glebova",
    period: "Okt 2018",
    desc: "PIC tamu undangan (Indonesian Models, Actress, dan Puteri Indonesia).",
    icon: Star,
  },
  {
    name: "World Autism Day – Biruku Indonesia",
    period: "Apr 2020",
    desc: "Menggagas 'Disabled Children Art Exhibition' dan International Autism Conference.",
    icon: Heart,
  },
  {
    name: "We Care Project",
    period: "Sep 2021",
    desc: "Kolaborasi dengan Biruku Indonesia dan SLB Wartawan Bandung — menggalang dana untuk pembiayaan kesehatan anak disabilitas di Bandung.",
    icon: Users,
  },
];

const organizations = [
  { name: "AEC Magazine", period: "Jan 2023 – Sekarang", role: "Supervisor" },
  { name: "Paguyuban Mojang Jajaka Kabupaten Bandung", period: "Agu 2018 – Nov 2019", role: "Alumni & Staf Divisi Event" },
  { name: "PPBS UPI", period: "Mei 2020 – Nov 2020", role: "Staf Divisi Event" },
  { name: "Beasiswa KSE UPI", period: "Agu 2021 – Sep 2022", role: "Ketua Divisi Pendidikan" },
  { name: "Paduan Suara Mahasiswa UPI", period: "Feb 2020 – Apr 2021", role: "Ketua Divisi Event Eksternal" },
  { name: "AEC Troopers", period: "Mar 2020 – Mar 2021", role: "Ketua Divisi Public Relation" },
];

const achievements = [
  "Jajaka Harapan III Kabupaten Bandung 2017 (Duta Pariwisata Kab. Bandung)",
  "Juara 1 PPBS UPI 2019 (Duta Kampus Universitas Pendidikan Indonesia)",
  "Juara 1 International Glocal Young Leadership 2021 (Kolaborasi Indonesia–Korea)",
  "Juara Indomie VO Jamming 2020 (Kompetisi Voice Over oleh PT Indofood)",
];

const softSkills = ["Public Speaking", "Leadership", "Management", "Negotiating", "Casting Director", "Problem Solving", "Bahasa Inggris (Intermediate)"];
const hardSkills = ["Microsoft Office", "Adobe Premiere Pro", "Adobe Photoshop", "Audacity", "Canva"];

const visi =
  "Membangun IKA IKOM UPI 2018 sebagai wadah alumni yang relevan, inklusif, dan berdampak nyata — bagi anggotanya, almamater, dan masyarakat luas.";

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

const indikator = [
  { icon: Users, title: "Tingkat Partisipasi", desc: "Jumlah hadir dibandingkan target per kegiatan. Evaluasi per program." },
  { icon: Star, title: "Kepuasan Peserta", desc: "Survei singkat pasca-event untuk mengukur kualitas dan relevansi program." },
  { icon: TrendingUp, title: "Repeat Participation", desc: "Apakah orang yang sama datang lagi di acara berikutnya — indikator kuat program bermanfaat." },
  { icon: Award, title: "Dampak Konkret", desc: "Untuk program mentoring/beasiswa: dampak terukur pada penerima manfaat." },
];

const colorMap = {
  amber: { bg: "bg-amber-500/10", border: "border-amber-500/20", icon: "text-amber-400", num: "text-amber-500/30" },
  blue: { bg: "bg-blue-500/10", border: "border-blue-500/20", icon: "text-blue-400", num: "text-blue-500/30" },
  green: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: "text-emerald-400", num: "text-emerald-500/30" },
  purple: { bg: "bg-violet-500/10", border: "border-violet-500/20", icon: "text-violet-400", num: "text-violet-500/30" },
  rose: { bg: "bg-rose-500/10", border: "border-rose-500/20", icon: "text-rose-400", num: "text-rose-500/30" },
  teal: { bg: "bg-teal-500/10", border: "border-teal-500/20", icon: "text-teal-400", num: "text-teal-500/30" },
  orange: { bg: "bg-orange-500/10", border: "border-orange-500/20", icon: "text-orange-400", num: "text-orange-500/30" },
};

const toc = [
  { id: "profil", label: "Profil" },
  { id: "visi", label: "Visi & Misi" },
  { id: "gagasan", label: "Gagasan" },
  { id: "infrastruktur", label: "Infrastruktur" },
  { id: "program", label: "Program" },
  { id: "roadmap", label: "Roadmap" },
];

// ─── Primitives ──────────────────────────────────────────────────────────────

function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        shown ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-[2px]"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

function Eyebrow({ children, num }) {
  return (
    <div className="flex items-center gap-3">
      {num && (
        <span className="font-display text-sm font-medium italic text-amber-500/70">
          {num}
        </span>
      )}
      <span className="h-px w-8 bg-amber-500/40" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-500/90">
        {children}
      </span>
    </div>
  );
}

function SectionTitle({ children, className = "" }) {
  return (
    <h2 className={`font-display text-[2.5rem] leading-[1.05] font-semibold tracking-tight text-[#f5efe6] md:text-6xl ${className}`}>
      {children}
    </h2>
  );
}

// ─── Section components ────────────────────────────────────────────────────────

function ExperienceRow({ exp, index }) {
  const [open, setOpen] = useState(false);
  const c = colorMap[exp.color] || colorMap.amber;
  return (
    <Reveal delay={index * 40}>
      <div className="group border-t border-white/8 first:border-t-0">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-start gap-5 py-5 text-left"
        >
          <span className="font-display mt-1 hidden w-8 shrink-0 text-sm italic text-stone-600 sm:block">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${c.bg} ${c.icon}`}>
            <exp.icon className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
              <p className="font-display text-lg font-medium text-[#f5efe6] leading-snug">{exp.org}</p>
              <span className="text-xs text-stone-500">{exp.location}</span>
            </div>
            <p className={`mt-0.5 text-sm ${c.icon}`}>{exp.role}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <span className="text-[11px] tabular-nums text-stone-500">{exp.period}</span>
            <ChevronDown className={`h-4 w-4 text-stone-600 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
          </div>
        </button>
        <div className={`grid transition-all duration-500 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden">
            <ul className="space-y-2 pb-6 pl-0 sm:pl-[3.25rem]">
              {exp.points.map((p, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-stone-400">
                  <ArrowRight className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${c.icon} opacity-60`} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function PointRow({ point, index }) {
  const [open, setOpen] = useState(false);
  const c = colorMap[point.color];
  return (
    <Reveal delay={index * 30}>
      <div className={`overflow-hidden rounded-2xl border transition-colors ${open ? `${c.border} bg-white/[0.03]` : "border-white/8 hover:border-white/15"}`}>
        <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center gap-5 p-5 text-left sm:p-6">
          <span className={`font-display hidden text-5xl font-semibold leading-none ${c.num} select-none sm:block`}>
            {point.number}
          </span>
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${c.bg} ${c.icon}`}>
            <point.icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display text-lg font-medium text-[#f5efe6] leading-snug">{point.title}</p>
            <p className="mt-0.5 text-sm text-stone-400">{point.summary}</p>
          </div>
          {open ? <ChevronUp className="h-5 w-5 shrink-0 text-stone-500" /> : <ChevronDown className="h-5 w-5 shrink-0 text-stone-500" />}
        </button>
        <div className={`grid transition-all duration-500 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="overflow-hidden">
            <div className="space-y-3 border-t border-white/6 px-5 pb-6 pt-4 sm:px-6 sm:pl-[6.5rem]">
              {point.content.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-stone-300">{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function PillarCard({ pillar, index }) {
  const c = colorMap[pillar.color];
  return (
    <Reveal delay={index * 60}>
      <div className="flex h-full flex-col gap-5 rounded-3xl border border-white/8 bg-white/[0.02] p-7 transition-colors hover:border-white/15">
        <div className="flex items-start justify-between">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${c.bg} ${c.icon}`}>
            <pillar.icon className="h-5 w-5" />
          </div>
          <span className={`font-display text-4xl font-semibold leading-none ${c.num}`}>{pillar.number}</span>
        </div>
        <h4 className="font-display text-2xl font-medium text-[#f5efe6]">{pillar.title}</h4>
        <ul className="space-y-2.5">
          {pillar.programs.map((p, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-stone-300">
              <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${c.icon}`} />
              {p}
            </li>
          ))}
        </ul>
        <p className={`mt-auto border-l-2 ${c.border} pl-4 text-xs italic leading-relaxed ${c.icon}`}>
          {pillar.note}
        </p>
      </div>
    </Reveal>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CecepPage() {
  const [active, setActive] = useState("profil");

  useEffect(() => {
    const els = toc.map((t) => document.getElementById(t.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const jump = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0807] font-body text-stone-300 antialiased">
      {/* Atmospheric fixed background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 left-1/2 h-[34rem] w-[44rem] -translate-x-1/2 rounded-full blur-[120px]" style={{ background: "rgba(245,158,11,0.10)" }} />
        <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full blur-[140px]" style={{ background: "rgba(120,53,15,0.18)" }} />
        <div className="absolute left-0 top-1/3 h-[26rem] w-[26rem] rounded-full blur-[140px]" style={{ background: "rgba(168,85,247,0.06)" }} />
      </div>

      <div className="relative z-10">
        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 pt-28 pb-16 md:pt-36 md:pb-24">
          {/* Faded watermark name */}
          <div aria-hidden className="pointer-events-none absolute -right-10 top-24 select-none font-display text-[10rem] font-semibold leading-none text-white/[0.02] md:text-[18rem]">
            IKA IKOM UPI 2018
          </div>

          <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Left — copy */}
            <div>
              <div className="animate-[fadeUp_0.7s_ease-out_both]">
                <Eyebrow>Pencalonan Ketua IKA IKOM UPI 2018 · Angkatan 2018</Eyebrow>
              </div>
              <h1 className="mt-7 font-display text-[3.25rem] font-semibold leading-[0.95] tracking-tight text-[#f5efe6] md:text-[5.5rem]">
                <span className="block animate-[fadeUp_0.7s_ease-out_0.05s_both]">Cecep</span>
                <span className="block animate-[fadeUp_0.7s_ease-out_0.12s_both]">Abdurrohman</span>
                <span className="block animate-[fadeUp_0.7s_ease-out_0.19s_both] italic text-amber-400">Malik Ibrahim</span>
              </h1>
              <div className="mt-6 flex animate-[fadeUp_0.7s_ease-out_0.24s_both] flex-wrap items-center gap-2">
                <span className="text-xl font-black text-amber-400">#</span>
                <span className="text-sm font-bold uppercase tracking-[0.18em] text-stone-400">Terhubung</span>
                <span className="text-amber-500/50">·</span>
                <span className="text-sm font-bold uppercase tracking-[0.18em] text-stone-400">Tumbuh</span>
                <span className="text-amber-500/50">·</span>
                <span className="text-sm font-bold uppercase tracking-[0.18em] text-stone-400">Terdampak</span>
              </div>

              <p className="mt-7 max-w-xl animate-[fadeUp_0.7s_ease-out_0.28s_both] text-base leading-relaxed text-stone-400 md:text-lg">
                Membangun IKA IKOM UPI 2018 untuk memberikan dampak yang lebih luas — bagi
                <span className="text-stone-200"> alumni, mahasiswa, dan civitas program studi</span>.
                Ikatan alumni yang <span className="text-stone-200">menguatkan</span>,
                <span className="text-stone-200"> berbagi peluang karir</span>, dan
                <span className="text-stone-200"> tumbuh bersama </span>
                meski sudah jauh dari ruang kampus. Itulah yang ingin kita wujudkan, dan
                <span className="text-stone-200"> kita mulai dari sekarang</span>.
              </p>
              <div className="mt-9 flex animate-[fadeUp_0.7s_ease-out_0.36s_both] flex-wrap items-center gap-3">
                <a href="#visi" onClick={jump("visi")} className="group inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-400">
                  Baca Visi & Gagasan
                  <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </a>
                <a href="#profil" onClick={jump("profil")} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-stone-200 transition-colors hover:bg-white/5">
                  Lihat Kredibilitas
                </a>
              </div>
            </div>

            {/* Right — portrait */}
            <div className="animate-[fadeUp_0.8s_ease-out_0.2s_both]">
              <div className="relative mx-auto max-w-sm">
                <div className="absolute -inset-3 rotate-[2.5deg] rounded-[2.25rem] border border-amber-500/25" />
                <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-tr from-amber-500/25 via-transparent to-transparent blur-2xl" />
                <div className="grain relative overflow-hidden rounded-[1.75rem] ring-1 ring-white/10">
                  <img
                    src="/cecep.jpg"
                    alt="Cecep Abdurrohman Malik Ibrahim"
                    className="aspect-[4/5] w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0807] via-transparent to-transparent" />
                  {/* ON AIR badge — nod to his broadcasting career */}
                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-stone-950/70 px-3 py-1.5 backdrop-blur-sm ring-1 ring-white/10">
                    <span className="onair-dot h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_8px] shadow-rose-500/70" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-200">On Air</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-display text-sm italic text-stone-300">
                      "Suara yang menghubungkan, kepemimpinan yang melayani."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="relative mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] md:mt-20 md:grid-cols-4">
            {heroStats.map((s, i) => (
              <Reveal key={i} delay={i * 80} className="bg-[#0a0807]/40 p-6 text-center">
                <div className="font-display text-4xl font-semibold text-amber-400 md:text-5xl">{s.value}</div>
                <div className="mt-2 whitespace-pre-line text-xs leading-snug text-stone-400">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── STICKY TOC ─────────────────────────────────────────────── */}
        <nav className="sticky top-16 z-30 border-y border-white/8 bg-[#0a0807]/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-6 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {toc.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                onClick={jump(t.id)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                  active === t.id
                    ? "bg-amber-500/15 text-amber-400"
                    : "text-stone-500 hover:text-stone-200"
                }`}
              >
                {t.label}
              </a>
            ))}
          </div>
        </nav>

        {/* ── PROFIL & KREDIBILITAS ──────────────────────────────────── */}
        <section id="profil" className="scroll-mt-32 px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <Eyebrow num="01">Profil Calon</Eyebrow>
              <SectionTitle className="mt-5 max-w-3xl">
                Rekam jejak yang <span className="italic text-amber-400">berbicara</span> sendiri.
              </SectionTitle>
            </Reveal>

            {/* About + contact — editorial lead */}
            <Reveal delay={80}>
              <div className="mt-12 grid gap-8 border-t border-white/8 pt-10 md:grid-cols-[0.8fr_1.2fr]">
                <div className="flex flex-col gap-3 text-sm text-stone-400">
                  <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-amber-400" /> Bandung, Indonesia</span>
                  <a href="https://www.linkedin.com/in/cecepmalik" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-amber-400">
                    <Linkedin className="h-4 w-4 text-amber-400" /> linkedin.com/in/cecepmalik
                  </a>
                  <a href="mailto:abdurrahman.cecep16@gmail.com" className="flex items-center gap-2 break-all transition-colors hover:text-amber-400">
                    <Mail className="h-4 w-4 shrink-0 text-amber-400" /> abdurrahman.cecep16@gmail.com
                  </a>
                </div>
                <p className="font-display text-xl font-light leading-relaxed text-stone-200 md:text-2xl">
                  <span className="float-left mr-3 mt-1 font-display text-6xl font-semibold leading-[0.8] text-amber-400">S</span>
                  aat ini aktif sebagai jurnalis dan TV presenter di stasiun TVRI Jawa Barat, sekaligus pengajar Bahasa Inggris, Broadcasting, dan Film untuk siswa SD hingga SMA di Bandung. Berpengalaman dalam public speaking, radio broadcasting, dan event organizing.
                </p>
              </div>
            </Reveal>

            {/* Experience list */}
            <div className="mt-16 grid gap-10 lg:grid-cols-[0.34fr_0.66fr]">
              <Reveal className="lg:sticky lg:top-32 lg:self-start">
                <h3 className="font-display text-3xl font-medium text-[#f5efe6]">Pengalaman</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-500">
                  Dari studio radio hingga layar televisi, ruang kelas hingga panggung acara — pengalaman yang dibangun di atas komunikasi.
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs text-stone-600">
                  <ChevronDown className="h-3.5 w-3.5" /> Klik tiap entri untuk detail
                </span>
              </Reveal>
              <div>
                {workExperiences.map((exp, i) => (
                  <ExperienceRow key={i} exp={exp} index={i} />
                ))}
              </div>
            </div>

            {/* Education + Achievements */}
            <div className="mt-20 grid gap-12 md:grid-cols-2">
              <Reveal>
                <h3 className="mb-6 flex items-center gap-2.5 font-display text-2xl font-medium text-[#f5efe6]">
                  <GraduationCap className="h-5 w-5 text-amber-400" /> Pendidikan
                </h3>
                <div className="space-y-4">
                  {formalEducation.map((edu, i) => (
                    <div key={i} className="border-l border-amber-500/25 pl-5">
                      <p className="font-display text-lg text-[#f5efe6]">{edu.school}</p>
                      <p className="text-sm text-amber-400/90">{edu.degree}</p>
                      <p className="text-xs text-stone-500">{edu.period}</p>
                      {edu.notes.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {edu.notes.map((n, j) => (
                            <li key={j} className="flex items-start gap-2 text-xs text-stone-400">
                              <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-amber-500/60" /> {n}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                <h4 className="mb-3 mt-8 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                  <BookOpen className="h-4 w-4 text-amber-400" /> Pendidikan Informal
                </h4>
                <div className="space-y-3">
                  {informalEducation.map((edu, i) => (
                    <div key={i}>
                      <p className="text-sm font-medium text-stone-200">{edu.school} <span className="font-normal text-stone-600">· {edu.period}</span></p>
                      <p className="text-xs leading-relaxed text-stone-500">{edu.desc}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h3 className="mb-6 flex items-center gap-2.5 font-display text-2xl font-medium text-[#f5efe6]">
                  <Trophy className="h-5 w-5 text-amber-400" /> Penghargaan
                </h3>
                <div className="space-y-3">
                  {achievements.map((a, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-2xl border border-amber-500/15 bg-amber-500/[0.06] p-4">
                      <Star className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                      <p className="text-sm leading-relaxed text-stone-200">{a}</p>
                    </div>
                  ))}
                </div>
                <h4 className="mb-3 mt-8 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                  <Zap className="h-4 w-4 text-amber-400" /> Skills
                </h4>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {softSkills.map((s) => (
                      <span key={s} className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300 ring-1 ring-amber-500/20">{s}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {hardSkills.map((s) => (
                      <span key={s} className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-stone-300 ring-1 ring-white/10">{s}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Projects + Organizations */}
            <div className="mt-20 grid gap-12 md:grid-cols-2">
              <Reveal>
                <h3 className="mb-6 flex items-center gap-2.5 font-display text-2xl font-medium text-[#f5efe6]">
                  <FolderOpen className="h-5 w-5 text-amber-400" /> Proyek
                </h3>
                <div className="space-y-4">
                  {projects.map((p, i) => (
                    <div key={i} className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                        <p.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-display text-base text-[#f5efe6]">{p.name}</p>
                        <p className="text-xs text-stone-500">{p.period}</p>
                        <p className="mt-1.5 text-xs leading-relaxed text-stone-400">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h3 className="mb-6 flex items-center gap-2.5 font-display text-2xl font-medium text-[#f5efe6]">
                  <Network className="h-5 w-5 text-amber-400" /> Organisasi & Kepanitiaan
                </h3>
                <div className="space-y-px overflow-hidden rounded-2xl border border-white/8">
                  {organizations.map((o, i) => (
                    <div key={i} className="flex items-center justify-between gap-4 bg-white/[0.02] px-5 py-4">
                      <div>
                        <p className="text-sm font-medium text-[#f5efe6]">{o.name}</p>
                        <p className="text-xs text-amber-400/90">{o.role}</p>
                      </div>
                      <span className="shrink-0 text-[11px] text-stone-600">{o.period}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── VISI & MISI ────────────────────────────────────────────── */}
        <section id="visi" className="scroll-mt-32 border-t border-white/8 px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <Eyebrow num="02">Visi & Misi</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <blockquote className="mt-10 max-w-5xl font-display text-3xl font-light leading-[1.25] tracking-tight text-[#f5efe6] md:text-5xl">
                <span className="text-amber-400">“</span>
                {visi}
                <span className="text-amber-400">”</span>
              </blockquote>
            </Reveal>

            <div className="mt-16 grid gap-x-12 gap-y-5 md:grid-cols-2">
              {misi.map((m, i) => (
                <Reveal key={i} delay={i * 50}>
                  <div className="flex items-start gap-5 border-t border-white/8 pt-5">
                    <span className="font-display text-2xl font-semibold italic text-amber-500/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-relaxed text-stone-300 md:text-base">{m}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── GAGASAN (7 POIN) ───────────────────────────────────────── */}
        <section id="gagasan" className="scroll-mt-32 border-t border-white/8 px-6 py-20 md:py-28">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <Eyebrow num="03">Masukan dari Angkatan 2018</Eyebrow>
              <SectionTitle className="mt-5">7 Gagasan Pengembangan</SectionTitle>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-400">
                Pemikiran strategis yang ingin dibawa sebagai bahan diskusi dan pertimbangan bersama.
              </p>
            </Reveal>
            <div className="mt-12 space-y-3">
              {points.map((point, i) => (
                <PointRow key={point.number} point={point} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── INFRASTRUKTUR ──────────────────────────────────────────── */}
        <section id="infrastruktur" className="scroll-mt-32 border-t border-white/8 px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <Eyebrow num="04">Fondasi Organisasi</Eyebrow>
              <SectionTitle className="mt-5 max-w-3xl">5 Komponen Infrastruktur Dasar</SectionTitle>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-400">
                Yang sering dianggap remeh — padahal inilah yang menentukan apakah organisasi bertahan atau vakum lagi.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/8 sm:grid-cols-2 lg:grid-cols-3">
              {infra.map((item, i) => (
                <Reveal key={item.title} delay={i * 50} className="bg-white/[0.02] p-7 transition-colors hover:bg-white/[0.04]">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-display text-xl font-medium text-[#f5efe6]">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-stone-400">{item.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROGRAM (4 PILAR) ──────────────────────────────────────── */}
        <section id="program" className="scroll-mt-32 border-t border-white/8 px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <Eyebrow num="05">Rencana Program Kerja</Eyebrow>
              <SectionTitle className="mt-5">4 Pilar Program</SectionTitle>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-400">
                Kerangka program yang seimbang — dari silaturahmi hingga kontribusi sosial.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {pillars.map((pillar, i) => (
                <PillarCard key={pillar.number} pillar={pillar} index={i} />
              ))}
            </div>

            <Reveal delay={120}>
              <div className="mt-8 rounded-3xl border border-amber-500/20 bg-amber-500/[0.05] p-7 md:p-9">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-xl font-medium text-[#f5efe6]">Rekomendasi Program Tahun Pertama</h4>
                    <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {[
                        "1 program flagship (reuni akbar) sebagai pembuktian organisasi aktif kembali",
                        "1–2 program rutin dari Pilar 2 — sharing karier bulanan karena paling berkelanjutan",
                        "1 program kontribusi dari Pilar 3 (kuliah tamu atau beasiswa skala kecil)",
                        "Pilar 4 menunggu hingga organisasi lebih stabil",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-stone-300">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" /> {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 text-sm italic text-amber-400/80">
                      Total 4–5 program di tahun pertama sudah cukup. Lebih dari itu berisiko burnout pengurus.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── ROADMAP ────────────────────────────────────────────────── */}
        <section id="roadmap" className="scroll-mt-32 border-t border-white/8 px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <Eyebrow num="06">Timeline</Eyebrow>
              <SectionTitle className="mt-5">Roadmap 12 Bulan Pertama</SectionTitle>
            </Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-4">
              {roadmap.map((item, i) => (
                <Reveal key={item.phase} delay={i * 70}>
                  <div className="relative h-full rounded-3xl border border-white/8 bg-white/[0.02] p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="font-display text-3xl font-semibold leading-none text-white/[0.06]">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-500/90">{item.phase}</span>
                    <h4 className="mt-1 font-display text-lg font-medium text-[#f5efe6]">{item.title}</h4>
                    <ul className="mt-4 space-y-2">
                      {item.tasks.map((t, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs leading-relaxed text-stone-400">
                          <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-amber-500/60" /> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Indikator */}
            <Reveal>
              <div className="mt-20">
                <Eyebrow>Akuntabilitas</Eyebrow>
                <h3 className="mt-5 font-display text-3xl font-medium text-[#f5efe6] md:text-4xl">Indikator Keberhasilan</h3>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {indikator.map((item, i) => (
                <Reveal key={item.title} delay={i * 50}>
                  <div className="flex gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-display text-lg font-medium text-[#f5efe6]">{item.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-stone-400">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-stone-600">
              Evaluasi dilakukan per program dan per kuartal — hasilnya dibagikan ke seluruh anggota sebagai bentuk akuntabilitas.
            </p>
          </div>
        </section>

        {/* ── PENUTUP ────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-t border-white/8 px-6 py-24 md:py-32">
          <div className="relative mx-auto max-w-3xl text-center">
            <Reveal>
              <div className="relative mx-auto mb-10 h-24 w-24">
                <div className="absolute -inset-1 rounded-full bg-amber-500/20 blur-xl" />
                <img src="/cecep.jpg" alt="Cecep Abdurrohman Malik Ibrahim" className="relative h-24 w-24 rounded-full object-cover object-top ring-1 ring-amber-500/30" />
              </div>
              <blockquote className="font-display text-2xl font-light italic leading-relaxed text-[#f5efe6] md:text-4xl md:leading-[1.3]">
                "Mari kita bangun IKA IKOM UPI 2018 bersama — bukan untuk satu angkatan, tapi untuk semua alumni."
              </blockquote>
              <div className="mt-10 inline-flex flex-col items-center">
                <span className="h-px w-12 bg-amber-500/40" />
                <p className="mt-5 font-display text-xl font-medium text-[#f5efe6]">Cecep Abdurrohman Malik Ibrahim</p>
                <p className="mt-1 text-sm text-amber-400">Calon Ketua IKA IKOM UPI 2018 · Ilmu Komunikasi UPI 2018</p>
              </div>

              <div className="mt-12 border-t border-white/8 pt-10">
                <p className="mb-5 text-sm text-stone-500">Pelajari pedoman dasar organisasi yang diusulkan</p>
                <Link
                  to="/ad-art"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-amber-500/30 bg-amber-500/[0.06] px-6 py-3 text-sm font-semibold text-amber-300 transition-colors hover:bg-amber-500/15"
                >
                  <FileText className="h-4 w-4" />
                  AD/ART, GBHO &amp; Struktur Organisasi
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <footer className="border-t border-white/8 px-6 py-7">
          <p className="text-center text-sm text-stone-600">© 2026 IKOM UPI 2018. All rights reserved.</p>
        </footer>
      </div>

      {/* Hero entrance keyframes */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
