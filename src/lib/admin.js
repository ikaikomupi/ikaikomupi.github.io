const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxqSdSZYTx780y-3syx0MkeMRfEo1hBDGKAO7jrzAfpBokAdgL3W7KhxQyJH-V_HBb3xA/exec";

// Kunci admin TIDAK disimpan di kode website (kode website bisa dibaca siapa saja).
// Kunci diketik admin, disimpan sementara di tab browser, dan dikirim bersama data.
// Apps Script yang memeriksa kunci ini (lihat docs/keamanan-admin.md).
const KEY = "ika-admin-key";

export function getAdminKey() {
  try {
    return sessionStorage.getItem(KEY) || "";
  } catch {
    return "";
  }
}
export function setAdminKey(k) {
  try {
    k ? sessionStorage.setItem(KEY, k) : sessionStorage.removeItem(KEY);
  } catch {
    /* sessionStorage diblokir: admin perlu masuk ulang tiap muat halaman */
  }
}

async function post(payload) {
  await fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({ ...payload, admin_key: getAdminKey() }),
  });
  return { ok: true };
}

export function addEvent(data) {
  return post({ type: "event", ...data });
}

export function addPost(data) {
  return post({ type: "post", ...data });
}
