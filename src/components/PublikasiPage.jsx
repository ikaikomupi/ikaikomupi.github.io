import { Link } from "react-router-dom";
import Footer from "./Footer";
import { Cincin } from "./beranda/Ilustrasi";
import { publikasi } from "../data/publikasi";

// Laman Publikasi: kajian, rekomendasi, dan laporan resmi IKA IKOM UPI.
// Dokumen dibuka untuk dibaca di browser (tanpa tombol unduh). Warna memakai token ika-*.

const urlPdf = (p) => `/dokumen/${p.slug}.pdf`;
const urlSampul = (p) => `/dokumen/${p.slug}.webp`;

function LabelStatus({ status }) {
  return status === "draf" ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-ika-kuning/20 px-3 py-1 text-xs font-semibold text-ika-ink ring-1 ring-ika-kuning/60">
      <span className="h-1.5 w-1.5 rounded-full bg-ika-kuning" />
      Draf, menunggu pengesahan pengurus
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-ika-surface px-3 py-1 text-xs font-semibold text-ika-ink ring-1 ring-ika-line">
      Disahkan pengurus
    </span>
  );
}

function Utama({ p }) {
  return (
    <article className="grid items-center gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
      <a href={urlPdf(p)} target="_blank" rel="noopener" className="group relative mx-auto block w-full max-w-[22rem]" aria-label={`Baca ${p.judul}`}>
        <Cincin className="absolute -right-10 -top-10 h-32 w-32 opacity-80" tebal={22} />
        <img
          src={urlSampul(p)}
          alt={`Sampul: ${p.judul}`}
          width="360"
          height="509"
          className="relative w-full rounded-md shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] ring-1 ring-ika-line transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none"
        />
      </a>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-ika-merah px-3 py-1 text-xs font-semibold text-[#fff]">{p.jenis}</span>
          <LabelStatus status={p.status} />
        </div>
        <h2 className="mt-5 font-display text-3xl font-medium leading-[1.15] text-ika-ink sm:text-[2.5rem]">{p.judul}</h2>
        <p className="mt-2 text-[15px] text-ika-muted">
          Untuk {p.untuk} · {p.tanggal} · {p.halaman} halaman
        </p>
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ika-ink/85">{p.ringkasan}</p>

        <dl className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
          {p.sorotan.map((s, i) => (
            <div
              key={s.ket}
              className={`rounded-2xl px-4 py-3 ${["bg-ika-merah text-[#fff] rounded-bl-md", "bg-ika-oranye text-[#fff] rounded-br-md", "bg-ika-kuning text-[#1f1d1a] rounded-bl-md"][i % 3]}`}
            >
              <dd className="font-display text-2xl font-semibold leading-none tabular-nums sm:text-3xl">{s.angka}</dd>
              <dt className="mt-1.5 text-xs leading-snug opacity-90">{s.ket}</dt>
            </div>
          ))}
        </dl>

        <blockquote className="mt-8 max-w-2xl border-l-2 border-ika-merah pl-5 font-display text-xl leading-snug text-ika-ink">
          “{p.kutipan}”
        </blockquote>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={urlPdf(p)}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center rounded-full bg-ika-merah px-6 py-3 text-[15px] font-semibold text-[#fff] transition hover:brightness-110"
          >
            Baca dokumen
          </a>
          <p className="text-sm text-ika-muted">Disusun oleh Bidang {p.bidang}</p>
        </div>
      </div>
    </article>
  );
}

function Kartu({ p }) {
  return (
    <a href={urlPdf(p)} target="_blank" rel="noopener" className="group block">
      <img src={urlSampul(p)} alt="" loading="lazy" className="aspect-[1/1.414] w-full rounded-md object-cover ring-1 ring-ika-line transition-transform group-hover:-translate-y-1" />
      <p className="mt-4 text-sm text-ika-muted">
        {p.jenis} · {p.tanggal}
      </p>
      <h3 className="mt-1 font-display text-xl leading-snug text-ika-ink group-hover:underline">{p.judul}</h3>
    </a>
  );
}

export default function PublikasiPage() {
  const [utama, ...lainnya] = publikasi;
  return (
    <div className="bg-ika-bg font-body text-ika-ink antialiased">
      <header className="mx-auto max-w-6xl px-4 pb-12 pt-32 sm:px-6 md:pb-16 md:pt-40">
        <h1 className="font-display text-[2.7rem] font-medium leading-[1.02] tracking-[-0.02em] text-ika-ink sm:text-6xl">Publikasi</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ika-muted">
          Kajian, rekomendasi, dan laporan resmi IKA IKOM UPI, untuk alumni, almamater, dan siapa pun yang ingin tahu apa yang kami
          kerjakan.
        </p>
      </header>

      <section className="bg-ika-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <Utama p={utama} />
        </div>
      </section>

      {lainnya.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <h2 className="font-display text-3xl text-ika-ink">Publikasi lainnya</h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {lainnya.map((p) => (
              <Kartu key={p.slug} p={p} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 md:grid-cols-[1fr_auto] md:py-20">
        <div>
          <h2 className="font-display text-2xl text-ika-ink sm:text-3xl">Laporan lain menyusul</h2>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ika-muted">
            Laporan kegiatan, laporan keuangan, dan laporan tahunan akan kami terbitkan di sini, sesuai prinsip keterbukaan kepada
            seluruh anggota.
          </p>
        </div>
        <Link
          to="/tentang"
          className="inline-flex items-center justify-center rounded-full border-2 border-ika-ink/20 px-6 py-3 text-[15px] font-semibold text-ika-ink transition-colors hover:border-ika-ink"
        >
          Tentang IKA IKOM UPI
        </Link>
      </section>

      <Footer />
    </div>
  );
}
