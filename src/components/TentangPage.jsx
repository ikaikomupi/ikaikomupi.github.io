import { Link } from "react-router-dom";
import Footer from "./Footer";
import { Cincin } from "./beranda/Ilustrasi";
import { PERIODE, inti, bidang } from "../data/pengurus";

// Laman Tentang, gaya laporan tahunan organisasi internasional: tipografi serif besar, banyak ruang,
// garis tipis sebagai pemisah, foto lebar. Isi diambil dari AD/ART (Pasal 3–7), GBHO, lampiran SK,
// dan gagasan arah organisasi di laman /calon-ketua. Warna memakai token ika-* (ikut tema).

const fakta = [
  { label: "Anggota", isi: "Seluruh lulusan Program Studi Ilmu Komunikasi UPI, dari semua angkatan" },
  { label: "Kedudukan", isi: "Kota Bandung, mengikuti domisili Program Studi" },
  { label: "Sifat", isi: "Independen, kekeluargaan, nirlaba, dan tidak berafiliasi dengan partai politik" },
  { label: "Asas", isi: "Pancasila dan UUD Negara Republik Indonesia Tahun 1945" },
];

const tujuan = [
  { judul: "Silaturahmi", isi: "Mempererat tali silaturahmi dan rasa kekeluargaan antar alumni lintas angkatan." },
  { judul: "Profesional", isi: "Mengembangkan kapasitas profesional dan jejaring karir antar anggota." },
  { judul: "Kontribusi", isi: "Memberikan kontribusi nyata bagi almamater, mahasiswa aktif, dan masyarakat luas." },
];

const pilar = [
  {
    judul: "Networking & Silaturahmi",
    warna: "bg-ika-merah",
    isi: "Reuni tahunan yang inklusif bagi alumni luar kota, gathering regional, dan halal bihalal sebagai tradisi.",
  },
  {
    judul: "Pengembangan Profesional",
    warna: "bg-ika-oranye",
    isi: "Sesi berbagi karir, mentoring alumni senior untuk junior, job board, dan workshop keterampilan praktis.",
  },
  {
    judul: "Kontribusi ke Almamater",
    warna: "bg-ika-kuning",
    isi: "Kuliah tamu dan career talk, beasiswa alumni untuk mahasiswa aktif, serta peluang magang di tempat kerja alumni.",
  },
  {
    judul: "Kontribusi Sosial",
    warna: "bg-ika-emas",
    isi: "Aksi sosial tematik, pemberdayaan komunitas sekitar kampus, dan kolaborasi dengan ikatan alumni lain.",
  },
];

const prinsip = [
  { judul: "Diagnosis sebelum eksekusi", isi: "Program disusun dari kebutuhan alumni yang dipetakan lewat survei lintas angkatan, bukan dari asumsi." },
  { judul: "Fokus, bukan segalanya", isi: "Sedikit program yang dijalankan dengan baik lebih berarti daripada banyak program yang berhenti di tengah jalan." },
  { judul: "Transparan", isi: "Laporan keuangan per kegiatan dan per kuartal dibagikan ke seluruh anggota." },
  { judul: "Tidak bergantung pada satu orang", isi: "Data, arsip, dan akses kanal diwariskan utuh ke kepengurusan berikutnya." },
];

const tahun = [
  { periode: "2026–2027", judul: "Membangun fondasi", isi: "Basis data anggota aktif, PIC di setiap angkatan, kanal komunikasi resmi, dan acara silaturahmi lintas angkatan pertama." },
  { periode: "2027–2028", judul: "Menjalankan program rutin", isi: "Silaturahmi tahunan, program pengembangan profesional yang berjalan rutin, dan kerja sama dengan Program Studi." },
  { periode: "2028–2029", judul: "Memastikan keberlanjutan", isi: "Evaluasi menyeluruh, mentoring alumni–mahasiswa yang berkelanjutan, dan Musyawarah Besar akhir periode." },
];

function Judul({ children, className = "" }) {
  return <h2 className={`font-display text-3xl font-normal leading-[1.15] tracking-[-0.01em] text-ika-ink sm:text-[2.75rem] ${className}`}>{children}</h2>;
}

function Bagian({ label, children, className = "" }) {
  // Kolom kiri sempit berisi nama bagian, kolom kanan isi. Pola laporan tahunan.
  return (
    <section className={`mx-auto grid max-w-6xl gap-6 border-t border-ika-line px-4 py-16 sm:px-6 md:grid-cols-[12rem_1fr] md:gap-12 md:py-24 ${className}`}>
      <p className="text-sm font-medium text-ika-muted">{label}</p>
      <div>{children}</div>
    </section>
  );
}

