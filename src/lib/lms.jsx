import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { supabase, LOGIN_GOOGLE_AKTIF } from "./supabase";

// Penyimpanan progres LMS.
// - Belum login (atau Supabase belum disambungkan): progres disimpan di browser (localStorage).
// - Sudah login: progres disimpan di Supabase. Progres lokal yang ada dipindahkan sekali ke akun.
const KEY = "kompas-lms";
const kosong = () => ({ profil: {}, bab: {}, percobaan: [] });

function bacaLokal() {
  try {
    return { ...kosong(), ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return kosong();
  }
}
function tulisLokal(d) {
  try {
    localStorage.setItem(KEY, JSON.stringify(d));
  } catch {
    /* penyimpanan diblokir: progres hanya bertahan selama halaman terbuka */
  }
}
const adaIsiLokal = (d) => Object.keys(d.bab).length > 0 || d.percobaan.length > 0;

const LmsContext = createContext(null);
export const useLms = () => useContext(LmsContext);
export const loginTersedia = Boolean(supabase);
export { LOGIN_GOOGLE_AKTIF };

export function LmsProvider({ children }) {
  const [user, setUser] = useState(null);
  const [siap, setSiap] = useState(!supabase);
  const [data, setData] = useState(bacaLokal);
  const [error, setError] = useState(null);

  // Pantau sesi login.
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data: s }) => {
      setUser(s.session?.user ?? null);
      setSiap(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);

  // Muat data akun + pindahkan progres lokal sekali.
  const muatServer = useCallback(async (u) => {
    const lokal = bacaLokal();
    if (adaIsiLokal(lokal)) {
      const babRows = Object.entries(lokal.bab).map(([bab_id, v]) => ({
        user_id: u.id, bab_id, skor_terbaik: v.skor, selesai_at: v.selesai_at, diperbarui_at: new Date().toISOString(),
      }));
      if (babRows.length) await supabase.from("progres_bab").upsert(babRows, { onConflict: "user_id,bab_id", ignoreDuplicates: true });
      if (lokal.percobaan.length)
        await supabase.from("percobaan").insert(
          lokal.percobaan.slice(-50).map(({ jenis, ref, skor, rincian, durasi_detik, dibuat_at }) => ({ jenis, ref, skor, rincian, durasi_detik, dibuat_at }))
        );
      tulisLokal(kosong());
    }
    const [p, b, c] = await Promise.all([
      supabase.from("profil").select("*").eq("id", u.id).maybeSingle(),
      supabase.from("progres_bab").select("bab_id, skor_terbaik, selesai_at").eq("user_id", u.id),
      supabase.from("percobaan").select("jenis, ref, skor, rincian, durasi_detik, dibuat_at").eq("user_id", u.id).order("dibuat_at", { ascending: false }).limit(100),
    ]);
    if (p.error || b.error || c.error) throw p.error || b.error || c.error;
    if (!p.data) await supabase.from("profil").insert({ id: u.id });
    setData({
      profil: p.data || {},
      bab: Object.fromEntries((b.data || []).map((r) => [r.bab_id, { skor: r.skor_terbaik, selesai_at: r.selesai_at }])),
      percobaan: (c.data || []).reverse(),
    });
  }, []);

  useEffect(() => {
    if (!user) {
      setData(bacaLokal());
      return;
    }
    muatServer(user).catch(() => setError("Gagal memuat progres dari server. Coba muat ulang halaman."));
  }, [user, muatServer]);

  // ---------- Aksi ----------
  const simpanBab = useCallback(
    async (babId, skor) => {
      const lama = data.bab[babId];
      const terbaik = Math.max(skor, lama?.skor ?? 0);
      const selesai_at = lama?.selesai_at || (skor >= 60 ? new Date().toISOString() : null);
      const baru = { ...data, bab: { ...data.bab, [babId]: { skor: terbaik, selesai_at } } };
      setData(baru);
      if (user) {
        const { error: e } = await supabase
          .from("progres_bab")
          .upsert({ user_id: user.id, bab_id: babId, skor_terbaik: terbaik, selesai_at, diperbarui_at: new Date().toISOString() });
        if (e) setError("Progres gagal tersimpan ke server.");
      } else tulisLokal(baru);
    },
    [data, user]
  );

  const simpanPercobaan = useCallback(
    async ({ jenis, ref, skor, rincian = {}, durasi_detik = null }) => {
      const row = { jenis, ref, skor: Math.round(skor), rincian, durasi_detik, dibuat_at: new Date().toISOString() };
      setData((d) => {
        const baru = { ...d, percobaan: [...d.percobaan, row].slice(-100) };
        if (!user) tulisLokal(baru);
        return baru;
      });
      if (user) {
        const { error: e } = await supabase.from("percobaan").insert(row);
        if (e) setError("Hasil gagal tersimpan ke server.");
      }
    },
    [user]
  );

  const simpanProfil = useCallback(
    async (perubahan) => {
      const profil = { ...data.profil, ...perubahan };
      setData((d) => ({ ...d, profil }));
      if (user) {
        const { error: e } = await supabase.from("profil").update({ ...perubahan, diperbarui_at: new Date().toISOString() }).eq("id", user.id);
        if (e) {
          setError("Profil gagal tersimpan.");
          return false;
        }
      } else tulisLokal({ ...data, profil });
      return true;
    },
    [data, user]
  );

  const kirimKode = (email) =>
    supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true, emailRedirectTo: `${location.origin}/cpns/belajar` } });
  const verifikasiKode = (email, token) => supabase.auth.verifyOtp({ email, token, type: "email" });
  const masukGoogle = () => supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${location.origin}/cpns/belajar` } });
  const keluar = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const pengurus = user?.app_metadata?.role === "pengurus";

  const nilai = useMemo(
    () => ({ user, siap, data, error, setError, pengurus, simpanBab, simpanPercobaan, simpanProfil, kirimKode, verifikasiKode, masukGoogle, keluar }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, siap, data, error, pengurus, simpanBab, simpanPercobaan, simpanProfil]
  );
  return <LmsContext.Provider value={nilai}>{children}</LmsContext.Provider>;
}

// ---------- Data materi & bank soal ----------
let cacheKonten = null;
export function useKonten() {
  const [s, setS] = useState({ loading: true, error: null, kurikulum: null, soal: [] });
  useEffect(() => {
    if (!cacheKonten)
      cacheKonten = Promise.all([
        fetch("/data/cpns/lms/kurikulum.json").then((r) => r.json()),
        fetch("/data/cpns/latihan.json").then((r) => r.json()),
      ]).catch((e) => {
        cacheKonten = null;
        throw e;
      });
    let alive = true;
    cacheKonten
      .then(([k, l]) => alive && setS({ loading: false, error: null, kurikulum: k, soal: l.soal }))
      .catch(() => alive && setS({ loading: false, error: "Materi gagal dimuat. Coba muat ulang halaman.", soal: [], kurikulum: null }));
    return () => {
      alive = false;
    };
  }, []);
  return s;
}

export const semuaBab = (kurikulum) => kurikulum.modul.flatMap((m) => m.bab.map((b) => ({ ...b, modul: m })));
