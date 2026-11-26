import type { Buddy, CommunityPost, NotificationItem, Session, ServiceType, UserProfile } from '../types';

export const ALL_INTERESTS = [
  'Musik',
  'Film & serial',
  'Buku',
  'Kehidupan kampus',
  'Karier',
  'Belajar bahasa',
  'Seni',
  'Game',
  'Olahraga',
  'Journaling',
  'Kampus',
];

export const ONBOARDING_INTERESTS = [
  'Musik',
  'Film & serial',
  'Buku',
  'Kehidupan kampus',
  'Karier',
  'Belajar bahasa',
  'Seni',
  'Game',
  'Olahraga',
  'Journaling',
];

export const BOOKING_DATES = [
  { id: '2026-10-18', dayShort: 'Min', dayNum: '18', fullLabel: '18 Okt 2026' },
  { id: '2026-10-19', dayShort: 'Sen', dayNum: '19', fullLabel: '19 Okt 2026' },
  { id: '2026-10-20', dayShort: 'Sel', dayNum: '20', fullLabel: '20 Okt 2026' },
  { id: '2026-10-21', dayShort: 'Rab', dayNum: '21', fullLabel: '21 Okt 2026' },
  { id: '2026-10-22', dayShort: 'Kam', dayNum: '22', fullLabel: '22 Okt 2026' },
  { id: '2026-10-23', dayShort: 'Jum', dayNum: '23', fullLabel: '23 Okt 2026' },
  { id: '2026-10-24', dayShort: 'Sab', dayNum: '24', fullLabel: '24 Okt 2026' },
];

export const START_TIMES = ['18.00', '19.00', '20.00', '21.00'];

export const REVIEW_TAGS = [
  'Pendengar baik',
  'Tidak menghakimi',
  'Sabar',
  'Hangat',
  'Membantu fokus',
];

