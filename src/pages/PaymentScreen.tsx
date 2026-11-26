import React, { useEffect, useState } from 'react';
import {
  CalendarHeart,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Copy,
  Download,
  Landmark,
  Lock,
  QrCode,
  ScanLine,
  Wallet,
} from 'lucide-react';
import { PageHeader } from '../components/Layout';
import { MascotAvatar, MascotMint, QrisCodeSvg } from '../components/Mascots';
import { formatRupiah, formatTimeCountdown } from '../data/mockData';
import type {
  BookingDraft,
  Buddy,
  EwalletProvider,
  PaymentMethodType,
  ScreenRoute,
  Session,
  UserProfile,
} from '../types';

interface PaymentScreenProps {
  mode: 'payment-method' | 'payment-bank' | 'payment-qris' | 'payment-success';
  user: UserProfile;
  buddy: Buddy;
  draft: BookingDraft;
  lastBookedSession: Session | null;
  onSelectMethod: (method: PaymentMethodType, provider?: EwalletProvider) => void;
  onNavigate: (screen: ScreenRoute) => void;
  onBack: () => void;
  onConfirmPayment: () => void;
  onGoMySessions: () => void;
  onGoHome: () => void;
  onShowToast: (msg: string) => void;
  onHelpClick: () => void;
}

