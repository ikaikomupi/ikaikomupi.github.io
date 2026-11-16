import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import SignaturePad from "signature_pad";
import {
  BadgeCheck, CheckCircle2, Copy, Download, Eraser, FileSignature, FileText, Loader2, LogOut, Mail,
  ShieldAlert, ShieldCheck, Upload, XCircle,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { infoPdf, potongKanvas, sha256Hex, tempelTtd, urlVerifikasi } from "../lib/ttd";

const MAKS_MB = 20;
const kartu = "rounded-2xl border border-stone-800 bg-stone-900 p-5 sm:p-6";
const input = "w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none";
const tombolUtama = "inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-ink hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50";
const tombolKedua = "inline-flex items-center justify-center gap-2 rounded-lg bg-stone-800 px-4 py-2 text-sm text-stone-200 hover:bg-stone-700 disabled:opacity-50";
const waktu = (t) => new Intl.DateTimeFormat("id-ID", { dateStyle: "long", timeStyle: "short", timeZone: "Asia/Jakarta" }).format(new Date(t)) + " WIB";

function Bingkai({ judul, sub, children }) {
  return (
    <div className="min-h-screen bg-stone-950 px-4 pb-16 pt-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-semibold text-stone-100 sm:text-4xl">{judul}</h1>
        {sub && <p className="mt-2 text-sm text-stone-400">{sub}</p>}
        <div className="mt-8 space-y-6">{children}</div>
      </div>
    </div>
  );
}

function useSesi() {
  const [user, setUser] = useState(null);
  const [siap, setSiap] = useState(!supabase);
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setSiap(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);
  return { user, siap };
}

// ---------- Login ----------
function Masuk() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  async function kirim(e) {
    e.preventDefault();
    setStatus("kirim");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true, emailRedirectTo: `${location.origin}/ttd` },
    });
    setStatus(error ? { error: error.message } : "terkirim");
  }
  return (
    <div className={kartu}>
      <h2 className="flex items-center gap-2 font-semibold text-stone-100"><Mail className="h-4 w-4 text-amber-400" /> Masuk dulu</h2>
      <p className="mt-1 text-sm text-stone-400">
        Akun kamu jadi bukti identitas penanda tangan. Kami kirim link masuk ke email, tanpa kata sandi.
      </p>
      {status === "terkirim" ? (
        <p className="mt-4 rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-300">Link masuk sudah dikirim ke {email}. Buka email lalu klik linknya.</p>
      ) : (
        <form onSubmit={kirim} className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@contoh.com" className={input} />
          <button disabled={status === "kirim"} className={tombolUtama}>
            {status === "kirim" && <Loader2 className="h-4 w-4 animate-spin" />} Kirim link
          </button>
        </form>
      )}
      {status?.error && <p className="mt-2 text-sm text-rose-300">{status.error}</p>}
    </div>
  );
}

// ---------- Kanvas TTD ----------
function KanvasTtd({ onChange, padRef }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const pad = new SignaturePad(canvas, { penColor: "#0d1f4d", minWidth: 0.8, maxWidth: 2.6 });
    padRef.current = pad;
    const ukur = () => {
      const data = pad.toData();
      const r = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * r;
      canvas.height = canvas.offsetHeight * r;
      canvas.getContext("2d").scale(r, r);
      pad.clear();
      pad.fromData(data);
    };
    ukur();
    const ro = new ResizeObserver(ukur);
    ro.observe(canvas);
    pad.addEventListener("endStroke", () => onChange(!pad.isEmpty()));
    return () => {
      ro.disconnect();
      pad.off();
    };
  }, [onChange, padRef]);
  return (
    <div className="relative">
      <canvas ref={canvasRef} className="h-44 w-full touch-none rounded-xl border border-dashed border-stone-600 bg-white" />
      <span className="pointer-events-none absolute bottom-3 left-4 right-4 border-t border-stone-300 pt-1 text-center text-[11px] text-stone-400">
        Tanda tangan di sini
      </span>
    </div>
  );
}