export const BUDDIES: Buddy[] = [
  {
    id: 'nara',
    name: 'Nara',
    age: 23,
    language: 'Bahasa Indonesia',
    verified: true,
    mascot: 'blue',
    tagline: 'Cerita pelan-pelan, aku dengarkan.',
    bio: [
      'Aku suka mendengar cerita kecil tentang hari yang panjang. Kita bisa ngobrol soal kampus, musik favorit, atau sekadar duduk bareng sambil belajar.',
      'Nggak perlu menyiapkan topik. Mulai dari yang terasa nyaman buatmu.',
    ],
    rating: 4.9,
    reviewCount: 86,
    sessionCount: 128,
    interests: ['Musik', 'Kampus', 'Journaling'],
    services: ['Story', 'Chat', 'Study'],
    availableToday: true,
    pricing: {
      Story: [
        { durationMinutes: 30, label: '30 menit', price: 18000 },
        { durationMinutes: 60, label: '1 jam', price: 30000 },
      ],
      Chat: [
        { durationMinutes: 30, label: '30 menit', price: 15000 },
        { durationMinutes: 60, label: '1 jam', price: 25000 },
      ],
      Study: [
        { durationMinutes: 60, label: '1 jam', price: 20000 },
        { durationMinutes: 120, label: '2 jam', price: 35000 },
      ],
    },
    reviews: [
      {
        id: 'rev-1',
        author: 'Rani',
        age: 21,
        service: 'Chat',
        rating: 5,
        tags: ['Pendengar baik', 'Tidak menghakimi'],
        comment: 'Nara bikin aku nyaman cerita, tanpa buru-buru.',
        date: '14 Okt 2026',
      },
      {
        id: 'rev-2',
        author: 'Jasten',
        age: 22,
        service: 'Study',
        rating: 5,
        tags: ['Membantu fokus', 'Hangat'],
        comment: 'Awalnya bingung mau mulai dari mana. Nara bikin aku nyaman cerita, tanpa buru-buru.',
        date: '10 Okt 2026',
      },
      {
        id: 'rev-3',
        author: 'Awan tenang',
        service: 'Story',
        rating: 5,
        tags: ['Sabar', 'Pendengar baik'],
        comment: 'Rasanya seperti punya teman duduk di ruang yang tenang.',
        date: '2 Okt 2026',
      },
    ],
  },
  {
    id: 'dimas',
    name: 'Dimas',
    age: 24,
    language: 'Bahasa Indonesia',
    verified: true,
    mascot: 'mint',
    tagline: 'Belajar bareng, satu langkah dulu.',
    bio: [
      'Halo, aku Dimas! Aku senang menemani sesi belajar dengan metode Pomodoro, diskusi tugas kuliah, atau ngobrol santai soal buku dan film.',
      'Target kecil hari ini tetap berarti. Kita jalan pelan-pelan bareng.',
    ],
    rating: 4.8,
    reviewCount: 64,
    sessionCount: 96,
    interests: ['Buku', 'Karier', 'Musik', 'Kehidupan kampus'],
    services: ['Study', 'Chat', 'Story'],
    availableToday: true,
    pricing: {
      Story: [
        { durationMinutes: 30, label: '30 menit', price: 18000 },
        { durationMinutes: 60, label: '1 jam', price: 30000 },
      ],
      Chat: [
        { durationMinutes: 30, label: '30 menit', price: 15000 },
        { durationMinutes: 60, label: '1 jam', price: 25000 },
      ],
      Study: [
        { durationMinutes: 60, label: '1 jam', price: 20000 },
        { durationMinutes: 120, label: '2 jam', price: 35000 },
      ],
    },
    reviews: [
      {
        id: 'rev-d1',
        author: 'Rani Irene',
        age: 21,
        service: 'Study',
        rating: 5,
        tags: ['Membantu fokus', 'Sabar'],
        comment: 'Akhirnya tugas selesai. Ada teman fokus bikin belajar terasa lebih ringan.',
        date: '12 Okt 2026',
      },
    ],
  },
  {
    id: 'salsa',
    name: 'Salsa',
    age: 22,
    language: 'Bahasa Indonesia',
    verified: true,
    mascot: 'mint',
    tagline: 'Musik, film, dan obrolan sehari-hari.',
    bio: [
      'Aku suka dengerin cerita tentang hal-hal kecil yang bikin kamu senyum atau capek hari ini. Nggak harus serius terus, kok.',
      'Kalau lagi butuh teman bertukar playlist atau bahas serial terbaru, aku siap menemani.',
    ],
    rating: 4.9,
    reviewCount: 51,
    sessionCount: 74,
    interests: ['Musik', 'Film & serial', 'Seni', 'Journaling'],
    services: ['Chat', 'Story'],
    availableToday: true,
    pricing: {
      Story: [
        { durationMinutes: 30, label: '30 menit', price: 18000 },
        { durationMinutes: 60, label: '1 jam', price: 30000 },
      ],
      Chat: [
        { durationMinutes: 30, label: '30 menit', price: 15000 },
        { durationMinutes: 60, label: '1 jam', price: 25000 },
      ],
      Study: [
        { durationMinutes: 60, label: '1 jam', price: 20000 },
        { durationMinutes: 120, label: '2 jam', price: 35000 },
      ],
    },
    reviews: [
      {
        id: 'rev-s1',
        author: 'Senja',
        age: 20,
        service: 'Chat',
        rating: 5,
        tags: ['Hangat', 'Tidak menghakimi'],
        comment: 'Obrolannya mengalir santai banget, nggak canggung sama sekali.',
        date: '8 Okt 2026',
      },
    ],
  },
  {
    id: 'raka',
    name: 'Raka',
    age: 24,
    language: 'Bahasa Indonesia',
    verified: true,
    mascot: 'blue',
    tagline: 'Teman ngobrol tentang dunia kampus.',
    bio: [
      'Lagi pusing skripsi, organisasi, atau adaptasi lingkungan baru? Aku pernah di fase itu juga dan siap mendengarkan ceritamu.',
      'Kita bisa pecah masalah yang terasa besar jadi langkah-langkah kecil.',
    ],
    rating: 4.8,
    reviewCount: 42,
    sessionCount: 56,
    interests: ['Kampus', 'Kehidupan kampus', 'Olahraga', 'Game'],
    services: ['Chat', 'Study', 'Story'],
    availableToday: true,
    pricing: {
      Story: [
        { durationMinutes: 30, label: '30 menit', price: 18000 },
        { durationMinutes: 60, label: '1 jam', price: 30000 },
      ],
      Chat: [
        { durationMinutes: 30, label: '30 menit', price: 15000 },
        { durationMinutes: 60, label: '1 jam', price: 25000 },
      ],
      Study: [
        { durationMinutes: 60, label: '1 jam', price: 20000 },
        { durationMinutes: 120, label: '2 jam', price: 35000 },
      ],
    },
    reviews: [
      {
        id: 'rev-r1',
        author: 'Bagas',
        age: 21,
        service: 'Chat',
        rating: 5,
        tags: ['Pendengar baik', 'Sabar'],
        comment: 'Raka ngerti banget dinamika anak rantau dan tugas akhir.',
        date: '5 Okt 2026',
      },
    ],
  },
  {
    id: 'kalea',
    name: 'Kalea',
    age: 23,
    language: 'Bahasa Indonesia',
    verified: true,
    mascot: 'mint',
    tagline: 'Menulis pelan, bernapas sejenak.',
    bio: [
      'Aku senang journaling, membaca fiksi, dan menemani orang-orang yang butuh ruang aman untuk menata pikirannya.',
      'Kamu bebas bercerita sepotong demi sepotong.',
    ],
    rating: 4.9,
    reviewCount: 38,
    sessionCount: 62,
    interests: ['Journaling', 'Buku', 'Seni', 'Musik'],
    services: ['Story', 'Chat'],
    availableToday: false,
    pricing: {
      Story: [
        { durationMinutes: 30, label: '30 menit', price: 18000 },
        { durationMinutes: 60, label: '1 jam', price: 30000 },
      ],
      Chat: [
        { durationMinutes: 30, label: '30 menit', price: 15000 },
        { durationMinutes: 60, label: '1 jam', price: 25000 },
      ],
      Study: [
        { durationMinutes: 60, label: '1 jam', price: 20000 },
        { durationMinutes: 120, label: '2 jam', price: 35000 },
      ],
    },
    reviews: [
      {
        id: 'rev-k1',
        author: 'Nadia',
        age: 22,
        service: 'Story',
        rating: 5,
        tags: ['Hangat', 'Tidak menghakimi'],
        comment: 'Suasananya adem banget, rasanya didengar sepenuhnya.',
        date: '1 Okt 2026',
      },
    ],
  },
  {
    id: 'bima',
    name: 'Bima',
    age: 25,
    language: 'Bahasa Indonesia',
    verified: true,
    mascot: 'blue',
    tagline: 'Teman diskusi karier dan belajar bahasa.',
    bio: [
      'Kita bisa ngobrol soal transisi kuliah ke kerja, latihan fokus 25 menit, atau sekadar melepas penat setelah hari yang padat.',
      'Setiap progres kecil layak dirayakan.',
    ],
    rating: 4.7,
    reviewCount: 29,
    sessionCount: 44,
    interests: ['Karier', 'Belajar bahasa', 'Film & serial'],
    services: ['Study', 'Chat'],
    availableToday: true,
    pricing: {
      Story: [
        { durationMinutes: 30, label: '30 menit', price: 18000 },
        { durationMinutes: 60, label: '1 jam', price: 30000 },
      ],
      Chat: [
        { durationMinutes: 30, label: '30 menit', price: 15000 },
        { durationMinutes: 60, label: '1 jam', price: 25000 },
      ],
      Study: [
        { durationMinutes: 60, label: '1 jam', price: 20000 },
        { durationMinutes: 120, label: '2 jam', price: 35000 },
      ],
    },
    reviews: [
      {
        id: 'rev-b1',
        author: 'Tama',
        age: 23,
        service: 'Study',
        rating: 5,
        tags: ['Membantu fokus'],
        comment: 'Sesi study barengnya terstruktur tapi tetap santai.',
        date: '29 Sep 2026',
      },
    ],
  },
];

