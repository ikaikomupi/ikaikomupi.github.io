-- Lapisan pengaman kedua di samping RLS: cabut hak bawaan yang tidak dipakai website.
revoke delete on public.profil, public.progres_bab, public.percobaan from authenticated;
revoke update on public.percobaan from authenticated;
revoke insert, update, delete, truncate, references, trigger on public.peringkat from authenticated;
revoke truncate, references, trigger on public.profil, public.progres_bab, public.percobaan from authenticated;
