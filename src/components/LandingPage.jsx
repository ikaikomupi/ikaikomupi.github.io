import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import FotoLatar from "./FotoLatar";

// Beranda gaya institusi (mengikuti navbar ala Chevening): selalu terang, foto alumni
// ditampilkan jernih, warna aksen diambil dari logo IKOM (merah, oranye, kuning) + garis emas.
// Warna ditulis hex karena mode terang situs membalik skala stone-*.

const stats = [
  { value: "500+", label: "alumni terhubung" },
  { value: "10", label: "angkatan terhimpun" },
  { value: "20+", label: "sektor industri" },
];

const program = [
  { to: "/directory", title: "Direktori alumni", desc: "Cari teman seangkatan berdasarkan kota, industri, atau tempat kerja." },
  { to: "/events", title: "Event & agenda", desc: "Kalender reuni, gathering, webinar, dan kegiatan resmi organisasi." },
  { to: "/karir", title: "Karir", desc: "Lowongan dan referensi kerja yang dibagikan sesama alumni." },
  { to: "/cpns", title: "KOMpas ASN", desc: "Modul belajar, kuis, dan tryout untuk persiapan CPNS." },
  { to: "/setelah-toga", title: "Setelah Toga", desc: "Cerita dan pelajaran nyata alumni tentang hidup setelah wisuda." },
];

const cerita = [
  {
    name: "Gesha Fadhilah Ramdhan",
    role: "Alumni IKOM UPI 2020",
    quote:
      "Jadi alumni IKOM UPI bukan cuma soal gelar, tapi tentang cara berpikir kritis yang dibentuk sejak kelas pertama. Itu yang sampai sekarang paling terasa manfaatnya di dunia kerja.",
  },
  {
    name: "Rizki Dwi Pangestu",
    role: "Alumni IKOM UPI 2019",
    quote:
      "IKOM UPI ngajarin saya bahwa komunikasi itu bukan cuma bicara, tapi memahami. Pelajaran itu yang bikin saya bertahan dan berkembang di industri yang terus berubah.",
  },
  {
    name: "Den Reza Alfian Farid",
    role: "Alumni IKOM UPI",
    quote:
      "Yang paling berharga dari IKOM bukan hanya ilmunya, tapi orangnya. Angkatan kita penuh orang yang saling menguatkan, dan energi itu masih terasa sampai sekarang.",
  },
];

const tombolUtama =
  "inline-flex items-center justify-center rounded-md bg-[#b5272d] px-6 py-3 text-[15px] font-semibold text-[#fff] transition-colors hover:bg-[#9a1f25] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5272d]";
const tombolGaris =
  "inline-flex items-center justify-center rounded-md border border-[#1f1d1a]/25 px-6 py-3 text-[15px] font-semibold text-[#1f1d1a] transition-colors hover:border-[#1f1d1a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f1d1a]";

// Pita tiga warna dari cincin logo IKOM.
function Pita({ className = "" }) {
  return (
    <div className={`flex h-1.5 ${className}`} aria-hidden="true">
      <span className="flex-[5] bg-[#b5272d]" />
      <span className="flex-[1] bg-[#e0601f]" />
      <span className="flex-[5] bg-[#f0b90b]" />
    </div>
  );
}

