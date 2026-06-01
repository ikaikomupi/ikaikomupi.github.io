import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPosts } from "../lib/sheets";
import { Calendar, User, BookOpen, ChevronRight } from "lucide-react";

const KATEGORI = ["Semua", "Karir", "Tips Hidup", "Cerita Alumni", "Networking"];

function PostCard({ post }) {
  const gradients = {
    Karir: "from-amber-900/40 to-stone-900",
    "Tips Hidup": "from-orange-900/40 to-stone-900",
    "Cerita Alumni": "from-yellow-900/40 to-stone-900",
    Networking: "from-red-900/40 to-stone-900",
    Umum: "from-stone-800/60 to-stone-900",
  };
  const gradient = gradients[post.kategori] || gradients.Umum;

  return (
    <Link
      to={`/setelah-toga/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-stone-900 transition-all hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/5"
    >
      <div className={`relative h-44 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        {post.foto_url ? (
          <img src={post.foto_url} alt={post.judul} className="h-full w-full object-cover" />
        ) : (
          <BookOpen className="h-10 w-10 text-amber-500/30" />
        )}
        <span className="absolute left-4 top-4 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-400">
          {post.kategori}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 line-clamp-2 text-base font-semibold text-stone-100 group-hover:text-amber-400 transition-colors">
          {post.judul}
        </h3>
        <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-stone-400">
          {post.ringkasan}
        </p>
        <div className="flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            <span>{post.penulis}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>
              {post.tanggal
                ? new Date(post.tanggal).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : ""}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/8 bg-stone-900">
      <div className="h-44 animate-pulse bg-stone-800" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-3/4 animate-pulse rounded bg-stone-800" />
        <div className="h-3 animate-pulse rounded bg-stone-800" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-stone-800" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-stone-800" />
      </div>
    </div>
  );
}

export default function SetelahToga() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aktifKategori, setAktifKategori] = useState("Semua");

  useEffect(() => {
    fetchPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const filtered =
    aktifKategori === "Semua"
      ? posts
      : posts.filter((p) => p.kategori === aktifKategori);

  return (
    <div className="min-h-screen bg-stone-950 pt-16">
      {/* Hero */}
      <div className="border-b border-white/8 bg-gradient-to-b from-stone-900 to-stone-950 px-6 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <span className="mb-4 inline-block rounded-full bg-amber-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400">
            Blog IKA IKOM UPI
          </span>
          <h1 className="mb-4 text-4xl font-bold text-stone-100">Setelah Toga</h1>
          <p className="text-base leading-relaxed text-stone-400">
            Cerita, tips, dan pelajaran dari para alumni IKOM UPI tentang kehidupan nyata setelah wisuda.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Filter kategori */}
        <div className="mb-8 flex flex-wrap gap-2">
          {KATEGORI.map((k) => (
            <button
              key={k}
              onClick={() => setAktifKategori(k)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                aktifKategori === k
                  ? "bg-amber-500 text-stone-950"
                  : "bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-white"
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-stone-700" />
            <p className="text-stone-500">Belum ada artikel untuk kategori ini.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
