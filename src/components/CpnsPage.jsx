import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useCpnsData, formatTanggal } from "../lib/cpns";
import { CpnsHeader, Memuat } from "./cpns/ui";

const Ringkasan = lazy(() => import("./cpns/Ringkasan"));
const Rekomendasi = lazy(() => import("./cpns/Rekomendasi"));
const Lapor = lazy(() => import("./cpns/Lapor"));
const Latihan = lazy(() => import("./cpns/Latihan"));
const Skb = lazy(() => import("./cpns/Skb"));
const Metodologi = lazy(() => import("./cpns/Metodologi"));

export default function CpnsPage() {
  const { diperbarui } = useCpnsData();
  return (
    <div className="min-h-screen bg-stone-950 pt-16">
      <CpnsHeader diperbarui={formatTanggal(diperbarui)} />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <Suspense fallback={<Memuat />}>
          <Routes>
            <Route index element={<Ringkasan />} />
            <Route path="rekomendasi" element={<Rekomendasi />} />
            <Route path="latihan" element={<Latihan />} />
            <Route path="lapor" element={<Lapor />} />
            <Route path="skb" element={<Skb />} />
            <Route path="metodologi" element={<Metodologi />} />
            <Route path="*" element={<Navigate to="/cpns" replace />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}