function Judul({ children, className = "" }) {
  return (
    <h2 className={`font-display text-3xl font-normal leading-[1.15] tracking-[-0.01em] text-[#1f1d1a] sm:text-[2.6rem] ${className}`}>
      {children}
    </h2>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-[#fff] font-body text-[#1f1d1a] antialiased">
      {/* ── Hero: foto alumni + panel judul ─────────────────────────────── */}
      <section className="relative pt-16">
        <div className="relative h-[58vh] min-h-[340px] overflow-hidden sm:h-[72vh] sm:min-h-[460px]">
          <FotoLatar nama="hero-bg" prioritas className="object-[center_78%]" style={{ "--redup": 1, "--jenuh": 1 }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f1d1a]/35 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto -mt-28 max-w-6xl px-4 sm:-mt-40 sm:px-6">
          <div className="max-w-2xl bg-[#fff] px-6 pb-9 pt-8 shadow-[0_18px_50px_-24px_rgba(31,29,26,0.45)] sm:px-10 sm:pb-11 sm:pt-10">
            <Pita className="-mt-8 mb-8 w-24 sm:-mt-10 sm:mb-10" />
            <h1 className="font-display text-[2.4rem] font-normal leading-[1.08] tracking-[-0.015em] text-[#1f1d1a] sm:text-6xl">
              Merajut koneksi, membangun kolaborasi.
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[#4a4540]">
              Ikatan Keluarga Alumni Ilmu Komunikasi Universitas Pendidikan Indonesia. Tempat alumni lintas angkatan
              tetap terhubung, saling bantu soal karir, dan berkontribusi untuk almamater.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/register" className={tombolUtama}>Daftar sebagai alumni</Link>
              <Link to="/directory" className={tombolGaris}>Cari alumni</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tentang + angka ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Judul>Terhubung, tumbuh, terdampak.</Judul>
          <div>
            <p className="text-[17px] leading-[1.75] text-[#4a4540]">
              Setelah wisuda, hidup membawa kita ke kota dan profesi yang berbeda. IKA IKOM UPI menjaga supaya jarak tidak
              memutus cerita: mempertemukan alumni, membuka jalan karir bagi yang baru lulus, dan menghubungkan alumni dengan
              program studi serta mahasiswa aktif.
            </p>
            <dl className="mt-10 grid grid-cols-3 border-t border-[#b8913a]/60">
              {stats.map((s) => (
                <div key={s.label} className="pt-5 pr-3">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-4xl tabular-nums text-[#b5272d] sm:text-5xl">{s.value}</dd>
                  <dd className="mt-1 text-sm text-[#6b645c]">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── Program ──────────────────────────────────────────────────────── */}
      <section className="bg-[#f3f2ef] px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <Judul>Program untuk alumni</Judul>
            <p className="max-w-sm text-[15px] text-[#6b645c]">Semua layanan gratis untuk alumni Ilmu Komunikasi UPI dari angkatan mana pun.</p>
          </div>
          <ul className="mt-10 border-t border-[#1f1d1a]/15">
            {program.map((p) => (
              <li key={p.to} className="border-b border-[#1f1d1a]/15">
                <Link
                  to={p.to}
                  className="group grid gap-1 py-6 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b5272d] sm:grid-cols-[minmax(0,18rem)_1fr_auto] sm:items-baseline sm:gap-8"
                >
                  <span className="font-display text-xl text-[#1f1d1a] group-hover:text-[#b5272d] sm:text-2xl">{p.title}</span>
                  <span className="text-[15px] leading-relaxed text-[#4a4540]">{p.desc}</span>
                  <span className="hidden text-sm font-semibold text-[#b5272d] sm:block">Buka</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Sambutan Ketua Umum ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-16">
          <figure className="mx-auto w-full max-w-[20rem]">
            <img
              src="/img/cecep-800.webp"
              srcSet="/img/cecep-400.webp 400w, /img/cecep-800.webp 800w"
              sizes="(max-width: 768px) 80vw, 320px"
              loading="lazy"
              decoding="async"
              width="320"
              height="400"
              alt="Cecep Abdurrohman Malik Ibrohim, Ketua Umum IKA IKOM UPI"
              className="aspect-[4/5] w-full object-cover object-top"
            />
            <Pita />
          </figure>
          <div>
            <p className="text-sm font-semibold text-[#b5272d]">Sambutan Ketua Umum</p>
            <blockquote className="mt-4 font-display text-2xl leading-[1.4] text-[#1f1d1a] sm:text-[1.9rem]">
              “Mari kita bangun IKA IKOM UPI bersama, bukan sekadar reuni, tapi wadah nyata yang relevan, inklusif, dan
              berdampak bagi sesama alumni, almamater, dan masyarakat. Perjalanan kita tidak berhenti di hari wisuda.”
            </blockquote>
            <div className="mt-8 border-l-2 border-[#b8913a] pl-4">
              <p className="font-semibold text-[#1f1d1a]">Cecep Abdurrohman Malik Ibrohim</p>
              <p className="text-sm text-[#6b645c]">Ketua Umum IKA IKOM UPI, periode 2026–2029</p>
            </div>
            <Link to="/organisasi" className="mt-6 inline-block text-[15px] font-semibold text-[#b5272d] underline-offset-4 hover:underline">
              Lihat susunan pengurus
            </Link>
          </div>
        </div>
      </section>

      {/* ── Alumni bantu alumni ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#b5272d] px-4 py-20 text-[#fff] sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-end gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="font-display text-4xl leading-[1.05] sm:text-6xl">Alumni bantu alumni.</h2>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-[#fff]/85">
              Dulu ada yang membukakan pintu untuk kita. Sekarang giliran kita. Punya info lowongan di kantor kamu?
              Titipkan, nanti kami sebarkan ke jejaring alumni.
            </p>
          </div>
          <a
            href="https://bit.ly/TitipLokerIKAIKOM"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-[#fff] px-6 py-3 text-[15px] font-semibold text-[#b5272d] transition-colors hover:bg-[#fbeaea] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fff]"
          >
            Titip lowongan kerja
          </a>
        </div>
      </section>

      {/* ── Cerita alumni ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <Judul>Kata alumni</Judul>
        <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-10">
          {cerita.map((c) => (
            <figure key={c.name} className="border-t-2 border-[#f0b90b] pt-6">
              <blockquote className="text-[16px] leading-[1.75] text-[#3a3631]">“{c.quote}”</blockquote>
              <figcaption className="mt-6">
                <p className="font-semibold text-[#1f1d1a]">{c.name}</p>
                <p className="text-sm text-[#6b645c]">{c.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-[#1f1d1a] px-4 pb-10 pt-14 text-[#d9d4cc] sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
            <div>
              <img
                src="/img/logo-ikom-putih-240.png"
                srcSet="/img/logo-ikom-putih-240.png 1x, /img/logo-ikom-putih-480.png 2x"
                alt="Alumni IKOM Universitas Pendidikan Indonesia"
                width="140"
                height="86"
                loading="lazy"
                className="h-auto w-32"
              />
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#a39c92]">
                Ikatan Keluarga Alumni Ilmu Komunikasi Universitas Pendidikan Indonesia. Berkedudukan di Kota Bandung.
              </p>
            </div>
            <nav aria-label="Tentang kami">
              <p className="text-sm font-semibold text-[#fff]">Tentang kami</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link to="/organisasi" className="hover:text-[#fff]">Susunan pengurus</Link></li>
                <li><Link to="/ad-art" className="hover:text-[#fff]">AD/ART</Link></li>
                <li><Link to="/directory" className="hover:text-[#fff]">Direktori alumni</Link></li>
              </ul>
            </nav>
            <nav aria-label="Program">
              <p className="text-sm font-semibold text-[#fff]">Program</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link to="/events" className="hover:text-[#fff]">Event & agenda</Link></li>
                <li><Link to="/karir" className="hover:text-[#fff]">Karir</Link></li>
                <li><Link to="/cpns" className="hover:text-[#fff]">KOMpas ASN</Link></li>
                <li><Link to="/setelah-toga" className="hover:text-[#fff]">Setelah Toga</Link></li>
              </ul>
            </nav>
          </div>
          <Pita className="mt-12" />
          <div className="mt-6 flex flex-col items-start justify-between gap-4 text-sm text-[#a39c92] sm:flex-row sm:items-center">
            <p>© 2026 IKA IKOM UPI</p>
            <a
              href="https://www.instagram.com/ikaikomupi/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-[#fff]"
            >
              <Instagram className="h-4 w-4" /> @ikaikomupi
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