export function PaymentScreen({
  mode,
  user,
  buddy,
  draft,
  lastBookedSession,
  onSelectMethod,
  onNavigate,
  onBack,
  onConfirmPayment,
  onGoMySessions,
  onGoHome,
  onShowToast,
  onHelpClick,
}: PaymentScreenProps) {
  const [countdown, setCountdown] = useState(14 * 60 + 59);
  const [showEwalletSheet, setShowEwalletSheet] = useState(false);

  useEffect(() => {
    if (mode !== 'payment-bank' && mode !== 'payment-qris') return;
    setCountdown(14 * 60 + 59);
    const t = window.setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(t);
  }, [mode]);

  const startHour = parseInt(draft.startTime.split('.')[0] || '19', 10);
  const endTotalMins = startHour * 60 + draft.durationMinutes;
  const endHour = Math.floor(endTotalMins / 60);
  const endMin = endTotalMins % 60;
  const timeRange = `${draft.startTime}–${String(endHour).padStart(2, '0')}.${String(endMin).padStart(2, '0')} WIB`;

  const handleCopyVa = async () => {
    const va = '8808123456789012';
    try {
      await navigator.clipboard.writeText(va);
    } catch {
      // Clipboard fallback
    }
    onShowToast('Nomor Virtual Account disalin: 8808 1234 5678 9012');
  };

  const handleSaveQr = () => {
    const svgEl = document.getElementById('titipcerita-qris-svg');
    if (svgEl) {
      const serializer = new XMLSerializer();
      const svgStr = serializer.serializeToString(svgEl);
      const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `QRIS-TitipCerita-${buddy.name}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    onShowToast('Kode QR TitipCerita berhasil disimpan.');
  };

  // SCREEN: PAYMENT METHOD SELECTION (E-wallet, Transfer Bank, QRIS)
  if (mode === 'payment-method') {
    const handlePayClick = () => {
      if (draft.paymentMethod === 'bank') {
        onNavigate('payment-bank');
      } else if (draft.paymentMethod === 'qris') {
        onNavigate('payment-qris');
      } else {
        onConfirmPayment();
      }
    };

    return (
      <div className="min-h-screen flex flex-col">
        <PageHeader title="Pembayaran" onBack={onBack} onHelpClick={onHelpClick} />

        <div className="flex-1 px-5 md:px-0 pb-10 max-w-xl mx-auto w-full space-y-5">
          <div>
            <h2 className="text-[26px] font-bold text-[#162333] tracking-tight">
              Selangkah lagi, {user.nickname}.
            </h2>
            <p className="text-[13.5px] text-[#526173] mt-1">
              Cek sesimu, lalu pilih cara bayar.
            </p>
          </div>

          {/* Summary Card */}
          <div className="tc-card p-4 space-y-3">
            <div className="flex items-center gap-3">
              <MascotAvatar variant={buddy.mascot} size="md" />
              <div>
                <p className="text-[15px] font-bold text-[#162333]">
                  {buddy.name} · {draft.service}
                </p>
                <p className="text-xs text-[#526173] mt-0.5">
                  {draft.dateLabel} · {timeRange}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-xs text-[#526173]">{draft.durationLabel}</span>
              <span className="text-[18px] font-bold text-[#162333] tabular-nums">
                {formatRupiah(draft.price)}
              </span>
            </div>
          </div>

          {/* Metode Pembayaran */}
          <div>
            <p className="text-sm font-bold text-[#162333] mb-3">Metode pembayaran</p>
            <div className="space-y-3">
              {/* E-wallet */}
              <div
                className={`rounded-2xl transition-all ${
                  draft.paymentMethod === 'ewallet'
                    ? 'bg-[#D6E0FA] border-2 border-[#8FA6EC]'
                    : 'bg-white border-2 border-transparent shadow-[0_4px_16px_rgba(22,35,51,0.04)]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (draft.paymentMethod === 'ewallet') {
                      setShowEwalletSheet((v) => !v);
                    } else {
                      onSelectMethod('ewallet');
                    }
                  }}
                  className="w-full p-4 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3.5">
                    <Wallet className="w-5 h-5 text-[#162333]" />
                    <div>
                      <p className="text-[15px] font-bold text-[#162333]">E-wallet</p>
                      <p className="text-xs text-[#364457] mt-0.5">
                        {draft.ewalletProvider} · Dipilih (ketuk untuk ganti)
                      </p>
                    </div>
                  </div>
                  <span className="w-5 h-5 rounded-full border border-[#162333] flex items-center justify-center">
                    {draft.paymentMethod === 'ewallet' && (
                      <Check className="w-3 h-3 text-[#162333] stroke-[2.5]" />
                    )}
                  </span>
                </button>

                {showEwalletSheet && draft.paymentMethod === 'ewallet' && (
                  <div className="px-4 pb-3.5 pt-1 flex flex-wrap gap-2">
                    {(['GoPay', 'OVO', 'DANA', 'ShopeePay'] as EwalletProvider[]).map((prov) => (
                      <button
                        key={prov}
                        type="button"
                        onClick={() => {
                          onSelectMethod('ewallet', prov);
                          setShowEwalletSheet(false);
                        }}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold ${
                          draft.ewalletProvider === prov
                            ? 'bg-[#162333] text-white'
                            : 'bg-white text-[#162333]'
                        }`}
                      >
                        {prov}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Transfer Bank */}
              <button
                type="button"
                onClick={() => onSelectMethod('bank')}
                className={`w-full p-4 rounded-2xl flex items-center justify-between text-left transition-all ${
                  draft.paymentMethod === 'bank'
                    ? 'bg-[#D6E0FA] border-2 border-[#8FA6EC]'
                    : 'bg-white border-2 border-transparent shadow-[0_4px_16px_rgba(22,35,51,0.04)] hover:bg-white/90'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Landmark className="w-5 h-5 text-[#162333]" />
                  <div>
                    <p className="text-[15px] font-bold text-[#162333]">Transfer bank</p>
                    <p className="text-xs text-[#526173] mt-0.5">Virtual account</p>
                  </div>
                </div>
                <ChevronRight className="w-4.5 h-4.5 text-[#526173]" />
              </button>

              {/* QRIS */}
              <button
                type="button"
                onClick={() => onSelectMethod('qris')}
                className={`w-full p-4 rounded-2xl flex items-center justify-between text-left transition-all ${
                  draft.paymentMethod === 'qris'
                    ? 'bg-[#D6E0FA] border-2 border-[#8FA6EC]'
                    : 'bg-white border-2 border-transparent shadow-[0_4px_16px_rgba(22,35,51,0.04)] hover:bg-white/90'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <QrCode className="w-5 h-5 text-[#162333]" />
                  <div>
                    <p className="text-[15px] font-bold text-[#162333]">QRIS</p>
                    <p className="text-xs text-[#526173] mt-0.5">Scan dari aplikasi pembayaranmu</p>
                  </div>
                </div>
                <ChevronRight className="w-4.5 h-4.5 text-[#526173]" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-[#364457]">Total · tanpa biaya tambahan</span>
            <span className="text-[18px] font-bold text-[#162333] tabular-nums">
              {formatRupiah(draft.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={handlePayClick}
            className="w-full tc-btn-primary h-13 flex items-center justify-center gap-2 text-[15px]"
          >
            <Lock className="w-4 h-4" />
            <span>Bayar {formatRupiah(draft.price)}</span>
          </button>

          <div className="text-center space-y-2 pt-1">
            <p className="text-xs text-[#364457]">
              {draft.paymentMethod === 'ewallet'
                ? `Kamu akan diarahkan ke ${draft.ewalletProvider} untuk konfirmasi.`
                : draft.paymentMethod === 'bank'
                  ? 'Nomor Virtual Account akan ditampilkan di langkah berikutnya.'
                  : 'Kode QRIS akan ditampilkan untuk kamu scan.'}
            </p>
            <p className="text-[11px] text-[#6D7B8D] leading-relaxed">
              Dengan melanjutkan, kamu menyetujui ketentuan pemesanan dan pembayaran.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN: TRANSFER BANK
  if (mode === 'payment-bank') {
    return (
      <div className="min-h-screen flex flex-col">
        <PageHeader title="Transfer bank" onBack={onBack} onHelpClick={onHelpClick} />

        <div className="flex-1 px-5 md:px-0 pb-10 max-w-xl mx-auto w-full space-y-4">
          <div className="rounded-2xl bg-[#F6ECE7] p-4 flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#364457] shrink-0 mt-0.5" />
            <div>
              <p className="text-[14px] font-bold text-[#162333]">Menunggu pembayaran</p>
              <p className="text-xs text-[#526173] mt-1 leading-relaxed tabular-nums">
                Selesaikan dalam {formatTimeCountdown(countdown)}. Sesi dikonfirmasi setelah pembayaran diterima.
              </p>
            </div>
          </div>

          <div className="tc-card p-4 space-y-3">
            <div className="flex items-center gap-3">
              <MascotAvatar variant={buddy.mascot} size="md" />
              <div>
                <p className="text-[15px] font-bold text-[#162333]">
                  {buddy.name} · {draft.service}
                </p>
                <p className="text-xs text-[#526173] mt-0.5">
                  {draft.dateLabel} · {timeRange}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-xs text-[#526173]">{draft.durationLabel}</span>
              <span className="text-[18px] font-bold text-[#162333] tabular-nums">
                {formatRupiah(draft.price)}
              </span>
            </div>
          </div>

          <div className="tc-card p-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <Landmark className="w-5 h-5 text-[#162333]" />
              <span className="text-[15px] font-bold text-[#162333]">BCA Virtual Account</span>
            </div>

            <div>
              <p className="text-[10.5px] font-semibold tracking-wider text-[#526173] uppercase">
                NOMOR VIRTUAL ACCOUNT · CONTOH
              </p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-[22px] font-bold text-[#162333] tracking-tight tabular-nums">
                  8808 1234 5678 9012
                </p>
                <button
                  type="button"
                  onClick={handleCopyVa}
                  aria-label="Salin nomor Virtual Account"
                  className="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-[#364457]"
                >
                  <Copy className="w-4.5 h-4.5" />
                </button>
              </div>
              <p className="text-xs text-[#526173] mt-0.5">Atas nama TitipCerita</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-xs text-[#364457]">Jumlah transfer</span>
              <span className="text-[18px] font-bold text-[#162333] tabular-nums">
                {formatRupiah(draft.price)}
              </span>
            </div>
          </div>

          <div className="pt-1 space-y-2.5">
            <p className="text-[15px] font-bold text-[#162333]">Cara membayar</p>
            <ol className="text-xs text-[#364457] space-y-2">
              <li className="flex gap-2.5">
                <span className="font-bold text-[#162333]">1.</span>
                <span>Buka m-banking, pilih Transfer → Virtual Account.</span>
              </li>
              <li className="flex gap-2.5">
                <span className="font-bold text-[#162333]">2.</span>
                <span>Masukkan nomor di atas dan cek nama penerima.</span>
              </li>
              <li className="flex gap-2.5">
                <span className="font-bold text-[#162333]">3.</span>
                <span>Pastikan nominal {formatRupiah(draft.price)}, lalu konfirmasi.</span>
              </li>
            </ol>
          </div>

          <div className="pt-3 space-y-3 text-center">
            <button
              type="button"
              onClick={onConfirmPayment}
              className="w-full tc-btn-primary h-12.5 text-[15px]"
            >
              Cek status pembayaran
            </button>
            <button
              type="button"
              onClick={onBack}
              className="text-xs font-semibold text-[#364457] hover:underline py-1"
            >
              Ganti metode pembayaran
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN: QRIS
  if (mode === 'payment-qris') {
    return (
      <div className="min-h-screen flex flex-col">
        <PageHeader title="Bayar dengan QRIS" onBack={onBack} onHelpClick={onHelpClick} />

        <div className="flex-1 px-5 md:px-0 pb-10 max-w-xl mx-auto w-full space-y-4">
          <div className="rounded-2xl bg-[#DCEBE5] p-4 flex items-start gap-3">
            <ScanLine className="w-5 h-5 text-[#2F5244] shrink-0 mt-0.5" />
            <div>
              <p className="text-[13.5px] font-bold text-[#162333] tabular-nums">
                Kode berlaku {formatTimeCountdown(countdown)}
              </p>
              <p className="text-xs text-[#3F554C] mt-0.5 leading-relaxed">
                Scan kode dari aplikasi e-wallet atau m-banking pilihanmu.
              </p>
            </div>
          </div>

          <div className="tc-card p-6 flex flex-col items-center text-center">
            <p className="text-[15px] font-bold text-[#162333] mb-4">TitipCerita</p>
            <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-xs">
              <QrisCodeSvg className="w-48 h-48" />
            </div>
            <p className="text-[11px] text-[#6D7B8D] mt-3">
              Kode ilustrasi · bukan untuk transaksi
            </p>
            <p className="text-[24px] font-bold text-[#162333] mt-3 tabular-nums">
              {formatRupiah(draft.price)}
            </p>
            <p className="text-xs text-[#526173] mt-1">
              {draft.service} dengan {buddy.name} · {draft.durationLabel}
            </p>
          </div>

          <div>
            <p className="text-[15px] font-bold text-[#162333]">Scan, cek, lalu konfirmasi.</p>
            <p className="text-xs text-[#526173] mt-1 leading-relaxed">
              Pastikan penerima TitipCerita dan nominal {formatRupiah(draft.price)} sebelum menyelesaikan pembayaran.
            </p>
          </div>

          <div className="space-y-3 pt-1 text-center">
            <button
              type="button"
              onClick={handleSaveQr}
              className="w-full h-12 rounded-full bg-white hover:bg-slate-50 shadow-[0_4px_16px_rgba(22,35,51,0.05)] flex items-center justify-center gap-2 text-sm font-bold text-[#162333] transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Simpan kode QR</span>
            </button>

            <button
              type="button"
              onClick={onConfirmPayment}
              className="w-full tc-btn-primary h-12.5 text-[15px]"
            >
              Cek status pembayaran
            </button>

            <button
              type="button"
              onClick={onBack}
              className="text-xs font-semibold text-[#364457] hover:underline py-1"
            >
              Ganti metode pembayaran
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN: PAYMENT BERHASIL
  const displaySession = lastBookedSession;
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title="Pembayaran" onBack={onGoHome} onHelpClick={onHelpClick} />

      <div className="flex-1 px-5 md:px-0 pb-10 max-w-xl mx-auto w-full flex flex-col items-center text-center">
        <MascotMint className="w-32 h-32 mt-2" />

        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#DCEBE5] text-[#162333] text-xs font-semibold mt-3">
          <CheckCircle2 className="w-4 h-4 text-[#2F5244]" />
          <span>Pembayaran berhasil</span>
        </div>

        <h2 className="text-[28px] font-bold text-[#162333] tracking-tight mt-4">
          Waktumu sudah aman.
        </h2>
        <p className="text-[13.5px] text-[#526173] mt-1.5 max-w-xs leading-relaxed">
          {buddy.name} akan menemanimu. Sampai ketemu di ruang cerita, ya.
        </p>

        {/* Session Card */}
        <div className="w-full tc-card p-4 mt-6 text-left space-y-3">
          <div className="flex items-center gap-3">
            <MascotAvatar variant={buddy.mascot} size="md" />
            <div>
              <p className="text-[15px] font-bold text-[#162333]">
                {displaySession?.buddyName || buddy.name} ·{' '}
                {displaySession?.service || draft.service}
              </p>
              <p className="text-xs text-[#526173] mt-0.5">
                {displaySession?.dateLabel || draft.dateLabel} ·{' '}
                {displaySession?.timeRange || timeRange}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-xs text-[#526173]">
              {displaySession?.durationLabel || draft.durationLabel}
            </span>
            <span className="text-[18px] font-bold text-[#162333] tabular-nums">
              {formatRupiah(displaySession?.price || draft.price)}
            </span>
          </div>
        </div>

        {/* Receipt Card */}
        <div className="w-full tc-card p-4 mt-3 text-left space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[#526173]">ID pemesanan</span>
            <span className="font-bold text-[#162333] tabular-nums">
              {displaySession?.orderId || 'TC20102601'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#526173]">Metode</span>
            <span className="font-bold text-[#162333] tabular-nums">
              {displaySession?.paymentMethodLabel || `${draft.ewalletProvider} · ${formatRupiah(draft.price)}`}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onGoMySessions}
          className="w-full tc-btn-primary h-12.5 mt-6 flex items-center justify-center gap-2 text-[15px]"
        >
          <CalendarHeart className="w-4.5 h-4.5" />
          <span>Lihat sesi saya</span>
        </button>

        <button
          type="button"
          onClick={onGoHome}
          className="mt-4 text-xs font-semibold text-[#364457] hover:underline"
        >
          Kembali ke Home
        </button>
      </div>
    </div>
  );
}
