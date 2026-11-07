# Upload foto di form Daftar

Form Daftar sudah bisa memperkecil foto di browser (maks 400px, JPEG) dan mengirimnya sebagai `foto_base64`.
Fitur ini **nonaktif** sampai Apps Script bisa menyimpannya.

## Aktifkan

1. Buat folder Google Drive untuk foto alumni. Set berbagi: *Anyone with the link → Viewer*. Salin ID foldernya dari URL.
2. Di Apps Script, dalam `doPost(e)` sebelum data ditulis ke sheet, tambahkan:

```js
const FOLDER_FOTO = "ID_FOLDER_DRIVE";

if (data.foto_base64) {
  const [meta, isi] = data.foto_base64.split(",");
  if (/^data:image\/jpeg;base64$/.test(meta) && isi.length < 400000) {
    const blob = Utilities.newBlob(Utilities.base64Decode(isi), "image/jpeg", `${Date.now()}.jpg`);
    const file = DriveApp.getFolderById(FOLDER_FOTO).createFile(blob);
    data.foto_url = `https://drive.google.com/thumbnail?id=${file.getId()}&sz=w400`;
  }
}
delete data.foto_base64; // jangan tulis teks base64 ke sheet (batas 50.000 karakter per sel)
```

3. Deploy → Manage deployments → Edit → New version → Deploy.
4. Ubah `FOTO_UPLOAD_AKTIF` jadi `true` di `src/lib/form.js`, commit, push.
