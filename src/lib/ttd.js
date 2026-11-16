import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";

// Hash SHA-256 (hex) dari isi file, dipakai sebagai "sidik jari" dokumen.
export async function sha256Hex(bytes) {
  const buf = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

export const urlVerifikasi = (id) => `${location.origin}/ttd/v/${id}`;

// Font standar PDF hanya mendukung karakter Latin-1; karakter lain diganti supaya tidak error.
const aman = (s) => (s || "").normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^\x20-\x7E\xA0-\xFF]/g, "?");

export async function infoPdf(bytes) {
  const pdf = await PDFDocument.load(bytes);
  return { halaman: pdf.getPageCount() };
}

// Buang area kosong di sekeliling coretan supaya TTD pas di kotak.
export function potongKanvas(canvas) {
  const ctx = canvas.getContext("2d");
  const { width: w, height: h } = canvas;
  const px = ctx.getImageData(0, 0, w, h).data;
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (px[(y * w + x) * 4 + 3] > 0) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }
  if (x1 < 0) return null;
  const pad = 4;
  x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad);
  x1 = Math.min(w - 1, x1 + pad); y1 = Math.min(h - 1, y1 + pad);
  const out = document.createElement("canvas");
  out.width = x1 - x0 + 1;
  out.height = y1 - y0 + 1;
  out.getContext("2d").drawImage(canvas, x0, y0, out.width, out.height, 0, 0, out.width, out.height);
  return out.toDataURL("image/png");
}

const formatWaktu = (d) =>
  new Intl.DateTimeFormat("id-ID", { dateStyle: "long", timeStyle: "short", timeZone: "Asia/Jakarta" }).format(d) + " WIB";

// Tempel kotak TTD (gambar TTD, nama, jabatan, waktu, QR verifikasi) ke halaman yang dipilih.
export async function tempelTtd(bytes, { id, ttdPng, nama, jabatan, halaman, posisi }) {
  const pdf = await PDFDocument.load(bytes);
  const page = pdf.getPage(halaman - 1);
  const { width: pw } = page.getSize();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const ttd = await pdf.embedPng(ttdPng);
  const qr = await pdf.embedPng(await QRCode.toDataURL(urlVerifikasi(id), { margin: 1, width: 240, errorCorrectionLevel: "M" }));

  const W = 230, H = 104, M = 36, QR = 58;
  const x = posisi === "kiri" ? M : posisi === "tengah" ? (pw - W) / 2 : pw - W - M;
  const y = M;
  const tinta = rgb(0.05, 0.12, 0.3);
  const abu = rgb(0.4, 0.4, 0.4);

  page.drawRectangle({ x, y, width: W, height: H, borderColor: rgb(0.75, 0.75, 0.75), borderWidth: 0.6, color: rgb(1, 1, 1), opacity: 0.92 });
  page.drawImage(qr, { x: x + 6, y: y + H - QR - 6, width: QR, height: QR });
  page.drawText("Pindai untuk", { x: x + 6, y: y + H - QR - 15, size: 5.5, font, color: abu });
  page.drawText("verifikasi", { x: x + 6, y: y + H - QR - 21.5, size: 5.5, font, color: abu });

  // Gambar TTD dimuat proporsional ke area kanan atas.
  const ax = x + QR + 14, aw = W - QR - 20, ah = 44, ay = y + H - ah - 6;
  const s = Math.min(aw / ttd.width, ah / ttd.height);
  page.drawImage(ttd, { x: ax + (aw - ttd.width * s) / 2, y: ay + (ah - ttd.height * s) / 2, width: ttd.width * s, height: ttd.height * s });
  page.drawLine({ start: { x: ax, y: ay - 2 }, end: { x: ax + aw, y: ay - 2 }, thickness: 0.5, color: abu });

  let ty = ay - 12;
  const tulis = (t, size, f, color = tinta) => {
    let teks = aman(t);
    while (teks.length > 1 && f.widthOfTextAtSize(teks, size) > aw) teks = teks.slice(0, -1);
    page.drawText(teks, { x: ax, y: ty, size, font: f, color });
    ty -= size + 3;
  };
  tulis(nama, 8.5, bold);
  if (jabatan) tulis(jabatan, 7, font);
  tulis("Ditandatangani secara elektronik", 5.5, font, abu);
  tulis(formatWaktu(new Date()), 5.5, font, abu);
  page.drawText(`ID ${id.slice(0, 8)}`, { x: x + 6, y: y + H - QR - 30, size: 5.5, font: bold, color: abu });

  pdf.setModificationDate(new Date());
  return pdf.save();
}
