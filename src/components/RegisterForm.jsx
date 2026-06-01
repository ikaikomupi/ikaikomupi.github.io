import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronRight, ChevronLeft, PartyPopper } from "lucide-react";
import { submitRegistration } from "../lib/form";
import { INDUSTRIES, KOTA } from "../data/alumni";

const STEPS = ["Data Diri", "Pekerjaan", "Kontak & Sosial"];

function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-stone-700">
        {label}
        {required && <span className="ml-1 text-amber-500">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/20";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    nama: "",
    foto_url: "",
    kota: "",
    bio: "",
    role: "",
    perusahaan: "",
    industri: "",
    linkedin: "",
    instagram: "",
    whatsapp: "",
    email: "",
  });

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  function validate() {
    const errs = {};
    if (step === 0) {
      if (!form.nama.trim()) errs.nama = "Nama wajib diisi";
      if (!form.kota) errs.kota = "Pilih domisili kamu";
    }
    if (step === 1) {
      if (!form.role.trim()) errs.role = "Posisi wajib diisi";
      if (!form.perusahaan.trim()) errs.perusahaan = "Perusahaan wajib diisi";
      if (!form.industri) errs.industri = "Pilih industri";
    }
    if (step === 2) {
      if (!form.whatsapp.trim()) errs.whatsapp = "Nomor WA wajib diisi";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function next() {
    if (validate()) setStep((s) => s + 1);
  }

  function back() {
    setErrors({});
    setStep((s) => s - 1);
  }

  async function submit() {
    if (!validate()) return;
    setLoading(true);
    try {
      await submitRegistration(form);
      setDone(true);
    } catch {
      setErrors({ submit: "Gagal mengirim data. Coba lagi." });
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-stone-50 px-6 pt-20 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
          <PartyPopper className="h-9 w-9 text-amber-600" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-stone-900">
            Selamat datang, {form.nama.split(" ")[0]}!
          </h2>
          <p className="mt-2 text-stone-500">
            Data kamu berhasil dikirim. Kamu akan segera masuk ke direktori
            setelah diverifikasi.
          </p>
        </div>
        <button
          onClick={() => navigate("/directory")}
          className="rounded-xl bg-amber-500 px-7 py-3.5 text-sm font-semibold text-stone-950 hover:bg-amber-400"
        >
          Lihat Direktori
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 px-6 pt-28 pb-16">
      <div className="mx-auto max-w-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-extrabold text-stone-900">Daftar Jejaring</h1>
          <p className="mt-1 text-sm text-stone-500">
            Bergabung ke direktori alumni IKOM UPI
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8 flex items-center gap-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  i < step
                    ? "bg-amber-500 text-stone-950"
                    : i === step
                    ? "bg-stone-900 text-white"
                    : "bg-stone-200 text-stone-500"
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={`text-xs ${
                  i === step ? "font-semibold text-stone-800" : "text-stone-400"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
          {/* Step 0 — Data Diri */}
          {step === 0 && (
            <div className="flex flex-col gap-5">
              <Field label="Nama Lengkap" required>
                <input
                  className={inputCls}
                  placeholder="e.g. Rafi Shalahudin"
                  value={form.nama}
                  onChange={set("nama")}
                />
                {errors.nama && (
                  <p className="text-xs text-red-500">{errors.nama}</p>
                )}
              </Field>

              <Field label="URL Foto Profil">
                <input
                  className={inputCls}
                  placeholder="https://..."
                  value={form.foto_url}
                  onChange={set("foto_url")}
                />
              </Field>

              <Field label="Domisili Saat Ini" required>
                <select
                  className={inputCls}
                  value={form.kota}
                  onChange={set("kota")}
                >
                  <option value="">Pilih kota...</option>
                  {KOTA.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
                {errors.kota && (
                  <p className="text-xs text-red-500">{errors.kota}</p>
                )}
              </Field>

              <Field label="Bio Singkat">
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={3}
                  placeholder="Ceritakan sedikit tentang dirimu..."
                  value={form.bio}
                  onChange={set("bio")}
                />
              </Field>
            </div>
          )}

          {/* Step 1 — Pekerjaan */}
          {step === 1 && (
            <div className="flex flex-col gap-5">
              <Field label="Posisi / Role Saat Ini" required>
                <input
                  className={inputCls}
                  placeholder="e.g. Brand Manager"
                  value={form.role}
                  onChange={set("role")}
                />
                {errors.role && (
                  <p className="text-xs text-red-500">{errors.role}</p>
                )}
              </Field>

              <Field label="Nama Perusahaan" required>
                <input
                  className={inputCls}
                  placeholder="e.g. Unilever Indonesia"
                  value={form.perusahaan}
                  onChange={set("perusahaan")}
                />
                {errors.perusahaan && (
                  <p className="text-xs text-red-500">{errors.perusahaan}</p>
                )}
              </Field>

              <Field label="Sektor Industri" required>
                <select
                  className={inputCls}
                  value={form.industri}
                  onChange={set("industri")}
                >
                  <option value="">Pilih industri...</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
                {errors.industri && (
                  <p className="text-xs text-red-500">{errors.industri}</p>
                )}
              </Field>
            </div>
          )}

          {/* Step 2 — Kontak */}
          {step === 2 && (
            <div className="flex flex-col gap-5">
              <Field label="Nomor WhatsApp" required>
                <input
                  className={inputCls}
                  placeholder="628xxxxxxxxxx (tanpa +)"
                  value={form.whatsapp}
                  onChange={set("whatsapp")}
                />
                {errors.whatsapp && (
                  <p className="text-xs text-red-500">{errors.whatsapp}</p>
                )}
              </Field>

              <Field label="Email">
                <input
                  type="email"
                  className={inputCls}
                  placeholder="kamu@email.com"
                  value={form.email}
                  onChange={set("email")}
                />
              </Field>

              <Field label="URL LinkedIn">
                <input
                  className={inputCls}
                  placeholder="https://linkedin.com/in/..."
                  value={form.linkedin}
                  onChange={set("linkedin")}
                />
              </Field>

              <Field label="Username Instagram">
                <input
                  className={inputCls}
                  placeholder="@username"
                  value={form.instagram}
                  onChange={set("instagram")}
                />
              </Field>

              {errors.submit && (
                <p className="text-xs text-red-500">{errors.submit}</p>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex justify-between gap-3">
            {step > 0 ? (
              <button
                onClick={back}
                className="flex items-center gap-1.5 rounded-xl border border-stone-200 px-5 py-3 text-sm font-medium text-stone-600 hover:border-stone-300 hover:bg-stone-50"
              >
                <ChevronLeft className="h-4 w-4" />
                Kembali
              </button>
            ) : (
              <div />
            )}

            {step < STEPS.length - 1 ? (
              <button
                onClick={next}
                className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-950 hover:bg-amber-400"
              >
                Lanjut
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-950 hover:bg-amber-400 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-stone-950 border-t-transparent" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Daftarkan Saya
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
