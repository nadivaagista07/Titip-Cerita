import React, { useState } from 'react';
import { MascotDuo, TitipCeritaLogoIcon } from '../components/Mascots';

interface SplashScreenProps {
  onContinueLogin: () => void;
  onContinueRegister: () => void;
}

const SLIDES = [
  {
    title: 'Ruang kecil untuk cerita besar.',
    subtitle: 'Didengar tanpa dihakimi.\nDitemani jadi diri sendiri.',
    bubbleLeft: 'Aku di sini, kok.',
    bubbleRight: 'Cerita aja dulu :)',
  },
  {
    title: 'Teman sebaya, sesuai ritmemu.',
    subtitle: 'Pilih Story, Chat santai, atau\nStudy bareng kapan pun kamu butuh.',
    bubbleLeft: 'Pelan-pelan aja.',
    bubbleRight: 'Bareng aku yuk!',
  },
  {
    title: 'Privat, hangat, dan terjaga.',
    subtitle: 'Ceritamu tidak tampil di publik.\nKamu selalu memegang kendali.',
    bubbleLeft: 'Aman di sini.',
    bubbleRight: 'Mulai dari "hai"',
  },
];

export function SplashScreen({ onContinueLogin, onContinueRegister }: SplashScreenProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const current = SLIDES[slideIndex];

  return (
    <div className="min-h-[calc(100vh-2rem)] flex flex-col items-center justify-between px-6 py-10 md:py-14">
      <div className="flex flex-col items-center text-center mt-4 md:mt-8">
        <TitipCeritaLogoIcon className="w-12 h-12 mb-4" />
        <h1 className="text-[34px] font-bold tracking-tight text-[#162333] leading-tight">
          TitipCerita
        </h1>
        <p className="text-base text-[#364457] mt-1.5 font-medium">Lagi butuh teman?</p>
      </div>

      {/* Center Mascot Illustration with Speech Bubbles */}
      <div
        onClick={() => setSlideIndex((prev) => (prev + 1) % SLIDES.length)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setSlideIndex((prev) => (prev + 1) % SLIDES.length);
          }
        }}
        className="relative my-10 flex flex-col items-center cursor-pointer"
      >
        <div className="w-64 h-64 rounded-full bg-white/45 flex items-center justify-center relative">
          <div className="relative flex items-end justify-center pt-4">
            <div className="absolute -top-11 -left-3 bg-white text-[#162333] text-xs font-medium px-4 py-2 rounded-2xl shadow-[0_6px_18px_rgba(22,35,51,0.06)] whitespace-nowrap">
              {current.bubbleLeft}
              <span className="absolute -bottom-1.5 left-9 w-3 h-3 bg-white rotate-45" />
            </div>
            <div className="absolute -top-2 -right-3 bg-white text-[#162333] text-xs font-medium px-4 py-2 rounded-2xl shadow-[0_6px_18px_rgba(22,35,51,0.06)] whitespace-nowrap">
              {current.bubbleRight}
              <span className="absolute -bottom-1.5 right-9 w-3 h-3 bg-white rotate-45" />
            </div>
            <MascotDuo className="w-60" />
          </div>
        </div>
      </div>

      {/* Bottom Copy + Dots + Actions */}
      <div className="w-full max-w-sm flex flex-col items-center text-center">
        <h2 className="text-[19px] font-bold text-[#162333]">{current.title}</h2>
        <p className="text-[13px] text-[#526173] mt-2 whitespace-pre-line leading-relaxed">
          {current.subtitle}
        </p>

        {/* Carousel Indicator Dots */}
        <div className="flex items-center gap-2 mt-5 mb-7" role="tablist" aria-label="Slide pengenalan">
          {SLIDES.map((s, idx) => (
            <button
              key={s.title}
              type="button"
              aria-label={`Slide ${idx + 1}`}
              onClick={() => setSlideIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === slideIndex ? 'w-5 bg-[#162333]' : 'w-2 bg-[#162333]/20 hover:bg-[#162333]/40'
              }`}
            />
          ))}
        </div>

        <div className="w-full flex flex-col gap-2.5">
          <button
            type="button"
            onClick={onContinueLogin}
            className="w-full tc-btn-primary py-3.5 text-[15px]"
          >
            Mulai cerita
          </button>
          <button
            type="button"
            onClick={onContinueRegister}
            className="w-full py-2.5 text-[13px] font-semibold text-[#364457] hover:text-[#162333] transition-colors"
          >
            Belum punya akun? Daftar dulu
          </button>
        </div>
      </div>
    </div>
  );
}
