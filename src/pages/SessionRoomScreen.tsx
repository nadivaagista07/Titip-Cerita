import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowUp,
  ArrowUpRight,
  Clock,
  Coffee,
  Flag,
  HeartHandshake,
  Leaf,
  Lock,
  Pause,
  Play,
  Plus,
  X,
} from 'lucide-react';
import { MascotAvatar } from '../components/Mascots';
import { formatTimeCountdown } from '../data/mockData';
import type { Session } from '../types';

interface SessionRoomScreenProps {
  session: Session;
  isBuddyTyping: boolean;
  onBack: () => void;
  onSendMessage: (sessionId: string, text: string) => void;
  onEndSession: (sessionId: string) => void;
  onProfessionalHelp: () => void;
  onReportSession: (buddyName: string, reason: string) => void;
}

const QUICK_PROMPTS_CHAT = [
  'Hari ini rasanya cukup berat, boleh aku cerita pelan-pelan?',
  'Sebenarnya aku lagi bingung mau mulai dari mana.',
  'Aku cuma butuh ditemani sebentar biar nggak merasa sendirian.',
];

const QUICK_PROMPTS_STUDY = [
  'Baca satu bab dan bikin rangkuman. Yuk mulai!',
  'Targetku fokus 25 menit beresin 2 soal dulu.',
  'Butuh istirahat sebentar nih, nanti kita lanjut lagi.',
];

