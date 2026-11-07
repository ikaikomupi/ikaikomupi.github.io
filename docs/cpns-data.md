# Format data KOMpas ASN (`/cpns`)

Hasil scrape cukup ditaruh di `public/data/cpns/formasi.json`, lalu cek dengan:

```
npm run cpns:cek
```

Kalau lolos cek, commit dan push. Website otomatis memakai data baru.

## `formasi.json`

```json
{
  "diperbarui": "2026-11-08",
  "formasi": [ { ...satu baris per formasi per tahun... } ]
}
```

| Field | Wajib | Isi |
|---|---|---|
| `id` | ya | Unik. Saran: `<tahun>-<kode formasi SSCASN>` |
| `asli` | ya | `true` untuk data asli. `false` hanya untuk data contoh |
| `tahun` | ya | Tahun seleksi, angka (2021, 2023, 2024, …) |
| `instansi` | ya | Nama instansi, ditulis konsisten antar tahun (mis. `Kementerian Agama`) |
| `unit` | tidak | Unit/lokasi penempatan (mis. `Kanwil Kemenag Provinsi Papua`) |
| `jenis_instansi` | ya | `Pusat` (kementerian/lembaga) atau `Daerah` (pemda) |
| `provinsi` | tidak | Salah satu dari 34 nama provinsi di `src/data/petaProvinsi.js`. `null` kalau belum terpetakan. Provinsi hasil pemekaran 2022 ditulis sebagai provinsi induknya |
| `jabatan` | ya | Nama jabatan persis dari SSCASN |
| `kategori` | ya | `Primer` (humas), `Sekunder` (campuran: protokol, fasilitator, semua jurusan), `S-2 ke atas` (dosen, widyaiswara, peneliti) |
| `pendidikan` | ya | `S-1` atau `S-2`. Jabatan terampil/D-III tidak dimasukkan |
| `jurusan` | ya | Array nama jurusan persis seperti di lampiran formasi |
| `jenis_formasi` | ya | `Umum`, `Cumlaude`, `Disabilitas`, atau `Putra/Putri Papua` |
| `kuota` | ya | Jumlah kursi |
| `pelamar` | tidak* | Jumlah pelamar |
| `peserta` | tidak* | Jumlah peserta hadir SKD |
| `lolos_pg` | tidak* | Jumlah peserta lolos ambang batas SKD |
| `skd_min` | tidak | Skor SKD terendah yang lolos ke SKB |
| `kursi_terisi` | tidak | Kursi yang terisi setelah pengumuman akhir |
| `peserta_skb` | tidak | Jumlah peserta SKB |
| `gagal_psikotes` | tidak | Jumlah peserta SKB yang gugur psikotes |
| `nilai_akhir_median` | tidak | Median nilai akhir pemenang |
| `sumber` | ya | Sumber data (nama dokumen / situs) |

\* Minimal satu dari `pelamar`, `peserta`, `lolos_pg` harus ada. Persaingan dihitung dari yang paling akurat: `lolos_pg` → `peserta` → `pelamar`.

Supaya rentang skor antar tahun jalan, formasi yang sama di tahun berbeda harus punya `instansi`, `unit`, `jabatan`, dan `jenis_formasi` yang ditulis persis sama.

## `referensi.json` (opsional)

Info tambahan per instansi untuk pertimbangan selain persaingan. Isi hanya kalau ada sumbernya.

```json
{ "instansi": { "Kementerian Agama": { "tukin": "…", "aturan_pindah": "…", "sumber": "…" } } }
```

## Form Lapor Hasil

1. Buat **spreadsheet privat baru** untuk kontak alumni (jangan dibagikan publik).
2. Buka spreadsheet publik website, menu Extensions → Apps Script, tempel isi `scripts/cpns/apps-script.gs`, isi `PRIVATE_SHEET_ID`.
3. Deploy → New deployment → Web app, *Execute as: Me*, *Who has access: Anyone*. Salin URL-nya.
4. Tempel URL itu ke `CPNS_FORM_URL` di `src/lib/cpns.js`, commit, push.

Tab `cpns_publik` (tanpa nama/kontak) dibaca website lewat opensheet. Tab kontak ada di spreadsheet privat dan tidak pernah dibaca website.
