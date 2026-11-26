import React, { useState } from 'react';
import {
  Bell,
  BookOpen,
  ChevronRight,
  FileText,
  HeartHandshake,
  HelpCircle,
  Lock,
  PencilLine,
  Shield,
  ShieldCheck,
  User,
  UserX,
  X,
} from 'lucide-react';
import { PageHeader } from '../components/Layout';
import { MascotAvatar } from '../components/Mascots';
import { ALL_INTERESTS, computeAgeFromBirthDate } from '../data/mockData';
import type { Buddy, ScreenRoute, UserProfile } from '../types';

interface ProfileScreenProps {
  user: UserProfile;
  allBuddies: Buddy[];
  blockedBuddyIds: string[];
  onUpdateUser: (patch: Partial<UserProfile>) => void;
  onUnblockBuddy: (buddyId: string) => void;
  onNavigate: (screen: ScreenRoute) => void;
  onLogout: () => void;
  onResetAccount: () => void;
  onShowToast: (msg: string) => void;
}

export function ProfileScreen({
  user,
  allBuddies,
  blockedBuddyIds,
  onUpdateUser,
  onUnblockBuddy,
  onNavigate,
  onLogout,
  onResetAccount,
  onShowToast,
}: ProfileScreenProps) {
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [editInterestsOpen, setEditInterestsOpen] = useState(false);
  const [blockedModalOpen, setBlockedModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [infoModal, setInfoModal] = useState<'guidelines' | 'terms' | 'help' | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const [draftName, setDraftName] = useState(user.nickname);
  const [draftBirthDate, setDraftBirthDate] = useState(user.birthDate);
  const [draftMascot, setDraftMascot] = useState(user.mascot);

  const age = computeAgeFromBirthDate(user.birthDate);
  const blockedBuddies = allBuddies.filter((b) => blockedBuddyIds.includes(b.id));

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      nickname: draftName.trim() || user.nickname,
      birthDate: draftBirthDate || user.birthDate,
      mascot: draftMascot,
    });
    setEditProfileOpen(false);
    onShowToast('Profil berhasil diperbarui.');
  };

  const toggleInterest = (tag: string) => {
    const exists = user.interests.includes(tag);
    if (exists && user.interests.length <= 1) return;
    const next = exists
      ? user.interests.filter((t) => t !== tag)
      : [...user.interests, tag];
    onUpdateUser({ interests: next });
  };

  const handleDownloadData = () => {
    const dataStr = JSON.stringify(user, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `titipcerita-data-${user.nickname.toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onShowToast('Salinan data akun berhasil diunduh.');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        title="Profil"
        showMenu
        onHelpClick={() => onNavigate('professional-help')}
      />

      <div className="flex-1 px-5 md:px-0 pb-10 space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-5">
            {/* Profile Identity Card */}
            <div className="tc-card p-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5 min-w-0">
                <MascotAvatar variant={user.mascot} size="lg" />
                <div className="min-w-0">
                  <h2 className="text-[20px] font-bold text-[#162333] truncate">
                    {user.nickname}
                  </h2>
                  <p className="text-xs text-[#526173] mt-0.5 tabular-nums">
                    {age} tahun · {user.joinedLabel}
                  </p>
                  <p className="text-xs text-[#526173] truncate">{user.email}</p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Edit profil"
                onClick={() => {
                  setDraftName(user.nickname);
                  setDraftBirthDate(user.birthDate);
                  setDraftMascot(user.mascot);
                  setEditProfileOpen(true);
                }}
                className="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-[#526173] shrink-0"
              >
                <PencilLine className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Hal yang aku suka */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-[17px] font-bold text-[#162333]">Hal yang aku suka</h3>
                <button
                  type="button"
                  onClick={() => setEditInterestsOpen(true)}
                  className="text-xs font-semibold text-[#162333] hover:underline"
                >
                  Ubah →
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full bg-white text-xs font-semibold text-[#162333] shadow-[0_3px_12px_rgba(22,35,51,0.035)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Pengaturan */}
            <div>
              <h3 className="text-[17px] font-bold text-[#162333] mb-2.5">Pengaturan</h3>
              <div className="tc-card divide-y divide-slate-100 overflow-hidden">
                <button
                  type="button"
                  onClick={() => {
                    setDraftName(user.nickname);
                    setDraftBirthDate(user.birthDate);
                    setDraftMascot(user.mascot);
                    setEditProfileOpen(true);
                  }}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <User className="w-4.5 h-4.5 text-[#364457]" />
                    <span className="text-sm font-medium text-[#162333]">
                      Akun & tanggal lahir
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#526173]" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onUpdateUser({ notificationsEnabled: !user.notificationsEnabled });
                    onShowToast(
                      !user.notificationsEnabled
                        ? 'Notifikasi sesi diaktifkan.'
                        : 'Notifikasi sesi dinonaktifkan.'
                    );
                  }}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Bell className="w-4.5 h-4.5 text-[#364457]" />
                    <span className="text-sm font-medium text-[#162333]">Notifikasi sesi</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#526173]">
                    <span className="font-semibold">
                      {user.notificationsEnabled ? 'Aktif' : 'Nonaktif'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPrivacyModalOpen(true)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4.5 h-4.5 text-[#364457]" />
                    <span className="text-sm font-medium text-[#162333]">
                      Privasi & keamanan
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#526173]" />
                </button>

                <button
                  type="button"
                  onClick={() => setBlockedModalOpen(true)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <UserX className="w-4.5 h-4.5 text-[#364457]" />
                    <span className="text-sm font-medium text-[#162333]">
                      Akun yang diblokir
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#526173]">
                    {blockedBuddies.length > 0 && (
                      <span className="tabular-nums">{blockedBuddies.length}</span>
                    )}
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>

            {/* Ceritamu bukan konsumsi publik */}
            <div className="rounded-2xl bg-[#DCEBE5] p-4 flex items-start gap-3">
              <Lock className="w-5 h-5 text-[#2F5244] shrink-0 mt-0.5" />
              <div>
                <p className="text-[13.5px] font-bold text-[#162333]">
                  Ceritamu bukan konsumsi publik
                </p>
                <p className="text-xs text-[#3F554C] mt-1 leading-relaxed">
                  Percakapan sesi tidak ditampilkan di komunitas. Kamu menentukan apa yang ingin dibagikan.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-6 space-y-5">
            {/* Privasi ada di tanganmu */}
            <div className="tc-card p-5 space-y-3.5">
              <h3 className="text-[18px] font-bold text-[#162333]">
                Privasi ada di tanganmu.
              </h3>
              <p className="text-xs text-[#364457] leading-relaxed">
                Gunakan nama samaran di komunitas dan ulasan. Jangan membagikan alamat, nomor pribadi, atau informasi sensitif dalam percakapan.
              </p>
              <p className="text-xs text-[#364457] leading-relaxed">
                Akses data dibatasi sesuai Kebijakan Privasi. Kamu bisa meminta akses, koreksi, atau penghapusan data akun.
              </p>
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(true)}
                className="w-full h-12 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center gap-2 text-sm font-bold text-[#162333] transition-colors mt-1"
              >
                <Shield className="w-4 h-4" />
                <span>Kelola data & privasi</span>
              </button>
            </div>

            {/* Support Links Card */}
            <div className="tc-card divide-y divide-slate-100 overflow-hidden">
              <button
                type="button"
                onClick={() => onNavigate('professional-help')}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HeartHandshake className="w-4.5 h-4.5 text-[#364457]" />
                  <span className="text-sm font-medium text-[#162333]">
                    Bantuan Profesional
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#526173]" />
              </button>

              <button
                type="button"
                onClick={() => setInfoModal('guidelines')}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4.5 h-4.5 text-[#364457]" />
                  <span className="text-sm font-medium text-[#162333]">
                    Panduan komunitas
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#526173]" />
              </button>

              <button
                type="button"
                onClick={() => setInfoModal('terms')}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4.5 h-4.5 text-[#364457]" />
                  <span className="text-sm font-medium text-[#162333]">
                    Ketentuan & Kebijakan Privasi
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#526173]" />
              </button>

              <button
                type="button"
                onClick={() => setInfoModal('help')}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-4.5 h-4.5 text-[#364457]" />
                  <span className="text-sm font-medium text-[#162333]">Pusat bantuan</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#526173]" />
              </button>
            </div>

            {/* Footer Logout & Delete */}
            <div className="pt-2 space-y-4">
              <div className="flex items-center justify-between px-1">
                <button
                  type="button"
                  onClick={onLogout}
                  className="text-sm font-bold text-[#162333] hover:underline"
                >
                  Keluar akun
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmOpen(true)}
                  className="text-xs font-medium text-[#526173] hover:text-[#9B3B2E] hover:underline"
                >
                  Hapus akun
                </button>
              </div>
              <p className="text-center text-[11px] text-[#6D7B8D]">
                TitipCerita v1.0 · Dibuat untuk saling menemani.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editProfileOpen && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-center justify-center p-5">
          <form onSubmit={saveProfile} className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl relative space-y-4">
            <button
              type="button"
              onClick={() => setEditProfileOpen(false)}
              aria-label="Tutup"
              className="absolute right-4 top-4 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#526173]"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-[#162333]">Edit Akun & Profil</h3>
            <div>
              <label className="block text-xs font-semibold text-[#162333] mb-1">
                Nama panggilan
              </label>
              <input
                type="text"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-[#93A7EC]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#162333] mb-1">
                Tanggal lahir
              </label>
              <input
                type="date"
                value={draftBirthDate}
                onChange={(e) => setDraftBirthDate(e.target.value)}
                className="w-full h-11 px-4 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-[#93A7EC]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#162333] mb-2">
                Avatar maskot
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {(['blue', 'mint'] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setDraftMascot(v)}
                    className={`p-3 rounded-2xl border flex items-center justify-center gap-2 text-xs font-semibold ${
                      draftMascot === v
                        ? 'bg-[#EEF2FB] border-[#93A7EC] text-[#162333]'
                        : 'border-slate-200 text-[#526173]'
                    }`}
                  >
                    <MascotAvatar variant={v} size="xs" />
                    <span>{v === 'blue' ? 'Biru' : 'Mint'}</span>
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" className="w-full tc-btn-primary h-11 text-sm">
              Simpan perubahan
            </button>
          </form>
        </div>
      )}

      {/* Edit Interests Modal */}
      {editInterestsOpen && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-center justify-center p-5">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl relative space-y-4">
            <button
              type="button"
              onClick={() => setEditInterestsOpen(false)}
              aria-label="Tutup"
              className="absolute right-4 top-4 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#526173]"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-[#162333]">Hal yang aku suka</h3>
            <p className="text-xs text-[#526173]">
              Pilih topik agar rekomendasi buddy lebih pas denganmu.
            </p>
            <div className="flex flex-wrap gap-2">
              {ALL_INTERESTS.map((tag) => {
                const active = user.interests.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleInterest(tag)}
                    className={`px-3.5 py-2 rounded-full text-xs font-semibold ${
                      active
                        ? 'bg-[#93A7EC] text-[#162333]'
                        : 'bg-[#F4F7FC] text-[#526173]'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setEditInterestsOpen(false)}
              className="w-full tc-btn-primary h-11 text-sm"
            >
              Selesai
            </button>
          </div>
        </div>
      )}

      {/* Blocked Accounts Modal */}
      {blockedModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-center justify-center p-5">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl relative space-y-4">
            <button
              type="button"
              onClick={() => setBlockedModalOpen(false)}
              aria-label="Tutup"
              className="absolute right-4 top-4 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#526173]"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-[#162333]">Akun yang diblokir</h3>
            {blockedBuddies.length === 0 ? (
              <p className="text-xs text-[#526173] py-4 text-center">
                Tidak ada buddy yang sedang diblokir.
              </p>
            ) : (
              <div className="space-y-2.5">
                {blockedBuddies.map((b) => (
                  <div
                    key={b.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-[#F6F8FD]"
                  >
                    <div className="flex items-center gap-2.5">
                      <MascotAvatar variant={b.mascot} size="sm" />
                      <span className="text-sm font-bold text-[#162333]">{b.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onUnblockBuddy(b.id)}
                      className="text-xs font-semibold text-[#4B6BD6] hover:underline"
                    >
                      Buka blokir
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Privacy & Data Management Modal */}
      {privacyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-center justify-center p-5">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl relative space-y-4">
            <button
              type="button"
              onClick={() => setPrivacyModalOpen(false)}
              aria-label="Tutup"
              className="absolute right-4 top-4 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#526173]"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-[#162333]">Kelola data & privasi</h3>
            <p className="text-xs text-[#526173] leading-relaxed">
              Seluruh sesi percakapan tersimpan secara privat pada perangkatmu dan tidak dibagikan ke ruang publik komunitas.
            </p>
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleDownloadData}
                className="w-full h-11 rounded-full border border-slate-200 text-xs font-bold text-[#162333] hover:bg-slate-50"
              >
                Unduh salinan data akun (JSON)
              </button>
              <button
                type="button"
                onClick={() => {
                  setPrivacyModalOpen(false);
                  onResetAccount();
                }}
                className="w-full h-11 rounded-full bg-[#FCE4DB] text-xs font-bold text-[#8A3022] hover:bg-[#F9D3C5]"
              >
                Reset ulang data demo aplikasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Modals (Guidelines / Terms / Help) */}
      {infoModal && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-center justify-center p-5">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl relative space-y-3">
            <button
              type="button"
              onClick={() => setInfoModal(null)}
              aria-label="Tutup"
              className="absolute right-4 top-4 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#526173]"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-[#162333]">
              {infoModal === 'guidelines'
                ? 'Panduan Komunitas'
                : infoModal === 'terms'
                  ? 'Ketentuan & Kebijakan Privasi'
                  : 'Pusat Bantuan'}
            </h3>
            <p className="text-xs text-[#364457] leading-relaxed">
              {infoModal === 'guidelines'
                ? 'TitipCerita adalah ruang aman untuk saling mendengar tanpa menghakimi. Hindari berbagi kontak pribadi, jaga kerahasiaan teman bercerita, dan gunakan fitur lapor jika merasa tidak nyaman.'
                : infoModal === 'terms'
                  ? 'Layanan pendampingan sebaya di TitipCerita bersifat non-klinis dan bukan pengganti layanan psikolog atau psikiater. Data akun dan riwayat sesimu dikelola sesuai persetujuanmu.'
                  : 'Butuh bantuan terkait pemesanan sesi atau kendala pembayaran? Kamu dapat menghubungi tim dukungan kami di halo@titipcerita.id atau mengakses menu Bantuan Profesional untuk dukungan darurat.'}
            </p>
            <button
              type="button"
              onClick={() => setInfoModal(null)}
              className="w-full tc-btn-primary h-11 text-xs mt-2"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Delete Account Confirm Modal */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-center justify-center p-5">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-[#162333]">Hapus akun TitipCerita?</h3>
            <p className="text-xs text-[#526173] leading-relaxed">
              Seluruh riwayat sesi dan preferensi di perangkat ini akan dihapus dan dikembalikan ke layar awal.
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(false)}
                className="h-11 rounded-full border border-slate-200 text-xs font-semibold text-[#526173]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  setDeleteConfirmOpen(false);
                  onResetAccount();
                }}
                className="h-11 rounded-full bg-[#FCE4DB] text-xs font-bold text-[#8A3022]"
              >
                Ya, hapus akun
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
