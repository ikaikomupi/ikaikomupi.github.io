-- LMS KOMpas ASN: profil peserta, progres per bab, dan riwayat kuis/tryout.
-- Semua tabel memakai Row Level Security: peserta hanya bisa membaca & menulis datanya sendiri,
-- kecuali profil + skor tryout milik peserta yang memilih tampil di peringkat.
-- Pengurus IKA (app_metadata.role = 'pengurus') bisa membaca semua untuk statistik.

-- ---------- Helper di schema privat (tidak diekspos lewat Data API) ----------
create schema if not exists private;

create or replace function private.is_pengurus()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'pengurus', false)
$$;

grant usage on schema private to authenticated;
grant execute on function private.is_pengurus() to authenticated;

-- ---------- Profil ----------
create table public.profil (
  id uuid primary key references auth.users (id) on delete cascade,
  nama_tampil text check (char_length(nama_tampil) <= 40),
  angkatan text check (char_length(angkatan) <= 10),
  tampil_di_peringkat boolean not null default false,
  target_tanggal date,
  target_skd integer check (target_skd between 0 and 550),
  dibuat_at timestamptz not null default now(),
  diperbarui_at timestamptz not null default now()
);

alter table public.profil enable row level security;

create policy "profil: baca milik sendiri, peserta peringkat, atau pengurus"
  on public.profil for select to authenticated
  using (id = (select auth.uid()) or tampil_di_peringkat or (select private.is_pengurus()));

create policy "profil: buat milik sendiri"
  on public.profil for insert to authenticated
  with check (id = (select auth.uid()));

create policy "profil: ubah milik sendiri"
  on public.profil for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- ---------- Progres per bab ----------
create table public.progres_bab (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  bab_id text not null check (char_length(bab_id) <= 60),
  skor_terbaik integer check (skor_terbaik between 0 and 100),
  selesai_at timestamptz,
  diperbarui_at timestamptz not null default now(),
  primary key (user_id, bab_id)
);

alter table public.progres_bab enable row level security;

create policy "progres: baca milik sendiri atau pengurus"
  on public.progres_bab for select to authenticated
  using (user_id = (select auth.uid()) or (select private.is_pengurus()));

create policy "progres: buat milik sendiri"
  on public.progres_bab for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy "progres: ubah milik sendiri"
  on public.progres_bab for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- ---------- Riwayat kuis, latihan SKB, dan tryout ----------
create table public.percobaan (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  jenis text not null check (jenis in ('kuis', 'skb', 'tryout')),
  ref text not null check (char_length(ref) <= 60),
  skor integer not null check (skor between 0 and 550),
  rincian jsonb not null default '{}'::jsonb check (pg_column_size(rincian) < 4000),
  durasi_detik integer check (durasi_detik between 0 and 20000),
  dibuat_at timestamptz not null default now()
);

create index percobaan_user_waktu_idx on public.percobaan (user_id, dibuat_at desc);
create index percobaan_jenis_skor_idx on public.percobaan (jenis, skor desc);

alter table public.percobaan enable row level security;

create policy "percobaan: baca milik sendiri, tryout peserta peringkat, atau pengurus"
  on public.percobaan for select to authenticated
  using (
    user_id = (select auth.uid())
    or (select private.is_pengurus())
    or (
      jenis = 'tryout'
      and exists (
        select 1 from public.profil p
        where p.id = percobaan.user_id and p.tampil_di_peringkat
      )
    )
  );

create policy "percobaan: buat milik sendiri"
  on public.percobaan for insert to authenticated
  with check (user_id = (select auth.uid()));

-- Tidak ada policy update/delete: riwayat percobaan tidak bisa diubah dari website.

-- ---------- Peringkat (view mengikuti RLS pemanggil) ----------
create view public.peringkat
with (security_invoker = true)
as
select
  p.id,
  p.nama_tampil,
  p.angkatan,
  max(c.skor) as skor_terbaik,
  count(*) as jumlah_tryout,
  max(c.dibuat_at) as terakhir
from public.profil p
join public.percobaan c on c.user_id = p.id and c.jenis = 'tryout'
where p.tampil_di_peringkat
group by p.id, p.nama_tampil, p.angkatan;

grant select on public.peringkat to authenticated;

-- ---------- Hak akses eksplisit (jangan bergantung pada default grant) ----------
revoke all on public.profil, public.progres_bab, public.percobaan, public.peringkat from anon;
grant select, insert, update on public.profil to authenticated;
grant select, insert, update on public.progres_bab to authenticated;
grant select, insert on public.percobaan to authenticated;
