import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import { Cincin, IlusDirektori, IlusEvent, IlusKarir, IlusKompas, IlusToga, IlusToa } from "./beranda/Ilustrasi";

// Beranda bertema "komunikasi": foto alumni dibingkai seperti balon chat, ilustrasi tiap program,
// dan testimoni berbentuk obrolan grup. Warna memakai token ika-* sehingga ikut mode terang/gelap.

const stats = [
  { value: "500+", label: "alumni terhubung", warna: "bg-ika-merah text-[#fff]", ekor: "rounded-bl-none" },
  { value: "10", label: "angkatan terhimpun", warna: "bg-ika-kuning text-[#1f1d1a]", ekor: "rounded-br-none" },
  { value: "20+", label: "sektor industri", warna: "bg-ika-oranye text-[#fff]", ekor: "rounded-bl-none" },
];

const program = [
  { to: "/directory", title: "Direktori alumni", desc: "Cari teman seangkatan berdasarkan kota, industri, atau tempat kerja.", Ilus: IlusDirektori, besar: true },
  { to: "/events", title: "Event & agenda", desc: "Reuni, gathering, dan webinar dalam satu kalender.", Ilus: IlusEvent },
  { to: "/karir", title: "Karir", desc: "Lowongan dan referensi kerja dari sesama alumni.", Ilus: IlusKarir },
  { to: "/cpns", title: "KOMpas ASN", desc: "Modul, kuis, dan tryout persiapan CPNS.", Ilus: IlusKompas },
  { to: "/setelah-toga", title: "Setelah Toga", desc: "Cerita alumni tentang hidup setelah wisuda.", Ilus: IlusToga },
];

const obrolan = [
  {
    name: "Gesha Fadhilah Ramdhan",
    role: "Angkatan 2020",
    warna: "bg-ika-merah",
    teks: "Jadi alumni IKOM UPI bukan cuma soal gelar, tapi tentang cara berpikir kritis yang dibentuk sejak kelas pertama. Itu yang sampai sekarang paling terasa manfaatnya di dunia kerja.",
    jam: "09.12",
  },
  {
    name: "Rizki Dwi Pangestu",
    role: "Angkatan 2019",
    warna: "bg-ika-oranye",
    teks: "IKOM ngajarin saya bahwa komunikasi itu bukan cuma bicara, tapi memahami. Pelajaran itu yang bikin saya bertahan di industri yang terus berubah.",
    jam: "09.15",
  },
  {
    name: "Den Reza Alfian Farid",
    role: "Alumni IKOM UPI",
    warna: "bg-ika-kuning",
    teks: "Yang paling berharga dari IKOM bukan cuma ilmunya, tapi orangnya. Kita saling menguatkan, dan energinya masih terasa sampai sekarang.",
    jam: "09.21",
  },
];

const inisial = (n) => n.split(" ").slice(0, 2).map((k) => k[0]).join("");

const tombolUtama =
  "inline-flex items-center justify-center rounded-full bg-ika-merah px-6 py-3 text-[15px] font-semibold text-[#fff] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ika-merah";
const tombolGaris =
  "inline-flex items-center justify-center rounded-full border-2 border-ika-ink/20 px-6 py-3 text-[15px] font-semibold text-ika-ink transition-colors hover:border-ika-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ika-ink";

function Foto({ nama, posisi, sizes, className, prioritas }) {
  return (
    <picture>
      <source type="image/webp" srcSet={`/img/${nama}-800.webp 800w, /img/${nama}-1600.webp 1600w`} sizes={sizes} />
      <img
        src={`/img/${nama}-1600.jpg`}
        alt=""
        decoding="async"
        loading={prioritas ? "eager" : "lazy"}
        fetchPriority={prioritas ? "high" : "auto"}
        className={`h-full w-full object-cover ${className}`}
        style={{ objectPosition: posisi }}
      />
    </picture>
  );
}

