"""Impor Analisis_Formasi_IKOM_CPNS*.xlsx ke data KOMpas ASN.

Pakai:  python3 -I scripts/cpns/impor-analisis.py ~/Downloads/Analisis_Formasi_IKOM_CPNS2024.xlsx

Menulis:
  public/data/cpns/formasi.json      daftar formasi (data asli) + baris Pemprov Jabar yang sudah ada
  public/data/cpns/target-2024.json  target SKD per K/L, per wilayah, per kawasan (dari tab analisis)
  public/data/cpns/sebaran-2024.json pasangan nilai SKD-SKB peserta SKB per kategori (tanpa nomor peserta)

Privasi: nomor peserta dan pendidikan per orang TIDAK ditulis ke file keluaran.
Yang keluar hanya angka gabungan per formasi dan pasangan nilai tanpa identitas.
Hanya memakai pustaka standar Python.
"""
import html
import json
import re
import statistics
import sys
import zipfile
from collections import defaultdict
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "public" / "data" / "cpns"
SUMBER = "PDF resmi Hasil Integrasi SKD dan SKB CPNS 2024 (SSCASN/BKN) 14 instansi pusat, dianalisis tim IKA"

PROV_34 = {
    "Aceh", "Bali", "Banten", "Bengkulu", "DI Yogyakarta", "DKI Jakarta", "Gorontalo", "Jambi", "Jawa Barat",
    "Jawa Tengah", "Jawa Timur", "Kalimantan Barat", "Kalimantan Selatan", "Kalimantan Tengah", "Kalimantan Timur",
    "Kalimantan Utara", "Kepulauan Bangka Belitung", "Kepulauan Riau", "Lampung", "Maluku", "Maluku Utara",
    "Nusa Tenggara Barat", "Nusa Tenggara Timur", "Papua", "Papua Barat", "Riau", "Sulawesi Barat",
    "Sulawesi Selatan", "Sulawesi Tengah", "Sulawesi Tenggara", "Sulawesi Utara", "Sumatera Barat",
    "Sumatera Selatan", "Sumatera Utara",
}
# Provinsi hasil pemekaran 2022 dihitung ke provinsi induk (peta dasar masih 34 provinsi).
PEMEKARAN = {"Papua Selatan": "Papua", "Papua Tengah": "Papua", "Papua Pegunungan": "Papua", "Papua Barat Daya": "Papua Barat"}
KATEGORI = {"Primer": "Primer", "Sekunder": "Sekunder", "Akademik": "S-2 ke atas"}
KECIL = {"dan", "di", "ke", "dari", "yang", "atau", "untuk"}
SINGKATAN = {
    "uin", "iain", "iakn", "iahn", "stahn", "stakn", "upt", "uptd", "bbws", "bws", "bppw", "bpjn", "bbpjn", "bp2p", "bpw",
    "tni", "ad", "al", "au", "ri", "ptn", "ptki", "ptkin", "upn", "bkkbn", "pupr", "klhk", "dki", "ntb", "ntt", "bkn", "bpsdm",
    "ditjen", "kanwil", "lldikti", "rsud", "rsup", "poltekkes", "sma", "smk", "man", "mtsn", "min", "sdm", "ham", "kpu",
    "ii", "iii", "iv", "vi", "vii", "viii", "ix", "xi", "xii", "xiii", "xiv", "xv", "s-1", "s-2", "s-3",
}


def baca_xlsx(path):
    z = zipfile.ZipFile(path)
    ss = []
    if "xl/sharedStrings.xml" in z.namelist():
        ss = [html.unescape(re.sub(r"<[^>]+>", "", m)) for m in re.findall(r"<si>(.*?)</si>", z.read("xl/sharedStrings.xml").decode(), re.S)]
    wb = z.read("xl/workbook.xml").decode()
    rels = z.read("xl/_rels/workbook.xml.rels").decode()
    rmap = {re.search(r'Id="([^"]+)"', m).group(1): re.search(r'Target="([^"]+)"', m).group(1) for m in re.findall(r"<Relationship ([^>]*)/>", rels)}
    tabs = {}
    for nama, rid in re.findall(r'<sheet [^>]*name="([^"]+)"[^>]*r:id="([^"]+)"', wb):
        x = z.read("xl/" + rmap[rid].replace("/xl/", "").lstrip("/")).decode()
        rows = []
        for r in re.findall(r"<row[^>]*>(.*?)</row>", x, re.S):
            o = {}
            for attrs, body in re.findall(r"<c ([^>]*?)(?:/>|>(.*?)</c>)", r, re.S):
                t = re.search(r't="(\w+)"', attrs)
                v = re.search(r"<v>(.*?)</v>", body or "")
                if v:
                    col = re.search(r'r="([A-Z]+)', attrs).group(1)
                    o[col] = ss[int(v.group(1))] if (t and t.group(1) == "s") else v.group(1)
            rows.append(o)
        tabs[html.unescape(nama)] = rows
    return tabs


