# TitipCerita

**Ruang kecil untuk cerita besar.**  
Aplikasi web pendampingan sebaya (*peer companionship*) berbasis React, Vite, TypeScript, dan Tailwind CSS yang mengimplementasikan seluruh alur desain Figma TitipCerita secara fungsional dan responsif.

> **Catatan Keamanan:** TitipCerita adalah ruang pendampingan sebaya non-klinis untuk Story, Chat santai, dan Study bareng—bukan pengganti psikolog, psikiater, atau layanan krisis.

## Fitur Utama

- **Autentikasi & Onboarding 3 Langkah**
  - Halaman Splash interaktif, Login, dan Register.
  - Verifikasi usia dinamis (mendukung alur persetujuan orang tua/wali untuk usia < 18 tahun).
  - Pemilihan kebutuhan layanan (*Story*, *Chat*, *Study*) dan minat pribadi.
- **Beranda & Penemuan Buddy (`Home` & `Find Your Buddy`)**
  - Akses cepat layanan *Story*, *Chat*, dan *Study*, daftar buddy terverifikasi, notifikasi sesi, dan testimoni.
  - Pencarian real-time berdasarkan nama/minat, filter ketersediaan hari ini, minat yang sama, dan pengurutan harga/rating.
- **Profil Buddy, Penjadwalan & Pembayaran**
  - Profil lengkap buddy beserta paket durasi, ulasan, serta opsi lapor/blokir.
  - Pemesanan sesi interaktif (*layanan*, *durasi*, *tanggal*, *jam mulai WIB*).
  - Alur pembayaran lengkap: **E-wallet** (GoPay/OVO/DANA/ShopeePay), **Transfer Bank** (BCA Virtual Account + salin nomor & timer), **QRIS** (unduh kode QR), hingga halaman konfirmasi berhasil.
- **Ruang Sesi Aktif (`Sesi Saya`, `Chat Room`, `Study Room Pomodoro`)**
  - Tab *Akan Datang*, *Berlangsung*, dan *Selesai* dengan hitungan mundur waktu sesi secara langsung.
  - **Chat Room**: percakapan interaktif dengan buddy, indikator mengetik, contoh pembuka cerita, dan tombol akses cepat bantuan profesional.
  - **Study Room**: widget **Pomodoro Timer** fungsional (siklus fokus 25 menit & istirahat 5 menit dengan *progress ring* SVG) terintegrasi dengan chat belajar.
  - **Rating & Ulasan**: lembar ulasan bintang 1–5, tag apresiasi, komentar, dan opsi anonimitas.
- **Komunitas, Profil Privasi & Bantuan Profesional**
  - Ruang berbagi anonim (*Untukmu*, *Terbaru*, *Disimpan*), reaksi (*Peluk*, *Semangat*, *Aku juga*), balasan saling menguatkan, dan panduan komunitas.
  - Pengelolaan profil, daftar akun terblokir, ekspor data akun (JSON), serta halaman **Bantuan Profesional** dengan rujukan **Healing119.id (Kemenkes RI)** dan latihan jeda napas.

## Teknologi

- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4**
- **Lucide React** (ikon)

## Struktur Proyek

```text
src/
├── assets/images/        # Aset gambar lokal
├── components/           # Komponen UI reusable (Layout, Mascots)
├── data/                 # Data awal buddy, sesi, komunitas, dan helper
├── hooks/                # State management persisten (localStorage)
├── pages/                # Seluruh halaman aplikasi
├── types/                # Definisi tipe TypeScript
├── App.tsx               # Orkestrasi rute & layar
├── index.css             # Tema Tailwind & utilitas visual
└── main.tsx              # Entry point React
```

## Menjalankan Secara Lokal

1. **Instal dependensi:**
   ```bash
   npm install
   ```

2. **Jalankan server pengembangan:**
   ```bash
   npm run dev
   ```
   Aplikasi dapat diakses di `http://localhost:3000`.

3. **Build untuk produksi:**
   ```bash
   npm run build
   ```

4. **Pengecekan TypeScript / lint:**
   ```bash
   npm run lint
   ```
