import React, { useState } from 'react';
import { Calendar, Check, Eye, EyeOff, Mail, User, X } from 'lucide-react';
import { PageHeader } from '../components/Layout';
import { GoogleLogoSvg, MascotDuo } from '../components/Mascots';

interface RegisterScreenProps {
  onBack: () => void;
  onRegister: (nickname: string, email: string, birthDate: string) => void;
  onGoLogin: () => void;
  onHelpClick: () => void;
}

export function RegisterScreen({
  onBack,
  onRegister,
  onGoLogin,
  onHelpClick,
}: RegisterScreenProps) {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('2005-05-12');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState('');
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) {
      setError('Isi nama panggilan yang ingin kamu pakai.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Masukkan alamat email yang valid.');
      return;
    }
    if (!birthDate) {
      setError('Pilih tanggal lahirmu terlebih dahulu.');
      return;
    }
    if (password.length < 8) {
      setError('Kata sandi minimal 8 karakter.');
      return;
    }
    if (!agreed) {
      setError('Centang persetujuan Syarat & Kebijakan Privasi untuk melanjutkan.');
      return;
    }
    setError('');
    onRegister(nickname.trim(), email.trim(), birthDate);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title="Buat akun" onBack={onBack} onHelpClick={onHelpClick} />

      <div className="flex-1 flex flex-col items-center px-5 pb-8 pt-1">
        <div className="w-full max-w-[400px] md:max-w-[440px] flex flex-col items-center">
          <MascotDuo className="w-44 mb-3" />

          <h2 className="text-[26px] font-bold text-[#162333] text-center tracking-tight">
            Mulai dari kenalan, yuk.
          </h2>
          <p className="text-[13.5px] text-[#526173] text-center mt-1 mb-5">
            Sedikit tentang kamu, supaya terasa lebih dekat.
          </p>

          <form onSubmit={handleSubmit} className="w-full tc-card p-6 space-y-4">
            <div>
              <label htmlFor="reg-nickname" className="block text-[13px] font-semibold text-[#162333] mb-1.5">
                Nama panggilan
              </label>
              <div className="relative">
                <input
                  id="reg-nickname"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Alya"
                  className="w-full h-12 pl-4 pr-11 rounded-2xl border border-slate-200 bg-white text-sm text-[#162333] placeholder:text-slate-400 focus:outline-none focus:border-[#93A7EC] focus:ring-2 focus:ring-[#93A7EC]/25"
                />
                <User className="w-4 h-4 text-[#526173] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label htmlFor="reg-email" className="block text-[13px] font-semibold text-[#162333] mb-1.5">
                Email
              </label>
              <div className="relative">
                <input
                  id="reg-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alya@email.com"
                  className="w-full h-12 pl-4 pr-11 rounded-2xl border border-slate-200 bg-white text-sm text-[#162333] placeholder:text-slate-400 focus:outline-none focus:border-[#93A7EC] focus:ring-2 focus:ring-[#93A7EC]/25"
                />
                <Mail className="w-4 h-4 text-[#526173] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label htmlFor="reg-birthdate" className="block text-[13px] font-semibold text-[#162333] mb-1.5">
                Tanggal lahir
              </label>
              <div className="relative">
                <input
                  id="reg-birthdate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full h-12 pl-4 pr-10 rounded-2xl border border-slate-200 bg-white text-sm text-[#162333] focus:outline-none focus:border-[#93A7EC] focus:ring-2 focus:ring-[#93A7EC]/25"
                />
                <Calendar className="w-4 h-4 text-[#526173] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none bg-white" />
              </div>
            </div>

            <div>
              <label htmlFor="reg-password" className="block text-[13px] font-semibold text-[#162333] mb-1.5">
                Kata sandi
              </label>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
                  className="w-full h-12 pl-4 pr-11 rounded-2xl border border-slate-200 bg-white text-sm text-[#162333] placeholder:text-slate-400 focus:outline-none focus:border-[#93A7EC] focus:ring-2 focus:ring-[#93A7EC]/25"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Lihat kata sandi'}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-[#526173] hover:text-[#162333]"
                >
                  {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <button
                type="button"
                role="checkbox"
                aria-checked={agreed}
                onClick={() => setAgreed((v) => !v)}
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  agreed ? 'border-[#162333] bg-white text-[#162333]' : 'border-slate-300 bg-white'
                }`}
              >
                {agreed && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
              </button>
              <p className="text-xs text-[#364457] leading-relaxed">
                Saya menyetujui{' '}
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="font-semibold text-[#162333] underline"
                >
                  Syarat & Kebijakan Privasi TitipCerita
                </button>
                .
              </p>
            </div>

            {error && (
              <p className="text-xs text-[#9B3B2E] bg-[#FCE4DB] px-3.5 py-2 rounded-xl font-medium">
                {error}
              </p>
            )}

            <button type="submit" className="w-full tc-btn-primary h-12 text-[15px]">
              Daftar & lanjutkan
            </button>

            <div className="flex items-center justify-center">
              <span className="text-xs text-[#6D7B8D]">atau</span>
            </div>

            <button
              type="button"
              onClick={() =>
                onRegister(
                  nickname.trim() || 'Alya',
                  email.trim() || 'alya@email.com',
                  birthDate || '2005-05-12'
                )
              }
              className="w-full h-12 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center gap-2.5 text-sm font-semibold text-[#162333] transition-colors"
            >
              <GoogleLogoSvg className="w-5 h-5" />
              <span>Lanjutkan dengan Google</span>
            </button>
          </form>

          <p className="mt-5 text-[13px] text-[#364457]">
            Sudah punya akun?{' '}
            <button
              type="button"
              onClick={onGoLogin}
              className="font-bold text-[#162333] hover:underline"
            >
              Masuk
            </button>
          </p>
        </div>
      </div>

      {showTermsModal && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-center justify-center p-5">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl relative">
            <button
              type="button"
              onClick={() => setShowTermsModal(false)}
              aria-label="Tutup"
              className="absolute right-4 top-4 w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#526173]"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-[#162333]">Syarat & Kebijakan Privasi</h3>
            <div className="text-xs text-[#526173] space-y-2.5 mt-3 leading-relaxed">
              <p>
                1. TitipCerita adalah ruang pendampingan sebaya untuk berbagi cerita, mengobrol santai, dan belajar bersama—bukan layanan psikologi klinis, terapi, atau penanganan krisis.
              </p>
              <p>
                2. Percakapan sesi bersifat privat dan tidak pernah dipublikasikan ke halaman komunitas.
              </p>
              <p>
                3. Data tanggal lahir digunakan hanya untuk verifikasi usia keamanan akun dan tidak ditampilkan di profil publik.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setAgreed(true);
                setShowTermsModal(false);
              }}
              className="w-full tc-btn-primary h-11 text-sm mt-5"
            >
              Saya mengerti
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
