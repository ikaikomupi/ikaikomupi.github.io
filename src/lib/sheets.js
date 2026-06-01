import { alumni as mockAlumni } from "../data/alumni.js";

const SHEET_ID = "1mFUEZRRmr6cnmQ7Cbqo5WePQb9cuzKgTx7c6MIhw07w";
const TAB_NAME = "1";
const BLOG_TAB = "setelah-toga";
const EVENTS_TAB = "events";
const LOWONGAN_TAB = "lowongan";

const mockPosts = [
  {
    slug: "memulai-karir-setelah-lulus-ilmu-komunikasi",
    judul: "Memulai Karir Setelah Lulus Ilmu Komunikasi",
    kategori: "Karir",
    penulis: "Tim IKA IKOM UPI",
    tanggal: "2024-06-01",
    ringkasan: "Lulus kuliah bisa terasa overwhelming. Begini cara alumni IKOM UPI menavigasi dunia kerja di tahun pertama setelah wisuda.",
    konten: "Lulus kuliah adalah momen yang ditunggu-tunggu, tapi seringkali diikuti kebingungan: mau ke mana setelah ini?\n\nBagi lulusan Ilmu Komunikasi, kabar baiknya adalah skill yang kamu miliki sangat luas dan bisa diterapkan di banyak industri. Mulai dari media, PR, digital marketing, hingga startup teknologi.\n\nHal pertama yang perlu kamu lakukan adalah mapping skill. Apa yang kamu kuasai selama kuliah? Public speaking? Copywriting? Video editing? Jadikan itu sebagai titik awal.\n\nSelanjutnya, bangun portfolio. Di era digital ini, portfolio online jauh lebih powerful dari sekadar CV. Platform seperti Behance, personal website, atau bahkan Instagram profesional bisa jadi showcase terbaikmu.\n\nJangan lupakan networking. Bergabunglah dengan komunitas alumni, hadir di event industri, dan aktif di LinkedIn. Banyak opportunity datang dari koneksi yang tepat.\n\nIngat, perjalanan setiap orang berbeda. Yang penting adalah terus bergerak dan belajar.",
    foto_url: null,
  },
  {
    slug: "networking-ala-alumni-ikom-2018",
    judul: "Networking Ala Alumni IKOM UPI",
    kategori: "Networking",
    penulis: "Tim IKA IKOM UPI",
    tanggal: "2024-07-15",
    ringkasan: "Networking bukan sekadar bagi-bagi kartu nama. Ini strategi membangun hubungan profesional yang tulus dan bertahan lama.",
    konten: "Satu hal yang sering disalahpahami tentang networking: bukan soal seberapa banyak orang yang kamu kenal, tapi seberapa dalam hubungan yang kamu bangun.\n\nSebagai lulusan Ilmu Komunikasi, kita punya keunggulan natural: kita dilatih untuk berkomunikasi dengan baik. Gunakan skill ini!\n\nMulailah dari lingkaran terdekat. Teman sekelas, dosen, hingga senior yang sudah lebih dulu bekerja adalah jaringan awal yang sangat berharga. IKA IKOM UPI sendiri punya direktori alumni yang bisa kamu manfaatkan.\n\nAktif di komunitas industri juga penting. Forum PR Indonesia, komunitas content creator, atau grup digital marketing di Telegram dan Discord adalah tempat yang bagus untuk bertemu orang-orang seperti kamu.\n\nSatu tips paling penting: beri sebelum meminta. Bagikan informasi yang berguna, bantu orang lain, jadilah koneksi yang bernilai. Dari situlah hubungan profesional yang tulus terbentuk.",
    foto_url: null,
  },
  {
    slug: "tips-hidup-hemat-fresh-graduate-jakarta",
    judul: "Tips Hidup Hemat sebagai Fresh Graduate di Jakarta",
    kategori: "Tips Hidup",
    penulis: "Tim IKA IKOM UPI",
    tanggal: "2024-08-20",
    ringkasan: "Gaji pertama terasa besar, tapi Jakarta punya cara sendiri untuk menguras kantong. Ini strategi finansial dari alumni yang sudah merasakannya.",
    konten: "Gaji pertama selalu terasa 'wah' — sampai tagihan dan biaya hidup mulai berdatangan.\n\nHidup di Jakarta sebagai fresh graduate memang butuh strategi. Tapi bukan berarti kamu harus hidup sengsara. Kuncinya adalah prioritas.\n\nPertama, buat anggaran sederhana. Pisahkan pengeluaran wajib (kos, transport, makan) dari pengeluaran variabel (hiburan, belanja). Rule of thumb: 50% untuk kebutuhan, 30% untuk keinginan, 20% untuk tabungan.\n\nKedua, manfaatkan benefit kantor. Banyak perusahaan punya subsidi makan, BPJS, atau bahkan gym. Maksimalkan semua fasilitas yang ada.\n\nKetiga, cari komunitas. Beli sayur bareng, masak di kos, atau makan siang bareng teman di warung dekat kantor bisa memangkas pengeluaran secara signifikan.\n\nKeempat, investasi dari awal. Mulai dari nominal kecil tidak masalah — yang penting konsisten. Reksa dana pasar uang bisa jadi pilihan pertama yang aman.",
    foto_url: null,
  },
  {
    slug: "cerita-alumni-dari-ikom-ke-industri-teknologi",
    judul: "Dari IKOM ke Industri Teknologi: Cerita Alumni",
    kategori: "Cerita Alumni",
    penulis: "Tim IKA IKOM UPI",
    tanggal: "2024-09-10",
    ringkasan: "Siapa bilang lulusan komunikasi tidak bisa berkarir di tech? Beberapa alumni IKOM UPI membuktikan sebaliknya.",
    konten: "Ketika orang mendengar 'lulusan Ilmu Komunikasi', mereka mungkin langsung berpikir jurnalis, PR officer, atau penyiar. Tapi industri teknologi juga sangat membutuhkan skill komunikasi.\n\nPosit seperti Product Manager, UX Writer, Content Strategist, hingga Community Manager adalah beberapa peran yang sangat cocok untuk lulusan komunikasi di perusahaan tech.\n\nSebagai Product Manager misalnya, kemampuan komunikasi yang baik sangat krusial — kamu harus bisa menjembatani kebutuhan user dengan tim engineering dan business. Latar belakang komunikasi memberikan intuisi yang kuat untuk ini.\n\nUX Writer membutuhkan pemahaman mendalam tentang bahasa dan psikologi pengguna — dua hal yang dipelajari dalam studi komunikasi.\n\nBagi yang tertarik transisi ke industri tech, mulailah dengan mempelajari product thinking, data literacy dasar, dan tools seperti Figma atau Notion. Sertifikasi Google, Meta, atau HubSpot bisa jadi nilai tambah yang signifikan.\n\nJangan takut mencoba — latar belakang komunikasi justru menjadi diferensiasi yang kuat di tengah kandidat dengan background teknis.",
    foto_url: null,
  },
];

