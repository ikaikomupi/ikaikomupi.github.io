import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPostBySlug } from "../lib/sheets";
import { ArrowLeft, Calendar, User, BookOpen } from "lucide-react";

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPostBySlug(slug).then((data) => {
      setPost(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 pt-16">
        <div className="mx-auto max-w-2xl px-6 py-12">
          <div className="mb-8 h-4 w-24 animate-pulse rounded bg-stone-800" />
          <div className="mb-6 h-64 animate-pulse rounded-2xl bg-stone-800" />
          <div className="space-y-3">
            <div className="h-8 w-3/4 animate-pulse rounded bg-stone-800" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-stone-800" />
            <div className="mt-6 h-4 animate-pulse rounded bg-stone-800" />
            <div className="h-4 animate-pulse rounded bg-stone-800" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-stone-800" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-stone-950 pt-16">
        <BookOpen className="mb-4 h-12 w-12 text-stone-700" />
        <p className="mb-6 text-stone-400">Artikel tidak ditemukan.</p>
        <Link
          to="/setelah-toga"
          className="flex items-center gap-2 rounded-lg bg-amber-500/15 px-4 py-2 text-sm font-medium text-amber-400 hover:bg-amber-500/25 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Setelah Toga
        </Link>
      </div>
    );
  }

  const paragraphs = post.konten
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-stone-950 pt-16">
      <div className="mx-auto max-w-2xl px-6 py-12">
        {/* Back */}
        <Link
          to="/setelah-toga"
          className="mb-8 inline-flex items-center gap-2 text-sm text-stone-500 transition-colors hover:text-amber-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Setelah Toga
        </Link>

        {/* Cover */}
        {post.foto_url && (
          <div className="mb-8 overflow-hidden rounded-2xl">
            <img src={post.foto_url} alt={post.judul} className="w-full object-cover" />
          </div>
        )}

        {/* Meta */}
        <div className="mb-3">
          <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-400">
            {post.kategori}
          </span>
        </div>

        <h1 className="mb-4 text-3xl font-bold leading-snug text-stone-100">{post.judul}</h1>

        <div className="mb-8 flex flex-wrap items-center gap-4 border-b border-white/8 pb-6 text-sm text-stone-500">
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span>{post.penulis}</span>
          </div>
          {post.tanggal && (
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(post.tanggal).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-5">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-base leading-relaxed text-stone-300">
              {para}
            </p>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 rounded-2xl border border-white/8 bg-stone-900 p-6 text-center">
          <p className="mb-4 text-sm text-stone-400">Baca artikel lainnya</p>
          <Link
            to="/setelah-toga"
            className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-stone-950 transition-opacity hover:opacity-90"
          >
            Kembali ke Setelah Toga
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
