import { Link } from "react-router-dom";
import Footer from "./Footer";
import { PERIODE, pembina, inti, bidang } from "../data/pengurus";

// Susunan pengurus, gaya laman "our people" organisasi internasional: nama dalam serif, jabatan kecil,
// dipisah garis tipis, tanpa kartu atau avatar inisial. Warna memakai token ika-* (ikut tema).

const warnaBidang = { A: "bg-ika-merah", B: "bg-ika-oranye", C: "bg-ika-kuning" };

function Bagian({ label, children }) {
  return (
    <section className="mx-auto grid max-w-6xl gap-6 border-t border-ika-line px-4 py-14 sm:px-6 md:grid-cols-[12rem_1fr] md:gap-12 md:py-20">
      <h2 className="text-sm font-medium text-ika-muted">{label}</h2>
      <div>{children}</div>
    </section>
  );
}

function Orang({ jabatan, nama }) {
  return (
    <div className="border-t border-ika-ink/80 pt-4">
      <p className="text-sm text-ika-muted">{jabatan}</p>
      <p className="mt-1 font-display text-xl leading-snug text-ika-ink">{nama}</p>
    </div>
  );
}

export default function OrgPage() {
  const [ketua, ...lainnya] = inti;
  return (
    <div className="bg-ika-bg font-body text-ika-ink antialiased">
      <header className="mx-auto max-w-6xl px-4 pb-14 pt-32 sm:px-6 md:pb-20 md:pt-40">
        <p className="text-sm font-medium text-ika-merah">Periode {PERIODE}</p>
        <h1 className="mt-5 font-display text-[2.6rem] font-normal leading-[1.05] tracking-[-0.02em] text-ika-ink sm:text-6xl md:text-7xl">
          Susunan pengurus
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ika-muted">
          Alumni dari berbagai angkatan yang menjalankan IKA IKOM UPI selama tiga tahun ke depan, sesuai Surat
          Keputusan kepengurusan periode {PERIODE}.
        </p>
      </header>

      {/* Ketua Umum */}
      <section className="bg-ika-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-[18rem_1fr] md:gap-16 md:py-20">
          <img
            src="/img/cecep-800.webp"
            srcSet="/img/cecep-400.webp 400w, /img/cecep-800.webp 800w"
            sizes="(max-width: 768px) 70vw, 288px"
            width="288"
            height="360"
            alt="Cecep Abdurrohman Malik Ibrohim"
            fetchPriority="high"
            className="aspect-[4/5] w-full max-w-[18rem] object-cover object-top"
          />
          <div>
            <p className="text-sm text-ika-muted">{ketua.jabatan}</p>
            <p className="mt-2 font-display text-4xl leading-[1.1] text-ika-ink sm:text-5xl">{ketua.nama}</p>
            <blockquote className="mt-8 max-w-xl border-l-2 border-ika-merah pl-5 text-lg leading-relaxed text-ika-ink/85">
              “Mari kita bangun IKA IKOM UPI bersama, bukan untuk satu angkatan, tapi untuk semua alumni.”
            </blockquote>
            <Link to="/calon-ketua" className="mt-8 inline-block text-[15px] font-semibold text-ika-merah underline-offset-4 hover:underline">
              Baca arah organisasi {PERIODE}
            </Link>
          </div>
        </div>
      </section>

      <Bagian label="Pengurus inti">
        <div className="grid gap-8 sm:grid-cols-3">
          {lainnya.map((o) => (
            <Orang key={o.nama} {...o} />
          ))}
        </div>
      </Bagian>

      <Bagian label="Bidang">
        <p className="max-w-2xl text-[17px] leading-relaxed text-ika-muted">
          Tiga bidang menjalankan program kerja sehari-hari. Setiap bidang dipimpin seorang koordinator.
        </p>
        <div className="mt-10 divide-y divide-ika-line border-y border-ika-line">
          {bidang.map((b) => (
            <article key={b.kode} className="grid gap-8 py-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
              <div>
                <span className={`block h-1 w-10 ${warnaBidang[b.kode]}`} aria-hidden="true" />
                <p className="mt-5 text-sm text-ika-muted">Bidang {b.kode}</p>
                <h3 className="mt-1 font-display text-2xl leading-snug text-ika-ink sm:text-3xl">{b.nama}</h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ika-muted">{b.tugas}</p>
              </div>
              <div>
                <p className="text-sm text-ika-muted">Koordinator</p>
                <p className="mt-1 font-display text-xl text-ika-ink">{b.koordinator}</p>
                <p className="mt-6 text-sm text-ika-muted">Anggota</p>
                <ul className="mt-2 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                  {b.anggota.map((n) => (
                    <li key={n} className="text-[15px] leading-snug text-ika-ink">{n}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Bagian>

      <Bagian label="Dewan Pembina">
        <p className="max-w-2xl text-[17px] leading-relaxed text-ika-muted">
          Alumni senior yang memberi arahan strategis, tanpa menjalankan kerja operasional harian.
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Orang jabatan="Ketua" nama={pembina.ketua} />
          {pembina.anggota.map((n) => (
            <Orang key={n} jabatan="Anggota" nama={n} />
          ))}
        </div>
      </Bagian>

      <Bagian label="PIC Angkatan">
        <p className="max-w-2xl text-[17px] leading-relaxed text-ika-ink/85">
          Setiap angkatan memiliki satu PIC yang menjadi jembatan ke pengurus dan menjaga data angkatannya. PIC ditunjuk dan dibina
          oleh Bidang Hubungan Alumni & Antar-Angkatan, sesuai Anggaran Rumah Tangga Pasal 8.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          <Link to="/tentang" className="font-semibold text-ika-merah underline-offset-4 hover:underline">Tentang IKA IKOM UPI</Link>
          <Link to="/ad-art" className="font-semibold text-ika-merah underline-offset-4 hover:underline">AD/ART & SOP bidang</Link>
        </div>
      </Bagian>

      <div className="pb-8" />
      <Footer />
    </div>
  );
}
