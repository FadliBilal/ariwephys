import { LessonUnit, LkpdItem, QuizQuestion } from '../types';

export const INITIAL_USER = {
  name: 'Fadhil Rahman',
  email: 'fadhil.siswa@ariwephys.edu',
  nisn: '0075489211',
  school: 'SMA Negeri 1 Prestasi',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  progressPercent: 68,
  completedLkpd: [1, 2],
  quizHighScore: 92,
  badges: [
    { id: '1', name: 'Master Usaha', icon: '⚡', earned: true, date: '24 Okt 2026' },
    { id: '2', name: 'Penemu Energi', icon: '🎯', earned: true, date: '25 Okt 2026' },
    { id: '3', name: 'Eksperimen Ramp 3D', icon: '🛹', earned: true, date: '26 Okt 2026' },
    { id: '4', name: 'Inkuiri Unggul', icon: '🔬', earned: false },
  ]
};

export const LESSON_UNITS: LessonUnit[] = [
  {
    id: 1,
    title: 'Unit 1: Usaha (Definisi dan Vektor Gaya)',
    subtitle: 'Konsep dasar usaha fisis, pengaruh sudut gaya θ, dan perpindahan',
    description: 'Dalam fisika, usaha didefinisikan sebagai hasil kali komponen gaya yang searah perpindahan dengan besar perpindahan itu sendiri. Jika gaya membentuk sudut θ terhadap arah gerak, usaha dinyatakan sebagai W = F · s · cos(θ).',
    formula: 'W = F · s · cos(θ)',
    formulaExplanation: 'W = Usaha (Joule/J), F = Gaya (Newton/N), s = Perpindahan (meter/m), θ = Sudut antara vektor gaya dan perpindahan.',
    interactiveType: 'vector-work',
    subtopics: [
      {
        title: 'Karakteristik Usaha Fisis vs Keseharian',
        content: 'Dalam bahasa sehari-hari, mendorong tembok hingga lelah dianggap usaha. Namun dalam fisika, karena tembok tidak berpindah (s = 0), maka usaha bernilai 0 Joule!',
        keyPoints: ['Usaha bernilai positif jika 0° ≤ θ < 90°', 'Usaha bernilai nol jika gaya tegak lurus arah gerak (θ = 90°)', 'Usaha bernilai negatif jika gaya berlawanan arah perpindahan (90° < θ ≤ 180°)']
      },
      {
        title: 'Grafik Gaya terhadap Perpindahan F(s)',
        content: 'Usaha total oleh gaya yang berubah-ubah (variabel) secara matematis sama dengan luas daerah di bawah kurva grafik F terhadap s.',
        keyPoints: ['Luas daerah persegi panjang / trapesium = Usaha (W)', 'Untuk gaya variabel pegas: W = ½ k x²']
      }
    ]
  },
  {
    id: 2,
    title: 'Unit 2: Energi Kinetik - Teori dan Latihan',
    subtitle: 'Energi benda yang bergerak dan Teorema Usaha-Energi Kinetik',
    description: 'Energi kinetik adalah energi yang dimiliki benda karena gerak (kecepatannya). Hubungan fundamental antara usaha resultan gaya dan perubahan kelajuan benda dirumuskan dalam Teorema Usaha-Energi: W_net = ΔEk.',
    formula: 'Ek = ½ m v²  |  W_net = Ek₂ - Ek₁',
    formulaExplanation: 'Ek = Energi Kinetik (Joule), m = Massa benda (kg), v = Kecepatan (m/s), W_net = Usaha total resultan gaya.',
    interactiveType: 'kinetic-energy',
    subtopics: [
      {
        title: 'Teorema Usaha - Energi Kinetik',
        content: 'Usaha total yang dilakukan oleh semua gaya yang bekerja pada suatu benda sama dengan perubahan energi kinetik benda tersebut: W_net = ½ m (v₂² - v₁²).',
        keyPoints: ['Bila usaha bernilai positif, kelajuan benda bertambah cepat', 'Bila usaha bernilai negatif (misal gaya gesek), kelajuan berkurang']
      }
    ]
  },
  {
    id: 3,
    title: 'Unit 3: Energi Potensial Gravitasi & Pegas',
    subtitle: 'Energi posisi dan energi medan konservatif',
    description: 'Energi potensial adalah energi yang tersimpan dalam suatu sistem akibat konfigurasi spasial atau posisi benda terhadap titik acuan. Energi potensial gravitasi bumi dihitung berdasarkan ketinggian h dari bidang acuan.',
    formula: 'Ep_grav = m · g · h  |  Ep_pegas = ½ k Δx²',
    formulaExplanation: 'm = massa (kg), g = percepatan gravitasi (9.8 m/s²), h = ketinggian vertikal (m), k = konstanta pegas (N/m), Δx = pertambahan panjang (m).',
    interactiveType: 'potential-energy',
    subtopics: [
      {
        title: 'Karakteristik Gaya Konservatif',
        content: 'Gaya gravitasi adalah gaya konservatif: usaha yang dilakukannya hanya bergantung pada posisi awal dan akhir, tidak bergantung pada bentuk lintasan yang ditempuh.',
        keyPoints: ['W_grav = -ΔEp = -(Ep₂ - Ep₁)', 'Benda meluncur di bidang miring licin atau jatuh bebas menghasilkan kelajuan akhir sama jika Δh sama']
      }
    ]
  },
  {
    id: 4,
    title: 'Unit 4: Hukum Kekekalan Energi Mekanik',
    subtitle: 'Transformasi energi tanpa gesekan dan disipasi termal',
    description: 'Jika pada suatu sistem hanya bekerja gaya-gaya konservatif (tidak ada gaya gesekan atau resistansi udara non-konservatif), maka jumlah total energi kinetik dan energi potensial (Energi Mekanik) bernilai konstan di setiap titik lintasan.',
    formula: 'EM₁ = EM₂  <=>  Ep₁ + Ek₁ = Ep₂ + Ek₂',
    formulaExplanation: 'm g h₁ + ½ m v₁² = m g h₂ + ½ m v₂². Pada lintasan dengan gesekan: EM₁ = EM₂ + W_gesek (energi termal).',
    interactiveType: 'conservation',
    subtopics: [
      {
        title: 'Aplikasi pada Lintasan Ramp & Roller Coaster',
        content: 'Di titik tertinggi (h = h_max), kelajuan v = 0 sehingga seluruh energi berupa Ep. Saat meluncur ke dasar (h = 0), seluruh energi terkonversi menjadi Ek, menghasilkan kecepatan v = √(2gh).',
        keyPoints: ['Di puncak: Ep maksimum, Ek = 0', 'Di dasar: Ek maksimum, Ep = 0', 'Di titik tengah: Ep = Ek = ½ EM']
      }
    ]
  }
];

