import { Link } from "react-router-dom";
import Footer from "./Footer";
import { Cincin, IlusDirektori, IlusEvent, IlusKarir, IlusToga, IlusSosial, IlusToa } from "./beranda/Ilustrasi";
import { PERIODE, inti, bidang } from "../data/pengurus";

// Laman Tentang memakai bahasa visual beranda: balon chat, blok warna logo IKOM (merah, oranye, kuning),
// dan ilustrasi di tiap bagian. Isi dari AD/ART (Pasal 3–7), GBHO, lampiran SK, dan laman arah organisasi.
// Warna memakai token ika-* sehingga ikut mode terang/gelap.

const linimasa = [
  { kapan: "± 6 tahun", isi: "IKA IKOM UPI vakum, jejaring alumni berjalan sendiri-sendiri.", warna: "bg-ika-surface text-ika-ink", ekor: "rounded-bl-md" },
  { kapan: "1 Juni 2026", isi: "Musyawarah Besar di Bandung mengesahkan AD/ART dan GBHO.", warna: "bg-ika-oranye text-[#fff]", ekor: "rounded-br-md" },
  { kapan: "16 November 2026", isi: `Pengurus periode ${PERIODE} diumumkan. Kita mulai lagi.`, warna: "bg-ika-merah text-[#fff]", ekor: "rounded-bl-md" },
];

const fakta = [
  { label: "Anggota", isi: "Semua lulusan Ilmu Komunikasi UPI, dari angkatan mana pun" },
  { label: "Kedudukan", isi: "Kota Bandung" },
  { label: "Sifat", isi: "Independen, kekeluargaan, nirlaba, non-partisan" },
  { label: "Asas", isi: "Pancasila dan UUD 1945" },
];

const tujuan = [
  { judul: "Silaturahmi", isi: "Mempererat tali silaturahmi dan rasa kekeluargaan antar alumni lintas angkatan.", Ilus: IlusDirektori, blok: "bg-ika-merah text-[#fff]", ekor: "rounded-bl-md" },
  { judul: "Profesional", isi: "Mengembangkan kapasitas profesional dan jejaring karir antar anggota.", Ilus: IlusKarir, blok: "bg-ika-oranye text-[#fff]", ekor: "rounded-br-md" },
  { judul: "Kontribusi", isi: "Memberikan kontribusi nyata bagi almamater, mahasiswa aktif, dan masyarakat luas.", Ilus: IlusToga, blok: "bg-ika-kuning text-[#1f1d1a]", ekor: "rounded-bl-md" },
];

const pilar = [
  { judul: "Networking & Silaturahmi", isi: "Reuni tahunan yang ramah alumni luar kota, gathering regional, dan halal bihalal sebagai tradisi.", Ilus: IlusEvent, garis: "bg-ika-merah" },
  { judul: "Pengembangan Profesional", isi: "Sesi berbagi karir, mentoring alumni senior untuk junior, job board, dan workshop keterampilan praktis.", Ilus: IlusKarir, garis: "bg-ika-oranye" },
  { judul: "Kontribusi ke Almamater", isi: "Kuliah tamu dan career talk, beasiswa alumni untuk mahasiswa aktif, serta jalur magang di tempat kerja alumni.", Ilus: IlusToga, garis: "bg-ika-kuning" },
  { judul: "Kontribusi Sosial", isi: "Aksi sosial tematik, pemberdayaan komunitas sekitar kampus, dan kolaborasi dengan ikatan alumni lain.", Ilus: IlusSosial, garis: "bg-ika-emas" },
];

// Prinsip kerja ditulis sebagai obrolan: pertanyaan alumni, jawaban pengurus.
const prinsip = [
  { tanya: "Programnya dari mana idenya?", jawab: "Dari kebutuhan alumni yang kami petakan lewat survei lintas angkatan, bukan dari asumsi pengurus." },
  { tanya: "Kenapa programnya tidak banyak?", jawab: "Sengaja. Sedikit program yang berjalan baik lebih berarti daripada banyak program yang berhenti di tengah jalan." },
  { tanya: "Uang kasnya dipakai buat apa?", jawab: "Laporan keuangan per kegiatan dan per kuartal kami bagikan ke seluruh anggota. Terbuka." },
  { tanya: "Kalau pengurusnya ganti, gimana?", jawab: "Data, arsip, dan akses kanal diserahkan utuh ke pengurus berikutnya. Organisasi tidak boleh bergantung pada satu orang." },
];

