import React, { useState } from 'react';
import {
  ArrowRight,
  Calendar,
  Clock,
  Heart,
  MessageSquare,
  RotateCcw,
  Star,
  X,
} from 'lucide-react';
import { PageHeader } from '../components/Layout';
import { MascotAvatar, MascotDuo } from '../components/Mascots';
import { formatRupiah, formatTimeCountdown } from '../data/mockData';
import type { Buddy, Session } from '../types';

interface MySessionsScreenProps {
  sessions: Session[];
  buddies: Buddy[];
  activeTab: 'upcoming' | 'ongoing' | 'completed';
  onChangeTab: (tab: 'upcoming' | 'ongoing' | 'completed') => void;
  onEnterSessionRoom: (sessionId: string) => void;
  onOpenReview: (sessionId: string) => void;
  onBookAgain: (buddy: Buddy, service: Session['service'], durationMinutes: number) => void;
  onFindBuddy: () => void;
  onHelpClick: () => void;
}

export function MySessionsScreen({
  sessions,
  buddies,
  activeTab,
  onChangeTab,
  onEnterSessionRoom,
  onOpenReview,
  onBookAgain,
  onFindBuddy,
  onHelpClick,
}: MySessionsScreenProps) {
  const [detailSession, setDetailSession] = useState<Session | null>(null);

  const filtered = sessions.filter((s) => s.status === activeTab);

  const headingCopy =
    activeTab === 'upcoming'
      ? {
          title: 'Waktu untuk ditemani.',
          subtitle: 'Jadwal kecil untuk hari yang lebih ringan.',
        }
      : activeTab === 'ongoing'
        ? {
            title: 'Temanmu sudah di sini.',
            subtitle: 'Lanjutkan obrolan, sesuai ritmemu.',
          }
        : {
            title: 'Cerita yang sudah singgah.',
            subtitle: 'Terima kasih sudah memberi ruang untuk dirimu.',
          };

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title="Sesi Saya" showMenu onHelpClick={onHelpClick} />

      <div className="flex-1 px-5 md:px-0 pb-8 space-y-5">
        <div>
          <h2 className="text-[28px] font-bold text-[#162333] tracking-tight leading-tight">
            {headingCopy.title}
          </h2>
          <p className="text-[13.5px] text-[#526173] mt-1">{headingCopy.subtitle}</p>
        </div>

        {/* Segmented Tabs */}
        <div className="bg-white rounded-full p-1 shadow-[0_4px_16px_rgba(22,35,51,0.04)] grid grid-cols-3 gap-1 max-w-lg">
          {(
            [
              { id: 'upcoming', label: 'Akan Datang' },
              { id: 'ongoing', label: 'Berlangsung' },
              { id: 'completed', label: 'Selesai' },
            ] as const
          ).map((t) => {
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onChangeTab(t.id)}
                className={`py-2.5 px-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  active
                    ? 'bg-[#93A7EC] text-[#162333]'
                    : 'text-[#526173] hover:text-[#162333]'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Session Cards */}
        {filtered.length === 0 ? (
          <div className="tc-card p-6 text-center space-y-3 max-w-lg">
            <div className="flex justify-center">
              <MascotDuo className="w-36" />
            </div>
            <p className="text-base font-bold text-[#162333]">
              Belum ada sesi di kategori ini
            </p>
            <p className="text-xs text-[#526173]">
              Kalau lagi butuh teman ngobrol atau belajar bareng, kamu bisa atur sesi kapan saja.
            </p>
            <button
              type="button"
              onClick={onFindBuddy}
              className="tc-btn-primary px-6 h-11 text-sm"
            >
              Temukan buddy
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((s, idx) => {
              const targetBuddy =
                buddies.find((b) => b.id === s.buddyId) || buddies[0];
              return (
                <div key={s.id} className="tc-card p-5 space-y-3.5 flex flex-col justify-between">
                  <div className="space-y-3.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <MascotAvatar variant={s.buddyMascot} size="lg" />
                        <div>
                          <p className="text-[17px] font-bold text-[#162333]">
                            {s.buddyName} ✓
                          </p>
                          <p className="text-xs text-[#526173] mt-0.5">
                            {s.service} · {s.durationLabel}
                          </p>
                        </div>
                      </div>

                      {s.status === 'upcoming' && (
                        <span className="px-3 py-1 rounded-full bg-[#DCEBE5] text-[#162333] text-[11px] font-semibold">
                          Terjadwal
                        </span>
                      )}
                      {s.status === 'ongoing' && (
                        <span className="px-3 py-1 rounded-full bg-[#93A7EC] text-[#162333] text-[11px] font-semibold">
                          Berlangsung
                        </span>
                      )}
                      {s.status === 'completed' && (
                        <span className="px-3 py-1 rounded-full bg-[#DCEBE5] text-[#162333] text-[11px] font-semibold">
                          Selesai
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#364457]">
                      <Calendar className="w-4 h-4 text-[#526173] shrink-0" />
                      <span>
                        {s.dateLabel} · {s.timeRange}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[16px] font-bold text-[#162333] tabular-nums">
                        {formatRupiah(s.price)}
                      </span>
                      {s.status === 'completed' ? (
                        s.review ? (
                          <span className="text-xs text-[#364457] font-medium flex items-center gap-1 tabular-nums">
                            <Star className="w-3.5 h-3.5 fill-[#162333] text-[#162333]" />
                            {s.review.rating}/5 · Ulasan terkirim
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onOpenReview(s.id)}
                            className="text-xs font-bold text-[#4B6BD6] hover:underline"
                          >
                            Beri ulasan
                          </button>
                        )
                      ) : (
                        <span className="text-xs text-[#526173]">Sudah dibayar</span>
                      )}
                    </div>

                    {s.status === 'ongoing' && (
                      <div className="flex items-center gap-2 text-xs text-[#162333] font-medium tabular-nums pt-0.5">
                        <Clock className="w-4 h-4 text-[#364457] shrink-0" />
                        <span>
                          Sisa waktu {formatTimeCountdown(s.remainingSeconds)} · {s.buddyName} menunggumu
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-1 space-y-2.5">
                    {s.status === 'upcoming' && (
                      <button
                        type="button"
                        onClick={() => setDetailSession(s)}
                        className={`w-full h-11.5 rounded-full flex items-center justify-center gap-2 text-sm font-bold transition-all ${
                          idx === 0
                            ? 'tc-btn-primary'
                            : 'bg-white border border-slate-200 text-[#162333] hover:bg-slate-50'
                        }`}
                      >
                        <ArrowRight className="w-4 h-4" />
                        <span>Lihat detail sesi</span>
                      </button>
                    )}

                    {s.status === 'ongoing' && (
                      <button
                        type="button"
                        onClick={() => onEnterSessionRoom(s.id)}
                        className="w-full tc-btn-primary h-11.5 flex items-center justify-center gap-2 text-sm"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>
                          {s.service === 'Study'
                            ? 'Masuk ke Study Room'
                            : 'Kembali ke ruang chat'}
                        </span>
                      </button>
                    )}

                    {s.status === 'completed' && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            targetBuddy &&
                            onBookAgain(targetBuddy, s.service, s.durationMinutes)
                          }
                          className="w-full tc-btn-primary h-11.5 flex items-center justify-center gap-2 text-sm"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Pesan lagi dengan {s.buddyName}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenReview(s.id)}
                          className="w-full text-center text-xs font-semibold text-[#364457] hover:underline py-1"
                        >
                          {s.review ? 'Lihat ulasanmu' : 'Tulis ulasan'}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Contextual Safety & Mascot Card */}
        {activeTab === 'upcoming' && (
          <p className="text-xs text-[#526173] text-center pt-1">
            Kami mengingatkanmu sebelum sesi dimulai.
          </p>
        )}

        {activeTab === 'ongoing' && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-[#DCEBE5] p-4 flex items-start gap-3">
              <Heart className="w-5 h-5 text-[#2F5244] shrink-0 mt-0.5" />
              <div>
                <p className="text-[13.5px] font-bold text-[#162333]">
                  Kamu tetap memegang kendali
                </p>
                <p className="text-xs text-[#3F554C] mt-1 leading-relaxed">
                  Kamu boleh mengakhiri sesi kapan pun. Tombol bantuan profesional selalu tersedia di ruang chat.
                </p>
              </div>
            </div>
            <div className="flex justify-center pt-1">
              <MascotDuo className="w-40" />
            </div>
          </div>
        )}

        {activeTab === 'completed' && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-[#DCEBE5] p-4 flex items-start gap-3">
              <Heart className="w-5 h-5 text-[#2F5244] shrink-0 mt-0.5" />
              <div>
                <p className="text-[13.5px] font-bold text-[#162333]">
                  Mau ditemani lagi?
                </p>
                <p className="text-xs text-[#3F554C] mt-1 leading-relaxed">
                  Temukan buddy yang sama, atau kenalan dengan teman baru. Tidak perlu menunggu hari yang berat.
                </p>
              </div>
            </div>
            <div className="flex justify-center pt-1">
              <MascotDuo className="w-40" />
            </div>
          </div>
        )}
      </div>

      {/* Upcoming Session Detail Modal */}
      {detailSession && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-5">
          <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-xl relative space-y-4">
            <button
              type="button"
              onClick={() => setDetailSession(null)}
              aria-label="Tutup detail sesi"
              className="absolute right-4 top-4 w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#526173]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <MascotAvatar variant={detailSession.buddyMascot} size="lg" />
              <div>
                <h3 className="text-lg font-bold text-[#162333]">
                  {detailSession.buddyName} · {detailSession.service}
                </h3>
                <p className="text-xs text-[#526173]">
                  ID Pemesanan: {detailSession.orderId}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F5F8FD] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#526173]">Tanggal</span>
                <span className="font-semibold text-[#162333]">{detailSession.dateLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#526173]">Jam sesi</span>
                <span className="font-semibold text-[#162333]">{detailSession.timeRange}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#526173]">Durasi</span>
                <span className="font-semibold text-[#162333]">{detailSession.durationLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#526173]">Pembayaran</span>
                <span className="font-semibold text-[#162333]">
                  {detailSession.paymentMethodLabel}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const sid = detailSession.id;
                setDetailSession(null);
                onEnterSessionRoom(sid);
              }}
              className="w-full tc-btn-primary h-12 text-sm"
            >
              {detailSession.service === 'Study'
                ? 'Mulai Study Room sekarang'
                : 'Mulai sesi chat sekarang'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
