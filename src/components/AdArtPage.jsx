import { muatFontItalic } from "../lib/fontItalic";
import { PERIODE, pembina, inti, bidang } from "../data/pengurus";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, CheckCircle2, ChevronDown, Users, Briefcase, Network } from "lucide-react";
import Footer from "./Footer";
import {
  Cincin, IlusDokumen, IlusAturan, IlusArah, IlusAlur, IlusStruktur, IlusKarir, IlusEvent, IlusSosial, IlusDirektori, IlusKompas,
} from "./beranda/Ilustrasi";

muatFontItalic();

// ─── ISI DOKUMEN — disahkan dalam Musyawarah Besar IKA IKOM UPI, 1 Juni 2026 ───────────────────────

const anggaranDasar = [
  {
    bab: "BAB I",
    judul: "Nama, Waktu, dan Kedudukan",
    pasal: [
      { no: "Pasal 1", ayat: ["Organisasi ini bernama Ikatan Keluarga Alumni Ilmu Komunikasi UPI, yang selanjutnya disingkat IKA IKOM UPI."] },
      { no: "Pasal 2", ayat: ["IKA IKOM UPI ditetapkan untuk jangka waktu yang tidak ditentukan."] },
      { no: "Pasal 3", ayat: ["IKA IKOM UPI berkedudukan di Kota Bandung, mengikuti domisili Program Studi Ilmu Komunikasi Universitas Pendidikan Indonesia."] },
    ],
  },
  {
    bab: "BAB II",
    judul: "Asas, Sifat, dan Tujuan",
    pasal: [
      { no: "Pasal 4", judul: "Asas", ayat: ["IKA IKOM UPI berasaskan Pancasila dan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945."] },
      { no: "Pasal 5", judul: "Sifat", ayat: ["IKA IKOM UPI bersifat independen, kekeluargaan, nirlaba, serta tidak berafiliasi dengan partai politik manapun."] },
      {
        no: "Pasal 6",
        judul: "Tujuan",
        ayat: [
          "Mempererat tali silaturahmi dan rasa kekeluargaan antar alumni Ilmu Komunikasi UPI lintas angkatan.",
          "Mengembangkan kapasitas profesional dan jejaring karir antar anggota.",
          "Memberikan kontribusi nyata bagi almamater, mahasiswa aktif, dan masyarakat luas.",
        ],
      },
    ],
  },
  {
    bab: "BAB III",
    judul: "Keanggotaan",
    pasal: [
      { no: "Pasal 7", ayat: ["Anggota IKA IKOM UPI adalah seluruh lulusan Program Studi Ilmu Komunikasi Universitas Pendidikan Indonesia dari seluruh angkatan."] },
      { no: "Pasal 8", ayat: ["Ketentuan lebih lanjut mengenai hak, kewajiban, dan berakhirnya keanggotaan diatur dalam Anggaran Rumah Tangga."] },
    ],
  },
  {
    bab: "BAB IV",
    judul: "Struktur Organisasi",
    pasal: [
      {
        no: "Pasal 9",
        ayat: [
          "Struktur organisasi IKA IKOM UPI terdiri atas: Dewan Pembina, Pengurus Harian, Koordinator Bidang, dan Perwakilan Angkatan.",
          "Dewan Pembina berfungsi memberikan arahan strategis dan tidak menjalankan kerja operasional harian.",
        ],
      },
    ],
  },
  {
    bab: "BAB V",
    judul: "Kepengurusan",
    pasal: [
      { no: "Pasal 10", ayat: ["Pengurus IKA IKOM UPI dipimpin oleh seorang Ketua Umum yang dipilih melalui Musyawarah Besar."] },
      { no: "Pasal 11", ayat: ["Masa bakti kepengurusan adalah 3 (tiga) tahun, dan Ketua Umum dapat menjabat paling banyak 2 (dua) periode berturut-turut."] },
      { no: "Pasal 12", judul: "Pemberhentian Ketua Umum", ayat: ["Ketua Umum dapat diberhentikan sebelum masa jabatannya berakhir melalui Musyawarah Besar Luar Biasa apabila terbukti tidak dapat menjalankan amanah atau atas permintaan sendiri."] },
      { no: "Pasal 13", judul: "Serah Terima Jabatan", ayat: ["Pengurus yang mengakhiri masa bakti wajib melakukan serah terima kepada kepengurusan baru selambat-lambatnya 30 (tiga puluh) hari setelah pelantikan, mencakup seluruh aset, dokumen, dan data organisasi."] },
    ],
  },
  {
    bab: "BAB VI",
    judul: "Permusyawaratan",
    pasal: [
      {
        no: "Pasal 14",
        ayat: [
          "Permusyawaratan dalam IKA IKOM UPI terdiri atas Musyawarah Besar (Mubes), Rapat Kerja, dan Rapat Pengurus.",
          "Musyawarah Besar merupakan forum pengambilan keputusan tertinggi organisasi.",
        ],
      },
    ],
  },
  {
    bab: "BAB VII",
    judul: "Keuangan",
    pasal: [
      {
        no: "Pasal 15",
        ayat: [
          "IKA IKOM UPI tidak memungut iuran keanggotaan dalam bentuk apapun.",
          "Sumber keuangan IKA IKOM UPI berasal dari donasi sukarela yang dibuka secara temporer pada setiap penyelenggaraan acara yang memerlukan biaya, dan hanya berlaku selama kebutuhan acara tersebut.",
          "Pengelolaan keuangan dilakukan secara transparan dan dilaporkan kepada seluruh anggota setelah setiap acara selesai.",
          "Laporan keuangan diverifikasi oleh sekurang-kurangnya satu anggota pengurus di luar Bendahara sebelum dipublikasikan.",
        ],
      },
    ],
  },
  {
    bab: "BAB VIII",
    judul: "Perubahan AD/ART",
    pasal: [
      { no: "Pasal 16", ayat: ["Perubahan Anggaran Dasar dan Anggaran Rumah Tangga hanya dapat dilakukan melalui Musyawarah Besar."] },
    ],
  },
  {
    bab: "BAB IX",
    judul: "Pembubaran",
    pasal: [
      { no: "Pasal 17", ayat: ["Pembubaran IKA IKOM UPI hanya dapat dilakukan melalui Musyawarah Besar Luar Biasa yang diselenggarakan khusus untuk itu."] },
    ],
  },
  {
    bab: "BAB X",
    judul: "Penutup",
    pasal: [
      { no: "Pasal 18", ayat: ["Hal-hal yang belum diatur dalam Anggaran Dasar ini akan diatur lebih lanjut dalam Anggaran Rumah Tangga dan ketetapan organisasi lainnya."] },
    ],
  },
];

