import React from 'react';
import type { MascotVariant } from '../types';

export function TitipCeritaLogoIcon({ className = 'w-11 h-11' }: { className?: string }) {
  return (
    <div
      className={`${className} rounded-2xl bg-white shadow-[0_6px_20px_rgba(22,35,51,0.06)] flex items-center justify-center`}
    >
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6" aria-hidden="true">
        <path
          d="M7 9.5C7 8.11929 8.11929 7 9.5 7H19.5C20.8807 7 22 8.11929 22 9.5V15.5C22 16.8807 20.8807 18 19.5 18H13L9 21V18H9.5C8.11929 18 7 16.8807 7 15.5V9.5Z"
          stroke="#162333"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 12.5H23.5C24.8807 12.5 26 13.6193 26 15V20.5C26 21.8807 24.8807 23 23.5 23H23V25.5L19.5 23H14.5C13.3954 23 12.5 22.1046 12.5 21V20"
          stroke="#162333"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function MascotBlue({ className = 'w-28 h-28' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 125" fill="none" className={className} aria-label="Maskot Biru TitipCerita">
      <ellipse cx="60" cy="113" rx="34" ry="5" fill="#DCE5F8" opacity="0.65" />
      {/* Little legs */}
      <line x1="42" y1="98" x2="42" y2="111" stroke="#1E293B" strokeWidth="3.2" strokeLinecap="round" />
      <line x1="78" y1="98" x2="78" y2="111" stroke="#1E293B" strokeWidth="3.2" strokeLinecap="round" />
      {/* Bear-like ears + rounded body */}
      <circle cx="33" cy="24" r="11" fill="#8FA6EC" />
      <circle cx="87" cy="24" r="11" fill="#8FA6EC" />
      <path
        d="M19 60C19 34 33 20 60 20C87 20 101 34 101 60C101 86 91 102 60 102C29 102 19 86 19 60Z"
        fill="#8FA6EC"
      />
      {/* Eyes */}
      <ellipse cx="47" cy="52" rx="2.7" ry="4.2" fill="#1E293B" />
      <ellipse cx="73" cy="52" rx="2.7" ry="4.2" fill="#1E293B" />
      {/* Cheeks */}
      <ellipse cx="34" cy="60" rx="6.5" ry="3.5" fill="#F8C8C4" />
      <ellipse cx="86" cy="60" rx="6.5" ry="3.5" fill="#F8C8C4" />
      {/* Smile */}
      <path
        d="M52 55C54 64 66 64 68 55"
        stroke="#1E293B"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Curved arms */}
      <path d="M23 70C27 83 37 88 47 84" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M97 70C93 83 83 88 73 84" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

export function MascotMint({ className = 'w-28 h-28' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 125" fill="none" className={className} aria-label="Maskot Mint TitipCerita">
      <ellipse cx="60" cy="113" rx="34" ry="5" fill="#DCE5F8" opacity="0.6" />
      {/* Little legs */}
      <line x1="45" y1="98" x2="45" y2="111" stroke="#1E293B" strokeWidth="3.2" strokeLinecap="round" />
      <line x1="75" y1="98" x2="75" y2="111" stroke="#1E293B" strokeWidth="3.2" strokeLinecap="round" />
      {/* Soft pear/cloud blob body */}
      <path
        d="M27 52C27 32 39 19 60 19C81 19 93 32 93 52C93 58 97 64 97 74C97 92 84 102 60 102C36 102 23 92 23 74C23 64 27 58 27 52Z"
        fill="#C5E2D7"
      />
      {/* Eyes */}
      <ellipse cx="49" cy="54" rx="2.6" ry="4" fill="#1E293B" />
      <ellipse cx="71" cy="54" rx="2.6" ry="4" fill="#1E293B" />
      {/* Cheeks */}
      <ellipse cx="36" cy="61" rx="6" ry="3.3" fill="#F8C8C4" />
      <ellipse cx="84" cy="61" rx="6" ry="3.3" fill="#F8C8C4" />
      {/* Smile */}
      <path
        d="M53 56C55 64 65 64 67 56"
        stroke="#1E293B"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Curved arms */}
      <path d="M28 71C32 82 41 86 49 82" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M92 71C88 82 79 86 71 82" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

export function MascotDuo({
  showBubbles = false,
  className = 'w-56',
}: {
  showBubbles?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative flex items-end justify-center select-none ${className}`}>
      {showBubbles && (
        <>
          <div className="absolute -top-9 left-0 bg-white text-[#162333] text-xs font-medium px-3.5 py-2 rounded-2xl shadow-[0_6px_18px_rgba(22,35,51,0.06)]">
            Aku di sini, kok.
            <span className="absolute -bottom-1.5 left-8 w-3 h-3 bg-white rotate-45" />
          </div>
          <div className="absolute -top-2 right-0 bg-white text-[#162333] text-xs font-medium px-3.5 py-2 rounded-2xl shadow-[0_6px_18px_rgba(22,35,51,0.06)]">
            Cerita aja dulu :)
            <span className="absolute -bottom-1.5 right-8 w-3 h-3 bg-white rotate-45" />
          </div>
        </>
      )}
      <div className="flex items-end justify-center gap-1 pt-2">
        <MascotBlue className="w-28 h-28" />
        <MascotMint className="w-24 h-24" />
      </div>
    </div>
  );
}

export function MascotAvatar({
  variant,
  size = 'md',
}: {
  variant: MascotVariant;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}) {
  const sizeMap = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };
  const bg = variant === 'blue' ? 'bg-[#EDF1FB]' : 'bg-[#ECF6F1]';
  return (
    <div
      className={`${sizeMap[size]} ${bg} rounded-full flex items-center justify-center overflow-hidden shrink-0`}
    >
      {variant === 'blue' ? (
        <MascotBlue className="w-[82%] h-[82%]" />
      ) : (
        <MascotMint className="w-[82%] h-[82%]" />
      )}
    </div>
  );
}

export function GoogleLogoSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
      />
    </svg>
  );
}

export function QrisCodeSvg({ className = 'w-48 h-48' }: { className?: string }) {
  return (
    <svg
      id="titipcerita-qris-svg"
      viewBox="0 0 210 210"
      fill="none"
      className={className}
      aria-label="Kode QR Pembayaran TitipCerita"
    >
      <rect width="210" height="210" rx="12" fill="#FFFFFF" />
      {/* Top-Left Finder */}
      <rect x="14" y="14" width="54" height="54" rx="6" stroke="#162333" strokeWidth="8" />
      <rect x="29" y="29" width="24" height="24" rx="2" fill="#162333" />
      {/* Top-Right Finder */}
      <rect x="142" y="14" width="54" height="54" rx="6" stroke="#162333" strokeWidth="8" />
      <rect x="157" y="29" width="24" height="24" rx="2" fill="#162333" />
      {/* Bottom-Left Finder */}
      <rect x="14" y="142" width="54" height="54" rx="6" stroke="#162333" strokeWidth="8" />
      <rect x="29" y="157" width="24" height="24" rx="2" fill="#162333" />
      {/* Geometric QR matrix blocks */}
      <g fill="#162333">
        <rect x="82" y="14" width="12" height="12" />
        <rect x="106" y="14" width="12" height="12" />
        <rect x="82" y="38" width="24" height="12" />
        <rect x="118" y="38" width="12" height="12" />
        <rect x="94" y="54" width="12" height="24" />
        <rect x="118" y="62" width="12" height="12" />
        <rect x="14" y="82" width="12" height="12" />
        <rect x="38" y="82" width="24" height="12" />
        <rect x="26" y="94" width="12" height="24" />
        <rect x="50" y="106" width="12" height="12" />
        <rect x="82" y="82" width="12" height="12" />
        <rect x="106" y="82" width="24" height="12" />
        <rect x="94" y="94" width="12" height="12" />
        <rect x="82" y="106" width="12" height="24" />
        <rect x="106" y="118" width="24" height="12" />
        <rect x="142" y="82" width="12" height="24" />
        <rect x="166" y="82" width="24" height="12" />
        <rect x="154" y="106" width="12" height="12" />
        <rect x="178" y="106" width="18" height="24" />
        <rect x="82" y="142" width="24" height="12" />
        <rect x="118" y="142" width="12" height="24" />
        <rect x="94" y="166" width="12" height="12" />
        <rect x="82" y="182" width="24" height="14" />
        <rect x="142" y="142" width="24" height="24" rx="3" />
        <rect x="148" y="148" width="12" height="12" fill="#FFFFFF" />
        <rect x="151" y="151" width="6" height="6" />
        <rect x="178" y="142" width="18" height="12" />
        <rect x="178" y="166" width="18" height="30" />
        <rect x="130" y="178" width="24" height="18" />
      </g>
    </svg>
  );
}
