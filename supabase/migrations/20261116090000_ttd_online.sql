-- TTD online (level 1): tanda tangan gambar + jejak audit + verifikasi hash.
-- - Penanda tangan harus login. Catatan TTD tidak bisa diubah/dihapus dari website (tidak ada policy
--   update/delete + trigger penolak), supaya jejak auditnya utuh.
-- - Publik (tanpa login) hanya bisa memverifikasi lewat fungsi verifikasi_ttd / cek_hash_ttd,
--   yang mengembalikan kolom terbatas (email disamarkan).
-- - PDF hasil TTD disimpan di bucket privat "ttd", folder per user: <user_id>/<id>.pdf

create table public.tanda_tangan (
  id uuid primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  nama_penanda text not null check (char_length(nama_penanda) between 2 and 80),
  jabatan text check (char_length(jabatan) <= 80),
  nama_dokumen text not null check (char_length(nama_dokumen) between 1 and 200),
  sha256_asli text not null check (sha256_asli ~ '^[0-9a-f]{64}$'),
  sha256 text not null unique check (sha256 ~ '^[0-9a-f]{64}$'),
  halaman integer not null check (halaman >= 1),
  file_path text check (char_length(file_path) <= 200),
  user_agent text check (char_length(user_agent) <= 400),
  ditandatangani_at timestamptz not null default now()
);

create index tanda_tangan_user_idx on public.tanda_tangan (user_id, ditandatangani_at desc);

alter table public.tanda_tangan enable row level security;

create policy "ttd: baca milik sendiri atau pengurus"
  on public.tanda_tangan for select to authenticated
  using (user_id = (select auth.uid()) or (select private.is_pengurus()));

create policy "ttd: buat milik sendiri"
  on public.tanda_tangan for insert to authenticated
  with check (user_id = (select auth.uid()));

-- Waktu TTD selalu dari server, bukan dari browser.
create or replace function private.ttd_waktu_server()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.ditandatangani_at := now();
  return new;
end;
$$;

create trigger tanda_tangan_waktu
  before insert on public.tanda_tangan
  for each row execute function private.ttd_waktu_server();

-- Hanya file_path yang boleh diisi belakangan (setelah upload); sisanya terkunci.
create or replace function private.ttd_tolak_ubah()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_op = 'DELETE' then
    raise exception 'Catatan tanda tangan tidak bisa dihapus';
  end if;
  if (to_jsonb(new) - 'file_path') <> (to_jsonb(old) - 'file_path') or old.file_path is not null then
    raise exception 'Catatan tanda tangan tidak bisa diubah';
  end if;
  return new;
end;
$$;

create trigger tanda_tangan_terkunci
  before update or delete on public.tanda_tangan
  for each row execute function private.ttd_tolak_ubah();

create policy "ttd: isi file_path milik sendiri"
  on public.tanda_tangan for update to authenticated
  using (user_id = (select auth.uid()) and file_path is null)
  with check (user_id = (select auth.uid()));

revoke update on public.tanda_tangan from authenticated;
grant update (file_path) on public.tanda_tangan to authenticated;
revoke all on public.tanda_tangan from anon;

-- ---------- Verifikasi publik ----------
create or replace function private.samarkan_email(e text)
returns text
language sql
immutable
set search_path = ''
as $$
  select case
    when e is null or position('@' in e) = 0 then null
    else left(split_part(e, '@', 1), 2) || '***@' || split_part(e, '@', 2)
  end
$$;

create or replace function public.verifikasi_ttd(p_id uuid)
returns table (
  id uuid,
  nama_penanda text,
  jabatan text,
  email_samaran text,
  nama_dokumen text,
  sha256 text,
  halaman integer,
  ditandatangani_at timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select t.id, t.nama_penanda, t.jabatan, private.samarkan_email(u.email), t.nama_dokumen,
         t.sha256, t.halaman, t.ditandatangani_at
  from public.tanda_tangan t
  left join auth.users u on u.id = t.user_id
  where t.id = p_id
$$;

create or replace function public.cek_hash_ttd(p_sha256 text)
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select t.id from public.tanda_tangan t where t.sha256 = lower(p_sha256)
$$;

revoke all on function public.verifikasi_ttd(uuid) from public;
revoke all on function public.cek_hash_ttd(text) from public;
grant execute on function public.verifikasi_ttd(uuid) to anon, authenticated;
grant execute on function public.cek_hash_ttd(text) to anon, authenticated;

-- ---------- Storage: bucket privat untuk PDF hasil TTD ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('ttd', 'ttd', false, 20971520, array['application/pdf'])
on conflict (id) do nothing;

create policy "ttd storage: upload ke folder sendiri"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'ttd' and (storage.foldername(name))[1] = (select auth.uid())::text);

create policy "ttd storage: baca folder sendiri atau pengurus"
  on storage.objects for select to authenticated
  using (bucket_id = 'ttd' and ((storage.foldername(name))[1] = (select auth.uid())::text or (select private.is_pengurus())));