const tahun = [
  { periode: "2026–2027", judul: "Membangun fondasi", isi: "Basis data anggota, PIC di setiap angkatan, kanal komunikasi resmi, dan silaturahmi lintas angkatan pertama.", warna: "bg-[#e2474e]" },
  { periode: "2027–2028", judul: "Menjalankan program rutin", isi: "Silaturahmi tahunan, program pengembangan profesional rutin, dan kerja sama dengan Program Studi.", warna: "bg-[#ef7a3c]" },
  { periode: "2028–2029", judul: "Memastikan keberlanjutan", isi: "Evaluasi menyeluruh, mentoring alumni–mahasiswa yang berkelanjutan, dan Musyawarah Besar akhir periode.", warna: "bg-[#f5c331]" },
];

const warnaBidang = { A: "bg-ika-merah text-[#fff]", B: "bg-ika-oranye text-[#fff]", C: "bg-ika-kuning text-[#1f1d1a]" };

function Judul({ children, className = "" }) {
  return <h2 className={`font-display text-3xl font-medium leading-[1.12] tracking-[-0.01em] text-ika-ink sm:text-[2.6rem] ${className}`}>{children}</h2>;
}

export default function TentangPage() {
  const ketua = inti[0];
  return (
    <div className="bg-ika-bg font-body text-ika-ink antialiased">
      {/* ── Pembuka ─────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden">
        <Cincin className="pointer-events-none absolute -left-40 -top-24 h-[30rem] w-[30rem] opacity-[0.07]" tebal={26} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 md:pt-36 lg:grid-cols-[1.1fr_1fr] lg:pb-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-ika-surface px-3.5 py-1.5 text-sm text-ika-muted">
              <span className="h-2 w-2 rounded-full bg-ika-merah" />
              Tentang IKA IKOM UPI
            </p>
            <h1 className="mt-6 font-display text-[2.7rem] font-medium leading-[1.02] tracking-[-0.02em] text-ika-ink sm:text-6xl">
              Perjalanan kita tidak berhenti di hari wisuda.
            </h1>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-ika-muted">
              Ikatan Keluarga Alumni Ilmu Komunikasi Universitas Pendidikan Indonesia adalah rumah bersama bagi seluruh lulusan Ilmu
              Komunikasi UPI. Kami menghubungkan alumni lintas angkatan, membuka jalan karir, dan mengembalikan manfaat bagi almamater.
            </p>
          </div>

          {/* Kolase balon foto */}
          <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
            <div className="absolute right-0 top-0 h-[66%] w-[66%] overflow-hidden rounded-full rounded-bl-none ring-[6px] ring-ika-bg">
              <picture>
                <source type="image/webp" srcSet="/img/group-bg-800.webp 800w, /img/group-bg-1600.webp 1600w" sizes="(min-width: 1024px) 320px, 66vw" />
                <img src="/img/group-bg-1600.jpg" alt="Alumni Ilmu Komunikasi UPI berkumpul" fetchPriority="high" decoding="async" className="h-full w-full object-cover" />
              </picture>
            </div>
            <div className="absolute bottom-[4%] left-0 h-[44%] w-[44%] overflow-hidden rounded-full rounded-tr-none ring-[6px] ring-ika-bg">
              <picture>
                <source type="image/webp" srcSet="/img/hero-bg-800.webp 800w" sizes="220px" />
                <img src="/img/hero-bg-1600.jpg" alt="" loading="lazy" decoding="async" className="h-full w-full scale-[1.6] object-cover" style={{ objectPosition: "50% 88%", transformOrigin: "bottom" }} />
              </picture>
            </div>
            <Cincin className="absolute bottom-[8%] right-[6%] h-[30%] w-[30%] animate-[spin_40s_linear_infinite] motion-reduce:animate-none" tebal={30} />
            <div className="gelembung absolute left-[2%] top-[22%] max-w-[48%] rounded-2xl rounded-br-sm bg-ika-bg px-4 py-3 text-sm text-ika-ink shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] ring-1 ring-ika-line" style={{ animationDelay: "0.4s" }}>
              <b className="block text-ika-merah">Grup alumni</b>Akhirnya hidup lagi! Kapan kita ngumpul?
            </div>
            <div className="gelembung absolute bottom-[40%] right-[24%] rounded-2xl rounded-tl-sm bg-ika-kuning px-4 py-2.5 text-sm font-medium text-[#1f1d1a] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)]" style={{ animationDelay: "1.1s" }}>
              Gas! 🙌
            </div>
          </div>
        </div>
      </header>

      {/* ── Siapa kami: linimasa obrolan ────────────────────────────────── */}
      <section className="bg-ika-surface">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <Judul>Kami pernah diam. Sekarang kami mulai lagi.</Judul>
            <p className="mt-5 max-w-lg text-[17px] leading-[1.8] text-ika-ink/85">
              Masa vakum mengajarkan satu hal: organisasi alumni tidak cukup hanya menjadi ajang reuni. Ia harus relevan dengan
              kebutuhan anggotanya, terbuka untuk semua angkatan, dan meninggalkan dampak yang bisa dirasakan.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-3">
              {fakta.map((f) => (
                <div key={f.label} className="rounded-2xl bg-ika-bg px-4 py-3 ring-1 ring-ika-line">
                  <dt className="text-xs text-ika-muted">{f.label}</dt>
                  <dd className="mt-1 text-[14px] leading-snug text-ika-ink">{f.isi}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ol className="space-y-4 self-center">
            {linimasa.map((l, i) => (
              <li key={l.kapan} className={`flex ${i % 2 ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-3xl px-6 py-5 ${l.warna} ${l.ekor} ${i === 0 ? "ring-1 ring-ika-line" : ""}`}>
                  <p className="font-display text-2xl font-semibold leading-none">{l.kapan}</p>
                  <p className="mt-2 text-[15px] leading-relaxed opacity-90">{l.isi}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Visi: pita merah ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#b5272d] text-[#fff]">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-[#e0601f]/45" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1fr_auto] md:py-28">
          <div>
            <p className="inline-block rounded-full bg-[#fff]/15 px-3.5 py-1 text-sm font-medium">Visi kami</p>
            <blockquote className="mt-6 max-w-3xl font-display text-[1.9rem] font-medium leading-[1.25] sm:text-[2.6rem]">
              Membangun IKA IKOM UPI sebagai wadah alumni yang <span className="underline decoration-[#f0b90b] decoration-4 underline-offset-8">relevan</span>,{" "}
              <span className="underline decoration-[#f0b90b] decoration-4 underline-offset-8">inklusif</span>, dan{" "}
              <span className="underline decoration-[#f0b90b] decoration-4 underline-offset-8">berdampak nyata</span> bagi anggotanya, almamater, dan masyarakat luas.
            </blockquote>
          </div>
          <IlusToa className="mx-auto h-40 w-48 md:h-52 md:w-60" />
        </div>
      </section>

      {/* ── Tujuan ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Judul>Tiga hal yang kami jaga.</Judul>
        <p className="mt-3 text-[16px] text-ika-muted">Tujuan organisasi menurut Anggaran Dasar, Bab II Pasal 6.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {tujuan.map(({ judul, isi, Ilus, blok, ekor }) => (
            <article key={judul} className={`flex flex-col overflow-hidden rounded-[2rem] ${ekor} bg-ika-surface`}>
              <div className="flex h-44 items-center justify-center px-6 pt-6">
                <Ilus className="h-full w-full max-w-[15rem]" />
              </div>
              <div className={`mt-6 flex-1 px-7 py-6 ${blok}`}>
                <h3 className="font-display text-2xl font-medium">{judul}</h3>
                <p className="mt-2 text-[15px] leading-relaxed opacity-90">{isi}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Empat arah program ──────────────────────────────────────────── */}
      <section className="bg-ika-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
            <Judul>Empat arah program.</Judul>
            <p className="max-w-md text-[16px] leading-relaxed text-ika-muted md:justify-self-end">
              Ditetapkan dalam Garis Besar Haluan Organisasi. Tiga bidang kepengurusan bekerja di dalam keempatnya.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pilar.map(({ judul, isi, Ilus, garis }) => (
              <article key={judul} className="group flex flex-col rounded-[2rem] bg-ika-bg p-6">
                <Ilus className="h-32 w-full transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none" />
                <span className={`mt-5 block h-1 w-10 ${garis}`} aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl leading-snug text-ika-ink">{judul}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ika-muted">{isi}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cara kami bekerja: obrolan ──────────────────────────────────── */}
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <Judul>Cara kami bekerja.</Judul>
          <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-ika-muted">
            Pertanyaan yang paling sering kami dengar dari alumni, dan jawaban jujur kami.
          </p>
          <Cincin className="mt-10 hidden h-32 w-32 lg:block" tebal={24} />
        </div>
        <div className="space-y-4">
          {prinsip.map((p) => (
            <div key={p.tanya} className="space-y-2">
              <div className="flex justify-end">
                <p className="max-w-[80%] rounded-2xl rounded-br-sm bg-ika-surface px-4 py-2.5 text-[15px] text-ika-ink ring-1 ring-ika-line">{p.tanya}</p>
              </div>
              <div className="flex items-end gap-2.5">
                <img src="/img/logo-ikom.webp" alt="" className="logo-warna h-6 w-auto shrink-0" />
                <img src="/img/logo-ikom-putih-240.png" alt="" className="logo-putih h-6 w-auto shrink-0" />
                <p className="max-w-[85%] rounded-2xl rounded-bl-sm bg-ika-merah px-4 py-3 text-[15px] leading-relaxed text-[#fff]">{p.jawab}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Peta jalan tiga tahun ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#1f1d1a] text-[#f4efe7]" data-theme="dark">
        <Cincin className="pointer-events-none absolute -bottom-28 -right-28 h-96 w-96 opacity-20" tebal={16} />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <p className="inline-block rounded-full bg-[#fff]/10 px-3.5 py-1 text-sm">Peta jalan {PERIODE}</p>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-medium leading-[1.15] sm:text-[2.6rem]">
            Tiga tahun untuk membangun organisasi yang bertahan lebih lama dari pengurusnya.
          </h2>
          <div className="mt-14 flex h-2 overflow-hidden rounded-full" aria-hidden="true">
            {tahun.map((t) => <span key={t.periode} className={`flex-1 ${t.warna}`} />)}
          </div>
          <ol className="mt-8 grid gap-10 md:grid-cols-3 md:gap-8">
            {tahun.map((t, i) => (
              <li key={t.periode}>
                <p className="text-sm text-[#aaa298]">Tahun {["pertama", "kedua", "ketiga"][i]} · {t.periode}</p>
                <h3 className="mt-2 font-display text-2xl">{t.judul}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#cfc8be]">{t.isi}</p>
              </li>
            ))}
          </ol>
          <Link to="/calon-ketua" className="mt-12 inline-flex items-center justify-center rounded-full bg-[#f5c331] px-6 py-3 text-[15px] font-semibold text-[#1f1d1a] transition hover:brightness-105">
            Baca gagasan lengkap arah organisasi
          </Link>
        </div>
      </section>

      {/* ── Tata kelola: bagan alur ─────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Judul>Dipimpin oleh alumni, untuk alumni.</Judul>
        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ika-muted">
          Musyawarah Besar memilih Ketua Umum untuk masa bakti tiga tahun. Pengurus Inti menjalankan organisasi bersama tiga bidang,
          didampingi Dewan Pembina, dan terhubung ke setiap angkatan lewat PIC Angkatan.
        </p>

        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="rounded-full border-2 border-ika-ink px-6 py-2.5 text-center">
            <p className="font-display text-lg text-ika-ink">Musyawarah Besar</p>
          </div>
          <span className="h-6 w-px bg-ika-line" aria-hidden="true" />
          <div className="rounded-3xl rounded-bl-md bg-ika-ink px-7 py-4 text-center text-ika-bg">
            <p className="text-xs opacity-75">{ketua.jabatan}</p>
            <p className="font-display text-xl">{ketua.nama}</p>
          </div>
          <span className="h-6 w-px bg-ika-line" aria-hidden="true" />
          <div className="grid w-full gap-3 md:grid-cols-3">
            {bidang.map((b) => (
              <div key={b.kode} className={`rounded-3xl px-6 py-4 ${warnaBidang[b.kode]}`}>
                <p className="text-xs opacity-80">Bidang {b.kode} · Koordinator {b.koordinator}</p>
                <p className="mt-1 font-display text-lg leading-snug">{b.nama}</p>
              </div>
            ))}
          </div>
          <span className="h-6 w-px bg-ika-line" aria-hidden="true" />
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1.5" aria-hidden="true">
              {Array.from({ length: 10 }, (_, i) => (
                <span key={i} className={`h-4 w-4 rounded-full ${["bg-ika-merah", "bg-ika-oranye", "bg-ika-kuning"][i % 3]}`} />
              ))}
            </div>
            <p className="text-sm text-ika-muted">Satu PIC di setiap angkatan</p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link to="/organisasi" className="inline-flex items-center justify-center rounded-full border-2 border-ika-ink/20 px-6 py-3 text-[15px] font-semibold text-ika-ink transition-colors hover:border-ika-ink">
            Lihat susunan pengurus
          </Link>
          <Link to="/ad-art" className="inline-flex items-center justify-center rounded-full border-2 border-ika-ink/20 px-6 py-3 text-[15px] font-semibold text-ika-ink transition-colors hover:border-ika-ink">
            Baca AD/ART & GBHO
          </Link>
        </div>
      </section>

      {/* ── Ajakan ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ika-kuning text-[#1f1d1a]">
        <Cincin className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 opacity-30" tebal={22} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 md:grid-cols-[1fr_auto] md:py-20">
          <div>
            <h2 className="font-display text-3xl font-medium leading-[1.12] sm:text-[2.6rem]">Jadilah bagian dari cerita berikutnya.</h2>
            <p className="mt-3 max-w-xl text-[16px] leading-relaxed opacity-80">
              Daftarkan diri supaya teman seangkatan bisa menemukanmu, dan kabar kegiatan sampai kepadamu.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/register" className="inline-flex items-center justify-center rounded-full bg-[#1f1d1a] px-6 py-3 text-[15px] font-semibold text-[#fff] transition hover:bg-[#000]">
              Daftar sebagai alumni
            </Link>
            <Link to="/events" className="inline-flex items-center justify-center rounded-full border-2 border-[#1f1d1a]/30 px-6 py-3 text-[15px] font-semibold transition-colors hover:border-[#1f1d1a]">
              Lihat agenda
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