const anggaranRumahTangga = [
  {
    bab: "BAB I",
    judul: "Keanggotaan",
    pasal: [
      {
        no: "Pasal 1",
        judul: "Hak Anggota",
        ayat: [
          "Mengikuti seluruh kegiatan yang diselenggarakan organisasi.",
          "Menyampaikan pendapat, usulan, dan kritik yang membangun.",
          "Memilih dan dipilih sebagai pengurus.",
        ],
      },
      {
        no: "Pasal 2",
        judul: "Kewajiban Anggota",
        ayat: [
          "Menjaga nama baik organisasi dan almamater.",
          "Menaati Anggaran Dasar, Anggaran Rumah Tangga, dan ketetapan organisasi.",
          "Berpartisipasi aktif sesuai kemampuan masing-masing.",
          "Menjaga kerahasiaan data pribadi anggota lain yang diperoleh dalam kapasitas organisasi dan tidak menggunakannya untuk kepentingan di luar organisasi.",
        ],
      },
    ],
  },
  {
    bab: "BAB II",
    judul: "Tugas dan Wewenang Pengurus",
    pasal: [
      { no: "Pasal 3", judul: "Ketua Umum", ayat: ["Memimpin dan mengoordinasikan seluruh kegiatan organisasi serta menjadi penanggung jawab utama IKA IKOM UPI."] },
      { no: "Pasal 4", judul: "Wakil Ketua", ayat: ["Membantu Ketua Umum dan mewakili Ketua Umum apabila berhalangan."] },
      { no: "Pasal 5", judul: "Sekretaris", ayat: ["Mengelola administrasi, surat-menyurat, notulensi, dan arsip organisasi."] },
      { no: "Pasal 6", judul: "Bendahara", ayat: ["Mengelola keuangan secara transparan dan menyusun laporan keuangan berkala."] },
      { no: "Pasal 7", judul: "Koordinator Bidang", ayat: ["Merencanakan dan melaksanakan program kerja sesuai bidang masing-masing."] },
      { no: "Pasal 8", judul: "Perwakilan Angkatan", ayat: [
        "Menjadi penghubung antara pengurus inti dengan anggota di angkatannya serta menjaga pemutakhiran data.",
        "PIC Angkatan ditunjuk oleh Bidang Hubungan Alumni & Antar-Angkatan atas persetujuan Ketua Umum, dengan masa tugas mengikuti periode kepengurusan.",
        "PIC Angkatan dapat diganti apabila tidak aktif selama 3 (tiga) bulan berturut-turut atau mengundurkan diri, melalui penunjukan pengganti oleh mekanisme yang sama.",
      ]},
    ],
  },
  {
    bab: "BAB III",
    judul: "Masa Jabatan dan Pergantian",
    pasal: [
      { no: "Pasal 9", ayat: ["Masa jabatan pengurus adalah 3 (tiga) tahun terhitung sejak pelantikan."] },
      { no: "Pasal 10", ayat: ["Pergantian pengurus antarwaktu dapat dilakukan melalui Rapat Pengurus apabila terdapat kekosongan jabatan."] },
      {
        no: "Pasal 11",
        judul: "Pemakzulan Ketua Umum",
        ayat: [
          "Ketua Umum dapat dimakzulkan melalui Musyawarah Besar Luar Biasa yang diusulkan secara tertulis oleh perwakilan sekurang-kurangnya separuh angkatan, dengan alasan yang jelas dan dapat dipertanggungjawabkan.",
          "Sebelum Mubes Luar Biasa digelar, wajib dilakukan mediasi internal sekurang-kurangnya satu kali.",
          "Apabila Ketua Umum dimakzulkan, Wakil Ketua menjalankan tugas Ketua Umum hingga Mubes Luar Biasa menetapkan penggantinya.",
        ],
      },
      {
        no: "Pasal 12",
        judul: "Serah Terima Jabatan",
        ayat: [
          "Pengurus demisioner wajib menyelesaikan serah terima jabatan kepada kepengurusan baru selambat-lambatnya 30 (tiga puluh) hari setelah pelantikan.",
          "Serah terima mencakup seluruh aset fisik dan digital, dokumen, arsip, akses akun resmi, serta data keanggotaan organisasi.",
          "Proses serah terima didokumentasikan dalam berita acara yang ditandatangani kedua pihak.",
        ],
      },
      {
        no: "Pasal 13",
        judul: "Rangkap Jabatan",
        ayat: [
          "Seorang anggota tidak dapat merangkap dua atau lebih jabatan dalam Pengurus Inti secara bersamaan.",
          "Koordinator Bidang tidak dapat merangkap jabatan dalam Pengurus Inti.",
          "Pengecualian dapat diberikan secara sementara oleh Rapat Pengurus dalam kondisi kekosongan jabatan, hingga pengganti definitif ditetapkan.",
        ],
      },
    ],
  },
  {
    bab: "BAB IV",
    judul: "Pemilihan Ketua Umum",
    pasal: [
      {
        no: "Pasal 15",
        judul: "Penjaringan Calon",
        ayat: [
          "Posisi Ketua Umum dibuka secara terbuka bagi seluruh anggota dari semua angkatan, dan diumumkan melalui kanal resmi organisasi.",
          "Setiap anggota yang bersedia maju mengajukan pernyataan kesediaan beserta rancangan tim inti dalam masa penjaringan yang ditetapkan panitia, sekurang-kurangnya 2 (dua) minggu.",
          "Calon Ketua Umum wajib memenuhi kriteria: merupakan alumni aktif Ilmu Komunikasi UPI, bersedia menjalankan masa bakti penuh 3 tahun, tidak sedang menjabat posisi struktural di partai politik, dan sanggup hadir aktif dalam kegiatan organisasi.",
        ],
      },
      {
        no: "Pasal 16",
        judul: "Penetapan Ketua Umum",
        ayat: [
          "Penetapan Ketua Umum dilakukan dalam Musyawarah Besar.",
          "Apabila hanya terdapat 1 (satu) calon, penetapan dilakukan melalui musyawarah mufakat (aklamasi).",
          "Apabila terdapat lebih dari 1 (satu) calon dan mufakat tidak tercapai, dilakukan pemungutan suara, dan calon dengan suara terbanyak ditetapkan sebagai Ketua Umum.",
          "Mandat yang diberikan adalah kepada Ketua Umum beserta tim inti yang diajukannya, bukan kepada individu semata.",
        ],
      },
      {
        no: "Pasal 17",
        judul: "Kuorum dan Keabsahan",
        ayat: [
          "Musyawarah Besar dinyatakan sah apabila dihadiri oleh perwakilan dari sekurang-kurangnya separuh jumlah angkatan yang ada.",
          "Keabsahan kepengurusan didasarkan pada keterwakilan lintas angkatan, bukan pada jumlah total kehadiran seluruh anggota.",
        ],
      },
    ],
  },
  {
    bab: "BAB V",
    judul: "Rapat-Rapat",
    pasal: [
      {
        no: "Pasal 18",
        ayat: [
          "Musyawarah Besar diselenggarakan sekali dalam satu periode kepengurusan.",
          "Rapat Kerja diselenggarakan untuk menyusun program kerja tahunan.",
          "Rapat Pengurus diselenggarakan sesuai kebutuhan organisasi dan dinyatakan sah apabila dihadiri lebih dari separuh pengurus inti.",
          "Pengambilan keputusan dalam Rapat Pengurus dilakukan melalui musyawarah mufakat; apabila tidak tercapai, dilakukan pemungutan suara dengan suara terbanyak, dan Ketua Umum memiliki suara penentu apabila terjadi hasil imbang.",
          "Setiap rapat wajib menghasilkan notulensi yang didokumentasikan.",
        ],
      },
    ],
  },
  {
    bab: "BAB VI",
    judul: "Keuangan",
    pasal: [
      {
        no: "Pasal 19",
        ayat: [
          "IKA IKOM UPI tidak memiliki iuran rutin; tidak ada kewajiban finansial berkala bagi anggota.",
          "Donasi dibuka secara temporer hanya untuk acara tertentu yang membutuhkan biaya operasional, dan ditutup setelah acara berlangsung.",
          "Setiap penerimaan dan pengeluaran dalam penyelenggaraan acara wajib dicatat, didokumentasikan, dan dilaporkan kepada anggota setelah acara selesai.",
          "Apabila terdapat sisa dana setelah acara selesai, sisa tersebut dicatat sebagai kas organisasi untuk keperluan operasional berikutnya dan dilaporkan kepada seluruh anggota.",
          "Sebelum dipublikasikan, laporan keuangan diverifikasi oleh satu anggota pengurus di luar Bendahara yang ditunjuk dalam Rapat Pengurus.",
        ],
      },
    ],
  },
  {
    bab: "BAB VII",
    judul: "Atribut Organisasi",
    pasal: [
      { no: "Pasal 20", ayat: ["IKA IKOM UPI memiliki atribut berupa logo dan identitas visual yang ditetapkan oleh pengurus dan disahkan dalam Musyawarah Besar."] },
    ],
  },
  {
    bab: "BAB VIII",
    judul: "Penutup",
    pasal: [
      { no: "Pasal 21", ayat: ["Hal-hal yang belum diatur dalam Anggaran Rumah Tangga ini akan ditetapkan kemudian melalui ketetapan organisasi."] },
    ],
  },
];

