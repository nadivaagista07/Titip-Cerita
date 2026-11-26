import React, { useState } from 'react';
import {
  BadgeCheck,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  Star,
  X,
  XCircle,
} from 'lucide-react';
import { PageHeader } from '../components/Layout';
import { MascotAvatar } from '../components/Mascots';
import { formatRupiah } from '../data/mockData';
import type { Buddy, ServiceType } from '../types';

interface BuddyProfileScreenProps {
  buddy: Buddy;
  onBack: () => void;
  onStartBooking: (buddy: Buddy, service: ServiceType, durationMinutes?: number) => void;
  onBlockBuddy: (buddyId: string) => void;
  onReportBuddy: (buddyName: string, reason: string) => void;
  onHelpClick: () => void;
}

export function BuddyProfileScreen({
  buddy,
  onBack,
  onStartBooking,
  onBlockBuddy,
  onReportBuddy,
  onHelpClick,
}: BuddyProfileScreenProps) {
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [reportReason, setReportReason] = useState('Perilaku tidak nyaman');

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title="Kenalan dengan buddy" onBack={onBack} onHelpClick={onHelpClick} />

      <div className="flex-1 px-5 md:px-0 pb-10 space-y-5">
        {/* Top Identity */}
        <div className="flex flex-col items-center text-center pt-1">
          <MascotAvatar variant={buddy.mascot} size="xl" />

          <div className="flex items-center gap-1.5 mt-3">
            <h2 className="text-[28px] font-bold text-[#162333] tracking-tight">{buddy.name}</h2>
            {buddy.verified && <BadgeCheck className="w-5 h-5 text-[#364457]" />}
          </div>

          <p className="text-xs text-[#526173] mt-1">
            {buddy.age} tahun · {buddy.language} · Buddy terverifikasi
          </p>

          <div className="flex items-center gap-4 mt-2 text-xs text-[#162333] tabular-nums">
            <span className="flex items-center gap-1 font-semibold">
              <Star className="w-3.5 h-3.5 fill-[#162333]" />
              {String(buddy.rating).replace('.', ',')} ({buddy.reviewCount} ulasan)
            </span>
            <span className="text-[#526173]">{buddy.sessionCount} sesi ditemani</span>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {buddy.interests.map((tag, idx) => (
              <span
                key={tag}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                  idx === 0
                    ? 'bg-[#93A7EC] text-[#162333]'
                    : 'bg-white text-[#162333] shadow-xs'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column: Bio + Reviews + Disclaimer */}
          <div className="lg:col-span-7 space-y-5">
            {/* Bio Card */}
            <div className="tc-card p-5 space-y-3">
              <h3 className="text-[16px] font-bold text-[#162333]">Hai, aku {buddy.name} ♡</h3>
              {buddy.bio.map((p, i) => (
                <p key={i} className="text-[13.5px] text-[#364457] leading-relaxed">
                  {p}
                </p>
              ))}
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[11.5px] text-[#526173]">
                <ShieldCheck className="w-4 h-4 text-[#364457] shrink-0" />
                <span>Identitas ditinjau · Berkomitmen pada aturan komunitas</span>
              </div>
            </div>

            {/* Kata teman cerita */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-[17px] font-bold text-[#162333]">Kata teman cerita</h3>
                <button
                  type="button"
                  onClick={() => setShowReviewsModal(true)}
                  className="text-xs font-semibold text-[#364457] hover:underline"
                >
                  {buddy.reviewCount} ulasan →
                </button>
              </div>
              {buddy.reviews[0] && (
                <div className="tc-card p-4">
                  <p className="text-[13.5px] text-[#162333] leading-relaxed">
                    “{buddy.reviews[0].comment}”
                  </p>
                  <div className="flex items-center gap-1.5 mt-3 text-xs text-[#526173]">
                    <span className="flex items-center gap-0.5 text-[#162333]">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3 h-3 fill-[#162333]" />
                      ))}
                    </span>
                    <span>
                      · {buddy.reviews[0].author}
                      {buddy.reviews[0].age ? `, ${buddy.reviews[0].age}` : ''} ·{' '}
                      {buddy.reviews[0].service}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Buddy bukan psikolog */}
            <div className="rounded-2xl bg-[#DCEBE5] p-4 flex items-start gap-3">
              <XCircle className="w-5 h-5 text-[#2F5244] shrink-0 mt-0.5" />
              <div>
                <p className="text-[13px] font-bold text-[#162333]">Buddy bukan psikolog</p>
                <p className="text-xs text-[#3F554C] mt-1 leading-relaxed">
                  {buddy.name} hadir sebagai teman sebaya, bukan untuk diagnosis atau terapi. Ceritamu tetap dihargai dan dijaga.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing + Direct Action Buttons */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-[17px] font-bold text-[#162333]">Pilih waktu bersama</h3>

            <button
              type="button"
              onClick={() => onStartBooking(buddy, 'Chat', buddy.pricing.Chat[0].durationMinutes)}
              className="w-full rounded-2xl bg-[#E1E8FA] hover:bg-[#D7E0F8] border border-white p-4 text-left transition-colors"
            >
              <p className="text-[15px] font-bold text-[#162333] mb-2.5">Chat · ngobrol santai</p>
              <div className="space-y-2 text-[13px]">
                {buddy.pricing.Chat.map((p) => (
                  <div key={p.durationMinutes} className="flex items-center justify-between">
                    <span className="text-[#364457]">{p.label}</span>
                    <span className="font-bold text-[#162333] tabular-nums">
                      {formatRupiah(p.price)}
                    </span>
                  </div>
                ))}
              </div>
            </button>

            {buddy.services.includes('Study') && (
              <button
                type="button"
                onClick={() =>
                  onStartBooking(buddy, 'Study', buddy.pricing.Study[0].durationMinutes)
                }
                className="w-full rounded-2xl bg-[#E5F1EC] hover:bg-[#DCEBE4] border border-white p-4 text-left transition-colors"
              >
                <p className="text-[15px] font-bold text-[#162333] mb-2.5">Study · fokus bareng</p>
                <div className="space-y-2 text-[13px]">
                  {buddy.pricing.Study.map((p) => (
                    <div key={p.durationMinutes} className="flex items-center justify-between">
                      <span className="text-[#364457]">{p.label}</span>
                      <span className="font-bold text-[#162333] tabular-nums">
                        {formatRupiah(p.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </button>
            )}

            {/* Primary Dual CTAs */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => onStartBooking(buddy, 'Chat')}
                className="tc-btn-primary h-12 flex items-center justify-center gap-2 text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  onStartBooking(
                    buddy,
                    buddy.services.includes('Study') ? 'Study' : 'Story'
                  )
                }
                className="h-12 rounded-full bg-white hover:bg-slate-50 shadow-[0_4px_16px_rgba(22,35,51,0.05)] flex items-center justify-center gap-2 text-sm font-semibold text-[#162333] transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>{buddy.services.includes('Study') ? 'Study' : 'Story'}</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-[#526173] pt-1">
              <button
                type="button"
                onClick={() => setShowReportModal(true)}
                className="hover:text-[#162333] hover:underline"
              >
                Laporkan profil
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => setShowBlockModal(true)}
                className="hover:text-[#162333] hover:underline"
              >
                Blokir buddy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Modal */}
      {showReviewsModal && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-5">
          <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-[#162333]">Ulasan untuk {buddy.name}</h3>
                <p className="text-xs text-[#526173]">
                  ★ {String(buddy.rating).replace('.', ',')} dari {buddy.reviewCount} ulasan
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowReviewsModal(false)}
                aria-label="Tutup ulasan"
                className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#526173]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 overflow-y-auto pr-1">
              {buddy.reviews.map((r) => (
                <div key={r.id} className="p-4 rounded-2xl bg-[#F6F8FD]">
                  <div className="flex items-center justify-between text-xs text-[#526173] mb-1.5">
                    <span className="font-bold text-[#162333]">
                      {r.author} · {r.service}
                    </span>
                    <span>{r.date}</span>
                  </div>
                  <p className="text-xs text-[#162333] leading-relaxed">“{r.comment}”</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-center justify-center p-5">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-[#162333]">Laporkan {buddy.name}</h3>
            <p className="text-xs text-[#526173] mt-1 mb-4">
              Tim moderator TitipCerita akan meninjau laporanmu secara rahasia.
            </p>
            <div className="space-y-2 mb-5">
              {[
                'Perilaku tidak nyaman',
                'Meminta kontak pribadi',
                'Konten melanggar panduan',
              ].map((reason) => (
                <button
                  key={reason}
                  type="button"
                  onClick={() => setReportReason(reason)}
                  className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-semibold border ${
                    reportReason === reason
                      ? 'bg-[#EEF2FB] border-[#93A7EC] text-[#162333]'
                      : 'border-slate-200 text-[#526173]'
                  }`}
                >
                  {reason}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setShowReportModal(false)}
                className="h-11 rounded-full border border-slate-200 text-xs font-semibold text-[#526173]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowReportModal(false);
                  onReportBuddy(buddy.name, reportReason);
                }}
                className="tc-btn-primary h-11 text-xs"
              >
                Kirim laporan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Block Modal */}
      {showBlockModal && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-center justify-center p-5">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-[#162333]">Blokir {buddy.name}?</h3>
            <p className="text-xs text-[#526173] mt-1.5 mb-5 leading-relaxed">
              {buddy.name} tidak akan muncul lagi di rekomendasimu. Kamu selalu bisa membuka blokir di Pengaturan Profil.
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setShowBlockModal(false)}
                className="h-11 rounded-full border border-slate-200 text-xs font-semibold text-[#526173]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowBlockModal(false);
                  onBlockBuddy(buddy.id);
                }}
                className="h-11 rounded-full bg-[#FCE4DB] hover:bg-[#F9D3C5] text-xs font-bold text-[#8A3022]"
              >
                Ya, blokir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