export async function fetchPosts() {
  const url = `https://opensheet.elk.sh/${SHEET_ID}/${BLOG_TAB}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error();
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return mockPosts;
    return data.map((row) => ({
      slug: row.slug || "",
      judul: row.judul || "",
      kategori: row.kategori || "Umum",
      penulis: row.penulis || "Tim IKA IKOM UPI",
      tanggal: row.tanggal || "",
      ringkasan: row.ringkasan || "",
      konten: row.konten || "",
      foto_url: row.foto_url || null,
    }));
  } catch {
    return mockPosts;
  }
}

const mockEvents = [
  {
    id: "1",
    judul: "Reuni Mini IKOM UPI — Bandung",
    tanggal: "2026-06-14",
    waktu: "15:00",
    lokasi: "Kedai Kopi Malabar, Dago, Bandung",
    kategori: "Reuni",
    deskripsi: "Kumpul santai antar teman-teman IKOM UPI yang ada di Bandung dan sekitarnya. Catch up kabar, cerita pengalaman kerja, dan tentunya foto bareng. Semua welcome!",
    link_daftar: "",
    foto_url: null,
  },
  {
    id: "2",
    judul: "Webinar: Karir di Era AI — Dari IKOM ke Tech",
    tanggal: "2026-06-28",
    waktu: "19:30",
    lokasi: "Online · Zoom",
    kategori: "Webinar",
    deskripsi: "Alumni IKOM UPI yang sudah berkarir di industri teknologi berbagi pengalaman navigasi karir di era AI. Diskusi terbuka, Q&A, dan networking session.",
    link_daftar: "",
    foto_url: null,
  },
  {
    id: "3",
    judul: "Gathering Jakarta — IKA IKOM UPI",
    tanggal: "2026-07-12",
    waktu: "18:00",
    lokasi: "TBA · Jakarta Selatan",
    kategori: "Gathering",
    deskripsi: "Khusus teman-teman yang domisili di Jabodetabek. Makan malam bareng, update kabar, dan rencanain agenda angkatan semester ini.",
    link_daftar: "",
    foto_url: null,
  },
  {
    id: "4",
    judul: "Workshop: Personal Branding untuk Alumni",
    tanggal: "2026-08-02",
    waktu: "10:00",
    lokasi: "Online · Google Meet",
    kategori: "Workshop",
    deskripsi: "Sesi intensif membangun personal brand di LinkedIn dan media sosial profesional — sangat relevan untuk yang sedang job hunting atau ingin career switch.",
    link_daftar: "",
    foto_url: null,
  },
  {
    id: "5",
    judul: "Reuni Besar IKOM UPI — 7 Tahun Bersama",
    tanggal: "2026-09-20",
    waktu: "13:00",
    lokasi: "Kampus UPI Bandung",
    kategori: "Reuni",
    deskripsi: "Perayaan 7 tahun angkatan IKOM UPI. Reuni besar kembali ke kampus, mengenang perjalanan, dan merayakan pencapaian bersama. Save the date!",
    link_daftar: "",
    foto_url: null,
  },
];

export async function fetchEvents() {
  const url = `https://opensheet.elk.sh/${SHEET_ID}/${EVENTS_TAB}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error();
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return mockEvents;
    return data.map((row, i) => ({
      id: row.id || String(i + 1),
      judul: row.judul || "",
      tanggal: row.tanggal || "",
      waktu: row.waktu || "",
      lokasi: row.lokasi || "",
      kategori: row.kategori || "Event",
      deskripsi: row.deskripsi || "",
      link_daftar: row.link_daftar || "",
      foto_url: row.foto_url || null,
    }));
  } catch {
    return mockEvents;
  }
}

