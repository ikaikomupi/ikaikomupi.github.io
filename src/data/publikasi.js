// Daftar publikasi IKA IKOM UPI. File PDF & sampul ada di public/dokumen/.
// status: "usulan" (terbuka untuk didiskusikan), "draf" (belum disahkan pengurus), atau "disahkan".
// Urutan di array = urutan tampil (terbaru di atas).
export const publikasi = [
  {
    slug: "proposal-kemitraan-ika-ikom-prodi-2026",
    jenis: "Proposal Kemitraan",
    judul: "Kolaborasi Alumni × Prodi: Membaca Masalah lewat Data, Menyelesaikannya lewat Manusia",
    untuk: "Program Studi Ilmu Komunikasi UPI",
    tanggal: "November 2026",
    status: "usulan",
    halaman: 16,
    bidang: "Pengembangan Profesional & Karir",
    ringkasan:
      "Pembagian Humas, Jurnalistik, dan Broadcasting tidak lagi mencerminkan dunia kerja. IKA mengusulkan profil lulusan Data + Relasi Manusia = Problem Solving, dua peminatan dengan produksi konten sebagai bekal wajib, Studio Project dengan klien sungguhan, serta enam bentuk dukungan alumni untuk Prodi.",
    sorotan: [
      { angka: "2", ket: "peminatan: Data dan Relasi Manusia" },
      { angka: "6", ket: "bentuk dukungan nyata dari alumni" },
      { angka: "60 mnt", ket: "langkah pertama: ngobrol bareng Kaprodi" },
    ],
    kutipan: "Tidak cuma kasih saran, ikut turun tangan.",
  },
  {
    slug: "rekomendasi-ika-mumas-himikasi-2027",
    jenis: "Rekomendasi",
    judul: "Catatan & Rekomendasi Peninjau dari Alumni, untuk Ikom yang Lebih Relevan",
    judulEn: "Reviewer's Notes & Recommendations",
    untuk: "Musyawarah Mahasiswa HIMIKASI FPIPS UPI 2027",
    tanggal: "November 2026",
    status: "draf",
    halaman: 15,
    bidang: "Pengembangan Profesional & Karir",
    ringkasan:
      "Minat mahasiswa berorganisasi menurun, sementara magang dan kerja jadi prioritas. Dari 120 unggahan Instagram @himikasi.upi serta AD/ART dan GBHO 2026, IKA menilai sejauh mana HIMIKASI membantu anggotanya siap kerja, lalu mengusulkan perbaikan tata kelola, komunikasi publik, AD/ART, lima bidang baru, dan peta jalan.",
    sorotan: [
      { angka: "120", ket: "unggahan Instagram HIMIKASI ditinjau" },
      { angka: "92 → 49", ket: "median suka per unggahan dalam setahun" },
      { angka: "5", ket: "bidang baru yang lebih dekat dengan dunia kerja" },
    ],
    kutipan: "HIMIKASI tidak perlu melawan magang. HIMIKASI harus jadi jalan menuju magang.",
  },
];
