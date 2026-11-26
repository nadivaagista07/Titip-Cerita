import React from 'react';
import { Check, ChevronRight, Star } from 'lucide-react';
import { PageHeader } from '../components/Layout';
import { MascotAvatar } from '../components/Mascots';
import { BOOKING_DATES, START_TIMES, formatRupiah } from '../data/mockData';
import type { BookingDraft, Buddy, ServiceType } from '../types';

interface BookingScreenProps {
  buddy: Buddy;
  draft: BookingDraft;
  onUpdateDraft: (patch: Partial<BookingDraft>) => void;
  onChangeBuddy: () => void;
  onBack: () => void;
  onContinuePayment: () => void;
  onHelpClick: () => void;
}

export function BookingScreen({
  buddy,
  draft,
  onUpdateDraft,
  onChangeBuddy,
  onBack,
  onContinuePayment,
  onHelpClick,
}: BookingScreenProps) {
  const durationOptions = buddy.pricing[draft.service] || buddy.pricing.Chat;

  const handleServiceChange = (nextService: ServiceType) => {
    const opts = buddy.pricing[nextService] || buddy.pricing.Chat;
    const first = opts[0];
    onUpdateDraft({
      service: nextService,
      durationMinutes: first.durationMinutes,
      durationLabel: first.label,
      price: first.price,
    });
  };

  const startHour = parseInt(draft.startTime.split('.')[0] || '19', 10);
  const endTotalMins = startHour * 60 + draft.durationMinutes;
  const endHour = Math.floor(endTotalMins / 60);
  const endMin = endTotalMins % 60;
  const timeRange = `${draft.startTime}–${String(endHour).padStart(2, '0')}.${String(endMin).padStart(2, '0')} WIB`;

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title="Atur sesi" onBack={onBack} onHelpClick={onHelpClick} />

      <div className="flex-1 px-5 md:px-0 pb-10 space-y-5">
        <div>
          <h2 className="text-[26px] md:text-[30px] font-bold text-[#162333] leading-tight tracking-tight">
            Sisihkan waktu untuk dirimu.
          </h2>
          <p className="text-[13.5px] text-[#526173] mt-1">
            Pilih waktu yang pas. {buddy.name} siap menemani.
          </p>
        </div>

        {/* Buddy Summary Bar */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-3">
            <MascotAvatar variant={buddy.mascot} size="md" />
            <div>
              <p className="text-[16px] font-bold text-[#162333]">
                {buddy.name} {buddy.verified && '✓'}
              </p>
              <p className="text-xs text-[#526173] flex items-center gap-1 tabular-nums">
                <Star className="w-3.5 h-3.5 fill-[#162333] text-[#162333]" />
                <span>
                  {String(buddy.rating).replace('.', ',')} · {buddy.language}
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onChangeBuddy}
            className="text-xs font-bold text-[#162333] hover:underline px-3 py-1.5 rounded-full hover:bg-white/60"
          >
            Ganti
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Configuration Controls */}
          <div className="lg:col-span-7 space-y-5">
            {/* Layanan */}
            <div>
              <p className="text-sm font-bold text-[#162333] mb-2.5">Layanan</p>
              <div className="bg-white rounded-full p-1 shadow-[0_4px_16px_rgba(22,35,51,0.04)] grid grid-cols-3 gap-1">
                {(['Story', 'Chat', 'Study'] as ServiceType[]).map((s) => {
                  const active = draft.service === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleServiceChange(s)}
                      className={`py-2.5 rounded-full text-sm font-semibold transition-all ${
                        active
                          ? 'bg-[#93A7EC] text-[#162333]'
                          : 'text-[#526173] hover:text-[#162333]'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Durasi */}
            <div>
              <p className="text-sm font-bold text-[#162333] mb-2.5">Durasi</p>
              <div className="grid grid-cols-2 gap-3">
                {durationOptions.map((opt) => {
                  const active = draft.durationMinutes === opt.durationMinutes;
                  return (
                    <button
                      key={opt.durationMinutes}
                      type="button"
                      onClick={() =>
                        onUpdateDraft({
                          durationMinutes: opt.durationMinutes,
                          durationLabel: opt.label,
                          price: opt.price,
                        })
                      }
                      className={`p-4 rounded-2xl text-left transition-all relative ${
                        active
                          ? 'bg-[#D3DCF7] border-2 border-[#8FA6EC]'
                          : 'bg-white border-2 border-transparent shadow-[0_4px_16px_rgba(22,35,51,0.04)]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-[#364457]">{opt.label}</span>
                        <span
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            active ? 'border-[#162333]' : 'border-slate-400'
                          }`}
                        >
                          {active && <Check className="w-3 h-3 text-[#162333] stroke-[2.5]" />}
                        </span>
                      </div>
                      <p className="text-[17px] font-bold text-[#162333] mt-1.5 tabular-nums">
                        {formatRupiah(opt.price)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tanggal */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-sm font-bold text-[#162333]">Tanggal</p>
                <span className="text-xs font-medium text-[#364457] flex items-center gap-0.5">
                  Oktober 2026 <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {BOOKING_DATES.map((d) => {
                  const active = draft.dateId === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() =>
                        onUpdateDraft({ dateId: d.id, dateLabel: d.fullLabel })
                      }
                      className={`min-w-[54px] flex-1 py-3 rounded-2xl flex flex-col items-center justify-center transition-all ${
                        active
                          ? 'bg-[#93A7EC] text-[#162333] shadow-xs'
                          : 'bg-white text-[#162333] shadow-[0_3px_12px_rgba(22,35,51,0.04)] hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-[11px] font-medium text-[#526173]">{d.dayShort}</span>
                      <span className="text-[15px] font-bold mt-1 tabular-nums">{d.dayNum}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Jam Mulai */}
            <div>
              <p className="text-sm font-bold text-[#162333] mb-2.5">Jam mulai · WIB</p>
              <div className="flex flex-wrap gap-2.5">
                {START_TIMES.map((time) => {
                  const active = draft.startTime === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => onUpdateDraft({ startTime: time })}
                      className={`px-5 py-2.5 rounded-full text-sm font-bold tabular-nums transition-all ${
                        active
                          ? 'bg-[#93A7EC] text-[#162333] shadow-xs'
                          : 'bg-white text-[#162333] shadow-[0_3px_12px_rgba(22,35,51,0.04)] hover:bg-slate-50'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <div className="lg:col-span-5">
            <div className="tc-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#364457] font-medium">Total pembayaran</span>
                <span className="text-[22px] font-bold text-[#162333] tabular-nums">
                  {formatRupiah(draft.price)}
                </span>
              </div>

              <p className="text-xs text-[#526173]">
                {draft.service} · {draft.dateLabel} · {timeRange}
              </p>

              <button
                type="button"
                onClick={onContinuePayment}
                className="w-full tc-btn-primary h-12.5 text-[15px]"
              >
                Lanjut ke pembayaran
              </button>
            </div>

            <p className="text-[11.5px] text-[#526173] text-center mt-4">
              Tanpa biaya tambahan. Ringkasan bisa dicek sebelum bayar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