export const LKPD_LIST: LkpdItem[] = [
  {
    id: 1,
    number: 'LKPD 1.1',
    title: 'Penyelidikan Pengaruh Sudut Gaya (θ) terhadap Besar Usaha',
    objective: 'Menganalisis hubungan antara besar gaya, perpindahan, dan sudut kemiringan tali penarik terhadap usaha mekanik yang dihasilkan.',
    unit: 'Unit 1: Usaha Fisis',
    estimatedMinutes: 30,
    status: 'selesai',
    score: 95,
    toolsNeeded: ['Dinamometer Virtual', 'Balok Beban', 'Busur Derajat Digital', 'Penggaris Virtual'],
    inquiryStep: 'Tahap 3: Uji Coba Hipotesis & Analisis Variabel',
    hypothesisGuide: 'Jika sudut antara gaya tarik dan arah mendatar semakin besar (mendekati 90°), maka usaha yang dihasilkan pada balok akan semakin kecil mendekati nol.'
  },
  {
    id: 2,
    number: 'LKPD 1.2',
    title: 'Verifikasi Teorema Usaha-Energi Kinetik pada Gerak Lurus',
    objective: 'Membuktikan kesetaraan antara usaha total resultan gaya dengan perubahan energi kinetik benda (W_net = ΔEk).',
    unit: 'Unit 2: Energi Kinetik',
    estimatedMinutes: 40,
    status: 'selesai',
    score: 88,
    toolsNeeded: ['Troli Percobaan', 'Sensor Kelajuan Fotodioda', 'Beban Gantung', 'Mistara'],
    inquiryStep: 'Tahap 4: Pengolahan Data & Grafik Hubungan',
    hypothesisGuide: 'Perubahan kelajuan kuadrat benda (v₂² - v₁²) berbanding lurus dengan perpindahan s dan gaya netto yang diberikan.'
  },
  {
    id: 3,
    number: 'LKPD 2.1',
    title: 'Investigasi Kekekalan Energi Mekanik pada Lintasan Miring Bergesekan',
    objective: 'Menginvestigasi transformasi energi potensial gravitasi menjadi energi kinetik dan energi panas akibat gesekan pada lintasan lengkung.',
    unit: 'Unit 4: Kekekalan Energi Mekanik',
    estimatedMinutes: 45,
    status: 'sedang',
    score: undefined,
    toolsNeeded: ['Simulator Ramp Fisika 3D', 'Sensor Ketinggian & Kecepatan', 'Pengatur Koefisien Gesek μ'],
    inquiryStep: 'Tahap 2: Merumuskan Hipotesis & Eksperimen',
    hypothesisGuide: 'Ketika koefisien gesekan μ = 0, energi mekanik total kekal konstan; sedangkan saat μ > 0, selisih energi mekanik tepat sama dengan usaha gaya gesek (W_f = f · s).'
  }
];

