import { createClient } from "@supabase/supabase-js";

// Nilai publik: aman ditaruh di kode website. Keamanan data dijaga Row Level Security
// (lihat supabase/migrations). JANGAN pernah menaruh secret key (sb_secret_...) di sini.
export const SUPABASE_URL = "https://uymrybcwguwyeqrojnyw.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = ""; // sb_publishable_... dari Settings → API Keys

// Tombol "Masuk dengan Google" hanya muncul setelah provider Google diaktifkan di dashboard.
export const LOGIN_GOOGLE_AKTIF = false;

export const supabase =
  SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY ? createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY) : null;
