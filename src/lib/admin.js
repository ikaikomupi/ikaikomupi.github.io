const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxqSdSZYTx780y-3syx0MkeMRfEo1hBDGKAO7jrzAfpBokAdgL3W7KhxQyJH-V_HBb3xA/exec";

async function post(payload) {
  await fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(payload),
  });
  return { ok: true };
}

export function addEvent(data) {
  return post({ type: "event", ...data });
}

export function addPost(data) {
  return post({ type: "post", ...data });
}
