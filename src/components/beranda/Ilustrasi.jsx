// Ilustrasi SVG untuk beranda. Warna diambil dari token tema (merah/oranye/kuning logo IKOM),
// jadi otomatis menyesuaikan mode terang/gelap.
const M = "var(--color-ika-merah)";
const O = "var(--color-ika-oranye)";
const K = "var(--color-ika-kuning)";
const T = "var(--color-ika-ink)";
const S = "var(--color-ika-surface)";
const B = "var(--color-ika-bg)";

// Cincin logo IKOM (balon bicara) sebagai motif dekoratif.
export function Cincin({ className = "", tebal = 22 }) {
  const r = 100 - tebal / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g fill="none" strokeWidth={tebal} transform="rotate(-90 100 100)">
        <circle cx="100" cy="100" r={r} stroke={M} strokeDasharray={`${c * 0.45} ${c}`} />
        <circle cx="100" cy="100" r={r} stroke={O} strokeDasharray={`${c * 0.08} ${c}`} strokeDashoffset={-c * 0.45} />
        <circle cx="100" cy="100" r={r} stroke={K} strokeDasharray={`${c * 0.47} ${c}`} strokeDashoffset={-c * 0.53} />
      </g>
    </svg>
  );
}

export function IlusDirektori({ className = "" }) {
  // Peta titik: alumni tersebar di berbagai kota, saling terhubung.
  const kota = [
    [40, 70, M], [88, 52, K], [132, 86, O], [178, 60, M], [214, 98, K], [70, 118, K], [160, 128, M],
  ];
  const garis = [[0, 1], [1, 3], [1, 2], [2, 4], [0, 5], [5, 6], [2, 6], [3, 4]];
  return (
    <svg viewBox="0 0 250 170" className={className} aria-hidden="true">
      <g fill={T} opacity="0.12">
        {Array.from({ length: 11 }, (_, y) =>
          Array.from({ length: 24 }, (_, x) => ((x * 7 + y * 13) % 5 > 1 ? <circle key={`${x}-${y}`} cx={8 + x * 10} cy={20 + y * 12} r="1.6" /> : null))
        )}
      </g>
      <g stroke={T} strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="3 4">
        {garis.map(([a, b], i) => (
          <line key={i} x1={kota[a][0]} y1={kota[a][1]} x2={kota[b][0]} y2={kota[b][1]} />
        ))}
      </g>
      {kota.map(([x, y, w], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d="M0 -22c-7 0-12 5-12 12 0 9 12 20 12 20s12-11 12-20c0-7-5-12-12-12z" fill={w} />
          <circle cy="-10" r="4.5" fill={B} />
        </g>
      ))}
    </svg>
  );
}

export function IlusEvent({ className = "" }) {
  return (
    <svg viewBox="0 0 200 160" className={className} aria-hidden="true">
      <rect x="40" y="30" width="120" height="110" rx="12" fill={B} stroke={T} strokeOpacity="0.2" strokeWidth="2" />
      <rect x="40" y="30" width="120" height="30" rx="12" fill={M} />
      <rect x="40" y="48" width="120" height="12" fill={M} />
      <rect x="64" y="20" width="8" height="22" rx="4" fill={T} />
      <rect x="128" y="20" width="8" height="22" rx="4" fill={T} />
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={54 + (i % 4) * 25} y={72 + Math.floor(i / 4) * 21} width="17" height="13" rx="3" fill={i === 6 ? K : T} opacity={i === 6 ? 1 : 0.12} />
      ))}
      <circle cx="117" cy="98" r="15" fill="none" stroke={O} strokeWidth="3" />
      <g fill={K}>
        <path d="M170 34l4 9 9 4-9 4-4 9-4-9-9-4 9-4z" />
        <circle cx="24" cy="70" r="4" />
      </g>
      <path d="M20 40l6 3M178 120l8-2M28 118l-6 6" stroke={O} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function IlusKarir({ className = "" }) {
  return (
    <svg viewBox="0 0 200 160" className={className} aria-hidden="true">
      <rect x="30" y="112" width="26" height="30" rx="4" fill={K} />
      <rect x="64" y="92" width="26" height="50" rx="4" fill={O} />
      <rect x="98" y="66" width="26" height="76" rx="4" fill={M} />
      <path d="M30 96 L72 74 L104 50 L150 28" fill="none" stroke={T} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M138 24l14 2-4 14" fill="none" stroke={T} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <g transform="translate(128 86)">
        <rect x="0" y="12" width="56" height="42" rx="7" fill={T} />
        <path d="M18 12v-6a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v6" fill="none" stroke={T} strokeWidth="4" />
        <rect x="0" y="28" width="56" height="5" fill={K} />
        <rect x="23" y="25" width="10" height="11" rx="2" fill={B} />
      </g>
    </svg>
  );
}

