import React, { useState } from 'react';
import {
  BadgeCheck,
  BookOpen,
  Calendar,
  Check,
  HeartHandshake,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { PageHeader } from '../components/Layout';
import { MascotBlue, MascotMint } from '../components/Mascots';
import { ONBOARDING_INTERESTS, computeAgeFromBirthDate } from '../data/mockData';
import type { ServiceType, UserProfile } from '../types';

interface OnboardingScreenProps {
  step: 1 | 2 | 3;
  user: UserProfile;
  onUpdateUser: (patch: Partial<UserProfile>) => void;
  onBack: () => void;
  onNextStep: (nextStep: 2 | 3 | 'done') => void;
  onHelpClick: () => void;
}

export function OnboardingScreen({
  step,
  user,
  onUpdateUser,
  onBack,
  onNextStep,
  onHelpClick,
}: OnboardingScreenProps) {
  const [consentChecked, setConsentChecked] = useState(user.parentalConsentGiven);
  const age = computeAgeFromBirthDate(user.birthDate);
  const isMinor = age < 18;

  const toggleInterest = (interest: string) => {
    const exists = user.interests.includes(interest);
    const next = exists
      ? user.interests.filter((item) => item !== interest)
      : [...user.interests, interest];
    onUpdateUser({ interests: next });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title="Kenalan dulu" onBack={onBack} onHelpClick={onHelpClick} />

      <div className="flex-1 flex flex-col px-5 pb-8 max-w-[440px] w-full mx-auto">
        {/* Progress Indicator */}
        <div className="mt-1 mb-5">
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 rounded-full transition-colors ${
                  s <= step ? 'bg-[#93A7EC]' : 'bg-[#D6E0F5]'
                }`}
              />
            ))}
          </div>
          <p className="text-[11px] font-semibold tracking-wider text-[#364457] mt-2.5 uppercase">
            LANGKAH {step} DARI 3
          </p>
        </div>

        {/* STEP 1: Cek Usia / Izin Usia < 18 */}
        {step === 1 && (
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-center my-3">
                <MascotMint className="w-28 h-28" />
              </div>

              <h2 className="text-[27px] font-bold text-[#162333] leading-tight tracking-tight mt-2">
                {isMinor
                  ? 'Bertumbuh bersama, merasa aman.'
                  : 'Tempat yang pas untuk usiamu.'}
              </h2>
              <p className="text-[13.5px] text-[#526173] mt-2 leading-relaxed">
                Tanggal lahirmu hanya untuk keperluan akun dan tidak ditampilkan di profil publik.
              </p>

              <div className="mt-5">
                <label
                  htmlFor="onb-birthdate"
                  className="block text-[13px] font-semibold text-[#162333] mb-1.5"
                >
                  Tanggal lahir
                </label>
                <div className="relative">
                  <input
                    id="onb-birthdate"
                    type="date"
                    value={user.birthDate}
                    onChange={(e) => onUpdateUser({ birthDate: e.target.value })}
                    className="w-full h-13 px-4 pr-11 rounded-2xl bg-white shadow-[0_4px_16px_rgba(22,35,51,0.04)] text-sm font-medium text-[#162333] focus:outline-none focus:ring-2 focus:ring-[#93A7EC]"
                  />
                  <Calendar className="w-4 h-4 text-[#526173] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none bg-white" />
                </div>
                <p className="text-[11px] text-[#6D7B8D] mt-1.5">
                  Tips: coba ubah tahun lahir ke 2009 untuk melihat alur persetujuan usia 17 tahun.
                </p>
              </div>

              {isMinor ? (
                <>
                  <div className="mt-4 rounded-2xl bg-[#F3E6E7] p-4 flex items-start gap-3">
                    <HeartHandshake className="w-5 h-5 text-[#364457] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[13.5px] font-bold text-[#162333]">
                        Kamu berusia {age} tahun
                      </p>
                      <p className="text-xs text-[#526173] mt-1 leading-relaxed">
                        Minta persetujuan orang tua atau wali sebelum memakai layanan. Isi ceritamu tetap pribadi sesuai Kebijakan Privasi.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 mt-4">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={consentChecked}
                      onClick={() => {
                        const next = !consentChecked;
                        setConsentChecked(next);
                        onUpdateUser({ parentalConsentGiven: next });
                      }}
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        consentChecked
                          ? 'border-[#162333] bg-white text-[#162333]'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {consentChecked && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                    </button>
                    <span className="text-xs text-[#364457] leading-relaxed">
                      Aku sudah mendapat persetujuan orang tua atau wali.
                    </span>
                  </div>
                </>
              ) : (
                <div className="mt-4 rounded-2xl bg-[#DCEBE5] p-4 flex items-start gap-3">
                  <BadgeCheck className="w-5 h-5 text-[#2F5244] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[13.5px] font-bold text-[#162333]">
                      Kamu berusia {age} tahun. Selamat datang!
                    </p>
                    <p className="text-xs text-[#3F554C] mt-1 leading-relaxed">
                      Kamu bisa melanjutkan. Ruang ini untuk saling mendengar, bukan layanan psikologi atau krisis.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 text-center">
              <button
                type="button"
                disabled={isMinor && !consentChecked}
                onClick={() => onNextStep(2)}
                className="w-full tc-btn-primary h-12.5 text-[15px]"
              >
                {isMinor ? 'Saya sudah mendapat izin' : 'Lanjutkan'}
              </button>
              <p className="text-[11.5px] text-[#6D7B8D] mt-3">
                Data usia dipakai untuk menjaga ruang tetap aman.
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: Kebutuhan */}
        {step === 2 && (
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-[26px] font-bold text-[#162333] leading-tight tracking-tight">
                Hari ini, kamu butuh apa?
              </h2>
              <p className="text-[13.5px] text-[#526173] mt-2 leading-relaxed">
                Pilih yang paling kamu butuhkan. Nanti boleh berubah, kok.
              </p>

              <div className="space-y-3.5 mt-6">
                {(
                  [
                    {
                      id: 'Story' as ServiceType,
                      title: 'Story',
                      desc: 'Berbagi cerita, tanpa takut dihakimi.',
                      icon: HeartHandshake,
                    },
                    {
                      id: 'Chat' as ServiceType,
                      title: 'Chat',
                      desc: 'Ngobrol ringan, biar tidak sendirian.',
                      icon: MessageSquare,
                    },
                    {
                      id: 'Study' as ServiceType,
                      title: 'Study',
                      desc: 'Teman fokus dan belajar bareng.',
                      icon: BookOpen,
                    },
                  ] as const
                ).map((item) => {
                  const Icon = item.icon;
                  const selected = user.preferredNeed === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onUpdateUser({ preferredNeed: item.id })}
                      className={`w-full p-4 rounded-3xl flex items-center justify-between gap-3 text-left transition-all ${
                        selected
                          ? 'bg-[#D3DCF7] border-2 border-[#8FA6EC] shadow-[0_6px_18px_rgba(143,166,236,0.18)]'
                          : 'bg-white border-2 border-transparent shadow-[0_4px_16px_rgba(22,35,51,0.035)] hover:bg-white/90'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center text-[#162333] shrink-0 shadow-xs">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[16px] font-bold text-[#162333]">{item.title}</p>
                          <p className="text-xs text-[#526173] mt-0.5">{item.desc}</p>
                        </div>
                      </div>

                      <span
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          selected ? 'border-[#162333]' : 'border-slate-300'
                        }`}
                      >
                        {selected && <span className="w-3 h-3 rounded-full bg-[#162333]" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl bg-[#DCEBE5] p-4 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#2F5244] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[13.5px] font-bold text-[#162333]">
                    Tidak harus tahu semua jawabannya
                  </p>
                  <p className="text-xs text-[#3F554C] mt-1 leading-relaxed">
                    Mulai dari obrolan kecil juga boleh. Kamu menentukan ritmemu sendiri.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => onNextStep(3)}
                className="w-full tc-btn-primary h-12.5 text-[15px]"
              >
                Lanjutkan
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Minat */}
        {step === 3 && (
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-center my-2">
                <MascotBlue className="w-28 h-28" />
              </div>

              <h2 className="text-[26px] font-bold text-[#162333] leading-tight tracking-tight mt-1">
                Temukan kecocokan dari hal-hal sederhana.
              </h2>
              <p className="text-[13.5px] text-[#526173] mt-2 leading-relaxed">
                Pilih minimal 3 minat agar kami bisa mengenalkan buddy yang sesuai.
              </p>

              <div className="flex flex-wrap gap-2.5 mt-5">
                {ONBOARDING_INTERESTS.map((interest) => {
                  const active = user.interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2.5 rounded-full text-[13px] font-semibold transition-all ${
                        active
                          ? 'bg-[#93A7EC] text-[#162333] shadow-xs'
                          : 'bg-white text-[#162333] shadow-[0_3px_12px_rgba(22,35,51,0.04)] hover:bg-slate-50'
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>

              <p className="text-xs text-[#526173] mt-5">
                {user.interests.length >= 3
                  ? `Terpilih ${user.interests.length} minat, bisa diubah kapan saja di Profil`
                  : `Pilih ${3 - user.interests.length} minat lagi (minimal 3)`}
              </p>
            </div>

            <div className="mt-6 text-center">
              <button
                type="button"
                disabled={user.interests.length < 3}
                onClick={() => onNextStep('done')}
                className="w-full tc-btn-primary h-12.5 text-[15px]"
              >
                Temukan teman ceritaku
              </button>
              <p className="text-[11.5px] text-[#6D7B8D] mt-3">
                Tidak perlu jadi siapa-siapa. Cukup jadi kamu.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
