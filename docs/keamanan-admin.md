# Keamanan halaman admin

Sebelumnya password admin ditulis di kode website. Kode website dikirim utuh ke browser setiap pengunjung,
jadi siapa pun bisa membacanya. Selain itu, Apps Script menerima data event/artikel tanpa pemeriksaan apa pun.

Sekarang website tidak menyimpan password. Admin mengetik **kunci admin**, dan kunci itu dikirim bersama data
sebagai `admin_key`. Pemeriksaannya harus dilakukan di Apps Script, karena hanya server yang bisa menyimpan rahasia.

## Langkah (sekali saja, ±5 menit)

1. Buka spreadsheet website → Extensions → Apps Script.
2. Project Settings → Script Properties → Add property:
   - Property: `ADMIN_KEY`
   - Value: kunci acak yang panjang (mis. 24 karakter). Bagikan hanya ke pengurus.
3. Di fungsi `doPost(e)`, tambahkan pemeriksaan ini **di baris paling atas**, sebelum data ditulis:

```js
function doPost(e) {
  const data = JSON.parse(e.postData.contents);

  // Event dan artikel hanya boleh ditambah admin.
  if (data.type === "event" || data.type === "post") {
    const kunci = PropertiesService.getScriptProperties().getProperty("ADMIN_KEY");
    if (!kunci || data.admin_key !== kunci) {
      return ContentService.createTextOutput("ditolak");
    }
  }
  delete data.admin_key; // jangan sampai kunci ikut tertulis ke sheet

  // ...kode lama yang menulis data ke sheet...
}
```

4. Deploy → Manage deployments → Edit → Version: New version → Deploy.
   URL web app tetap sama, jadi website tidak perlu diubah.

## Catatan

- Selama langkah di atas belum dilakukan, kunci apa pun akan diterima (sama seperti sebelumnya, Apps Script tidak memeriksa apa-apa).
- Pendaftaran alumni (form Daftar) tidak butuh kunci.
- Karena website mengirim dengan mode `no-cors`, halaman admin tidak bisa tahu apakah server menolak.
  Cek sheet setelah menyimpan. Kalau data tidak muncul, kunci yang dipakai salah.
- Nomor WA dan email dari form Daftar jangan dipindahkan ke tab publik `1`. Simpan di tab atau spreadsheet terpisah yang tidak dibagikan publik,
  karena opensheet bisa membaca seluruh isi spreadsheet publik.
