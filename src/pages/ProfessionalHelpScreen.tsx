import React, { useEffect, useState } from 'react';
import {
  Heart,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Phone,
  PhoneCall,
  Search,
  Wind,
  X,
} from 'lucide-react';
import { PageHeader } from '../components/Layout';
import { MascotMint } from '../components/Mascots';

interface ProfessionalHelpScreenProps {
  onBack: () => void;
}

const PSYCHOLOGIST_DIRECTORY = [
  {
    name: 'Layanan Konseling HIMPSI',
    city: 'Nasional · Online & Tatap Muka',
    note: 'Direktori resmi psikolog berizin praktik (SIPP) di seluruh Indonesia.',
  },
  {
    name: 'Puskesmas Layanan Jiwa Terpadu',
    city: 'Tersedia di seluruh Kecamatan',
    note: 'Akses konsultasi kesehatan jiwa terjangkau dengan rujukan BPJS Kesehatan.',
  },
  {
    name: 'Klinik Sejiwa & Mitra Kesehatan Mental',
    city: 'Jakarta, Bandung, Yogyakarta, Surabaya',
    note: 'Konseling individu dengan psikolog klinis berlisensi.',
  },
];

export function ProfessionalHelpScreen({ onBack }: ProfessionalHelpScreenProps) {
  const [directoryModal, setDirectoryModal] = useState<'psychologist' | 'puskesmas' | null>(
    null
  );
  const [breathingOpen, setBreathingOpen] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Tarik napas' | 'Tahan sebentar' | 'Hembuskan perlahan'>('Tarik napas');
  const [breathSec, setBreathSec] = useState(4);

  useEffect(() => {
    if (!breathingOpen) return;
    const t = window.setInterval(() => {
      setBreathSec((prev) => {
        if (prev > 1) return prev - 1;
        setBreathPhase((p) =>
          p === 'Tarik napas'
            ? 'Tahan sebentar'
            : p === 'Tahan sebentar'
              ? 'Hembuskan perlahan'
              : 'Tarik napas'
        );
        return 4;
      });
    }, 1000);
    return () => window.clearInterval(t);
  }, [breathingOpen]);

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title="Bantuan Profesional" onBack={onBack} />

      <div className="flex-1 px-5 md:px-0 pb-12 max-w-2xl mx-auto w-full space-y-5">
        {/* Hero */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-[28px] font-bold text-[#162333] leading-[1.16] tracking-tight">
              Kamu layak
              <br />
              mendapat
              <br />
              dukungan.
            </h2>
            <p className="text-[13.5px] text-[#526173] mt-2 leading-relaxed">
              Tidak harus menghadapi semuanya sendirian.
            </p>
          </div>
          <MascotMint className="w-28 h-28 shrink-0" />
        </div>

        {/* Pelan-pelan Card */}
        <div className="rounded-2xl bg-[#DCEBE5] p-4 flex items-start gap-3">
          <Heart className="w-5 h-5 text-[#2F5244] shrink-0 mt-0.5" />
          <div>
            <p className="text-[13.5px] font-bold text-[#162333]">
              Pelan-pelan. Pilih bantuan yang kamu butuhkan.
            </p>
            <p className="text-xs text-[#3F554C] mt-1 leading-relaxed">
              Buddy adalah teman sebaya, bukan psikolog, tenaga kesehatan, atau layanan krisis.
            </p>
          </div>
        </div>

        {/* Healing119.id Card */}
        <div className="tc-card p-5 space-y-4">
          <div className="flex items-start gap-3">
            <HeartHandshake className="w-6 h-6 text-[#162333] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-[20px] font-bold text-[#162333] leading-tight">
                Healing119.id
              </h3>
              <p className="text-xs text-[#526173] mt-0.5">
                Layanan Kementerian Kesehatan RI
              </p>
            </div>
          </div>

          <p className="text-[13.5px] text-[#364457] leading-relaxed">
            Dukungan psikologis awal untuk tekanan emosional, keputusasaan, atau pikiran untuk menyakiti diri. Kamu boleh mencari pertolongan sekarang.
          </p>

          <div className="space-y-2.5">
            <a
              href="tel:119"
              className="w-full tc-btn-primary h-12.5 flex items-center justify-center gap-2 text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Telepon 119 ekstensi 8</span>
            </a>

            <a
              href="https://healing119.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-12.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center gap-2 text-sm font-bold text-[#162333] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Akses WhatsApp via Healing119.id</span>
            </a>
          </div>

          <p className="text-[11.5px] text-[#526173] leading-relaxed">
            Kunjungi Healing119.id untuk akses WhatsApp dan informasi layanan. Ketersediaan mengikuti layanan; jika belum terhubung, coba kembali atau cari fasilitas kesehatan.
          </p>
        </div>

        {/* Medical Emergency Notice */}
        <div className="rounded-2xl bg-[#F4E6E6] p-4 flex items-start gap-3">
          <PhoneCall className="w-5 h-5 text-[#364457] shrink-0 mt-0.5" />
          <div>
            <p className="text-[13.5px] font-bold text-[#162333]">Ada bahaya medis segera?</p>
            <p className="text-xs text-[#526173] mt-1 leading-relaxed">
              Telepon 119 atau datang ke IGD terdekat. Jika memungkinkan, minta orang yang kamu percaya untuk menemanimu.
            </p>
          </div>
        </div>

        {/* Untuk dukungan berkelanjutan */}
        <div className="tc-card p-5 space-y-3.5">
          <h3 className="text-[18px] font-bold text-[#162333]">
            Untuk dukungan berkelanjutan
          </h3>
          <p className="text-[13px] text-[#526173] leading-relaxed">
            Cari psikolog berizin atau tanyakan layanan kesehatan jiwa di Puskesmas/RS terdekat. Cek izin praktik, jadwal, dan biaya langsung dengan penyedia.
          </p>

          <div className="space-y-2.5 pt-1">
            <button
              type="button"
              onClick={() => setDirectoryModal('psychologist')}
              className="w-full h-12 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center gap-2 text-sm font-bold text-[#162333] transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Cari psikolog berizin</span>
            </button>

            <button
              type="button"
              onClick={() => setDirectoryModal('puskesmas')}
              className="w-full h-12 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center gap-2 text-sm font-bold text-[#162333] transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span>Cari Puskesmas / RS terdekat</span>
            </button>
          </div>
        </div>

        {/* Grounding Section */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[17px] font-bold text-[#162333]">
              Sambil menunggu, ambil satu jeda.
            </h3>
            <button
              type="button"
              onClick={() => setBreathingOpen((v) => !v)}
              className="text-xs font-bold text-[#4B6BD6] hover:underline flex items-center gap-1 shrink-0"
            >
              <Wind className="w-3.5 h-3.5" />
              <span>{breathingOpen ? 'Tutup latihan napas' : 'Latihan napas'}</span>
            </button>
          </div>
          <p className="text-xs text-[#526173] leading-relaxed">
            Cari tempat yang terasa aman, tarik napas perlahan, dan hubungi orang yang kamu percaya. Kamu tidak perlu menjelaskan semuanya sekaligus.
          </p>

          {breathingOpen && (
            <div className="tc-card p-5 text-center space-y-2 mt-2">
              <p className="text-xs font-semibold text-[#526173] uppercase tracking-wider">
                Jeda Napas 4-4-4
              </p>
              <p className="text-xl font-bold text-[#162333]">{breathPhase}</p>
              <p className="text-3xl font-bold text-[#4B6BD6] tabular-nums">{breathSec}</p>
            </div>
          )}
        </div>

        {/* Source */}
        <div className="pt-2 space-y-1">
          <p className="text-[10.5px] font-bold tracking-wider text-[#364457] uppercase">
            SUMBER INFORMASI
          </p>
          <p className="text-xs text-[#526173]">Kemenkes RI · Kenali layanan Healing119.id</p>
          <a
            href="https://kesprimkom.kemkes.go.id/konten/127/151/0/cegah-bunuh-diri-dukung-kesehatan-jiwa-kenali-layanan-healing119-id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-[#526173] hover:underline break-all block"
          >
            https://kesprimkom.kemkes.go.id/konten/127/151/0/cegah-bunuh-diri-dukung-kesehatan-jiwa-kenali-layanan-healing119-id
          </a>
        </div>
      </div>

      {/* Directory Modal */}
      {directoryModal && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-center justify-center p-5">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl relative space-y-4">
            <button
              type="button"
              onClick={() => setDirectoryModal(null)}
              aria-label="Tutup"
              className="absolute right-4 top-4 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#526173]"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-[#162333]">
              {directoryModal === 'psychologist'
                ? 'Direktori Psikolog Berizin'
                : 'Puskesmas & RS Layanan Jiwa'}
            </h3>
            <div className="space-y-3">
              {PSYCHOLOGIST_DIRECTORY.map((item) => (
                <div key={item.name} className="p-3.5 rounded-2xl bg-[#F5F8FD]">
                  <p className="text-sm font-bold text-[#162333]">{item.name}</p>
                  <p className="text-[11px] font-semibold text-[#4B6BD6] mt-0.5">{item.city}</p>
                  <p className="text-xs text-[#526173] mt-1 leading-relaxed">{item.note}</p>
                </div>
              ))}
            </div>
            <a
              href={
                directoryModal === 'psychologist'
                  ? 'https://himpsi.or.id/'
                  : 'https://www.google.com/maps/search/puskesmas+terdekat'
              }
              target="_blank"
              rel="noopener noreferrer"
              className="w-full tc-btn-primary h-11 flex items-center justify-center text-xs"
            >
              {directoryModal === 'psychologist'
                ? 'Kunjungi situs resmi HIMPSI'
                : 'Buka peta Puskesmas / RS terdekat'}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
