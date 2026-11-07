const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxqSdSZYTx780y-3syx0MkeMRfEo1hBDGKAO7jrzAfpBokAdgL3W7KhxQyJH-V_HBb3xA/exec";

// Upload foto langsung dari form. Aktifkan SETELAH Apps Script diperbarui
// (lihat docs/foto-upload.md), karena script lama tidak tahu cara menyimpan foto.
export const FOTO_UPLOAD_AKTIF = false;

export async function submitRegistration(data) {
  const { foto_base64, ...rest } = data;
  const payload = FOTO_UPLOAD_AKTIF && foto_base64 ? { ...rest, foto_base64 } : rest;
  await fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(payload),
  });
  return { ok: true };
}

// Perkecil foto di browser (maks 400px, JPEG) supaya kiriman ringan.
export function kecilkanFoto(file, maks = 400) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const skala = Math.min(1, maks / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * skala);
      c.height = Math.round(img.height * skala);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Gambar tidak bisa dibaca"));
    };
    img.src = url;
  });
}
