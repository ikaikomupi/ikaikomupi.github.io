// Foto latar penuh (hero/header). Pakai <img> + srcset, bukan background-image CSS, supaya:
// - HP mengunduh versi 800px, layar besar 1600px (WebP; JPG untuk browser lama);
// - foto di bawah layar baru diunduh saat mendekat (loading="lazy");
// - foto utama bisa diprioritaskan (fetchPriority="high").
// File dibuat dari public/<nama>.jpg ke public/img/ (lihat README bagian gambar).
export default function FotoLatar({ nama, prioritas = false, className = "", style }) {
  return (
    <picture>
      <source type="image/webp" srcSet={`/img/${nama}-800.webp 800w, /img/${nama}-1600.webp 1600w`} sizes="100vw" />
      <img
        src={`/img/${nama}-1600.jpg`}
        alt=""
        aria-hidden="true"
        decoding="async"
        loading={prioritas ? "eager" : "lazy"}
        fetchPriority={prioritas ? "high" : "auto"}
        className={`foto-hero pointer-events-none absolute inset-0 h-full w-full object-cover object-center ${className}`}
        style={style}
      />
    </picture>
  );
}