const gbho = [
  {
    judul: "Pendahuluan",
    isi: [
      "Garis Besar Haluan Organisasi (GBHO) merupakan pedoman umum yang menjadi arah penyelenggaraan program kerja IKA IKOM UPI dalam satu periode kepengurusan.",
      "GBHO disusun agar setiap program memiliki orientasi yang jelas, terukur, dan berkelanjutan — bukan sekadar daftar kegiatan.",
    ],
  },
  {
    judul: "Pola Dasar — Visi & Misi",
    isi: [
      "Visi: Membangun IKA IKOM UPI sebagai wadah alumni yang relevan, inklusif, dan berdampak nyata bagi anggota, almamater, dan masyarakat.",
      "Misi: memperkuat silaturahmi, mengembangkan profesional dan karir anggota, serta memberikan kontribusi kepada almamater dan masyarakat.",
    ],
  },
  {
    judul: "Pola Umum Program Kerja",
    isi: [
      "Jangka Pendek (Tahun 1): diagnosis kebutuhan, pembangunan infrastruktur dasar, dan eksekusi quick wins.",
      "Jangka Menengah: penguatan program rutin pengembangan profesional dan kontribusi ke almamater.",
      "Jangka Panjang: IKA IKOM UPI menjadi organisasi alumni yang mandiri, berkelanjutan, dan berdampak luas.",
    ],
  },
  {
    judul: "Indikator Keberhasilan",
    isi: [
      "Tahun 1 — terselenggaranya minimal 1 acara silaturahmi lintas angkatan; database anggota aktif terbentuk; AD/ART dan struktur organisasi disahkan dalam Mubes.",
      "Tahun 2 — minimal 1 program pengembangan profesional berjalan rutin; ada kontribusi konkret ke almamater (kuliah tamu, beasiswa, atau kerja sama).",
      "Akhir Periode — kepengurusan baru terbentuk melalui proses yang sesuai AD/ART; serah terima berjalan tertib; organisasi tidak bergantung pada satu individu.",
    ],
  },
  {
    judul: "Arah Bidang Program",
    isi: [
      "Networking & Silaturahmi — reuni, gathering, dan halal bihalal yang inklusif lintas angkatan.",
      "Pengembangan Profesional & Karir — mentoring, sharing karir, dan job board antar alumni.",
      "Kontribusi ke Almamater — beasiswa, kuliah tamu, dan kerja sama dengan program studi.",
      "Kontribusi Sosial — aksi sosial dan pemberdayaan masyarakat sekitar kampus.",
    ],
  },
  {
    judul: "Penutup",
    isi: [
      "GBHO ini menjadi acuan dalam penyusunan program kerja dan dievaluasi pada setiap Musyawarah Besar.",
    ],
  },
];

