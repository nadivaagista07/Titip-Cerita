import React, { useState } from 'react';
import { Eye, EyeOff, Mail, X } from 'lucide-react';
import { GoogleLogoSvg, MascotDuo } from '../components/Mascots';

interface LoginScreenProps {
  defaultEmail?: string;
  onLogin: (email: string) => void;
  onGoRegister: () => void;
}

export function LoginScreen({ defaultEmail = '', onLogin, onGoRegister }: LoginScreenProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Masukkan alamat email yang valid.');
      return;
    }
    if (password.length < 4) {
      setError('Masukkan kata sandi minimal 4 karakter.');
      return;
    }
    setError('');
    onLogin(email.trim());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-8">
      <div className="w-full max-w-[400px] md:max-w-[440px] flex flex-col items-center">
        <span className="text-[22px] font-bold tracking-tight text-[#162333] mb-3">
          TitipCerita
        </span>

        <MascotDuo className="w-48 mb-3" />

        <h1 className="text-[26px] font-bold text-[#162333] text-center tracking-tight">
          Senang kamu di sini.
        </h1>
        <p className="text-[13.5px] text-[#526173] text-center mt-1 mb-6">
          Masuk dan temukan teman untuk harimu.
        </p>

        {/* White Login Form Card */}
        <form onSubmit={handleSubmit} className="w-full tc-card p-6 space-y-4">
          <div>
            <label htmlFor="login-email" className="block text-[13px] font-semibold text-[#162333] mb-1.5">
              Email
            </label>
            <div className="relative">
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full h-12 pl-4 pr-11 rounded-2xl border border-slate-200 bg-white text-sm text-[#162333] placeholder:text-slate-400 focus:outline-none focus:border-[#93A7EC] focus:ring-2 focus:ring-[#93A7EC]/25"
              />
              <Mail className="w-4 h-4 text-[#526173] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="login-password" className="block text-[13px] font-semibold text-[#162333] mb-1.5">
              Kata sandi
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
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

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                setForgotEmail(email);
                setForgotSent(false);
                setShowForgotModal(true);
              }}
              className="text-xs font-semibold text-[#162333] hover:underline"
            >
              Lupa kata sandi?
            </button>
          </div>

          {error && (
            <p className="text-xs text-[#9B3B2E] bg-[#FCE4DB] px-3.5 py-2 rounded-xl font-medium">
              {error}
            </p>
          )}

          <button type="submit" className="w-full tc-btn-primary h-12 text-[15px]">
            Masuk
          </button>

          <div className="flex items-center justify-center py-0.5">
            <span className="text-xs text-[#6D7B8D]">atau masuk dengan</span>
          </div>

          <button
            type="button"
            onClick={() => onLogin(email.trim() || 'alya@email.com')}
            className="w-full h-12 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center gap-2.5 text-sm font-semibold text-[#162333] transition-colors"
          >
            <GoogleLogoSvg className="w-5 h-5" />
            <span>Lanjutkan dengan Google</span>
          </button>
        </form>

        <div className="mt-6 text-center space-y-2.5">
          <p className="text-[13px] text-[#364457]">
            Belum punya akun?{' '}
            <button
              type="button"
              onClick={onGoRegister}
              className="font-bold text-[#162333] hover:underline"
            >
              Daftar dulu
            </button>
          </p>
          <p className="text-[11.5px] text-[#6D7B8D]">
            Ceritamu pribadi. Kamu yang pegang kendali.
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-center justify-center p-5">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl relative">
            <button
              type="button"
              onClick={() => setShowForgotModal(false)}
              aria-label="Tutup"
              className="absolute right-4 top-4 w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#526173]"
            >
              <X className="w-4 h-4" />
            </button>
            <h2 className="text-lg font-bold text-[#162333]">Reset kata sandi</h2>
            <p className="text-xs text-[#526173] mt-1 mb-4">
              Kami akan mengirimkan tautan pemulihan ke email akunmu.
            </p>
            {forgotSent ? (
              <div className="bg-[#E2EFE9] text-[#162333] text-xs p-3.5 rounded-2xl mb-4 leading-relaxed">
                Tautan pemulihan sudah dikirim ke <strong>{forgotEmail || 'emailmu'}</strong>. Silakan cek kotak masuk atau folder spam.
              </div>
            ) : (
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-sm mb-4 focus:outline-none focus:border-[#93A7EC]"
              />
            )}
            <button
              type="button"
              onClick={() => {
                if (forgotSent) setShowForgotModal(false);
                else setForgotSent(true);
              }}
              className="w-full tc-btn-primary h-11 text-sm"
            >
              {forgotSent ? 'Kembali masuk' : 'Kirim tautan reset'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