def tabel(rows, baris_header):
    """Ubah baris mentah jadi list dict berdasarkan baris header (index)."""
    h = rows[baris_header]
    out = []
    for r in rows[baris_header + 1:]:
        if not r or not any(r.values()):
            break
        out.append({h[c]: r.get(c) for c in h})
    return out


def cari_header(rows, kolom_pertama):
    for i, r in enumerate(rows):
        if r.get("A") == kolom_pertama and len(r) > 3:
            return i
    raise SystemExit(f"Header '{kolom_pertama}' tidak ditemukan")


def angka(v, bulat=False):
    if v in (None, ""):
        return None
    try:
        f = float(v)
    except ValueError:
        return None
    return int(round(f)) if bulat else round(f, 2)


def judul(s):
    def satu(i, w):
        inti = w.strip("()/,.-")
        if inti in SINGKATAN:
            return w.upper()
        if w in KECIL and i:
            return w
        return w[:1].upper() + w[1:]
    return " ".join(satu(i, w) for i, w in enumerate((s or "").strip().lower().split()))


def jenis_formasi(s):
    s = (s or "").upper()
    if s.startswith("LULUSAN TERBAIK"):
        return "Cumlaude"
    if s.startswith("PENYANDANG DISABILITAS"):
        return "Disabilitas"
    if s.startswith("PUTRA/PUTRI PAPUA"):
        return "Putra/Putri Papua"
    if s.startswith("PUTRA/PUTRI KALIMANTAN"):
        return "Putra/Putri Kalimantan"
    return "Umum"


def provinsi(s):
    s = (s or "").strip()
    s = PEMEKARAN.get(s, s)
    return s if s in PROV_34 else None


