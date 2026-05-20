import { useState, useEffect } from "react";
import { fetchEvents, fetchPosts, fetchAlumni } from "../lib/sheets";
import { addEvent, addPost } from "../lib/admin";
import {
  Calendar, BookOpen, Users, LogOut, Plus, X,
  ExternalLink, MapPin, Clock, Check, Loader,
  User, Briefcase, Building2,
} from "lucide-react";

const PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "aiku2018";
const SHEET_URL = "https://docs.google.com/spreadsheets/d/1mFUEZRRmr6cnmQ7Cbqo5WePQb9cuzKgTx7c6MIhw07w";

function toSlug(str) {
  return str.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

// ─── Password Gate ────────────────────────────────────────────────────────────

function PasswordGate({ onAuth }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (pw === PASSWORD) { onAuth(); }
    else { setError(true); setPw(""); }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-950 px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/15 ring-1 ring-amber-500/20">
            <span className="text-2xl">🛡️</span>
          </div>
          <h1 className="text-xl font-bold text-stone-100">Admin Panel</h1>
          <p className="mt-1 text-sm text-stone-500">AIKU 2018</p>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <input
            type="password"
            value={pw}
            autoFocus
            onChange={(e) => { setPw(e.target.value); setError(false); }}
            placeholder="Password"
            className={`w-full rounded-xl border bg-stone-900 px-4 py-3 text-sm text-stone-100 placeholder-stone-600 outline-none transition focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 ${error ? "border-red-500/50" : "border-white/8"}`}
          />
          {error && <p className="text-xs text-red-400">Password salah.</p>}
          <button type="submit" className="w-full rounded-xl bg-amber-500 py-3 text-sm font-semibold text-stone-950 hover:bg-amber-400 transition-colors">
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Form Components ──────────────────────────────────────────────────────────

function Field({ label, required, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-stone-400">
        {label}{required && <span className="ml-0.5 text-amber-500">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full rounded-lg border border-white/8 bg-stone-800 px-3 py-2.5 text-sm text-stone-100 placeholder-stone-600 outline-none transition focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20";

function AddEventForm({ onClose, onSaved }) {
  const empty = { judul: "", tanggal: "", waktu: "", lokasi: "", kategori: "Reuni", deskripsi: "", link_daftar: "" };
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    const id = String(Date.now());
    await addEvent({ id, ...form });
    setSaving(false);
    setDone(true);
    setTimeout(() => { onSaved(); onClose(); }, 1200);
  }

  return (
    <div className="rounded-2xl border border-amber-500/20 bg-stone-900 p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-semibold text-stone-100">Tambah Event</h3>
        <button onClick={onClose} className="rounded-lg p-1.5 text-stone-500 hover:bg-white/5 hover:text-white"><X className="h-4 w-4" /></button>
      </div>
      {done ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15"><Check className="h-6 w-6 text-emerald-400" /></div>
          <p className="text-sm font-medium text-stone-300">Event tersimpan!</p>
          <p className="text-xs text-stone-500">Data dikirim ke Google Sheets.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <Field label="Judul" required>
            <input className={inputCls} value={form.judul} onChange={set("judul")} placeholder="Reuni Mini IKOM 2018" required />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Tanggal" required>
              <input type="date" className={inputCls} value={form.tanggal} onChange={set("tanggal")} required />
            </Field>
            <Field label="Waktu">
              <input type="time" className={inputCls} value={form.waktu} onChange={set("waktu")} />
            </Field>
          </div>
          <Field label="Lokasi" required>
            <input className={inputCls} value={form.lokasi} onChange={set("lokasi")} placeholder="Bandung / Online · Zoom" required />
          </Field>
          <Field label="Kategori" required>
            <select className={inputCls} value={form.kategori} onChange={set("kategori")}>
              {["Reuni", "Gathering", "Webinar", "Workshop"].map((k) => <option key={k}>{k}</option>)}
            </select>
          </Field>
          <Field label="Deskripsi">
            <textarea className={`${inputCls} resize-none`} rows={3} value={form.deskripsi} onChange={set("deskripsi")} placeholder="Deskripsi singkat event..." />
          </Field>
          <Field label="Link Pendaftaran">
            <input className={inputCls} value={form.link_daftar} onChange={set("link_daftar")} placeholder="https://..." />
          </Field>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-white/8 py-2.5 text-sm text-stone-400 hover:bg-white/5 transition-colors">Batal</button>
            <button type="submit" disabled={saving} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-amber-500 py-2.5 text-sm font-semibold text-stone-950 hover:bg-amber-400 disabled:opacity-60 transition-colors">
              {saving && <Loader className="h-3.5 w-3.5 animate-spin" />}
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function AddPostForm({ onClose, onSaved }) {
  const today = new Date().toISOString().split("T")[0];
  const empty = { judul: "", slug: "", kategori: "Karir", penulis: "", tanggal: today, ringkasan: "", konten: "", foto_url: "" };
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  function set(k) {
    return (e) => {
      const val = e.target.value;
      setForm((f) => ({
        ...f,
        [k]: val,
        ...(k === "judul" ? { slug: toSlug(val) } : {}),
      }));
    };
  }

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    await addPost(form);
    setSaving(false);
    setDone(true);
    setTimeout(() => { onSaved(); onClose(); }, 1200);
  }

  return (
    <div className="rounded-2xl border border-amber-500/20 bg-stone-900 p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-semibold text-stone-100">Tambah Artikel</h3>
        <button onClick={onClose} className="rounded-lg p-1.5 text-stone-500 hover:bg-white/5 hover:text-white"><X className="h-4 w-4" /></button>
      </div>
      {done ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15"><Check className="h-6 w-6 text-emerald-400" /></div>
          <p className="text-sm font-medium text-stone-300">Artikel tersimpan!</p>
          <p className="text-xs text-stone-500">Data dikirim ke Google Sheets.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <Field label="Judul" required>
            <input className={inputCls} value={form.judul} onChange={set("judul")} placeholder="Tips Memulai Karir..." required />
          </Field>
          <Field label="Slug (URL)">
            <input className={inputCls} value={form.slug} onChange={set("slug")} placeholder="tips-memulai-karir" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Kategori" required>
              <select className={inputCls} value={form.kategori} onChange={set("kategori")}>
                {["Karir", "Tips Hidup", "Cerita Alumni", "Networking"].map((k) => <option key={k}>{k}</option>)}
              </select>
            </Field>
            <Field label="Tanggal" required>
              <input type="date" className={inputCls} value={form.tanggal} onChange={set("tanggal")} required />
            </Field>
          </div>
          <Field label="Penulis" required>
            <input className={inputCls} value={form.penulis} onChange={set("penulis")} placeholder="Nama penulis" required />
          </Field>
          <Field label="Ringkasan" required>
            <textarea className={`${inputCls} resize-none`} rows={2} value={form.ringkasan} onChange={set("ringkasan")} placeholder="1–2 kalimat ringkasan artikel..." required />
          </Field>
          <Field label="Konten" required>
            <textarea className={`${inputCls} resize-none`} rows={6} value={form.konten} onChange={set("konten")} placeholder={"Tulis konten artikel...\n\nPisahkan paragraf dengan baris kosong."} required />
          </Field>
          <Field label="URL Foto Cover">
            <input className={inputCls} value={form.foto_url} onChange={set("foto_url")} placeholder="https://..." />
          </Field>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-white/8 py-2.5 text-sm text-stone-400 hover:bg-white/5 transition-colors">Batal</button>
            <button type="submit" disabled={saving} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-amber-500 py-2.5 text-sm font-semibold text-stone-950 hover:bg-amber-400 disabled:opacity-60 transition-colors">
              {saving && <Loader className="h-3.5 w-3.5 animate-spin" />}
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// ─── Tab Sections ─────────────────────────────────────────────────────────────

function EventsTab() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  function load() {
    setLoading(true);
    fetchEvents().then((d) => { setEvents(d); setLoading(false); });
  }
  useEffect(load, []);

  const sorted = [...events].sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-stone-500">{events.length} event</p>
        <div className="flex gap-2">
          <a href={`${SHEET_URL}/edit#gid=421517647`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-white/8 px-3 py-2 text-xs text-stone-400 hover:border-white/15 hover:text-white transition-colors">
            <ExternalLink className="h-3.5 w-3.5" /> Buka Sheets
          </a>
          <button onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-xs font-semibold text-stone-950 hover:bg-amber-400 transition-colors">
            <Plus className="h-3.5 w-3.5" /> Tambah Event
          </button>
        </div>
      </div>

      {showForm && <AddEventForm onClose={() => setShowForm(false)} onSaved={load} />}

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 animate-pulse rounded-xl bg-stone-800" />)}</div>
      ) : sorted.length === 0 ? (
        <div className="rounded-xl border border-white/8 py-12 text-center text-stone-500">Belum ada event.</div>
      ) : (
        <div className="space-y-3">
          {sorted.map((ev) => {
            const isPast = ev.tanggal ? new Date(ev.tanggal) < new Date(new Date().toDateString()) : false;
            return (
              <div key={ev.id} className={`flex items-start gap-4 rounded-xl border p-4 ${isPast ? "border-white/5 opacity-50" : "border-white/8"}`}>
                <div className="flex w-12 shrink-0 flex-col items-center rounded-lg bg-stone-800 py-2 text-center">
                  <span className="text-base font-black text-white leading-none">
                    {ev.tanggal ? new Date(ev.tanggal).toLocaleDateString("id-ID", { day: "2-digit" }) : "—"}
                  </span>
                  <span className="text-xs font-semibold uppercase text-amber-400">
                    {ev.tanggal ? new Date(ev.tanggal).toLocaleDateString("id-ID", { month: "short" }) : ""}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-stone-100 truncate">{ev.judul}</p>
                  <div className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-stone-500">
                    {ev.waktu && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{ev.waktu}</span>}
                    {ev.lokasi && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{ev.lokasi}</span>}
                    <span className="rounded-full bg-stone-800 px-2 py-0.5">{ev.kategori}</span>
                    {isPast && <span className="text-stone-600">Selesai</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function BlogTab() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  function load() {
    setLoading(true);
    fetchPosts().then((d) => { setPosts(d); setLoading(false); });
  }
  useEffect(load, []);

  const sorted = [...posts].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-stone-500">{posts.length} artikel</p>
        <div className="flex gap-2">
          <a href={`${SHEET_URL}/edit#gid=825371046`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-white/8 px-3 py-2 text-xs text-stone-400 hover:border-white/15 hover:text-white transition-colors">
            <ExternalLink className="h-3.5 w-3.5" /> Buka Sheets
          </a>
          <button onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-xs font-semibold text-stone-950 hover:bg-amber-400 transition-colors">
            <Plus className="h-3.5 w-3.5" /> Tambah Artikel
          </button>
        </div>
      </div>

      {showForm && <AddPostForm onClose={() => setShowForm(false)} onSaved={load} />}

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 animate-pulse rounded-xl bg-stone-800" />)}</div>
      ) : sorted.length === 0 ? (
        <div className="rounded-xl border border-white/8 py-12 text-center text-stone-500">Belum ada artikel.</div>
      ) : (
        <div className="space-y-3">
          {sorted.map((p) => (
            <div key={p.slug} className="flex items-start gap-4 rounded-xl border border-white/8 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                <BookOpen className="h-4 w-4 text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-stone-100 truncate">{p.judul}</p>
                <div className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-stone-500">
                  <span>{p.penulis}</span>
                  <span>{p.tanggal}</span>
                  <span className="rounded-full bg-stone-800 px-2 py-0.5">{p.kategori}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AlumniTab() {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlumni().then((d) => { setAlumni(d); setLoading(false); });
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-stone-500">{alumni.length} alumni terdaftar</p>
        <a href={`${SHEET_URL}/edit`} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-lg border border-white/8 px-3 py-2 text-xs text-stone-400 hover:border-white/15 hover:text-white transition-colors">
          <ExternalLink className="h-3.5 w-3.5" /> Buka Sheets
        </a>
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3,4,5].map(i => <div key={i} className="h-14 animate-pulse rounded-xl bg-stone-800" />)}</div>
      ) : (
        <div className="space-y-2">
          {alumni.map((a) => (
            <div key={a.id} className="flex items-center gap-4 rounded-xl border border-white/8 p-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-stone-950">
                {a.nama?.slice(0, 2).toUpperCase() || "?"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-stone-100 truncate">{a.nama}</p>
                <p className="text-xs text-stone-500 truncate">{[a.role, a.perusahaan, a.kota].filter(Boolean).join(" · ")}</p>
              </div>
              <span className="shrink-0 rounded-full bg-stone-800 px-2.5 py-1 text-xs text-stone-400">{a.industri}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Apps Script Banner ───────────────────────────────────────────────────────

function ScriptBanner() {
  const [show, setShow] = useState(false);
  const code = `function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  if (data.type === "event") {
    const s = ss.getSheetByName("events");
    s.appendRow([data.id, data.judul, data.tanggal,
      data.waktu, data.lokasi, data.kategori,
      data.deskripsi, data.link_daftar, data.foto_url]);

  } else if (data.type === "post") {
    const s = ss.getSheetByName("setelah-toga");
    s.appendRow([data.slug, data.judul, data.kategori,
      data.penulis, data.tanggal, data.ringkasan,
      data.konten, data.foto_url]);

  } else {
    // alumni (existing logic here)
  }

  return ContentService
    .createTextResponse(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}`;

  return (
    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-amber-400">Update Apps Script diperlukan</p>
          <p className="mt-0.5 text-xs text-stone-500">
            Agar form Tambah Event & Tambah Artikel bisa menyimpan ke Google Sheets,
            update fungsi <code className="rounded bg-stone-800 px-1 text-amber-400">doPost</code> di Apps Script kamu.
          </p>
        </div>
        <button onClick={() => setShow(v => !v)} className="shrink-0 rounded-lg bg-amber-500/15 px-3 py-1.5 text-xs font-medium text-amber-400 hover:bg-amber-500/25 transition-colors">
          {show ? "Tutup" : "Lihat kode"}
        </button>
      </div>
      {show && (
        <pre className="mt-3 overflow-x-auto rounded-lg bg-stone-900 p-4 text-xs text-stone-300 leading-relaxed">
          {code}
        </pre>
      )}
    </div>
  );
}

// ─── Main Admin Panel ─────────────────────────────────────────────────────────

const TABS = [
  { key: "events", label: "Events", icon: Calendar },
  { key: "blog", label: "Blog", icon: BookOpen },
  { key: "alumni", label: "Alumni", icon: Users },
];

function AdminPanel({ onLogout }) {
  const [tab, setTab] = useState("events");

  return (
    <div className="min-h-screen bg-stone-950">
      {/* Header */}
      <div className="border-b border-white/8 bg-stone-900/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-sm font-bold text-stone-100">Admin Panel</h1>
            <p className="text-xs text-stone-500">AIKU 2018</p>
          </div>
          <button onClick={onLogout}
            className="flex items-center gap-1.5 rounded-lg border border-white/8 px-3 py-2 text-xs text-stone-400 hover:border-red-500/30 hover:text-red-400 transition-colors">
            <LogOut className="h-3.5 w-3.5" /> Keluar
          </button>
        </div>

        {/* Tabs */}
        <div className="mx-auto flex max-w-4xl gap-1 px-6 pb-0">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                tab === key
                  ? "border-amber-500 text-amber-400"
                  : "border-transparent text-stone-500 hover:text-stone-300"
              }`}>
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-8 space-y-6">
        <ScriptBanner />
        {tab === "events" && <EventsTab />}
        {tab === "blog" && <BlogTab />}
        {tab === "alumni" && <AlumniTab />}
      </div>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function Admin() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem("admin_ok") === "1"
  );

  function login() { sessionStorage.setItem("admin_ok", "1"); setAuthed(true); }
  function logout() { sessionStorage.removeItem("admin_ok"); setAuthed(false); }

  return authed ? <AdminPanel onLogout={logout} /> : <PasswordGate onAuth={login} />;
}