const mockLowongan = [
  {
    id: "1",
    judul: "Content Strategist",
    perusahaan: "Kreasi Digital Studio",
    industri: "Kreatif & Advertising",
    tipe: "Full-time",
    kota: "Jakarta",
    deskripsi: "Mencari content strategist yang berpengalaman dalam perencanaan konten media sosial dan kampanye digital. Preferensi kandidat dengan background komunikasi.",
    kontak: "628111234567",
    poster_nama: "Alanis Rani Rayhana",
    deadline: "2026-06-30",
    created_at: "2026-05-20",
  },
  {
    id: "2",
    judul: "PR & Communications Intern",
    perusahaan: "StartupKu Indonesia",
    industri: "Startup",
    tipe: "Magang",
    kota: "Bandung",
    deskripsi: "Magang 3 bulan di divisi PR & Komunikasi. Tugas meliputi press release, media monitoring, dan koordinasi event. Cocok untuk mahasiswa tingkat akhir atau fresh graduate.",
    kontak: "628129876543",
    poster_nama: "Wanda Putri Rachmalita",
    deadline: "2026-06-15",
    created_at: "2026-05-18",
  },
  {
    id: "3",
    judul: "Copywriter Freelance",
    perusahaan: "Various Clients",
    industri: "Kreatif & Advertising",
    tipe: "Freelance",
    kota: "Remote",
    deskripsi: "Dibutuhkan copywriter freelance untuk project-project jangka pendek. Rate kompetitif, jadwal fleksibel. Ada referral dari alumni IKOM UPI.",
    kontak: "628135556789",
    poster_nama: "Den Reza Alfian Farid",
    deadline: "2026-07-01",
    created_at: "2026-05-22",
  },
];

export async function fetchLowongan() {
  const url = `https://opensheet.elk.sh/${SHEET_ID}/${LOWONGAN_TAB}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error();
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return mockLowongan;
    return data.map((row, i) => ({
      id: row.id || String(i + 1),
      judul: row.judul || "",
      perusahaan: row.perusahaan || "",
      industri: row.industri || "",
      tipe: row.tipe || "Full-time",
      kota: row.kota || "",
      deskripsi: row.deskripsi || "",
      kontak: row.kontak || "",
      poster_nama: row.poster_nama || "",
      deadline: row.deadline || "",
      created_at: row.created_at || "",
    }));
  } catch {
    return mockLowongan;
  }
}

export async function fetchPostBySlug(slug) {
  const posts = await fetchPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export async function fetchAlumni() {
  const url = `https://opensheet.elk.sh/${SHEET_ID}/${TAB_NAME}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error();
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return mockAlumni;
    return data.map((row, i) => ({
      id: row.id || String(i + 1),
      nama: row.nama || "",
      foto_url: row.foto_url || null,
      role: row.role || "",
      perusahaan: row.perusahaan || "",
      industri: row.industri || "",
      kota: row.kota || "",
      bio: row.bio || "",
      linkedin: row.linkedin || null,
      instagram: row.instagram || null,
      whatsapp: row.whatsapp || null,
      email: row.email || null,
      bergabung_at: row.bergabung_at || "2024-01-01",
    }));
  } catch {
    return mockAlumni;
  }
}