function Gelembung({ children, className, delay }) {
  return (
    <div
      className={`gelembung absolute max-w-[46%] rounded-2xl bg-ika-bg px-3.5 py-2.5 text-[12px] leading-snug text-ika-ink shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] ring-1 ring-ika-line sm:text-[13px] ${className}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-16">
      <Cincin className="pointer-events-none absolute -left-40 -top-24 h-[30rem] w-[30rem] opacity-[0.07]" tebal={26} />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:pb-24 lg:pt-20">
        <div className="relative">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-ika-surface px-3.5 py-1.5 text-sm text-ika-muted">
            <span className="h-2 w-2 rounded-full bg-ika-merah" />
            Pengurus periode 2026–2029 diumumkan
          </p>
          <h1 className="font-display text-[2.7rem] font-medium leading-[1.02] tracking-[-0.02em] text-ika-ink sm:text-[4.2rem]">
            Merajut koneksi, membangun kolaborasi.
          </h1>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-ika-muted">
            Rumah bagi alumni Ilmu Komunikasi Universitas Pendidikan Indonesia. Tetap terhubung lintas angkatan, saling
            bantu soal karir, dan berkontribusi untuk almamater.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/register" className={tombolUtama}>Daftar sebagai alumni</Link>
            <Link to="/directory" className={tombolGaris}>Cari teman seangkatan</Link>
          </div>
        </div>

        {/* Kolase foto berbentuk balon chat */}
        <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
          <Cincin className="absolute left-[6%] top-[4%] h-[30%] w-[30%] animate-[spin_40s_linear_infinite] motion-reduce:animate-none" tebal={30} />
          <div className="absolute right-0 top-[6%] h-[64%] w-[64%] overflow-hidden rounded-full rounded-bl-none ring-[6px] ring-ika-bg">
            <Foto nama="hero-bg" posisi="50% 88%" sizes="(min-width: 1024px) 360px, 64vw" prioritas className="scale-[1.6] origin-bottom" />
          </div>
          <div className="absolute bottom-[2%] left-[2%] h-[46%] w-[46%] overflow-hidden rounded-full rounded-tr-none ring-[6px] ring-ika-bg">
            <Foto nama="group-bg" posisi="50% 50%" sizes="(min-width: 1024px) 260px, 46vw" />
          </div>
          <div className="absolute bottom-[8%] right-[6%] h-[28%] w-[28%] overflow-hidden rounded-full rounded-tl-none ring-[6px] ring-ika-bg">
            <Foto nama="directory-bg" posisi="40% 40%" sizes="(min-width: 1024px) 160px, 28vw" />
          </div>
          <div className="absolute bottom-[40%] right-[30%] h-6 w-6 rounded-full bg-ika-kuning" aria-hidden="true" />
          <div className="absolute left-[44%] top-[2%] h-3 w-3 rounded-full bg-ika-oranye" aria-hidden="true" />

          <Gelembung className="left-0 top-[38%] rounded-bl-sm" delay="0.4s">
            <b className="block text-ika-merah">Grup angkatan 2018</b>Reuni bulan depan jadi ya, aku bawa kue!
          </Gelembung>
          <Gelembung className="right-[2%] top-0 rounded-br-sm" delay="1s">
            <b className="block text-ika-oranye">Grup angkatan 2019</b>Ada loker content writer di kantorku, ada yang minat?
          </Gelembung>
          <Gelembung className="bottom-[34%] left-[38%] rounded-tl-sm" delay="1.6s">
            Selamat untuk pengurus baru! 🎉
          </Gelembung>
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-ika-bg font-body text-ika-ink antialiased">
      <Hero />

      {/* ── Angka dalam balon ────────────────────────────────────────────── */}
      <section className="bg-ika-surface px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="font-display text-3xl leading-[1.15] text-ika-ink sm:text-[2.6rem]">Terhubung, tumbuh, terdampak.</h2>
            <p className="mt-4 max-w-md text-[16px] leading-[1.75] text-ika-muted">
              Setelah wisuda, hidup membawa kita ke kota dan profesi yang berbeda. IKA IKOM UPI menjaga supaya jarak tidak
              memutus cerita.
            </p>
          </div>
          <dl className="grid grid-cols-3 gap-3 sm:gap-5">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex aspect-square flex-col items-center justify-center rounded-full p-3 text-center ${s.warna} ${s.ekor} ${i === 1 ? "sm:-translate-y-6" : ""}`}
              >
                <dd className="font-display text-3xl font-semibold tabular-nums sm:text-5xl">{s.value}</dd>
                <dt className="mt-1 text-[11px] font-medium leading-tight opacity-90 sm:text-sm">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Program bergambar ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl leading-[1.15] text-ika-ink sm:text-[2.6rem]">Program untuk alumni</h2>
          <p className="mt-3 text-[16px] text-ika-muted">Gratis untuk alumni Ilmu Komunikasi UPI dari angkatan mana pun.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {program.map(({ to, title, desc, Ilus, besar }) => (
            <Link
              key={to}
              to={to}
              className={`group relative flex flex-col overflow-hidden rounded-3xl bg-ika-surface p-6 transition-colors hover:bg-ika-line/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ika-merah ${
                besar ? "sm:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <Ilus className={`${besar ? "h-56 sm:h-72" : "h-32"} w-full transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none`} />
              <div className="mt-auto pt-4">
                <h3 className={`font-display ${besar ? "text-3xl" : "text-xl"} text-ika-ink`}>{title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-ika-muted">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Sambutan Ketua Umum ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ika-surface px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-16">
          <div className="relative mx-auto aspect-square w-full max-w-[22rem]">
            <Cincin className="absolute inset-0 h-full w-full" tebal={9} />
            <div className="absolute inset-[7%] overflow-hidden rounded-full">
              <img
                src="/img/cecep-800.webp"
                srcSet="/img/cecep-400.webp 400w, /img/cecep-800.webp 800w"
                sizes="(max-width: 768px) 80vw, 352px"
                loading="lazy"
                decoding="async"
                width="352"
                height="352"
                alt="Cecep Abdurrohman Malik Ibrohim, Ketua Umum IKA IKOM UPI"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-ika-merah">Sambutan Ketua Umum</p>
            <blockquote className="mt-4 font-display text-2xl leading-[1.4] text-ika-ink sm:text-[2rem]">
              “Mari kita bangun IKA IKOM UPI bersama, bukan sekadar reuni, tapi wadah nyata yang relevan, inklusif, dan
              berdampak. Perjalanan kita tidak berhenti di hari wisuda.”
            </blockquote>
            <div className="mt-8">
              <p className="font-semibold text-ika-ink">Cecep Abdurrohman Malik Ibrohim</p>
              <p className="text-sm text-ika-muted">Ketua Umum, periode 2026–2029</p>
            </div>
            <Link to="/organisasi" className="mt-6 inline-block text-[15px] font-semibold text-ika-merah underline-offset-4 hover:underline">
              Lihat susunan pengurus
            </Link>
          </div>
        </div>
      </section>

      {/* ── Alumni bantu alumni ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#b5272d] px-4 py-16 text-[#fff] sm:px-6 sm:py-20">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#e0601f]/40" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
            <IlusToa className="h-28 w-36 shrink-0 sm:h-36 sm:w-44" />
            <div>
              <h2 className="font-display text-4xl leading-[1.05] sm:text-5xl">Alumni bantu alumni.</h2>
              <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-[#fff]/85">
                Dulu ada yang membukakan pintu untuk kita. Punya info lowongan di kantor kamu? Titipkan, nanti kami sebarkan
                ke jejaring alumni.
              </p>
            </div>
          </div>
          <a
            href="https://bit.ly/TitipLokerIKAIKOM"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#fff] px-6 py-3 text-[15px] font-semibold text-[#b5272d] transition-colors hover:bg-[#fde9e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fff]"
          >
            Titip lowongan kerja
          </a>
        </div>
      </section>

      {/* ── Kata alumni: obrolan grup ────────────────────────────────────── */}
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <h2 className="font-display text-3xl leading-[1.15] text-ika-ink sm:text-[2.6rem]">Kata alumni</h2>
          <p className="mt-3 max-w-sm text-[16px] leading-relaxed text-ika-muted">
            Obrolan yang biasa kita dengar di grup angkatan, tentang apa yang paling berbekas dari kuliah di IKOM.
          </p>
          <Cincin className="mt-10 hidden h-32 w-32 lg:block" tebal={24} />
        </div>
        <div className="overflow-hidden rounded-3xl bg-ika-surface ring-1 ring-ika-line">
          <div className="flex items-center gap-3 border-b border-ika-line bg-ika-bg px-5 py-3.5">
            <img src="/img/logo-ikom.webp" alt="" className="logo-warna h-7 w-auto" />
            <img src="/img/logo-ikom-putih-240.png" alt="" className="logo-putih h-7 w-auto" />
            <div>
              <p className="text-sm font-semibold text-ika-ink">Alumni IKOM UPI</p>
              <p className="text-xs text-ika-muted">Gesha, Rizki, Den Reza, dan 500+ lainnya</p>
            </div>
          </div>
          <div className="space-y-5 px-4 py-6 sm:px-6">
            {obrolan.map((o) => (
              <figure key={o.name} className="flex items-end gap-3">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-[#fff] ${o.warna}`} aria-hidden="true">
                  {inisial(o.name)}
                </div>
                <div className="max-w-[34rem] rounded-2xl rounded-bl-sm bg-ika-bg px-4 py-3 shadow-[0_6px_18px_-12px_rgba(0,0,0,0.35)]">
                  <figcaption className="text-[13px] font-semibold text-ika-ink">
                    {o.name} <span className="font-normal text-ika-muted">· {o.role}</span>
                  </figcaption>
                  <blockquote className="mt-1 text-[15px] leading-relaxed text-ika-ink/90">{o.teks}</blockquote>
                  <p className="mt-1 text-right text-[11px] text-ika-muted">{o.jam}</p>
                </div>
              </figure>
            ))}
            <div className="flex justify-end">
              <Link to="/register" className="rounded-2xl rounded-br-sm bg-ika-merah px-4 py-3 text-[15px] font-medium text-[#fff] hover:brightness-110">
                Aku juga mau gabung, daftar di sini
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-[#110f0d] px-4 pb-10 pt-14 text-[#d9d4cc] sm:px-6">
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
          <div className="mt-12 flex h-1.5" aria-hidden="true">
            <span className="flex-[5] bg-[#b5272d]" />
            <span className="flex-[1] bg-[#e0601f]" />
            <span className="flex-[5] bg-[#f0b90b]" />
          </div>
          <div className="mt-6 flex flex-col items-start justify-between gap-4 text-sm text-[#a39c92] sm:flex-row sm:items-center">
            <p>© 2026 IKA IKOM UPI</p>
            <a href="https://www.instagram.com/ikaikomupi/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#fff]">
              <Instagram className="h-4 w-4" /> @ikaikomupi
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
