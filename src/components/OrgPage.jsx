const struktur = {
  ketua: {
    jabatan: "Ketua Angkatan",
    nama: "Muhammad Naufal Fadhilah",
    initials: "MN",
  },
  wakil: {
    jabatan: "Wakil Ketua",
    nama: "Den Reza Alfian Farid",
    initials: "DR",
  },
  sekretaris: [
    { jabatan: "Sekretaris", nama: "Alanis Rani Rayhana", initials: "AR" },
  ],
  bendahara: [
    { jabatan: "Bendahara", nama: "Ghifary Azmiy Waliy", initials: "GA" },
  ],
  divisi: [
    {
      nama: "Acara & Networking",
      warna: "amber",
      anggota: [
        { jabatan: "Koordinator", nama: "Wanda Putri Rachmalita", initials: "WP" },
        { jabatan: "Anggota", nama: "Mochamad Marcellodiansyah", initials: "MM" },
        { jabatan: "Anggota", nama: "Reva Girvan Respati", initials: "RG" },
        { jabatan: "Anggota", nama: "Zaky Naufal Arsyad", initials: "ZN" },
      ],
    },
    {
      nama: "Humas & Media",
      warna: "orange",
      anggota: [
        { jabatan: "Koordinator", nama: "Novie Herdyanti Putri", initials: "NH" },
        { jabatan: "Anggota", nama: "Arina Khairani Attamimy", initials: "AK" },
        { jabatan: "Anggota", nama: "Renanda Dwina Putri", initials: "RD" },
        { jabatan: "Anggota", nama: "Febbi Anggraeni", initials: "FA" },
      ],
    },
    {
      nama: "Kreatif & Dokumentasi",
      warna: "yellow",
      anggota: [
        { jabatan: "Koordinator", nama: "Muhammad Rafi Shalahudin", initials: "MR" },
        { jabatan: "Anggota", nama: "Dinda Dania Nadine Asy Syifa", initials: "DD" },
        { jabatan: "Anggota", nama: "Yossi Yonida", initials: "YY" },
        { jabatan: "Anggota", nama: "Daafiq Dahdal Rabbani", initials: "DD" },
      ],
    },
    {
      nama: "Pengembangan SDM",
      warna: "stone",
      anggota: [
        { jabatan: "Koordinator", nama: "Fathia Islamiyatul Syahida", initials: "FI" },
        { jabatan: "Anggota", nama: "Nadiyatulkhair", initials: "NA" },
        { jabatan: "Anggota", nama: "Regine Deanaendra Hasnoro", initials: "RD" },
        { jabatan: "Anggota", nama: "Savana Maulahela", initials: "SM" },
      ],
    },
    {
      nama: "Sosial & Wirausaha",
      warna: "red",
      anggota: [
        { jabatan: "Koordinator", nama: "Rizqi Abdul Azis", initials: "RA" },
        { jabatan: "Anggota", nama: "Anggreini Tampubolon", initials: "AT" },
        { jabatan: "Anggota", nama: "Indira Kirani Putri", initials: "IK" },
        { jabatan: "Anggota", nama: "Cecep Abdurrohman Malik I.", initials: "CA" },
      ],
    },
  ],
};

const colorMap = {
  amber: { bg: "bg-amber-500/15", text: "text-amber-400", border: "border-amber-500/30", avatar: "bg-amber-600" },
  orange: { bg: "bg-orange-500/15", text: "text-orange-400", border: "border-orange-500/30", avatar: "bg-orange-600" },
  yellow: { bg: "bg-yellow-500/15", text: "text-yellow-400", border: "border-yellow-500/30", avatar: "bg-yellow-600" },
  stone: { bg: "bg-stone-500/20", text: "text-stone-300", border: "border-stone-500/30", avatar: "bg-stone-500" },
  red: { bg: "bg-red-500/15", text: "text-red-400", border: "border-red-500/30", avatar: "bg-red-700" },
};

function Avatar({ initials, cls = "bg-amber-600", size = "md" }) {
  const sz = size === "lg" ? "h-16 w-16 text-lg" : size === "sm" ? "h-9 w-9 text-xs" : "h-12 w-12 text-sm";
  return (
    <div className={`flex shrink-0 items-center justify-center rounded-full font-bold text-white ${sz} ${cls}`}>
      {initials}
    </div>
  );
}