def main(path):
    tabs = baca_xlsx(path)
    D = tabel(tabs["Daftar Formasi"], 0)
    P = tabel(tabs["Peserta Formasi IKOM"], 0)

    # --- Statistik lulusan Ilmu Komunikasi per formasi (dari data per peserta) ---
    kunci = lambda r: (r["Kategori"], r["K/L"], r["Jabatan"], r["Unit"], r["Provinsi"])
    ikom = defaultdict(lambda: {"peserta": 0, "pemenang": 0})
    pemenang_skd = defaultdict(list)
    for r in P:
        k = kunci(r)
        if r.get("Pemenang") == "Ya" and angka(r.get("Total SKD")) is not None:
            pemenang_skd[k].append(angka(r["Total SKD"]))
        if "ILMU KOMUNIKASI" in (r.get("Pendidikan") or "").upper():
            ikom[k]["peserta"] += 1
            ikom[k]["pemenang"] += r.get("Pemenang") == "Ya"
    jumlah_kunci = defaultdict(int)
    for r in D:
        jumlah_kunci[kunci(r)] += 1

    formasi = []
    for i, r in enumerate(D):
        k = kunci(r)
        unik = jumlah_kunci[k] == 1  # statistik per peserta hanya dipasang kalau kuncinya tidak ambigu
        kursi = angka(r["Kursi"], True)
        kosong = angka(r["Kosong"], True) or 0
        jur = [j.strip() for j in (r.get("Pendidikan Formasi") or "").split("/") if "KOMUNIKASI" in j.upper()]
        formasi.append({
            "id": f"2024-{r.get('Kode Lokasi') or 'x'}-{r.get('Kode Jabatan') or 'x'}-{i}",
            "asli": True,
            "tahun": 2024,
            "instansi": r["K/L"],
            "unit": judul(r["Unit"]),
            "jenis_instansi": "Pusat",
            "wilayah": r["Wilayah"],
            "kawasan": (r.get("Kawasan") or "").replace("-", "–") or None,
            "provinsi": provinsi(r["Provinsi"]),
            "jabatan": judul(r["Jabatan"]),
            "kategori": KATEGORI[r["Kategori"]],
            "pendidikan": "S-2" if r["Kategori"] == "Akademik" else "S-1",
            "jurusan": [judul(j) for j in jur][:6] or ["Ilmu Komunikasi"],
            "jenis_formasi": jenis_formasi(r["Jenis Formasi"]),
            "kuota": kursi,
            "pelamar": None,
            "peserta": angka(r["Peserta SKB"], True),
            "lolos_pg": None,
            "skd_min": angka(r["SKD terendah peserta SKB"], True),
            "skd_max": angka(r["SKD tertinggi peserta SKB"], True),
            "skd_min_pemenang": angka(r["SKD terendah pemenang"], True),
            "skd_median_pemenang": round(statistics.median(pemenang_skd[k])) if unik and pemenang_skd[k] else None,
            "skb_min_pemenang": angka(r["SKB terendah pemenang"]),
            "nilai_akhir_min": angka(r["Nilai akhir terendah pemenang"]),
            "nilai_akhir_median": angka(r["Median nilai akhir pemenang"]),
            "kursi_terisi": kursi - kosong if kursi is not None else None,
            "peserta_skb": angka(r["Hadir"], True),
            "gagal_psikotes": angka(r["Gugur SKB (TMS-1)"], True),
            "peserta_ikom": ikom[k]["peserta"] if unik else None,
            "pemenang_ikom": ikom[k]["pemenang"] if unik else None,
        })
        formasi[-1] = {k: v for k, v in formasi[-1].items() if v is not None}

    # Pertahankan baris data asli lain (mis. Pemprov Jabar) yang bukan dari file ini.
    lama = json.loads((OUT / "formasi.json").read_text())
    jabar = [f for f in lama["formasi"] if f.get("asli") and f["instansi"] == "Pemprov Jawa Barat" and f.get("pendidikan") != "D-III"]
    for f in jabar:
        f.setdefault("wilayah", "Daerah - Jawa")
        f.setdefault("kawasan", "Jawa")
        f["jenis_instansi"] = "Daerah"

    (OUT / "formasi.json").write_text(json.dumps({
        "diperbarui": date.today().isoformat(),
        "catatan": "Data asli CPNS 2024: 14 instansi pusat (tim IKA) + Pemprov Jawa Barat. Belum mencakup K/L lain dan pemda lain.",
        "sumber": SUMBER,
        "formasi": formasi + jabar,
    }, ensure_ascii=False, separators=(",", ":")))

    # --- Target SKD dari tab analisis ---
    def target(nama_tab, kolom_kedua):
        rows = tabs[nama_tab]
        hasil = []
        for i, r in enumerate(rows):
            if r.get("A") == "Kategori" and r.get("B") == kolom_kedua:
                for row in tabel(rows, i):
                    hasil.append({
                        "kategori": KATEGORI.get(row["Kategori"], row["Kategori"]),
                        "nama": row[kolom_kedua],
                        "formasi": angka(row["Formasi"], True),
                        "kursi": angka(row["Kursi"], True),
                        "peserta_skb": angka(row["Peserta SKB"], True),
                        "pct_kosong": round((angka(row["% kursi kosong"]) or 0) * 100, 1),
                        "pct_gugur": round((angka(row["% gugur dari yang hadir"]) or 0) * 100, 1),
                        "skd_min_pemenang": angka(row["SKD terendah pemenang"], True),
                        "skd_rata_pemenang": angka(row["SKD rata-rata pemenang"], True),
                        "nilai_akhir_min": angka(row["Nilai akhir terendah pemenang"]),
                        "nilai_akhir_rata": angka(row["Nilai akhir rata-rata pemenang"]),
                    })
        return hasil

    (OUT / "target-2024.json").write_text(json.dumps({
        "tahun": 2024,
        "sumber": SUMBER,
        "per_kl": target("Per K-L", "K/L"),
        "per_wilayah": target("Per Wilayah", "Wilayah"),
        "per_kawasan": target("Per Wilayah", "Kawasan"),
    }, ensure_ascii=False, indent=1))

    # --- Sebaran SKD vs SKB (tanpa identitas) ---
    sebaran = defaultdict(list)
    for r in P:
        skd, skb = angka(r.get("Total SKD"), True), angka(r.get("Total SKB (Skala 100)"))
        if skd is None or skb is None or skb <= 0:
            continue
        sebaran[KATEGORI[r["Kategori"]]].append([skd, round(skb), 1 if r.get("Pemenang") == "Ya" else 0])
    for v in sebaran.values():
        v.sort()
    (OUT / "sebaran-2024.json").write_text(json.dumps({"tahun": 2024, "sumber": SUMBER, "kolom": ["skd", "skb", "pemenang"], "kategori": sebaran}, separators=(",", ":")))

    print(f"formasi: {len(formasi)} (+{len(jabar)} Pemprov Jabar)")
    print(f"kursi: {sum(f['kuota'] for f in formasi)}, kosong: {sum(f['kuota'] - f['kursi_terisi'] for f in formasi)}")
    print(f"tanpa provinsi (regional/nasional): {sum(1 for f in formasi if not f.get('provinsi'))}")
    print(f"statistik ikom terpasang: {sum(1 for f in formasi if f.get('peserta_ikom') is not None)}/{len(formasi)}")
    print(f"target per K/L: {len(target('Per K-L', 'K/L'))}, sebaran titik: { {k: len(v) for k, v in sebaran.items()} }")


if __name__ == "__main__":
    main(sys.argv[1])
