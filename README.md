# ARIWEPHYS (Mobile)
> **Augmented Reality Intelligent Web Physics for Work and Energy Learning**

Aplikasi web interaktif pembelajaran Fisika berorientasi **First-Mobile Look** yang menggabungkan visualisasi 3D **Augmented Reality (AR)**, **AI Tutor Cerdas**, pendekatan **Inkuiri Terbimbing**, dan asesmen kemampuan berpikir tingkat tinggi (**HOTS**).

Aplikasi ini diadaptasi secara langsung dari rancangan desain konseptual (Mockup Desain Lomba) dengan standar estetika **Anti-Slop**: tipografi berbobot tajam, palet warna brand fisis yang otentik, komponen ergonomis ramah sentuhan (touch-friendly), serta simulasi fisika interaktif 60 FPS.

---

## 📱 Kesesuaian Desain Mockup

Aplikasi ini mengimplementasikan seluruh alur yang tertera pada dokumen acuan visual:

### 1. Layar Autentikasi / Login (Mockup 1)
* **Emblem Atom & Buku Terbuka**: Logo vektor ilmiah dengan inti energi menyala (*solar gold core*).
* **Formulir Masuk**: Input `Email atau Nama Pengguna Siswa` dan `Kata Sandi` (dengan fitur toggle lihat/sembunyikan).
* **Akses Cepat**: Tombol **"Masuk Cepat Demo Siswa"** untuk kemudahan pengujian juri/evaluator.
* **Integrasi SSO**: Tombol masuk alternatif via Google, Microsoft, dan Apple.
* **Tautan Legalitas**: Tautan Bantuan dan Kebijakan Privasi di bagian bawah.

### 2. Beranda & Dashboard Pembelajaran (Mockup 2)
* **Banner Utama**: Ringkasan mata pelajaran Usaha dan Energi dengan pratinjau ramp interaktif.
* **4 Pilar Pembelajaran**:
  1. **Augmented Reality**: Visualisasi interaktif 3D vektor gaya dan lintasan.
  2. **AI Tutor Cerdas (Dr. Wephys)**: Konsultasi tanya jawab konsep fisika 24/7 dengan kartu pertanyaan cepat.
  3. **Pendekatan Inkuiri**: Penyelidikan ilmiah berbasis observasi fenomena.
  4. **Tingkatkan Berpikir Kritis**: Latihan soal HOTS kontekstual (C4–C6).
* **Modul Terkini**: Akses cepat ke unit materi Usaha dan Energi.

### 3. Alur 5 Layar Mobile Interaktif (Mockup 3)
1. **Menu Materi**:
   - Visualisasi 3D lintasan ramp dengan vektor gaya normal ($N$), gaya berat ($w$), dan kecepatan ($v$).
   - Akordeon 4 Unit Pembelajaran (Unit 1 Usaha, Unit 2 Energi Kinetik, Unit 3 Energi Potensial, Unit 4 Kekekalan Energi Mekanik).
   - **Kalkulator Interaktif Vektor Usaha**: Slider dinamis sudut $\theta$ ($0^\circ \to 180^\circ$), gaya $F$, dan perpindahan $s$ yang mengklasifikasikan Usaha Positif, Usaha Nol, dan Usaha Negatif secara langsung.
2. **Modul Ajar & LKPD**:
   - Pratinjau Modul Ajar Digital (Kurikulum Merdeka Fase F).
   - Daftar 3 LKPD terstruktur (LKPD 1.1, LKPD 1.2, LKPD 2.1).
   - Fitur **"Kerjakan Lembar Kerja"** interaktif (pengisian hipotesis, tabel data percobaan, analisis, dan kesimpulan dengan penilaian otomatis).
   - Tombol unduh berkas LKPD format PDF.
3. **Simulasi Interaktif (PhET-Style Engine)**:
   - Lintasan mangkuk/ramp parabola dengan gerak bola/skater secara realtime.
   - Diagram batang dinamis: Energi Kinetik ($E_k$), Energi Potensial ($E_p$), dan Energi Termal Gesekan ($W_f$).
   - Slider pengatur massa ($m$: 10–100 kg), koefisien gesekan ($\mu$: 0.00–0.15), dan preset gravitasi (Bumi 9.8, Bulan 1.6, Jupiter 24.8 m/s²).
   - Kontrol pemutaran: Play, Jeda, Slow-Motion (0.5x), dan Reset Posisi.
4. **Fenomena & Tes Evaluasi HOTS**:
   - Studi kasus kontekstual: *Rube Goldberg Machine* dan *Roller Coaster Loop-the-Loop*.
   - 5 Langkah Sintaks Inkuiri Terbimbing (Orientasi $\to$ Hipotesis $\to$ Uji Coba $\to$ Analisis $\to$ Kesimpulan).
   - Mesin Kuis HOTS: Soal pilihan ganda bernalar analitis lengkap dengan pembahasan mendalam dan tombol tanya ke AI Tutor.
   - Akordeon FAQ & Kendala Umum.
5. **Panduan Penggunaan & Profil Siswa**:
   - Panduan langkah pemindaian marker AR (izin kamera, targetting, interaksi 3D).
   - Peta Konsep (*Mind Map*) hubungan Usaha dan Energi.
   - Profil siswa dengan kartu lencana pencapaian (*achievement badges*) dan tombol unduh sertifikat kelulusan.

---

## 🎨 Prinsip Desain Anti-Slop

* **Identitas Visual Otentik**: Menghindari gradien ungu-biru generik AI (*slop glow*). Menggunakan palet akademis:
  - *Deep Navy / Indigo*: `#0A2540`, `#0F2F57`
  - *Solar Gold / Energy Amber*: `#F59E0B`, `#D97706`
  - *Electric Sky Blue*: `#0284C7`, `#38BDF8`
  - *Neutral Canvas*: `#F8FAFC`, `#FFFFFF`, `#E2E8F0`
* **First-Mobile Architecture**: Mengutamakan ergonomi perangkat bergerak (area jangkauan jempol, navigasi bawah 5 tab berlabel jelas, target sentuh minimal 44x44px).
* **Mode Tampilan Ganda**:
  - **Tampilan Ponsel (Realistic Device Frame)**: Menggunakan chassis smartphone realistis dengan *dynamic island*, tombol fisik samping, dan indikator status bar.
  - **Tampilan Web Responsif**: Menyesuaikan layar penuh untuk peninjauan desktop.
  - **Pembanding Desain Mockup**: Fitur modal untuk melihat langsung 3 gambar rancangan lomba asli.

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi dibangun menggunakan **React 19 + TypeScript + Tailwind CSS v4 + Vite + Lucide Icons + Framer Motion**.

### 1. Masuk ke folder proyek
```bash
cd "e:\Fadli\7 Kegiatan\Lomba\malay\Projek\ariwephys"
```

### 2. Jalankan Server Pengembangan (Dev Server)
```bash
npm run dev
```
Buka browser pada alamat yang ditampilkan (misal: `http://localhost:5173/`).

### 3. Membangun untuk Produksi (Build)
```bash
npm run build
npm run preview
```

---

*Dikembangkan untuk perlombaan inovasi media pembelajaran berbasis Augmented Reality dan Artificial Intelligence.*