export const HOME_TESTIMONIALS = [
  {
    id: 't1',
    name: 'Jasten Kaina',
    date: '2025-12-26',
    quote: '“Awalnya bingung mau mulai dari mana. Nara bikin aku nyaman cerita, tanpa buru-buru.”',
    avatar: '/src/assets/images/avatar_jasten_1795676968781.jpg',
  },
  {
    id: 't2',
    name: 'Rani Irene',
    date: '2026-01-02',
    quote: '“Akhirnya tugas selesai. Ada teman fokus bikin belajar terasa lebih ringan.”',
    avatar: '/src/assets/images/avatar_rani_1795676969726.jpg',
  },
];

export const INITIAL_USER: UserProfile = {
  nickname: 'Alya',
  email: 'alya@email.com',
  birthDate: '2005-05-12',
  joinedLabel: 'Bergabung Oktober 2026',
  mascot: 'blue',
  preferredNeed: 'Chat',
  interests: ['Musik', 'Kampus', 'Journaling'],
  notificationsEnabled: true,
  parentalConsentGiven: false,
  isLoggedIn: false,
  hasCompletedOnboarding: false,
};

export const INITIAL_SESSIONS: Session[] = [
  {
    id: 'ses-upcoming-1',
    orderId: 'TC20102601',
    buddyId: 'nara',
    buddyName: 'Nara',
    buddyMascot: 'blue',
    service: 'Chat',
    durationMinutes: 30,
    durationLabel: '30 menit',
    dateLabel: '20 Okt 2026',
    timeRange: '19.00–19.30 WIB',
    price: 15000,
    paymentMethodLabel: 'GoPay · Rp15.000',
    status: 'upcoming',
    remainingSeconds: 1800,
    messages: [
      {
        id: 'm-up-1',
        sender: 'buddy',
        text: 'Hai Alya, aku Nara. Makasih sudah pesan waktu bareng ya. Nanti kita mulai pelan-pelan.',
        time: '18.55',
      },
    ],
  },
  {
    id: 'ses-upcoming-2',
    orderId: 'TC21102602',
    buddyId: 'dimas',
    buddyName: 'Dimas',
    buddyMascot: 'mint',
    service: 'Study',
    durationMinutes: 60,
    durationLabel: '1 jam',
    dateLabel: '21 Okt 2026',
    timeRange: '20.00–21.00 WIB',
    price: 20000,
    paymentMethodLabel: 'BCA VA · Rp20.000',
    status: 'upcoming',
    remainingSeconds: 3600,
    messages: [
      {
        id: 'm-up-2',
        sender: 'buddy',
        text: 'Halo Alya! Aku Dimas. Besok kita pakai Pomodoro 25 menit fokus dulu, ya. Siapin target kecilmu!',
        time: '19.55',
      },
    ],
  },
  {
    id: 'ses-ongoing-1',
    orderId: 'TC20102600',
    buddyId: 'nara',
    buddyName: 'Nara',
    buddyMascot: 'blue',
    service: 'Chat',
    durationMinutes: 30,
    durationLabel: '30 menit',
    dateLabel: '20 Okt 2026',
    timeRange: '19.00–19.30 WIB',
    price: 15000,
    paymentMethodLabel: 'GoPay · Rp15.000',
    status: 'ongoing',
    remainingSeconds: 24 * 60 + 18,
    messages: [
      {
        id: 'm-on-1',
        sender: 'buddy',
        text: 'Hai Alya, aku Nara. Makasih sudah datang. Mau mulai dari kabarmu hari ini?',
        time: '19.00',
      },
      {
        id: 'm-on-2',
        sender: 'user',
        text: 'Hari ini rasanya penuh banget. Banyak tugas, tapi bingung mau mulai dari mana.',
        time: '19.01',
        status: 'Dibaca',
      },
      {
        id: 'm-on-3',
        sender: 'buddy',
        text: 'Kedengarannya melelahkan. Aku di sini, kok. Bagian mana yang paling ingin kamu ceritakan dulu?',
        time: '19.04',
      },
    ],
  },
  {
    id: 'ses-completed-1',
    orderId: 'TC15102609',
    buddyId: 'nara',
    buddyName: 'Nara',
    buddyMascot: 'blue',
    service: 'Chat',
    durationMinutes: 30,
    durationLabel: '30 menit',
    dateLabel: '20 Okt 2026',
    timeRange: '19.00–19.30 WIB',
    price: 15000,
    paymentMethodLabel: 'GoPay · Rp15.000',
    status: 'completed',
    remainingSeconds: 0,
    messages: [
      {
        id: 'm-co-1',
        sender: 'buddy',
        text: 'Terima kasih sudah berbagi cerita malam ini, Alya. Istirahat yang cukup ya.',
        time: '19.29',
      },
    ],
    review: {
      rating: 5,
      tags: ['Pendengar baik', 'Tidak menghakimi'],
      comment: 'Makasih sudah mendengarkan tanpa buru-buru. Aku jadi lebih lega dan tahu mau mulai dari mana.',
      anonymous: true,
      submittedAt: '20 Okt 2026',
    },
  },
];