// ---------- Halaman tanda tangan ----------
function Tandatangani({ user }) {
  const [file, setFile] = useState(null);
  const [bytes, setBytes] = useState(null);
  const [jmlHalaman, setJmlHalaman] = useState(0);
  const [nama, setNama] = useState(user.user_metadata?.full_name || "");
  const [jabatan, setJabatan] = useState("");
  const [halaman, setHalaman] = useState(1);
  const [posisi, setPosisi] = useState("kanan");
  const [adaCoretan, setAdaCoretan] = useState(false);
  const [setuju, setSetuju] = useState(false);
  const [proses, setProses] = useState(false);
  const [error, setError] = useState(null);
  const [hasil, setHasil] = useState(null);
  const padRef = useRef(null);
  const [riwayatKey, setRiwayatKey] = useState(0);

  async function pilihFile(f) {
    setError(null);
    setHasil(null);
    if (!f) return;
    if (f.type !== "application/pdf") return setError("File harus PDF.");
    if (f.size > MAKS_MB * 1024 * 1024) return setError(`Ukuran maksimal ${MAKS_MB} MB.`);
    try {
      const b = new Uint8Array(await f.arrayBuffer());
      const { halaman: n } = await infoPdf(b);
      setFile(f);
      setBytes(b);
      setJmlHalaman(n);
      setHalaman(n);
    } catch {
      setError("PDF tidak bisa dibuka. Kalau PDF-nya dikunci kata sandi, buka kuncinya dulu.");
    }
  }

  const hapusCoretan = () => {
    padRef.current?.clear();
    setAdaCoretan(false);
  };

  async function tandatangani() {
    setError(null);
    const ttdPng = potongKanvas(padRef.current.canvas);
    if (!ttdPng) return setError("Tanda tangan masih kosong.");
    setProses(true);
    try {
      const id = crypto.randomUUID();
      const sha256_asli = await sha256Hex(bytes);
      const signed = await tempelTtd(bytes, { id, ttdPng, nama: nama.trim(), jabatan: jabatan.trim(), halaman, posisi });
      const sha256 = await sha256Hex(signed);

      const { error: e1 } = await supabase.from("tanda_tangan").insert({
        id, nama_penanda: nama.trim(), jabatan: jabatan.trim() || null, nama_dokumen: file.name.slice(0, 200),
        sha256_asli, sha256, halaman, user_agent: navigator.userAgent.slice(0, 400),
      });
      if (e1) throw e1;

      // Simpan salinan di akun. Kalau gagal, TTD tetap sah karena hash sudah tercatat.
      const path = `${user.id}/${id}.pdf`;
      const { error: e2 } = await supabase.storage.from("ttd").upload(path, signed, { contentType: "application/pdf" });
      if (!e2) await supabase.from("tanda_tangan").update({ file_path: path }).eq("id", id);

      const namaFile = file.name.replace(/\.pdf$/i, "") + " (ditandatangani).pdf";
      setHasil({ id, url: URL.createObjectURL(new Blob([signed], { type: "application/pdf" })), namaFile, tersimpan: !e2 });
      setRiwayatKey((k) => k + 1);
    } catch (e) {
      setError(e.message || "Gagal menandatangani dokumen.");
    } finally {
      setProses(false);
    }
  }

  function ulang() {
    if (hasil) URL.revokeObjectURL(hasil.url);
    setHasil(null);
    setFile(null);
    setBytes(null);
    setSetuju(false);
    hapusCoretan();
  }

  const onCoret = useCallback((v) => setAdaCoretan(v), []);
  const bisa = bytes && nama.trim().length >= 2 && adaCoretan && setuju && !proses;

  if (hasil) {
    return (
      <>
        <div className={`${kartu} border-emerald-500/40`}>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-emerald-300"><CheckCircle2 className="h-5 w-5" /> Dokumen sudah ditandatangani</h2>
          <p className="mt-2 text-sm text-stone-400">
            Unduh PDF-nya sekarang. File ini yang sah: kalau diubah sedikit saja, verifikasinya akan gagal.
            {!hasil.tersimpan && " Salinan gagal disimpan ke akun, jadi pastikan kamu mengunduhnya."}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href={hasil.url} download={hasil.namaFile} className={tombolUtama}><Download className="h-4 w-4" /> Unduh PDF</a>
            <Link to={`/ttd/v/${hasil.id}`} className={tombolKedua}><ShieldCheck className="h-4 w-4" /> Halaman verifikasi</Link>
            <button onClick={() => navigator.clipboard?.writeText(urlVerifikasi(hasil.id))} className={tombolKedua}><Copy className="h-4 w-4" /> Salin link verifikasi</button>
            <button onClick={ulang} className={tombolKedua}>Tanda tangani dokumen lain</button>
          </div>
        </div>
        <Riwayat key={riwayatKey} />
      </>
    );
  }

  return (
    <>
      <div className={kartu}>
        <h2 className="font-semibold text-stone-100">1. Pilih dokumen</h2>
        <label className="mt-3 flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-stone-700 p-6 text-center hover:border-amber-400">
          {file ? <FileText className="h-8 w-8 text-amber-400" /> : <Upload className="h-8 w-8 text-stone-500" />}
          <span className="text-sm text-stone-200">{file ? file.name : "Klik untuk memilih PDF"}</span>
          <span className="text-xs text-stone-500">{file ? `${jmlHalaman} halaman · ${(file.size / 1024 / 1024).toFixed(2)} MB` : `Maksimal ${MAKS_MB} MB`}</span>
          <input type="file" accept="application/pdf" className="hidden" onChange={(e) => pilihFile(e.target.files?.[0])} />
        </label>
      </div>

      <div className={kartu}>
        <h2 className="font-semibold text-stone-100">2. Data penanda tangan</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="text-xs text-stone-400">Nama lengkap
            <input value={nama} onChange={(e) => setNama(e.target.value)} maxLength={80} className={`${input} mt-1`} placeholder="Nama sesuai identitas" />
          </label>
          <label className="text-xs text-stone-400">Jabatan (opsional)
            <input value={jabatan} onChange={(e) => setJabatan(e.target.value)} maxLength={80} className={`${input} mt-1`} placeholder="mis. Ketua Umum IKA IKOM UPI" />
          </label>
          <label className="text-xs text-stone-400">Halaman
            <select value={halaman} onChange={(e) => setHalaman(Number(e.target.value))} disabled={!jmlHalaman} className={`${input} mt-1`}>
              {Array.from({ length: jmlHalaman || 1 }, (_, i) => (
                <option key={i} value={i + 1}>Halaman {i + 1}{i + 1 === jmlHalaman ? " (terakhir)" : ""}</option>
              ))}
            </select>
          </label>
          <label className="text-xs text-stone-400">Posisi
            <select value={posisi} onChange={(e) => setPosisi(e.target.value)} className={`${input} mt-1`}>
              <option value="kanan">Kanan bawah</option>
              <option value="tengah">Tengah bawah</option>
              <option value="kiri">Kiri bawah</option>
            </select>
          </label>
        </div>
        <p className="mt-2 text-xs text-stone-500">Email akun ({user.email}) ikut tercatat sebagai bukti identitas.</p>
      </div>

      <div className={kartu}>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-stone-100">3. Tanda tangan</h2>
          <button onClick={hapusCoretan} className="inline-flex items-center gap-1 text-xs text-stone-400 hover:text-stone-200"><Eraser className="h-3.5 w-3.5" /> Hapus</button>
        </div>
        <div className="mt-3"><KanvasTtd onChange={onCoret} padRef={padRef} /></div>
        <label className="mt-4 flex items-start gap-2 text-sm text-stone-300">
          <input type="checkbox" checked={setuju} onChange={(e) => setSetuju(e.target.checked)} className="mt-1 accent-amber-500" />
          <span>Saya menyatakan telah membaca dokumen ini dan menandatanganinya secara sadar atas nama saya sendiri.</span>
        </label>
        {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}
        <button onClick={tandatangani} disabled={!bisa} className={`${tombolUtama} mt-4 w-full sm:w-auto`}>
          {proses ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileSignature className="h-4 w-4" />} Tanda tangani dokumen
        </button>
      </div>

      <Riwayat key={riwayatKey} />
    </>
  );
}

