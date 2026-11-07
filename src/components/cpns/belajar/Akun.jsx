import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Mail, LogOut, Save, CheckCircle2 } from "lucide-react";
import { useLms, loginTersedia, LOGIN_GOOGLE_AKTIF } from "../../../lib/lms";
import { Section, Field, inputCls, Memuat } from "../ui";

function FormMasuk() {
  const { kirimKode, verifikasiKode, masukGoogle } = useLms();
  const [email, setEmail] = useState("");
  const [kode, setKode] = useState("");
  const [tahap, setTahap] = useState("email");
  const [pesan, setPesan] = useState("");
  const [sibuk, setSibuk] = useState(false);

  async function kirim(e) {
    e.preventDefault();
    setSibuk(true);
    setPesan("");
    const { error } = await kirimKode(email.trim());
    setSibuk(false);
    if (error)
      setPesan(
        error.status === 429
          ? "Terlalu banyak permintaan. Tunggu beberapa menit lalu coba lagi."
          : /not authorized/i.test(error.message || "")
          ? "Login lewat email belum dibuka untuk umum. Hubungi pengurus IKA."
          : "Kode gagal dikirim. Cek alamat email lalu coba lagi."
      );
    else setTahap("kode");
  }
  async function verifikasi(e) {
    e.preventDefault();
    setSibuk(true);
    setPesan("");
    const { error } = await verifikasiKode(email.trim(), kode.trim());
    setSibuk(false);
    if (error) setPesan("Kode salah atau sudah kedaluwarsa. Minta kode baru kalau perlu.");
  }

  return (
    <Section icon={Mail} title="Masuk ke KOMpas ASN" desc="Tanpa kata sandi. Kami kirim kode 6 digit ke email kamu. Akun baru otomatis dibuat saat pertama kali masuk.">
      <div className="max-w-md space-y-4 rounded-2xl border border-white/8 bg-stone-900 p-5">
        {tahap === "email" ? (
          <form onSubmit={kirim} className="space-y-3">
            <Field label="Email">
              <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="nama@email.com" />
            </Field>
            <button disabled={sibuk} className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-semibold text-ink hover:bg-amber-400 disabled:opacity-50">
              {sibuk ? "Mengirim…" : "Kirim kode"}
            </button>
          </form>
        ) : (
          <form onSubmit={verifikasi} className="space-y-3">
            <p className="text-sm text-stone-400">Kode dikirim ke <strong className="text-stone-200">{email}</strong>. Cek juga folder spam.</p>
            <Field label="Kode 6 digit">
              <input inputMode="numeric" autoComplete="one-time-code" required maxLength={6} value={kode} onChange={(e) => setKode(e.target.value.replace(/\D/g, ""))} className={`${inputCls} text-center text-lg tracking-[0.4em] tabular-nums`} />
            </Field>
            <button disabled={sibuk || kode.length !== 6} className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-semibold text-ink hover:bg-amber-400 disabled:opacity-50">
              {sibuk ? "Memeriksa…" : "Masuk"}
            </button>
            <button type="button" onClick={() => { setTahap("email"); setKode(""); }} className="w-full text-sm text-stone-500 hover:text-stone-300">
              Ganti email atau kirim ulang
            </button>
          </form>
        )}
        {pesan && <p className="text-sm text-rose-400">{pesan}</p>}
        {LOGIN_GOOGLE_AKTIF && (
          <>
            <div className="flex items-center gap-3 text-xs text-stone-600"><span className="h-px flex-1 bg-white/8" />atau<span className="h-px flex-1 bg-white/8" /></div>
            <button type="button" onClick={masukGoogle} className="w-full rounded-lg border border-white/10 py-2.5 text-sm font-medium text-stone-200 hover:bg-white/5">
              Masuk dengan Google
            </button>
          </>
        )}
        <p className="text-xs text-stone-500">Progres yang sudah tersimpan di browser ini akan dipindahkan ke akunmu.</p>
      </div>
    </Section>
  );
}

