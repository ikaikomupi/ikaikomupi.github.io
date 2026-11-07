// Analytics tanpa cookie (GoatCounter). Nonaktif selama kode kosong.
// Cara aktifkan: daftar gratis di https://www.goatcounter.com, pilih kode (mis. "ikaikomupi"),
// lalu isi GOATCOUNTER_CODE di bawah. Data yang dikirim hanya path halaman, tanpa data pribadi.
export const GOATCOUNTER_CODE = "";

let siap = null;
function muat() {
  if (!GOATCOUNTER_CODE) return Promise.resolve(false);
  if (!siap) {
    siap = new Promise((resolve) => {
      window.goatcounter = { no_onload: true };
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://gc.zgo.at/count.js";
      s.dataset.goatcounter = `https://${GOATCOUNTER_CODE}.goatcounter.com/count`;
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.head.appendChild(s);
    });
  }
  return siap;
}

export function catatHalaman(path) {
  muat().then((ok) => ok && window.goatcounter?.count?.({ path }));
}