export default function TentangPage() {
  const ketua = inti[0];
  return (
    <div className="bg-ika-bg font-body text-ika-ink antialiased">
      {/* Pembuka */}
      <header className="mx-auto max-w-6xl px-4 pb-14 pt-32 sm:px-6 md:pb-20 md:pt-40">
        <p className="text-sm font-medium text-ika-merah">Tentang IKA IKOM UPI</p>
        <h1 className="mt-5 max-w-4xl font-display text-[2.6rem] font-normal leading-[1.05] tracking-[-0.02em] text-ika-ink sm:text-6xl md:text-7xl">
          Perjalanan kita tidak berhenti di hari wisuda.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ika-muted md:text-xl">
          Ikatan Keluarga Alumni Ilmu Komunikasi Universitas Pendidikan Indonesia adalah rumah bersama bagi seluruh lulusan Ilmu
          Komunikasi UPI. Kami menghubungkan alumni lintas angkatan, membuka jalan karir, dan mengembalikan manfaat bagi almamater.
        </p>
      </header>

      <figure className="mx-auto max-w-[90rem] px-0 sm:px-6">
        <div className="relative aspect-[16/9] overflow-hidden sm:aspect-[21/9] sm:rounded-sm">
          <picture>
            <source type="image/webp" srcSet="/img/group-bg-800.webp 800w, /img/group-bg-1600.webp 1600w" sizes="100vw" />
            <img src="/img/group-bg-1600.jpg" alt="Alumni Ilmu Komunikasi UPI berkumpul bersama" fetchPriority="high" decoding="async" className="h-full w-full object-cover object-center" />
          </picture>
        </div>
        <figcaption className="mx-auto mt-3 max-w-6xl px-4 text-sm text-ika-muted sm:px-0">
          Alumni Ilmu Komunikasi UPI lintas angkatan.
        </figcaption>
      </figure>

      {/* Siapa kami */}
      <Bagian label="Siapa kami" className="mt-16 md:mt-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-5 text-[17px] leading-[1.8] text-ika-ink/85">
            <p>
              Setelah sekitar enam tahun vakum, IKA IKOM UPI dihidupkan kembali pada 2026 melalui Musyawarah Besar yang mengesahkan
              Anggaran Dasar, Anggaran Rumah Tangga, dan Garis Besar Haluan Organisasi. Pengurus periode {PERIODE} diumumkan pada
              16 November 2026.
            </p>
            <p>
              Kami belajar dari masa vakum itu. Organisasi alumni tidak cukup hanya menjadi ajang reuni. Ia harus relevan dengan
              kebutuhan anggotanya, terbuka untuk semua angkatan, dan meninggalkan dampak yang bisa dirasakan.
            </p>
          </div>
          <dl className="divide-y divide-ika-line border-y border-ika-line">
            {fakta.map((f) => (
              <div key={f.label} className="grid grid-cols-[7rem_1fr] gap-4 py-4">
                <dt className="text-sm text-ika-muted">{f.label}</dt>
                <dd className="text-[15px] leading-relaxed text-ika-ink">{f.isi}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Bagian>

      {/* Visi */}
      <section className="bg-ika-surface">
        <div className="relative mx-auto max-w-6xl overflow-hidden px-4 py-20 sm:px-6 md:py-32">
          <Cincin className="pointer-events-none absolute -right-24 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 opacity-[0.12]" tebal={18} />
          <p className="relative text-sm font-medium text-ika-muted">Visi</p>
          <blockquote className="relative mt-6 max-w-4xl font-display text-[1.9rem] font-normal leading-[1.3] text-ika-ink sm:text-[2.6rem]">
            Membangun IKA IKOM UPI sebagai wadah alumni yang relevan, inklusif, dan berdampak nyata bagi anggotanya, almamater, dan
            masyarakat luas.
          </blockquote>
        </div>
      </section>

      {/* Tujuan */}
      <Bagian label="Tujuan kami">
        <Judul>Tiga hal yang kami jaga.</Judul>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {tujuan.map((t) => (
            <div key={t.judul} className="border-t-2 border-ika-ink pt-5">
              <h3 className="font-display text-2xl text-ika-ink">{t.judul}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ika-muted">{t.isi}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-ika-muted">Anggaran Dasar, Bab II Pasal 6.</p>
      </Bagian>

      {/* Apa yang kami kerjakan */}
      <Bagian label="Apa yang kami kerjakan">
        <Judul>Empat arah program.</Judul>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ika-muted">
          Garis Besar Haluan Organisasi menetapkan empat arah program. Ketiga bidang kepengurusan bekerja di dalamnya.
        </p>
        <div className="mt-12 grid gap-px overflow-hidden rounded-sm bg-ika-line sm:grid-cols-2">
          {pilar.map((p) => (
            <div key={p.judul} className="bg-ika-bg p-7 md:p-9">
              <span className={`block h-1 w-10 ${p.warna}`} aria-hidden="true" />
              <h3 className="mt-6 font-display text-2xl text-ika-ink">{p.judul}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ika-muted">{p.isi}</p>
            </div>
          ))}
        </div>
      </Bagian>

      {/* Cara kami bekerja */}
      <Bagian label="Cara kami bekerja">
        <Judul>Prinsip yang kami pegang.</Judul>
        <dl className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {prinsip.map((p) => (
            <div key={p.judul}>
              <dt className="font-display text-xl text-ika-ink">{p.judul}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-ika-muted">{p.isi}</dd>
            </div>
          ))}
        </dl>
      </Bagian>

      {/* Peta jalan tiga tahun */}
      <section className="bg-[#1f1d1a] text-[#f4efe7]" data-theme="dark">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <p className="text-sm font-medium text-[#aaa298]">Peta jalan {PERIODE}</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-normal leading-[1.15] sm:text-[2.75rem]">
            Tiga tahun untuk membangun organisasi yang bertahan lebih lama dari pengurusnya.
          </h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {tahun.map((t, i) => (
              <li key={t.periode} className="relative border-t border-[#4a433c] pt-6">
                <span className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full bg-[#f5c331]" aria-hidden="true" />
                <p className="text-sm text-[#aaa298]">Tahun {["pertama", "kedua", "ketiga"][i]} · {t.periode}</p>
                <h3 className="mt-2 font-display text-2xl">{t.judul}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#cfc8be]">{t.isi}</p>
              </li>
            ))}
          </ol>
          <Link to="/calon-ketua" className="mt-12 inline-block text-[15px] font-semibold text-[#f5c331] underline-offset-4 hover:underline">
            Baca gagasan lengkap arah organisasi
          </Link>
        </div>
      </section>

      {/* Tata kelola */}
      <Bagian label="Tata kelola">
        <Judul>Dipimpin oleh alumni, untuk alumni.</Judul>
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-5 text-[16px] leading-[1.8] text-ika-ink/85">
            <p>
              Musyawarah Besar adalah forum tertinggi organisasi. Ia memilih Ketua Umum dan mengesahkan AD/ART untuk masa bakti
              tiga tahun. Pengurus Inti menjalankan organisasi sehari-hari bersama tiga bidang, didampingi Dewan Pembina yang
              memberi arahan strategis.
            </p>
            <p>
              Di setiap angkatan ada PIC Angkatan, jembatan antara pengurus dan teman-teman seangkatannya.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
              <Link to="/organisasi" className="font-semibold text-ika-merah underline-offset-4 hover:underline">Susunan pengurus</Link>
              <Link to="/ad-art" className="font-semibold text-ika-merah underline-offset-4 hover:underline">AD/ART & GBHO</Link>
            </div>
          </div>
          <ul className="divide-y divide-ika-line border-y border-ika-line">
            <li className="flex items-baseline justify-between gap-4 py-4">
              <span className="text-sm text-ika-muted">{ketua.jabatan}</span>
              <span className="text-right font-medium text-ika-ink">{ketua.nama}</span>
            </li>
            {bidang.map((b) => (
              <li key={b.kode} className="flex items-baseline justify-between gap-4 py-4">
                <span className="text-sm text-ika-muted">Bidang {b.nama}</span>
                <span className="shrink-0 text-right font-medium text-ika-ink">{b.koordinator}</span>
              </li>
            ))}
          </ul>
        </div>
      </Bagian>

      {/* Ajakan */}
      <section className="border-t border-ika-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1.2fr_1fr] md:items-end md:py-28">
          <div>
            <Judul>Jadilah bagian dari cerita berikutnya.</Judul>
            <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ika-muted">
              Daftarkan diri sebagai alumni supaya teman seangkatan bisa menemukanmu, dan kabar kegiatan sampai kepadamu.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <Link to="/register" className="inline-flex items-center justify-center rounded-full bg-ika-merah px-6 py-3 text-[15px] font-semibold text-[#fff] transition hover:brightness-110">
              Daftar sebagai alumni
            </Link>
            <Link to="/events" className="inline-flex items-center justify-center rounded-full border-2 border-ika-ink/20 px-6 py-3 text-[15px] font-semibold text-ika-ink transition-colors hover:border-ika-ink">
              Lihat agenda
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