function MemberCard({ jabatan, nama, initials, avatarCls = "bg-stone-600", compact = false }) {
  if (compact) {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/8">
        <Avatar initials={initials} cls={avatarCls} size="sm" />
        <div>
          <p className="text-xs font-medium text-stone-400">{jabatan}</p>
          <p className="text-sm font-semibold text-white">{nama}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <Avatar initials={initials} cls={avatarCls} />
      <div>
        <p className="text-xs font-medium text-stone-400">{jabatan}</p>
        <p className="font-semibold text-white">{nama}</p>
      </div>
    </div>
  );
}

export default function OrgPage() {
  return (
    <div className="min-h-screen bg-stone-950">
      {/* Header */}
      <div className="relative overflow-hidden px-6 pb-20 pt-36 text-center">
        <div
          className="pointer-events-none absolute inset-0 scale-105 bg-cover bg-center"
          style={{
            backgroundImage: "url('/directory-bg.jpg')",
            filter: "brightness(0.2) saturate(0.4)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/10 to-stone-950" />
        <div className="relative">
          <span className="mb-4 inline-block rounded-full bg-amber-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 ring-1 ring-amber-500/30">
            Ilmu Komunikasi UPI · Angkatan 2018
          </span>
          <h1 className="mb-3 text-3xl font-extrabold text-white md:text-5xl">
            Struktur Organisasi
          </h1>
          <p className="text-stone-400">
            Kepengurusan angkatan Ilmu Komunikasi UPI 2018
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 pb-20">

        {/* Ketua & Wakil */}
        <div className="mb-12 flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-16">
          {/* Ketua */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-1.5 rounded-full bg-amber-500/30 blur-md" />
              <Avatar initials={struktur.ketua.initials} cls="bg-amber-600" size="lg" />
            </div>
            <div className="text-center">
              <span className="mb-1 inline-block rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-400 ring-1 ring-amber-500/30">
                {struktur.ketua.jabatan}
              </span>
              <p className="mt-1 font-bold text-white">{struktur.ketua.nama}</p>
            </div>
          </div>

          {/* Connector */}
          <div className="hidden h-px w-16 bg-white/15 sm:block" />

          {/* Wakil */}
          <div className="flex flex-col items-center gap-4">
            <Avatar initials={struktur.wakil.initials} cls="bg-stone-600" size="lg" />
            <div className="text-center">
              <span className="mb-1 inline-block rounded-full bg-white/8 px-3 py-1 text-xs font-semibold text-stone-400 ring-1 ring-white/10">
                {struktur.wakil.jabatan}
              </span>
              <p className="mt-1 font-bold text-white">{struktur.wakil.nama}</p>
            </div>
          </div>
        </div>

        {/* Sekretaris & Bendahara */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2">
          {/* Sekretaris */}
          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-stone-500">
              Sekretaris
            </h3>
            <div className="flex flex-col gap-3">
              {struktur.sekretaris.map((s) => (
                <MemberCard key={s.nama} {...s} avatarCls="bg-amber-700" compact />
              ))}
            </div>
          </div>

          {/* Bendahara */}
          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-stone-500">
              Bendahara
            </h3>
            <div className="flex flex-col gap-3">
              {struktur.bendahara.map((b) => (
                <MemberCard key={b.nama} {...b} avatarCls="bg-amber-700" compact />
              ))}
            </div>
          </div>
        </div>

        {/* Divisi */}
        <div>
          <h2 className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-stone-500">
            Divisi
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {struktur.divisi.map((div) => {
              const c = colorMap[div.warna];
              return (
                <div
                  key={div.nama}
                  className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10"
                >
                  <span className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold ring-1 ${c.bg} ${c.text} ${c.border}`}>
                    {div.nama}
                  </span>
                  <div className="flex flex-col gap-3">
                    {div.anggota.map((a) => (
                      <MemberCard key={a.nama} {...a} avatarCls={c.avatar} compact />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
