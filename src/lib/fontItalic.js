// Fraunces italic (~65 KB) hanya dipakai di halaman Calon Ketua dan AD/ART,
// jadi tidak ikut dimuat di semua halaman lewat index.html.
let sudah = false;
export function muatFontItalic() {
  if (sudah || typeof document === "undefined") return;
  sudah = true;
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,400..900&display=swap";
  document.head.appendChild(l);
}
