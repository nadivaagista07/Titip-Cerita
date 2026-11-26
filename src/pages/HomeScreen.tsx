import React, { useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  BookOpen,
  Calendar,
  HeartHandshake,
  Lock,
  MessageCircleHeart,
  MessageSquare,
  Star,
  Users,
  X,
} from 'lucide-react';
import { MascotAvatar, MascotMint } from '../components/Mascots';
import { HOME_TESTIMONIALS, formatRupiah } from '../data/mockData';
import type { Buddy, NotificationItem, ScreenRoute, ServiceType, UserProfile } from '../types';

interface HomeScreenProps {
  user: UserProfile;
  buddies: Buddy[];
  notifications: NotificationItem[];
  onMarkNotificationsRead: () => void;
  onNavigate: (screen: ScreenRoute) => void;
  onOpenFindBuddy: (service?: ServiceType) => void;
  onOpenBuddyProfile: (buddyId: string) => void;
  onQuickBook: (buddy: Buddy, service: ServiceType, durationMinutes: number) => void;
}

export function HomeScreen({
  user,
  buddies,
  notifications,
  onMarkNotificationsRead,
  onNavigate,
  onOpenFindBuddy,
  onOpenBuddyProfile,
  onQuickBook,
}: HomeScreenProps) {
  const [selectedChatDuration, setSelectedChatDuration] = useState<30 | 60>(30);
  const [selectedStudyDuration, setSelectedStudyDuration] = useState<60 | 120>(60);
  const [notifOpen, setNotifOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const featuredBuddies = buddies.slice(0, 2);

  return (
    <div className="px-5 md:px-0 pt-5 pb-6 space-y-6">
      {/* Top Bar (Mobile shows wordmark + bell; Desktop shows welcome bar + bell) */}
      <div className="flex items-center justify-between">
        <span className="text-[22px] font-bold tracking-tight text-[#162333] md:hidden">
          TitipCerita
        </span>
        <span className="hidden md:inline-block text-sm font-semibold text-[#526173]">
          Selamat datang kembali di ruang ceritamu
        </span>

        <div className="relative">
          <button
            type="button"
            aria-label="Notifikasi"
            onClick={() => {
              setNotifOpen((v) => !v);
              onMarkNotificationsRead();
            }}
            className="w-10 h-10 rounded-full bg-white shadow-[0_4px_14px_rgba(22,35,51,0.06)] flex items-center justify-center text-[#162333] hover:bg-slate-50 transition-colors relative"
          >
            <Bell className="w-[18px] h-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-[#93A7EC]" />
            )}
          </button>

          {notifOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-3xl shadow-[0_14px_36px_rgba(22,35,51,0.12)] p-4 z-50 border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-[#162333]">Notifikasi</h3>
                  <button
                    type="button"
                    onClick={() => setNotifOpen(false)}
                    aria-label="Tutup notifikasi"
                    className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#526173]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2.5 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => {
                        setNotifOpen(false);
                        if (n.targetScreen) onNavigate(n.targetScreen);
                      }}
                      className="w-full text-left p-3 rounded-2xl bg-[#F5F8FD] hover:bg-[#EDF2FC] transition-colors"
                    >
                      <p className="text-xs font-bold text-[#162333]">{n.title}</p>
                      <p className="text-[11.5px] text-[#526173] mt-0.5 leading-snug">{n.body}</p>
                      <p className="text-[10.5px] text-[#6D7B8D] mt-1">{n.time}</p>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Hero Greeting + Mascot */}
      <section className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-[28px] md:text-[32px] font-bold text-[#162333] leading-[1.18] tracking-tight">
            Hai, {user.nickname}.
            <br />
            Apa kabar?
          </h1>
          <p className="text-[13.5px] md:text-sm text-[#526173] mt-2">
            Apa pun rasanya, kamu boleh cerita.
          </p>
        </div>
        <MascotMint className="w-24 h-24 md:w-28 md:h-28 shrink-0" />
      </section>

      {/* Main Responsive Grid on Desktop, Stacked on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Primary Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Mau ditemani apa? */}
          <section>
            <h2 className="text-[17px] font-bold text-[#162333] mb-3">Mau ditemani apa?</h2>
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
              <button
                type="button"
                onClick={() => onOpenFindBuddy('Story')}
                className="rounded-[22px] bg-[#F6EAE6] hover:brightness-[0.98] p-3.5 sm:p-4 flex flex-col items-center text-center transition-all shadow-[0_4px_14px_rgba(22,35,51,0.03)]"
              >
                <HeartHandshake className="w-6 h-6 text-[#162333] mb-2" />
                <span className="text-[15px] font-bold text-[#162333]">Story</span>
                <span className="text-[11px] text-[#526173] mt-0.5 leading-tight">
                  Cerita & didengar
                </span>
              </button>

              <button
                type="button"
                onClick={() => onOpenFindBuddy('Chat')}
                className="rounded-[22px] bg-[#FAF3DC] hover:brightness-[0.98] p-3.5 sm:p-4 flex flex-col items-center text-center transition-all shadow-[0_4px_14px_rgba(22,35,51,0.03)]"
              >
                <MessageSquare className="w-6 h-6 text-[#162333] mb-2" />
                <span className="text-[15px] font-bold text-[#162333]">Chat</span>
                <span className="text-[11px] text-[#526173] mt-0.5 leading-tight">
                  Ngobrol santai
                </span>
              </button>

              <button
                type="button"
                onClick={() => onOpenFindBuddy('Study')}
                className="rounded-[22px] bg-[#E3F0EA] hover:brightness-[0.98] p-3.5 sm:p-4 flex flex-col items-center text-center transition-all shadow-[0_4px_14px_rgba(22,35,51,0.03)]"
              >
                <BookOpen className="w-6 h-6 text-[#162333] mb-2" />
                <span className="text-[15px] font-bold text-[#162333]">Study</span>
                <span className="text-[11px] text-[#526173] mt-0.5 leading-tight">
                  Fokus bareng
                </span>
              </button>
            </div>

            {/* Buddy bukan psikolog */}
            <div className="mt-4 rounded-2xl bg-[#EEF2FA] p-4 border border-white/80">
              <p className="text-[13px] font-bold text-[#162333]">Buddy bukan psikolog</p>
              <p className="text-xs text-[#526173] mt-1 leading-relaxed">
                Teman sebaya untuk menemani, bukan diagnosis, terapi, atau layanan krisis. Butuh dukungan lebih?{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('professional-help')}
                  className="font-semibold text-[#C85A32] hover:underline"
                >
                  Lihat Bantuan Profesional
                </button>
              </p>
            </div>

            {/* Primary CTA */}
            <button
              type="button"
              onClick={() => onOpenFindBuddy('Chat')}
              className="w-full tc-btn-primary h-12.5 mt-4 flex items-center justify-center gap-2 text-[15px]"
            >
              <span>Temukan buddy</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </section>

          {/* Cara kerja */}
          <section>
            <h2 className="text-[17px] font-bold text-[#162333] mb-3">Cara kerja</h2>
            <div className="tc-card p-5 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#F1F5FC] flex items-center justify-center text-[#526173] shrink-0">
                  <Users className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#162333]">Pilih teman yang terasa pas</p>
                  <p className="text-xs text-[#526173] mt-0.5">
                    Kenali minat, gaya ngobrol, dan ulasannya.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#F1F5FC] flex items-center justify-center text-[#526173] shrink-0">
                  <Calendar className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#162333]">Atur waktu untuk dirimu</p>
                  <p className="text-xs text-[#526173] mt-0.5">
                    Pilih layanan, durasi, lalu konfirmasi sesi.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#F1F5FC] flex items-center justify-center text-[#526173] shrink-0">
                  <MessageCircleHeart className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#162333]">Mulai dari “hai”</p>
                  <p className="text-xs text-[#526173] mt-0.5">
                    Ceritakan secukupnya. Tanpa dihakimi.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Mungkin kamu cocok */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[17px] font-bold text-[#162333]">Mungkin kamu cocok</h2>
              <button
                type="button"
                onClick={() => onOpenFindBuddy()}
                className="text-xs font-semibold text-[#4B6BD6] hover:underline"
              >
                Lihat semua
              </button>
            </div>

            <div className="space-y-3">
              {featuredBuddies.map((buddy) => {
                const startPrice =
                  buddy.id === 'dimas'
                    ? `Study mulai ${formatRupiah(buddy.pricing.Study[0].price)}`
                    : `Chat mulai ${formatRupiah(buddy.pricing.Chat[0].price)}`;

                return (
                  <button
                    key={buddy.id}
                    type="button"
                    onClick={() => onOpenBuddyProfile(buddy.id)}
                    className="w-full tc-card p-4 text-left hover:shadow-[0_10px_28px_rgba(22,35,51,0.07)] transition-shadow"
                  >
                    <div className="flex items-start gap-3.5">
                      <MascotAvatar variant={buddy.mascot} size="lg" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-base font-bold text-[#162333]">{buddy.name}</span>
                          {buddy.verified && (
                            <BadgeCheck className="w-4 h-4 text-[#4E73DF]" />
                          )}
                        </div>
                        <p className="text-[13px] text-[#526173] mt-0.5 line-clamp-1">
                          {buddy.tagline}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-[#526173] mt-1 tabular-nums">
                          <Star className="w-3.5 h-3.5 fill-[#162333] text-[#162333]" />
                          <span className="font-semibold text-[#162333]">
                            {String(buddy.rating).replace('.', ',')}
                          </span>
                          <span>· {buddy.sessionCount} sesi</span>
                          <span>· Usia {buddy.age}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs">
                      <span className="font-bold text-[#162333] tabular-nums">{startPrice}</span>
                      <span className="text-[#526173]">
                        {buddy.availableToday ? 'Tersedia hari ini' : 'Jadwal besok'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right / Secondary Column on Desktop */}
        <div className="lg:col-span-5 space-y-6">
          {/* Pilih waktu bersama */}
          <section>
            <h2 className="text-[17px] font-bold text-[#162333] mb-3">Pilih waktu bersama</h2>
            <div className="space-y-3.5">
              {/* Chat quick duration */}
              <div className="tc-card p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F6F8FD] flex items-center justify-center text-[#162333] shrink-0">
                    <MessageSquare className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[15px] font-bold text-[#162333]">Chat</h3>
                      {featuredBuddies[0] && (
                        <button
                          type="button"
                          onClick={() =>
                            onQuickBook(featuredBuddies[0], 'Chat', selectedChatDuration)
                          }
                          className="text-xs font-semibold text-[#4B6BD6] hover:underline"
                        >
                          Pesan →
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-[#526173] mt-0.5 leading-snug">
                      Curhat, ngobrol santai, atau sekedar didengar.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { min: 30 as const, label: '30 Menit', price: 15000 },
                    { min: 60 as const, label: '60 Menit', price: 25000 },
                  ].map((opt) => {
                    const active = selectedChatDuration === opt.min;
                    return (
                      <button
                        key={opt.min}
                        type="button"
                        onClick={() => setSelectedChatDuration(opt.min)}
                        className={`p-3 rounded-2xl flex items-center gap-2.5 text-left transition-all ${
                          active
                            ? 'bg-[#EEF2FB] border border-[#93A7EC]'
                            : 'bg-white border border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span
                          className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                            active ? 'border-[#162333]' : 'border-slate-400'
                          }`}
                        >
                          {active && <span className="w-2.5 h-2.5 rounded-full bg-[#162333]" />}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-[#162333]">{opt.label}</p>
                          <p className="text-[11px] text-[#526173] tabular-nums">
                            {formatRupiah(opt.price)}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Study quick duration */}
              <div className="tc-card p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F6F8FD] flex items-center justify-center text-[#162333] shrink-0">
                    <BookOpen className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[15px] font-bold text-[#162333]">Study</h3>
                      {featuredBuddies[1] && (
                        <button
                          type="button"
                          onClick={() =>
                            onQuickBook(featuredBuddies[1], 'Study', selectedStudyDuration)
                          }
                          className="text-xs font-semibold text-[#4B6BD6] hover:underline"
                        >
                          Pesan →
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-[#526173] mt-0.5 leading-snug">
                      Belajar bareng, diskusi tugas, atau persiapan ujian.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { min: 60 as const, label: '60 Menit', price: 20000 },
                    { min: 120 as const, label: '120 Menit', price: 35000 },
                  ].map((opt) => {
                    const active = selectedStudyDuration === opt.min;
                    return (
                      <button
                        key={opt.min}
                        type="button"
                        onClick={() => setSelectedStudyDuration(opt.min)}
                        className={`p-3 rounded-2xl flex items-center gap-2.5 text-left transition-all ${
                          active
                            ? 'bg-[#EEF2FB] border border-[#93A7EC]'
                            : 'bg-white border border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span
                          className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                            active ? 'border-[#162333]' : 'border-slate-400'
                          }`}
                        >
                          {active && <span className="w-2.5 h-2.5 rounded-full bg-[#162333]" />}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-[#162333]">{opt.label}</p>
                          <p className="text-[11px] text-[#526173] tabular-nums">
                            {formatRupiah(opt.price)}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <p className="text-[11px] text-[#526173] text-center">
                Untuk Story, kenali buddy dan pilihan dukungannya terlebih dahulu.
              </p>
            </div>
          </section>

          {/* Kata Mereka */}
          <section>
            <h2 className="text-[17px] font-bold text-[#162333] mb-3">Kata Mereka</h2>
            <div className="space-y-3">
              {HOME_TESTIMONIALS.map((t) => (
                <div key={t.id} className="tc-card p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-3.5 h-3.5 fill-[#F5C542] text-[#F5C542]"
                      />
                    ))}
                  </div>
                  <p className="text-[13px] text-[#162333] leading-relaxed">{t.quote}</p>
                  <div className="flex items-center gap-2.5 mt-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover bg-[#EEF2FB]"
                    />
                    <div>
                      <p className="text-xs font-semibold text-[#162333]">{t.name}</p>
                      <p className="text-[11px] text-[#6D7B8D] tabular-nums">{t.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11.5px] text-[#526173] mt-5">
              <Lock className="w-3.5 h-3.5" />
              <span>Ruang aman dimulai dari saling menghargai.</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
