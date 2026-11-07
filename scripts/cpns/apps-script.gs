// Google Apps Script untuk form "Lapor Hasil" KOMpas ASN.
// Dipasang di spreadsheet PUBLIK website (yang dibaca opensheet).
// Nama & kontak ditulis ke spreadsheet PRIVAT terpisah, karena opensheet bisa membaca semua tab di spreadsheet publik.

const PRIVATE_SHEET_ID = ""; // ID spreadsheet privat untuk kontak alumni

const PUB_COLS = ["tanggal", "tahun", "kategori", "jabatan", "instansi", "jenis_formasi", "provinsi", "twk", "tiu", "tkp", "skb", "hasil", "tips", "boleh_statistik"];
const PRIV_COLS = ["tanggal", "nama", "kontak", "jabatan", "instansi", "tahun"];

function sheet_(ss, name, cols) {
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(cols);
  }
  return sh;
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  if (data.tipe !== "cpns" || !data.publik || data.publik.boleh_statistik !== "ya") {
    return ContentService.createTextOutput("ditolak");
  }
  const tanggal = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd");
  const pub = sheet_(SpreadsheetApp.getActiveSpreadsheet(), "cpns_publik", PUB_COLS);
  pub.appendRow(PUB_COLS.map((k) => (k === "tanggal" ? tanggal : String(data.publik[k] ?? "").slice(0, 1000))));

  if (data.kontak && PRIVATE_SHEET_ID) {
    const priv = sheet_(SpreadsheetApp.openById(PRIVATE_SHEET_ID), "cpns_kontak", PRIV_COLS);
    priv.appendRow(PRIV_COLS.map((k) => (k === "tanggal" ? tanggal : String(data.kontak[k] ?? "").slice(0, 200))));
  }
  return ContentService.createTextOutput("ok");
}