export function SessionRoomScreen({
  session,
  isBuddyTyping,
  onBack,
  onSendMessage,
  onEndSession,
  onProfessionalHelp,
  onReportSession,
}: SessionRoomScreenProps) {
  const isStudy = session.service === 'Study';
  const [inputText, setInputText] = useState('');
  const [showPrompts, setShowPrompts] = useState(false);
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('Percakapan membuat tidak nyaman');

  // Pomodoro state for Study Room
  const [pomodoroMode, setPomodoroMode] = useState<'focus' | 'break'>('focus');
  const [pomodoroRound, setPomodoroRound] = useState<1 | 2>(1);
  const [pomodoroSeconds, setPomodoroSeconds] = useState(17 * 60 + 10);
  const [pomodoroRunning, setPomodoroRunning] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [session.messages.length, isBuddyTyping]);

  useEffect(() => {
    if (!isStudy || !pomodoroRunning) return;
    const t = window.setInterval(() => {
      setPomodoroSeconds((prev) => {
        if (prev <= 1) {
          if (pomodoroMode === 'focus') {
            setPomodoroMode('break');
            return 5 * 60;
          }
          setPomodoroMode('focus');
          setPomodoroRound((r) => (r === 1 ? 2 : 1));
          return 25 * 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
  }, [isStudy, pomodoroMode, pomodoroRunning]);

  const totalPomodoro = pomodoroMode === 'focus' ? 25 * 60 : 5 * 60;
  const progressRatio = Math.max(0, Math.min(1, 1 - pomodoroSeconds / totalPomodoro));
  const ringRadius = 60;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringDashOffset = ringCircumference * (1 - progressRatio);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(session.id, inputText);
    setInputText('');
    setShowPrompts(false);
  };

  const prompts = isStudy ? QUICK_PROMPTS_STUDY : QUICK_PROMPTS_CHAT;

  return (
    <div className="min-h-screen flex flex-col max-w-4xl mx-auto w-full">
      {/* Top Room Header */}
      <header className="px-5 md:px-6 pt-5 pb-3 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onBack}
              aria-label="Kembali"
              className="w-9 h-9 rounded-full hover:bg-white/70 flex items-center justify-center text-[#162333] transition-colors shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <MascotAvatar variant={session.buddyMascot} size="sm" />

            <div className="min-w-0">
              <p className="text-[16px] font-bold text-[#162333] truncate">
                {session.buddyName} ✓
              </p>
              <p className="text-xs text-[#526173] truncate">
                {session.service} · {session.durationLabel} · Terhubung
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowReportModal(true)}
            aria-label="Laporkan sesi"
            className="w-9 h-9 rounded-full hover:bg-white/70 flex items-center justify-center text-[#364457] shrink-0"
          >
            <Flag className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Remaining Time Pill Bar */}
        <div className="bg-white rounded-full px-4 py-2.5 shadow-[0_4px_16px_rgba(22,35,51,0.04)] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#162333] tabular-nums">
            <Clock className="w-4 h-4 text-[#364457]" />
            <span>Sisa waktu {formatTimeCountdown(session.remainingSeconds)}</span>
          </div>
          <button
            type="button"
            onClick={() => setShowEndConfirm(true)}
            className="text-xs font-semibold text-[#364457] hover:text-[#162333] hover:underline"
          >
            Akhiri sesi
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#526173]">
          <Lock className="w-3.5 h-3.5" />
          <span>Jaga privasi. Tidak perlu berbagi kontak pribadi.</span>
        </div>
      </header>

      {/* Main Room Body (Responsive 2-Column in Study Room on Desktop!) */}
      <div
        className={`flex-1 px-5 md:px-6 pb-4 flex flex-col ${
          isStudy ? 'lg:grid lg:grid-cols-12 lg:gap-6 lg:items-start' : ''
        }`}
      >
        {/* POMODORO WIDGET (Study Room Only) */}
        {isStudy && (
          <section className="lg:col-span-5 tc-card p-5 mb-4 lg:mb-0">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold tracking-wider text-[#162333] uppercase">
                POMODORO · {pomodoroMode === 'focus' ? `FOKUS ${pomodoroRound}/2` : 'ISTIRAHAT'}
              </span>
              <Leaf className="w-4 h-4 text-[#364457]" />
            </div>

            <div className="flex flex-col items-center py-2">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 144 144">
                  <circle
                    cx="72"
                    cy="72"
                    r={ringRadius}
                    fill="none"
                    stroke="#E7ECF8"
                    strokeWidth="8"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r={ringRadius}
                    fill="none"
                    stroke={pomodoroMode === 'focus' ? '#8FA6EC' : '#85C7AE'}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={ringDashOffset}
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[28px] font-bold text-[#162333] tabular-nums leading-none">
                    {formatTimeCountdown(pomodoroSeconds)}
                  </span>
                  <span className="text-[11px] text-[#526173] mt-1.5">
                    {pomodoroMode === 'focus'
                      ? 'dari 25 menit fokus'
                      : 'dari 5 menit istirahat'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mt-4">
              <button
                type="button"
                onClick={() => setPomodoroRunning((r) => !r)}
                className="h-11 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center gap-2 text-xs font-bold text-[#162333]"
              >
                {pomodoroRunning ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Jeda</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Lanjut</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (pomodoroMode === 'focus') {
                    setPomodoroMode('break');
                    setPomodoroSeconds(5 * 60);
                    setPomodoroRunning(true);
                  } else {
                    setPomodoroMode('focus');
                    setPomodoroSeconds(25 * 60);
                    setPomodoroRunning(true);
                  }
                }}
                className="h-11 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center gap-1.5 text-xs font-bold text-[#162333]"
              >
                <Coffee className="w-3.5 h-3.5 hidden sm:inline" />
                <span>{pomodoroMode === 'focus' ? 'Istirahat 5 menit' : 'Mulai fokus 25m'}</span>
              </button>
            </div>
          </section>
        )}

        {/* CHAT STREAM */}
        <div
          className={`${
            isStudy ? 'lg:col-span-7' : ''
          } flex-1 flex flex-col justify-between min-h-[340px]`}
        >
          <div className="space-y-4 pb-4">
            {!isStudy && (
              <p className="text-center text-[11px] text-[#526173] font-medium">
                {session.dateLabel} · Hari ini
              </p>
            )}

            {session.messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[78%] px-4 py-3 text-[13.5px] leading-relaxed ${
                      isUser
                        ? 'bg-[#C5D1F8] text-[#162333] rounded-2xl rounded-br-md'
                        : 'bg-white text-[#162333] rounded-2xl rounded-bl-md shadow-[0_4px_14px_rgba(22,35,51,0.035)]'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10.5px] text-[#6D7B8D] mt-1 px-1 tabular-nums">
                    {m.time}
                    {isUser && m.status ? ` · ${m.status}` : ''}
                  </span>
                </div>
              );
            })}

            {isBuddyTyping && (
              <div className="flex items-start">
                <div className="bg-white px-4 py-2.5 rounded-full shadow-[0_4px_14px_rgba(22,35,51,0.04)] flex items-center gap-2 text-xs text-[#364457]">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:120ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#162333] animate-bounce [animation-delay:240ms]" />
                  </span>
                  <span>{session.buddyName} mengetik</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar + Quick Prompts + Professional Help CTA */}
          <div className="pt-2 space-y-3 sticky bottom-0 pb-2">
            {showPrompts && (
              <div className="bg-white rounded-2xl p-3 shadow-lg border border-slate-100 space-y-1.5">
                <p className="text-[11px] font-bold text-[#526173] px-1">
                  Contoh pembuka cerita:
                </p>
                {prompts.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      onSendMessage(session.id, p);
                      setShowPrompts(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#162333] hover:bg-[#F3F6FD] transition-colors"
                  >
                    “{p}”
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={handleSend}
              className="bg-white rounded-full p-1.5 pl-3 shadow-[0_6px_22px_rgba(22,35,51,0.06)] flex items-center gap-2"
            >
              <button
                type="button"
                aria-label="Pilih topik pembuka"
                onClick={() => setShowPrompts((v) => !v)}
                className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#526173] shrink-0"
              >
                <Plus className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Tulis ceritamu di sini..."
                className="flex-1 bg-transparent text-sm text-[#162333] placeholder:text-[#6D7B8D] focus:outline-none min-w-0"
              />
              <button
                type="submit"
                aria-label="Kirim pesan"
                className="w-10 h-10 rounded-full bg-[#93A7EC] hover:bg-[#8298E3] flex items-center justify-center text-[#162333] shrink-0 transition-colors"
              >
                <ArrowUp className="w-4.5 h-4.5" />
              </button>
            </form>

            <button
              type="button"
              onClick={onProfessionalHelp}
              className="w-full h-12 rounded-full bg-[#FCD9CE] hover:bg-[#F9CCC0] flex items-center justify-center gap-2 text-[13.5px] font-bold text-[#162333] transition-colors"
            >
              <HeartHandshake className="w-4.5 h-4.5" />
              <span>Butuh bantuan profesional?</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-[#526173] text-center">
              Buddy bukan psikolog atau layanan krisis.
            </p>
          </div>
        </div>
      </div>

      {/* End Session Confirmation Modal */}
      {showEndConfirm && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-center justify-center p-5">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-[#162333]">Akhiri sesi sekarang?</h3>
            <p className="text-xs text-[#526173] mt-1.5 mb-5 leading-relaxed">
              Setelah sesi selesai, kamu bisa memberikan ulasan singkat untuk {session.buddyName}.
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setShowEndConfirm(false)}
                className="h-11 rounded-full border border-slate-200 text-xs font-semibold text-[#526173]"
              >
                Lanjut ngobrol
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowEndConfirm(false);
                  onEndSession(session.id);
                }}
                className="tc-btn-primary h-11 text-xs"
              >
                Ya, akhiri sesi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-center justify-center p-5">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl relative">
            <button
              type="button"
              onClick={() => setShowReportModal(false)}
              aria-label="Tutup"
              className="absolute right-4 top-4 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#526173]"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-[#162333]">Laporkan percakapan</h3>
            <p className="text-xs text-[#526173] mt-1 mb-4">
              Keamananmu selalu diutamakan. Pilih alasan laporan:
            </p>
            <div className="space-y-2 mb-5">
              {[
                'Percakapan membuat tidak nyaman',
                'Buddy meminta kontak pribadi',
                'Melanggar aturan komunitas',
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
            <button
              type="button"
              onClick={() => {
                setShowReportModal(false);
                onReportSession(session.buddyName, reportReason);
              }}
              className="w-full tc-btn-primary h-11 text-xs"
            >
              Kirim laporan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
