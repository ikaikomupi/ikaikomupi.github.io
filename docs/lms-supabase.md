# Mengaktifkan login LMS KOMpas ASN (Supabase)

Tanpa langkah ini LMS tetap jalan, tapi progres hanya tersimpan di browser masing-masing dan peringkat tidak aktif.

Project: `uymrybcwguwyeqrojnyw` (https://supabase.com/dashboard/project/uymrybcwguwyeqrojnyw)

## Status (8 Nov 2026)

Sudah: CLI terhubung, database + RLS terpasang (2 migration), pengaturan auth (site URL, redirect URL, kode 6 digit) terpasang, publishable key dipasang di `src/lib/supabase.js`.
Belum: login Google atau SMTP sendiri (langkah 4). Template email kode 6 digit baru bisa dipasang setelah SMTP aktif: buka komentar blok template di `supabase/config.toml`, lalu `supabase config push --remote=uymrybcwguwyeqrojnyw`. Sampai saat itu email berisi link masuk.

Catatan CLI: jalankan perintah yang mengubah project dengan `--remote` dan `--yes`, dan `supabase login` harus dari aplikasi Terminal (butuh terminal interaktif).

## 1. Login CLI dengan akun pemilik project

CLI di laptop ini sekarang login dengan akun yang **tidak punya akses** ke project di atas (error 403).

```
supabase logout
supabase login          # pilih akun yang membuat project uymrybcwguwyeqrojnyw
supabase link --project-ref uymrybcwguwyeqrojnyw
```

`link` akan meminta password database (Settings → Database di dashboard).

## 2. Terapkan database dan pengaturan login

```
supabase db push        # membuat tabel profil, progres_bab, percobaan, view peringkat + RLS
supabase config diff    # cek perubahan pengaturan auth
supabase config push    # site URL, redirect URL, template email kode 6 digit
```

## 3. Pasang publishable key di website

Dashboard → Settings → API Keys → salin **Publishable key** (`sb_publishable_...`).
Tempel ke `SUPABASE_PUBLISHABLE_KEY` di `src/lib/supabase.js`. Jangan pakai secret key (`sb_secret_...`).

## 4. Buka login untuk semua alumni (wajib pilih minimal satu)

Email bawaan Supabase **hanya mengirim ke anggota tim project, maksimal 2 email per jam**. Alumni lain akan ditolak.

- **Login Google (disarankan, gratis):** buat OAuth Client ID di Google Cloud Console (tipe Web application),
  isi Authorized redirect URI dengan `https://uymrybcwguwyeqrojnyw.supabase.co/auth/v1/callback`,
  lalu masukkan Client ID dan Secret di Dashboard → Authentication → Sign In / Providers → Google.
  Setelah itu ubah `LOGIN_GOOGLE_AKTIF` jadi `true` di `src/lib/supabase.js`.
- **SMTP sendiri** (supaya login kode email jalan untuk semua): misalnya Resend atau Brevo (ada paket gratis).
  Isi di Dashboard → Authentication → Emails → SMTP Settings.

## 5. Jadikan pengurus (opsional)

Supaya bisa membuka halaman Statistik pengurus. Jalankan di SQL Editor setelah orangnya pernah login:

```sql
update auth.users
set raw_app_meta_data = raw_app_meta_data || '{"role": "pengurus"}'
where email = 'email-pengurus@contoh.com';
```

Pengurus perlu keluar dan masuk lagi supaya perubahannya terbaca.

## Catatan keamanan

- Semua tabel memakai Row Level Security: peserta hanya bisa membaca dan menulis datanya sendiri.
  Profil dan skor tryout orang lain hanya terlihat kalau orang itu memilih tampil di peringkat.
- Riwayat percobaan tidak bisa diubah atau dihapus dari website.
- Skor dihitung di browser peserta, jadi peringkat sebaiknya dianggap penyemangat, bukan hasil resmi.
