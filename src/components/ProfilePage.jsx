import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Building2,
  Linkedin,
  Instagram,
  MessageCircle,
  Mail,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { fetchAlumni } from "../lib/sheets";

function getInitials(nama) {
  return nama
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const AVATAR_COLORS = [
  "bg-amber-600",
  "bg-orange-600",
  "bg-red-700",
  "bg-stone-600",
  "bg-yellow-600",
];

export default function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlumni()
      .then((list) => setPerson(list.find((a) => String(a.id) === id) ?? null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50 pt-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
      </div>
    );
  }

  if (!person) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-stone-50 pt-20">
        <p className="text-stone-500">Alumni tidak ditemukan.</p>
        <button
          onClick={() => navigate("/directory")}
          className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-stone-950"
        >
          Kembali ke Direktori
        </button>
      </div>
    );
  }

  const avatarColor =
    AVATAR_COLORS[Number(person.id) % AVATAR_COLORS.length];

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      {/* Back button */}
      <div className="mx-auto max-w-3xl px-6 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm text-stone-500 hover:text-amber-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </button>
      </div>

      {/* Profile header */}
      <div className="bg-stone-950 px-6 pb-12 pt-4">
        <div className="mx-auto max-w-3xl flex flex-col items-center gap-5 text-center">
          {person.foto_url ? (
            <img
              src={person.foto_url}
              alt={person.nama}
              className="h-24 w-24 rounded-full object-cover ring-4 ring-amber-500/30"
            />
          ) : (
            <div
              className={`flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold text-white ring-4 ring-amber-500/30 ${avatarColor}`}
            >
              {getInitials(person.nama)}
            </div>
          )}

          <div>
            <h1 className="text-2xl font-extrabold text-white">{person.nama}</h1>
            <p className="mt-1 text-stone-400">{person.role}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-stone-400">
            <span className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4 text-amber-500" />
              {person.perusahaan}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-amber-500" />
              {person.kota}
            </span>
          </div>

          {/* Contact buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {person.whatsapp && (
              <a
                href={`https://wa.me/${person.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-stone-950 hover:bg-amber-400"
              >
                <MessageCircle className="h-4 w-4" />
                Hubungi via WA
              </a>
            )}
            {person.linkedin && (
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-stone-300 hover:bg-white/10"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            )}
            {person.instagram && (
              <a
                href={`https://instagram.com/${person.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-stone-300 hover:bg-white/10"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
            )}
            {person.email && (
              <a
                href={`mailto:${person.email}`}
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-stone-300 hover:bg-white/10"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content sections */}
      <div className="mx-auto max-w-3xl space-y-6 px-6 py-10">
        {/* Bio */}
        {person.bio && (
          <section className="rounded-2xl border border-stone-200 bg-white p-7">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-stone-400">
              Tentang
            </h2>
            <p className="leading-relaxed text-stone-700">{person.bio}</p>
          </section>
        )}

        {/* Career */}
        <section className="rounded-2xl border border-stone-200 bg-white p-7">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-stone-400">
            Karir
          </h2>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50">
              <Briefcase className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="font-semibold text-stone-900">{person.role}</p>
              <p className="text-sm text-stone-500">{person.perusahaan}</p>
              <span className="mt-1 inline-block rounded-full bg-amber-50 px-3 py-0.5 text-xs font-medium text-amber-700">
                {person.industri}
              </span>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="rounded-2xl border border-stone-200 bg-white p-7">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-stone-400">
            Pendidikan
          </h2>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-50">
              <GraduationCap className="h-5 w-5 text-stone-500" />
            </div>
            <div>
              <p className="font-semibold text-stone-900">
                Ilmu Komunikasi — Universitas Pendidikan Indonesia
              </p>
              <p className="text-sm text-stone-500">Lulus 2022</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
