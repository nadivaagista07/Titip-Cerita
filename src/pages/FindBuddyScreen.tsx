import React, { useMemo, useState } from 'react';
import {
  BadgeCheck,
  ChevronDown,
  Clock,
  Heart,
  Search,
  SlidersHorizontal,
  Star,
} from 'lucide-react';
import { PageHeader } from '../components/Layout';
import { MascotAvatar } from '../components/Mascots';
import { formatRupiah } from '../data/mockData';
import type { Buddy, ServiceType, UserProfile } from '../types';

interface FindBuddyScreenProps {
  user: UserProfile;
  buddies: Buddy[];
  initialService: ServiceType;
  onChangeService: (s: ServiceType) => void;
  onBack: () => void;
  onSelectBuddy: (buddyId: string) => void;
  onHelpClick: () => void;
}

type SortOption = 'relevant' | 'rating' | 'price-asc' | 'price-desc';

export function FindBuddyScreen({
  user,
  buddies,
  initialService,
  onChangeService,
  onBack,
  onSelectBuddy,
  onHelpClick,
}: FindBuddyScreenProps) {
  const [service, setService] = useState<ServiceType>(initialService);
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyToday, setOnlyToday] = useState(true);
  const [matchInterestOnly, setMatchInterestOnly] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>('Musik');
  const [sortBy, setSortBy] = useState<SortOption>('relevant');
  const [showAll, setShowAll] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const interestTags = Array.from(new Set(['Musik', 'Kampus', 'Journaling', ...user.interests])).slice(
    0,
    5
  );

  const filteredBuddies = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let list = buddies.filter((b) => b.services.includes(service));

    if (onlyToday) {
      list = list.filter((b) => b.availableToday);
    }
    if (matchInterestOnly) {
      list = list.filter((b) => b.interests.some((i) => user.interests.includes(i)));
    }
    if (q) {
      list = list.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.tagline.toLowerCase().includes(q) ||
          b.interests.some((i) => i.toLowerCase().includes(q))
      );
    }

    const sorted = [...list].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') {
        return (a.pricing[service]?.[0]?.price || 0) - (b.pricing[service]?.[0]?.price || 0);
      }
      if (sortBy === 'price-desc') {
        return (b.pricing[service]?.[0]?.price || 0) - (a.pricing[service]?.[0]?.price || 0);
      }
      // 'relevant': boost buddies matching selectedTag
      const aMatch = a.interests.includes(selectedTag) ? 1 : 0;
      const bMatch = b.interests.includes(selectedTag) ? 1 : 0;
      if (aMatch !== bMatch) return bMatch - aMatch;
      return b.sessionCount - a.sessionCount;
    });

    return sorted;
  }, [buddies, matchInterestOnly, onlyToday, searchQuery, selectedTag, service, sortBy, user.interests]);

  const visibleBuddies = showAll ? filteredBuddies : filteredBuddies.slice(0, 3);
  const hiddenCount = Math.max(0, filteredBuddies.length - visibleBuddies.length);

  const handleSelectService = (next: ServiceType) => {
    setService(next);
    onChangeService(next);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title="Find Your Buddy" onBack={onBack} onHelpClick={onHelpClick} />

      <div className="flex-1 px-5 md:px-0 pb-10 space-y-4">
        <div>
          <h2 className="text-[26px] md:text-[30px] font-bold text-[#162333] leading-tight tracking-tight">
            Ada teman untuk setiap ceritamu.
          </h2>
          <p className="text-[13.5px] text-[#526173] mt-1">
            Temukan yang nyambung, bukan yang sempurna.
          </p>
        </div>

        {/* Service Segmented Control */}
        <div className="bg-white rounded-full p-1 shadow-[0_4px_16px_rgba(22,35,51,0.04)] grid grid-cols-3 gap-1 max-w-md">
          {(['Story', 'Chat', 'Study'] as ServiceType[]).map((s) => {
            const active = service === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => handleSelectService(s)}
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

        {/* Search Input */}
        <div className="relative max-w-xl">
          <Search className="w-4.5 h-4.5 text-[#526173] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nama buddy atau minat"
            className="w-full h-12 pl-11 pr-12 rounded-2xl bg-white shadow-[0_4px_16px_rgba(22,35,51,0.04)] text-sm text-[#162333] placeholder:text-[#6D7B8D] focus:outline-none focus:ring-2 focus:ring-[#93A7EC]"
          />
          <button
            type="button"
            aria-label="Filter lanjutan"
            onClick={() => setShowSortMenu((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center text-[#526173]"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setOnlyToday((v) => !v)}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                onlyToday
                  ? 'bg-[#93A7EC] text-[#162333]'
                  : 'bg-white text-[#162333] shadow-xs'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Hari ini</span>
            </button>

            <button
              type="button"
              onClick={() => setMatchInterestOnly((v) => !v)}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                matchInterestOnly
                  ? 'bg-[#93A7EC] text-[#162333]'
                  : 'bg-white text-[#162333] shadow-xs'
              }`}
            >
              Minat sama
            </button>

            <button
              type="button"
              onClick={() =>
                setSortBy((prev) =>
                  prev === 'price-asc' ? 'price-desc' : 'price-asc'
                )
              }
              className={`px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                sortBy.startsWith('price')
                  ? 'bg-[#93A7EC] text-[#162333]'
                  : 'bg-white text-[#162333] shadow-xs'
              }`}
            >
              <ChevronDown className="w-3.5 h-3.5" />
              <span>
                {sortBy === 'price-asc'
                  ? 'Harga termurah'
                  : sortBy === 'price-desc'
                    ? 'Harga tertinggi'
                    : 'Harga'}
              </span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {interestTags.map((tag) => {
              const active = selectedTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(active ? '' : tag)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    active
                      ? 'bg-[#93A7EC] text-[#162333]'
                      : 'bg-white text-[#162333] shadow-xs hover:bg-slate-50'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Count & Sort Row */}
        <div className="flex items-center justify-between pt-1 relative">
          <p className="text-xs font-bold text-[#162333] tabular-nums">
            {filteredBuddies.length} buddy untukmu
          </p>

          <button
            type="button"
            onClick={() => setShowSortMenu((v) => !v)}
            className="text-xs font-medium text-[#526173] hover:text-[#162333] flex items-center gap-1"
          >
            <span>
              {sortBy === 'relevant'
                ? 'Paling sesuai ↓'
                : sortBy === 'rating'
                  ? 'Rating tertinggi ↓'
                  : sortBy === 'price-asc'
                    ? 'Harga terendah ↑'
                    : 'Harga tertinggi ↓'}
            </span>
          </button>

          {showSortMenu && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowSortMenu(false)} />
              <div className="absolute right-0 top-7 w-44 bg-white rounded-2xl shadow-lg p-1.5 z-40 border border-slate-100">
                {(
                  [
                    { id: 'relevant', label: 'Paling sesuai' },
                    { id: 'rating', label: 'Rating tertinggi' },
                    { id: 'price-asc', label: 'Harga terendah' },
                    { id: 'price-desc', label: 'Harga tertinggi' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setSortBy(opt.id);
                      setShowSortMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium ${
                      sortBy === opt.id
                        ? 'bg-[#EEF2FB] text-[#162333] font-semibold'
                        : 'text-[#526173] hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Buddy Cards Grid */}
        {visibleBuddies.length === 0 ? (
          <div className="tc-card p-6 text-center">
            <p className="text-sm font-bold text-[#162333]">Belum ada buddy yang cocok dengan filter ini</p>
            <p className="text-xs text-[#526173] mt-1">
              Coba matikan filter “Hari ini” atau hapus kata pencarianmu.
            </p>
            <button
              type="button"
              onClick={() => {
                setOnlyToday(false);
                setMatchInterestOnly(false);
                setSearchQuery('');
                setSelectedTag('');
              }}
              className="mt-4 px-5 py-2.5 rounded-full bg-[#93A7EC] text-xs font-semibold text-[#162333]"
            >
              Reset filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {visibleBuddies.map((buddy) => {
              const startPrice = buddy.pricing[service]?.[0]?.price ?? 15000;
              return (
                <button
                  key={buddy.id}
                  type="button"
                  onClick={() => onSelectBuddy(buddy.id)}
                  className="w-full tc-card p-4 text-left hover:shadow-[0_10px_28px_rgba(22,35,51,0.08)] transition-all"
                >
                  <div className="flex items-start gap-3.5">
                    <MascotAvatar variant={buddy.mascot} size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base font-bold text-[#162333]">{buddy.name}</span>
                        {buddy.verified && <BadgeCheck className="w-4 h-4 text-[#364457]" />}
                      </div>
                      <p className="text-[13px] text-[#526173] mt-0.5 line-clamp-1">
                        {buddy.tagline}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-[#526173] mt-1 tabular-nums">
                        <Star className="w-3.5 h-3.5 fill-[#162333] text-[#162333]" />
                        <span className="font-semibold text-[#162333]">
                          {String(buddy.rating).replace('.', ',')}
                        </span>
                        <span>· {buddy.sessionCount} sesi</span>
                        <span>· Usia {buddy.age}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs">
                    <span className="font-bold text-[#162333] tabular-nums">
                      {service} mulai {formatRupiah(startPrice)}
                    </span>
                    <span className="text-[#526173] flex items-center gap-1.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          buddy.availableToday ? 'bg-[#162333]' : 'bg-slate-300'
                        }`}
                      />
                      {buddy.availableToday ? 'Tersedia hari ini' : 'Besok'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {hiddenCount > 0 && (
          <div className="flex justify-center pt-1">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="text-xs font-bold text-[#162333] hover:underline py-2 px-4"
            >
              Lihat {hiddenCount} buddy lainnya ↓
            </button>
          </div>
        )}

        {/* Safety Card */}
        <div className="rounded-2xl bg-[#DCEBE5] p-4 flex items-start gap-3 mt-2">
          <Heart className="w-5 h-5 text-[#2F5244] shrink-0 mt-0.5" />
          <div>
            <p className="text-[13px] font-bold text-[#162333]">Nyaman itu penting</p>
            <p className="text-xs text-[#3F554C] mt-1 leading-relaxed">
              Kamu boleh berhenti atau melaporkan percakapan kapan pun. Tidak perlu membagikan kontak pribadi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
