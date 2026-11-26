import React, { useState } from 'react';
import {
  ArrowLeft,
  CalendarHeart,
  HeartHandshake,
  Home,
  MoreHorizontal,
  User,
  Users,
} from 'lucide-react';
import type { ScreenRoute } from '../types';
import { MascotAvatar, TitipCeritaLogoIcon } from './Mascots';

interface AppShellProps {
  currentScreen: ScreenRoute;
  showNav: boolean;
  userNickname: string;
  userMascot: 'blue' | 'mint';
  onSwitchTab: (tab: 'home' | 'community' | 'my-sessions' | 'profile') => void;
  onNavigate: (screen: ScreenRoute) => void;
  children: React.ReactNode;
}

const NAV_ITEMS: Array<{
  id: 'home' | 'community' | 'my-sessions' | 'profile';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'community', label: 'Komunitas', icon: Users },
  { id: 'my-sessions', label: 'Sesi Saya', icon: CalendarHeart },
  { id: 'profile', label: 'Profil', icon: User },
];

export function AppShell({
  currentScreen,
  showNav,
  userNickname,
  userMascot,
  onSwitchTab,
  onNavigate,
  children,
}: AppShellProps) {
  const activeTab =
    currentScreen === 'home' ||
    currentScreen === 'community' ||
    currentScreen === 'my-sessions' ||
    currentScreen === 'profile'
      ? currentScreen
      : null;

  return (
    <div className="min-h-screen tc-bg-gradient flex">
      {/* Desktop Left Sidebar for Main Navigation & Authenticated Workspace */}
      {showNav && (
        <aside className="hidden md:flex md:w-64 lg:w-72 md:flex-col md:fixed md:inset-y-0 md:left-0 z-30 p-5">
          <div className="h-full bg-white/85 backdrop-blur-md rounded-3xl shadow-[0_10px_32px_rgba(22,35,51,0.05)] p-5 flex flex-col justify-between border border-white/80">
            <div>
              <button
                type="button"
                onClick={() => onSwitchTab('home')}
                className="flex items-center gap-3 w-full text-left mb-8 group"
              >
                <TitipCeritaLogoIcon className="w-10 h-10 shrink-0" />
                <div>
                  <span className="block text-xl font-bold tracking-tight text-[#162333]">
                    TitipCerita
                  </span>
                  <span className="block text-xs text-[#6D7B8D]">Ruang aman sebaya</span>
                </div>
              </button>

              <nav className="space-y-1.5" aria-label="Navigasi utama">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSwitchTab(item.id)}
                      className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all whitespace-nowrap ${
                        isActive
                          ? 'bg-[#93A7EC] text-[#162333] shadow-sm'
                          : 'text-[#526173] hover:bg-[#F3F6FD] hover:text-[#162333]'
                      }`}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onNavigate('professional-help')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#FCE4DB]/80 hover:bg-[#FCE4DB] text-[#162333] text-xs font-semibold transition-colors text-left"
              >
                <HeartHandshake className="w-4 h-4 shrink-0 text-[#9B4837]" />
                <span>Butuh bantuan profesional?</span>
              </button>

              <button
                type="button"
                onClick={() => onSwitchTab('profile')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-[#F3F6FD] transition-colors text-left"
              >
                <MascotAvatar variant={userMascot} size="sm" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#162333] truncate">{userNickname}</p>
                  <p className="text-xs text-[#6D7B8D] truncate">Lihat profil & privasi</p>
                </div>
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content Canvas */}
      <main
        className={`flex-1 w-full min-h-screen flex flex-col ${
          showNav ? 'md:pl-64 lg:pl-72 pb-28 md:pb-10' : 'pb-8'
        }`}
      >
        <div
          className={`w-full mx-auto flex-1 flex flex-col ${
            showNav ? 'max-w-[440px] md:max-w-4xl lg:max-w-5xl md:px-8 lg:px-10' : 'max-w-[440px] md:max-w-3xl'
          }`}
        >
          {children}
        </div>
      </main>

      {/* Mobile Floating Bottom Navigation Bar (Matches Figma exact rounded pill design) */}
      {showNav && (
        <nav
          aria-label="Navigasi bawah"
          className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-[408px] bg-white/95 backdrop-blur-md rounded-[28px] shadow-[0_10px_30px_rgba(22,35,51,0.1)] p-1.5 grid grid-cols-4 gap-1 border border-white"
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSwitchTab(item.id)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-[22px] transition-all min-h-[52px] ${
                  isActive
                    ? 'bg-[#93A7EC] text-[#162333] font-semibold'
                    : 'text-[#526173] hover:text-[#162333] font-medium'
                }`}
              >
                <Icon className="w-[19px] h-[19px]" />
                <span className="text-[11px] mt-1 leading-none whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}

interface PageHeaderProps {
  title?: string;
  onBack?: () => void;
  onHelpClick?: () => void;
  rightAction?: React.ReactNode;
  showMenu?: boolean;
}

export function PageHeader({
  title,
  onBack,
  onHelpClick,
  rightAction,
  showMenu = true,
}: PageHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative flex items-center justify-between px-5 md:px-0 pt-5 pb-3">
      <div className="flex items-center gap-3 min-w-0">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Kembali"
            className="w-10 h-10 rounded-full bg-white shadow-[0_4px_14px_rgba(22,35,51,0.06)] flex items-center justify-center text-[#162333] hover:bg-slate-50 transition-colors shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        {title && (
          <h1 className="text-[17px] font-bold text-[#162333] truncate">{title}</h1>
        )}
      </div>

      {rightAction ? (
        rightAction
      ) : showMenu ? (
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu lainnya"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#162333] hover:bg-white/60 transition-colors"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 mt-1 w-52 bg-white rounded-2xl shadow-[0_12px_32px_rgba(22,35,51,0.12)] p-1.5 z-50 border border-slate-100">
                {onHelpClick && (
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onHelpClick();
                    }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm text-[#162333] hover:bg-[#F3F6FD] font-medium"
                  >
                    Bantuan Profesional
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm text-[#526173] hover:bg-[#F3F6FD]"
                >
                  Tutup menu
                </button>
              </div>
            </>
          )}
        </div>
      ) : null}
    </header>
  );
}