const sop = [
  {
    bidang: "Program & Acara",
    kode: "A",
    tugasPokok: ["Merancang dan menyelenggarakan kegiatan silaturahmi serta acara resmi organisasi.", "Menyusun kalender kegiatan tahunan bersama Pengurus Inti.", "Mengelola kepanitiaan, kebutuhan acara, dan laporan pertanggungjawaban kegiatan bersama Bendahara."],
    rencana: [["Menyusun kalender kegiatan dan standar operasional penyelenggaraan acara.", "Menyelenggarakan minimal 1 (satu) acara silaturahmi lintas angkatan."], ["Menjalankan agenda silaturahmi rutin tahunan (reuni, gathering, atau halal bihalal).", "Menyelenggarakan kegiatan bersama Program Studi dan mahasiswa aktif, serta aksi sosial."], ["Mengevaluasi seluruh program acara selama periode kepengurusan.", "Menyiapkan penyelenggaraan Musyawarah Besar akhir periode bersama Pengurus Inti."]],
    icon: Users,
    tujuan: "Merencanakan, mengkoordinasikan, dan mengevaluasi seluruh kegiatan IKA IKOM UPI agar terselenggara secara terstruktur dan berdampak.",
    ruangLingkup: "Berlaku untuk semua kegiatan resmi IKA IKOM UPI, mulai dari ideasi hingga pelaporan pasca acara.",
    prosedur: [
      { langkah: "Ideasi & Inisiasi", detail: "Usulkan ide acara disertai latar belakang, tujuan, dan estimasi peserta. Diajukan minimal 8 minggu sebelum tanggal pelaksanaan." },
      { langkah: "Penyusunan Proposal", detail: "Buat proposal lengkap: rundown, kebutuhan SDM, anggaran, dan rencana komunikasi ke anggota. Koordinasikan dengan Bidang Hubungan Alumni & Antar-Angkatan untuk penyebaran informasi ke seluruh angkatan." },
      { langkah: "Persetujuan", detail: "Proposal disetujui oleh Ketua Umum dalam Rapat Pengurus. Jika ada kebutuhan donasi, koordinasikan dengan Bendahara untuk membuka penggalangan dana." },
      { langkah: "Persiapan & Koordinasi", detail: "Tetapkan PIC setiap sub-tugas. Lakukan briefing teknis minimal 3 hari sebelum acara. Konfirmasi kehadiran narasumber/tamu jika ada." },
      { langkah: "Pelaksanaan", detail: "Jalankan acara sesuai rundown. Dokumentasikan setiap sesi (foto/video) sebagai arsip dan bahan publikasi organisasi." },
      { langkah: "Evaluasi & Pelaporan", detail: "Kirimkan laporan evaluasi kepada Ketua Umum maksimal 7 hari setelah acara, mencakup capaian, kendala, dan rekomendasi. Laporan pertanggungjawaban keuangan disusun bersama Bendahara." },
    ],
    output: ["Proposal acara", "Rundown & susunan panitia", "Dokumentasi acara", "Laporan evaluasi pasca acara"],
    kpi: [
      "Minimal 1 acara silaturahmi lintas angkatan per tahun",
      "Tingkat kehadiran ≥ 30% anggota aktif per acara",
      "Laporan evaluasi tersampaikan ≤ 7 hari pasca acara",
    ],
  },
  {
    bidang: "Pengembangan Profesional & Karir",
    kode: "B",
    tugasPokok: ["Menyelenggarakan program peningkatan kapasitas profesional anggota.", "Membangun jejaring karir serta penyebaran informasi lowongan antar alumni.", "Menjembatani alumni dengan mahasiswa aktif melalui mentoring dan kuliah tamu."],
    rencana: [["Memetakan bidang profesi dan sebaran kerja alumni.", "Membuka kanal informasi karir (job board) dan menyelenggarakan sesi berbagi karir perdana."], ["Menjalankan minimal 1 (satu) program pengembangan profesional secara rutin.", "Menyelenggarakan kuliah tamu atau kerja sama dengan Program Studi dan mitra eksternal."], ["Memantapkan program mentoring alumni–mahasiswa yang berkelanjutan.", "Menyusun laporan dampak program serta menyerahkan data mitra dan mentor kepada kepengurusan berikutnya."]],
    icon: Briefcase,
    tujuan: "Memfasilitasi pertumbuhan profesional anggota dan memperluas peluang karir melalui program mentoring, knowledge-sharing, dan job referral.",
    ruangLingkup: "Mencakup seluruh program yang berkaitan dengan kompetensi profesional, karir, dan pengembangan diri anggota IKA IKOM UPI.",
    prosedur: [
      { langkah: "Survey Kebutuhan", detail: "Lakukan survey kebutuhan anggota setiap awal tahun untuk memetakan topik yang relevan dan format yang diinginkan (webinar, mentoring 1-on-1, job fair, dll.)." },
      { langkah: "Penyusunan Kalender Program", detail: "Susun kalender program tahunan berdasarkan hasil survey. Tetapkan minimal 2 program utama per tahun dengan jadwal dan PIC masing-masing." },
      { langkah: "Rekrutmen Narasumber & Mentor", detail: "Identifikasi dan hubungi alumni yang relevan sebagai narasumber atau mentor. Berikan brief yang jelas mengenai ekspektasi dan format program." },
      { langkah: "Koordinasi Teknis", detail: "Koordinasikan penyelenggaraan dengan Bidang Program & Acara untuk kebutuhan logistik, dan Bidang Hubungan Alumni & Antar-Angkatan untuk penyebaran informasi." },
      { langkah: "Pelaksanaan Program", detail: "Jalankan program sesuai rencana. Pastikan materi/rekaman tersimpan dan dapat diakses ulang oleh anggota yang tidak hadir." },
      { langkah: "Pengelolaan Job Board", detail: "Kumpulkan dan publikasikan informasi lowongan kerja dari jaringan alumni secara berkala melalui kanal resmi. Verifikasi relevansi sebelum dipublikasikan." },
      { langkah: "Evaluasi Dampak", detail: "Ukur manfaat program melalui feedback form pasca kegiatan. Kompilasi hasil dan gunakan sebagai bahan perbaikan program berikutnya." },
    ],
    output: ["Peta profesi & sebaran kerja alumni", "Materi & rekaman program", "Job board terupdate", "Data mitra & mentor", "Laporan feedback & evaluasi"],
    kpi: [
      "Minimal 1 program pengembangan profesional berjalan rutin",
      "Minimal 1 info lowongan dipublikasikan per bulan (jika tersedia)",
      "Tingkat kepuasan peserta ≥ 80% berdasarkan feedback form",
    ],
  },
  {
    bidang: "Hubungan Alumni & Antar-Angkatan",
    kode: "C",
    tugasPokok: ["Menghimpun dan memutakhirkan basis data anggota.", "Menunjuk dan membina PIC Angkatan sesuai Anggaran Rumah Tangga Pasal 8.", "Menjaga komunikasi dan penyebaran informasi organisasi ke seluruh angkatan."],
    rencana: [["Membangun basis data anggota aktif dan menunjuk PIC setiap angkatan.", "Membentuk kanal komunikasi resmi lintas angkatan."], ["Memutakhirkan basis data anggota sekurang-kurangnya 1 (satu) kali setahun.", "Menyelenggarakan forum koordinasi PIC Angkatan dan merangkul angkatan yang belum aktif."], ["Mengevaluasi keterwakilan angkatan menjelang Musyawarah Besar.", "Menyerahkan basis data dan akses kanal komunikasi kepada kepengurusan berikutnya."]],
    icon: Network,
    tujuan: "Menjaga keterhubungan seluruh anggota lintas angkatan, memutakhirkan database alumni, dan memastikan anggota baru (wisudawan) terhubung dengan IKA IKOM UPI.",
    ruangLingkup: "Mencakup pengelolaan data anggota, koordinasi PIC angkatan, dan penjangkauan alumni baru.",
    prosedur: [
      { langkah: "Pemutakhiran Database", detail: "Koordinasikan dengan PIC setiap angkatan untuk memperbarui data anggota (kontak, profesi, domisili) sekurang-kurangnya setiap kuartal (minimal 1 kali setahun sesuai SK). Gunakan platform yang ditetapkan organisasi." },
      { langkah: "Penunjukan PIC Angkatan", detail: "Tunjuk satu PIC untuk setiap angkatan sesuai Anggaran Rumah Tangga Pasal 8, lalu bina perannya sebagai jembatan ke pengurus inti." },
      { langkah: "Koordinasi PIC Angkatan", detail: "Adakan pertemuan rutin dengan seluruh PIC angkatan minimal sekali per semester untuk berbagi informasi dan menyampaikan arahan dari pengurus inti." },
      { langkah: "Penjangkauan Anggota Baru", detail: "Pantau jadwal wisuda Ilmu Komunikasi UPI. Hubungi dan sambut wisudawan baru melalui PIC angkatan atau langsung via kanal resmi dalam 30 hari setelah wisuda." },
      { langkah: "Fasilitasi Komunikasi Lintas Angkatan", detail: "Kelola dan moderasi grup komunikasi resmi IKA IKOM UPI. Pastikan informasi dari pengurus inti tersebar merata ke seluruh anggota." },
      { langkah: "Pelaporan Data", detail: "Sampaikan laporan perkembangan database kepada Sekretaris setiap kuartal, termasuk jumlah anggota aktif, angkatan yang belum terjangkau, dan kendalanya." },
    ],
    output: ["Database anggota termutakhir", "Laporan kuartalan data keanggotaan", "Notulensi pertemuan PIC angkatan"],
    kpi: [
      "Coverage data ≥ 70% total alumni terdaftar",
      "PIC tersedia di setiap angkatan aktif",
      "Anggota baru terjangkau dalam ≤ 30 hari pasca wisuda",
    ],
  },
];

