import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
import Navbar from "./components/Navbar";

const LandingPage = lazy(() => import("./components/LandingPage"));
const Directory = lazy(() => import("./components/Directory"));
const ProfilePage = lazy(() => import("./components/ProfilePage"));
const RegisterForm = lazy(() => import("./components/RegisterForm"));
const OrgPage = lazy(() => import("./components/OrgPage"));
const CecepPage = lazy(() => import("./components/CecepPage"));
const Admin = lazy(() => import("./components/Admin"));
const Events = lazy(() => import("./components/Events"));
const SetelahToga = lazy(() => import("./components/SetelahToga"));
const PostPage = lazy(() => import("./components/PostPage"));

function Layout() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");
  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <Suspense fallback={<div className="min-h-screen bg-stone-950" />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/organisasi" element={<OrgPage />} />
          <Route path="/calon-ketua" element={<CecepPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/events" element={<Events />} />
          <Route path="/setelah-toga" element={<SetelahToga />} />
          <Route path="/setelah-toga/:slug" element={<PostPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
