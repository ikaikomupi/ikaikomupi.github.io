import { Link } from "react-router-dom";
import Footer from "./Footer";
import { Cincin, IlusEvent, IlusKarir, IlusDirektori } from "./beranda/Ilustrasi";
import { PERIODE, pembina, inti, bidang } from "../data/pengurus";

// Susunan pengurus memakai bahasa visual beranda: foto & nama dalam balon chat, blok warna logo IKOM
// (merah, oranye, kuning), dan ilustrasi untuk tiap bidang. Warna memakai token ika-* (ikut tema).

const gayaBidang = {
  A: { blok: "bg-ika-merah text-[#fff]", Ilus: IlusEvent, huruf: "text-ika-merah" },
  B: { blok: "bg-ika-oranye text-[#fff]", Ilus: IlusKarir, huruf: "text-ika-oranye" },
  C: { blok: "bg-ika-kuning text-[#1f1d1a]", Ilus: IlusDirektori, huruf: "text-ika-kuning" },
};

const gayaInti = [
  { warna: "bg-ika-oranye text-[#fff]", ekor: "rounded-bl-md" },
  { warna: "bg-ika-kuning text-[#1f1d1a]", ekor: "rounded-br-md" },
  { warna: "bg-ika-ink text-ika-bg", ekor: "rounded-bl-md" },
];

const jumlahAnggotaBidang = bidang.reduce((n, b) => n + 1 + b.anggota.length, 0);