// ─── Tampilan ──────────────────────────────────────────────────────────────────
// Bahasa visual sama dengan beranda: blok warna logo IKOM, balon chat, dan ilustrasi per dokumen.
// Warna memakai token ika-* sehingga ikut mode terang/gelap.

const jumlahPasal = (d) => d.reduce((n, b) => n + b.pasal.length, 0);

const tabs = [
  { id: "ad", label: "Anggaran Dasar", ringkas: "AD", desc: "Aturan pokok organisasi", Ilus: IlusDokumen, warna: "bg-ika-merah text-[#fff]", meta: `${anggaranDasar.length} bab · ${jumlahPasal(anggaranDasar)} pasal` },
  { id: "art", label: "Anggaran Rumah Tangga", ringkas: "ART", desc: "Penjabaran teknis dari AD", Ilus: IlusAturan, warna: "bg-ika-oranye text-[#fff]", meta: `${anggaranRumahTangga.length} bab · ${jumlahPasal(anggaranRumahTangga)} pasal` },
  { id: "gbho", label: "Garis Besar Haluan Organisasi", ringkas: "GBHO", desc: "Arah dan pola program kerja", Ilus: IlusArah, warna: "bg-ika-kuning text-[#1f1d1a]", meta: `${gbho.length} bagian` },
  { id: "sop", label: "SOP Bidang", ringkas: "SOP", desc: "Tugas & prosedur tiap bidang", Ilus: IlusAlur, warna: "bg-ika-ink text-ika-bg", meta: `${sop.length} bidang` },
  { id: "struktur", label: "Struktur Organisasi", ringkas: "Struktur", desc: `Susunan pengurus ${PERIODE}`, Ilus: IlusStruktur, warna: "bg-ika-emas text-[#1f1d1a]", meta: "4 unsur organisasi" },
];

