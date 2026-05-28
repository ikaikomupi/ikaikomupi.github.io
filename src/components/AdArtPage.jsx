import { useState } from "react";
import {
  ScrollText,
  FileText,
  Compass,
  Network,
  Crown,
  UserCog,
  PenLine,
  Wallet,
  Users,
  Megaphone,
  Briefcase,
  Info,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

// ─── DRAFT CONTENT — disahkan dalam Musyawarah Besar AIKU ───────────────────────

const anggaranDasar = [
  {
    bab: "BAB I",
    judul: "Nama, Waktu, dan Kedudukan",
    pasal: [
      { no: "Pasal 1", ayat: ["Organisasi ini bernama Alumni Ikatan Komunikasi UPI, yang selanjutnya disingkat AIKU."] },
      { no: "Pasal 2", ayat: ["AIKU ditetapkan untuk jangka waktu yang tidak ditentukan."] },
      { no: "Pasal 3", ayat: ["AIKU berkedudukan di Kota Bandung, mengikuti domisili Program Studi Ilmu Komunikasi Universitas Pendidikan Indonesia."] },
    ],
  },
  {
    bab: "BAB II",
    judul: "Asas, Sifat, dan Tujuan",
    pasal: [
      { no: "Pasal 4", judul: "Asas", ayat: ["AIKU berasaskan Pancasila dan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945."] },
      { no: "Pasal 5", judul: "Sifat", ayat: ["AIKU bersifat independen, kekeluargaan, nirlaba, serta tidak berafiliasi dengan partai politik manapun."] },
      {
        no: "Pasal 6",
        judul: "Tujuan",
        ayat: [
          "Mempererat tali silaturahmi dan rasa kekeluargaan antar alumni Ilmu Komunikasi UPI lintas angkatan.",
          "Mengembangkan kapasitas profesional dan jejaring karir antar anggota.",
          "Memberikan kontribusi nyata bagi almamater, mahasiswa aktif, dan masyarakat luas.",
        ],
      },
    ],
  },
  {
    bab: "BAB III",
    judul: "Keanggotaan",
    pasal: [
      { no: "Pasal 7", ayat: ["Anggota AIKU adalah seluruh lulusan Program Studi Ilmu Komunikasi Universitas Pendidikan Indonesia dari seluruh angkatan."] },
      { no: "Pasal 8", ayat: ["Ketentuan lebih lanjut mengenai hak, kewajiban, dan berakhirnya keanggotaan diatur dalam Anggaran Rumah Tangga."] },
    ],
  },
  {
    bab: "BAB IV",
    judul: "Struktur Organisasi",
    pasal: [
      {
        no: "Pasal 9",
        ayat: [
          "Struktur organisasi AIKU terdiri atas: Dewan Pembina, Pengurus Harian, Koordinator Bidang, dan Perwakilan Angkatan.",
          "Dewan Pembina berfungsi memberikan arahan strategis dan tidak menjalankan kerja operasional harian.",
        ],
      },
    ],
  },
  {
    bab: "BAB V",
    judul: "Kepengurusan",
    pasal: [
      { no: "Pasal 10", ayat: ["Pengurus AIKU dipimpin oleh seorang Ketua Umum yang dipilih melalui Musyawarah Besar."] },
      { no: "Pasal 11", ayat: ["Masa bakti kepengurusan adalah 3 (tiga) tahun, dan Ketua Umum dapat menjabat paling banyak 2 (dua) periode berturut-turut."] },
    ],
  },
  {
    bab: "BAB VI",
    judul: "Permusyawaratan",
    pasal: [
      {
        no: "Pasal 12",
        ayat: [
          "Permusyawaratan dalam AIKU terdiri atas Musyawarah Besar (Mubes), Rapat Kerja, dan Rapat Pengurus.",
          "Musyawarah Besar merupakan forum pengambilan keputusan tertinggi organisasi.",
        ],
      },
    ],
  },
  {
    bab: "BAB VII",
    judul: "Keuangan",
    pasal: [
      {
        no: "Pasal 13",
        ayat: [
          "AIKU tidak memungut iuran keanggotaan dalam bentuk apapun.",
          "Sumber keuangan AIKU berasal dari donasi sukarela yang dibuka secara temporer pada setiap penyelenggaraan acara yang memerlukan biaya, dan hanya berlaku selama kebutuhan acara tersebut.",
          "Pengelolaan keuangan dilakukan secara transparan dan dilaporkan kepada seluruh anggota setelah setiap acara selesai.",
        ],
      },
    ],
  },
  {
    bab: "BAB VIII",
    judul: "Perubahan AD/ART",
    pasal: [
      { no: "Pasal 14", ayat: ["Perubahan Anggaran Dasar dan Anggaran Rumah Tangga hanya dapat dilakukan melalui Musyawarah Besar."] },
    ],
  },
  {
    bab: "BAB IX",
    judul: "Pembubaran",
    pasal: [
      { no: "Pasal 15", ayat: ["Pembubaran AIKU hanya dapat dilakukan melalui Musyawarah Besar Luar Biasa yang diselenggarakan khusus untuk itu."] },
    ],
  },
  {
    bab: "BAB X",
    judul: "Penutup",
    pasal: [
      { no: "Pasal 16", ayat: ["Hal-hal yang belum diatur dalam Anggaran Dasar ini akan diatur lebih lanjut dalam Anggaran Rumah Tangga dan ketetapan organisasi lainnya."] },
    ],
  },
];

const anggaranRumahTangga = [
  {
    bab: "BAB I",
    judul: "Keanggotaan",
    pasal: [
      {
        no: "Pasal 1",
        judul: "Hak Anggota",
        ayat: [
          "Mengikuti seluruh kegiatan yang diselenggarakan organisasi.",
          "Menyampaikan pendapat, usulan, dan kritik yang membangun.",
          "Memilih dan dipilih sebagai pengurus.",
        ],
      },
      {
        no: "Pasal 2",
        judul: "Kewajiban Anggota",
        ayat: [
          "Menjaga nama baik organisasi dan almamater.",
          "Menaati Anggaran Dasar, Anggaran Rumah Tangga, dan ketetapan organisasi.",
          "Berpartisipasi aktif sesuai kemampuan masing-masing.",
        ],
      },
    ],
  },
  {
    bab: "BAB II",
    judul: "Tugas dan Wewenang Pengurus",
    pasal: [
      { no: "Pasal 3", judul: "Ketua Umum", ayat: ["Memimpin dan mengoordinasikan seluruh kegiatan organisasi serta menjadi penanggung jawab utama AIKU."] },
      { no: "Pasal 4", judul: "Wakil Ketua", ayat: ["Membantu Ketua Umum dan mewakili Ketua Umum apabila berhalangan."] },
      { no: "Pasal 5", judul: "Sekretaris", ayat: ["Mengelola administrasi, surat-menyurat, notulensi, dan arsip organisasi."] },
      { no: "Pasal 6", judul: "Bendahara", ayat: ["Mengelola keuangan secara transparan dan menyusun laporan keuangan berkala."] },
      { no: "Pasal 7", judul: "Koordinator Bidang", ayat: ["Merencanakan dan melaksanakan program kerja sesuai bidang masing-masing."] },
      { no: "Pasal 8", judul: "Perwakilan Angkatan", ayat: ["Menjadi penghubung antara pengurus inti dengan anggota di angkatannya serta menjaga pemutakhiran data."] },
    ],
  },
  {
    bab: "BAB III",
    judul: "Masa Jabatan dan Pergantian",
    pasal: [
      { no: "Pasal 9", ayat: ["Masa jabatan pengurus adalah 3 (tiga) tahun terhitung sejak pelantikan."] },
      { no: "Pasal 10", ayat: ["Pergantian pengurus antarwaktu dapat dilakukan melalui Rapat Pengurus apabila terdapat kekosongan jabatan."] },
    ],
  },
  {
    bab: "BAB IV",
    judul: "Pemilihan Ketua Umum",
    pasal: [
      {
        no: "Pasal 11",
        judul: "Penjaringan Calon",
        ayat: [
          "Posisi Ketua Umum dibuka secara terbuka bagi seluruh anggota dari semua angkatan, dan diumumkan melalui kanal resmi organisasi.",
          "Setiap anggota yang bersedia maju mengajukan pernyataan kesediaan beserta rancangan tim inti dalam masa penjaringan yang ditetapkan panitia, sekurang-kurangnya 2 (dua) minggu.",
          "Calon Ketua Umum adalah anggota yang menyatakan kesediaan secara tertulis dan memenuhi kriteria yang ditetapkan.",
        ],
      },
      {
        no: "Pasal 12",
        judul: "Penetapan Ketua Umum",
        ayat: [
          "Penetapan Ketua Umum dilakukan dalam Musyawarah Besar.",
          "Apabila hanya terdapat 1 (satu) calon, penetapan dilakukan melalui musyawarah mufakat (aklamasi).",
          "Apabila terdapat lebih dari 1 (satu) calon dan mufakat tidak tercapai, dilakukan pemungutan suara, dan calon dengan suara terbanyak ditetapkan sebagai Ketua Umum.",
          "Mandat yang diberikan adalah kepada Ketua Umum beserta tim inti yang diajukannya, bukan kepada individu semata.",
        ],
      },
      {
        no: "Pasal 13",
        judul: "Kuorum dan Keabsahan",
        ayat: [
          "Musyawarah Besar dinyatakan sah apabila dihadiri oleh perwakilan dari sekurang-kurangnya separuh jumlah angkatan yang ada.",
          "Keabsahan kepengurusan didasarkan pada keterwakilan lintas angkatan, bukan pada jumlah total kehadiran seluruh anggota.",
        ],
      },
    ],
  },
  {
    bab: "BAB V",
    judul: "Rapat-Rapat",
    pasal: [
      {
        no: "Pasal 14",
        ayat: [
          "Musyawarah Besar diselenggarakan sekali dalam satu periode kepengurusan.",
          "Rapat Kerja diselenggarakan untuk menyusun program kerja tahunan.",
          "Rapat Pengurus diselenggarakan sesuai kebutuhan organisasi.",
        ],
      },
    ],
  },
  {
    bab: "BAB VI",
    judul: "Keuangan",
    pasal: [
      {
        no: "Pasal 15",
        ayat: [
          "AIKU tidak memiliki iuran rutin; tidak ada kewajiban finansial berkala bagi anggota.",
          "Donasi dibuka secara temporer hanya untuk acara tertentu yang membutuhkan biaya operasional, dan ditutup setelah acara berlangsung.",
          "Setiap penerimaan dan pengeluaran dalam penyelenggaraan acara wajib dicatat, didokumentasikan, dan dilaporkan kepada anggota setelah acara selesai.",
        ],
      },
    ],
  },
  {
    bab: "BAB VII",
    judul: "Atribut Organisasi",
    pasal: [
      { no: "Pasal 16", ayat: ["AIKU memiliki atribut berupa logo dan identitas visual yang ditetapkan oleh pengurus dan disahkan dalam Musyawarah Besar."] },
    ],
  },
  {
    bab: "BAB VIII",
    judul: "Penutup",
    pasal: [
      { no: "Pasal 17", ayat: ["Hal-hal yang belum diatur dalam Anggaran Rumah Tangga ini akan ditetapkan kemudian melalui ketetapan organisasi."] },
    ],
  },
];

const gbho = [
  {
    judul: "Pendahuluan",
    isi: [
      "Garis Besar Haluan Organisasi (GBHO) merupakan pedoman umum yang menjadi arah penyelenggaraan program kerja AIKU dalam satu periode kepengurusan.",
      "GBHO disusun agar setiap program memiliki orientasi yang jelas, terukur, dan berkelanjutan — bukan sekadar daftar kegiatan.",
    ],
  },
  {
    judul: "Pola Dasar — Visi & Misi",
    isi: [
      "Visi: Membangun AIKU sebagai wadah alumni yang relevan, inklusif, dan berdampak nyata bagi anggota, almamater, dan masyarakat.",
      "Misi: memperkuat silaturahmi, mengembangkan profesional dan karir anggota, serta memberikan kontribusi kepada almamater dan masyarakat.",
    ],
  },
  {
    judul: "Pola Umum Program Kerja",
    isi: [
      "Jangka Pendek (Tahun 1): diagnosis kebutuhan, pembangunan infrastruktur dasar, dan eksekusi quick wins.",
      "Jangka Menengah: penguatan program rutin pengembangan profesional dan kontribusi ke almamater.",
      "Jangka Panjang: AIKU menjadi organisasi alumni yang mandiri, berkelanjutan, dan berdampak luas.",
    ],
  },
  {
    judul: "Arah Bidang Program",
    isi: [
      "Networking & Silaturahmi — reuni, gathering, dan halal bihalal yang inklusif lintas angkatan.",
      "Pengembangan Profesional & Karir — mentoring, sharing karir, dan job board antar alumni.",
      "Kontribusi ke Almamater — beasiswa, kuliah tamu, dan kerja sama dengan program studi.",
      "Kontribusi Sosial — aksi sosial dan pemberdayaan masyarakat sekitar kampus.",
    ],
  },
  {
    judul: "Penutup",
    isi: [
      "GBHO ini menjadi acuan dalam penyusunan program kerja dan dievaluasi pada setiap Musyawarah Besar.",
    ],
  },
];

const struktur = {
  pembina: { label: "Dewan Pembina / Penasihat", desc: "Alumni senior & tokoh — arahan strategis, bukan kerja harian", names: [] },
  inti: [
    { jabatan: "Ketua Umum", nama: "Cecep Abdurrohman Malik Ibrahim", icon: Crown },
    { jabatan: "Wakil Ketua", nama: "Naufal Fadhilah", icon: UserCog },
    { jabatan: "Sekretaris", nama: "Alanis Rani Rayhana", icon: PenLine },
    { jabatan: "Bendahara", nama: "—", icon: Wallet },
  ],
  bidang: [
    { nama: "Program & Acara", anggota: ["Fathia Islamiyatul S", "Reva Girvan"], icon: Users },
    { nama: "Pengembangan Profesional & Karir", anggota: ["Wanda Putri R", "Dinda DNA", "Renanda Dwina P"], icon: Briefcase },
    { nama: "Hubungan Alumni & Antar-Angkatan", anggota: ["Rizki Dwi P", "Regine Deanaendra"], icon: Network },
    { nama: "Komunikasi & Media", anggota: ["Rafi Shalahudin", "Marcellodiansyah"], icon: Megaphone },
  ],
  pic: "1 koordinator per angkatan — jembatan ke pengurus inti & penjaga data angkatannya.",
};

const tabs = [
  { id: "ad", label: "Anggaran Dasar", icon: ScrollText },
  { id: "art", label: "Anggaran Rumah Tangga", icon: FileText },
  { id: "gbho", label: "GBHO", icon: Compass },
  { id: "struktur", label: "Struktur Organisasi", icon: Network },
];

// ─── Renderers ─────────────────────────────────────────────────────────────────

function LegalDoc({ data }) {
  return (
    <div className="space-y-12">
      {data.map((b) => (
        <div key={b.bab} className="border-t border-white/8 pt-8">
          <div className="mb-6 flex items-baseline gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">{b.bab}</span>
            <h3 className="font-display text-2xl font-medium text-[#f5efe6] md:text-3xl">{b.judul}</h3>
          </div>
          <div className="space-y-6 pl-0 md:pl-6">
            {b.pasal.map((p) => (
              <div key={p.no}>
                <p className="mb-2 font-display text-base italic text-amber-400/90">
                  {p.no}{p.judul ? ` — ${p.judul}` : ""}
                </p>
                {p.ayat.length === 1 ? (
                  <p className="text-sm leading-relaxed text-stone-300 md:text-base">{p.ayat[0]}</p>
                ) : (
                  <ol className="space-y-2">
                    {p.ayat.map((a, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-stone-300 md:text-base">
                        <span className="font-display text-sm text-stone-500">({i + 1})</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function GbhoDoc() {
  return (
    <div className="space-y-10">
      {gbho.map((s, i) => (
        <div key={i} className="border-t border-white/8 pt-8">
          <div className="mb-5 flex items-baseline gap-3">
            <span className="font-display text-xl italic text-amber-500/60">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="font-display text-2xl font-medium text-[#f5efe6] md:text-3xl">{s.judul}</h3>
          </div>
          <ul className="space-y-3 pl-0 md:pl-9">
            {s.isi.map((t, j) => (
              <li key={j} className="text-sm leading-relaxed text-stone-300 md:text-base">{t}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function StrukturDoc() {
  return (
    <div className="space-y-10">
      {/* Pembina */}
      <div className="rounded-3xl border border-white/8 bg-white/[0.02] p-7 text-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">Lapisan Penasihat</span>
        <h3 className="mt-2 font-display text-2xl font-medium text-[#f5efe6]">{struktur.pembina.label}</h3>
        <p className="mt-2 text-sm text-stone-400">{struktur.pembina.desc}</p>
      </div>

      <div className="flex justify-center"><div className="h-8 w-px bg-amber-500/30" /></div>

      {/* Pengurus Inti */}
      <div>
        <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-500">Pengurus Inti (Harian)</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {struktur.inti.map((m) => (
            <div key={m.jabatan} className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.05] p-5 text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
                <m.icon className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-400/80">{m.jabatan}</p>
              <p className="mt-1 font-display text-lg text-[#f5efe6]">{m.nama}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center"><div className="h-8 w-px bg-amber-500/30" /></div>

      {/* Koordinator Bidang */}
      <div>
        <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-500">Koordinator Bidang</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {struktur.bidang.map((b, i) => (
            <div key={i} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                  <b.icon className="h-4 w-4" />
                </div>
                <h4 className="font-display text-lg text-[#f5efe6]">{b.nama}</h4>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 pl-12">
                {b.anggota.map((a) => (
                  <span key={a} className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-stone-300 ring-1 ring-white/10">{a}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center"><div className="h-8 w-px bg-amber-500/30" /></div>

      {/* PIC Angkatan */}
      <div className="rounded-3xl border border-white/8 bg-white/[0.02] p-7 text-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">Jaringan</span>
        <h3 className="mt-2 font-display text-2xl font-medium text-[#f5efe6]">Perwakilan Angkatan (PIC)</h3>
        <p className="mt-2 mx-auto max-w-md text-sm text-stone-400">{struktur.pic}</p>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

const STRUKTUR_PASSWORD = "aiku2026";

export default function AdArtPage() {
  const [tab, setTab] = useState("ad");
  const [isStrukturUnlocked, setIsStrukturUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleTabClick(id) {
    if (id === "struktur" && !isStrukturUnlocked) {
      setShowModal(true);
      setPasswordInput("");
      setPasswordError(false);
    } else {
      setTab(id);
    }
  }

  function handlePasswordSubmit(e) {
    e.preventDefault();
    if (passwordInput === STRUKTUR_PASSWORD) {
      setIsStrukturUnlocked(true);
      setShowModal(false);
      setTab("struktur");
      setPasswordInput("");
      setPasswordError(false);
    } else {
      setPasswordError(true);
      setPasswordInput("");
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0807] font-body text-stone-300 antialiased">
      {/* Atmosphere */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 left-1/2 h-[34rem] w-[44rem] -translate-x-1/2 rounded-full blur-[120px]" style={{ background: "rgba(245,158,11,0.08)" }} />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full blur-[140px]" style={{ background: "rgba(120,53,15,0.15)" }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-6 pt-28 pb-12 md:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-amber-500/40" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-500/90">Dokumen Organisasi · AIKU</span>
              <span className="h-px w-8 bg-amber-500/40" />
            </div>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-[#f5efe6] md:text-6xl">
              AD/ART, GBHO &<br /><span className="italic text-amber-400">Struktur Organisasi</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-stone-400">
              Pedoman dasar penyelenggaraan Alumni Ikatan Komunikasi UPI — dari aturan pokok hingga arah program kerja.
            </p>

            {/* Draft notice */}
            <div className="mx-auto mt-8 flex max-w-xl items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/[0.06] p-4 text-left">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <p className="text-xs leading-relaxed text-amber-200/90">
                <span className="font-semibold">Dokumen ini masih berupa DRAFT usulan.</span> Seluruh isi akan dibahas, disempurnakan, dan disahkan dalam Musyawarah Besar (Mubes) AIKU.
              </p>
            </div>
          </div>
        </header>

        {/* Sticky tab nav */}
        <nav className="sticky top-16 z-30 border-y border-white/8 bg-[#0a0807]/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-4xl gap-1 overflow-x-auto px-6 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => handleTabClick(t.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                  tab === t.id ? "bg-amber-500/15 text-amber-400" : "text-stone-500 hover:text-stone-200"
                }`}
              >
                <t.icon className="h-3.5 w-3.5" />
                {t.label}
                {t.id === "struktur" && !isStrukturUnlocked && (
                  <Lock className="h-3 w-3 opacity-50" />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <main className="px-6 py-14 md:py-20">
          <div className="mx-auto max-w-4xl">
            {tab === "ad" && (
              <>
                <h2 className="mb-2 font-display text-3xl font-semibold text-[#f5efe6]">Anggaran Dasar</h2>
                <p className="mb-4 text-sm text-stone-500">Aturan pokok organisasi AIKU.</p>
                <LegalDoc data={anggaranDasar} />
              </>
            )}
            {tab === "art" && (
              <>
                <h2 className="mb-2 font-display text-3xl font-semibold text-[#f5efe6]">Anggaran Rumah Tangga</h2>
                <p className="mb-4 text-sm text-stone-500">Penjabaran teknis dari Anggaran Dasar.</p>
                <LegalDoc data={anggaranRumahTangga} />
              </>
            )}
            {tab === "gbho" && (
              <>
                <h2 className="mb-2 font-display text-3xl font-semibold text-[#f5efe6]">Garis Besar Haluan Organisasi</h2>
                <p className="mb-4 text-sm text-stone-500">Arah dan pola umum program kerja.</p>
                <GbhoDoc />
              </>
            )}
            {tab === "struktur" && (
              <>
                <h2 className="mb-2 font-display text-3xl font-semibold text-[#f5efe6]">Struktur Organisasi</h2>
                <p className="mb-8 text-sm text-stone-500">Rencana susunan kepengurusan AIKU periode mendatang.</p>
                <StrukturDoc />
              </>
            )}
          </div>
        </main>

        <footer className="border-t border-white/8 px-6 py-7">
          <p className="text-center text-sm text-stone-600">© 2026 IKOM UPI 2018. All rights reserved.</p>
        </footer>
      </div>

      {/* Password Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-6">
          <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#111009] p-8 shadow-2xl">
            <div className="mb-6 flex flex-col items-center gap-3 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">
                <Lock className="h-5 w-5" />
              </div>
              <h2 className="font-display text-xl font-semibold text-[#f5efe6]">Akses Terbatas</h2>
              <p className="text-sm text-stone-400">Masukkan password untuk melihat Struktur Organisasi.</p>
            </div>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwordInput}
                  onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(false); }}
                  placeholder="Password"
                  autoFocus
                  className={`w-full rounded-xl border bg-white/[0.04] px-4 py-3 pr-10 text-sm text-[#f5efe6] placeholder-stone-600 outline-none transition-colors focus:border-amber-500/50 ${
                    passwordError ? "border-red-500/50" : "border-white/10"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {passwordError && (
                <p className="text-xs text-red-400">Password salah. Coba lagi.</p>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm text-stone-400 transition-colors hover:text-stone-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-amber-500/15 py-2.5 text-sm font-medium text-amber-400 transition-colors hover:bg-amber-500/25"
                >
                  Masuk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