export function IlusKompas({ className = "" }) {
  // KOMpas ASN: kompas penunjuk arah karir ASN.
  return (
    <svg viewBox="0 0 200 160" className={className} aria-hidden="true">
      <circle cx="100" cy="82" r="62" fill={B} stroke={T} strokeOpacity="0.2" strokeWidth="2" />
      <circle cx="100" cy="82" r="50" fill="none" stroke={K} strokeWidth="6" strokeDasharray="2 9" />
      <path d="M100 38 L114 82 L100 126 L86 82 Z" fill={T} opacity="0.15" />
      <path d="M100 38 L114 82 L86 82 Z" fill={M} />
      <path d="M100 126 L114 82 L86 82 Z" fill={T} opacity="0.55" />
      <circle cx="100" cy="82" r="6" fill={B} stroke={T} strokeWidth="3" />
      <text x="100" y="31" textAnchor="middle" fontSize="13" fontWeight="700" fill={M} fontFamily="var(--font-body)">U</text>
    </svg>
  );
}

export function IlusToga({ className = "" }) {
  return (
    <svg viewBox="0 0 200 160" className={className} aria-hidden="true">
      <g transform="rotate(-14 100 70)">
        <path d="M100 30 L170 58 L100 86 L30 58 Z" fill={T} />
        <path d="M62 72v22c0 10 17 18 38 18s38-8 38-18V72l-38 15z" fill={T} opacity="0.85" />
        <path d="M100 58 L148 70 V102" fill="none" stroke={K} strokeWidth="3" />
        <path d="M143 100h10l-2 18h-6z" fill={K} />
      </g>
      <g fill={O}>
        <path d="M34 120l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
      </g>
      <g fill={M}>
        <path d="M168 112l2.5 5.5 5.5 2.5-5.5 2.5-2.5 5.5-2.5-5.5-5.5-2.5 5.5-2.5z" />
        <circle cx="40" cy="30" r="4" />
      </g>
      <path d="M176 30q-10 10 0 20t0 20" fill="none" stroke={K} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function IlusToa({ className = "" }) {
  // Toa: menyebarkan info lowongan ke jejaring alumni.
  return (
    <svg viewBox="0 0 220 180" className={className} aria-hidden="true">
      <g transform="rotate(-12 110 90)">
        <path d="M40 74h28l70-36v104L68 106H40a8 8 0 0 1-8-8V82a8 8 0 0 1 8-8z" fill="#fff" />
        <rect x="132" y="34" width="16" height="112" rx="8" fill="#fff" />
        <path d="M56 106l10 34a8 8 0 0 0 8 6h8a6 6 0 0 0 6-8l-10-32z" fill="#fff" opacity="0.85" />
      </g>
      <g fill="none" stroke={K} strokeWidth="6" strokeLinecap="round">
        <path d="M168 56q16 22 0 48" />
        <path d="M186 40q30 38 0 80" opacity="0.7" />
      </g>
    </svg>
  );
}

export function IlusSosial({ className = "" }) {
  // Kontribusi sosial: dua tangan menopang hati.
  return (
    <svg viewBox="0 0 200 160" className={className} aria-hidden="true">
      <path d="M100 112c-30-20-46-36-46-54a22 22 0 0 1 46-8 22 22 0 0 1 46 8c0 18-16 34-46 54z" fill={M} />
      <path d="M88 52a10 10 0 0 1 10-8" fill="none" stroke={B} strokeWidth="4" strokeLinecap="round" opacity="0.7" />
      <path d="M26 118c14-2 30 4 44 14l26 4c6 1 6 9 0 10H62" fill="none" stroke={T} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M174 118c-14-2-30 4-44 14l-26 4" fill="none" stroke={T} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="10" y="112" width="18" height="34" rx="4" fill={K} />
      <rect x="172" y="112" width="18" height="34" rx="4" fill={O} />
      <g fill={K}>
        <path d="M160 26l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
        <circle cx="38" cy="36" r="4" />
      </g>
    </svg>
  );
}

export function IlusDokumen({ className = "" }) {
  // Tumpukan dokumen dengan cap "SAH" dan pena: AD/ART yang sudah disahkan.
  return (
    <svg viewBox="0 0 220 180" className={className} aria-hidden="true">
      <rect x="62" y="22" width="104" height="134" rx="8" fill={T} opacity="0.12" transform="rotate(8 114 89)" />
      <rect x="54" y="18" width="104" height="134" rx="8" fill={B} stroke={T} strokeOpacity="0.25" strokeWidth="2" />
      <rect x="54" y="18" width="104" height="24" rx="8" fill={M} />
      <rect x="54" y="32" width="104" height="10" fill={M} />
      {[56, 68, 80, 92, 104].map((y, i) => (
        <rect key={y} x="68" y={y} width={i % 2 ? 60 : 76} height="5" rx="2.5" fill={T} opacity="0.2" />
      ))}
      <g transform="rotate(-14 134 124)">
        <circle cx="134" cy="124" r="22" fill="none" stroke={O} strokeWidth="4" />
        <circle cx="134" cy="124" r="15" fill="none" stroke={O} strokeWidth="1.5" strokeDasharray="2 3" />
        <text x="134" y="129" textAnchor="middle" fontSize="13" fontWeight="800" fill={O} fontFamily="var(--font-body)">SAH</text>
      </g>
      <g transform="rotate(38 178 70)">
        <rect x="172" y="30" width="12" height="70" rx="3" fill={K} />
        <path d="M172 100l6 14 6-14z" fill={T} />
        <rect x="172" y="30" width="12" height="10" rx="3" fill={T} />
      </g>
      <g fill={K}>
        <path d="M30 40l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
        <circle cx="36" cy="140" r="4" />
      </g>
    </svg>
  );
}

export function IlusAturan({ className = "" }) {
  // Papan klip berisi daftar centang: Anggaran Rumah Tangga.
  return (
    <svg viewBox="0 0 200 160" className={className} aria-hidden="true">
      <rect x="52" y="22" width="96" height="126" rx="10" fill={O} />
      <rect x="62" y="34" width="76" height="106" rx="5" fill={B} />
      <rect x="80" y="14" width="40" height="18" rx="6" fill={T} />
      {[52, 76, 100].map((y, i) => (
        <g key={y}>
          <rect x="72" y={y} width="14" height="14" rx="3" fill={i < 2 ? K : "none"} stroke={T} strokeOpacity="0.4" strokeWidth="2" />
          {i < 2 && <path d={`M75 ${y + 7}l3 3 6-6`} fill="none" stroke={T} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}
          <rect x="92" y={y + 4} width={i === 1 ? 30 : 38} height="5" rx="2.5" fill={T} opacity="0.25" />
        </g>
      ))}
      <path d="M160 40l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill={M} />
      <circle cx="34" cy="120" r="5" fill={K} />
    </svg>
  );
}

export function IlusArah({ className = "" }) {
  // Jalan berliku menuju bendera: Garis Besar Haluan Organisasi.
  return (
    <svg viewBox="0 0 200 160" className={className} aria-hidden="true">
      <path d="M24 146c40-6 70-22 54-46s30-36 70-54" fill="none" stroke={T} strokeOpacity="0.18" strokeWidth="18" strokeLinecap="round" />
      <path d="M24 146c40-6 70-22 54-46s30-36 70-54" fill="none" stroke={K} strokeWidth="3" strokeDasharray="6 7" strokeLinecap="round" />
      <circle cx="24" cy="146" r="7" fill={M} />
      <circle cx="78" cy="100" r="7" fill={O} />
      <rect x="146" y="14" width="4" height="40" rx="2" fill={T} />
      <path d="M150 16h30l-8 9 8 9h-30z" fill={M} />
      <g fill={O}>
        <path d="M168 104l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
      </g>
      <circle cx="36" cy="40" r="5" fill={K} />
    </svg>
  );
}

export function IlusAlur({ className = "" }) {
  // Kotak-kotak tersambung panah: SOP bidang.
  return (
    <svg viewBox="0 0 200 160" className={className} aria-hidden="true">
      <rect x="18" y="24" width="56" height="40" rx="10" fill={M} />
      <rect x="126" y="24" width="56" height="40" rx="10" fill={O} />
      <rect x="72" y="100" width="56" height="40" rx="10" fill={K} />
      <path d="M76 44h44" stroke={T} strokeWidth="3" strokeLinecap="round" />
      <path d="M112 38l8 6-8 6" fill="none" stroke={T} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M154 66c0 24-12 40-24 52" fill="none" stroke={T} strokeWidth="3" strokeLinecap="round" />
      <path d="M128 108l2 10 9-4" fill="none" stroke={T} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {[[32, 38], [140, 38], [86, 114]].map(([x, y]) => (
        <g key={x}>
          <rect x={x} y={y} width="28" height="4" rx="2" fill={B} opacity="0.85" />
          <rect x={x} y={y + 8} width="18" height="4" rx="2" fill={B} opacity="0.6" />
        </g>
      ))}
      <path d="M30 120l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill={O} />
    </svg>
  );
}

export function IlusStruktur({ className = "" }) {
  // Bagan organisasi: satu simpul atas, tiga simpul bawah.
  const orang = (x, y, w) => (
    <g transform={`translate(${x} ${y})`}>
      <circle r="17" fill={w} />
      <circle cy="-4" r="6" fill={B} />
      <path d="M-10 10a10 9 0 0 1 20 0z" fill={B} />
    </g>
  );
  return (
    <svg viewBox="0 0 200 160" className={className} aria-hidden="true">
      <path d="M100 52v22M40 74h120M40 74v18M100 74v18M160 74v18" fill="none" stroke={T} strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" />
      {orang(100, 32, T)}
      {orang(40, 112, M)}
      {orang(100, 112, O)}
      {orang(160, 112, K)}
      <g fill={K}>
        <path d="M168 20l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
      </g>
    </svg>
  );
}