function FormProfil() {
  const { user, data, simpanProfil, keluar } = useLms();
  const p = data.profil || {};
  const [f, setF] = useState({ nama_tampil: "", angkatan: "", target_tanggal: "", target_skd: "", tampil_di_peringkat: false });
  const [ok, setOk] = useState(false);
  useEffect(() => {
    setF({
      nama_tampil: p.nama_tampil || "",
      angkatan: p.angkatan || "",
      target_tanggal: p.target_tanggal || "",
      target_skd: p.target_skd ?? "",
      tampil_di_peringkat: Boolean(p.tampil_di_peringkat),
    });
  }, [p.nama_tampil, p.angkatan, p.target_tanggal, p.target_skd, p.tampil_di_peringkat]);
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  async function simpan(e) {
    e.preventDefault();
    const berhasil = await simpanProfil({
      nama_tampil: f.nama_tampil.trim().slice(0, 40) || null,
      angkatan: f.angkatan.trim().slice(0, 10) || null,
      target_tanggal: f.target_tanggal || null,
      target_skd: f.target_skd === "" ? null : Math.min(550, Math.max(0, Number(f.target_skd))),
      tampil_di_peringkat: user ? f.tampil_di_peringkat : false,
    });
    setOk(berhasil);
  }

  return (
    <Section icon={Save} title={user ? "Akun & target belajar" : "Target belajar"} desc={user ? `Masuk sebagai ${user.email}` : "Disimpan di browser ini."}>
      <form onSubmit={simpan} className="max-w-xl space-y-4 rounded-2xl border border-white/8 bg-stone-900 p-5">
        {user && (
          <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
            <Field label="Nama tampil di peringkat"><input value={f.nama_tampil} onChange={set("nama_tampil")} maxLength={40} className={inputCls} placeholder="mis. Rafi S." /></Field>
            <Field label="Angkatan"><input value={f.angkatan} onChange={set("angkatan")} maxLength={10} className={inputCls} placeholder="2018" /></Field>
          </div>
        )}
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Perkiraan tanggal SKD"><input type="date" value={f.target_tanggal} onChange={set("target_tanggal")} className={inputCls} /></Field>
          <Field label="Target skor SKD" hint="maks 550"><input type="number" min={0} max={550} value={f.target_skd} onChange={set("target_skd")} className={`${inputCls} tabular-nums`} placeholder="420" /></Field>
        </div>
        {user && (
          <label className="flex items-start gap-2 text-sm text-stone-300">
            <input type="checkbox" checked={f.tampil_di_peringkat} onChange={set("tampil_di_peringkat")} className="mt-1 accent-amber-500" />
            <span>Tampilkan nama tampil, angkatan, dan skor tryout terbaikku di peringkat alumni. Email tidak pernah ditampilkan.</span>
          </label>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <button className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-amber-400">Simpan</button>
          {ok && <span className="flex items-center gap-1 text-sm text-emerald-400"><CheckCircle2 className="h-4 w-4" /> Tersimpan</span>}
          {user && (
            <button type="button" onClick={keluar} className="ml-auto flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-200">
              <LogOut className="h-4 w-4" /> Keluar
            </button>
          )}
        </div>
      </form>
    </Section>
  );
}

export default function Akun() {
  const { user, siap } = useLms();
  if (!siap) return <Memuat />;
  return (
    <>
      <Link to="/cpns/belajar" className="mb-4 inline-flex items-center gap-1 text-sm text-stone-400 hover:text-stone-100">
        <ChevronLeft className="h-4 w-4" /> Kembali ke Belajar
      </Link>
      {loginTersedia && !user && <FormMasuk />}
      {!loginTersedia && <p className="mb-8 rounded-xl bg-stone-900 px-4 py-3 text-sm text-stone-400">Login belum diaktifkan pengurus. Target tetap bisa diatur dan disimpan di browser ini.</p>}
      <FormProfil />
    </>
  );
}
