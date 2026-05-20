import { useState, useEffect, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import AlumniCard from "./AlumniCard";
import { fetchAlumni } from "../lib/sheets";
import { INDUSTRIES, KOTA } from "../data/alumni";

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-6">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 animate-pulse rounded-full bg-stone-200" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 w-32 animate-pulse rounded bg-stone-200" />
          <div className="h-3 w-20 animate-pulse rounded bg-stone-100" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-3/4 animate-pulse rounded bg-stone-100" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-stone-100" />
      </div>
      <div className="h-6 w-24 animate-pulse rounded-full bg-stone-100" />
    </div>
  );
}

export default function Directory() {
  const [allAlumni, setAllAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filterKota, setFilterKota] = useState(null);
  const [filterIndustri, setFilterIndustri] = useState(null);
  const [sortBy, setSortBy] = useState("nama-az");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 24;

  useEffect(() => {
    fetchAlumni()
      .then(setAllAlumni)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let list = [...allAlumni];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.nama.toLowerCase().includes(q) ||
          a.role.toLowerCase().includes(q) ||
          a.perusahaan.toLowerCase().includes(q)
      );
    }
    if (filterKota) list = list.filter((a) => a.kota === filterKota);
    if (filterIndustri) list = list.filter((a) => a.industri === filterIndustri);

    if (sortBy === "nama-az") list.sort((a, b) => a.nama.localeCompare(b.nama));
    else if (sortBy === "nama-za") list.sort((a, b) => b.nama.localeCompare(a.nama));
    else if (sortBy === "terbaru")
      list.sort((a, b) => new Date(b.bergabung_at) - new Date(a.bergabung_at));

    return list;
  }, [allAlumni, search, filterKota, filterIndustri, sortBy]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasFilters = search || filterKota || filterIndustri;

  function clearFilters() {
    setSearch("");
    setFilterKota(null);
    setFilterIndustri(null);
    setPage(1);
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-stone-950 px-6 pb-20 pt-36 text-center">
        {/* Cinematic background */}
        <div
          className="pointer-events-none absolute inset-0 scale-105 bg-cover bg-center"
          style={{
            backgroundImage: "url('/directory-bg.jpg')",
            filter: "brightness(0.28) saturate(0.5)",
          }}
        />
        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/10 to-stone-950/80" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-stone-950/60 via-transparent to-stone-950/60" />

        <div className="relative">
          <span className="mb-4 inline-block rounded-full bg-amber-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 ring-1 ring-amber-500/30">
            Ilmu Komunikasi UPI · Angkatan 2018
          </span>
          <h1 className="mb-3 text-3xl font-extrabold text-white md:text-5xl">
            Direktori Alumni
          </h1>
          <p className="text-stone-400">
            Temukan teman-teman Ilmu Komunikasi UPI 2018 di seluruh Indonesia
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Search & Sort bar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Cari nama, role, atau perusahaan..."
              className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-10 pr-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 shrink-0 text-stone-400" />
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
              className="rounded-xl border border-stone-200 bg-white px-3 py-3 text-sm text-stone-700 focus:border-amber-400 focus:outline-none"
            >
              <option value="nama-az">Nama A–Z</option>
              <option value="nama-za">Nama Z–A</option>
              <option value="terbaru">Terbaru bergabung</option>
            </select>
          </div>
        </div>

        {/* Filter dropdowns */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <select
            value={filterKota ?? ""}
            onChange={(e) => { setFilterKota(e.target.value || null); setPage(1); }}
            className="flex-1 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
          >
            <option value="">Semua Kota</option>
            {KOTA.map((k) => <option key={k} value={k}>{k}</option>)}
          </select>

          <select
            value={filterIndustri ?? ""}
            onChange={(e) => { setFilterIndustri(e.target.value || null); setPage(1); }}
            className="flex-1 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
          >
            <option value="">Semua Industri</option>
            {INDUSTRIES.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
          </select>
        </div>

        {/* Active filter + clear */}
        {hasFilters && !loading && (
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-stone-500">
              Menampilkan{" "}
              <span className="font-semibold text-stone-800">{filtered.length}</span>{" "}
              dari {allAlumni.length} alumni
            </p>
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs text-stone-400 hover:text-amber-600"
            >
              <X className="h-3.5 w-3.5" />
              Reset filter
            </button>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="rounded-xl bg-red-50 px-6 py-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : paginated.map((a) => <AlumniCard key={a.id} alumni={a} />)}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-40"
            >
              ← Sebelumnya
            </button>
            <span className="text-sm text-stone-500">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-40"
            >
              Berikutnya →
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <Search className="h-10 w-10 text-stone-300" />
            <p className="font-semibold text-stone-500">Tidak ada hasil</p>
            <p className="text-sm text-stone-400">
              Coba ubah kata kunci atau filter kamu
            </p>
            <button
              onClick={clearFilters}
              className="mt-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-stone-950 hover:bg-amber-400"
            >
              Reset filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