function LegalDoc({ data, prefix }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[13rem_1fr] lg:gap-14">
      {/* Daftar bab (desktop) */}
      <nav aria-label="Daftar bab" className="hidden lg:block">
        <ol className="sticky top-36 space-y-1 border-l-2 border-ika-line">
          {data.map((b) => (
            <li key={b.bab}>
              <a href={`#${prefix}-${b.bab.replace(/\s+/g, "-")}`} className="-ml-0.5 block border-l-2 border-transparent py-1.5 pl-4 text-sm text-ika-muted transition-colors hover:border-ika-merah hover:text-ika-ink">
                <span className="font-semibold">{b.bab.replace("BAB ", "")}.</span> {b.judul}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="space-y-6">
        {data.map((b, i) => (
          <section key={b.bab} id={`${prefix}-${b.bab.replace(/\s+/g, "-")}`} className="scroll-mt-36 overflow-hidden rounded-[2rem] bg-ika-surface">
            <header className="flex items-center gap-4 px-6 pt-6 sm:px-8 sm:pt-8">
              <span className={`flex h-12 min-w-12 shrink-0 items-center justify-center rounded-2xl px-3 font-display text-lg font-semibold ${["bg-ika-merah text-[#fff] rounded-bl-md", "bg-ika-oranye text-[#fff] rounded-br-md", "bg-ika-kuning text-[#1f1d1a] rounded-bl-md"][i % 3]}`}>
                {b.bab.replace("BAB ", "")}
              </span>
              <div>
                <p className="text-xs text-ika-muted">{b.bab}</p>
                <h3 className="font-display text-xl font-medium leading-snug text-ika-ink sm:text-2xl">{b.judul}</h3>
              </div>
            </header>
            <div className="space-y-5 px-6 pb-7 pt-5 sm:px-8 sm:pb-8">
              {b.pasal.map((p) => (
                <article key={p.no} className="rounded-2xl bg-ika-bg p-5 ring-1 ring-ika-line">
                  <p className="text-sm font-semibold text-ika-merah">
                    {p.no}
                    {p.judul && <span className="font-normal text-ika-muted"> · {p.judul}</span>}
                  </p>
                  {p.ayat.length === 1 ? (
                    <p className="mt-2 text-[15px] leading-relaxed text-ika-ink/90">{p.ayat[0]}</p>
                  ) : (
                    <ol className="mt-2 space-y-2">
                      {p.ayat.map((a, k) => (
                        <li key={k} className="flex gap-3 text-[15px] leading-relaxed text-ika-ink/90">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ika-surface text-[11px] font-semibold text-ika-muted">{k + 1}</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

const gayaGbho = [
  { Ilus: IlusDokumen, warna: "bg-ika-surface" },
  { Ilus: IlusKompas, warna: "bg-ika-merah text-[#fff]", gelap: true },
  { Ilus: IlusArah, warna: "bg-ika-surface" },
  { Ilus: IlusKarir, warna: "bg-ika-kuning text-[#1f1d1a]" },
  { Ilus: IlusEvent, warna: "bg-ika-surface" },
  { Ilus: IlusSosial, warna: "bg-ika-oranye text-[#fff]", gelap: true },
];

function GbhoDoc() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {gbho.map((s, i) => {
        const g = gayaGbho[i % gayaGbho.length];
        const lebar = i === 1 || i === 4 || (i === gbho.length - 1 && i % 2 === 1);
        return (
          <section key={s.judul} className={`flex flex-col gap-6 rounded-[2rem] p-7 sm:p-8 ${g.warna} ${lebar ? "md:col-span-2 md:flex-row md:items-center" : ""} ${i % 2 ? "rounded-br-lg" : "rounded-bl-lg"}`}>
            {g.gelap ? (
              <div className="flex h-28 shrink-0 items-center justify-center rounded-2xl bg-ika-bg p-3 md:h-36 md:w-56">
                <g.Ilus className="h-full w-full" />
              </div>
            ) : (
              <g.Ilus className={`h-28 shrink-0 ${lebar ? "md:h-36 md:w-56" : "w-full"}`} />
            )}
            <div>
              <p className={`text-sm ${g.warna.includes("text-") ? "opacity-80" : "text-ika-muted"}`}>Bagian {i + 1}</p>
              <h3 className={`mt-1 font-display text-2xl font-medium ${g.warna.includes("text-") ? "" : "text-ika-ink"}`}>{s.judul}</h3>
              <ul className="mt-4 space-y-2.5">
                {s.isi.map((t) => (
                  <li key={t} className={`text-[15px] leading-relaxed ${g.warna.includes("text-") ? "opacity-90" : "text-ika-ink/85"}`}>{t}</li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </div>
  );
}

const gayaSop = {
  A: { blok: "bg-ika-merah text-[#fff]", huruf: "text-ika-merah", titik: "bg-ika-merah", Ilus: IlusEvent },
  B: { blok: "bg-ika-oranye text-[#fff]", huruf: "text-ika-oranye", titik: "bg-ika-oranye", Ilus: IlusKarir },
  C: { blok: "bg-ika-kuning text-[#1f1d1a]", huruf: "text-ika-ink", titik: "bg-ika-kuning", Ilus: IlusDirektori },
};

const koordinatorDari = (kode) => bidang.find((b) => b.kode === kode)?.koordinator;

function SopDoc() {
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-5">
      {sop.map((s, i) => {
        const g = gayaSop[s.kode];
        const isOpen = open === i;
        return (
          <section key={s.kode} className="overflow-hidden rounded-[2rem] bg-ika-surface">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-5 p-5 text-left sm:p-6"
            >
              <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl rounded-bl-md font-display text-2xl font-semibold ${g.blok}`}>{s.kode}</span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-xl font-medium leading-snug text-ika-ink sm:text-2xl">{s.bidang}</h3>
                <p className="mt-0.5 text-sm text-ika-muted">Koordinator: {koordinatorDari(s.kode)}</p>
              </div>
              <g.Ilus className="hidden h-16 w-24 shrink-0 sm:block" />
              <ChevronDown className={`h-5 w-5 shrink-0 text-ika-muted transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
              <div className="space-y-8 border-t border-ika-line px-5 pb-7 pt-6 sm:px-8">
                <div className="grid gap-5 md:grid-cols-[1.2fr_1fr]">
                  <div>
                    <h4 className="font-display text-lg text-ika-ink">Tugas pokok</h4>
                    <ul className="mt-3 space-y-2.5">
                      {s.tugasPokok.map((t) => (
                        <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-ika-ink/90">
                          <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${g.titik}`} />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-2xl rounded-bl-sm bg-ika-bg p-4 ring-1 ring-ika-line">
                      <p className={`text-xs font-semibold ${g.huruf}`}>Tujuan</p>
                      <p className="mt-1 text-sm leading-relaxed text-ika-ink/90">{s.tujuan}</p>
                    </div>
                    <div className="rounded-2xl rounded-br-sm bg-ika-bg p-4 ring-1 ring-ika-line">
                      <p className="text-xs font-semibold text-ika-muted">Ruang lingkup</p>
                      <p className="mt-1 text-sm leading-relaxed text-ika-ink/90">{s.ruangLingkup}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-display text-lg text-ika-ink">Rencana per tahun</h4>
                  <div className="mt-3 grid gap-3 md:grid-cols-3">
                    {s.rencana.map((isi, t) => (
                      <div key={t} className="rounded-2xl bg-ika-bg p-5 ring-1 ring-ika-line">
                        <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${g.blok}`}>Tahun {["I", "II", "III"][t]}</span>
                        <p className="mt-1.5 text-xs text-ika-muted">{2026 + t}–{2027 + t}</p>
                        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ika-ink/85">
                          {isi.map((x) => <li key={x}>{x}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-display text-lg text-ika-ink">Alur prosedur</h4>
                  <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {s.prosedur.map((p, j) => (
                      <li key={p.langkah} className="relative rounded-2xl bg-ika-bg p-5 ring-1 ring-ika-line">
                        <span className={`absolute -top-3 left-5 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${g.blok}`}>{j + 1}</span>
                        <p className="mt-1 font-semibold text-ika-ink">{p.langkah}</p>
                        <p className="mt-1 text-sm leading-relaxed text-ika-muted">{p.detail}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="rounded-2xl bg-ika-bg p-5 ring-1 ring-ika-line">
                    <h4 className="font-display text-lg text-ika-ink">Output & dokumen</h4>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {s.output.map((o) => (
                        <li key={o} className="rounded-full bg-ika-surface px-3 py-1 text-[13px] text-ika-ink ring-1 ring-ika-line">{o}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={`rounded-2xl p-5 ${g.blok}`}>
                    <h4 className="font-display text-lg">Indikator kinerja</h4>
                    <ul className="mt-3 space-y-2">
                      {s.kpi.map((k) => (
                        <li key={k} className="flex items-start gap-2 text-sm leading-relaxed">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 opacity-80" />
                          {k}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

const warnaBidangStruktur = { A: "bg-ika-merah text-[#fff]", B: "bg-ika-oranye text-[#fff]", C: "bg-ika-kuning text-[#1f1d1a]" };

function StrukturDoc() {
  const [ketua, ...lain] = inti;
  return (
    <div className="rounded-[2rem] bg-ika-surface p-6 sm:p-10">
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-full border-2 border-ika-ink px-6 py-2.5 text-center font-display text-lg text-ika-ink">Musyawarah Besar</div>
        <span className="h-6 w-px bg-ika-muted/40" aria-hidden="true" />
        <div className="grid w-full items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
          <div className="rounded-2xl rounded-br-md bg-ika-bg px-5 py-4 ring-1 ring-ika-line md:order-3">
            <p className="text-xs text-ika-muted">Dewan Pembina · arahan strategis</p>
            <p className="mt-1 font-display text-lg text-ika-ink">{pembina.ketua}</p>
            <p className="mt-1 text-sm text-ika-muted">{pembina.anggota.join(", ")}</p>
          </div>
          <div className="rounded-3xl rounded-bl-md bg-ika-ink px-7 py-4 text-center text-ika-bg md:order-2">
            <p className="text-xs opacity-75">{ketua.jabatan}</p>
            <p className="font-display text-xl">{ketua.nama}</p>
          </div>
          <div className="rounded-2xl rounded-bl-md bg-ika-bg px-5 py-4 ring-1 ring-ika-line md:order-1">
            <p className="text-xs text-ika-muted">Pengurus inti</p>
            <ul className="mt-1 space-y-1">
              {lain.map((o) => (
                <li key={o.nama} className="text-sm text-ika-ink">
                  <span className="text-ika-muted">{o.jabatan}:</span> {o.nama}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <span className="h-6 w-px bg-ika-muted/40" aria-hidden="true" />
        <div className="grid w-full gap-3 md:grid-cols-3">
          {bidang.map((b) => (
            <div key={b.kode} className={`rounded-3xl px-6 py-5 ${warnaBidangStruktur[b.kode]}`}>
              <p className="text-xs opacity-80">Bidang {b.kode}</p>
              <p className="mt-1 font-display text-lg leading-snug">{b.nama}</p>
              <p className="mt-3 text-sm font-semibold">Koordinator: {b.koordinator}</p>
              <p className="mt-1 text-sm opacity-85">{b.anggota.join(", ")}</p>
            </div>
          ))}
        </div>
        <span className="h-6 w-px bg-ika-muted/40" aria-hidden="true" />
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-1.5" aria-hidden="true">
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} className={`h-4 w-4 rounded-full ${["bg-ika-merah", "bg-ika-oranye", "bg-ika-kuning"][i % 3]}`} />
            ))}
          </div>
          <p className="text-sm text-ika-muted">PIC Angkatan: satu koordinator di setiap angkatan</p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link to="/organisasi" className="inline-flex items-center justify-center rounded-full bg-ika-merah px-6 py-3 text-[15px] font-semibold text-[#fff] transition hover:brightness-110">
          Lihat susunan pengurus lengkap
        </Link>
      </div>
    </div>
  );
}

// ─── Halaman ───────────────────────────────────────────────────────────────────

export default function AdArtPage() {
  const [tab, setTab] = useState("ad");
  const aktif = tabs.find((t) => t.id === tab);

  function pilih(id) {
    setTab(id);
    document.getElementById("isi-dokumen")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="bg-ika-bg font-body text-ika-ink antialiased">
      {/* Pembuka */}
      <header className="relative overflow-hidden">
        <Cincin className="pointer-events-none absolute -left-40 -top-24 h-[30rem] w-[30rem] opacity-[0.07]" tebal={26} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-28 sm:px-6 md:pt-36 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-ika-surface px-3.5 py-1.5 text-sm text-ika-muted">
              <span className="h-2 w-2 rounded-full bg-ika-merah" />
              Dokumen organisasi
            </p>
            <h1 className="mt-6 font-display text-[2.7rem] font-medium leading-[1.02] tracking-[-0.02em] text-ika-ink sm:text-6xl">
              Aturan main yang kita sepakati bersama.
            </h1>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-ika-muted">
              Anggaran Dasar, Anggaran Rumah Tangga, Garis Besar Haluan Organisasi, SOP bidang, dan struktur organisasi IKA IKOM UPI.
            </p>
            <div className="mt-8 inline-flex max-w-lg items-start gap-3 rounded-2xl rounded-bl-sm bg-ika-surface px-4 py-3 ring-1 ring-ika-line">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1f9d6b] text-[#fff]">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <p className="text-sm leading-relaxed text-ika-ink">
                <b>Telah disahkan</b> dalam Musyawarah Besar IKA IKOM UPI, Bandung, 1 Juni 2026, dan menjadi lampiran SK kepengurusan
                periode {PERIODE}.
              </p>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[28rem]">
            <div className="absolute inset-[8%] rounded-full bg-ika-surface" aria-hidden="true" />
            <IlusDokumen className="relative w-full" />
          </div>
        </div>
      </header>

      {/* Pilihan dokumen bergambar */}
      <section className="mx-auto max-w-6xl px-4 pb-6 sm:px-6">
        <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
          {tabs.map((t) => {
            const on = t.id === tab;
            return (
              <button
                key={t.id}
                onClick={() => pilih(t.id)}
                aria-pressed={on}
                className={`group flex w-44 shrink-0 snap-start flex-col overflow-hidden rounded-[1.75rem] text-left transition sm:w-auto ${on ? `${t.warna} shadow-[0_14px_30px_-14px_rgba(0,0,0,0.5)]` : "bg-ika-surface text-ika-ink hover:-translate-y-0.5"}`}
              >
                <div className={`flex h-28 items-center justify-center p-4 ${on ? "bg-ika-bg" : ""}`}>
                  <t.Ilus className="h-full w-full transition-transform group-hover:scale-105" />
                </div>
                <div className="px-4 pb-4 pt-3">
                  <p className="font-display text-lg font-medium leading-tight">{t.ringkas}</p>
                  <p className={`mt-0.5 text-xs leading-snug ${on ? "opacity-85" : "text-ika-muted"}`}>{t.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Pilihan ringkas yang menempel saat menggulir */}
      <nav className="sticky top-16 z-30 border-y border-ika-line bg-ika-bg/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl gap-1.5 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => pilih(t.id)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${tab === t.id ? t.warna : "text-ika-muted hover:bg-ika-surface hover:text-ika-ink"}`}
            >
              {t.ringkas}
            </button>
          ))}
        </div>
      </nav>

      {/* Isi dokumen */}
      <main id="isi-dokumen" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-12 sm:px-6 md:py-16">
        <div className={`relative mb-10 flex flex-col gap-6 overflow-hidden rounded-[2rem] rounded-bl-lg p-7 sm:flex-row sm:items-center sm:p-10 ${aktif.warna}`}>
          <div className="flex-1">
            <p className="text-sm opacity-80">{aktif.meta}</p>
            <h2 className="mt-1 font-display text-3xl font-medium leading-tight sm:text-[2.6rem]">{aktif.label}</h2>
            <p className="mt-2 max-w-xl text-[16px] opacity-85">
              {tab === "sop"
                ? `Tugas pokok, rencana kerja, dan prosedur tiap bidang periode ${PERIODE}, sesuai lampiran SK.`
                : tab === "struktur"
                  ? `Unsur organisasi dan susunan kepengurusan periode ${PERIODE}.`
                  : aktif.desc + "."}
            </p>
          </div>
          <div className="flex h-32 w-full shrink-0 items-center justify-center rounded-2xl bg-ika-bg p-3 sm:h-36 sm:w-56">
            <aktif.Ilus className="h-full w-full" />
          </div>
        </div>

        {tab === "ad" && <LegalDoc data={anggaranDasar} prefix="ad" />}
        {tab === "art" && <LegalDoc data={anggaranRumahTangga} prefix="art" />}
        {tab === "gbho" && <GbhoDoc />}
        {tab === "sop" && <SopDoc />}
        {tab === "struktur" && <StrukturDoc />}
      </main>

      {/* Lanjutan */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Link to="/calon-ketua" className="group flex items-center gap-5 rounded-[2rem] rounded-bl-lg bg-ika-surface p-6 transition-colors hover:bg-ika-line/60">
            <IlusKompas className="h-20 w-24 shrink-0" />
            <div>
              <p className="font-display text-xl text-ika-ink">Arah Organisasi {PERIODE}</p>
              <p className="mt-1 text-sm text-ika-muted">Gagasan dan peta jalan Ketua Umum terpilih.</p>
            </div>
          </Link>
          <Link to="/publikasi" className="group flex items-center gap-5 rounded-[2rem] rounded-br-lg bg-ika-surface p-6 transition-colors hover:bg-ika-line/60">
            <IlusAturan className="h-20 w-24 shrink-0" />
            <div>
              <p className="font-display text-xl text-ika-ink">Publikasi</p>
              <p className="mt-1 text-sm text-ika-muted">Kajian, rekomendasi, dan laporan resmi IKA.</p>
            </div>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
