const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxqSdSZYTx780y-3syx0MkeMRfEo1hBDGKAO7jrzAfpBokAdgL3W7KhxQyJH-V_HBb3xA/exec";

export async function submitRegistration(data) {
  await fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  });
  return { ok: true };
}