export const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    author: 'Langit kecil',
    mascot: 'blue',
    timeAgo: '12 menit lalu',
    isAnonymous: true,
    tag: '#KehidupanKampus',
    content: 'Hari ini akhirnya berani presentasi, walau tangan masih gemetar. Ternyata langkah kecil juga tetap langkah, ya.',
    hugCount: 24,
    spiritCount: 18,
    relateCount: 12,
    replies: [
      {
        id: 'rep-1',
        author: 'Bintang pagi',
        mascot: 'mint',
        timeAgo: '8 menit lalu',
        text: 'Keren banget udah berani maju! Langkah kecilmu hari ini berarti besar.',
      },
      {
        id: 'rep-2',
        author: 'Teh hangat',
        mascot: 'blue',
        timeAgo: '5 menit lalu',
        text: 'Ikut bangga bacanya. Jangan lupa apresiasi diri sendiri malam ini ya!',
      },
    ],
  },
  {
    id: 'post-2',
    author: 'Ruang jeda',
    mascot: 'mint',
    timeAgo: '45 menit lalu',
    isAnonymous: true,
    tag: '#PelanPelanAja',
    content: 'Buat yang hari ini belum produktif: istirahat bukan berarti tertinggal. Lagi belajar bilang ini ke diri sendiri juga.',
    hugCount: 31,
    spiritCount: 21,
    relateCount: 19,
    replies: [
      {
        id: 'rep-3',
        author: 'Langit kecil',
        mascot: 'blue',
        timeAgo: '20 menit lalu',
        text: 'Makasih pengingatnya. Hari ini aku juga lagi butuh izin untuk istirahat sebentar.',
      },
    ],
  },
  {
    id: 'post-3',
    author: 'Catatan senja',
    mascot: 'blue',
    timeAgo: '2 jam lalu',
    isAnonymous: true,
    tag: '#Journaling',
    content: 'Menulis tiga hal kecil yang bikin lega hari ini ternyata ampuh banget meredakan kepala yang ramai sebelum tidur.',
    hugCount: 15,
    spiritCount: 14,
    relateCount: 9,
    replies: [],
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Nara sudah menunggumu di ruang chat',
    body: 'Sesi Chat 30 menit (19.00–19.30 WIB) sedang berlangsung.',
    time: 'Baru saja',
    read: false,
    targetScreen: 'my-sessions',
  },
  {
    id: 'notif-2',
    title: 'Pengingat sesi bersama Dimas',
    body: 'Study · 1 jam dijadwalkan besok pukul 20.00 WIB.',
    time: '1 jam lalu',
    read: true,
    targetScreen: 'my-sessions',
  },
];

