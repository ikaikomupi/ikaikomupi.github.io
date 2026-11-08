import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useCpnsData, formatTanggal } from "../lib/cpns";
import { LmsProvider } from "../lib/lms";
import { CpnsHeader, Memuat } from "./cpns/ui";

const Ringkasan = lazy(() => import("./cpns/Ringkasan"));
const Rekomendasi = lazy(() => import("./cpns/Rekomendasi"));
const Lapor = lazy(() => import("./cpns/Lapor"));
const Belajar = lazy(() => import("./cpns/belajar/Belajar"));
const Bab = lazy(() => import("./cpns/belajar/Bab"));
const TryoutSkd = lazy(() => import("./cpns/belajar/Tryout").then((m) => ({ default: m.TryoutSkd })));
const LatihanModul = lazy(() => import("./cpns/belajar/Tryout").then((m) => ({ default: m.LatihanModul })));
const Akun = lazy(() => import("./cpns/belajar/Akun"));
const Peringkat = lazy(() => import("./cpns/belajar/Peringkat"));
const Pengurus = lazy(() => import("./cpns/belajar/Pengurus"));
const Skb = lazy(() => import("./cpns/Skb"));
const Gaji = lazy(() => import("./cpns/Gaji"));
const Metodologi = lazy(() => import("./cpns/Metodologi"));

export default function CpnsPage() {
  const { diperbarui } = useCpnsData();
  return (
    <div className="min-h-screen bg-stone-950 pt-16">
      <CpnsHeader diperbarui={formatTanggal(diperbarui)} />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <LmsProvider>
        <Suspense fallback={<Memuat />}>
          <Routes>
            <Route index element={<Ringkasan />} />
            <Route path="rekomendasi" element={<Rekomendasi />} />
            <Route path="belajar" element={<Belajar />} />
            <Route path="belajar/bab/:babId" element={<Bab />} />
            <Route path="belajar/tryout" element={<TryoutSkd />} />
            <Route path="belajar/latihan/:modulId" element={<LatihanModul />} />
            <Route path="belajar/akun" element={<Akun />} />
            <Route path="belajar/peringkat" element={<Peringkat />} />
            <Route path="belajar/pengurus" element={<Pengurus />} />
            <Route path="latihan" element={<Navigate to="/cpns/belajar" replace />} />
            <Route path="lapor" element={<Lapor />} />
            <Route path="skb" element={<Skb />} />
            <Route path="gaji" element={<Gaji />} />
            <Route path="metodologi" element={<Metodologi />} />
            <Route path="*" element={<Navigate to="/cpns" replace />} />
          </Routes>
        </Suspense>
        </LmsProvider>
      </div>
    </div>
  );
}