export const HOTS_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Sebuah balok bermassa 4 kg ditarik dengan gaya tetap F = 50 N yang membentuk sudut 60° terhadap lantai datar licin sejauh 8 meter. Berapakah usaha yang dilakukan gaya penarik tersebut?',
    context: 'Perhitungan Usaha dengan Gaya Membentuk Sudut (C4 - Menganalisis)',
    options: [
      { label: 'A', text: '400 Joule' },
      { label: 'B', text: '200 Joule' },
      { label: 'C', text: '200√3 Joule' },
      { label: 'D', text: '100 Joule' }
    ],
    correctAnswer: 'B',
    explanation: 'Gunakan rumus W = F · s · cos(θ). Nilai cos(60°) = 0,5. Maka W = 50 N × 8 m × 0,5 = 200 Joule. Komponen gaya yang melakukan usaha hanyalah gaya horizontal Fx = F cos 60°.',
    hotsCategory: 'Menganalisis (C4)'
  },
  {
    id: 2,
    question: 'Seorang pemain skateboard bermassa total 60 kg meluncur dari puncak lintasan mangkuk (bowl) setinggi 5 meter di atas tanah tanpa kecepatan awal (v₀ = 0). Jika percepatan gravitasi g = 10 m/s² dan gaya gesek diabaikan, berapakah kecepatan pemain skateboard saat berada pada ketinggian 1,8 meter dari dasar?',
    context: 'Hukum Kekekalan Energi Mekanik pada Lintasan Melengkung (C4)',
    options: [
      { label: 'A', text: '6,4 m/s' },
      { label: 'B', text: '8,0 m/s' },
      { label: 'C', text: '10,0 m/s' },
      { label: 'D', text: '12,5 m/s' }
    ],
    correctAnswer: 'B',
    explanation: 'Berdasarkan Hukum Kekekalan Energi Mekanik: EM₁ = EM₂ -> m g h₁ + 0 = m g h₂ + ½ m v₂². Bagi kedua ruas dengan m: g(h₁ - h₂) = ½ v₂² -> 10 × (5,0 - 1,8) = 10 × 3,2 = 32 = ½ v₂² -> v₂² = 64 -> v₂ = 8 m/s.',
    hotsCategory: 'Menganalisis (C4)'
  },
  {
    id: 3,
    question: 'Dua buah mobil A dan B memiliki massa yang sama (m_A = m_B). Mobil A melaju dengan kecepatan 20 m/s sedangkan mobil B melaju dengan kecepatan 40 m/s. Jika kedua mobil mengerem dengan gaya pengereman rata-rata yang sama persis, perbandingan jarak pengereman yang dibutuhkan mobil A dan mobil B sampai berhenti adalah...',
    context: 'Aplikasi Teorema Usaha-Energi Kinetik dalam Keselamatan Jalan Raya (C5 - Mengevaluasi)',
    options: [
      { label: 'A', text: '1 : 2' },
      { label: 'B', text: '1 : 4' },
      { label: 'C', text: '1 : 8' },
      { label: 'D', text: '2 : 1' }
    ],
    correctAnswer: 'B',
    explanation: 'Berdasarkan Teorema Usaha-Energi: W_rem = ΔEk -> F_rem · s = ½ m v². Karena gaya rem F dan massa m sama, jarak pengereman s berbanding lurus dengan kuadrat kecepatan (s ∝ v²). Maka s_A / s_B = (v_A / v_B)² = (20/40)² = (1/2)² = 1/4 (perbandingan 1 : 4). Ini membuktikan melipatgandakan kecepatan memperpanjang jarak pengereman hingga 4 kali lipat!',
    hotsCategory: 'Mengevaluasi (C5)'
  },
  {
    id: 4,
    question: 'Seorang insinyur merancang wahana roller coaster. Kereta diluncurkan dari puncak pertama setinggi H menuju lintasan lingkaran vertikal (loop-the-loop) berjari-jari R tanpa mesin pendorong. Agar kereta tidak jatuh saat berada di titik tertinggi lingkaran, tinggi minimum H adalah...',
    context: 'Desain Rekayasa Berbasis Dinamika Energi Kritis (C6 - Mencipta)',
    options: [
      { label: 'A', text: 'H_min = 2,0 R' },
      { label: 'B', text: 'H_min = 2,5 R' },
      { label: 'C', text: 'H_min = 3,0 R' },
      { label: 'D', text: 'H_min = 1,5 R' }
    ],
    correctAnswer: 'B',
    explanation: 'Di puncak loop (ketinggian 2R), syarat tidak jatuh adalah gaya normal N ≥ 0 -> gaya sentripetal minimum dicapai gravitasi: m v² / R = m g -> v² = g R. Dengan kekekalan energi dari puncak H: m g H = m g (2R) + ½ m v² -> g H = 2 g R + ½ (g R) = 2,5 g R -> H = 2,5 R. Rancangan ini esensial untuk keselamatan roller coaster.',
    hotsCategory: 'Mencipta (C6)'
  }
];