function Riwayat() {
  const [rows, setRows] = useState(null);
  useEffect(() => {
    supabase.from("tanda_tangan").select("id, nama_dokumen, ditandatangani_at, file_path")
      .order("ditandatangani_at", { ascending: false }).limit(20)
      .then(({ data }) => setRows(data || []));
  }, []);
  async function unduh(path) {
    const { data } = await supabase.storage.from("ttd").createSignedUrl(path, 60, { download: true });
    if (data?.signedUrl) location.href = data.signedUrl;
  }
  if (!rows?.length) return null;
  return (
    <div className={kartu}>
      <h2 className="font-semibold text-stone-100">Riwayat tanda tangan saya</h2>
      <ul className="mt-3 divide-y divide-stone-800">
        {rows.map((r) => (
          <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-sm">
            <div className="min-w-0">
              <p className="truncate text-stone-200">{r.nama_dokumen}</p>
              <p className="text-xs text-stone-500">{waktu(r.ditandatangani_at)}</p>
            </div>
            <div className="flex gap-3 text-xs">
              {r.file_path && <button onClick={() => unduh(r.file_path)} className="text-amber-400 hover:underline">Unduh</button>}
              <Link to={`/ttd/v/${r.id}`} className="text-stone-400 hover:underline">Verifikasi</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HalamanTtd() {
  const { user, siap } = useSesi();
  return (
    <Bingkai judul="Tanda Tangan Online" sub="Tanda tangani PDF langsung dari browser. Setiap dokumen dapat QR verifikasi yang bisa dicek siapa saja.">
      {!supabase ? (
        <p className={kartu}>Layanan belum tersambung ke database.</p>
      ) : !siap ? (
        <Loader2 className="h-6 w-6 animate-spin text-stone-500" />
      ) : !user ? (
        <Masuk />
      ) : (
        <>
          <div className="flex items-center justify-between text-sm text-stone-400">
            <span>Masuk sebagai <span className="text-stone-200">{user.email}</span></span>
            <button onClick={() => supabase.auth.signOut()} className="inline-flex items-center gap-1 hover:text-stone-200"><LogOut className="h-3.5 w-3.5" /> Keluar</button>
          </div>
          <Tandatangani user={user} />
        </>
      )}
      <p className="text-center text-xs text-stone-500">
        Punya dokumen bertanda tangan? <Link to="/ttd/verifikasi" className="text-amber-400 hover:underline">Cek keasliannya</Link>
      </p>
    </Bingkai>
  );
}

// ---------- Verifikasi ----------
function PilihPdf({ onHash, label }) {
  const [sibuk, setSibuk] = useState(false);
  async function pilih(f) {
    if (!f) return;
    setSibuk(true);
    onHash(await sha256Hex(await f.arrayBuffer()), f.name);
    setSibuk(false);
  }
  return (
    <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-stone-700 p-6 text-center hover:border-amber-400">
      {sibuk ? <Loader2 className="h-7 w-7 animate-spin text-stone-500" /> : <Upload className="h-7 w-7 text-stone-500" />}
      <span className="text-sm text-stone-200">{label}</span>
      <span className="text-xs text-stone-500">File tidak diunggah: pengecekan dilakukan di browser kamu.</span>
      <input type="file" accept="application/pdf" className="hidden" onChange={(e) => pilih(e.target.files?.[0])} />
    </label>
  );
}

function CekDokumen() {
  const navigate = useNavigate();
  const [hasil, setHasil] = useState(null);
  async function cek(hash) {
    setHasil("cek");
    const { data } = await supabase.rpc("cek_hash_ttd", { p_sha256: hash });
    if (data) navigate(`/ttd/v/${data}?cocok=1`);
    else setHasil("tidak");
  }
  return (
    <Bingkai judul="Cek Keaslian Dokumen" sub="Pilih PDF yang ditandatangani lewat situs ini. Kami cocokkan sidik jari (hash SHA-256) file dengan catatan tanda tangan.">
      <div className={kartu}>
        <PilihPdf onHash={cek} label="Pilih PDF untuk dicek" />
        {hasil === "tidak" && (
          <p className="mt-4 flex items-start gap-2 rounded-lg bg-rose-500/10 p-3 text-sm text-rose-300">
            <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
            Dokumen ini tidak terdaftar. Bisa jadi bukan ditandatangani di sini, atau isinya sudah diubah setelah ditandatangani.
          </p>
        )}
      </div>
    </Bingkai>
  );
}

function Verifikasi() {
  const { id } = useParams();
  const cocokAwal = new URLSearchParams(location.search).get("cocok") === "1";
  const [rec, setRec] = useState(undefined);
  const [cocok, setCocok] = useState(cocokAwal ? true : null);

  useEffect(() => {
    if (!supabase) return setRec(null);
    supabase.rpc("verifikasi_ttd", { p_id: id }).then(({ data }) => setRec(data?.[0] ?? null));
  }, [id]);

  if (rec === undefined) return <Bingkai judul="Verifikasi Tanda Tangan"><Loader2 className="h-6 w-6 animate-spin text-stone-500" /></Bingkai>;
  if (!rec)
    return (
      <Bingkai judul="Verifikasi Tanda Tangan">
        <div className={`${kartu} flex items-start gap-3 border-rose-500/40`}>
          <ShieldAlert className="h-6 w-6 shrink-0 text-rose-300" />
          <div>
            <p className="font-semibold text-rose-300">Tanda tangan tidak ditemukan</p>
            <p className="mt-1 text-sm text-stone-400">ID ini tidak terdaftar. Hati-hati, dokumen ini mungkin palsu.</p>
          </div>
        </div>
      </Bingkai>
    );

  const baris = [
    ["Penanda tangan", rec.nama_penanda],
    rec.jabatan && ["Jabatan", rec.jabatan],
    rec.email_samaran && ["Akun", rec.email_samaran],
    ["Dokumen", rec.nama_dokumen],
    ["Halaman TTD", rec.halaman],
    ["Waktu (server)", waktu(rec.ditandatangani_at)],
    ["ID", rec.id],
    ["SHA-256", rec.sha256],
  ].filter(Boolean);

  return (
    <Bingkai judul="Verifikasi Tanda Tangan">
      <div className={`${kartu} border-emerald-500/40`}>
        <p className="flex items-center gap-2 font-semibold text-emerald-300"><BadgeCheck className="h-5 w-5" /> Tanda tangan terdaftar</p>
        <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[10rem_1fr]">
          {baris.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-stone-500">{k}</dt>
              <dd className="break-all text-stone-200">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={kartu}>
        <h2 className="font-semibold text-stone-100">Pastikan file kamu asli</h2>
        <p className="mt-1 text-sm text-stone-400">QR bisa disalin ke dokumen lain. Pilih PDF yang kamu terima untuk memastikan isinya sama persis dengan yang ditandatangani.</p>
        <div className="mt-4"><PilihPdf onHash={(h) => setCocok(h === rec.sha256)} label="Pilih PDF yang kamu terima" /></div>
        {cocok === true && (
          <p className="mt-4 flex items-start gap-2 rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-300">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" /> Cocok. File ini sama persis dengan dokumen yang ditandatangani.
          </p>
        )}
        {cocok === false && (
          <p className="mt-4 flex items-start gap-2 rounded-lg bg-rose-500/10 p-3 text-sm text-rose-300">
            <XCircle className="mt-0.5 h-4 w-4 shrink-0" /> Tidak cocok. File ini berbeda dari dokumen yang ditandatangani (sudah diubah, atau dokumen lain).
          </p>
        )}
      </div>
    </Bingkai>
  );
}

export default function TtdPage() {
  return (
    <Routes>
      <Route index element={<HalamanTtd />} />
      <Route path="verifikasi" element={<CekDokumen />} />
      <Route path="v/:id" element={<Verifikasi />} />
    </Routes>
  );
}