export function formatRupiah(amount: number): string {
  return `Rp${amount.toLocaleString('id-ID')}`;
}

export function formatTimeCountdown(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function computeAgeFromBirthDate(birthDateStr: string): number {
  if (!birthDateStr) return 21;
  const birth = new Date(birthDateStr);
  if (Number.isNaN(birth.getTime())) return 21;
  const ref = new Date('2026-10-20');
  let age = ref.getFullYear() - birth.getFullYear();
  const m = ref.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && ref.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export function generateBuddyReply(buddyName: string, service: ServiceType, userMessage: string): string {
  const lower = userMessage.toLowerCase();

  if (
    lower.includes('menyakiti diri') ||
    lower.includes('bunuh diri') ||
    lower.includes('tidak kuat') ||
    lower.includes('putus asa')
  ) {
    return `Aku dengar betapa beratnya perasaanmu saat ini. Karena aku teman sebaya dan bukan tenaga profesional, kalau kamu merasa tidak aman, tolong klik tombol "Butuh bantuan profesional?" di bawah atau hubungi 119 ekstensi 8 (Healing119.id) ya. Aku tetap di sini menemanimu.`;
  }

  if (service === 'Study') {
    if (lower.includes('mulai') || lower.includes('target') || lower.includes('bab') || lower.includes('tugas')) {
      return `Target yang pas dan realistis! Kita fokus bareng di timer Pomodoro ini ya. Kalau sudah selesai satu bagian kecil, kabari aku di sini.`;
    }
    if (lower.includes('capek') || lower.includes('lelah') || lower.includes('ngantuk') || lower.includes('jenuh')) {
      return `Wajar kok kalau merasa jenuh. Coba tarik napas sebentar atau tekan tombol "Istirahat 5 menit" di atas kalau butuh jeda.`;
    }
    return `Siap, aku temani dari sini sambil kamu kerjakan pelan-pelan. Kamu mau fokus bagian mana dulu?`;
  }

  if (lower.includes('capek') || lower.includes('lelah') || lower.includes('penuh') || lower.includes('stres')) {
    return `Kedengarannya harimu cukup menguras tenaga, ya. Nggak apa-apa kok kalau hari ini terasa berat. Kamu boleh ceritakan bagian yang paling bikin sesak dulu.`;
  }

  if (lower.includes('tugas') || lower.includes('kuliah') || lower.includes('skripsi') || lower.includes('kerja')) {
    return `Banyak hal yang menumpuk memang sering bikin bingung mau mulai dari mana. Menurutmu, satu hal kecil apa yang paling ringan kalau disentuh duluan?`;
  }

  if (lower.includes('terima kasih') || lower.includes('makasih') || lower.includes('lega')) {
    return `Sama-sama, aku senang bisa mendengarkanmu. Kamu sudah berusaha dengan sangat baik hari ini.`;
  }

  return `Aku mendengarkan, kok. Ceritakan saja pelan-pelan sesuai ritmemu—bagaimana perasaanmu setelah kejadian itu?`;
}