export const AI_KNOWLEDGE_BASE = [
  {
    triggers: ['usaha', 'apa itu usaha', 'rumus usaha', 'definisi usaha'],
    answer: 'Dalam Fisika, **Usaha (W)** terjadi apabila gaya (F) menyebabkan benda berpindah (s). Rumus utamanya adalah:\n\n$$W = F \\cdot s \\cdot \\cos(\\theta)$$\n\n- Satuan Usaha adalah **Joule (J)** atau Newton-meter (N·m).\n- Jika gaya tegak lurus arah gerak (θ = 90°, misal membawa tas sambil berjalan mendatar), usaha oleh gaya angkat bernilai **Nol** karena cos(90°) = 0!'
  },
  {
    triggers: ['energi kinetik', 'kinetik', 'ek', 'teorema usaha'],
    answer: '**Energi Kinetik (Ek)** adalah energi gerak suatu benda:\n\n$$E_k = \\frac{1}{2} m v^2$$\n\nHubungan dengan usaha tertuang dalam **Teorema Usaha-Energi**:\n$$W_{net} = \\Delta E_k = \\frac{1}{2}m(v_2^2 - v_1^2)$$\n\nJika usaha total positif, kelajuan bertambah. Jika negatif (seperti gaya rem), kelajuan berkurang.'
  },
  {
    triggers: ['energi potensial', 'ep', 'potensial gravitasi', 'ketinggian'],
    answer: '**Energi Potensial Gravitasi (Ep)** adalah energi yang tersimpan karena posisi atau ketinggian benda terhadap bidang acuan:\n\n$$E_p = m \\cdot g \\cdot h$$\n\n- Semakin tinggi posisi benda ($h$), semakin besar $E_p$-nya.\n- Ketika benda jatuh bebas, $E_p$ akan berkurang dan bertransformasi menjadi $E_k$.'
  },
  {
    triggers: ['kekekalan energi', 'energi mekanik', 'em', 'hukum kekekalan'],
    answer: '**Hukum Kekekalan Energi Mekanik** menyatakan bahwa dalam sistem konservatif (tanpa gesekan udara/lantai), total energi mekanik selalu tetap:\n\n$$E_{M1} = E_{M2} \\implies E_{p1} + E_{k1} = E_{p2} + E_{k2}$$\n\n$$m g h_1 + \\frac{1}{2} m v_1^2 = m g h_2 + \\frac{1}{2} m v_2^2$$\n\nJika terdapat gaya gesek ($\\mu > 0$), maka sebagian energi berubah menjadi energi panas (kalor): $E_{M1} = E_{M2} + W_{gesek}$.'
  },
  {
    triggers: ['ar', 'augmented reality', 'marker', 'kamera'],
    answer: 'Fitur **Augmented Reality (AR)** pada ARIWEPHYS memungkinkan kamu memvisualisasikan vektor gaya (gaya berat $w$, gaya normal $N$, gaya gesek $f$) serta diagram batang energi secara 3D langsung di atas mejamu menggunakan kamera ponsel! Buka tab **Panduan** atau klik tombol **Jelajahi AR** di Beranda untuk mencobanya.'
  },
  {
    triggers: ['lkpd', 'unduh lkpd', 'tugas'],
    answer: 'Kamu dapat mengakses 3 LKPD digital di menu **Modul Ajar & LKPD**:\n1. **LKPD 1.1**: Penyelidikan Pengaruh Sudut Gaya\n2. **LKPD 1.2**: Verifikasi Teorema Usaha-Energi\n3. **LKPD 2.1**: Investigasi Kekekalan Energi pada Ramp Miring\nKamu bisa mengisi data pengamatan langsung di simulator atau mengunduh lembar LKPD berformat PDF!'
  }
];

export const FAQ_LIST = [
  {
    q: 'Bagaimana cara menggunakan fitur Augmented Reality (AR) di ARIWEPHYS?',
    a: 'Arahkan kamera ponsel kamu ke marker fisik yang tertera pada LKPD atau buku paket fisika. Aplikasi akan secara otomatis merender model lintasan skate park 3D dan vektor energi di atas permukaan datar.'
  },
  {
    q: 'Mengapa energi kinetik pada grafik simulasi bernilai nol di puncak ramp?',
    a: 'Karena di titik balik tertinggi, kecepatan sesaat skater sama dengan nol ($v = 0$). Sesuai persamaan $E_k = \\frac{1}{2} m v^2$, saat $v = 0$ maka seluruh energi tersimpan sebagai energi potensial gravitasi ($E_p = m g h$).'
  },
  {
    q: 'Apakah aplikasi ini dapat dijalankan secara offline?',
    a: 'Ya! ARIWEPHYS dirancang sebagai Progressive Web App (PWA) yang dapat disimpan ke layar utama ponsel (Add to Home Screen) dan menjalankan kalkulator serta simulasi tanpa koneksi internet.'
  }
];