export default function OrgPage() {
  const [ketua, ...lainnya] = inti;
  return (
    <div className="bg-ika-bg font-body text-ika-ink antialiased">
      {/* Pembuka */}
      <header className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 md:pt-36 lg:grid-cols-[1.1fr_1fr] lg:pb-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-ika-surface px-3.5 py-1.5 text-sm text-ika-muted">
              <span className="h-2 w-2 rounded-full bg-ika-merah" />
              Kepengurusan periode {PERIODE}
            </p>
            <h1 className="mt-6 font-display text-[2.7rem] font-medium leading-[1.02] tracking-[-0.02em] text-ika-ink sm:text-6xl">
              Orang-orang di balik IKA IKOM UPI.
            </h1>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-ika-muted">
              Alumni dari berbagai angkatan yang meluangkan waktu untuk menjaga jejaring kita tetap hidup, sesuai Surat Keputusan
              kepengurusan periode {PERIODE}.
            </p>
            <dl className="mt-10 flex flex-wrap gap-3">
              {[
                [inti.length, "pengurus inti", "bg-ika-merah text-[#fff] rounded-bl-md"],
                [bidang.length, "bidang", "bg-ika-oranye text-[#fff] rounded-br-md"],
                [jumlahAnggotaBidang, "pengurus bidang", "bg-ika-kuning text-[#1f1d1a] rounded-bl-md"],
                [1 + pembina.anggota.length, "dewan pembina", "bg-ika-surface text-ika-ink rounded-br-md"],
              ].map(([n, l, c]) => (
                <div key={l} className={`rounded-2xl px-4 py-2.5 ${c}`}>
                  <dd className="font-display text-2xl font-semibold leading-none tabular-nums">{n}</dd>
                  <dt className="mt-1 text-xs opacity-90">{l}</dt>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
            <Cincin className="absolute inset-0 h-full w-full animate-[spin_60s_linear_infinite] motion-reduce:animate-none" tebal={10} />
            <div className="absolute inset-[9%] overflow-hidden rounded-full">
              <picture>
                <source type="image/webp" srcSet="/img/group-bg-800.webp 800w, /img/group-bg-1600.webp 1600w" sizes="(min-width: 1024px) 400px, 80vw" />
                <img src="/img/group-bg-1600.jpg" alt="Alumni Ilmu Komunikasi UPI berkumpul" fetchPriority="high" decoding="async" className="h-full w-full object-cover" />
              </picture>
            </div>
            <div className="gelembung absolute bottom-[6%] left-0 max-w-[60%] rounded-2xl rounded-bl-sm bg-ika-bg px-4 py-3 text-sm text-ika-ink shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] ring-1 ring-ika-line" style={{ animationDelay: "0.5s" }}>
              <b className="block text-ika-merah">Pengumuman</b>
              Pengurus {PERIODE} resmi ditetapkan. Selamat bertugas!
            </div>
          </div>
        </div>
      </header>

      {/* Ketua Umum */}
      <section className="relative overflow-hidden bg-[#b5272d] text-[#fff]">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-[#e0601f]/45" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[20rem_1fr] md:gap-16 md:py-24">
          <div className="mx-auto aspect-square w-full max-w-[20rem] overflow-hidden rounded-full ring-8 ring-[#fff]/15">
            <img
              src="/img/cecep-800.webp"
              srcSet="/img/cecep-400.webp 400w, /img/cecep-800.webp 800w"
              sizes="(max-width: 768px) 80vw, 320px"
              width="320"
              height="320"
              alt="Cecep Abdurrohman Malik Ibrohim"
              loading="lazy"
              className="h-full w-full object-cover object-top"
            />
          </div>
          <div>
            <p className="inline-block rounded-full bg-[#fff]/15 px-3.5 py-1 text-sm font-medium">{ketua.jabatan}</p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] sm:text-6xl">{ketua.nama}</h2>
            <blockquote className="mt-8 max-w-xl font-display text-xl leading-[1.45] text-[#fff]/90 sm:text-2xl">
              “Mari kita bangun IKA IKOM UPI bersama, bukan untuk satu angkatan, tapi untuk semua alumni.”
            </blockquote>
            <Link
              to="/calon-ketua"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[#fff] px-6 py-3 text-[15px] font-semibold text-[#b5272d] transition-colors hover:bg-[#fde9e9]"
            >
              Baca arah organisasi {PERIODE}
            </Link>
          </div>
        </div>
      </section>

      {/* Pengurus inti lainnya */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <h2 className="font-display text-3xl leading-[1.15] text-ika-ink sm:text-[2.6rem]">Bersama Ketua Umum</h2>
        <p className="mt-3 max-w-xl text-[16px] text-ika-muted">Pengurus inti yang menjalankan roda organisasi sehari-hari.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {lainnya.map((o, i) => (
            <div key={o.nama} className={`rounded-[2rem] p-7 ${gayaInti[i].warna} ${gayaInti[i].ekor}`}>
              <p className="text-sm opacity-80">{o.jabatan}</p>
              <p className="mt-8 font-display text-2xl font-medium leading-tight sm:text-[1.7rem]">{o.nama}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bidang */}
      <section className="bg-ika-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <h2 className="font-display text-3xl leading-[1.15] text-ika-ink sm:text-[2.6rem]">Tiga bidang, satu tujuan</h2>
          <p className="mt-3 max-w-xl text-[16px] text-ika-muted">Setiap bidang dipimpin seorang koordinator dan menjalankan program kerjanya sendiri.</p>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {bidang.map((b) => {
              const g = gayaBidang[b.kode];
              return (
                <article key={b.kode} className="flex flex-col overflow-hidden rounded-[2rem] bg-ika-bg">
                  <div className={`relative overflow-hidden px-7 pb-6 pt-7 ${g.blok}`}>
                    <span className="pointer-events-none absolute -bottom-10 right-3 font-display text-[8rem] font-semibold leading-none opacity-[0.18]" aria-hidden="true">
                      {b.kode}
                    </span>
                    <p className="text-sm opacity-85">Bidang {b.kode}</p>
                    <h3 className="relative mt-1 pr-14 font-display text-2xl font-medium leading-snug">{b.nama}</h3>
                  </div>
                  <div className="flex flex-1 flex-col px-7 pb-7 pt-6">
                    <g.Ilus className="mx-auto h-28 w-full max-w-[14rem]" />
                    <p className="mt-4 text-[14px] leading-relaxed text-ika-muted">{b.tugas}</p>
                    <div className="mt-6 rounded-2xl rounded-bl-sm bg-ika-surface px-4 py-3">
                      <p className={`text-xs font-semibold ${g.huruf}`}>Koordinator</p>
                      <p className="mt-0.5 font-display text-lg text-ika-ink">{b.koordinator}</p>
                    </div>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {b.anggota.map((n) => (
                        <li key={n} className="rounded-full border border-ika-line px-3 py-1 text-[13px] text-ika-ink">{n}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dewan Pembina */}
      <section className="relative overflow-hidden bg-[#1f1d1a] text-[#f4efe7]" data-theme="dark">
        <Cincin className="pointer-events-none absolute -left-24 -bottom-24 h-80 w-80 opacity-25" tebal={16} />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1fr_1.4fr] md:py-24">
          <div>
            <h2 className="font-display text-3xl leading-[1.15] sm:text-[2.6rem]">Dewan Pembina</h2>
            <p className="mt-3 max-w-sm text-[16px] leading-relaxed text-[#cfc8be]">
              Alumni senior yang memberi arahan strategis, tanpa menjalankan kerja operasional harian.
            </p>
          </div>
          <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {[{ j: "Ketua", n: pembina.ketua }, ...pembina.anggota.map((n) => ({ j: "Anggota", n }))].map((p) => (
              <li key={p.n} className="border-t border-[#4a433c] pt-4">
                <p className="text-sm text-[#aaa298]">{p.j}</p>
                <p className="mt-1 font-display text-xl">{p.n}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PIC Angkatan */}
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 md:grid-cols-[1fr_auto] md:py-20">
        <div>
          <h2 className="font-display text-2xl text-ika-ink sm:text-3xl">Satu PIC di setiap angkatan</h2>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ika-muted">
            PIC Angkatan menjadi jembatan ke pengurus dan menjaga data angkatannya. Mereka ditunjuk dan dibina oleh Bidang Hubungan
            Alumni & Antar-Angkatan, sesuai Anggaran Rumah Tangga Pasal 8.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/tentang" className="inline-flex items-center justify-center rounded-full bg-ika-merah px-6 py-3 text-[15px] font-semibold text-[#fff] transition hover:brightness-110">
            Tentang IKA IKOM UPI
          </Link>
          <Link to="/ad-art" className="inline-flex items-center justify-center rounded-full border-2 border-ika-ink/20 px-6 py-3 text-[15px] font-semibold text-ika-ink transition-colors hover:border-ika-ink">
            AD/ART & SOP
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
